# Xiaoheiyu v2 artwork provenance

Generated with the built-in imagegen tool, not the CLI/API fallback. Character identity reference: `output/imagegen/xiaoheiyu-pet-minimal-v3.png`. The first generated action sheet was the consistency reference for the subsequent sheets. No Codex artwork was copied; local Codex code was read only to establish frame counts, state semantics and playback timings.

## Shared generation prompt

Create a production sprite sheet for the desktop pet Xiaoheiyu. Use the attached image as character identity and style reference, not as a grid template. Preserve her moderate head/body proportions, loop-shaped ahoge, long charcoal hair with white streak on viewer left, blue eyes, black/white maid dress, blue/gold brooch, white stockings, black shoes and unmistakable long black-and-white ORCA TAIL. Minimal clean flat illustration, no realism, no extra details. Exactly 8 columns by 4 rows, 32 separate complete full-body figures, regular equal square cells, canvas 2048x1024. Each figure centered at identical scale, feet near same baseline, generous transparent cell margins including whole ahoge and tail. True transparent PNG background; no gray halo, no checkerboard drawing, no shadows, no text, no dividers. Consistency of design and body size across all frames is critical. Each row is one sequence, read left to right.

## Sheet-specific instructions

- A: idle breathing/blink (open, half closed, closed, half open, open, subtle head tilt, neutral, neutral); eight gait poses running right; eight running left; eight friendly hand-wave poses. Full orca tail in every cell.
- B: jump (crouch, push off, rising, apex, landing, stand, stand, stand); disappointed reaction; waiting with curious head tilt and clasped hands; working/thinking with subtle hand and tail movement. All rows eight frames.
- C: review/done gestures and nods (six frames plus two unused neutral poses); eight clockwise gaze angles from up through down-right; eight continuing from down through up-left (22.5 degree steps, same standing body, only head and eyes follow); eight held-in-air poses with raised shoulders, loose arms, bent knees, dangling feet and curling tail. No visible lifting hand, rope or hook. At least 20 px cell margins.

## Targeted repairs

A and B were each edited with the same repair request: preserve the 8×4 grid and poses, restore full black shoes on the bottom row, shrink each figure by 18% about its own cell center, provide generous padding around ahoge/tail/shoes, preserve white clothing and eyes, transparent background without a gray halo or new symbols.

Final generated sources are `actions-a.png`, `actions-b.png`, `actions-c.png`. Generation returned 1774×887 RGBA images. `scripts/prepare-pet-v2.py` detects row gutters, removes detached alpha dust and neighboring-cell fragments, scales with a common per-sheet factor, aligns baselines, gives jumps a vertical trajectory, and packs the 81 selected poses into the runtime 2048×3072 atlas. Original sources retain the generated alpha; no replacement of artwork with vector approximations.
