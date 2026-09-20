#!/bin/bash
# Development loop: the desktop shell, but every file it shows comes from this
# checkout instead of the installed bundle.
#
#   plugin (src/ → lib/)   tsc --watch
#   chat UI (ui/src → web/chat/app.js)   vite build --watch
#   web/ is served by scripts/ui-preview.mjs on 4878 with no-store, and the
#   shell is launched with AIBO_USE_PREVIEW=1 so it points there.
#
# So a save in ui/src lands in the window on ⌘R, and a save in src/ lands on the
# next restart of this script (the plugin is a Node process, not a page).
# The app shell itself — launcher.html, the Rust supervisor — is compiled into
# the binary; changing those still needs `cd app && npm run build`.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# The root install is not always complete; ui/ always has a working tsc.
TSC="$ROOT/node_modules/.bin/tsc"
"$TSC" --version >/dev/null 2>&1 || TSC="$ROOT/ui/node_modules/.bin/tsc"
VITE="$ROOT/ui/node_modules/.bin/vite"

echo "dev: building once…"
"$TSC" -p tsconfig.json
(cd ui && "$VITE" build >/dev/null && "$VITE" build -c vite.chat.config.ts >/dev/null)

pids=()
cleanup() {
  for pid in "${pids[@]:-}"; do kill "$pid" 2>/dev/null || true; done
}
trap cleanup EXIT INT TERM

echo "dev: watching src/ → lib/ and ui/src → web/"
"$TSC" -p tsconfig.json --watch --preserveWatchOutput >/dev/null & pids+=($!)
(cd ui && exec "$VITE" build --watch -c vite.chat.config.ts >/dev/null) & pids+=($!)
(cd ui && exec "$VITE" build --watch >/dev/null) & pids+=($!)

# Reuses a backend already on 4877 and a preview already on 4878; otherwise
# starts both from this checkout, then opens the shell against them.
exec node scripts/launch.mjs desktop
