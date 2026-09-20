# dsh-weather

Weather for the DeepSeek Harness, from [Open-Meteo](https://open-meteo.com) (no key, no account). One short prompt section carries now, today and tomorrow where the user is; `weather_lookup` has the hourly and 7-day detail for any place. When [Aibo](../../README.md) is loaded too, it shows up in its Data panel with a 24-hour chart and the week.

Destinations ("Jeju 9/27–10/1", added in the panel or by the character with `weather_trip`) get a 16-day forecast; the trip's days are in the prompt once they are in range, and the trip drops off the day after it ends. The plan itself lives in a list, not here.

The location is a place name, geocoded once. It comes from the plugin config, or is guessed from the system time zone (`Asia/Shanghai` → Shanghai) and can be changed in the Data panel. The place, the `shared` toggle and the last forecast live in the shared aibo store (`~/.dsh/aibo/store.sqlite`, documents `weather/settings`, `weather/state` and `weather/trips`); an older `~/.dsh/weather/state.json` is imported once on first start.

## Mount

```yaml
- insert:
    - id: dsh-weather
      name: /path/to/aibo/plugins/weather/lib/index.js
      config:
        location: ""          # empty = guess from the time zone
        refreshMinutes: 30
        units: metric         # or imperial
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
