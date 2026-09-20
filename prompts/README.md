# Prompt-only character packs

Everything in this directory is **text**: a name, a greeting, a persona (the system-prompt voice layer), a UI theme, and an `art` block describing how the character should look. No images or videos are distributed here, and none should be added.

Why: fan art of licensed characters — including AI-generated fan art — is a derivative work. A written description of how a character talks and looks is not. This project ships the description; you generate the pictures on your own machine, for your own use, and keep them in `~/.dsh/aibo/characters/<id>/`.

## Included packs

| id | character | source |
|---|---|---|
| `xiaolanyu` | 小蓝鱼 — the lazy, hungry blue whale girl (DeepSeek娘 meme) | DeepSeek logo fan meme |
| `xiaoheiyu-night` | 小黑鱼 · 夜班 — the same orca girl in her night-shift look: dim office, black turtleneck, fewer words. The bundled `xiaoheiyu` pack is her, drawn, in the undersea house | original |
| `haibara` | 灰原哀 | Detective Conan |
| `frieren` | Frieren | Frieren: Beyond Journey's End |
| `maomao` | 猫猫 | The Apothecary Diaries |
| `rem` / `emilia` | 蕾姆 / 艾米莉娅 | Re:Zero |
| `gojo` | 五条悟 | Jujutsu Kaisen |
| `makima` | 玛奇玛 | Chainsaw Man |
| `zerotwo` | 02 | Darling in the Franxx |
| `furina` / `hutao` | 芙宁娜 / 胡桃 | Genshin Impact |
| `firefly` | 流萤 | Honkai: Star Rail |
| `miku` | 初音未来 | Vocaloid |
| `anya` | 阿尼亚 | Spy x Family |
| `marin` | 喜多川海梦 | My Dress-Up Darling |
| `mai` | 樱岛麻衣 | Rascal Does Not Dream of Bunny Girl Senpai |

Picked from what is currently most chatted on character-chat platforms plus the DeepSeek mascot memes. Personas are written to be a voice layer only; none of them changes what the agent does.

## Using one

1. Pick the pack in the **CHAR** menu — prompt-only packs are listed alongside the others and work immediately with a placeholder stage.
2. Open **EDIT** and save once. That copies the pack into `~/.dsh/aibo/characters/<id>/`, which is where your generated files go.
3. Generate a neutral base image with any image model using `art.base`, then five variants using `art.expressions` with the base as the reference image so the character stays consistent. Save them in that directory named by activity (`idle.png`, `reading.png`, `writing.png`, `failed.png`, `done.png`, …); the prompt's older names (`neutral`, `thinking`, `surprised`, `happy`) work too as stand-ins, and any activity without a file borrows a neighbour. Optional: `scripts/animate.sh` turns each into an idle loop (`art.motion` is the prompt), and `ffmpeg minterpolate` smooths them to 60 fps.
4. Switch away and back (or restart) — the stage picks the files up.

## Writing one

Copy `haibara/character.json`, keep the same keys. `art.base` should be a complete standalone image prompt; `art.expressions` are short deltas applied on top of the base; `art.motion` is the image-to-video prompt.
