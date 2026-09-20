/*
 * dsh-gmail: the user's Gmail, for any dsh session.
 *
 * IMAP with a Google app password (no Cloud project, no OAuth client), pasted
 * once in the Data panel or set in the plugin config; it stays in
 * `~/.dsh/gmail/credentials.json`. Every half hour the plugin counts unread
 * mail and pulls the headers of recent inbox mail and of travel-looking mail
 * (bookings, itineraries, e-tickets) from the last six months into Aibo's
 * shared store; the prompt carries a short digest. `gmail_search` takes
 * Gmail's own search syntax, `gmail_read` returns one message as text.
 * Nothing is ever written to the mailbox: bodies are fetched with PEEK, so
 * reading here does not mark mail as read.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { openStore } from '@dsh-external/aibo/store'
import { Imap, type Header } from './imap.js'

// ---- the slice of Aibo's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  data?: unknown
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; value?: boolean; confirm?: string; hint?: string; placeholder?: string }[]
}
interface AiboSources {
  register(source: { id: string; label: string; category: string; describe(): SourceView | Promise<SourceView>; act?(action: string, input: { json?: unknown }): Promise<unknown> | unknown }): () => void
  changed(id: string): void
}
interface ToolsLike { register(tool: unknown): () => void }
interface SystemPromptLike { section(section: { name: string; order: number; text: () => string }): () => void }
type Context = CordisContext & { tools: ToolsLike; systemPrompt: SystemPromptLike }

export const name = 'dsh-gmail'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Gmail address. Usually pasted in the Data panel instead. */
  user?: string
  /** A Google app password (myaccount.google.com/apppasswords). */
  password?: string
  refreshMinutes?: number
  /** IMAP host; imap.gmail.com unless this is a Google Workspace alias. */
  host?: string
}
export const Config: z<Config> = z.object({
  user: z.string().default(''),
  password: z.string().default(''),
  refreshMinutes: z.number().min(5).default(30),
  host: z.string().default('imap.gmail.com'),
})

// ---- storage ----------------------------------------------------------------

interface Credentials { user: string; password: string }
interface Settings { shared: boolean }
/** `gmail/index`: what the last sync brought back. */
interface Index { folder?: string; unseen?: number; inbox: Header[]; travel: Header[]; at?: string; error?: string; authFailed?: boolean }

const dataDir = (): string => process.env['DSH_GMAIL_DIR'] ?? join(homedir(), '.dsh', 'gmail')
const credPath = (): string => join(dataDir(), 'credentials.json')
const settingsDoc = () => openStore().doc<Settings>('gmail', 'settings')
const indexDoc = () => openStore().doc<Index>('gmail', 'index')
function readCredentials(): Credentials | undefined {
  try { const raw = JSON.parse(readFileSync(credPath(), 'utf8')) as Partial<Credentials>; return raw.user && raw.password ? { user: raw.user, password: raw.password } : undefined } catch { return undefined }
}
function writeCredentials(c: Credentials | undefined): void {
  if (!c) { rmSync(credPath(), { force: true }); return }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(credPath(), JSON.stringify(c), { mode: 0o600 })
}
const readShared = (): boolean => settingsDoc().get()?.shared ?? true
const readIndex = (): Index => { const i = indexDoc().get(); return { inbox: [], travel: [], ...i ?? {} } }
const writeIndex = (i: Index): void => indexDoc().set(i)

/** What a booking mail tends to look like, in Gmail's search syntax. Six months back, promotions left out. */
export const TRAVEL_QUERY = 'newer_than:180d -category:promotions (subject:(itinerary OR "e-ticket" OR eticket OR "boarding pass" OR "booking confirmation" OR "reservation confirmed" OR "your reservation" OR "your booking" OR "flight confirmation" OR "hotel confirmation" OR 行程单 OR 电子客票 OR 出票 OR 机票 OR 酒店预订 OR 预订确认 OR 订房 OR 航班) OR from:(booking.com OR airbnb.com OR trip.com OR ctrip.com OR agoda.com OR expedia.com OR hotels.com OR fliggy.com OR 12306.cn OR klook.com OR kkday.com OR marriott.com OR hilton.com OR ihg.com OR accor.com OR hyatt.com))'
const INBOX_QUERY = 'in:inbox newer_than:7d'
const TRAVEL_KEEP = 40
const INBOX_KEEP = 20

// ---- wording ----------------------------------------------------------------

const shortDate = (iso: string): string => new Date(iso).toLocaleDateString('en', { month: 'short', day: 'numeric' })
/** `"Trip.com" <noreply@trip.com>` → `Trip.com`; `a@b.com` → `a@b.com` */
const sender = (from: string): string => { const m = /^"?([^"<]+?)"?\s*<[^>]+>/.exec(from); return (m?.[1] ?? from).trim() }
const mailLine = (h: Header): string => `- ${shortDate(h.date)} · ${sender(h.from)} · ${h.subject || '(no subject)'}${h.unread ? ' · unread' : ''} (id ${h.uid})`

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (m: string): void => ctx.logger.info(`dsh-gmail: ${m}`)
  const warn = (m: string): void => ctx.logger.warn(`dsh-gmail: ${m}`)
  const refreshMs = (config.refreshMinutes ?? 30) * 60_000
  const host = config.host || 'imap.gmail.com'
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  const credentials = (): Credentials | undefined => readCredentials() ?? (config.user && config.password ? { user: config.user, password: config.password } : undefined)

  /** One logged-in session for one job; always logged out. */
  const withImap = async <T>(job: (imap: Imap, folder: string) => Promise<T>): Promise<T> => {
    const c = credentials()
    if (!c) throw new Error('Gmail is not connected yet: paste the address and an app password in Connectors → Gmail')
    const imap = await Imap.connect(host)
    try {
      await imap.login(c.user, c.password)
      const folder = await imap.allMailFolder()
      await imap.examine(folder)
      return await job(imap, folder)
    } finally { await imap.logout() }
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      const index = readIndex()
      if (!credentials()) return
      try {
        await withImap(async (imap, folder) => {
          const { unseen } = await imap.unseen('INBOX')
          const travelUids = (await imap.gmailSearch(TRAVEL_QUERY)).slice(-TRAVEL_KEEP)
          const inboxUids = (await imap.gmailSearch(INBOX_QUERY)).slice(-INBOX_KEEP)
          index.folder = folder; index.unseen = unseen
          index.travel = await imap.fetchHeaders(travelUids)
          index.inbox = await imap.fetchHeaders(inboxUids)
        })
        index.at = new Date().toISOString()
        delete index.error; delete index.authFailed
        log(`synced: ${index.unseen} unread, ${index.travel.length} travel mails`)
      } catch (error) {
        index.error = (error as Error).message
        index.authFailed = /login failed/i.test(index.error)
        warn(index.error)
      }
      writeIndex(index)
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-gmail.poll')

  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-gmail', order: 9595, text: () => {
    const c = credentials()
    if (!readShared() || !c) return ''
    const index = readIndex()
    if (!index.at) return ''
    const recentTravel = index.travel.filter(h => Date.now() - Date.parse(h.date) < 90 * 86_400_000).slice(0, 12)
    const parts = [
      `# Mail (Gmail, ${c.user})`,
      `Inbox: ${index.unseen ?? 0} unread.${index.error ? ` Last sync failed: ${index.error}.` : ''}`,
      recentTravel.length ? `Travel-related mail from the last three months, newest first:\n${recentTravel.map(mailLine).join('\n')}` : '',
      'Bring mail up only when it bears on what the user is doing. `gmail_search` takes Gmail search syntax (from:, subject:, newer_than:30d, has:attachment, in:inbox); `gmail_read` returns one message\'s text by id. When a booking mail gives a flight number and a date, keep it with `flight_track` if that tool exists; when it gives a destination and dates, `weather_trip`. A trip\'s bookings (flights, hotel, transfers, confirmation codes) belong on one list named after the trip, with `list_create` or `list_add`.',
    ].filter(Boolean)
    return parts.join('\n')
  } }), 'dsh-gmail.section')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'gmail_search',
    description: 'Search the user\'s Gmail with Gmail\'s own search syntax (e.g. "from:trip.com newer_than:30d", "subject:(itinerary OR e-ticket)", "has:attachment 济州"). Returns the newest matches with ids for gmail_read. Reading never marks mail as read.',
    parameters: {
      query: { type: 'string', required: true, description: 'Gmail search query' },
      limit: { type: 'number', description: 'Max results, 1–50 (default 20)' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { query?: unknown; limit?: unknown }
      const query = String(a.query ?? '').trim()
      if (!query) throw new Error('gmail_search: query is required')
      const limit = typeof a.limit === 'number' && Number.isFinite(a.limit) ? Math.min(50, Math.max(1, Math.round(a.limit))) : 20
      const hits = await withImap(async imap => imap.fetchHeaders((await imap.gmailSearch(query)).slice(-limit)))
      return hits.length ? hits.map(mailLine).join('\n') : `No mail matches "${query}".`
    },
  } as never)), 'dsh-gmail.tool.search')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'gmail_read',
    description: 'Read one Gmail message as plain text, by the id from gmail_search or the mail digest. Long messages are cut at the limit.',
    parameters: {
      id: { type: 'number', required: true, description: 'Message id' },
      maxChars: { type: 'number', description: 'Cut the text after this many characters (default 8000)' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { id?: unknown; maxChars?: unknown }
      const id = Number(a.id)
      if (!Number.isInteger(id) || id <= 0) throw new Error('gmail_read: id must be a message id from gmail_search')
      const max = typeof a.maxChars === 'number' && Number.isFinite(a.maxChars) ? Math.max(500, Math.round(a.maxChars)) : 8000
      const m = await withImap(imap => imap.fetchText(id))
      if (!m) return `No message with id ${id}.`
      const body = m.text.length > max ? `${m.text.slice(0, max)}\n…[cut at ${max} characters]` : m.text
      return `From: ${m.header.from}\nTo: ${m.header.to}\nDate: ${m.header.date}\nSubject: ${m.header.subject}\n\n${body}${m.truncated ? '\n…[message body truncated]' : ''}`
    },
  } as never)), 'dsh-gmail.tool.read')

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const describe = (): SourceView => {
      const c = credentials()
      const index = readIndex()
      const shared = readShared()
      const actions: SourceView['actions'] = [
        { id: 'credentials', label: c ? 'Replace the login' : 'Connect', kind: 'input', placeholder: 'you@gmail.com xxxx xxxx xxxx xxxx', hint: 'The address, a space, then the 16-character app password (spaces are fine)' },
        { id: 'refresh', label: 'Sync now', kind: 'button' },
        { id: 'shared', label: 'Visible to the character', kind: 'toggle', value: shared, hint: 'Off keeps mail out of the prompt; the tools still work when she is asked' },
        ...c ? [{ id: 'disconnect', label: 'Disconnect', kind: 'danger' as const, confirm: 'Remove the Gmail login and the cached mail index?' }] : [],
      ]
      const setup: SourceView['setup'] = [{ title: 'Connect Gmail', steps: [
        'Turn on 2-Step Verification for the Google account if it is not already (Google Workspace accounts also need the admin to allow app passwords).',
        'Open myaccount.google.com/apppasswords, create one named "dsh", and copy the 16-character password.',
        'Paste the address and that password above. They stay in ~/.dsh/gmail/credentials.json; IMAP over TLS, read-only (nothing is marked read or moved).',
      ] }]
      if (!c) return { status: 'empty', summary: 'Not connected', shared, placeholder: true, stats: ['Unread', 'Travel mail', 'Synced'].map(label => ({ label, value: '—' })), setup, actions }
      const ago = index.at ? Math.round((Date.now() - Date.parse(index.at)) / 60_000) : undefined
      const itemOf = (h: Header) => ({ primary: `${h.subject || '(no subject)'}${h.unread ? ' ·' : ''}`, secondary: `${sender(h.from)} · ${shortDate(h.date)}` })
      return {
        status: index.error && !index.at ? 'error' : index.at ? 'connected' : 'empty',
        summary: index.error ? `${c.user} · ${index.error}` : index.at ? `${c.user} · ${index.unseen ?? 0} unread · synced ${ago} min ago` : `${c.user} · syncing…`,
        shared, placeholder: !index.at,
        stats: [
          { label: 'Unread', value: String(index.unseen ?? '—'), delta: 'in the inbox' },
          { label: 'Travel mail', value: String(index.travel.length), delta: 'last 6 months' },
          { label: 'Synced', value: ago === undefined ? '—' : ago < 1 ? 'just now' : `${ago} min ago`, tone: index.error ? 'down' : 'flat' },
        ],
        lists: [
          { title: 'Travel mail', items: index.travel.slice(0, 25).map(itemOf) },
          { title: 'Inbox, last 7 days', items: index.inbox.slice(0, 15).map(itemOf) },
        ].filter(l => l.items.length),
        setup, actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); const i = readIndex(); if (i.error) throw new Error(i.error); return { ok: true } }
      if (action === 'credentials') {
        const parts = String(value ?? '').trim().split(/\s+/)
        const user = parts.shift() ?? ''
        const password = parts.join('')
        if (!/^[^@\s]+@[^@\s]+$/.test(user) || !password) throw new Error('enter the address, then the app password')
        writeCredentials({ user, password })
        writeIndex({ inbox: [], travel: [] })
        await refresh()
        const i = readIndex()
        if (i.error) { if (i.authFailed) writeCredentials(undefined); changed(); throw new Error(i.error) }
        return { ok: true, message: `Connected ${user}.` }
      }
      if (action === 'disconnect') { writeCredentials(undefined); writeIndex({ inbox: [], travel: [] }); changed(); return { ok: true, message: 'Gmail disconnected.' } }
      if (action === 'shared') { settingsDoc().set({ shared: Boolean(value) }); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: 'gmail', label: 'Gmail', category: 'mail', describe, act })
      const notify = (): void => registry.changed('gmail')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-gmail.source')
  })
}
