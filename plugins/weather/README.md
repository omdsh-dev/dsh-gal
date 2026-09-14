# dsh-weather

Weather for the DeepSeek Harness, from [Open-Meteo](https://open-meteo.com) (no key, no account). One short prompt section carries now, today and tomorrow where the user is; `weather_lookup` has the hourly and 7-day detail for any place. When [dsh-gal](../../README.md) is loaded too, it shows up in its Data panel with a 24-hour chart and the week.

The location is a place name, geocoded once. It comes from the plugin config, or is guessed from the system time zone (`Asia/Shanghai` → Shanghai) and can be changed in the Data panel. The place, the `shared` toggle and the last forecast live in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`, documents `weather/settings` and `weather/state`); an older `~/.dsh/weather/state.json` is imported once on first start.

## Mount

```yaml
- insert:
    - id: dsh-weather
      name: /path/to/dsh-gal/plugins/weather/lib/index.js
      config:
        location: ""          # empty = guess from the time zone
        refreshMinutes: 30
        units: metric         # or imperial
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
