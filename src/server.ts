/**
 * The dsh-gal HTTP server: serves the visual-novel frontend, streams
 * conversation events over SSE, and accepts user input via POST /send.
 * Binds 127.0.0.1 only; optional shared-token auth (header x-gal-token,
 * ?token=). Static files come from the plugin's own web/ and assets/ dirs.
 */

import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { createReadStream, existsSync, rmSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize, sep } from 'node:path'

export interface GalEvent {
  type: 'user' | 'assistant' | 'status' | 'busy' | 'emotion' | 'snapshot' | 'manifest' | 'session' | 'memory'
  [key: string]: unknown
}

export interface GalServerOptions {
  port: number
  token: string
  webRoot: string
  /** Directory of the active character pack (served under /character/). */
  characterDir: () => string
  manifest: () => unknown
  /** Switch the active pack by id; false when unknown. */
  switchCharacter: (id: string) => boolean
  /** Global prompt sections as assembled right now (diagnostics). */
  debugPrompt: () => Promise<unknown>
  /** Emotion-judge accounting (calls, latency, tokens). */
  debugUsage: () => unknown
  /** Editable view of the active pack. */
  characterConfig: () => unknown
  /** Persist edits to the active pack. */
  saveCharacter: (patch: { name?: string; greeting?: string; persona?: string; memory?: string; playbackRate?: number }) => void
  /** Open a fresh session and make it the mirrored one. */
  newSession: () => Promise<void>
  /** Store one uploaded expression asset for the active pack. */
  uploadAsset: (emotion: string, kind: 'image' | 'video', ext: string, data: Buffer) => void
  /** Import a zipped pack into the user directory; returns its id. */
  importPack: (zip: Buffer, idHint: string) => string
  /** Zip the active pack; returns the archive path. */
  exportPack: () => string
  onSend: (text: string) => Promise<void>
  log: (message: string) => void
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml',
}

export class GalServer {
  private readonly clients = new Set<ServerResponse>()
  private readonly backlog: GalEvent[] = []
  private server: Server | undefined

  constructor(private readonly options: GalServerOptions) {}

  /** Push one event to every connected client and remember it for replays. */
  broadcast(event: GalEvent): void {
    if (event.type === 'user' || event.type === 'assistant') this.backlog.push(event)
    const line = `data: ${JSON.stringify(event)}\n\n`
    for (const client of this.clients) client.write(line)
  }

  /** Forget the replayed conversation (a new session started). */
  clearBacklog(): void {
    this.backlog.length = 0
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
    const presented = req.headers['x-gal-token'] ?? url.searchParams.get('token') ?? ''
    return presented === token
  }

  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    if (!this.authorized(req)) {
      res.writeHead(401, { 'content-type': 'text/plain' })
      res.end('unauthorized')
      return
    }

    if (url.pathname === '/events') { this.handleEvents(res); return }
    if (url.pathname === '/manifest.json') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.manifest()))
      return
    }
    if (url.pathname === '/send' && req.method === 'POST') { await this.handleSend(req, res); return }
    if (url.pathname === '/character' && req.method === 'POST') { await this.handleSwitch(req, res); return }
    if (url.pathname === '/character/config' && req.method === 'GET') {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify(this.options.characterConfig()))
      return
    }
    if (url.pathname === '/character/config' && req.method === 'POST') {
      const body = await this.readJson(req)
      const patch: Record<string, string | number> = {}
      for (const key of ['name', 'greeting', 'persona', 'memory']) {
        if (typeof body[key] === 'string') patch[key] = body[key] as string
      }
      const rate = Number(body['playbackRate'])
      if (Number.isFinite(rate) && rate > 0) patch['playbackRate'] = rate
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
    if (url.pathname === '/character/asset' && req.method === 'PUT') {
      const emotion = url.searchParams.get('emotion') ?? ''
      const type = String(req.headers['content-type'] ?? '')
      const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : type.includes('jpeg') ? '.jpg'
        : type.includes('mp4') ? '.mp4' : type.includes('webm') ? '.webm' : ''
      if (ext === '') { res.writeHead(415, { 'content-type': 'text/plain' }); res.end('png/webp/jpeg/mp4/webm only'); return }
      try {
        const data = await this.readBody(req, 64 * 1024 * 1024)
        this.options.uploadAsset(emotion, ext === '.mp4' || ext === '.webm' ? 'video' : 'image', ext, data)
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
    const entries = this.backlog.map(event => ({
      role: event.type,
      text: String(event['text'] ?? ''),
    }))
    res.write(`data: ${JSON.stringify({ type: 'snapshot', entries })}\n\n`)
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
        if (size > 256 * 1024) { reject(new Error('body too large')); req.destroy(); return }
        chunks.push(chunk)
      })
      req.on('end', resolve)
      req.on('error', reject)
    })
    let text = ''
    try {
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as { text?: unknown }
      if (typeof body.text === 'string') text = body.text.trim()
    } catch { /* fall through to the empty-text rejection */ }
    if (text === '') {
      res.writeHead(400, { 'content-type': 'text/plain' })
      res.end('text required')
      return
    }
    try {
      await this.options.onSend(text)
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end('{"ok":true}')
    } catch (error) {
      res.writeHead(502, { 'content-type': 'text/plain' })
      res.end(String(error instanceof Error ? error.message : error))
    }
  }
}
