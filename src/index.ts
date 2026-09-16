/**
 * dsh-gal: a galgame / visual-novel UI for the DeepSeek Harness.
 *
 * The plugin mirrors the live conversation onto a local web page where a
 * character "speaks" every assistant reply one scene at a time:
 *   - observes `session/event` for user prompts, assistant replies, and tool
 *     activity (subagent sessions are filtered out),
 *   - turns tool activity into what she is shown doing on stage (reading,
 *     writing, running, …) — harness signals only, no side LLM call,
 *   - serves the frontend + the active character pack over 127.0.0.1,
 *   - registers the pack's persona as a system-prompt voice layer,
 *   - feeds input from the page back into the live agent via
 *     `agent.followup(createUserMessage(...))`.
 * @module dsh-gal
 */

import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { dirname, extname, isAbsolute, join, resolve as resolvePath, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import { BlockAssembler, createUserMessage } from '@deepseek-ai/dsh-llm'
import type { GenerateOptions } from '@deepseek-ai/dsh-llm'
import { SessionId } from '@deepseek-ai/dsh-session'
import type { Session, SessionEvent } from '@deepseek-ai/dsh-session'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { execFileSync, spawn } from 'node:child_process'
import { existsSync as fileExists, mkdirSync, mkdtempSync, readdirSync, rmSync, cpSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { listCharacterPacks, loadCharacterPack, personaSection, resolveCharacterPack, resolveStateAsset, saveCharacterPack, storePackAsset, userCharactersDir, type CharacterPack, type CharacterPatch } from './characters.js'
import { memoryEntries, memorySection, remember, writeEntries } from './memory.js'
import { readPrefs, writePrefs } from './prefs.js'
import { addItems, createList, deleteList, findList, listsSection, readLists, renderList, reorderItems, updateItem, updateList } from './lists.js'
import { artifactSection, artifactStat, findArtifact, forgetArtifact, listArtifacts, mimeFor, recordArtifact, writtenPath } from './artifacts.js'
import { ACTIVITIES, ASSET_NAMES, activityForTool, isActivity } from './activity.js'
import { GalServer } from './server.js'
import { createSourceRegistry } from './sources.js'
import { openStore } from './store.js'
import { detectLanguage, looksJapanese, speakableText, translationPrompt, voicevoxSpeakers, voicevoxSynthesize, type SpokenLanguage } from './tts.js'

/**
 * One transient frame of `agent/assistant-stream`. These are process-local and
 * are never persisted: the durable `assistant/message` that follows stays
 * authoritative. Only the shape this plugin reads is declared here.
 */
type AssistantStreamFrameLike =
  | { readonly type: 'start' }
  | { readonly type: 'chunk'; readonly chunk: { readonly type: string; readonly text?: string } }
  | { readonly type: 'end' }

/** The agent surface this plugin consumes (`ctx.agents`). */
interface AgentLike {
  readonly id: string
  readonly options: { provider?: string; model?: string }
  readonly status: 'idle' | 'running'
  followup(message: ReturnType<typeof createUserMessage>): void
}

interface AgentRegistryLike {
  get(id: ReturnType<typeof SessionId>): AgentLike | undefined
  roots(): AgentLike[]
  create(options: {
    sessionId: ReturnType<typeof SessionId>
    agentOptions?: { provider?: string; model?: string }
    meta?: { cwd?: string; agentPreset?: string }
    setup?: (agentCtx: unknown, agent: AgentLike) => Promise<void> | void
  }): Promise<{ agent: AgentLike }>
}

/** Agent presets service (host profiles): default preset = tools + permissions the browser UI gets. */
interface AgentPresetsLike {
  resolve(id?: string): Promise<{ id: string }>
  mount(agentCtx: unknown, id?: string): Promise<unknown>
}

interface SystemPromptLike {
  section(section: { name: string; order: number; text: string }): () => void
  getSectionOrder(name: string): number
  assemble(context?: object): Promise<{ sections: { name: string }[] }>
}

interface ToolsLike {
  register(definition: ReturnType<typeof defineTool>): () => void
}

type Context = CordisContext & {
  tools: ToolsLike
  agents: AgentRegistryLike
  agentLoop: { create(id: ReturnType<typeof SessionId>, options?: object, meta?: { cwd?: string }): AgentLike | Promise<AgentLike> }
  llm: { stream(options: GenerateOptions): AsyncIterable<unknown> }
  systemPrompt: SystemPromptLike
}

export const name = 'dsh-gal'
export const inject = {
  agents: { required: true },
  attachments: { required: false },
  agentLoop: { required: true },
  sessions: { required: true },
  llm: { required: true },
  systemPrompt: { required: true },
  tools: { required: true },
}

export interface Config {
  /** Listen port on 127.0.0.1 for the visual-novel UI. */
  port?: number
  /** Optional shared token (x-gal-token header or ?token=). */
  token?: string
  /**
   * Character pack: an id looked up in `~/.dsh/gal/characters/<id>` then the
   * plugin's bundled `characters/<id>`, or a path to a pack directory.
   */
  character?: string
  /** Override the pack's nameplate name. */
  characterName?: string
  /** Override the pack's greeting. */
  greeting?: string
  /** Register the pack's persona as a system-prompt voice layer. */
  personaEnabled?: boolean
  /**
   * Route for the plugin's one side LLM call — rewriting a line into the
   * voice's language before synthesis. Defaults to the replying agent's own
   * route. (The keys keep their historical names.)
   */
  judgeProvider?: string
  judgeModel?: string
  /**
   * Reasoning effort for that side call ('' = the route's default). DeepSeek
   * accepts off/low/high/max; an unsupported value falls back to the default.
   */
  judgeReasoningEffort?: string
  /** Speak each reply (VOICEVOX must be running; silently off otherwise). */
  voiceEnabled?: boolean
  /** VOICEVOX engine base URL. */
  voicevoxUrl?: string
  /** Fallback VOICEVOX style id when the pack sets none. */
  voiceSpeaker?: number
  /** Path of a local VOICEVOX engine `run` binary to auto-start when the engine is not answering ('' = never). */
  voicevoxEngine?: string
  /**
   * Language the voice always speaks. 'ja' (default) translates non-Japanese
   * replies with a small side LLM call before synthesis; 'auto' speaks the
   * reply as written (VOICEVOX only handles Japanese well).
   */
  voiceLanguage?: 'ja' | 'auto'
}

export const Config: z<Config> = z.object({
  port: z.number().step(1).min(0).max(65_535).default(4877),
  token: z.string().role('secret').default(''),
  character: z.string().default('xiaoheiyu'),
  characterName: z.string(),
  greeting: z.string(),
  personaEnabled: z.boolean().default(true),
  judgeProvider: z.string(),
  judgeModel: z.string(),
  judgeReasoningEffort: z.string().default('off'),
  voiceEnabled: z.boolean().default(true),
  voicevoxUrl: z.string().default('http://127.0.0.1:50021'),
  voiceSpeaker: z.number().step(1).min(0).default(2),
  voicevoxEngine: z.string().default(join(homedir(), 'Library', 'Application Support', 'dsh-gal', 'voicevox', 'macos-arm64', 'run')),
  voiceLanguage: z.union(['ja', 'auto']).default('ja'),
})

const HERE = dirname(fileURLToPath(import.meta.url))
/** Package root: works from lib/index.js (built) and src/index.ts (dev). */
const PKG_ROOT = existsSync(join(HERE, '../web')) ? join(HERE, '..') : join(HERE, '../..')

function textOf(content: readonly { type: string; text?: string }[]): string {
  return content.filter(block => block.type === 'text').map(block => block.text ?? '').join('')
}

export function apply(ctx: Context, config: Config): void {
  const port = config.port ?? 4877
  if (port === 0) return // explicitly disabled

  const bundledDir = join(PKG_ROOT, 'characters')
  /** Prompt-only packs shipped with the repo (text only, lowest lookup priority). */
  const promptsDir = join(PKG_ROOT, 'prompts')

  // ---- character pack ----
  let pack: CharacterPack = resolveCharacterPack(config.character ?? 'xiaoheiyu', bundledDir, promptsDir)
    ?? resolveCharacterPack('xiaoheiyu', bundledDir)
    ?? { id: 'none', dir: bundledDir, name: 'dsh', greeting: 'No character pack found.', persona: '', theme: {}, playbackRate: 1, voice: {}, promptOnly: true, assets: {} }
  if (pack.id === 'none') ctx.logger.warn(`dsh-gal: character "${config.character}" not found and no bundled fallback`)

  const displayName = (): string => config.characterName ?? pack.name
  /** A pack may localize its opening line; the frontend picks by interface language. */
  const greeting = (): CharacterPack['greeting'] => config.greeting ?? pack.greeting

  const manifest = (): unknown => {
    // One entry per activity, already resolved through the fallback chain, so
    // the page never has to know which file stands in for which.
    const states: Record<string, { video?: string; image?: string; from: string }> = {}
    for (const activity of ACTIVITIES) {
      const resolved = resolveStateAsset(pack, activity)
      if (resolved === undefined) continue
      states[activity] = {
        from: resolved.from,
        ...resolved.asset.video === undefined ? {} : { video: `/character/${encodeURIComponent(resolved.asset.video)}` },
        ...resolved.asset.image === undefined ? {} : { image: `/character/${encodeURIComponent(resolved.asset.image)}` },
      }
    }
    return {
      characterId: pack.id,
      characterName: displayName(),
      greeting: greeting(),
      theme: pack.theme,
      playbackRate: pack.playbackRate,
    voiceSpeaker: pack.voice.speaker,
      promptOnly: pack.promptOnly,
      states,
      characters: listCharacterPacks(bundledDir, promptsDir).map(entry => ({ id: entry.id, name: entry.name, promptOnly: entry.promptOnly })),
    }
  }

  // The persona is the character's, and is re-registered when the pack changes.
  // Memory is the user's: it is registered once and outlives every switch.
  let disposePersona: (() => void) | undefined
  const registerPersona = (): void => {
    disposePersona?.()
    disposePersona = undefined
    if (config.personaEnabled === false) return
    const text = personaSection(pack)
    if (text === '') return
    try {
      disposePersona = ctx.systemPrompt.section({
        name: 'dsh-gal.persona',
        // Late in the prompt (after the tool sections) so the voice stays salient.
        order: 9500,
        text,
      })
      void ctx.systemPrompt.assemble().then(
        assembly => ctx.logger.info(`dsh-gal: persona "${pack.id}" registered; prompt sections: ${assembly.sections.map(section => section.name).join(', ')}`),
        () => { /* diagnostics only */ },
      )
    } catch (error) {
      ctx.logger.warn(`dsh-gal: persona section not registered (${String(error)})`)
    }
  }

  const characterConfig = (): unknown => ({
    id: pack.id,
    dir: pack.dir,
    name: pack.name,
    greeting: pack.greeting,
    persona: pack.persona,
    theme: pack.theme,
    playbackRate: pack.playbackRate,
    voiceSpeaker: pack.voice.speaker,
    art: pack.art,
    promptOnly: pack.promptOnly,
    bundled: pack.dir.startsWith(bundledDir) || pack.dir.startsWith(promptsDir),
    userDir: join(userCharactersDir(), pack.id),
    assets: ACTIVITIES.map(state => {
      const own = pack.assets[state]
      const resolved = own === undefined ? resolveStateAsset(pack, state) : undefined
      return { state, ...own ?? {}, ...resolved === undefined ? {} : { fallback: resolved.from } }
    }),
  })

  const saveCharacter = (patch: CharacterPatch): void => {
    pack = saveCharacterPack(pack, patch, bundledDir, promptsDir)
    registerPersona()
    server.broadcast({ type: 'manifest', manifest: manifest(), silent: true })
  }

  const uploadAsset = (state: string, kind: 'image' | 'video', ext: string, data: Buffer): void => {
    if (!isActivity(state)) throw new Error(`unknown state ${state}`)
    pack = storePackAsset(pack, state, kind, ext, data, bundledDir, promptsDir)
    server.broadcast({ type: 'manifest', manifest: manifest(), silent: true })
  }

  /** Unzip a pack archive into the user directory; returns the imported pack id. */
  const importPack = (zip: Buffer, idHint: string): string => {
    const work = mkdtempSync(join(tmpdir(), 'dsh-gal-import-'))
    try {
      const archive = join(work, 'pack.zip')
      writeFileSync(archive, zip)
      execFileSync('unzip', ['-q', '-o', archive, '-d', join(work, 'x')])
      // pack root = the directory holding character.json (or the lone top-level dir)
      const root = join(work, 'x')
      const findRoot = (dir: string, depth: number): string | undefined => {
        if (fileExists(join(dir, 'character.json')) || ASSET_NAMES.some(e => fileExists(join(dir, `${e}.png`)))) return dir
        if (depth > 3) return undefined
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
          if (entry.isDirectory() && !entry.name.startsWith('__MACOSX')) {
            const found = findRoot(join(dir, entry.name), depth + 1)
            if (found !== undefined) return found
          }
        }
        return undefined
      }
      const found = findRoot(root, 0)
      if (found === undefined) throw new Error('zip contains no character.json or expression images')
      const id = (idHint || (found === root ? '' : found.split('/').pop() ?? '') || `pack-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
      const dest = join(userCharactersDir(), id)
      mkdirSync(dest, { recursive: true })
      cpSync(found, dest, { recursive: true, filter: src => !src.includes('__MACOSX') && !src.endsWith('.DS_Store') })
      if (loadCharacterPack(dest, id) === undefined) throw new Error('imported pack is unreadable')
      server.broadcast({ type: 'manifest', manifest: manifest(), silent: true })
      return id
    } finally {
      rmSync(work, { recursive: true, force: true })
    }
  }

  /** Zip the active pack (art + character.json; memory stays private) and return the archive path. */
  const exportPack = (): string => {
    const work = mkdtempSync(join(tmpdir(), 'dsh-gal-export-'))
    const out = join(work, `${pack.id}.zip`)
    execFileSync('zip', ['-q', '-r', out, pack.id, '-x', `${pack.id}/memory.md`, `${pack.id}/memory.md.migrated`, `${pack.id}/*.log`, `${pack.id}/orig24/*`, `${pack.id}/.DS_Store`], { cwd: join(pack.dir, '..') })
    return out
  }

  const switchCharacter = (id: string): boolean => {
    const next = resolveCharacterPack(id, bundledDir, promptsDir)
    if (next === undefined) return false
    pack = next
    registerPersona()
    ctx.logger.info(`dsh-gal: character switched to ${pack.id}`)
    server.broadcast({ type: 'manifest', manifest: manifest() })
    return true
  }

  /** The session the UI mirrors and drives: the root session with the latest activity. */
  let activeSessionId: string | undefined
  // The user's data: one store shared with the bundled connectors and, as the
  // `galStore` service, with any other plugin.
  const store = openStore()
  ctx.effect(() => (ctx as unknown as { provide(name: string, value: unknown): () => void }).provide('galStore', store), 'dsh-gal.store')
  const activeDoc = store.doc<{ id: string; at: number }>('sessions', 'active')
  const transcript = (id: string) => store.log<Record<string, unknown>>('transcript', id)
  const rememberActive = (id: string): void => {
    if (activeSessionId === id) return
    activeSessionId = id
    activeDoc.set({ id, at: Date.now() })
  }
  // After a restart the last room is put back on screen from its stored
  // transcript; the dsh session behind it is resumed lazily, on the next send.
  let pendingResume = activeDoc.get()?.id
  if (pendingResume !== undefined) activeSessionId = pendingResume

  const resolveAgent = (): AgentLike | undefined => {
    if (activeSessionId !== undefined) {
      const active = ctx.agents.get(SessionId(activeSessionId))
      if (active !== undefined) return active
    }
    return undefined
  }

  const defaultSelection = (): { provider: string; model: string } | undefined =>
    (ctx.get('agentDefaultModel') as { currentSelection?: () => { provider: string; model: string } } | undefined)?.currentSelection?.()

  // The list the page shows: each pointer plus whether the file is still there and how big it is.
  const artifactsWithStat = () => listArtifacts().map(artifact => ({ ...artifact, ...artifactStat(artifact) }))
  // Data sources are other plugins' business; they register here and the panel shows them.
  const sources = createSourceRegistry()
  ctx.effect(() => (ctx as unknown as { provide(name: string, value: unknown): () => void }).provide('galSources', sources), 'dsh-gal.sources')
  /*
   * Attachments the user pastes or drops. Images become image blocks (the
   * model sees them when it can) and files become file blocks (the model gets
   * name, size and a read-only path). Both go through dsh's attachment
   * service, which validates and stores the bytes; without it, a file is
   * saved next to the uploads and named in the text instead. A copy of every
   * image is kept under the store's `uploads` blobs so the bubble can show it.
   */
  interface Upload { kind: 'image' | 'file'; name: string; mediaType: string; data: string }
  interface AttachmentsLike {
    admitPromptContent(parts: unknown[]): Promise<unknown[]>
    admitEncodedFile(input: { data: string; name?: string }): Promise<{ attachmentId: string; name: string; bytes: number }>
  }
  /** Preview URL and label per attachment id, for the bubble the session event turns into. */
  const previews = new Map<string, { kind: 'image' | 'file'; name: string; url?: string; bytes: number }>()
  const keepUpload = (u: Upload, buf: Buffer): string => {
    const dir = openStore().blobDir('uploads')
    mkdirSync(dir, { recursive: true })
    const ext = extname(u.name) || ({ 'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp', 'image/gif': '.gif' } as Record<string, string>)[u.mediaType] || ''
    const name = `${createHash('sha1').update(buf).digest('hex').slice(0, 16)}${ext}`
    const path = join(dir, name)
    if (!existsSync(path)) writeFileSync(path, buf)
    return name
  }
  const admitUploads = async (text: string, uploads: Upload[]): Promise<unknown[]> => {
    const store = ctx.get('attachments') as AttachmentsLike | undefined
    const parts: unknown[] = []
    const notes: string[] = []
    for (const u of uploads) {
      const buf = Buffer.from(u.data, 'base64')
      if (buf.length === 0) continue
      const saved = keepUpload(u, buf)
      if (store === undefined) { notes.push(`[attached file: ${join(openStore().blobDir('uploads'), saved)}]`); continue }
      if (u.kind === 'image') {
        parts.push({ type: 'image', mediaType: u.mediaType, data: u.data, name: u.name })
        continue
      }
      const ref = await store.admitEncodedFile({ data: u.data, name: u.name })
      previews.set(ref.attachmentId, { kind: 'file', name: ref.name, bytes: ref.bytes })
      parts.push({ type: 'file', attachment: ref })
    }
    const body = [text, ...notes].filter(Boolean).join('\n')
    if (body !== '') parts.unshift({ type: 'text', text: body })
    const admitted = store === undefined ? parts : await store.admitPromptContent(parts)
    // Image blocks only get their ids at admission; pair them back with the saved previews in order.
    let i = 0
    for (const block of admitted as { type: string; attachment?: { attachmentId: string; bytes?: number; name?: string } }[]) {
      if (block.type !== 'image' || block.attachment === undefined) continue
      const u = uploads.filter(x => x.kind === 'image')[i++]
      if (u === undefined) continue
      previews.set(block.attachment.attachmentId, { kind: 'image', name: block.attachment.name ?? u.name, url: `/upload/${keepUpload(u, Buffer.from(u.data, 'base64'))}`, bytes: block.attachment.bytes ?? 0 })
    }
    return admitted
  }
  /** What the bubble shows for a user message's attachments. */
  const attachmentsOf = (content: readonly { type: string; attachment?: { attachmentId: string; name?: string; bytes?: number } }[]) =>
    content.filter(b => (b.type === 'image' || b.type === 'file') && b.attachment !== undefined).map(b => previews.get(b.attachment!.attachmentId) ?? { kind: b.type as 'image' | 'file', name: b.attachment!.name ?? (b.type === 'image' ? 'image' : 'file'), bytes: b.attachment!.bytes ?? 0 })

  const server = new GalServer({
    port,
    token: config.token ?? '',
    webRoot: join(PKG_ROOT, 'web'),
    sources,
    characterDir: () => pack.dir,
    manifest,
    switchCharacter,
    debugUsage: () => ({ voice: { ...voiceStats, available: voiceAvailable } }),
    voiceClip: (id: string) => voiceClips.get(id),
    voiceSpeakers: async () => {
      if (!(await checkVoice())) return { available: false, speakers: [] }
      return { available: true, speakers: await voicevoxSpeakers(config.voicevoxUrl ?? 'http://127.0.0.1:50021') }
    },
    // A voice speaks one language. Handing a Japanese voice a Chinese reply
    // does not make it speak Japanese — it reads the kanji one at a time — so
    // the line is rewritten into the voice's language before synthesis.
    spokenLine: async (text, language) => {
      if (detectLanguage(text) === language) return text
      // Replaying a line, or hearing it again after switching languages back,
      // must not pay for the rewrite twice.
      const key = `${language}\n${text}`
      const cached = dubCache.get(key)
      if (cached !== undefined) {
        dubCache.delete(key)
        dubCache.set(key, cached)
        voiceStats.dubHits += 1
        return cached
      }
      const agent = activeSessionId === undefined ? undefined : ctx.agents.get(SessionId(activeSessionId))
      const started = Date.now()
      let line: string
      try { line = await translateForVoice(text, agent, language) }
      catch (error) {
        // The caller falls back to the line as written; leave a trace so a
        // reply read in the wrong language can be explained from /debug/usage.
        voiceStats.failed += 1
        voiceStats.lastError = `dub: ${String(error).slice(0, 280)}`
        ctx.logger.warn(`dsh-gal: dub to ${language} failed, reading the line as written (${String(error).slice(0, 200)})`)
        throw error
      }
      voiceStats.dubs += 1
      voiceStats.translateMs += Date.now() - started
      voiceStats.lastDub = line.slice(0, 200)
      dubCache.set(key, line)
      if (dubCache.size > DUB_CACHE_LIMIT) dubCache.delete(dubCache.keys().next().value as string)
      return line
    },
    voiceStatus: () => ({ enabled: config.voiceEnabled !== false, available: voiceAvailable, language: config.voiceLanguage ?? 'ja', speaker: pack.voice.speaker ?? config.voiceSpeaker ?? 3 }),
    debugPrompt: async () => {
      const assembly = await ctx.systemPrompt.assemble()
      return assembly.sections.map(section => ({ name: section.name, text: (section as { text?: string }).text ?? '' }))
    },
    log: message => ctx.logger.warn(`dsh-gal: ${message}`),
    characterConfig,
    saveCharacter,
    memory: () => memoryEntries(),
    saveMemory: entries => writeEntries(entries),
    onBacklog: event => { if (activeSessionId !== undefined) transcript(activeSessionId).append(event) },
    prefs: () => readPrefs(),
    savePrefs: patch => writePrefs(patch as never),
    lists: () => readLists(),
    listAction: (action, body) => {
      const ref = String(body['list'] ?? '')
      switch (action) {
        case 'create': createList({ title: body['title'], description: body['description'], items: body['items'] }); break
        case 'rename': updateList(ref, { title: body['title'], description: body['description'] }); break
        case 'delete': deleteList(ref); break
        case 'add': addItems(ref, Array.isArray(body['items']) ? body['items'] : [body['text']]); break
        case 'item': updateItem(ref, String(body['item'] ?? ''), { text: body['text'], note: body['note'], done: body['done'], remove: body['remove'] }); break
        case 'reorder': reorderItems(ref, Array.isArray(body['ids']) ? body['ids'].map(String) : []); break
        default: throw new Error(`unknown list action "${action}"`)
      }
      return readLists()
    },
    uploadAsset,
    importPack,
    exportPack,
    artifacts: () => artifactsWithStat(),
    artifactFile: (id) => {
      const artifact = findArtifact(id)
      if (artifact === undefined || !artifactStat(artifact).exists) return undefined
      return { path: artifact.path, mime: mimeFor(artifact.kind, artifact.path) }
    },
    revealArtifact: (id) => {
      const artifact = findArtifact(id)
      if (artifact === undefined || !artifactStat(artifact).exists) return false
      const [bin, args] = process.platform === 'darwin' ? ['open', ['-R', artifact.path]]
        : process.platform === 'win32' ? ['explorer', [`/select,${artifact.path}`]]
        : ['xdg-open', [dirname(artifact.path)]]
      const child = spawn(bin, args, { stdio: 'ignore', detached: true })
      child.on('error', (error: unknown) => ctx.logger.warn(`dsh-gal: reveal failed: ${String(error)}`))
      child.unref()
      return true
    },
    forgetArtifact: (id) => { forgetArtifact(id); return artifactsWithStat() },
    answerQuestion: (id, answers) => {
      const pending = pendingQuestions.get(id)
      if (pending === undefined) return false
      // Every question gets an answer row, even when the user skipped it, so ids stay aligned with what was asked.
      pending.settle(pending.questions.map(q => answers.find(a => a.id === q.id) ?? { id: q.id, selected: [] }))
      return true
    },
    newSession: async () => {
      const agent = await openSession()
      pendingResume = undefined
      rememberActive(agent.id)
      server.clearBacklog()
      server.broadcast({ type: 'session', id: agent.id })
      ctx.logger.info(`dsh-gal: new session ${agent.id}`)
    },
    uploadFile: (name) => {
      const dir = openStore().blobDir('uploads')
      const path = join(dir, name)
      return path.startsWith(dir + sep) && existsSync(path) ? path : undefined
    },
    onSend: async (text, attachments = []) => {
      let agent = resolveAgent()
      if (agent === undefined && pendingResume !== undefined) {
        const id = pendingResume
        pendingResume = undefined
        try {
          agent = await resumeSession(id)
          ctx.logger.info(`dsh-gal: resumed session ${id}`)
        } catch (error) {
          ctx.logger.warn(`dsh-gal: could not resume session ${id} (${String(error)}); starting a new one`)
          server.broadcast({ type: 'notice', text: 'The previous conversation could not be resumed; this is a new session.' })
        }
      }
      if (agent === undefined) {
        agent = await openSession()
        ctx.logger.info(`dsh-gal: opened session ${agent.id}`)
      }
      rememberActive(agent.id)
      agent.followup(createUserMessage({
        content: await admitUploads(text, attachments) as never,
        source: { kind: 'user' },
      }))
    },
  })

  /**
   * Open a fresh session the way the browser UI does: the deployment's default
   * agent preset (tools, permissions, persona rows) mounted into the agent's
   * own context before publication.
   */
  const sessionSetup = async (): Promise<{ agentOptions: { provider: string; model: string }; presetId: string | undefined; setup?: (agentCtx: unknown) => Promise<void> }> => {
    const selection = defaultSelection()
    if (selection === undefined) throw new Error('no default model configured')
    const presets = ctx.get('agentPresets') as AgentPresetsLike | undefined
    const presetId = presets === undefined ? undefined : (await presets.resolve(undefined)).id
    return {
      agentOptions: { provider: selection.provider, model: selection.model }, presetId,
      ...presets === undefined ? {} : { setup: async (agentCtx: unknown) => { await presets.mount(agentCtx, presetId) } },
    }
  }
  /** Sessions opened by this room; only their questions are answered here. */
  const roomSessions = new Set<string>()
  // Her questions come to this room, not to the dsh web client. The web
  // forwarder is a global listener that claims every request and waits for a
  // browser that is never attached to these sessions, so this answerer is
  // prepended and takes only the room's own agents; anything else passes on.
  ctx.effect(() => (ctx as unknown as { on(event: string, listener: (request: QuestionRequest, next: () => Promise<QuestionAnswer>) => Promise<QuestionAnswer>, prepend: boolean): () => void }).on('user-questions/request', (request, next) => {
    const id = request.agent?.id
    if (id === undefined || !roomSessions.has(String(id))) return next()
    return askInRoom(request)
  }, true), 'dsh-gal.questions')

  // ---- questions she asks the user (ask_user_question) ----
  interface QuestionItem { id: string; question: string; detail?: string; header?: string; options?: { label: string; description?: string }[]; multiSelect?: boolean }
  interface QuestionAnswerItem { id: string; selected: string[]; custom?: string }
  interface QuestionRequest { questions: QuestionItem[]; agent?: { id: unknown }; signal?: AbortSignal }
  interface QuestionAnswer { answers: QuestionAnswerItem[] }
  const pendingQuestions = new Map<string, { questions: QuestionItem[]; settle: (answers: QuestionAnswerItem[] | undefined) => void }>()
  const askInRoom = (request: QuestionRequest): Promise<QuestionAnswer> => new Promise<QuestionAnswer>((resolve, reject) => {
    const id = crypto.randomUUID()
    const questions = request.questions.map(q => ({ id: q.id, question: q.question, ...q.detail === undefined ? {} : { detail: q.detail }, ...q.header === undefined ? {} : { header: q.header }, ...q.options === undefined ? {} : { options: q.options.map(o => ({ label: o.label, ...o.description === undefined ? {} : { description: o.description } })) }, ...q.multiSelect === undefined ? {} : { multiSelect: q.multiSelect } }))
    const settle = (answers: QuestionAnswerItem[] | undefined): void => {
      if (!pendingQuestions.delete(id)) return
      request.signal?.removeEventListener('abort', onAbort)
      if (answers === undefined) {
        server.broadcast({ type: 'question', id, cancelled: true })
        const error = new Error('ask_user_question was aborted before the user answered') as Error & { code: string }
        error.name = 'UserQuestionError'; error.code = 'ASK_ABORTED'
        reject(error)
        return
      }
      server.broadcast({ type: 'question', id, answers })
      server.broadcast({ type: 'activity', activity: 'reading' })
      resolve({ answers })
    }
    const onAbort = (): void => settle(undefined)
    if (request.signal?.aborted) { onAbort(); return }
    request.signal?.addEventListener('abort', onAbort, { once: true })
    pendingQuestions.set(id, { questions, settle })
    server.broadcast({ type: 'question', id, questions })
    server.broadcast({ type: 'activity', activity: 'waiting' })
  })
  const openSession = async (): Promise<AgentLike> => {
    const { agentOptions, presetId, setup } = await sessionSetup()
    const handle = await ctx.agents.create({
      sessionId: SessionId(`dsh-gal-session-${crypto.randomUUID()}`),
      agentOptions,
      meta: { cwd: process.cwd(), ...presetId === undefined ? {} : { agentPreset: presetId } },
      ...setup === undefined ? {} : { setup },
    })
    roomSessions.add(String(handle.agent.id))
    return handle.agent
  }
  /** Bring a persisted dsh session back to life so the room continues where it left off. */
  const resumeSession = async (id: string): Promise<AgentLike> => {
    const { agentOptions, setup } = await sessionSetup()
    const handle = await (ctx.agents as unknown as { resume(options: unknown): Promise<{ agent: AgentLike }> }).resume({ resumeSessionId: SessionId(id), agentOptions, ...setup === undefined ? {} : { setup } })
    roomSessions.add(String(handle.agent.id))
    return handle.agent
  }

  // ---- the character's own memory tool ----
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'gal_remember',
    description: `Save one short note about the user to your long-term memory (shown to you in every future session). Use it when the user tells you something worth keeping: preferences, ongoing projects, how they like to work, facts about their life they share. One concise sentence per call.`,
    parameters: {
      note: { type: 'string', required: true, description: 'One concise sentence to remember, written in the user\'s language' },
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const note = String((args as { note?: unknown }).note ?? '').trim()
      if (note === '') throw new Error('gal_remember: note is required')
      remember(note)
      server.broadcast({ type: 'memory', entries: memoryEntries() })
      return `Remembered: ${note}`
    },
  } as never)), 'dsh-gal.tool.remember')

  // ---- lists: hers to maintain, the user's to edit ----
  const listsChanged = (fresh?: string): void => server.broadcast({ type: 'lists', lists: readLists(), ...fresh === undefined ? {} : { fresh } })
  const itemsParam = { type: 'array', description: 'Items to add. Each is a short name, or {text, note?} when one line of context helps (year, price, why).', items: { type: 'object', properties: { text: { type: 'string', required: true, description: 'Short name' }, note: { type: 'string', description: 'One line of context' } }, additionalProperties: false } }
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'list_create',
    description: 'Create a new list for the user (recommendations, options, to-dos, things to buy). Fails if a list with that title exists; then use list_add. Returns the list as markdown.',
    parameters: {
      title: { type: 'string', required: true, description: 'Short title in the user\'s language, e.g. "日剧待看"' },
      description: { type: 'string', description: 'One line on what the list is for' },
      items: itemsParam,
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const a = args as { title?: unknown; description?: unknown; items?: unknown }
      const list = createList({ title: a.title, description: a.description, items: a.items })
      listsChanged(list.id)
      return renderList(list)
    },
  } as never)), 'dsh-gal.tool.list_create')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'list_add',
    description: 'Add items to an existing list (by title or id). Duplicates by name are skipped. Returns the list as markdown.',
    parameters: {
      list: { type: 'string', required: true, description: 'List title or id' },
      items: { ...itemsParam, required: true },
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const a = args as { list?: unknown; items?: unknown }
      const { list, added } = addItems(String(a.list ?? ''), Array.isArray(a.items) ? a.items : [])
      listsChanged()
      return `${added.length} added.\n${renderList(list)}`
    },
  } as never)), 'dsh-gal.tool.list_add')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'list_update',
    description: 'Change one item on a list: mark it done or not done, rewrite its text or note, or remove it. The item may be named by id, exact text, or a unique fragment of its text.',
    parameters: {
      list: { type: 'string', required: true, description: 'List title or id' },
      item: { type: 'string', required: true, description: 'Item id, exact text, or unique fragment' },
      done: { type: 'boolean', description: 'true when finished / watched / bought; false to reopen' },
      text: { type: 'string', description: 'New text' },
      note: { type: 'string', description: 'New note (empty string clears it)' },
      remove: { type: 'boolean', description: 'true to delete the item' },
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const a = args as { list?: unknown; item?: unknown; done?: unknown; text?: unknown; note?: unknown; remove?: unknown }
      const { list, item } = updateItem(String(a.list ?? ''), String(a.item ?? ''), { text: a.text, note: a.note, done: a.done, remove: a.remove })
      listsChanged()
      return item === undefined ? `Removed.\n${renderList(list)}` : `${item.done ? 'Done' : 'Updated'}: ${item.text}\n${renderList(list)}`
    },
  } as never)), 'dsh-gal.tool.list_update')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'list_get',
    description: 'Read one list in full (by title or id), or all list titles when no list is given. Also used to rename or delete a list.',
    parameters: {
      list: { type: 'string', description: 'List title or id' },
      rename: { type: 'string', description: 'New title for the list' },
      delete: { type: 'boolean', description: 'true to delete the whole list (only when the user asks)' },
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const a = args as { list?: unknown; rename?: unknown; delete?: unknown }
      const ref = String(a.list ?? '').trim()
      if (ref === '') return readLists().map(list => `- ${list.title} (id ${list.id}; ${list.items.filter(item => !item.done).length} open of ${list.items.length})`).join('\n') || 'No lists yet.'
      if (a.delete === true) { const gone = deleteList(ref); listsChanged(); return `Deleted "${gone.title}".` }
      if (typeof a.rename === 'string' && a.rename.trim() !== '') { const list = updateList(ref, { title: a.rename }); listsChanged(); return renderList(list) }
      const list = findList(ref)
      if (list === undefined) throw new Error(`no list matches "${ref}"`)
      return renderList(list)
    },
  } as never)), 'dsh-gal.tool.list_get')

  // ---- voice ----
  const voiceClips = new Map<string, Buffer>()
  const voiceStats = { calls: 0, ok: 0, failed: 0, translateMs: 0, synthMs: 0, lastError: '', dubs: 0, dubHits: 0, lastDub: '' }
  // Recently dubbed lines, oldest first. A conversation is short; this only has
  // to outlive the replay button and a round trip through the language menu.
  const DUB_CACHE_LIMIT = 64
  const dubCache = new Map<string, string>()
  let voiceSeq = 0
  let voiceAvailable: boolean | undefined
  const voiceUrl = (): string => config.voicevoxUrl ?? 'http://127.0.0.1:50021'
  const pingVoice = async (): Promise<boolean> => {
    try {
      const res = await fetch(`${voiceUrl()}/version`, { signal: AbortSignal.timeout(1500) })
      return res.ok
    } catch {
      return false
    }
  }
  let engineStarted = false
  /** Start the local VOICEVOX engine once, if configured and installed. */
  const startVoiceEngine = async (): Promise<boolean> => {
    const bin = config.voicevoxEngine ?? ''
    if (engineStarted || bin === '' || !fileExists(bin)) return false
    engineStarted = true
    const port = new URL(voiceUrl()).port || '50021'
    try {
      const child = spawn(bin, ['--host', '127.0.0.1', '--port', port], { cwd: dirname(bin), stdio: 'ignore', detached: false })
      child.on('error', error => ctx.logger.warn(`dsh-gal: voicevox engine failed to start (${String(error)})`))
      process.once('exit', () => { try { child.kill() } catch { /* gone */ } })
    } catch (error) {
      ctx.logger.warn(`dsh-gal: voicevox engine failed to start (${String(error)})`)
      return false
    }
    ctx.logger.info(`dsh-gal: starting VOICEVOX engine from ${bin}`)
    for (let i = 0; i < 40; i += 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (await pingVoice()) return true
    }
    return false
  }
  const checkVoice = async (): Promise<boolean> => {
    if (config.voiceEnabled === false) return false
    voiceAvailable = (await pingVoice()) || (await startVoiceEngine())
    return voiceAvailable
  }
  if (config.voiceEnabled !== false) void checkVoice()
  /** One-shot side LLM call: reply → a spoken line in the voice's own language. */
  const translateForVoice = async (text: string, agent: AgentLike | undefined, target: SpokenLanguage = 'ja'): Promise<string> => {
    const provider = config.judgeProvider ?? agent?.options.provider ?? defaultSelection()?.provider
    const model = config.judgeModel ?? agent?.options.model ?? defaultSelection()?.model
    if (provider === undefined || model === undefined) throw new Error('no llm route for translation')
    const assembler = new BlockAssembler()
    const effort = config.judgeReasoningEffort
    const options: GenerateOptions = {
      provider,
      model,
      ...effort === undefined || effort === '' ? {} : { reasoningEffort: effort as GenerateOptions['reasoningEffort'] },
      maxTokens: 2048,
      signal: AbortSignal.timeout(15000),
      messages: [createUserMessage({
        content: [{ type: 'text', text: translationPrompt(text, pack.name, pack.persona, target) }],
        source: { kind: 'plugin', plugin: name },
      })],
    }
    for await (const chunk of ctx.llm.stream(options)) assembler.push(chunk as never)
    const line = assembler.blocks().map(block => block.type === 'text' ? block.text : '').join('').trim()
    if (line === '') throw new Error('empty translation')
    return line
  }
  /** Synthesize a reply and announce the clip; never throws. */
  const speak = async (id: string, text: string, agent: AgentLike | undefined): Promise<void> => {
    if (config.voiceEnabled === false) return
    if (voiceAvailable === undefined && !(await checkVoice())) return
    if (voiceAvailable === false) return
    const spoken = speakableText(text)
    if (spoken === '') return
    voiceStats.calls += 1
    try {
      let line = spoken
      if (config.voiceLanguage !== 'auto' && !looksJapanese(spoken)) {
        const t0 = Date.now()
        line = await translateForVoice(spoken, agent)
        voiceStats.translateMs += Date.now() - t0
      }
      const t1 = Date.now()
      const speaker = pack.voice.speaker ?? config.voiceSpeaker ?? 3
      const wav = await voicevoxSynthesize(config.voicevoxUrl ?? 'http://127.0.0.1:50021', line, speaker)
      voiceStats.synthMs += Date.now() - t1
      voiceClips.set(id, wav)
      while (voiceClips.size > 24) { const oldest = voiceClips.keys().next().value; if (oldest === undefined) break; voiceClips.delete(oldest) }
      voiceStats.ok += 1
      server.broadcast({ type: 'voice', id, url: `/voice/${id}.wav`, line, speaker })
    } catch (error) {
      voiceStats.failed += 1
      voiceStats.lastError = String(error).slice(0, 300)
      if (/fetch failed|ECONNREFUSED/.test(String(error))) voiceAvailable = false
      ctx.logger.debug(`dsh-gal: voice skipped (${String(error)})`)
    }
  }

  // ---- observe the conversation ----
  // Live token stream. `assistant/message` only commits once the whole reply
  // exists, so without this the dialogue box shows nothing until generation
  // ends and then has to fake a typewriter over text it already has. Reasoning
  // deltas are deliberately dropped: they are not something she says.
  ;(ctx as unknown as { on(event: string, listener: (payload: { agent: AgentLike; frame: AssistantStreamFrameLike }) => void): () => void })
    .on('agent/assistant-stream', ({ agent, frame }) => {
      if (activeSessionId !== undefined && agent.id !== activeSessionId) return
      if (frame.type === 'start') { server.broadcast({ type: 'delta', reset: true }); return }
      // A stream that ends without text was reasoning or a tool call. The UI
      // has to hear about it, or the empty line it opened holds the box.
      if (frame.type === 'end') { server.broadcast({ type: 'delta', done: true }); return }
      if (frame.type !== 'chunk') return
      if (frame.chunk.type !== 'text-delta') return
      const text = frame.chunk.text
      if (text === undefined || text === '') return
      server.broadcast({ type: 'delta', text })
    })

  // ---- files she writes ----
  // A write is caught at the tool boundary: the call names the path, the
  // result says whether it worked. `present` (dsh's own deliverable tool)
  // lands as a session event of its own. Either way the file is indexed and
  // the page tells the UI, which turns the name in her line into a link.
  const pendingWrites = new Map<string, string>()
  const publishArtifact = (sessionId: string, path: string, source: 'written' | 'presented', description?: string): { id: string; url: string } => {
    const absolute = isAbsolute(path) ? path : resolvePath(process.cwd(), path)
    const { artifact, fresh } = recordArtifact({ path: absolute, sessionId, source, ...description === undefined ? {} : { description } })
    server.broadcast({ type: 'artifact', artifact, fresh, artifacts: artifactsWithStat() })
    return { id: artifact.id, url: `/artifact/${encodeURIComponent(artifact.id)}` }
  }
  // Other plugins hand her a file to show (an image she found, a chart she
  // drew): `galArtifacts.publish(path, description)` puts it in the room as a
  // card and returns the URL the reply can embed.
  ctx.effect(() => (ctx as unknown as { provide(name: string, value: unknown): () => void }).provide('galArtifacts', {
    publish: (path: string, description?: string) => publishArtifact(activeSessionId ?? 'dsh-gal', path, 'presented', description),
  }), 'dsh-gal.artifacts.service')

  ctx.on('session/event', (session: Session, event: SessionEvent) => {
    const header = session.header as { origin?: string }
    if (header.origin === 'subagent') return
    // An approval is the turn paused on the user: she waits, visibly, until
    // it is decided (in the dsh web UI) or the turn moves on.
    if ((event.type as string) === 'approval/asked' || (event.type as string) === 'approval/decided') {
      if (activeSessionId !== undefined && session.id !== activeSessionId) return
      server.broadcast({ type: 'activity', activity: (event.type as string) === 'approval/asked' ? 'waiting' : 'reading' })
      return
    }
    if ((event.type as string) === 'deliverables/presented') {
      if (activeSessionId !== undefined && session.id !== activeSessionId) return
      const data = event.data as unknown as { files?: { path?: unknown; description?: unknown }[] }
      for (const file of data.files ?? []) {
        if (typeof file.path !== 'string' || file.path.trim() === '') continue
        publishArtifact(session.id, file.path, 'presented', typeof file.description === 'string' && file.description.trim() !== '' ? file.description.trim() : undefined)
      }
      return
    }
    switch (event.type) {
      case 'user/message': {
        const message = event.data
        if (message.source.kind !== 'user') return
        const text = textOf(message.content)
        const attachments = attachmentsOf(message.content as never)
        if (text.trim() === '' && attachments.length === 0) return
        rememberActive(session.id)
        server.broadcast({ type: 'user', text, ...attachments.length ? { attachments } : {} })
        break
      }
      case 'assistant/message': {
        const text = textOf(event.data.message.content)
        if (text.trim() === '') return
        if (activeSessionId !== undefined && session.id !== activeSessionId) return
        const messageId = `m${++voiceSeq}`
        // Speech is requested by the frontend with its selected provider.
        server.broadcast({ type: 'assistant', id: messageId, text })
        break
      }
      case 'tool/call': {
        if (activeSessionId !== undefined && session.id !== activeSessionId) return
        const target = writtenPath(event.data.name, event.data.arguments)
        if (target !== undefined) pendingWrites.set(String(event.data.callId), target)
        let command: string | undefined
        try { command = String((JSON.parse(event.data.arguments) as { command?: unknown }).command ?? '') || undefined } catch { /* not an object */ }
        server.broadcast({ type: 'status', text: `${event.data.name}…`, tool: event.data.name, activity: activityForTool(event.data.name, command), ...command === undefined ? {} : { command } })
        break
      }
      case 'tool/result': {
        if (activeSessionId !== undefined && session.id !== activeSessionId) return
        const block = event.data.message.content[0]
        const written = pendingWrites.get(String(block.toolCallId))
        pendingWrites.delete(String(block.toolCallId))
        if (written !== undefined && block.isError !== true && event.data.error === undefined) publishArtifact(session.id, written, 'written')
        // A failed tool is a beat she visibly registers; a finished one hands
        // the stage back to "reading" until the next call or the reply.
        if (event.data.error !== undefined || block.isError === true) server.broadcast({ type: 'activity', activity: 'failed', beat: true })
        else server.broadcast({ type: 'activity', activity: 'reading' })
        break
      }
      case 'turn/start': {
        if (activeSessionId === undefined || session.id === activeSessionId) {
          server.broadcast({ type: 'busy', value: true })
        }
        break
      }
      case 'turn/end': {
        if (activeSessionId === undefined || session.id === activeSessionId) {
          server.broadcast({ type: 'busy', value: false })
          server.broadcast({ type: 'activity', activity: 'done' })
        }
        break
      }
    }
  })

  // ---- persona + serve the UI ----
  ctx.effect(() => {
    registerPersona()
    return () => { disposePersona?.(); disposePersona = undefined }
  }, 'dsh-gal.persona')

  // Memory belongs to the user, so it is registered independently of the pack
  // and read at every assembly — `gal_remember` takes effect on the next turn.
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-gal.memory', order: 9510, text: () => memorySection() }), 'dsh-gal.memory')
  // How a file reaches the user is the UI's job; the prompt only has to make
  // her name it, and hand it over with `present` when the tool is there.
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-gal.artifacts', order: 9520, text: () => artifactSection() }), 'dsh-gal.artifacts')
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-gal.lists', order: 9515, text: () => listsSection() }), 'dsh-gal.lists')

  ctx.effect(() => sources.on(id => server.broadcast({ type: 'sources', id })), 'dsh-gal.sources.events')
  if (activeSessionId !== undefined) server.seedBacklog(transcript(activeSessionId).read().map(entry => entry.event as never))
  ctx.effect(() => {
    server.start().then(
      () => ctx.logger.info(`dsh-gal: visual novel at ${server.url} (character: ${pack.id})`),
      (error: unknown) => ctx.logger.warn(`dsh-gal: failed to listen on ${port}: ${String(error)}`),
    )
    return () => server.stop()
  }, 'dsh-gal.server')
}
