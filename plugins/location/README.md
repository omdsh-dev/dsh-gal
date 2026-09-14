# dsh-location

Where the user is, for the DeepSeek Harness. A one-line prompt section ("Location: Huangpu, Shanghai, China, 3.2 km from home") in any dsh session, plus `location_now` and `location_history` tools. When [dsh-gal](../../README.md) is loaded too, it shows up in the Data panel with a radar card, recent places, a "Set as home" button and a way to pin any place by name.

The fix comes from CoreLocation (Wi-Fi positioning) through a tiny Swift helper (`helper/lkit.swift`) compiled on first use into `~/.dsh/location/bin/lkit.app`, then reverse-geocoded with Apple's CLGeocoder. macOS asks for location permission once; the prompt names "lkit". Location Services must be on for the Mac (System Settings → Privacy & Security → Location Services). Without permission you can still pin a place by name (Open-Meteo geocoding, no key), which also stops the helper from being asked.

Requires the Xcode command-line tools (`xcode-select --install`) for the one-time compile.

## Mount

```yaml
- insert:
    - id: dsh-location
      name: /path/to/dsh-gal/plugins/location/lib/index.js
      config:
        refreshMinutes: 15   # how often to ask for a new fix
        homeRadiusKm: 0.5    # within this of home counts as "at home"
```

## What the agent sees

- Section `dsh-location`: the place (locality, country, sub-locality), distance from home or "at home", and the time zone when it differs from the system's.
- Tools: `location_now()`, `location_history({days?})`.

Data lives in dsh-gal's store (`~/.dsh/gal/store.sqlite`): `location/settings` holds home, a pinned place and the "Visible to the character" switch; `location/state` holds the current fix and placemark and distinct places visited (about 500 m cells, first/last seen, visit count). An older `~/.dsh/location/state.json` is imported once on first start and renamed `.migrated`; only the compiled helper stays in `~/.dsh/location/bin`. Nothing leaves the Mac except the coordinates sent to Apple for reverse geocoding and the place name sent to Open-Meteo when you pin one.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
