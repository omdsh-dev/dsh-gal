#!/bin/bash
# Stage the built dsh-gal plugin (lib/, web/, bundled characters/, manifests)
# into app/plugin/ so Tauri bundles it under Contents/Resources/plugin.
set -euo pipefail
APP="$(cd "$(dirname "$0")/.." && pwd)"
ROOT="$(cd "$APP/.." && pwd)"
[ -f "$ROOT/lib/index.js" ] || { echo "stage-plugin: build the plugin first (scripts/build.sh)" >&2; exit 1; }
command rm -rf "$APP/plugin"
mkdir -p "$APP/plugin"
cp -R "$ROOT/lib" "$ROOT/web" "$ROOT/package.json" "$ROOT/dsh.plugin.json" "$APP/plugin/"
mkdir -p "$APP/plugin/characters"
cp -R "$ROOT/characters/cetus" "$APP/plugin/characters/"
cp "$ROOT/characters/README.md" "$APP/plugin/characters/"
cp -R "$ROOT/prompts" "$APP/plugin/"
echo "staged plugin → $APP/plugin"
du -sh "$APP/plugin"
