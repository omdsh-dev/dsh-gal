# dsh-health

Apple Health for the DeepSeek Harness. The user's daily sleep, activity, heart and weight numbers become a short prompt section (this week against last) and a `health_lookup` tool, in any dsh session. When [dsh-gal](../../README.md) is loaded too, the plugin shows up in its Data panel.

HealthKit has no cloud API, so the data only leaves the phone when the user sends it. Three doors, one store (the shared dsh-gal store at `~/.dsh/gal/store.sqlite`, documents `health/settings` and `health/data`, one row per day; an older `~/.dsh/health/health.json` is imported once on first run):

1. **Health Auto Export** (App Store): a REST API automation that POSTs JSON to this plugin's ingest endpoint on a schedule.
2. **A Shortcut**, no app needed. For each metric: *Find Health Samples* (Steps, today) → *Calculate Statistics* (Sum; Average for heart rate) → then one *Get Contents of URL*: POST, Request Body **Form**, one field per metric. Run it from a Personal Automation (Time of Day). The endpoint also takes JSON (`{"samples":[{"type":"HKQuantityTypeIdentifierStepCount","start":"…","end":"…","value":412,"unit":"count"}]}`) and CSV lines (`steps,8123`).
3. **export.zip** from the Health app, imported once from the Data panel to backfill history.

## Mount

```yaml
- insert:
    - id: dsh-health
      name: /path/to/dsh-gal/plugins/health/lib/index.js
      config:
        ingestPort: 4890   # LAN listener for the phone; 0 disables it
```

The ingest endpoint is `http://<this-mac>:4890/ingest?key=<key>`; the key is generated once into `~/.dsh/health/ingest-key`. The phone needs to reach the Mac (same Wi‑Fi or a tailnet).

Form field names (a missing `date` means today): `steps`, `sleepHours`, `inBedHours`, `deepHours`, `remHours`, `restingHr`, `hrAvg`, `hrv`, `activeEnergy` (kcal), `exerciseMin`, `distanceKm`, `standHours`, `weightKg`, `vo2max`.

```bash
curl -X POST "http://<mac>:4890/ingest?key=<key>" -d "steps=8123&sleepHours=7.2&restingHr=56"
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```

## What the agent sees

- Prompt section `dsh-health`: weekly averages for steps, sleep, exercise, active energy, resting HR, HRV, weight, plus last night, recent workouts, and a "worth noticing" list (a short night, a still day, resting HR up or HRV down against a 28‑day baseline, a lapsed workout habit). Silent until data exists, and hidden when the user turns off "Visible to the character".
- Tool `health_lookup({ days?, metrics? })`: a day-by-day table.

Sums (steps, energy, distance) are taken per source and the largest source wins per day, which is how Health avoids counting the phone and the watch twice. Sleep lands on the day it ended.
