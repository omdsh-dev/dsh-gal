#!/bin/bash
# Build signed, notarized macOS artifacts. Publishing is explicit.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
PUBLISH=0
case "${1:-}" in
  "") ;;
  --publish) PUBLISH=1 ;;
  *) echo "usage: scripts/release.sh [--publish]" >&2; exit 2 ;;
esac
[ ! -f app/release.env ] || source app/release.env
: "${APPLE_SIGNING_IDENTITY:?Set Developer ID Application identity in app/release.env}"
: "${APPLE_TEAM_ID:?Set Apple team in app/release.env}"
export APPLE_SIGNING_IDENTITY APPLE_TEAM_ID
if [ -n "${APPLE_API_ISSUER:-}" ] || [ -n "${APPLE_API_KEY:-}" ] || [ -n "${APPLE_API_KEY_PATH:-}" ]; then
  : "${APPLE_API_ISSUER:?Set App Store Connect issuer in app/release.env}"
  : "${APPLE_API_KEY:?Set App Store Connect key ID in app/release.env}"
  : "${APPLE_API_KEY_PATH:?Set App Store Connect .p8 path in app/release.env}"
  [ -f "$APPLE_API_KEY_PATH" ] || { echo "App Store Connect key file not found." >&2; exit 1; }
  export APPLE_API_ISSUER APPLE_API_KEY APPLE_API_KEY_PATH
  unset APPLE_ID APPLE_PASSWORD
else
  : "${APPLE_ID:?Set Apple account or App Store Connect API credentials in app/release.env}"
  : "${APPLE_PASSWORD:?Set Apple app-specific password in app/release.env}"
  export APPLE_ID APPLE_PASSWORD
fi
export TAURI_SIGNING_PRIVATE_KEY="${TAURI_SIGNING_PRIVATE_KEY:-$HOME/.config/aibo/updater.key}"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="${TAURI_SIGNING_PRIVATE_KEY_PASSWORD:-}"
VERSION="$(node scripts/release-manifest.mjs version)"
REPO=omdsh-dev/dsh-gal
TAG="v$VERSION"
if [ "$PUBLISH" = 1 ]; then
  [ -z "$(git status --porcelain)" ] || { echo "Commit changes before publishing." >&2; exit 1; }
  gh auth status
  # Fail closed on API errors; don't overwrite an existing release.
  RELEASES="$(mktemp)"
  trap 'rm -f "$RELEASES"' EXIT
  gh api "repos/$REPO/releases" --paginate > "$RELEASES"
  node scripts/release-manifest.mjs newer "$RELEASES"
fi
export AIBO_PUBLIC_RELEASE=1
npm --prefix ui ci
npm run build:ui
TSC="$ROOT/ui/node_modules/.bin/tsc" bash scripts/build.sh
npm --prefix app ci
(
  cd app
  npm run build -- --config '{"bundle":{"createUpdaterArtifacts":true}}'
)
BUNDLE="$ROOT/app/src-tauri/target/release/bundle"
OUT="$ROOT/dist/release/$VERSION"
[ ! -e "$OUT" ] || { echo "Output exists: $OUT; move it aside before rebuilding." >&2; exit 1; }
mkdir -p "$OUT"
cp "$BUNDLE/macos/Aibo.app.tar.gz" "$BUNDLE/macos/Aibo.app.tar.gz.sig" "$OUT/"
ARCH="$(uname -m)"
[ "$ARCH" != arm64 ] || ARCH=aarch64
cp "$BUNDLE/dmg/Aibo_${VERSION}_${ARCH}.dmg" "$OUT/"
# Staple the outer DMG too, so both the download and its app are notarized.
DMG="$OUT/Aibo_${VERSION}_${ARCH}.dmg"
if [ -n "${APPLE_API_KEY_PATH:-}" ]; then
  xcrun notarytool submit "$DMG" --key "$APPLE_API_KEY_PATH" --key-id "$APPLE_API_KEY" --issuer "$APPLE_API_ISSUER" --wait
else
  xcrun notarytool submit "$DMG" --apple-id "$APPLE_ID" --password "$APPLE_PASSWORD" --team-id "$APPLE_TEAM_ID" --wait
fi
xcrun stapler staple "$DMG"
xcrun stapler validate "$DMG"
node scripts/release-manifest.mjs create "$OUT"
codesign --verify --deep --strict "$BUNDLE/macos/Aibo.app"
xcrun stapler validate "$BUNDLE/macos/Aibo.app"
if [ "$PUBLISH" = 1 ]; then
  # Publish all assets together; immutable version tags keep older downloads valid.
  gh release create "$TAG" "$OUT"/* --repo "$REPO" --target "$(git rev-parse HEAD)" \
    --title "Aibo $VERSION" --generate-notes --latest
  curl --fail --location --retry 3 \
    "https://github.com/$REPO/releases/latest/download/latest.json" -o "$OUT/published.json"
  cmp "$OUT/latest.json" "$OUT/published.json"
fi
echo "Release artifacts: $OUT"
