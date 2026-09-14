# dsh-notes

Apple Notes for the DeepSeek Harness. A short index of your notes (counts and the five most recently edited) becomes a prompt section in any dsh session, with tools to search, read, create and append. When [dsh-gal](../../README.md) is loaded too, notes show up in its Data panel with folder chips, previews and a search box.

Everything goes through Notes.app itself, driven by a small JXA script (`helper/notes.js`) run with `osascript`, so every account already synced into Notes (iCloud, Google, Exchange) just works. No compile step. macOS asks once for Automation permission ("… wants access to control Notes"); the prompt is attributed to the app dsh was launched from.

## Mount

```yaml
- insert:
    - id: dsh-notes
      name: /path/to/dsh-gal/plugins/notes/lib/index.js
      config:
        refreshMinutes: 15    # index cache
        folders: []           # folder names to include; empty = all
```

## Permissions

If the Automation prompt was declined (or never answered), every call fails and the Data panel shows setup steps: System Settings → Privacy & Security → Automation → the app you launched dsh from (a terminal, or the desktop app) → turn on Notes, then press Refresh.

The index is capped at 2000 notes (most recent first) and previews are fetched for the 300 most recent only; each `osascript` call has a 60 s timeout so a huge library cannot hang the session.

## What the agent sees

- Section `dsh-notes` (order 9555): note and folder counts, the five most recently edited titles with folder and date, and the rule to look things up before guessing.
- Tools: `notes_search({query, limit?})`, `notes_read({id? | title?})`, `notes_create({title, body, folder?})`, `notes_append({id? | title?, text})`.

The source has a "Visible to the character" switch in the Data panel (default on). It is the only thing this plugin stores, as the `notes/settings` document in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`); the note index is kept in memory and re-read from Notes.app. An older `~/.dsh/notes/settings.json` (or `$DSH_NOTES_DIR/settings.json`) is imported once on first load and renamed `.migrated`. Nothing is changed in Notes unless a create or append tool is called.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
