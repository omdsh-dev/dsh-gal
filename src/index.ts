/**
 * dsh-gal: a galgame / visual-novel UI for the DeepSeek Harness.
 *
 * The plugin mirrors the live conversation onto a local web page where a
 * character "speaks" every assistant reply one scene at a time:
 *   - observes `session/event` for user prompts, assistant replies, and tool
 *     activity (subagent sessions are filtered out),
 *   - judges which expression to show via a tiny side `ctx.llm.stream` call
 *     (keyword heuristic as fallback),
 *   - serves the frontend + the active character pack over 127.0.0.1,
 *   - registers the pack's persona as a system-prompt voice layer,
 *   - feeds input from the page back into the live agent via
 *     `agent.followup(createUserMessage(...))`.
 * @module dsh-gal
 */

import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
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
import { listCharacterPacks, loadCharacterPack, personaSection, resolveCharacterPack, saveCharacterPack, storePackAsset, userCharactersDir, type CharacterPack, type CharacterPatch } from './characters.js'
import { memorySection, readMemory, remember, writeMemory } from './memory.js'
import { EMOTIONS, heuristicEmotion, isEmotion, classifierPrompt, type Emotion } from './emotion.js'
import { GalServer } from './server.js'
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
  /** Judge each reply's expression with a small LLM call (heuristic fallback otherwise). */
  judgeEnabled?: boolean
  /** Deadline for the emotion judge before falling back to keywords. */
  judgeTimeoutMs?: number
  /** Judge route override; defaults to the replying agent's own route. */
  judgeProvider?: string
  judgeModel?: string
  /**
   * Reasoning effort for the judge call ('' = the route's default). DeepSeek
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
  character: z.string().default('cetus'),
  characterName: z.string(),
  greeting: z.string(),
  personaEnabled: z.boolean().default(true),
  judgeEnabled: z.boolean().default(true),
  judgeTimeoutMs: z.number().step(1).min(200).default(8000),
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
  let pack: CharacterPack = resolveCharacterPack(config.character ?? 'cetus', bundledDir, promptsDir)
    ?? resolveCharacterPack('cetus', bundledDir)
    ?? { id: 'none', dir: bundledDir, name: 'dsh', greeting: 'No character pack found.', persona: '', theme: {}, playbackRate: 1, voice: {}, promptOnly: true, emotions: {} }
  if (pack.id === 'none') ctx.logger.warn(`dsh-gal: character "${config.character}" not found and no bundled fallback`)

  const displayName = (): string => config.characterName ?? pack.name
  /** A pack may localize its opening line; the frontend picks by interface language. */
  const greeting = (): CharacterPack['greeting'] => config.greeting ?? pack.greeting

  const manifest = (): unknown => {
    const emotions: Record<string, { video?: string; image?: string }> = {}
    for (const emotion of EMOTIONS) {
      const asset = pack.emotions[emotion]
      if (asset === undefined) continue
      emotions[emotion] = {
        ...asset.video === undefined ? {} : { video: `/character/${encodeURIComponent(asset.video)}` },
        ...asset.image === undefined ? {} : { image: `/character/${encodeURIComponent(asset.image)}` },
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
      defaultEmotion: 'neutral' in emotions ? 'neutral' : Object.keys(emotions)[0] ?? 'neutral',
      emotions,
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
    assets: EMOTIONS.map(emotion => ({ emotion, ...pack.emotions[emotion] ?? {} })),
  })

  const saveCharacter = (patch: CharacterPatch): void => {
    pack = saveCharacterPack(pack, patch, bundledDir, promptsDir)
    registerPersona()
    server.broadcast({ type: 'manifest', manifest: manifest(), silent: true })
  }

  const uploadAsset = (emotion: string, kind: 'image' | 'video', ext: string, data: Buffer): void => {
    if (!EMOTIONS.includes(emotion as Emotion)) throw new Error(`unknown emotion ${emotion}`)
    pack = storePackAsset(pack, emotion as Emotion, kind, ext, data, bundledDir, promptsDir)
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
        if (fileExists(join(dir, 'character.json')) || EMOTIONS.some(e => fileExists(join(dir, `${e}.png`)))) return dir
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

  const resolveAgent = (): AgentLike | undefined => {
    if (activeSessionId !== undefined) {
      const active = ctx.agents.get(SessionId(activeSessionId))
      if (active !== undefined) return active
    }
    return ctx.agents.roots().at(-1)
  }

  const defaultSelection = (): { provider: string; model: string } | undefined =>
    (ctx.get('agentDefaultModel') as { currentSelection?: () => { provider: string; model: string } } | undefined)?.currentSelection?.()

  const server = new GalServer({
    port,
    token: config.token ?? '',
    webRoot: join(PKG_ROOT, 'web'),
    characterDir: () => pack.dir,
    manifest,
    switchCharacter,
    debugUsage: () => ({ judge: { ...judgeStats }, voice: { ...voiceStats, available: voiceAvailable } }),
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
      const line = await translateForVoice(text, agent, language)
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
    memory: () => readMemory(),
    saveMemory: (text: string) => writeMemory(text),
    uploadAsset,
    importPack,
    exportPack,
    newSession: async () => {
      const agent = await openSession()
      activeSessionId = agent.id
      server.clearBacklog()
      server.broadcast({ type: 'session', id: agent.id })
      ctx.logger.info(`dsh-gal: new session ${agent.id}`)
    },
    onSend: async (text) => {
      let agent = resolveAgent()
      if (agent === undefined) {
        agent = await openSession()
        ctx.logger.info(`dsh-gal: opened session ${agent.id}`)
      }
      activeSessionId = agent.id
      agent.followup(createUserMessage({
        content: [{ type: 'text', text }],
        source: { kind: 'user' },
      }))
    },
  })

  /**
   * Open a fresh session the way the browser UI does: the deployment's default
   * agent preset (tools, permissions, persona rows) mounted into the agent's
   * own context before publication.
   */
  const openSession = async (): Promise<AgentLike> => {
    const selection = defaultSelection()
    if (selection === undefined) throw new Error('no default model configured')
    const presets = ctx.get('agentPresets') as AgentPresetsLike | undefined
    const presetId = presets === undefined ? undefined : (await presets.resolve(undefined)).id
    const handle = await ctx.agents.create({
      sessionId: SessionId(`dsh-gal-session-${crypto.randomUUID()}`),
      agentOptions: { provider: selection.provider, model: selection.model },
      meta: { cwd: process.cwd(), ...presetId === undefined ? {} : { agentPreset: presetId } },
      ...presets === undefined ? {} : { setup: async (agentCtx: unknown) => { await presets.mount(agentCtx, presetId) } },
    })
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
      server.broadcast({ type: 'memory', memory: remember(note) })
      return `Remembered: ${note}`
    },
  } as never)), 'dsh-gal.tool.remember')

  /** Judge accounting for evaluation: calls, latency, tokens (from stream usage chunks). */
  const judgeStats = { calls: 0, llm: 0, heuristic: 0, totalMs: 0, inputTokens: 0, outputTokens: 0, reasoningTokens: 0 }

  /** Tiny side LLM call that picks the expression for a reply. */
  const judgeEmotion = async (reply: string, agent: AgentLike | undefined): Promise<{ emotion: Emotion; judge: 'llm' | 'heuristic'; judgeError?: string }> => {
    if (config.judgeEnabled === false) return { emotion: heuristicEmotion(reply), judge: 'heuristic' }
    const startedAt = Date.now()
    judgeStats.calls += 1
    const finish = <T extends { judge: 'llm' | 'heuristic' }>(result: T): T => {
      judgeStats.totalMs += Date.now() - startedAt
      judgeStats[result.judge] += 1
      return result
    }
    const provider = config.judgeProvider ?? agent?.options.provider ?? defaultSelection()?.provider
    const model = config.judgeModel ?? agent?.options.model ?? defaultSelection()?.model
    if (provider === undefined || model === undefined) return finish({ emotion: heuristicEmotion(reply), judge: 'heuristic' })
    const attempt = async (reasoningEffort: string | undefined): Promise<string> => {
      const timeoutMs = config.judgeTimeoutMs ?? 8000
      const assembler = new BlockAssembler()
      const options: GenerateOptions = {
        provider,
        model,
        ...reasoningEffort === undefined || reasoningEffort === '' ? {} : { reasoningEffort: reasoningEffort as GenerateOptions['reasoningEffort'] },
        // Generous cap: reasoning-capable routes (DeepSeek at `high` effort)
        // burn thinking tokens before the one-word answer; text blocks alone
        // are parsed below.
        maxTokens: 4096,
        signal: AbortSignal.timeout(timeoutMs),
        messages: [createUserMessage({
          content: [{ type: 'text', text: classifierPrompt(reply) }],
          source: { kind: 'plugin', plugin: name },
        })],
      }
      // Hard deadline around the whole stream: a reply must never be lost to a
      // judge that outlives its abort signal.
      await Promise.race([
        (async () => {
          for await (const chunk of ctx.llm.stream(options)) {
            const usage = (chunk as { type?: string; usage?: { inputTokens?: number; outputTokens?: number; reasoningTokens?: number } })
            if (usage.type === 'usage' && usage.usage !== undefined) {
              judgeStats.inputTokens += usage.usage.inputTokens ?? 0
              judgeStats.outputTokens += usage.usage.outputTokens ?? 0
              judgeStats.reasoningTokens += usage.usage.reasoningTokens ?? 0
            }
            assembler.push(chunk as never)
          }
        })(),
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`judge deadline ${timeoutMs * 2}ms exceeded`)), timeoutMs * 2)),
      ])
      return assembler.blocks()
        .map(block => block.type === 'text' ? block.text : '').join('')
        .trim().toLowerCase().replace(/[^a-z]/g, '')
    }
    try {
      let answer: string
      try {
        answer = await attempt(config.judgeReasoningEffort)
      } catch (error) {
        // Provider rejected the effort id: retry once on the route's default.
        if (!/reasoning effort/i.test(String(error)) || (config.judgeReasoningEffort ?? '') === '') throw error
        answer = await attempt(undefined)
      }
      if (isEmotion(answer)) return finish({ emotion: answer, judge: 'llm' })
      const found = EMOTIONS.find(emotion => answer.includes(emotion))
      if (found !== undefined) return finish({ emotion: found, judge: 'llm' })
      return finish({ emotion: heuristicEmotion(reply), judge: 'heuristic', judgeError: `unparsable answer: ${answer.slice(0, 60)}` })
    } catch (error) {
      ctx.logger.debug(`dsh-gal: emotion judge fell back (${String(error)})`)
      return finish({ emotion: heuristicEmotion(reply), judge: 'heuristic', judgeError: String(error).slice(0, 300) })
    }
  }

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
      if (frame.type !== 'chunk') return
      if (frame.chunk.type !== 'text-delta') return
      const text = frame.chunk.text
      if (text === undefined || text === '') return
      server.broadcast({ type: 'delta', text })
    })

  ctx.on('session/event', (session: Session, event: SessionEvent) => {
    const header = session.header as { origin?: string }
    if (header.origin === 'subagent') return
    switch (event.type) {
      case 'user/message': {
        const message = event.data
        if (message.source.kind !== 'user') return
        const text = textOf(message.content)
        if (text.trim() === '') return
        activeSessionId = session.id
        server.broadcast({ type: 'user', text })
        break
      }
      case 'assistant/message': {
        const text = textOf(event.data.message.content)
        if (text.trim() === '') return
        if (activeSessionId !== undefined && session.id !== activeSessionId) return
        const agent = ctx.agents.get(SessionId(session.id))
        // Show the reply at once with a keyword-picked expression; the LLM
        // judge refines it a moment later without delaying the text.
        const provisional = heuristicEmotion(text)
        const messageId = `m${++voiceSeq}`
        server.broadcast({ type: 'assistant', id: messageId, text, emotion: provisional, judge: 'pending' })
        // Speech is requested by the frontend with its selected provider.
        // Avoid a second, unsolicited VOICEVOX synthesis / translation.
        void judgeEmotion(text, agent).then(({ emotion, judge, judgeError }) => {
          if (emotion !== provisional || judge === 'llm') server.broadcast({ type: 'emotion', emotion, judge, ...judgeError === undefined ? {} : { judgeError } })
        })
        break
      }
      case 'tool/call': {
        if (activeSessionId !== undefined && session.id !== activeSessionId) return
        server.broadcast({ type: 'status', text: `${event.data.name}…` })
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

  ctx.effect(() => {
    server.start().then(
      () => ctx.logger.info(`dsh-gal: visual novel at ${server.url} (character: ${pack.id})`),
      (error: unknown) => ctx.logger.warn(`dsh-gal: failed to listen on ${port}: ${String(error)}`),
    )
    return () => server.stop()
  }, 'dsh-gal.server')
}
