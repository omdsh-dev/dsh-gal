# Character packs

A pack is a directory with a `character.json` and one asset per activity she can be shown in (`idle`, `reading`, `writing`, `searching`, `running`, `waiting`, `failed`, `done`); missing ones borrow a stand-in, see [CHARACTER-STATES.md](../CHARACTER-STATES.md):

```
characters/<id>/
  character.json
  neutral.png   neutral.mp4     # image fallback + looping micro-animation
  happy.png     happy.mp4
  thinking.png  thinking.mp4
  surprised.png surprised.mp4
  sad.png       sad.mp4
  excited.png   excited.mp4
```

`character.json`:

```json
{
  "name": "小黑鱼",
  "greeting": "First line she speaks when the page opens.",
  "persona": "How she talks. Appended to the system prompt as a voice layer only — it never changes what the agent does.",
  "theme": { "accent": "#8fd8ff", "frame": "rgba(168,214,255,0.55)", "box": "linear-gradient(...)" },
  "playbackRate": 1.4,
  "states": { "idle": { "video": "idle.webm", "image": "base.png" } }
}
```

`memory.md` (optional) holds what the character remembers about the user; the plugin appends to it through the `gal_remember` tool and the EDIT panel edits it directly.

Only `name` is required; assets are discovered by convention (`<activity>.mp4|webm`, `<activity>.png|webp|jpg`; the older `neutral` / `thinking` / `happy` / `surprised` names still work) unless `states` names them explicitly. Videos are optional — a pack of PNGs works.

Packs are looked up by id in `~/.dsh/gal/characters/<id>` first, then in this directory, so private packs (fan art of licensed characters, personal designs) live in your home directory and never need to enter a repository. The plugin config `character` accepts an id or a path to a pack directory; the UI's **CHAR** menu switches between every discovered pack at runtime.

`playbackRate` speeds up the idle loops (image-to-video models tend to animate slowly). For smoother motion, interpolate the loops locally before shipping them:

```bash
ffmpeg -i in.mp4 -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1" -c:v libx264 -crf 18 -pix_fmt yuv420p -movflags +faststart -an out.mp4
```

Making one: generate a neutral base portrait with any image model, then edit it per activity with the base as reference so the character stays consistent. `scripts/animate.sh <sprite.png> <out.mp4> "<motion prompt>"` turns each sprite into a 5-second idle loop on fal.ai.
