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
# Every built plugin ships with the app: the connectors the Data panel lists, and
# Computer Use. Each is the compiled lib plus, where it has one, the Swift helper
# source it compiles on first use. The app mounts whatever it finds here.
staged=0
for dir in "$ROOT"/plugins/*/; do
  name="$(basename "$dir")"
  [ -f "$dir/lib/index.js" ] || { echo "stage-plugin: plugins/$name is not built; skipping" >&2; continue; }
  mkdir -p "$APP/plugin/plugins/$name"
  cp -R "$dir/lib" "$APP/plugin/plugins/$name/"
  [ -d "$dir/helper" ] && cp -R "$dir/helper" "$APP/plugin/plugins/$name/"
  [ -f "$dir/README.md" ] && cp "$dir/README.md" "$APP/plugin/plugins/$name/"
  staged=$((staged + 1))
done
echo "stage-plugin: $staged plugin(s) bundled"
echo "staged plugin → $APP/plugin"
du -sh "$APP/plugin"
