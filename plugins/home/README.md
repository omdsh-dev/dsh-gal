# dsh-home

Your smart home for the DeepSeek Harness. The current state of the home (as one line per reading) becomes a prompt section in any dsh session, `home_status` re-reads it, and `home_run` runs an action — a scene, lights off, whatever you have set up. When [dsh-gal](../../README.md) is loaded too, it shows up in its Data panel with reading cards and big action tiles.

## How it reaches HomeKit

It does not, directly: the HomeKit framework only works from a signed app carrying the `com.apple.developer.homekit` entitlement from a provisioning profile, which a command-line helper cannot have. So the plugin goes through the Shortcuts app, which *is* entitled. You create shortcuts that read or control your Home, put them in one folder, and the plugin lists them with `shortcuts list --folder-name` and runs them with `shortcuts run`. No permission prompt is involved; Shortcuts already has your Home access.

Setup:

1. Open Shortcuts and create a folder named **Home** (or whatever `folder` is set to).
2. Add shortcuts to it using the **Control Home** action (scenes, accessories) or **Get State of Home Accessory** (readings). Any other shortcut in the folder works too — the plugin does not care what is inside.
3. Naming convention: a shortcut whose name starts with **"Get "** is a *reader* — it is run every `refreshMinutes` (and by `home_status`), its output is captured to a temp file via `--output-path` and kept as text (or compact JSON, if the output parses as JSON). End readers with a **Text** or **Get Contents** action so they output something. Everything else is an *action* (`Lights off`, `Movie scene`), run only when asked.
4. Press Refresh in the Data panel.

Each shortcut is capped at `timeoutSeconds` (30 s); a reader that fails keeps its last good value and reports the error.

## Home Assistant (optional)

With `homeAssistant.url` and a long-lived access token (Profile → Security → Long-lived access tokens), entity states come from `GET /api/states` (lights, switches, fans, covers, locks, climate, sensors, scenes, scripts) and `home_run` can call services via `POST /api/services/<domain>/<service>` with commands like `light.living_room on`, `switch.fan toggle`, `scene.movie`, `climate.hall 22`, `light.desk 40` (brightness %), `cover.garage open`, or a friendly name (`Living room lights off`). The Shortcuts folder still works alongside it.

## Mount

```yaml
- insert:
    - id: dsh-home
      name: /path/to/dsh-gal/plugins/home/lib/index.js
      config:
        folder: Home           # Shortcuts folder to expose
        refreshMinutes: 10     # how often readers are re-run
        timeoutSeconds: 30     # per shortcut
        homeAssistant:         # optional
          url: http://homeassistant.local:8123
          token: "eyJ..."
```

## What the agent sees

- Section `dsh-home` (order 9575): one line per reading, Home Assistant devices and sensors, and the list of available actions, with a note that actions change the physical home and need confirmation unless clearly asked.
- Tools: `home_status()` re-runs readers and returns everything; `home_run({name})` runs an action shortcut or a Home Assistant command.

The "Visible to the character" switch lives in the Data panel and is stored in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`, documents `home/settings` and `home/state` — the latter holds the readers' last outputs); an older `~/.dsh/home/settings.json` is imported once on first start. The Home Assistant token is read from the config only and never stored. Nothing runs on its own except the "Get …" readers.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
