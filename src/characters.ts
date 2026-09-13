/**
 * Character packs: a directory holding `character.json` plus the expression
 * assets it names. Packs are discovered from the plugin's own `characters/`
 * directory and from the user directory (`~/.dsh/gal/characters` by default),
 * so a private pack never has to live inside the public repository.
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, isAbsolute, join, resolve } from 'node:path'
import { EMOTIONS, type Emotion } from './emotion.js'

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
  art?: { base?: string; expressions?: Partial<Record<Emotion, string>>; motion?: string }
  /**
   * Expression → asset file names relative to the pack directory. When absent,
   * `<emotion>.mp4` / `<emotion>.webm` and `<emotion>.png` / `.webp` are
   * discovered by convention.
   */
  emotions?: Partial<Record<Emotion, { video?: string; image?: string }>>
}

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
  art?: { base?: string; expressions?: Partial<Record<Emotion, string>>; motion?: string }
  /** True when the pack ships no expression assets (prompt-only pack). */
  promptOnly: boolean
  emotions: Partial<Record<Emotion, { video?: string; image?: string }>>
}

const VIDEO_EXTS = ['.mp4', '.webm']
const IMAGE_EXTS = ['.png', '.webp', '.jpg']

/** Default location for user-owned packs. */
export function userCharactersDir(): string {
  return process.env['DSH_GAL_CHARACTERS'] ?? join(process.env['DSH_HOME'] ?? join(homedir(), '.dsh'), 'gal', 'characters')
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
  const emotions: CharacterPack['emotions'] = {}
  for (const emotion of EMOTIONS) {
    const declared = file.emotions?.[emotion] ?? {}
    const video = declared.video !== undefined && existsSync(join(dir, declared.video))
      ? declared.video
      : firstExisting(dir, emotion, VIDEO_EXTS)
    const image = declared.image !== undefined && existsSync(join(dir, declared.image))
      ? declared.image
      : firstExisting(dir, emotion, IMAGE_EXTS)
    if (video !== undefined || image !== undefined) emotions[emotion] = { ...video === undefined ? {} : { video }, ...image === undefined ? {} : { image } }
  }
  // A pack with no assets is still a pack when it declares itself (character.json).
  if (Object.keys(emotions).length === 0 && !existsSync(manifestPath)) return undefined
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
    promptOnly: Object.keys(emotions).length === 0,
    emotions,
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
export function saveCharacterPack(pack: CharacterPack, patch: CharacterPatch, bundledDir: string, promptsDir?: string): CharacterPack {
  let dir = pack.dir
  if (dir.startsWith(bundledDir) || (promptsDir !== undefined && dir.startsWith(promptsDir))) {
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

/** Make sure the pack lives in the user directory (copies bundled/prompt packs); returns it. */
export function materializePack(pack: CharacterPack, bundledDir: string, promptsDir?: string): CharacterPack {
  return saveCharacterPack(pack, {}, bundledDir, promptsDir)
}

/** Write one uploaded asset into the pack (copying it to the user dir first) and reload. */
export function storePackAsset(pack: CharacterPack, emotion: Emotion, kind: 'image' | 'video', ext: string, data: Buffer, bundledDir: string, promptsDir?: string): CharacterPack {
  const live = materializePack(pack, bundledDir, promptsDir)
  // one file per emotion+kind: drop other extensions so discovery is unambiguous
  for (const old of kind === 'image' ? IMAGE_EXTS : VIDEO_EXTS) {
    const stale = join(live.dir, `${emotion}${old}`)
    if (old !== ext && existsSync(stale)) unlinkSync(stale)
  }
  writeFileSync(join(live.dir, `${emotion}${ext}`), data)
  const reloaded = loadCharacterPack(live.dir, live.id)
  if (reloaded === undefined) throw new Error('pack unreadable after upload')
  return reloaded
}

/**
 * Resolve a config value to a pack: an absolute/relative path to a pack
 * directory, or a pack id looked up in the user directory first, then the
 * plugin's bundled `characters/`.
 */
export function resolveCharacterPack(spec: string, bundledDir: string, promptsDir?: string): CharacterPack | undefined {
  if (spec.includes('/') || spec.includes('\\')) {
    const dir = isAbsolute(spec) ? spec : resolve(process.cwd(), spec)
    return loadCharacterPack(dir)
  }
  for (const root of [userCharactersDir(), bundledDir, ...promptsDir === undefined ? [] : [promptsDir]]) {
    const pack = loadCharacterPack(join(root, spec), spec)
    if (pack !== undefined) return pack
  }
  return undefined
}

/** Every discoverable pack, user packs shadowing bundled ones by id. */
export function listCharacterPacks(bundledDir: string, promptsDir?: string): CharacterPack[] {
  const packs = new Map<string, CharacterPack>()
  for (const root of [...promptsDir === undefined ? [] : [promptsDir], bundledDir, userCharactersDir()]) {
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
  ].join('\n')
}
