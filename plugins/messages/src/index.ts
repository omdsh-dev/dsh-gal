/*
 * dsh-messages: the user's iMessage and SMS conversations, for any dsh session.
 *
 * Read straight from Messages.app's SQLite store (~/Library/Messages/chat.db)
 * through the system `sqlite3`, read-only, never copied. The process running
 * dsh needs Full Disk Access for that; without it the source shows the setup
 * steps instead of failing quietly. Sender handles are resolved to names from
 * the local Contacts store (AddressBook) when readable, or a `names` map.
 *
 * This is the most private source there is, so sharing is OFF by default and
 * even when on the prompt only carries counts and who is waiting for a reply —
 * never message text. The tools can read threads, but say so loudly.
 */
import { execFile } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'

const execFileAsync = promisify(execFile)

// ---- the slice of dsh-gal's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  data?: unknown
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  series?: { label: string; unit?: string; points: { day: string; value?: number }[] }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; value?: boolean; confirm?: string; hint?: string; placeholder?: string }[]
}
interface GalSources {
  register(source: { id: string; label: string; category: string; describe(): SourceView | Promise<SourceView>; act?(action: string, input: { json?: unknown }): Promise<unknown> | unknown }): () => void
  changed(id: string): void
}
interface ToolsLike { register(tool: unknown): () => void }
interface SystemPromptLike { section(section: { name: string; order: number; text: () => string }): () => void }
type Context = CordisContext & { tools: ToolsLike; systemPrompt: SystemPromptLike }

export const name = 'dsh-messages'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Days of history to keep in the cache (the "week" the prompt talks about). */
  days?: number
  /** Minutes between refreshes. */
  refreshMinutes?: number
  /** Handle (phone or email) → display name, used before Contacts. */
  names?: Record<string, string>
  /** Path to chat.db; empty = ~/Library/Messages/chat.db. */
  dbPath?: string
}
export const Config: z<Config> = z.object({
  days: z.number().step(1).min(1).max(365).default(7),
  refreshMinutes: z.number().min(1).default(5),
  names: z.dict(z.string()).default({}),
  dbPath: z.string().default(''),
})

// ---- storage ----------------------------------------------------------------

/*
 * The only thing this plugin keeps is the shared switch, as the document
 * `messages/settings` in the shared dsh-gal store. Message data is read live
 * from chat.db and is never stored. The `settings.json` an earlier version
 * wrote under `~/.dsh/messages/` (or `DSH_MESSAGES_DIR`) is imported once.
 */
interface Settings { shared: boolean }
const DEFAULT_SETTINGS: Settings = { shared: false }
const dataDir = (): string => process.env['DSH_MESSAGES_DIR'] ?? join(homedir(), '.dsh', 'messages')
const settingsDoc = () => openStore().doc<Settings>('messages', 'settings')
let imported = false
/** Bring the old settings.json into the store, once; never overwrites what is already stored. */
function importLegacy(): void {
  if (imported) return
  imported = true
  migrateFile(join(dataDir(), 'settings.json'), text => {
    const doc = settingsDoc()
    if (doc.get() !== undefined) return
    const old = JSON.parse(text) as Partial<Settings>
    doc.set({ ...DEFAULT_SETTINGS, shared: Boolean(old.shared) })
  })
}
function readSettings(): Settings {
  importLegacy()
  return { ...DEFAULT_SETTINGS, ...(settingsDoc().get() ?? {}) }
}
function writeSettings(patch: Partial<Settings>): Settings {
  importLegacy()
  return settingsDoc().patch(patch, DEFAULT_SETTINGS)
}

// ---- sqlite -----------------------------------------------------------------

/** Thrown when macOS refuses the file: the process lacks Full Disk Access. */
class AccessDenied extends Error { constructor(file: string) { super(`cannot open ${file}: Full Disk Access is required`); this.name = 'AccessDenied' } }

const uri = (file: string): string => `file:${file.replace(/[%?#]/g, encodeURIComponent)}?mode=ro`
async function query<T>(file: string, sql: string): Promise<T[]> {
  if (!existsSync(file)) throw new Error(`${file} does not exist`)
  try {
    const { stdout } = await execFileAsync('/usr/bin/sqlite3', ['-readonly', '-json', uri(file), sql], { timeout: 30_000, maxBuffer: 64 * 1024 * 1024 })
    const out = stdout.trim()
    return out === '' ? [] : JSON.parse(out) as T[]
  } catch (error) {
    const stderr = String((error as { stderr?: string }).stderr ?? '').trim()
    if (/unable to open database|authorization denied|not authorized|operation not permitted/i.test(stderr)) throw new AccessDenied(file)
    throw new Error(stderr || String(error))
  }
}

/** Text of a message whose `text` column is NULL: the NSAttributedString typedstream in `attributedBody`. */
export function decodeAttributedBody(hex: string): string {
  try {
    const buf = Buffer.from(hex, 'hex')
    const marker = buf.indexOf('NSString', 0, 'latin1')
    if (marker < 0) return ''
    // After the class name: 01 94 84 01 2B, then a typedstream int (length) and the UTF-8 bytes.
    let i = buf.indexOf(0x2b, marker + 8)
    if (i < 0) return ''
    i += 1
    let len = buf[i] ?? -1
    i += 1
    if (len === 0x81) { len = buf.readUInt16LE(i); i += 2 }
    else if (len === 0x82) { len = buf.readUInt32LE(i); i += 4 }
    else if (len < 0 || len >= 0x80) return ''
    return buf.subarray(i, i + len).toString('utf8').replace(/\uFFFC/g, '').trim()
  } catch { return '' }
}

// ---- Messages.app data --------------------------------------------------------

interface Msg { id: number; chatId: number; at: number; fromMe: boolean; handle: string; text: string; attachments: boolean }
interface Chat { id: number; ident: string; title: string; service: string; handles: string[] }
interface Thread { id: number; name: string; participants: string[]; service: string; last: string; lastFromMe: boolean; lastSender: string; awaiting: boolean; snippet: string; count: number; sent: number; received: number }
interface DayCount { day: string; sent: number; received: number }

const MAC_EPOCH_MS = 978307200000 // 2001-01-01T00:00:00Z
/** `message.date` is nanoseconds since 2001 on current macOS, seconds on old databases. */
const toMs = (date: number): number => (date > 100_000_000_000 ? date / 1_000_000 : date * 1000) + MAC_EPOCH_MS
const dateClause = (sinceMs: number): string => {
  const s = Math.floor((sinceMs - MAC_EPOCH_MS) / 1000)
  return `(m.date > ${s * 1_000_000_000} OR (m.date < 100000000000 AND m.date > ${s}))`
}
const HANDLE_SEP = '\u001f'

interface MsgRow { id: number; chatId: number; date: number; fromMe: number; att: number; handle: string; text: string | null; body: string | null }
const rowToMsg = (r: MsgRow): Msg => ({
  id: r.id, chatId: r.chatId, at: toMs(r.date), fromMe: r.fromMe === 1, handle: r.handle,
  text: (r.text ?? (r.body ? decodeAttributedBody(r.body) : '')).replace(/\uFFFC/g, '').trim(), attachments: r.att === 1,
})
const MSG_SELECT = `SELECT m.ROWID AS id, j.chat_id AS chatId, m.date AS date, m.is_from_me AS fromMe, m.cache_has_attachments AS att, COALESCE(h.id, '') AS handle, m.text AS text, CASE WHEN m.text IS NULL THEN hex(m.attributedBody) ELSE NULL END AS body
FROM message m JOIN chat_message_join j ON j.message_id = m.ROWID LEFT JOIN handle h ON h.ROWID = m.handle_id
WHERE m.item_type = 0 AND (m.associated_message_type IS NULL OR m.associated_message_type < 2000)`

async function loadMessages(db: string, sinceMs: number): Promise<Msg[]> {
  const rows = await query<MsgRow>(db, `${MSG_SELECT} AND ${dateClause(sinceMs)} ORDER BY m.date ASC`)
  return rows.map(rowToMsg)
}
async function loadChatMessages(db: string, chatId: number, limit: number): Promise<Msg[]> {
  const rows = await query<MsgRow>(db, `${MSG_SELECT} AND j.chat_id = ${Math.floor(chatId)} ORDER BY m.date DESC LIMIT ${Math.floor(limit)}`)
  return rows.map(rowToMsg).reverse()
}
async function loadChats(db: string, ids?: number[]): Promise<Map<number, Chat>> {
  if (ids && ids.length === 0) return new Map()
  const where = ids ? `WHERE c.ROWID IN (${ids.map(n => Math.floor(n)).join(',')})` : ''
  const rows = await query<{ id: number; ident: string; title: string; service: string; handles: string }>(db, `SELECT c.ROWID AS id, COALESCE(c.chat_identifier, '') AS ident, COALESCE(c.display_name, '') AS title, COALESCE(c.service_name, '') AS service, COALESCE(GROUP_CONCAT(h.id, char(31)), '') AS handles
FROM chat c LEFT JOIN chat_handle_join x ON x.chat_id = c.ROWID LEFT JOIN handle h ON h.ROWID = x.handle_id ${where} GROUP BY c.ROWID`)
  return new Map(rows.map(r => [r.id, { id: r.id, ident: r.ident, title: r.title, service: r.service, handles: r.handles === '' ? [] : [...new Set(r.handles.split(HANDLE_SEP))] }]))
}

// ---- names ------------------------------------------------------------------

const digitsOf = (s: string): string => s.replace(/\D/g, '')
const hasCjk = (s: string): boolean => /[぀-ヿ㐀-鿿가-힯]/.test(s)
const fullName = (first: string | null, last: string | null, org: string | null): string => {
  const f = (first ?? '').trim(), l = (last ?? '').trim()
  if (f && l) return hasCjk(f) && hasCjk(l) ? `${l}${f}` : `${f} ${l}`
  return f || l || (org ?? '').trim()
}

/** Phone and email → name, from Contacts' own SQLite stores (each source account has one). */
class NameBook {
  private readonly emails = new Map<string, string>()
  /** Keyed by the last 8 digits; each candidate keeps its full digit string for a suffix check. */
  private readonly phones = new Map<string, { digits: string; name: string }[]>()
  constructor(private readonly configured: Record<string, string>) {
    for (const [handle, name] of Object.entries(configured)) this.add(handle, name)
  }
  add(handle: string, name: string): void {
    if (!name) return
    if (handle.includes('@')) { this.emails.set(handle.trim().toLowerCase(), name); return }
    const digits = digitsOf(handle)
    if (digits.length < 5) return
    const key = digits.slice(-8)
    const list = this.phones.get(key) ?? []
    list.push({ digits, name })
    this.phones.set(key, list)
  }
  resolve(handle: string): string | undefined {
    if (!handle) return undefined
    const direct = this.configured[handle]
    if (direct) return direct
    if (handle.includes('@')) return this.emails.get(handle.trim().toLowerCase())
    const digits = digitsOf(handle)
    if (digits.length < 5) return undefined
    for (const c of this.phones.get(digits.slice(-8)) ?? []) {
      const short = Math.min(c.digits.length, digits.length)
      if (short >= 8 && (c.digits.endsWith(digits) || digits.endsWith(c.digits))) return c.name
    }
    return undefined
  }
  async loadContacts(): Promise<number> {
    const root = join(homedir(), 'Library', 'Application Support', 'AddressBook')
    const files = [join(root, 'AddressBook-v22.abcddb')]
    try { for (const d of readdirSync(join(root, 'Sources'))) files.push(join(root, 'Sources', d, 'AddressBook-v22.abcddb')) } catch { /* no sources */ }
    let n = 0
    for (const file of files.filter(f => existsSync(f))) {
      try {
        const phones = await query<{ v: string; f: string | null; l: string | null; o: string | null }>(file, 'SELECT p.ZFULLNUMBER AS v, r.ZFIRSTNAME AS f, r.ZLASTNAME AS l, r.ZORGANIZATION AS o FROM ZABCDPHONENUMBER p JOIN ZABCDRECORD r ON r.Z_PK = p.ZOWNER WHERE p.ZFULLNUMBER IS NOT NULL')
        for (const p of phones) { this.add(p.v, fullName(p.f, p.l, p.o)); n++ }
        const emails = await query<{ v: string; f: string | null; l: string | null; o: string | null }>(file, 'SELECT e.ZADDRESS AS v, r.ZFIRSTNAME AS f, r.ZLASTNAME AS l, r.ZORGANIZATION AS o FROM ZABCDEMAILADDRESS e JOIN ZABCDRECORD r ON r.Z_PK = e.ZOWNER WHERE e.ZADDRESS IS NOT NULL')
        for (const e of emails) { this.add(e.v, fullName(e.f, e.l, e.o)); n++ }
      } catch { /* unreadable store: raw handles are fine */ }
    }
    return n
  }
}

/** Short codes and alphanumeric sender ids (carriers, banks, OTPs) cannot be replied to, so they never "await" a reply. */
const isAutomated = (handle: string): boolean => {
  if (!handle || handle.includes('@')) return false
  const digits = digitsOf(handle)
  return digits.length < 9 || (!handle.startsWith('+') && /[a-z]/i.test(handle))
}

// ---- time -------------------------------------------------------------------

const pad = (n: number): string => String(n).padStart(2, '0')
const localIso = (ms: number): string => { const d = new Date(ms); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` }
const dayOf = (ms: number): string => localIso(ms).slice(0, 10)
const startOfDay = (ms: number): number => { const d = new Date(ms); d.setHours(0, 0, 0, 0); return d.getTime() }
const agoWords = (ms: number): string => { const min = Math.max(0, Math.round((Date.now() - ms) / 60000)); return min < 60 ? `${min} min` : min < 60 * 36 ? `${Math.round(min / 60)} h` : `${Math.round(min / 1440)} d` }
const clip = (s: string, n: number): string => { const one = s.replace(/\s+/g, ' ').trim(); return one.length <= n ? one : `${one.slice(0, n - 1)}…` }

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-messages: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-messages: ${message}`)
  const days = config.days ?? 7
  const refreshMs = (config.refreshMinutes ?? 5) * 60_000
  const db = config.dbPath || join(homedir(), 'Library', 'Messages', 'chat.db')
  const book = new NameBook(config.names ?? {})

  // The cache is what the prompt section reads; sections are synchronous.
  const cache = { threads: [] as Thread[], days: [] as DayCount[], at: 0, error: '', denied: false, contacts: -1 }
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }

  const displayName = (handle: string): string => book.resolve(handle) ?? handle
  const chatName = (chat: Chat | undefined, fallbackHandle: string): { name: string; participants: string[] } => {
    const participants = (chat?.handles ?? []).map(displayName)
    const listed = participants.length <= 3 ? participants.join(', ') : `${participants.slice(0, 3).join(', ')} +${participants.length - 3}`
    const name = chat?.title || (participants.length > 0 ? listed : displayName(chat?.ident || fallbackHandle) || 'Unknown')
    return { name, participants }
  }
  const snippetOf = (m: Msg): string => m.text ? clip(m.text, 80) : m.attachments ? '[attachment]' : ''

  /** Threads and day counts from a window of messages; pure, so tools can run it over other windows. */
  const summarize = (msgs: Msg[], chats: Map<number, Chat>, windowDays: number): { threads: Thread[]; days: DayCount[] } => {
    const byChat = new Map<number, Msg[]>()
    for (const m of msgs) { const list = byChat.get(m.chatId) ?? []; list.push(m); byChat.set(m.chatId, list) }
    const threads: Thread[] = []
    for (const [chatId, list] of byChat) {
      const last = list[list.length - 1]!
      const chat = chats.get(chatId)
      const { name, participants } = chatName(chat, last.handle)
      const automated = (chat?.handles ?? [last.handle]).every(isAutomated)
      threads.push({
        id: chatId, name, participants, service: chat?.service ?? '', last: localIso(last.at), lastFromMe: last.fromMe,
        lastSender: last.fromMe ? 'You' : displayName(last.handle), awaiting: !last.fromMe && !automated, snippet: snippetOf(last),
        count: list.length, sent: list.filter(m => m.fromMe).length, received: list.filter(m => !m.fromMe).length,
      })
    }
    threads.sort((a, b) => b.last.localeCompare(a.last))
    const today = startOfDay(Date.now())
    const dayRows: DayCount[] = Array.from({ length: windowDays }, (_, i) => ({ day: dayOf(today - (windowDays - 1 - i) * 86_400_000), sent: 0, received: 0 }))
    const index = new Map(dayRows.map((d, i) => [d.day, i]))
    for (const m of msgs) { const i = index.get(dayOf(m.at)); if (i !== undefined) { if (m.fromMe) dayRows[i]!.sent++; else dayRows[i]!.received++ } }
    return { threads, days: dayRows }
  }
  const loadWindow = async (windowDays: number): Promise<{ threads: Thread[]; days: DayCount[] }> => {
    const since = startOfDay(Date.now()) - (windowDays - 1) * 86_400_000
    const msgs = await loadMessages(db, since)
    const chats = await loadChats(db, [...new Set(msgs.map(m => m.chatId))])
    return summarize(msgs, chats, windowDays)
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      try {
        if (cache.contacts < 0) { cache.contacts = await book.loadContacts(); log(`${cache.contacts} contact handles loaded`) }
        const { threads, days: dayRows } = await loadWindow(days)
        cache.threads = threads
        cache.days = dayRows
        cache.denied = false
        cache.error = ''
      } catch (error) {
        cache.denied = error instanceof AccessDenied
        cache.error = (error as Error).message
        warn(cache.error)
      }
      cache.at = Date.now()
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-messages.poll')

  const awaiting = (): Thread[] => cache.threads.filter(t => t.awaiting)
  const sentThisWeek = (): number => cache.days.reduce((n, d) => n + d.sent, 0)
  const receivedThisWeek = (): number => cache.days.reduce((n, d) => n + d.received, 0)
  const msAt = (iso: string): number => new Date(iso).getTime()

  // ---- what the agent sees: counts and names only, and only when shared ------
  const section = (): string => {
    if (!readSettings().shared || cache.denied || cache.at === 0) return ''
    const waiting = awaiting()
    const who = waiting.slice(0, 8).map(t => `${t.name} (${agoWords(msAt(t.last))})`).join(', ') + (waiting.length > 8 ? `, +${waiting.length - 8} more` : '')
    return [
      '# The user\'s messages (iMessage and SMS)',
      `Messages: ${cache.threads.length} conversation${cache.threads.length === 1 ? '' : 's'} active this week${days !== 7 ? ` (last ${days} days)` : ''}; awaiting your reply: ${waiting.length === 0 ? 'nobody' : who}.`,
      '',
      'Only these counts and names are shared with you. `messages_recent` and `messages_read` can show more, but they are private: use them only when the user asks about their messages, and never quote a message to anyone else.',
    ].join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-messages', order: 9565, text: section }), 'dsh-messages.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  const threadLine = (t: Thread): string => `- ${t.name}${t.participants.length > 1 ? ` (${t.participants.length} people)` : ''} · ${t.last.slice(0, 16).replace('T', ' ')}${t.awaiting ? ' · awaiting your reply' : ''} · ${t.count} msg${t.snippet ? `\n  ${t.lastSender}: ${t.snippet}` : ''}`
  const findThread = async (needle: string): Promise<{ id: number; name: string } | undefined> => {
    const q = needle.trim().toLowerCase()
    if (!q) return undefined
    const pick = (list: { id: number; name: string; participants: string[]; ident?: string }[]): { id: number; name: string } | undefined =>
      list.find(t => String(t.id) === q) ?? list.find(t => t.name.toLowerCase() === q) ?? list.find(t => t.name.toLowerCase().includes(q) || t.participants.some(p => p.toLowerCase().includes(q)) || (t.ident ?? '').toLowerCase().includes(q) || digitsOf(q).length >= 5 && (t.ident ?? '').replace(/\D/g, '').endsWith(digitsOf(q)))
    const cached = pick(cache.threads)
    if (cached) return cached
    const all = [...(await loadChats(db)).values()].map(c => ({ id: c.id, ...chatName(c, c.ident), ident: c.ident }))
    return pick(all)
  }

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'messages_recent',
    description: 'PRIVATE: the user\'s iMessage/SMS conversations. Lists recent threads with who they are with, when the last message was, whether the user still owes a reply, and an 80-character snippet. Only call this when the user asks about their messages or who is waiting on them.',
    parameters: { days: { type: 'number', description: `How many days back, default ${days}` }, chat: { type: 'string', description: 'Only threads whose name or participants contain this text' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { days: d, chat } = args as { days?: number; chat?: string }
      const windowDays = Math.min(365, Math.max(1, Math.floor(Number(d) || days)))
      let threads = cache.threads
      if (windowDays !== days || cache.at === 0) threads = (await loadWindow(windowDays)).threads
      else if (cache.denied || cache.error) { await refresh(); threads = cache.threads }
      if (cache.denied) throw new Error('Messages cannot be read: the app running dsh needs Full Disk Access (System Settings → Privacy & Security → Full Disk Access).')
      const q = (chat ?? '').trim().toLowerCase()
      if (q) threads = threads.filter(t => t.name.toLowerCase().includes(q) || t.participants.some(p => p.toLowerCase().includes(q)))
      if (threads.length === 0) return `No conversations in the last ${windowDays} days${q ? ` matching "${chat}"` : ''}.`
      const waiting = threads.filter(t => t.awaiting)
      return [`${threads.length} conversations in the last ${windowDays} days, ${waiting.length} awaiting your reply.`, ...threads.slice(0, 40).map(threadLine)].join('\n')
    },
  } as never)), 'dsh-messages.tool.recent')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'messages_read',
    description: 'PRIVATE: reads the recent messages of one iMessage/SMS thread (sender, time, text). This is the user\'s personal correspondence: only call it when the user explicitly asks about a conversation, and never repeat its content elsewhere.',
    parameters: { chat: { type: 'string', required: true, description: 'Thread name, participant name, phone/email, or id from messages_recent' }, limit: { type: 'number', description: 'How many messages, default 30, max 100' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { chat, limit } = args as { chat: string; limit?: number }
      if (!chat?.trim()) throw new Error('chat is required')
      if (cache.at === 0) await refresh()
      if (cache.denied) throw new Error('Messages cannot be read: the app running dsh needs Full Disk Access (System Settings → Privacy & Security → Full Disk Access).')
      const target = await findThread(chat)
      if (!target) throw new Error(`no conversation matches "${chat}"`)
      const n = Math.min(100, Math.max(1, Math.floor(Number(limit) || 30)))
      const msgs = await loadChatMessages(db, target.id, n)
      if (msgs.length === 0) return `No messages in the thread with ${target.name}.`
      return [`${target.name} — last ${msgs.length} messages:`, ...msgs.map(m => `- ${localIso(m.at).slice(0, 16).replace('T', ' ')} ${m.fromMe ? 'You' : displayName(m.handle)}: ${m.text || (m.attachments ? '[attachment]' : '[no text]')}`)].join('\n')
    },
  } as never)), 'dsh-messages.tool.read')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const setup: SourceView['setup'] = [{
      title: 'Allow Full Disk Access',
      steps: [
        'Messages keeps its history in ~/Library/Messages/chat.db, which macOS only lets apps with Full Disk Access read.',
        'System Settings → Privacy & Security → Full Disk Access → add the app you launched dsh from: your terminal, Cetus, or the dsh binary.',
        'Relaunch that app, then press Refresh.',
      ],
    }]
    const stamp = (): string => cache.at === 0 ? 'not loaded yet' : `refreshed ${agoWords(cache.at)} ago`
    const actions = (s: Settings): SourceView['actions'] => [
      { id: 'refresh', label: 'Refresh', kind: 'button' },
      { id: 'messagesShared', label: 'Visible to the character', kind: 'toggle', value: s.shared, hint: 'Off by default. On shares only counts and the names of people waiting for a reply, never message text' },
    ]
    const view = (): SourceView => {
      const s = readSettings()
      if (cache.denied) return { status: 'error', summary: 'Full Disk Access is required to read Messages', shared: s.shared, setup, actions: actions(s) }
      if (cache.error && cache.at !== 0) return { status: 'error', summary: cache.error, shared: s.shared, actions: actions(s) }
      const placeholder = cache.at === 0
      const waiting = awaiting()
      return {
        status: placeholder ? 'empty' : 'connected',
        summary: placeholder ? 'Loading…' : `${cache.threads.length} conversations · ${waiting.length} awaiting reply · ${stamp()}`,
        shared: s.shared, placeholder,
        data: {
          shared: s.shared, window: days,
          threads: cache.threads.slice(0, 50).map(t => ({ id: t.id, name: t.name, participants: t.participants, last: t.last, lastFromMe: t.lastFromMe, awaiting: t.awaiting, snippet: t.snippet, count: t.count })),
          days: cache.days,
        },
        stats: [
          { label: 'Active threads', value: String(cache.threads.length) },
          { label: 'Awaiting reply', value: String(waiting.length), tone: waiting.length > 0 ? 'down' : 'flat' },
          { label: 'Sent this week', value: String(sentThisWeek()) },
          { label: 'Received this week', value: String(receivedThisWeek()) },
        ],
        series: [{ label: 'Messages per day', points: cache.days.map(d => ({ day: d.day, value: d.sent + d.received })) }],
        lists: waiting.length === 0 ? [] : [{ title: 'Awaiting your reply', items: waiting.slice(0, 10).map(t => ({ primary: t.name, secondary: `${agoWords(msAt(t.last))} ago` })) }],
        actions: actions(s),
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); return { ok: true } }
      if (action === 'messagesShared') { writeSettings({ shared: Boolean(value) }); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'messages', label: 'Messages', category: 'mail', describe: view, act })
      const notify = (): void => registry.changed('messages')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-messages.sources')
  })
}
