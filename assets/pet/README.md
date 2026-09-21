# Xiaoheiyu desktop pet

Current runtime atlas: `app/ui/pet/sprites-v2.png`, 2048×3072 RGBA, 8 columns × 12 rows, 256×256 per cell. `sprites-v2.json` describes its 81 valid frames; unused cells are transparent.

| Row | Animation | Frames |
| --- | --- | --- |
| 0 | Idle / blink | 6 |
| 1 | Run right | 8 |
| 2 | Run left | 8 |
| 3 | Wave / replying | 4 |
| 4 | Jump / hover | 5 |
| 5 | Failure reaction | 8 |
| 6 | Waiting for input | 6 |
| 7 | Working | 6 |
| 8 | Review / completed | 6 |
| 9–10 | Look toward mouse, clockwise from up | 16 |
| 11 | Held / dangling | 8 |

The first 73 frames match the installed Codex v2 layout's effective frame count and actions. The additional 8 frames belong to Xiaoheiyu's held pose. Runtime cell size is square rather than Codex's 192×208; the artwork is independently generated.

`pet-model.js` defines timings: ordinary actions play three cycles and then slow idle (6× idle durations). Holding loops the grabbed clip; horizontal pulls ≥4 logical pixels switch to the corresponding directional clip, then return to grabbed after 180 ms without horizontal movement. Gaze uses 16 angles. Reduced motion uses stills. `pet.js` owns the state/hover/drag priorities and alpha-derived click-through regions.

Built-in imagegen sources and prompt set are in `assets/pet/v2/`; see `v2/PROMPTS.md`. Run `python3 scripts/prepare-pet-v2.py` to repack them (Pillow, NumPy, OpenCV). The generator's alpha is preserved, with detached dust and adjacent-cell fragments removed. Packing validates padding and empty unused cells.

The older `sprites-cutout-source.png` and `app/ui/pet/sprites.png` preserve the original 24-frame version. That version was generated from `output/imagegen/xiaoheiyu-pet-minimal-v3.png`; macOS Vision removed the original gray halo with the user's authorization.

`logo-source.png` is the generated minimal close-up with the loop-shaped ahoge. The older `scripts/prepare-pet-assets.py` still rebuilds the original atlas and app icon; it does not overwrite v2. Icon export: `iconutil -c icns output/pet/Aibo.iconset -o app/src-tauri/icons/icon.icns`.
