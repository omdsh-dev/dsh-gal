# Character presentation and state

`web/character-state.js` owns the character's semantic state, separately from how it is drawn:

- **Emotion**: `neutral`, `thinking`, `happy`, `sad`, `surprised`, `excited`.
- **Activity**: `idle`, `thinking`, `speaking`. Busy shows `thinking` without discarding the previous emotion; voice adds `speaking` the same way. When the agent finishes, the judged emotion is still there underneath.
- **Inputs**: the `gal-emotion`, `gal-busy`, `gal-speaking` and `gal-character-changed` events.
- **Output**: the `gal-character-state` event. Consumers that initialize late can read `window.galCharacter.state`.

The renderer is one crossfading pair of `<video>` layers plus a still-image fallback. It consumes the state, picks the pack's asset for that emotion, and falls back to the pack's default asset when an expression is missing. Loops are authored so their last frame leads back into their first (see `scripts/animate.sh`), so `<video loop>` does not pop once per cycle. `playbackRate` in `character.json` scales loop playback.

The **表情预览 / Expression preview** selector in the character panel pins one expression for inspection; **跟随对话 / Follow dialogue** hands control back to the conversation. A preview is temporary and is cleared when the character pack changes.

## Expression assets

Each pack supplies six expressions. A `.mp4` / `.webm` loop is preferred; a `.png` / `.webp` / `.jpg` still is used when no loop exists, and a pack may mix the two. Assets are discovered by convention (`<emotion>.<ext>`) unless `character.json` names them explicitly.

Validation: `node scripts/check-character-packs.mjs` checks that every bundled pack resolves all six emotions to files that exist and are non-empty, and that video assets decode as video. Browser checks cover emotion switching across a real conversation, the preview selector, and busy → emotion restoration.
