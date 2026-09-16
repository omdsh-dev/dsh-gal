/*
 * A small IMAP client, enough for Gmail: TLS, LOGIN, LIST, EXAMINE, STATUS,
 * UID SEARCH with Gmail's X-GM-RAW (the search box syntax), UID FETCH of
 * headers and bodies, LOGOUT. No dependencies. Literals ({n}) in both
 * directions are handled; nothing is ever written to the mailbox (BODY.PEEK).
 *
 * Also here: RFC 2047 header decoding and a MIME walker that turns a message
 * body into plain text (text/plain preferred, text/html stripped).
 */
import { connect as tlsConnect, type TLSSocket } from 'node:tls'

export interface Untagged { text: string; literals: Buffer[] }
export interface Reply { status: 'OK' | 'NO' | 'BAD'; text: string; untagged: Untagged[] }
export interface Header { uid: number; from: string; to: string; subject: string; date: string; unread: boolean }

type Want = { kind: 'line'; resolve: (b: Buffer) => void; reject: (e: Error) => void } | { kind: 'bytes'; n: number; resolve: (b: Buffer) => void; reject: (e: Error) => void }

const CRLF = '\r\n'
const STAR = 0x2a

export class Imap {
  private buf: Buffer = Buffer.alloc(0)
  private want: Want | undefined
  private closed: Error | undefined
  private seq = 0
  private constructor(private readonly sock: TLSSocket) {
    sock.on('data', (chunk: Buffer) => { this.buf = this.buf.length ? Buffer.concat([this.buf, chunk]) : chunk; this.pump() })
    const die = (e?: Error): void => { this.closed = e ?? new Error('connection closed'); this.want?.reject(this.closed); this.want = undefined }
    sock.on('error', die); sock.on('close', () => die()); sock.on('end', () => die())
  }
  static async connect(host: string, port = 993, timeoutMs = 20_000): Promise<Imap> {
    const sock = await new Promise<TLSSocket>((resolve, reject) => {
      const s = tlsConnect({ host, port, servername: host }, () => resolve(s))
      s.setTimeout(timeoutMs, () => s.destroy(new Error('imap timeout')))
      s.once('error', reject)
    })
    const imap = new Imap(sock)
    const greeting = (await imap.readLine()).toString('utf8')
    if (!greeting.startsWith('* OK') && !greeting.startsWith('* PREAUTH')) throw new Error(`unexpected greeting: ${greeting}`)
    return imap
  }
  close(): void { this.sock.destroy() }

  private pump(): void {
    const w = this.want
    if (!w) return
    if (w.kind === 'bytes') {
      if (this.buf.length < w.n) return
      const out = this.buf.subarray(0, w.n); this.buf = this.buf.subarray(w.n); this.want = undefined; w.resolve(out); return
    }
    const i = this.buf.indexOf(CRLF)
    if (i < 0) return
    const out = this.buf.subarray(0, i); this.buf = this.buf.subarray(i + 2); this.want = undefined; w.resolve(out)
  }
  private readLine(): Promise<Buffer> {
    if (this.closed) return Promise.reject(this.closed)
    return new Promise((resolve, reject) => { this.want = { kind: 'line', resolve, reject }; this.pump() })
  }
  private readBytes(n: number): Promise<Buffer> {
    if (this.closed) return Promise.reject(this.closed)
    return new Promise((resolve, reject) => { this.want = { kind: 'bytes', n, resolve, reject }; this.pump() })
  }
  private write(data: string | Buffer): void { this.sock.write(data) }

  /** One command; `literal` is sent as a synchronising literal appended to the command line. */
  async command(cmd: string, literal?: Buffer): Promise<Reply> {
    const tag = `A${++this.seq}`
    if (literal) {
      this.write(`${tag} ${cmd} {${literal.length}}${CRLF}`)
      for (;;) {
        const l = (await this.readLine()).toString('utf8')
        if (l.startsWith('+')) break
        if (l.startsWith(`${tag} `)) throw new Error(`server refused literal: ${l}`)
      }
      this.write(Buffer.concat([literal, Buffer.from(CRLF)]))
    } else this.write(`${tag} ${cmd}${CRLF}`)
    const untagged: Untagged[] = []
    for (;;) {
      let line = await this.readLine()
      if (line.toString('latin1').startsWith(`${tag} `)) {
        const rest = line.toString('utf8').slice(tag.length + 1)
        const status = rest.split(' ')[0] as Reply['status']
        return { status, text: rest.slice(status.length + 1), untagged }
      }
      if (line[0] !== STAR) continue
      // An untagged response may carry literals; each is read whole and replaced by " <index> ", then the line continues.
      let text = ''
      const literals: Buffer[] = []
      for (;;) {
        const s = line.toString('utf8')
        const m = /\{(\d+)\}$/.exec(s)
        if (!m) { text += s; break }
        text += `${s.slice(0, m.index)} ${literals.length} `
        literals.push(await this.readBytes(Number(m[1])))
        line = await this.readLine()
      }
      untagged.push({ text, literals })
    }
  }
  async ok(cmd: string, literal?: Buffer): Promise<Reply> {
    const r = await this.command(cmd, literal)
    if (r.status !== 'OK') throw new Error(`${cmd.split(' ').slice(0, 2).join(' ')}: ${r.status} ${r.text}`)
    return r
  }

  async login(user: string, password: string): Promise<void> {
    const r = await this.command(`LOGIN ${quote(user)} ${quote(password)}`)
    if (r.status !== 'OK') throw new Error(/AUTHENTICATIONFAILED|Invalid credentials/i.test(r.text) ? 'login failed: check the address and the app password' : `login: ${r.text}`)
  }
  /** The Gmail "All Mail" folder, whatever the account's language calls it; INBOX when it cannot be found. */
  async allMailFolder(): Promise<string> {
    const r = await this.ok('LIST "" "*"')
    for (const u of r.untagged) {
      const m = /^\* LIST \(([^)]*)\) (?:"[^"]*"|NIL) (.+)$/.exec(u.text)
      if (!m) continue
      if (!/\\All\b/.test(m[1]!)) continue
      return unquote(m[2]!, u.literals)
    }
    return 'INBOX'
  }
  async examine(folder: string): Promise<void> { await this.ok(`EXAMINE ${quote(folder)}`) }
  async unseen(folder: string): Promise<{ unseen: number; messages: number }> {
    const r = await this.ok(`STATUS ${quote(folder)} (UNSEEN MESSAGES)`)
    const t = r.untagged.map(u => u.text).join('\n')
    return { unseen: Number(/UNSEEN (\d+)/.exec(t)?.[1] ?? 0), messages: Number(/MESSAGES (\d+)/.exec(t)?.[1] ?? 0) }
  }
  /** Gmail search syntax; UIDs oldest first. */
  async gmailSearch(query: string): Promise<number[]> {
    const r = await this.ok('UID SEARCH CHARSET UTF-8 X-GM-RAW', Buffer.from(query, 'utf8'))
    const uids: number[] = []
    for (const u of r.untagged) if (u.text.startsWith('* SEARCH')) for (const n of u.text.slice(8).trim().split(/\s+/)) if (n) uids.push(Number(n))
    return uids.sort((a, b) => a - b)
  }
  /** Envelope-ish headers for a set of UIDs, newest first. */
  async fetchHeaders(uids: number[]): Promise<Header[]> {
    if (!uids.length) return []
    const r = await this.ok(`UID FETCH ${uids.join(',')} (UID INTERNALDATE FLAGS BODY.PEEK[HEADER.FIELDS (FROM TO SUBJECT DATE)])`)
    const out: Header[] = []
    for (const u of r.untagged) {
      if (!/^\* \d+ FETCH /.test(u.text)) continue
      const uid = Number(/\bUID (\d+)/.exec(u.text)?.[1] ?? 0)
      const internal = /INTERNALDATE "([^"]+)"/.exec(u.text)?.[1] ?? ''
      const flags = /FLAGS \(([^)]*)\)/.exec(u.text)?.[1] ?? ''
      const raw = section(u, /BODY\[HEADER\.FIELDS[^\]]*\]/).toString('latin1')
      const h = parseHeaders(raw)
      const date = h['date'] && !Number.isNaN(Date.parse(h['date'])) ? new Date(h['date']) : internal ? parseInternalDate(internal) : new Date(0)
      out.push({ uid, from: decodeWords(h['from'] ?? ''), to: decodeWords(h['to'] ?? ''), subject: decodeWords(h['subject'] ?? '').replace(/\s+/g, ' ').trim(), date: date.toISOString(), unread: !/\\Seen/.test(flags) })
    }
    return out.sort((a, b) => b.date.localeCompare(a.date))
  }
  /** The message as text: headers of interest plus the best text part, capped. */
  async fetchText(uid: number, maxBytes = 400_000): Promise<{ header: Header; text: string; truncated: boolean } | undefined> {
    const [header] = await this.fetchHeaders([uid])
    if (!header) return undefined
    const r = await this.ok(`UID FETCH ${uid} (BODY.PEEK[HEADER.FIELDS (CONTENT-TYPE CONTENT-TRANSFER-ENCODING)] BODY.PEEK[TEXT]<0.${maxBytes}>)`)
    const u = r.untagged.find(x => /^\* \d+ FETCH /.test(x.text))
    if (!u) return undefined
    const head = parseHeaders(section(u, /BODY\[HEADER\.FIELDS[^\]]*\]/).toString('latin1'))
    const body = section(u, /BODY\[TEXT\](?:<\d+>)?/)
    const text = mimeText(head['content-type'] ?? 'text/plain', head['content-transfer-encoding'] ?? '7bit', body)
    return { header, text, truncated: body.length >= maxBytes }
  }
  async logout(): Promise<void> { try { await this.command('LOGOUT') } catch { /* closing anyway */ } this.close() }
}

/** The value after a FETCH section name: a literal marker, a quoted string, or NIL. */
function section(u: Untagged, name: RegExp): Buffer {
  const m = new RegExp(`${name.source} ( (\\d+) |"((?:[^"\\\\]|\\\\.)*)"|NIL)`).exec(u.text)
  if (!m) return Buffer.alloc(0)
  if (m[2] !== undefined) return u.literals[Number(m[2])] ?? Buffer.alloc(0)
  return Buffer.from((m[3] ?? '').replace(/\\(.)/g, '$1'), 'latin1')
}
const quote = (s: string): string => `"${s.replace(/[\\"]/g, c => `\\${c}`)}"`
function unquote(s: string, literals: Buffer[]): string {
  const m = /^ (\d+) $/.exec(s)
  if (m) return literals[Number(m[1])]!.toString('utf8')
  return s.startsWith('"') ? s.slice(1, -1).replace(/\\(.)/g, '$1') : s
}
function parseInternalDate(s: string): Date {
  // 27-Sep-2026 10:00:00 +0800
  const m = /^\s*(\d{1,2})-([A-Za-z]{3})-(\d{4}) (\d{2}:\d{2}:\d{2}) ([+-]\d{4})/.exec(s)
  if (!m) return new Date(0)
  const d = new Date(`${m[1]} ${m[2]} ${m[3]} ${m[4]} ${m[5]}`)
  return Number.isNaN(d.getTime()) ? new Date(0) : d
}

/** Unfolds and lowercases header names. */
export function parseHeaders(raw: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (const line of raw.replace(/\r?\n[ \t]+/g, ' ').split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i <= 0) continue
    const k = line.slice(0, i).trim().toLowerCase(), v = line.slice(i + 1).trim()
    out[k] = out[k] ? `${out[k]}, ${v}` : v
  }
  return out
}

function decodeCharset(bytes: Buffer, charset: string): string {
  const cs = charset.trim().toLowerCase().replace(/^"|"$/g, '') || 'utf-8'
  for (const c of [cs, cs === 'gb2312' ? 'gbk' : cs, 'utf-8']) { try { return new TextDecoder(c).decode(bytes) } catch { /* next */ } }
  return bytes.toString('latin1')
}
function decodeQp(s: string, underscoreSpace = false): Buffer {
  const t = (underscoreSpace ? s.replace(/_/g, ' ') : s).replace(/=\r?\n/g, '')
  const bytes: number[] = []
  for (let i = 0; i < t.length; i++) {
    const c = t.charCodeAt(i)
    if (c === 0x3d && /^[0-9A-Fa-f]{2}$/.test(t.slice(i + 1, i + 3))) { bytes.push(parseInt(t.slice(i + 1, i + 3), 16)); i += 2 } else bytes.push(c & 0xff)
  }
  return Buffer.from(bytes)
}
/** RFC 2047 encoded words in a header value. */
export function decodeWords(s: string): string {
  return s.replace(/\?=\s+=\?/g, '?==?').replace(/=\?([^?]+)\?([bBqQ])\?([^?]*)\?=/g, (_m, cs: string, enc: string, txt: string) =>
    decodeCharset(enc.toLowerCase() === 'b' ? Buffer.from(txt, 'base64') : decodeQp(txt, true), cs.split('*')[0]!))
}

// ---- MIME → text -------------------------------------------------------------

function param(contentType: string, name: string): string | undefined {
  const m = new RegExp(`${name}\\s*=\\s*("([^"]*)"|([^;\\s]+))`, 'i').exec(contentType)
  return m ? (m[2] ?? m[3]) : undefined
}
function decodeBody(bytes: Buffer, cte: string, charset: string): string {
  const enc = cte.trim().toLowerCase()
  const raw = enc === 'base64' ? Buffer.from(bytes.toString('latin1').replace(/[^A-Za-z0-9+/=]/g, ''), 'base64') : enc === 'quoted-printable' ? decodeQp(bytes.toString('latin1')) : bytes
  return decodeCharset(raw, charset)
}
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style|head)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|tr|li|h[1-6]|table|blockquote)>/gi, '\n').replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_m, n: string) => String.fromCodePoint(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_m, n: string) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim()
}
interface Part { plain?: string; html?: string }
function walk(contentType: string, cte: string, body: Buffer, depth = 0): Part {
  const type = (contentType.split(';')[0] ?? '').trim().toLowerCase()
  if (type.startsWith('multipart/') && depth < 8) {
    const boundary = param(contentType, 'boundary')
    if (!boundary) return {}
    const pieces = body.toString('latin1').split(`--${boundary}`).slice(1)
    const parts: Part[] = []
    for (const piece of pieces) {
      if (piece.startsWith('--')) break
      const sep = piece.search(/\r?\n\r?\n/)
      if (sep < 0) continue
      const head = parseHeaders(piece.slice(0, sep))
      if (/attachment/i.test(head['content-disposition'] ?? '')) continue
      const raw = piece.slice(sep).replace(/^\r?\n\r?\n/, '').replace(/\r?\n$/, '')
      parts.push(walk(head['content-type'] ?? 'text/plain', head['content-transfer-encoding'] ?? '7bit', Buffer.from(raw, 'latin1'), depth + 1))
    }
    if (type === 'multipart/alternative') return { plain: parts.map(p => p.plain).filter(Boolean).pop(), html: parts.map(p => p.html).filter(Boolean).pop() }
    return { plain: parts.map(p => p.plain).filter(Boolean).join('\n\n') || undefined, html: parts.map(p => p.html).filter(Boolean).join('\n\n') || undefined }
  }
  if (type === 'message/rfc822') {
    const s = body.toString('latin1'), sep = s.search(/\r?\n\r?\n/)
    if (sep < 0) return {}
    const head = parseHeaders(s.slice(0, sep))
    return walk(head['content-type'] ?? 'text/plain', head['content-transfer-encoding'] ?? '7bit', Buffer.from(s.slice(sep).replace(/^\r?\n\r?\n/, ''), 'latin1'), depth + 1)
  }
  if (type === 'text/html') return { html: decodeBody(body, cte, param(contentType, 'charset') ?? 'utf-8') }
  if (type === '' || type.startsWith('text/')) return { plain: decodeBody(body, cte, param(contentType, 'charset') ?? 'utf-8') }
  return {}
}
/** Plain text of a message body: text/plain when there is one, else the HTML stripped. */
export function mimeText(contentType: string, cte: string, body: Buffer): string {
  const p = walk(contentType, cte, body)
  const plain = p.plain?.replace(/\r\n/g, '\n').trim()
  if (plain && plain.length > 40) return plain
  if (p.html) return htmlToText(p.html)
  return plain ?? ''
}
