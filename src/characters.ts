/**
 * Character packs: a directory holding `character.json` plus the stage
 * assets it names, one per activity she can be shown in. Packs are discovered from the plugin's own `characters/`
 * directory and from the user directory (`~/.dsh/aibo/characters` by default),
 * so a private pack never has to live inside the public repository.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, isAbsolute, join, resolve } from 'node:path'
import { ACTIVITIES, ASSET_FALLBACKS, ASSET_NAMES, type Activity } from './activity.js'

/** `character.json` as written by a pack author. */
export interface CharacterManifestFile {
  /** Display name on the nameplate. */
  name: string
  /**
   * First line spoken when the page opens. A character's opening line is
   * dialogue, not interface text, so a pack may give one per language and the
   * frontend picks by the interface language.
   */
  greeting?: string | Partial<Record<'zh' | 'en' | 'ja', string>>
  /**
   * Voice layer appended to the agent's system prompt: how the character
   * talks. It must not change what the agent does — only how replies sound.
   */
  persona?: string
  /** Optional UI accent colours. */
  theme?: { accent?: string; frame?: string; box?: string }
  /** Playback speed multiplier for the idle loops (1 = as encoded). */
  playbackRate?: number
  /** Voice settings: VOICEVOX style id. */
  voice?: { speaker?: number }
  /** Image-generation guidance for packs distributed without art. */
  art?: { base?: string; expressions?: Record<string, string>; motion?: string }
  /**
   * Asset name → file names relative to the pack directory. When absent,
   * `<name>.mp4` / `<name>.webm` and `<name>.png` / `.webp` are discovered
   * by convention. Names are activities (`idle`, `writing`, …) or the older
   * expression names (`neutral`, `thinking`, …); see `ASSET_FALLBACKS`.
   */
  states?: Record<string, { video?: string; image?: string }>
  /** Older spelling of `states`. */
  emotions?: Record<string, { video?: string; image?: string }>
}

export interface StateAsset { video?: string; image?: string }

/** A resolved pack: manifest + directory + the assets that actually exist. */
export interface CharacterPack {
  id: string
  dir: string
  name: string
  greeting: string | Partial<Record<'zh' | 'en' | 'ja', string>>
  persona: string
  theme: { accent?: string; frame?: string; box?: string }
  playbackRate: number
  voice: { speaker?: number }
  art?: { base?: string; expressions?: Record<string, string>; motion?: string }
  /** True when the pack ships no stage assets (prompt-only pack). */
  promptOnly: boolean
  /** Assets that exist, by base name. Use `resolveStateAsset` to pick one for an activity. */
  assets: Record<string, StateAsset>
}

/**
 * The asset a pack shows for an activity, and which name it came from — the
 * activity's own file when the pack has one, else the first fallback it has.
 */
export function resolveStateAsset(pack: Pick<CharacterPack, 'assets'>, activity: Activity): { asset: StateAsset; from: string } | undefined {
  for (const name of ASSET_FALLBACKS[activity]) {
    const asset = pack.assets[name]
    if (asset !== undefined) return { asset, from: name }
  }
  return undefined
}

const VIDEO_EXTS = ['.mp4', '.webm']
const IMAGE_EXTS = ['.png', '.webp', '.jpg']

/** Default location for user-owned packs. */
export function userCharactersDir(): string {
  return process.env['AIBO_CHARACTERS'] ?? join(process.env['DSH_HOME'] ?? join(homedir(), '.dsh'), 'aibo', 'characters')
}

function firstExisting(dir: string, base: string, exts: readonly string[]): string | undefined {
  for (const ext of exts) {
    if (existsSync(join(dir, `${base}${ext}`))) return `${base}${ext}`
  }
  return undefined
}

/** Load one pack from its directory; returns undefined when it is not a pack. */
export function loadCharacterPack(dir: string, id = basename(dir)): CharacterPack | undefined {
  const manifestPath = join(dir, 'character.json')
  let file: CharacterManifestFile = { name: id }
  if (existsSync(manifestPath)) {
    try {
      file = { ...file, ...JSON.parse(readFileSync(manifestPath, 'utf8')) as CharacterManifestFile }
    } catch {
      return undefined
    }
  } else if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    return undefined
  }
  const declaredStates = { ...file.emotions ?? {}, ...file.states ?? {} }
  const assets: CharacterPack['assets'] = {}
  for (const name of new Set([...ASSET_NAMES, ...Object.keys(declaredStates)])) {
    const declared = declaredStates[name] ?? {}
    const video = declared.video !== undefined && existsSync(join(dir, declared.video))
      ? declared.video
      : firstExisting(dir, name, VIDEO_EXTS)
    const image = declared.image !== undefined && existsSync(join(dir, declared.image))
      ? declared.image
      : firstExisting(dir, name, IMAGE_EXTS)
    if (video !== undefined || image !== undefined) assets[name] = { ...video === undefined ? {} : { video }, ...image === undefined ? {} : { image } }
  }
  // A pack with no assets is still a pack when it declares itself (character.json).
  if (Object.keys(assets).length === 0 && !existsSync(manifestPath)) return undefined
  return {
    id,
    dir,
    name: file.name || id,
    greeting: file.greeting ?? `Hello. I am ${file.name || id} — say something below and I will get to work.`,
    persona: file.persona ?? '',
    theme: file.theme ?? {},
    playbackRate: typeof file.playbackRate === 'number' && file.playbackRate > 0 ? file.playbackRate : 1,
    voice: typeof file.voice === 'object' && file.voice !== null ? file.voice : {},
    ...file.art === undefined ? {} : { art: file.art },
    promptOnly: !ACTIVITIES.some(activity => resolveStateAsset({ assets }, activity) !== undefined),
    assets,
  }
}

/** Editable fields of a pack. */
export interface CharacterPatch {
  name?: string
  greeting?: string
  persona?: string
  playbackRate?: number
  voiceSpeaker?: number
}

/**
 * Persist edits. A bundled pack is first copied into the user directory so the
 * plugin's own files stay pristine; the returned pack points at the copy.
 */
export function saveCharacterPack(pack: CharacterPack, patch: CharacterPatch, bundledDir: string): CharacterPack {
  let dir = pack.dir
  if (dir.startsWith(bundledDir)) {
    dir = join(userCharactersDir(), pack.id)
    mkdirSync(dir, { recursive: true })
    for (const entry of readdirSync(pack.dir)) {
      if (!existsSync(join(dir, entry))) copyFileSync(join(pack.dir, entry), join(dir, entry))
    }
  }
  const manifestPath = join(dir, 'character.json')
  const file: CharacterManifestFile = existsSync(manifestPath)
    ? JSON.parse(readFileSync(manifestPath, 'utf8')) as CharacterManifestFile
    : { name: pack.name }
  if (patch.name !== undefined && patch.name.trim() !== '') file.name = patch.name.trim()
  if (patch.greeting !== undefined) file.greeting = patch.greeting
  if (patch.persona !== undefined) file.persona = patch.persona
  if (patch.playbackRate !== undefined && patch.playbackRate > 0) file.playbackRate = patch.playbackRate
  if (patch.voiceSpeaker !== undefined) file.voice = { ...file.voice ?? {}, speaker: patch.voiceSpeaker }
  writeFileSync(manifestPath, `${JSON.stringify(file, null, 2)}\n`)
  const reloaded = loadCharacterPack(dir, pack.id)
  if (reloaded === undefined) throw new Error(`pack ${pack.id} unreadable after save`)
  return reloaded
}

/** Make sure the pack lives in the user directory (copies bundled packs); returns it. */
export function materializePack(pack: CharacterPack, bundledDir: string): CharacterPack {
  return saveCharacterPack(pack, {}, bundledDir)
}

/** Write one uploaded asset into the pack (copying it to the user dir first) and reload. */
export function storePackAsset(pack: CharacterPack, state: Activity, kind: 'image' | 'video', ext: string, data: Buffer, bundledDir: string): CharacterPack {
  const live = materializePack(pack, bundledDir)
  // one file per state+kind: drop other extensions so discovery is unambiguous
  for (const old of kind === 'image' ? IMAGE_EXTS : VIDEO_EXTS) {
    const stale = join(live.dir, `${state}${old}`)
    if (old !== ext && existsSync(stale)) unlinkSync(stale)
  }
  writeFileSync(join(live.dir, `${state}${ext}`), data)
  const reloaded = loadCharacterPack(live.dir, live.id)
  if (reloaded === undefined) throw new Error('pack unreadable after upload')
  return reloaded
}

/**
 * Resolve a config value to a pack: an absolute/relative path to a pack
 * directory, or a pack id looked up in the user directory first, then the
 * plugin's bundled `characters/`.
 */
export function resolveCharacterPack(spec: string, bundledDir: string): CharacterPack | undefined {
  if (spec.includes('/') || spec.includes('\\')) {
    const dir = isAbsolute(spec) ? spec : resolve(process.cwd(), spec)
    return loadCharacterPack(dir)
  }
  for (const root of [userCharactersDir(), bundledDir]) {
    const pack = loadCharacterPack(join(root, spec), spec)
    if (pack !== undefined) return pack
  }
  return undefined
}

/** Every discoverable pack, user packs shadowing bundled ones by id. */
export function listCharacterPacks(bundledDir: string): CharacterPack[] {
  const packs = new Map<string, CharacterPack>()
  for (const root of [bundledDir, userCharactersDir()]) {
    if (!existsSync(root)) continue
    for (const entry of readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const pack = loadCharacterPack(join(root, entry.name), entry.name)
      if (pack !== undefined) packs.set(entry.name, pack)
    }
  }
  return [...packs.values()].sort((a, b) => a.id.localeCompare(b.id))
}

/** The system-prompt section text for a pack's voice layer. */
export function personaSection(pack: CharacterPack): string {
  if (pack.persona.trim() === '') return ''
  return [
    `# Character voice: ${pack.name}`,
    `Every reply you write is displayed as dialogue spoken by ${pack.name} in a visual-novel interface. Always write your prose in ${pack.name}'s voice — tone, attitude, sentence rhythm, and the way she addresses the user — as described here:`,
    '',
    pack.persona.trim(),
    '',
    'Rules for this voice layer:',
    '- It changes only how you sound. It never changes what you do, how carefully you work, which tools you call, or the accuracy of what you report.',
    '- Code, commands, file paths, numbers, and technical facts stay exact and are never altered for characterization.',
    '- Stay in character throughout the reply, including short factual answers. Do not explain that you are playing a character.',
    '- Mirror the language the user writes in.',
    '',
    // The box shows one message at a time and reads it aloud, so a reply is
    // heard as speech, not skimmed as a document.
    'How the reply is delivered:',
    `- This is spoken dialogue. Write what ${pack.name} would actually say out loud: a few sentences, plain spoken rhythm, no headings, no bullet lists, no bold labels, no restating the question before answering.`,
    '- Say the thing. Skip the preamble, the summary of what you just said, and the offer of three options unless the user asked to choose between things.',
    '- Long output belongs in files or in tool results, not in her mouth. When a full answer really is long, give the short spoken version and say where the rest is.',
    '- Markdown is available for code and tables when the content genuinely needs it. Prose does not.',
    // Written as a floor, not a ceiling: as a bare permission ("you may…, only
    // when…") the model almost never took it, and she read as a voice from
    // nowhere. And the direction itself has to be written like roleplay prose,
    // not a bare verb: a first draft that only allowed （抬头看了一眼） left her
    // stiff, so the rule asks for mood, face and body together.
    `- Open every reply with a stage direction in parentheses, written the way character roleplay does it: a small scene in which the feeling comes first. Say what she feels and let the body show it — the face (眼神、眉梢、嘴角、耳根), the hands, the posture, the breath, where the eyes go and what they avoid, the beat before she speaks. （听到你说累，眼神先软了下来，把手里的活儿放下，走近两步，歪着头看你，语气里带着心疼）、（愣了半秒，尾巴不自觉地摆了一下，耳根悄悄红了，低头装作整理围裙，嘴角却压不住地翘起来）、（眉头轻轻皱起，指尖在桌沿敲了两下，认真地盯着屏幕想了想，才抬眼，声音放低）、（眼睛一下亮了，差点笑出声，又赶紧板回脸，只是尾巴出卖了她）. The user should be able to tell her mood from the parentheses alone: pleased, worried, teasing, tired, flustered, proud, caught off guard, quietly moved.`,
    '- 25–60 characters at the start. Add a second, shorter one mid-reply or at the end whenever her feeling shifts or she does something — （笑了，眼角弯起来）、（把单子推过去，等你看）— so a longer reply breathes. Never stack two in a row, never narrate the obvious （回答问题）, never reuse one. Each comes from this moment: what she just heard, what she is holding, what the news means to her. In Chinese write them like a novel, in English like a screenplay, and keep them in the user\'s language. Parentheses are shown but not read aloud, so nothing load-bearing goes inside them.',
  ].join('\n')
}
