# dsh-gal

A galgame / visual-novel UI for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh), packaged as a dsh plugin — plus a small macOS app that runs it standalone.

Your agent becomes a character. Each reply plays as a dialogue scene: typewriter text, one turn at a time, no scrolling wall of history, while she reacts with an animated expression picked by an emotion judge. The backlog is one click away, like a real VN. Swap the character pack and the same agent shows up as someone else — art, persona and voice included.

![dsh-gal](assets/docs/screenshot.png)

The agent underneath is unchanged. The pack's persona is registered as a voice-only system-prompt layer: it decides how replies sound, never what the agent does or which tools it runs.

## Quick start

```bash
git clone https://github.com/omdsh-dev/dsh-gal && cd dsh-gal
./scripts/build.sh        # compile src/ → lib/ against your installed dsh
npm run start:web         # opens the UI in your browser
```

Needs Node.js 22+ and a configured dsh. On macOS you can double-click `启动网页端.command` instead. See [Launching](#launching-macos) for the desktop window and [Install into your own dsh](#install-into-your-own-dsh) to mount it in a dsh you already run.

## How a turn works

1. You type in the VN input box. It sends a real user turn into the live dsh session — same tools and preset the browser UI gets. With no session open, the first message creates one.
2. Each assistant message is its own scene. It streams into the text box token by token at the model's real pace, rendered as markdown (marked + DOMPurify, so a half-arrived table or fence still renders), and is read aloud — parenthetical stage directions like （放下托盘）are shown but not spoken — and only when it has been both fully delivered and spoken does the next message take the box. A turn that runs tools produces several messages, and a message arriving early waits its turn instead of cutting the previous one off.
3. Between messages the box keeps the last line up while a small ticker shows the tool that is running, and she switches to `thinking`. Tool work is not something she says, so it never takes the panel.
4. The box scrolls and stays pinned to the newest line; scroll up to read back and **回到最新 / Jump to latest** appears. When a message is waiting, that control becomes **下一条 / Next** — click, `Space` or `Enter` hands over early.
5. A tiny side LLM call classifies the finished reply into one of six expressions; a keyword heuristic covers the fallback. The stage crossfades to that expression's idle loop.
6. Voice can be rewritten into spoken Japanese first, so you read subtitles and hear a VN-style voice track.

| expression | when she shows it |
| --- | --- |
| `neutral` | ordinary answers, and the resting state between turns |
| `thinking` | while the agent is working, and for analysis-heavy replies |
| `happy` | good news, a warm or appreciative reply |
| `sad` | bad news, apologies, something the user is hurting over |
| `surprised` | a correction, an unexpected fact, something alarming |
| `excited` | genuine enthusiasm — rare for a reserved persona |

Emotion, activity and character are tracked as one semantic state (`window.galCharacter.state`), independently of how it is rendered — see [CHARACTER-STATES.md](CHARACTER-STATES.md).

## Character packs

A pack is a directory: `character.json` plus six expression stills, and optionally six idle-motion loops.

```
characters/xiaoheiyu/
  character.json        name, greeting, persona, theme, playbackRate, voice, art prompts
  neutral.png  neutral.mp4
  happy.png    happy.mp4
  thinking.png thinking.mp4
  sad.png      sad.mp4
  surprised.png surprised.mp4
  excited.png  excited.mp4
```

- **Bundled pack: 小黑鱼 (Xiaoheiyu)**, an original orca-maid whale girl, with six 5-second idle loops. She is the only art this repository ships; her pack id is `xiaoheiyu`.
- **Your own packs** live in `~/.dsh/gal/characters/<id>` and never touch the repo. Set `DSH_GAL_CHARACTER=<id>` to start as one.
- **Prompt-only packs** ship text and image prompts but no art — pick one, generate the six images yourself, drop them onto the gallery tiles. See [prompts/README.md](prompts/README.md) and [characters/README.md](characters/README.md).
- **Import / export** a pack as a `.zip` from the **角色** panel. Exports carry art and `character.json`; what she remembers about you stays on your machine.
- **Memory** — notes about *you*, not about the character: they live in one file, `~/.dsh/gal/memory.md`, and every pack shares them, so switching characters does not lose what she knows. The file is injected each turn. She writes to it herself through the `gal_remember` tool when you tell her something worth keeping; open **MEMORY** (`M`) to read or edit it. Notes kept per-pack by an older version are folded in on first run.

## Controls

Everything has a button; the shortcuts are for when you are reading, not clicking.

| | |
| --- | --- |
| `Space` / `Enter` / click | hand over to the next message, or jump back to the newest line |
| `L` | backlog — the full scrollable log |
| `C` | 角色 › 选择角色 — switch pack live |
| `G` | 角色 › 立绘素材 — browse the six expressions, click to preview, drop a `.png` / `.mp4` on a tile to replace it |
| `E` | 角色 › 角色设定 — edit name, greeting and persona in place |
| `M` | 记忆 — what she remembers about you, shared by every character |
| `V` | mute / unmute voice |
| `H` | hide the interface and just watch her |
| `Esc` | close any panel, or restore a hidden interface |

Slash commands in the input box: `/new`, `/char [id]`, `/edit`, `/memory`, `/gallery`, `/voice`, `/log`, `/help`.

![Interface hidden with H](assets/docs/screenshot-hidden.png)

Editing or uploading art for a bundled pack copies it to `~/.dsh/gal/characters/<id>` first, so the repo copy stays pristine.

## Voice

Replies are spoken through [VOICEVOX](https://voicevox.hiroshiba.jp/) (free, local, Japanese) or a provider configured in **设置**. With `voiceLanguage: ja` (the default) a small side LLM call first rewrites the reply as a spoken Japanese line in the character's voice — you read Chinese/English subtitles and hear Japanese, like a real VN. Each pack can pick its own speaker style.

Install the engine (`voicevox_engine-macos-*.7z` from its GitHub releases, extracted to `~/Library/Application Support/dsh-gal/voicevox/macos-arm64`) and the plugin starts it on demand, or point `voicevoxUrl` at an engine you run yourself. Without an engine the feature is silently off. Providers and keys: [SPEECH.md](SPEECH.md).

## Launching (macOS)

Double-click one of these in Finder:

- **启动客户端.command** — standalone native window
- **启动网页端.command** — the same UI in your default browser
- **选择启动方式.command** — asks which (Enter picks desktop)

Or from the terminal:

```bash
npm start                 # choose desktop or browser
npm run start:desktop     # standalone window
npm run start:web         # default browser
```

Both launchers serve this checkout's UI at `http://127.0.0.1:4878/`, backed by dsh on port 4877. They reuse matching services that are already up and start only what is missing. Sessions and saved voice-provider settings are shared; browser-local preferences such as interface language stay separate between the browser and the native WebView.

Keep the terminal window open while it runs services. `Ctrl+C` stops only the processes that launcher started; desktop mode also cleans up its own on exit. A reused service stays under its original owner — if that owner exits, dependent windows lose the connection. A port held by an unrelated or older server produces an error instead of being killed.

Prerequisites: Node.js 22+, a configured dsh (the app's private runtime is preferred, otherwise `dsh` on PATH), and compiled `lib/` (`./scripts/build.sh`). Desktop mode also needs the built shell (`cd app && npm run build`). For a headless startup check: `node scripts/launch.mjs web --smoke --no-open`.

## The app (macOS)

`app/` is a Tauri 2 shell: a native window around the plugin's UI, with a supervisor that owns its own dsh.

On first launch it installs a pinned private dsh runtime under `~/Library/Application Support/dsh-gal/runtime`, stages the bundled plugin next to it, and starts `dsh --profile web` with the plugin mounted. It reuses your `~/.dsh` (keys, settings, sessions). If a dsh-gal server already answers on `127.0.0.1:4877` it just attaches. Closing the window stops the dsh it started.

```bash
./scripts/build.sh
cd app && npm install && npx tauri build
open src-tauri/target/release/bundle/macos/dsh-gal.app
```

## Install into your own dsh

```bash
git clone https://github.com/omdsh-dev/dsh-gal
cd dsh-gal && ./scripts/build.sh
```

Register it in `~/.dsh/cordis.patch.yml`:

```yaml
- insert:
    - id: dsh-gal
      name: /absolute/path/to/dsh-gal/lib/index.js
      config:
        port: 4877          # UI at http://127.0.0.1:4877/
        character: xiaoheiyu    # pack id, or a path to a pack directory
```

Start `dsh web` as usual and open `http://127.0.0.1:4877/`. Built and tested against dsh 0.1.5-rc.1; `scripts/build.sh` links against the install behind `dsh` on your PATH (override with `DSH_PKG_ROOT`).

## Configuration

| key | default | description |
| --- | --- | --- |
| `port` | `4877` | Listen port on 127.0.0.1 |
| `token` | `""` | Optional shared token appended to the URL |
| `character` | `xiaoheiyu` | Pack id (`~/.dsh/gal/characters/<id>`, then bundled `characters/<id>`) or a path |
| `characterName` | pack name | Override the nameplate |
| `greeting` | pack greeting | Override the opening line |
| `personaEnabled` | `true` | Register the pack persona as a system-prompt voice layer |
| `judgeEnabled` | `true` | Use an LLM call to pick the expression (heuristic fallback otherwise) |
| `judgeTimeoutMs` | `8000` | Deadline for the emotion judge before falling back |
| `judgeProvider` / `judgeModel` | agent's route | Route override for the judge and translation calls |
| `voiceEnabled` | `true` | Speak replies when a VOICEVOX engine is reachable |
| `voicevoxUrl` | `http://127.0.0.1:50021` | VOICEVOX engine base URL |
| `voicevoxEngine` | `~/Library/Application Support/dsh-gal/voicevox/macos-arm64/run` | Local engine binary to auto-start (`""` = never) |
| `voiceSpeaker` | `2` | Fallback VOICEVOX style id when the pack sets none (`voice.speaker` in `character.json`) |
| `voiceLanguage` | `ja` | `ja` translates non-Japanese replies before synthesis; `auto` speaks the reply as written |

## Making a character pack

The fastest reliable route — the one the bundled 小黑鱼 pack was built with:

1. **One base portrait.** Generate the character full-body on a plain background. This is the design reference; nothing after this step is allowed to redraw her.
2. **One stage keyframe.** Regenerate her *in the scene*, 16:9, framed from about mid-thigh up, with the lower third kept visually calm because the dialogue box sits there. Keep the base portrait as the reference image.
3. **Five more expressions — with two references.** Pass both the base portrait (who she is) and the stage keyframe (composition, palette, lighting, camera distance), and let the prompt change only the face and arms. Two references is what stops the background and framing from drifting between expressions; one reference is not enough.
4. **Idle loops.** `scripts/animate.sh <still.png> <out.mp4> "<motion prompt>" [h3]` turns each still into a looping clip on fal.ai (Seedance 2.0 mini by default, MiniMax H3 with `h3` — H3 is the more permissive of the two for stylised characters). Write the motion prompt as *breathing, blinking, hair and cloth drifting*, and say explicitly that the camera is locked off and the pose unchanged.

   A loop needs its last frame to lead back into its first, or it pops once per cycle. The script does that in two steps: it passes the still as the end frame as well as the start frame, and then crossfades the tail back onto the head locally. The model alone is not enough — asking for the end frame gets the pose close but does not land on it.
5. **Install.** Upload each file from **立绘素材**, or drop everything plus a `character.json` into `~/.dsh/gal/characters/<id>/`.

Quickest path of all: pick a prompt-only pack from **角色**, open **人设与记忆** to copy its image prompts into the image model of your choice, and drop the six results onto the gallery tiles.

Keep `art.base`, `art.expressions` and `art.motion` in `character.json` up to date — they are the recipe for regenerating the pack later, and what a prompt-only pack hands to its next owner.

## Status and limitations

- The stage sits on one fixed backdrop behind the character. There is no background picker: pack art is full-frame and carries its own environment, so a separate background choice only fought with it.
- Idle loops are 5-second clips, not seamless cycles; the wrap is visible if you stare at it.
- Expressions are whole-clip swaps, not a rig. She cannot hold an expression while lip-syncing a specific line, and there is no per-phoneme mouth movement.

## What this repository distributes

Text only, for third-party characters: persona prompts, greetings, themes, and image-prompt descriptions under [`prompts/`](prompts/README.md). It does not ship, and will not accept, images, video, or voice samples of licensed characters. You generate those yourself, on your own machine, for your own use, and keep them in `~/.dsh/gal/characters/<id>/`, outside the repository. The only bundled art is 小黑鱼, an original character.

## UI development

The interface source is `ui/src/` (React 19 + shadcn/ui + Tailwind + Vite); the build output in `web/ui/` is shared by the browser and the desktop shell and is checked in.

```bash
npm ci --prefix ui              # once
npm run check:ui && npm run build:ui
npm --prefix ui run dev         # rebuild on change; refresh the page to see it
```

Components, the controller adapter and validation notes: [ui/README.md](ui/README.md).

## License

BSD-3-Clause
