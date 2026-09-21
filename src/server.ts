/**
 * The Aibo HTTP server: serves the visual-novel frontend, streams
 * conversation events over SSE, and accepts user input via POST /send.
 * Binds 127.0.0.1 only; optional shared-token auth (header x-aibo-token,
 * ?token=). Static files come from the plugin's own web/ and assets/ dirs.
 */

import { SpeechService } from './speech.js'
import { PetState } from './pet-state.js'
import type { AiboSources } from './sources.js'

import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { createReadStream, createWriteStream, existsSync, mkdtempSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { pipeline } from 'node:stream/promises'
import { dirname, extname, join, normalize, sep } from 'node:path'

export interface AiboEvent {
  type: 'user' | 'assistant' | 'delta' | 'status' | 'busy' | 'activity' | 'snapshot' | 'manifest' | 'session' | 'memory' | 'voice' | 'artifact' | 'sources' | 'lists' | 'settings' | 'notice' | 'question'
  [key: string]: unknown
}

/** One attachment sent with a message: images go to the model as images, anything else as a file it can read. */
export interface Upload { kind: 'image' | 'file'; name: string; mediaType: string; data: string }

export interface AiboServerOptions {
  port: number
  petGaze?: () => { x: number; y: number } | null
  clearPetGaze?: () => void
  token: string
  webRoot: string
  /** Directory of the active character pack (served under /character/). */
  characterDir: () => string
  manifest: () => unknown
  /** Switch the active pack by id; false when unknown. */
  switchCharacter: (id: string) => boolean
  /** Global prompt sections as assembled right now (diagnostics). */
  debugPrompt: () => Promise<unknown>
  /** Voice accounting (calls, latency, failures). */
  debugUsage: () => unknown
  /** Editable view of the active pack. */
  characterConfig: () => unknown
  /** Persist edits to the active pack. */
  saveCharacter: (patch: { name?: string; greeting?: string; persona?: string; playbackRate?: number }) => void
  /** What the agent remembers about the user — shared by every character. */
  memory: () => { date: string; text: string }[]
  /** Replace the remembered notes; returns the stored list. */
  saveMemory: (entries: { date: string; text: string }[]) => { date: string; text: string }[]
  /** Called with every event the backlog keeps, so the transcript outlives the process. */
  onBacklog?: (event: AiboEvent) => void
  /** Model-supported thinking levels and the shared selection. */
  thinking?: () => Promise<unknown>
  saveThinking?: (effort: string) => Promise<unknown>
  /** UI preferences shared by every browser (read aloud, speech language). */
  prefs: () => unknown
  savePrefs: (patch: Record<string, unknown>) => unknown
  /** Lists she keeps for the user. */
  lists: () => unknown[]
  /** Apply one edit from the panel; returns every list afterwards. */
  listAction: (action: string, payload: Record<string, unknown>) => unknown[]
  /** Files she has written or presented, oldest first. */
  artifacts: () => unknown[]
  /** One artifact as a file on disk, if it still exists. */
  artifactFile: (id: string) => { path: string; mime: string } | undefined
  /** Show the file in the desktop file manager; false when it is gone. */
  revealArtifact: (id: string) => boolean
  /** Drop one artifact from the list; returns what remains. */
  forgetArtifact: (id: string) => unknown[]
  /** Open a fresh session and make it the mirrored one. */
  newSession: () => Promise<void>
  /** The user answered (or skipped) a question she asked with `ask_user_question`; false when it is no longer pending. */
  answerQuestion: (id: string, answers: { id: string; selected: string[]; custom?: string }[]) => boolean
  /** Rewrite a dialogue line into the selected voice's language before synthesis. */
  spokenLine?: (text: string, language: 'zh' | 'en' | 'ja') => Promise<string>
  /** WAV bytes of a synthesized line, if still cached. */
  voiceClip: (id: string) => Buffer | undefined
  /** VOICEVOX speaker list (empty when the engine is not running). */
  voiceSpeakers: () => Promise<{ available: boolean; speakers: unknown[] }>
  /** Current voice settings for the UI. */
  voiceStatus: () => Record<string, unknown>
  /** Store one uploaded stage asset (by activity name) for the active pack. */
  uploadAsset: (state: string, kind: 'image' | 'video', ext: string, data: Buffer) => void
  /** Import a zipped pack into the user directory; returns its id. */
  importPack: (zip: Buffer, idHint: string) => string
  /** Zip the active pack; returns the archive path. */
  exportPack: () => string
  onSend: (text: string, attachments?: Upload[]) => Promise<void>
  /** A pasted or dropped image shown in the user's bubble; served under /upload/<name>. */
  uploadFile: (name: string) => string | undefined
  /** Data sources other plugins registered (see sources.ts). */
  sources: AiboSources
  log: (message: string) => void
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml',
}

export class AiboServer {
  private readonly pet = new PetState()
  private readonly speech = new SpeechService()
  private readonly clients = new Set<ServerResponse>()
  private readonly backlog: AiboEvent[] = []
  private server: Server | undefined

  constructor(private readonly options: AiboServerOptions) { this.speech.dub = options.spokenLine }

  /** Push one event to every connected client and remember it for replays. */
  broadcast(event: AiboEvent): void {
    if (event.type === 'session' || event.type === 'busy' || event.type === 'activity' && event['activity'] === 'failed') this.options.clearPetGaze?.()
    this.pet.update(event)
    // Messages and tool steps are kept so a reloaded page can rebuild the
    // conversation, including the folded "Worked through N steps" groups.
    const kept = event.type === 'user' || event.type === 'assistant' || event.type === 'status' || (event.type === 'lists' && typeof event['fresh'] === 'string') || (event.type === 'question' && Array.isArray(event['questions']))
    if (kept) { this.backlog.push(event); this.options.onBacklog?.(event) }
    else if (event.type === 'question') {
      // An answer (or a cancellation) settles the question already in the backlog, so a reload shows it decided.
      const asked = this.backlog.find(e => e.type === 'question' && e['id'] === event['id'])
      if (asked !== undefined) { if (event['answers'] !== undefined) asked['answers'] = event['answers']; if (event['cancelled'] === true) asked['cancelled'] = true; this.options.onBacklog?.(event) }
    }
    else if (event.type === 'activity' && event['activity'] === 'failed' && event['beat'] === true) {
      const last = this.backlog[this.backlog.length - 1]
      if (last?.type === 'status') { last['failed'] = true; this.options.onBacklog?.({ type: 'activity', activity: 'failed', beat: true }) }
    }
    const line = `data: ${JSON.stringify(event)}\n\n`
    for (const client of this.clients) client.write(line)
  }

  /** Forget the replayed conversation (a new session started). */
  clearBacklog(): void {
    this.pet.reset()
    this.backlog.length = 0
  }

  /** Start from a stored transcript (after a restart), replaying failure marks onto their steps. */
  seedBacklog(events: AiboEvent[]): void {
    this.backlog.length = 0
    for (const event of events) {
      if (event.type === 'activity') { const last = this.backlog[this.backlog.length - 1]; if (last?.type === 'status') last['failed'] = true; continue }
      if (event.type === 'question' && !Array.isArray(event['questions'])) {
        const asked = this.backlog.find(e => e.type === 'question' && e['id'] === event['id'])
        if (asked !== undefined) { if (event['answers'] !== undefined) asked['answers'] = event['answers']; if (event['cancelled'] === true) asked['cancelled'] = true }
        continue
      }
      // A question still open when the process died cannot be answered any more.
      if (event.type === 'question') { this.backlog.push({ ...event, ...event['answers'] === undefined ? { cancelled: true } : {} }); continue }
      this.backlog.push(event)
    }
  }

  get url(): string {
    const token = this.options.token
    return `http://127.0.0.1:${this.options.port}/${token === '' ? '' : `?token=${token}`}`
  }

  start(): Promise<void> {
    const server = createServer((req, res) => {
      this.handle(req, res).catch((error: unknown) => {
        this.options.log(`request failed: ${String(error)}`)
        if (!res.headersSent) res.writeHead(500)
        res.end()
      })
    })
    this.server = server
    return new Promise((resolve, reject) => {
      server.once('error', reject)
      server.listen(this.options.port, '127.0.0.1', () => resolve())
    })
  }

  stop(): void {
    for (const client of this.clients) client.end()
    this.clients.clear()
    this.server?.close()
    this.server = undefined
  }

  private authorized(req: IncomingMessage): boolean {
    const token = this.options.token
    if (token === '') return true
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    const presented = req.headers['x-aibo-token'] ?? url.searchParams.get('token') ?? ''
    return presented === token
  }

  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    if (!this.authorized(req)) {
      res.writeHead(401, { 'content-type': 'text/plain' })
      res.end('unauthorized')
      return
    }

    if (await this.speech.handle(req, res)) return

    if (url.pathname === '/events') { this.handleEvents(res); return }
    if (url.pathname === '/pet-state' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' })
      const snapshot = this.pet.snapshot()
      res.end(JSON.stringify({ ...snapshot, gaze: snapshot.busy ? this.options.petGaze?.() ?? null : null }))
      return
    }
    if (url.pathname === '/manifest.json') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.manifest()))
      return
    }
    if (url.pathname === '/send' && req.method === 'POST') { await this.handleSend(req, res); return }
    if (url.pathname.startsWith('/upload/') && req.method === 'GET') {
      const file = this.options.uploadFile(decodeURIComponent(url.pathname.slice('/upload/'.length)))
      if (file === undefined) { res.writeHead(404); res.end(); return }
      if (!existsSync(file) || !statSync(file).isFile()) { res.writeHead(404); res.end(); return }
      res.writeHead(200, { 'content-type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream', 'content-length': statSync(file).size, 'cache-control': 'private, max-age=31536000, immutable' })
      createReadStream(file).pipe(res)
      return
    }
    if (url.pathname === '/question' && req.method === 'POST') {
      const body = await this.readJson(req)
      const id = typeof body['id'] === 'string' ? body['id'] : ''
      const answers = Array.isArray(body['answers']) ? (body['answers'] as unknown[]).filter((a): a is { id: string; selected: string[]; custom?: string } => typeof a === 'object' && a !== null && typeof (a as { id?: unknown }).id === 'string').map(a => ({ id: a.id, selected: Array.isArray(a.selected) ? a.selected.map(String) : [], ...typeof a.custom === 'string' && a.custom.trim() !== '' ? { custom: a.custom.trim() } : {} })) : []
      if (id === '' || !this.options.answerQuestion(id, answers)) { res.writeHead(409, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: 'that question is no longer waiting' })); return }
      res.writeHead(200, { 'content-type': 'application/json' }); res.end('{"ok":true}')
      return
    }
    if (url.pathname === '/character' && req.method === 'POST') { await this.handleSwitch(req, res); return }
    if (url.pathname === '/memory' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ entries: this.options.memory() }))
      return
    }
    if (url.pathname === '/thinking' && (req.method === 'GET' || req.method === 'POST')) {
      try {
        if (!this.options.thinking || !this.options.saveThinking) throw new Error('Thinking settings unavailable')
        let view: unknown
        if (req.method === 'POST') {
          const body = await this.readJson(req)
          if (typeof body['effort'] !== 'string') throw new Error('A thinking level is required')
          view = await this.options.saveThinking(body['effort'])
        } else view = await this.options.thinking()
        res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' })
        res.end(JSON.stringify(view))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Could not update thinking level' }))
      }
      return
    }
    if (url.pathname === '/settings' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.prefs()))
      return
    }
    if (url.pathname === '/settings' && req.method === 'POST') {
      const body = await this.readJson(req)
      const prefs = this.options.savePrefs(body)
      this.broadcast({ type: 'settings', prefs })
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(prefs))
      return
    }
    if (url.pathname === '/lists' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ lists: this.options.lists() }))
      return
    }
    if (url.pathname === '/lists' && req.method === 'POST') {
      const body = await this.readJson(req)
      try {
        const lists = this.options.listAction(String(body['action'] ?? ''), body)
        this.broadcast({ type: 'lists', lists })
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ lists }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/memory' && req.method === 'POST') {
      const body = await this.readJson(req)
      try {
        const entries = this.options.saveMemory(Array.isArray(body['entries']) ? body['entries'] as { date: string; text: string }[] : [])
        this.broadcast({ type: 'memory', entries })
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ entries }))
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/artifacts' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' })
      res.end(JSON.stringify({ artifacts: this.options.artifacts() }))
      return
    }
    if (url.pathname.startsWith('/artifact/')) {
      const [id = '', action = ''] = url.pathname.slice('/artifact/'.length).split('/').map(part => decodeURIComponent(part))
      if (action === 'reveal' && req.method === 'POST') {
        const ok = this.options.revealArtifact(id)
        res.writeHead(ok ? 200 : 404, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ ok }))
        return
      }
      if (action === '' && req.method === 'DELETE') {
        const artifacts = this.options.forgetArtifact(id)
        this.broadcast({ type: 'artifact', artifacts })
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ artifacts }))
        return
      }
      if (action === '' && (req.method === 'GET' || req.method === 'HEAD')) {
        const file = this.options.artifactFile(id)
        if (file === undefined || !existsSync(file.path) || !statSync(file.path).isFile()) {
          res.writeHead(404, { 'content-type': 'text/plain' })
          res.end('file not found')
          return
        }
        // The file is read fresh each time: she may have edited it since.
        const size = statSync(file.path).size
        // A card preview only needs the opening of the file.
        const head = Math.min(size, Math.max(0, Number(url.searchParams.get('head')) || 0) || size)
        res.writeHead(200, { 'content-type': file.mime, 'content-length': head, 'cache-control': 'no-store', 'content-disposition': 'inline' })
        if (req.method === 'HEAD') { res.end(); return }
        createReadStream(file.path, head < size ? { start: 0, end: head - 1 } : {}).pipe(res)
        return
      }
      res.writeHead(405); res.end(); return
    }
    if (url.pathname === '/character/config' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.characterConfig()))
      return
    }
    if (url.pathname === '/character/config' && req.method === 'POST') {
      const body = await this.readJson(req)
      const patch: Record<string, string | number> = {}
      for (const key of ['name', 'greeting', 'persona']) {
        if (typeof body[key] === 'string') patch[key] = body[key] as string
      }
      const rate = Number(body['playbackRate'])
      if (Number.isFinite(rate) && rate > 0) patch['playbackRate'] = rate
      const speaker = Number(body['voiceSpeaker'])
      if (Number.isInteger(speaker) && speaker >= 0) patch['voiceSpeaker'] = speaker
      try {
        this.options.saveCharacter(patch)
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(this.options.characterConfig()))
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname.startsWith('/voice/') && url.pathname.endsWith('.wav')) {
      const clip = this.options.voiceClip(url.pathname.slice('/voice/'.length, -'.wav'.length))
      if (clip === undefined) { res.writeHead(404); res.end(); return }
      res.writeHead(200, { 'content-type': 'audio/wav', 'content-length': String(clip.length), 'cache-control': 'no-store' })
      res.end(clip)
      return
    }
    if (url.pathname === '/voice/speakers') {
      try {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(await this.options.voiceSpeakers()))
      } catch (error) {
        res.writeHead(502, { 'content-type': 'text/plain' }); res.end(String(error))
      }
      return
    }
    if (url.pathname === '/voice/status') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.voiceStatus()))
      return
    }
    if (url.pathname === '/character/asset' && req.method === 'PUT') {
      const state = url.searchParams.get('state') ?? url.searchParams.get('emotion') ?? ''
      const type = String(req.headers['content-type'] ?? '')
      const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : type.includes('jpeg') ? '.jpg'
        : type.includes('mp4') ? '.mp4' : type.includes('webm') ? '.webm' : ''
      if (ext === '') { res.writeHead(415, { 'content-type': 'text/plain' }); res.end('png/webp/jpeg/mp4/webm only'); return }
      try {
        const data = await this.readBody(req, 64 * 1024 * 1024)
        this.options.uploadAsset(state, ext === '.mp4' || ext === '.webm' ? 'video' : 'image', ext, data)
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(this.options.characterConfig()))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/character/import' && req.method === 'POST') {
      try {
        const data = await this.readBody(req, 256 * 1024 * 1024)
        const id = this.options.importPack(data, url.searchParams.get('id') ?? '')
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ ok: true, id }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/character/export') {
      try {
        const archive = this.options.exportPack()
        res.writeHead(200, { 'content-type': 'application/zip', 'content-disposition': `attachment; filename="${archive.split('/').pop() ?? 'pack.zip'}"` })
        createReadStream(archive).on('close', () => rmSync(dirname(archive), { recursive: true, force: true })).pipe(res)
      } catch (error) {
        res.writeHead(500, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/sources' && req.method === 'GET') {
      const views = await Promise.all(this.options.sources.list().map(async source => {
        try { return { id: source.id, label: source.label, category: source.category, view: await source.describe() } }
        catch (error) { return { id: source.id, label: source.label, category: source.category, view: { status: 'error', summary: String(error instanceof Error ? error.message : error), shared: false } } }
      }))
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({ sources: views }))
      return
    }
    const sourceAction = url.pathname.match(/^\/sources\/([^/]+)\/([^/]+)$/)
    if (sourceAction && req.method === 'POST') {
      const source = this.options.sources.get(decodeURIComponent(sourceAction[1] as string))
      if (source?.act === undefined) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('unknown source or action'); return }
      const contentType = String(req.headers['content-type'] ?? '')
      let tmp: string | undefined
      try {
        let input: { raw?: Buffer; json?: unknown; file?: string }
        if (contentType.includes('application/json') || contentType.startsWith('text/')) {
          const raw = await this.readBody(req, 64 * 1024 * 1024)
          input = { raw, ...contentType.includes('application/json') && raw.length > 0 ? { json: JSON.parse(raw.toString('utf8')) as unknown } : {} }
        } else {
          // Uploads (an export.zip can be hundreds of MB) stream to disk; the action gets a path.
          tmp = mkdtempSync(join(tmpdir(), 'aibo-upload-'))
          const file = join(tmp, 'body')
          await pipeline(req, createWriteStream(file))
          input = { file }
        }
        const result = await source.act(decodeURIComponent(sourceAction[2] as string), { ...input, contentType, query: url.searchParams })
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(result ?? { ok: true }))
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
      } finally {
        if (tmp !== undefined) rmSync(tmp, { recursive: true, force: true })
      }
      return
    }
    if (url.pathname === '/session/new' && req.method === 'POST') {
      try {
        await this.options.newSession()
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end('{"ok":true}')
      } catch (error) {
        res.writeHead(502, { 'content-type': 'text/plain' })
        res.end(String(error instanceof Error ? error.message : error))
      }
      return
    }
    if (url.pathname === '/debug/usage') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.debugUsage()))
      return
    }
    if (url.pathname === '/debug/prompt') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(await this.options.debugPrompt()))
      return
    }

    // static: /character/** from the active pack, everything else from webRoot
    const fromPack = url.pathname.startsWith('/character/')
    const root = fromPack ? this.options.characterDir() : this.options.webRoot
    const rel = decodeURIComponent(fromPack ? url.pathname.slice('/character/'.length) : url.pathname.replace(/^\/+/, '') || 'index.html')
    if (fromPack && (rel === 'character.json' || rel === 'memory.md')) { res.writeHead(404); res.end(); return }
    const path = normalize(join(root, rel))
    if (!path.startsWith(normalize(root) + sep) && path !== normalize(root)) {
      res.writeHead(403)
      res.end()
      return
    }
    if (!existsSync(path) || !statSync(path).isFile()) {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('not found')
      return
    }
    const size = statSync(path).size
    const type = MIME[extname(path)] ?? 'application/octet-stream'
    // Range support: WebKit refuses to play media from servers that cannot
    // serve byte ranges, so every static file honours a single-range request.
    const range = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers['range'] ?? ''))
    if (range !== null && (range[1] !== '' || range[2] !== '')) {
      let start = range[1] === '' ? Math.max(0, size - Number(range[2])) : Number(range[1])
      let end = range[1] !== '' && range[2] !== '' ? Number(range[2]) : size - 1
      if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= size) {
        res.writeHead(416, { 'content-range': `bytes */${size}` })
        res.end()
        return
      }
      end = Math.min(end, size - 1)
      res.writeHead(206, {
        'content-type': type,
        'content-length': end - start + 1,
        'content-range': `bytes ${start}-${end}/${size}`,
        'accept-ranges': 'bytes',
        'cache-control': 'no-cache',
      })
      if (req.method === 'HEAD') { res.end(); return }
      createReadStream(path, { start, end }).pipe(res)
      return
    }
    res.writeHead(200, {
      'content-type': type,
      'content-length': size,
      'accept-ranges': 'bytes',
      'cache-control': 'no-cache',
    })
    if (req.method === 'HEAD') { res.end(); return }
    createReadStream(path).pipe(res)
  }

  private handleEvents(res: ServerResponse): void {
    res.writeHead(200, {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      connection: 'keep-alive',
    })
    res.write(': connected\n\n')
    // replay the conversation so far as one snapshot
    const entries = this.backlog.map(event => event.type === 'status'
      ? { role: 'status', text: String(event['text'] ?? ''), activity: event['activity'], tool: event['tool'], command: event['command'], failed: event['failed'] === true }
      : event.type === 'lists'
        ? { role: 'list', text: '', list: (event['lists'] as { id: string }[]).find(list => list.id === event['fresh']) }
        : event.type === 'question'
          ? { role: 'question', text: '', id: event['id'], questions: event['questions'], answers: event['answers'], cancelled: event['cancelled'] === true }
          : { role: event.type, text: String(event['text'] ?? ''), ...Array.isArray(event['attachments']) ? { attachments: event['attachments'] } : {} })
    res.write(`data: ${JSON.stringify({ type: 'snapshot', entries, artifacts: this.options.artifacts() })}\n\n`)
    this.clients.add(res)
    const keepalive = setInterval(() => res.write(': ping\n\n'), 25_000)
    res.on('close', () => {
      clearInterval(keepalive)
      this.clients.delete(res)
    })
  }

  private readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
    const chunks: Buffer[] = []
    let size = 0
    return new Promise<Buffer>((resolve, reject) => {
      req.on('data', (chunk: Buffer) => {
        size += chunk.length
        if (size > limit) { reject(new Error('body too large')); req.destroy(); return }
        chunks.push(chunk)
      })
      req.on('end', () => resolve(Buffer.concat(chunks)))
      req.on('error', reject)
    })
  }

  private async readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
    const raw = await this.readBody(req, 256 * 1024)
    try {
      const body = JSON.parse(raw.toString('utf8')) as unknown
      return typeof body === 'object' && body !== null ? body as Record<string, unknown> : {}
    } catch {
      return {}
    }
  }

  private async handleSwitch(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const body = await this.readJson(req)
    const id = typeof body['id'] === 'string' ? body['id'].trim() : ''
    if (id === '' || !this.options.switchCharacter(id)) {
      res.writeHead(404, { 'content-type': 'text/plain' })
      res.end('unknown character')
      return
    }
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end('{"ok":true}')
  }

  private async handleSend(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const chunks: Buffer[] = []
    let size = 0
    await new Promise<void>((resolve, reject) => {
      req.on('data', (chunk: Buffer) => {
        size += chunk.length
        if (size > 64 * 1024 * 1024) { reject(new Error('body too large')); req.destroy(); return }
        chunks.push(chunk)
      })
      req.on('end', resolve)
      req.on('error', reject)
    })
    let text = ''
    let attachments: Upload[] = []
    try {
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as { text?: unknown; attachments?: unknown }
      if (typeof body.text === 'string') text = body.text.trim()
      if (Array.isArray(body.attachments)) attachments = (body.attachments as unknown[]).flatMap(a => {
        const u = a as Partial<Upload>
        if (typeof u.data !== 'string' || u.data === '' || typeof u.name !== 'string') return []
        const mediaType = typeof u.mediaType === 'string' ? u.mediaType : 'application/octet-stream'
        const kind: Upload['kind'] = u.kind === 'image' && /^image\//.test(mediaType) ? 'image' : 'file'
        return [{ kind, name: u.name.replace(/[\\/:*?"<>|]+/g, '_').slice(0, 120) || 'file', mediaType, data: u.data }]
      }).slice(0, 8)
    } catch { /* fall through to the empty-text rejection */ }
    if (text === '' && attachments.length === 0) {
      res.writeHead(400, { 'content-type': 'text/plain' })
      res.end('text required')
      return
    }
    try {
      await this.options.onSend(text, attachments)
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end('{"ok":true}')
    } catch (error) {
      res.writeHead(502, { 'content-type': 'text/plain' })
      res.end(String(error instanceof Error ? error.message : error))
    }
  }
}
