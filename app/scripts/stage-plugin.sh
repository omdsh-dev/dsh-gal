#!/bin/bash
# Stage the built Aibo plugin (lib/, web/, bundled characters/, manifests)
# into app/plugin/ so Tauri bundles it under Contents/Resources/plugin.
set -euo pipefail
APP="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="$(cd "$APP/.." && pwd)"
[ -f "$ROOT/lib/index.js" ] || { echo "stage-plugin: build the plugin first (scripts/build.sh)" >&2; exit 1; }
command rm -rf "$APP/plugin"
mkdir -p "$APP/plugin"
cp -R "$ROOT/lib" "$ROOT/web" "$ROOT/package.json" "$ROOT/dsh.plugin.json" "$APP/plugin/"
mkdir -p "$APP/plugin/characters"
# The private cetus pack when this checkout has it, otherwise the pack the public repo ships.
if [ -d "$ROOT/characters/cetus" ]; then cp -R "$ROOT/characters/cetus" "$APP/plugin/characters/"
else cp -R "$ROOT/characters/xiaoheiyu" "$APP/plugin/characters/"; fi
cp "$ROOT/characters/README.md" "$APP/plugin/characters/"

# Boot screen assets: the window shows the chat layout with her idle loop on the
# right while dsh starts, so the staged pack's idle clip (plus a light poster and
# the UI font) is copied next to app/ui/index.html.
BOOT="$APP/ui/boot"
command rm -rf "$BOOT"
mkdir -p "$BOOT"
PACK="$(find "$APP/plugin/characters" -mindepth 1 -maxdepth 1 -type d | head -1)"
if [ -n "$PACK" ] && [ -f "$PACK/idle.mp4" ]; then
  cp "$PACK/idle.mp4" "$BOOT/idle.mp4"
  if [ -f "$PACK/idle.png" ] && command -v sips &>/dev/null; then
    sips -Z 900 -s format jpeg -s formatOptions 70 "$PACK/idle.png" --out "$BOOT/idle.jpg" >/dev/null
  fi
else
  echo "stage-plugin: no idle loop in the staged pack; the boot screen will show a blank stage" >&2
fi
cp "$ROOT/web/fonts/GoogleSansFlex.woff2" "$BOOT/"
# Computer Use: the compiled plugin plus the Swift helper source it builds on first use.
if [ -f "$ROOT/plugins/computer-use/lib/index.js" ]; then
  mkdir -p "$APP/plugin/plugins/computer-use"
  cp -R "$ROOT/plugins/computer-use/lib" "$ROOT/plugins/computer-use/helper" "$ROOT/plugins/computer-use/README.md" "$APP/plugin/plugins/computer-use/"
else
  echo "stage-plugin: plugins/computer-use is not built; the app will ship without Computer Use" >&2
fi
echo "staged plugin → $APP/plugin"
du -sh "$APP/plugin"
