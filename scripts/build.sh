#!/bin/bash
# Build the dsh-gal plugin: compile src/ → lib/ against the packages the
# installed dsh ships. The plugin's node_modules holds symlinks into the dsh
# install (Homebrew/npm global: <prefix>/lib/node_modules/@deepseek-ai/dsh)
# so tsc type-checks against the exact versions that will load it at runtime.
# Override with DSH_PKG_ROOT=/path/to/@deepseek-ai/dsh/node_modules.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PKG_ROOT="${DSH_PKG_ROOT:-}"
if [ -z "$PKG_ROOT" ] && command -v dsh &>/dev/null; then
  DSH_BIN=$(readlink -f "$(command -v dsh)" 2>/dev/null || command -v dsh)
  CANDIDATE="$(cd "$(dirname "$DSH_BIN")/.." && pwd)/node_modules"
  [ -d "$CANDIDATE/@deepseek-ai/cordis" ] && PKG_ROOT="$CANDIDATE"
fi
if [ -z "$PKG_ROOT" ]; then
  echo "build: cannot locate the dsh package root (dsh not on PATH? set DSH_PKG_ROOT)" >&2
  exit 1
fi

link_pkg() {
  local target="$PKG_ROOT/$1"
  [ -e "$target" ] || { echo "build: missing $1 under $PKG_ROOT" >&2; exit 1; }
  ln -sfn "$target" "node_modules/$1"
}

echo "=== Linking build dependencies ($PKG_ROOT) ==="
mkdir -p node_modules/@deepseek-ai
for pkg in cordis dsh-agent dsh-agent-loop dsh-agent-default-model dsh-llm dsh-scope dsh-session dsh-system-prompt dsh-tools schemastery; do
  link_pkg "@deepseek-ai/$pkg"
done
for pkg in cosmokit zod; do
  [ -e "$PKG_ROOT/$pkg" ] && link_pkg "$pkg"
done

TSC="${TSC:-}"
if [ -z "$TSC" ]; then
  if [ -x node_modules/.bin/tsc ]; then TSC=node_modules/.bin/tsc
  elif command -v tsc &>/dev/null; then TSC=tsc
  else TSC="pnpm dlx typescript@5 tsc"; fi
fi
echo "=== Compiling src → lib ==="
$TSC -p tsconfig.json
echo "=== Build complete ==="
ls lib/
