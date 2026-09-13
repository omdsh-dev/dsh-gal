#!/usr/bin/env bash
# Animate a character sprite into a subtle idle-motion loop via fal.ai.
# Usage: animate.sh <input.png> <output.mp4> "<motion prompt>" [model] [noloop]
#   model: seedance (default, bytedance/seedance-2.0/mini) | h3 (minimax/h3)
#
# Looping is two steps, because one is not enough:
#   1. the still is passed as BOTH first and last frame (`end_image_url`), which
#      gets the end pose close to the start pose; measured on this project it
#      does NOT reliably land on it, so on its own the loop still pops.
#   2. the tail is then crossfaded back onto the head locally, which makes the
#      seam a one-frame step by construction (first-vs-last PSNR went from
#      ~21 dB to ~40 dB — the level of two adjacent frames).
# Pass `noloop` for a one-shot clip that is not meant to repeat.
# minimax/h3 has no end-frame input; its clips still get the crossfade.
# Auth: FAL_API_KEY from env or ~/Developer/nex-studio/.env
set -euo pipefail

INPUT="$1"; OUTPUT="$2"; PROMPT="$3"; MODEL="${4:-seedance}"; LOOP="${5:-loop}"

if [[ -z "${FAL_API_KEY:-}" ]]; then
  FAL_API_KEY=$(grep -m1 '^FAL_API_KEY=' ~/Developer/nex-studio/.env | cut -d= -f2-)
fi
[[ -n "$FAL_API_KEY" ]] || { echo "no FAL_API_KEY" >&2; exit 1; }

if [[ "$MODEL" == "h3" ]]; then
  ENDPOINT="minimax/h3/image-to-video"
  BODY_EXTRA='"resolution": "768P", "duration": 5'
  [[ "$LOOP" == "loop" ]] && echo "note: minimax/h3 takes no end frame; this clip will not loop seamlessly" >&2
else
  ENDPOINT="bytedance/seedance-2.0/mini/image-to-video"
  BODY_EXTRA='"resolution": "720p", "duration": "5", "generate_audio": false'
fi

# 1. upload the image to fal storage (recompress >1MB inputs to JPEG first:
# multi-MB uploads intermittently die mid-TLS behind the local proxy)
UPLOAD_SRC="$INPUT"
MIME="image/png"
if [ "$(stat -f%z "$INPUT")" -gt 1000000 ]; then
  UPLOAD_SRC="$(mktemp /tmp/animate-upload-XXXX).jpg"
  sips -s format jpeg -s formatOptions 92 "$INPUT" --out "$UPLOAD_SRC" >/dev/null
  MIME="image/jpeg"
fi
UPLOAD=$(curl -sf -X POST "https://rest.alpha.fal.ai/storage/upload/initiate" \
  -H "Authorization: Key $FAL_API_KEY" -H "Content-Type: application/json" \
  -d "{\"file_name\": \"$(basename "$UPLOAD_SRC")\", \"content_type\": \"$MIME\"}")
UPLOAD_URL=$(echo "$UPLOAD" | python3 -c "import json,sys; print(json.load(sys.stdin)['upload_url'])")
FILE_URL=$(echo "$UPLOAD" | python3 -c "import json,sys; print(json.load(sys.stdin)['file_url'])")
for i in 1 2 3; do
  curl -sf -X PUT "$UPLOAD_URL" -H "Content-Type: $MIME" --data-binary "@$UPLOAD_SRC" > /dev/null && break
  echo "upload attempt $i failed, retrying" >&2; sleep 3
  [ "$i" = 3 ] && exit 1
done
echo "uploaded: $FILE_URL" >&2

# 2. queue the generation
SUBMIT=$(python3 -c "
import json,sys
d = json.loads(sys.argv[3])
d.update({'prompt': sys.argv[1], 'image_url': sys.argv[2]})
if sys.argv[4] == 'seamless': d['end_image_url'] = sys.argv[2]
print(json.dumps(d))" "$PROMPT" "$FILE_URL" "{$BODY_EXTRA}" "$([[ "$MODEL" != "h3" && "$LOOP" == "loop" ]] && echo seamless || echo oneshot)")
REQ=$(curl -sf -X POST "https://queue.fal.run/$ENDPOINT" \
  -H "Authorization: Key $FAL_API_KEY" -H "Content-Type: application/json" \
  -d "$SUBMIT")
REQ_ID=$(echo "$REQ" | python3 -c "import json,sys; print(json.load(sys.stdin)['request_id'])")
STATUS_URL=$(echo "$REQ" | python3 -c "import json,sys; print(json.load(sys.stdin)['status_url'])")
RESPONSE_URL=$(echo "$REQ" | python3 -c "import json,sys; print(json.load(sys.stdin)['response_url'])")
echo "queued: $REQ_ID" >&2

# 3. poll
for i in $(seq 1 200); do
  sleep 5
  STATUS=$(curl -sf "$STATUS_URL" -H "Authorization: Key $FAL_API_KEY" | python3 -c "import json,sys; print(json.load(sys.stdin).get('status','UNKNOWN'))" 2>/dev/null || echo UNKNOWN)
  echo "  [$i] $STATUS" >&2
  [[ "$STATUS" == "COMPLETED" ]] && break
done
[[ "$STATUS" == "COMPLETED" ]] || { echo "generation did not complete" >&2; exit 1; }

# 4. download
VIDEO_URL=$(curl -sf "$RESPONSE_URL" -H "Authorization: Key $FAL_API_KEY" | python3 -c "import json,sys; print(json.load(sys.stdin)['video']['url'])")
for i in 1 2 3; do
  curl -sf -o "$OUTPUT" "$VIDEO_URL" && ffprobe -v error "$OUTPUT" >/dev/null 2>&1 && break
  echo "download attempt $i failed, retrying" >&2; sleep 3
done
ffprobe -v error "$OUTPUT" >/dev/null 2>&1 || { echo "downloaded file is corrupt" >&2; exit 1; }

# 5. close the loop: middle section, then the tail crossfaded onto the head, so
# playback wrapping around lands on the frame the crossfade just ended on.
if [[ "$LOOP" == "loop" ]]; then
  FADE=0.5
  DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUTPUT")
  END=$(python3 -c "print(f'{float('$DUR'):.3f}')")
  MID=$(python3 -c "print(f'{float('$DUR') - $FADE:.3f}')")
  SEAMLESS="$(mktemp /tmp/animate-loop-XXXX).mp4"
  if ffmpeg -v error -i "$OUTPUT" -filter_complex "
[0:v]trim=${FADE}:${MID},setpts=PTS-STARTPTS[mid];
[0:v]trim=${MID}:${END},setpts=PTS-STARTPTS[tail];
[0:v]trim=0:${FADE},setpts=PTS-STARTPTS[head];
[tail][head]blend=all_expr='A*(1-(T/${FADE}))+B*(T/${FADE})'[x];
[mid][x]concat=n=2:v=1:a=0[out]" -map "[out]" -c:v libx264 -pix_fmt yuv420p -crf 18 -y "$SEAMLESS" 2>/dev/null \
     && ffprobe -v error "$SEAMLESS" >/dev/null 2>&1; then
    mv "$SEAMLESS" "$OUTPUT"
  else
    echo "warning: could not close the loop; keeping the raw clip" >&2
    rm -f "$SEAMLESS"
  fi
fi
echo "saved: $OUTPUT"
