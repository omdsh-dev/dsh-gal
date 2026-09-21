# Xiaoheiyu idle meme series

First release: three eight-frame clips (24 new frames), packed after the 81 existing frames into `app/ui/pet/sprites-v3.png` (8×15, 105 occupied cells). `scripts/prepare-pet-memes.py` preserves the generated alpha and normalizes frame scale/baselines. Existing v2 art is unchanged.

| Clip | Inspiration | Sequence | Duration |
| --- | --- | --- | --- |
| `meme-rice` | User's explicit plain-white-rice meme request | hold bowl → scoop → raise spoon → eat → chew → smile | 4.66 s |
| `meme-nap` | dsh-stickers `fish-philosophy` | pull blanket → droop → doze/breathe → sleepy blink | 7.8 s |
| `meme-book` | dsh-stickers `deep-thought` | read → follow page → lift/turn page → nod | 5.45 s |

Source inspected: https://github.com/william-jin-cmu/dsh-stickers . Its black whale girl sticker set is credited to 少女阿原 (@ayuanwong). Relevant reference PNGs and the repository's BSD-3-Clause LICENSE are retained in `reference/`. They are research references, not shipped sprites. The `enough` sticker actually shows a food gesture, and `no-thanks` holds a book; neither is represented as a verified white-rice source. Plain rice is the user's requested new action.

New sheet `generated-sheet.png` was generated with the built-in imagegen tool using existing `assets/pet/v2/actions-a.png` as the required character/style reference and the nap/book stickers as prop/action inspiration. Prompt required an 8×3 equal-cell transparent PNG, consistent chibi scale, loop ahoge, black/white long hair, blue eyes, maid dress and complete orca tail. Eight successive poses per row: plain white rice with bowl and spoon; pale blue blanket nap; navy open book with a visible page turn. No words, icons, extra animals, sticker outline or scene. The PNG has genuine alpha; near-transparent matte dust is removed by the packing script.

Playback: wait 30–60 seconds of eligible idle, choose a different clip from the previous one, play once, return to normal idle and start a new cooldown. No messages or fake workflow states. Hover, drag, explicit caret/CU gaze, hiding, task activity and reduced motion take precedence. Desktop mouse movement and unchanged status polls do not restart cooldown or animation.

Other catalog candidates: `enough` (satisfied nod/OK gesture), `human-questions` (puzzled head tilt). Keep workflow/error stickers such as server-busy, restart-myself and subagents-down out of random idle playback to avoid suggesting a real fault.
