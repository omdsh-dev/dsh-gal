# dsh-flights

Flight status for the DeepSeek Harness, from [AeroDataBox](https://rapidapi.com/aedbx-aedbx/api/aerodatabox) on RapidAPI (a free Basic plan exists; the key is pasted once in the Connectors panel or set in the plugin config, and stays in `~/.dsh/flights/key.json`). A tracked flight is a number and a local departure date; the plugin keeps scheduled and revised times, terminal, gate, delay and cancellation fresh (every `refreshMinutes` from six hours before departure, once a day otherwise) and drops it two days after it flew. When [Aibo](../../README.md) is loaded too, the flights show up in its Connectors panel with a boarding-card view.

The prompt carries the flights of the next three days. `flight_status` checks any flight by number and date; `flight_track` keeps one, which the character calls on her own when a booking mail or an itinerary mentions a flight. Tracked flights and the `shared` toggle live in the shared store (`~/.dsh/aibo/store.sqlite`, documents `flights/settings` and `flights/tracked`).

## Mount

```yaml
- insert:
    - id: dsh-flights
      name: /path/to/aibo/plugins/flights/lib/index.js
      config:
        apiKey: ""            # or paste it in the panel
        refreshMinutes: 30
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
