# dsh-photos

The user's photo library for the DeepSeek Harness. A short, metadata-only prompt section (how many photos in the last week, the busiest days, a trip-like cluster by rounded location) goes into any dsh session, with tools to list recent assets, count per day, and save a thumbnail a vision-capable model can look at. When [dsh-gal](../../README.md) is loaded too, a 30-day activity strip, recent thumbnails and albums show up in its Data panel.

Everything comes from the Photos framework on the Mac through a tiny Swift helper (`helper/pkit.swift`) compiled on first use into `~/.dsh/photos/bin/pkit`. macOS asks for photo-library permission once; the prompt is attributed to `pkit` itself. Nothing is written to the library and the helper never touches the network: locations stay as raw lat/lon, no place names are resolved.

Requires the Xcode command-line tools (`xcode-select --install`) for the one-time compile.

## Mount

```yaml
- insert:
    - id: dsh-photos
      name: /path/to/dsh-gal/plugins/photos/lib/index.js
      config:
        days: 30              # days of history cached (7–365)
        refreshMinutes: 30
```

## What the agent sees

- Section `dsh-photos` (order 9560): "N photos in the last 7 days; M on <day>; a trip-like cluster on <dates> around <lat,lon>". Counts and dates only, never pixels.
- Tools: `photos_recent({days?, limit?})`, `photos_days({days?})`, `photos_thumbnail({id, maxPx?})` — the last writes `~/.dsh/photos/thumbs/<safe-id>-<px>.jpg` and returns the absolute path, so a model with an image-reading tool can open it.

The "Visible to the character" switch in the Data panel is kept in dsh-gal's shared store (`~/.dsh/gal/store.sqlite`, document `photos/settings`; an older `~/.dsh/photos/settings.json` is imported once and renamed `.migrated`) and only controls the prompt section; images are only ever produced when a tool is called. The panel fetches its 256 px tile thumbnails through the source's `thumb` action (`POST /sources/photos/thumb {id}` → `{ dataUrl }`), cached under the same `thumbs/` folder.

## Permissions

If the prompt was declined: System Settings → Privacy & Security → Photos → "pkit" → Full Access, then press Refresh in the panel.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
