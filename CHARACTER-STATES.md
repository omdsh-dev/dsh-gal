# Character presentation and state

`web/character-state.js` owns the character's semantic state, separately from how it is drawn. The state is **what she is doing**, taken from harness signals only. Nothing reads her lines; there is no side model call.

- **Activity**: `idle`, `reading`, `writing`, `searching`, `running`, `waiting`, `failed`, `done`.
- **Speech**: tracked beside the activity (`speaking`), shown on the nameplate when she is otherwise idle.
- **Inputs**: `gal-activity` (steady: the running tool's activity, `waiting` on an approval, `reading` when a tool finishes, `done` when the turn ends), `gal-beat` (a moment: `failed`), `gal-busy`, `gal-speaking`, `gal-preview`, `gal-character-changed`.
- **Output**: the `gal-character-state` event. Consumers that initialize late can read `window.galCharacter.state`.

Only one thing can show at a time, so the most salient wins. Priority, highest first, mirrored in `src/activity.ts`:

1. a pinned **preview** from the character panel
2. **failed** — a tool call errored; shows for a moment, then hands back
3. **waiting** — an approval is open on the user (decided in the dsh web UI)
4. the **running tool's activity** — `writing` for the editor and write-ish tools, `running` for shells, `searching` for web tools, `reading` for views and anything unknown
5. **reading** — turn in flight, nothing more specific known
6. **done** — the turn just finished; stays while she delivers the reply and fades after 30 s or at the next input
7. **idle**

How a tool maps to an activity is decided once, server-side (`activityForTool`), and the same value drives the ticker's "在写…" line and the stage.

## Assets

Each activity resolves to a file through a fallback chain (`ASSET_FALLBACKS` in `src/activity.ts`): the activity's own file when the pack has one, else the first stand-in it has. The names from the expression era are stand-ins, so an older pack of six covers every activity: `thinking` stands in for reading/writing/searching/running, `surprised` for failed, `happy` for done, `neutral` for idle. The manifest the page receives is already resolved, and the gallery shows a borrowed tile dimmed with `← <from>`.

The renderer is one crossfading pair of `<video>` layers plus a still-image fallback. Loops are authored so their last frame leads back into their first (see `scripts/animate.sh`), so `<video loop>` does not pop once per cycle. `playbackRate` in `character.json` scales loop playback.

The **状态预览 / Stage preview** selector in the character panel pins one activity for inspection; **跟随对话 / Follow dialogue** hands control back to the conversation. A preview is temporary and is cleared when the character pack changes.

A `.mp4` / `.webm` loop is preferred; a `.png` / `.webp` / `.jpg` still is used when no loop exists, and a pack may mix the two. Assets are discovered by convention (`<name>.<ext>`) unless `character.json` names them under `states`.

Validation: `node scripts/check-character-packs.mjs` checks that every bundled pack has its own idle and resolves every activity to a real, non-empty file, and reports which activities are borrowed.
