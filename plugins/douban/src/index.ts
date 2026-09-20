/*
 * dsh-douban: the user's Douban shelves (想看 / 看过 for films, books and
 * music), for any dsh session.
 *
 * Douban has no personal API, so this reads the public profile pages
 * (movie|book|music.douban.com/people/<uid>/wish|collect) with Node fetch and
 * parses the HTML. Private profiles work with the user's browser cookie. The
 * agent gets a short prompt section (counts, the latest wishes and ratings)
 * and lookup tools so it never recommends what the user already watched.
 * Nothing is written to Douban. With Aibo loaded, the shelves show up in
 * its Data panel.
 *
 * Data lives in the shared Aibo store (`~/.dsh/aibo/store.sqlite`): the
 * settings doc (uid, shared), the state doc (counts, last sync, error,
 * back-off) and one doc per shelf item. Only the secrets — the cookie and the
 * `bid` — stay in `~/.dsh/douban/secrets.json`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { migrateFile, openStore } from '@dsh-external/aibo/store'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'

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

export const name = 'dsh-douban'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Douban user id: the last part of https://www.douban.com/people/<uid>/. Can also be set from the Data panel. */
  uid?: string
  /** Browser cookie for a private profile (optional). */
  cookie?: string
  /** Hours between syncs. */
  refreshHours?: number
}
export const Config: z<Config> = z.object({
  uid: z.string().default(''),
  cookie: z.string().default(''),
  refreshHours: z.number().min(1).default(12),
})

// ---- data -------------------------------------------------------------------

export type Kind = 'movie' | 'book' | 'music'
export type Status = 'wish' | 'done'
export interface Item { id: string; kind: Kind; status: Status; title: string; url: string; cover: string; date: string; rating?: number; comment?: string }
export type Counts = Record<Kind, Record<Status, number>>
interface State { items: Item[]; counts: Counts; syncedAt?: string; error?: string; blockedUntil?: string }
/** What the store keeps of the state; the items are their own documents. */
type StateDoc = Omit<State, 'items'>
interface Settings { uid: string; shared: boolean }
/** Never in the store: the user's cookie and the `bid` cookie value sent with every request. */
interface Secrets { cookie: string; bid: string }

const KINDS: Kind[] = ['movie', 'book', 'music']
const byDate = (a: Item, b: Item): number => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0)
const STATUSES: Status[] = ['wish', 'done']
const emptyCounts = (): Counts => ({ movie: { wish: 0, done: 0 }, book: { wish: 0, done: 0 }, music: { wish: 0, done: 0 } })

/** Where the secrets file lives (and where the pre-store `settings.json` / `state.json` are imported from, once). */
const dataDir = (): string => process.env['DSH_DOUBAN_DIR'] ?? join(homedir(), '.dsh', 'douban')
const secretsPath = (): string => join(dataDir(), 'secrets.json')
const DEFAULT_SETTINGS: Settings = { uid: '', shared: true }
const settingsDoc = () => openStore().doc<Settings>('douban', 'settings')
const stateDoc = () => openStore().doc<StateDoc>('douban', 'state')
const ITEMS = 'douban.items'

function readState(): State {
  const store = openStore()
  const head = stateDoc().get() ?? {}
  const items = store.docs<Item>(ITEMS).map(d => d.value).sort(byDate)
  return { counts: emptyCounts(), ...head, items }
}
/** Replaces the state doc and every item doc in one transaction (a sync is always a full re-read of the shelves). */
function writeState(state: State): void {
  const store = openStore()
  const { items, ...head } = state
  store.transaction(() => {
    stateDoc().set(head)
    for (const d of store.docs<Item>(ITEMS)) store.doc<Item>(ITEMS, d.id).delete()
    for (const item of items) store.doc<Item>(ITEMS, item.id).set(item)
  })
}
function readSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...(settingsDoc().get() ?? {}) }
}
function writeSettings(patch: Partial<Settings>): Settings {
  return settingsDoc().patch(patch, DEFAULT_SETTINGS)
}
/** Douban wants a `bid` cookie on some hosts (books 403 without one); a random one, kept stable, is enough. */
const randomBid = (): string => Array.from({ length: 11 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('')
function readSecrets(): Secrets {
  const base: Secrets = { cookie: '', bid: '' }
  try { Object.assign(base, JSON.parse(readFileSync(secretsPath(), 'utf8')) as Partial<Secrets>) } catch { /* first run */ }
  if (!base.bid) { base.bid = randomBid(); try { mkdirSync(dataDir(), { recursive: true }); writeFileSync(secretsPath(), JSON.stringify(base)) } catch { /* read-only is fine */ } }
  return base
}
function writeSecrets(patch: Partial<Secrets>): Secrets {
  const next = { ...readSecrets(), ...patch }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(secretsPath(), JSON.stringify(next))
  return next
}
/**
 * One-time import of the pre-store files: `settings.json` splits into the
 * secrets file (cookie, bid) and the settings doc (uid, shared); `state.json`
 * becomes the state doc plus one doc per item. Each file is renamed
 * `.migrated` afterwards. Returns the names of the files imported.
 */
function importLegacyFiles(): string[] {
  const imported: string[] = []
  if (migrateFile(join(dataDir(), 'settings.json'), text => {
    const old = JSON.parse(text) as Partial<Settings & Secrets>
    const secrets: Partial<Secrets> = {}
    if (typeof old.cookie === 'string') secrets.cookie = old.cookie
    if (typeof old.bid === 'string' && old.bid) secrets.bid = old.bid
    if (Object.keys(secrets).length > 0) writeSecrets(secrets)
    const settings: Partial<Settings> = {}
    if (typeof old.uid === 'string') settings.uid = old.uid
    if (typeof old.shared === 'boolean') settings.shared = old.shared
    if (Object.keys(settings).length > 0) writeSettings(settings)
  })) imported.push('settings.json')
  if (migrateFile(join(dataDir(), 'state.json'), text => {
    const old = JSON.parse(text) as Partial<State>
    writeState({ items: Array.isArray(old.items) ? old.items : [], counts: { ...emptyCounts(), ...old.counts }, syncedAt: old.syncedAt, error: old.error, blockedUntil: old.blockedUntil })
  })) imported.push('state.json')
  return imported
}

// ---- the HTML parser --------------------------------------------------------

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
export const decode = (s: string): string => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
  if (e[0] === '#') { const code = e[1]?.toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); return Number.isFinite(code) ? String.fromCodePoint(code) : m }
  return ENTITIES[e.toLowerCase()] ?? m
})
const clean = (s: string): string => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

export class BlockedError extends Error { constructor(message: string) { super(message); this.name = 'BlockedError' } }

/**
 * One shelf page → items + the shelf's total. Films and music use the grid
 * (`div.item` → `div.pic img`, `li.title a em`, `span.date`, `span.ratingN-t`,
 * `span.comment`); books use `li.subject-item` → `h2 a[title]`, `span.date`
 * ("2016-07-22 读过"), `p.comment`. Both are handled by the same chunking.
 */
export function parsePage(html: string, kind: Kind, status: Status): { items: Item[]; total: number } {
  if (/检测到有异常请求|sec\.douban\.com\/link|<title>\s*403 Forbidden/.test(html)) throw new BlockedError('Douban flagged the request as abnormal')
  const items: Item[] = []
  const chunks = html.split(/<div class="item(?:[\s"])|<li class="subject-item"/).slice(1)
  for (const chunk of chunks) {
    const id = chunk.match(/\/subject\/(\d+)\//)?.[1]
    if (!id) continue
    const title = chunk.match(/<em>([\s\S]*?)<\/em>/)?.[1] ?? chunk.match(/\stitle="([^"]*)"/)?.[1] ?? chunk.match(/<h2>\s*<a[^>]*>([\s\S]*?)<\/a>/)?.[1] ?? ''
    const cover = chunk.match(/<img[^>]*\ssrc="([^"]+)"/)?.[1] ?? ''
    const date = chunk.match(/<span class="date">\s*(\d{4}-\d{2}-\d{2})/)?.[1] ?? ''
    const rating = chunk.match(/rating(\d)-t/)?.[1]
    const comment = chunk.match(/<span class="comment">([\s\S]*?)<\/span>/)?.[1] ?? chunk.match(/<p class="comment[^"]*"[^>]*>([\s\S]*?)<\/p>/)?.[1]
    const item: Item = { id, kind, status, title: clean(title), url: `https://${kind}.douban.com/subject/${id}/`, cover: decode(cover), date }
    if (rating) item.rating = Number(rating)
    if (comment && clean(comment)) item.comment = clean(comment).slice(0, 300)
    items.push(item)
  }
  const total = Number(html.match(/class="subject-num">\s*\d+\s*-\s*\d+(?:&nbsp;|\s)*\/(?:&nbsp;|\s)*(\d+)/)?.[1] ?? items.length)
  return { items, total }
}

const PAGE = 15
const MAX_PAGES = 40
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
export const shelfUrl = (kind: Kind, uid: string, status: Status, start: number): string =>
  `https://${kind}.douban.com/people/${encodeURIComponent(uid)}/${status === 'wish' ? 'wish' : 'collect'}?start=${start}&sort=time&rating=all&filter=all&mode=grid`

async function fetchPage(url: string, cookie: string): Promise<string> {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8', 'Cookie': cookie }, redirect: 'follow', signal: AbortSignal.timeout(20_000) })
  if (res.status === 403 || res.status === 429) throw new BlockedError(`Douban refused the request (${res.status})`)
  if (res.status === 404) throw new Error('no such Douban user (check the uid)')
  if (res.url.includes('sec.douban.com') || res.url.includes('accounts.douban.com')) throw new BlockedError('Douban asked for a login or a captcha')
  if (!res.ok) throw new Error(`Douban answered ${res.status}`)
  return await res.text()
}

// ---- the plugin -------------------------------------------------------------

const KIND_WORD: Record<Kind, string> = { movie: 'film', book: 'book', music: 'album' }
const stars = (n?: number): string => n ? '★'.repeat(n) + '☆'.repeat(5 - n) : ''
const agoWords = (iso?: string): string => {
  if (!iso) return 'never synced'
  const min = Math.round((Date.now() - Date.parse(iso)) / 60000)
  return `synced ${min < 60 ? `${min} min` : min < 60 * 36 ? `${Math.round(min / 60)} h` : `${Math.round(min / 1440)} d`} ago`
}

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-douban: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-douban: ${message}`)
  const refreshMs = (config.refreshHours ?? 12) * 3_600_000
  const imported = importLegacyFiles()
  if (imported.length > 0) log(`imported ${imported.join(', ')} into the Aibo store`)
  const uidOf = (): string => (readSettings().uid || config.uid || '').trim()
  const cookieOf = (): string => {
    const s = readSecrets()
    const user = (s.cookie || config.cookie || '').trim().replace(/;?\s*$/, '')
    return /(^|;\s*)bid=/.test(user) ? user : [`bid=${s.bid}`, user].filter(Boolean).join('; ')
  }

  // In-memory copy of the stored state; prompt sections and tools read this.
  const cache: State = readState()
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  const save = (): void => { writeState(cache); changed() }

  let syncing: Promise<void> | undefined
  /** Walks every shelf. On a block: keeps what was loaded, backs off for 30 min, reports. */
  const sync = (force = false): Promise<void> => {
    syncing ??= (async () => {
      const uid = uidOf()
      if (!uid) { cache.error = undefined; return }
      if (!force && cache.blockedUntil && Date.parse(cache.blockedUntil) > Date.now()) return
      const cookie = cookieOf()
      const items: Item[] = [], counts = emptyCounts()
      const done: string[] = []
      try {
        for (const kind of KINDS) for (const status of STATUSES) {
          let total = 0
          for (let page = 0; page < MAX_PAGES; page++) {
            if (page > 0 || done.length > 0) await sleep(500)
            const parsed = parsePage(await fetchPage(shelfUrl(kind, uid, status, page * PAGE), cookie), kind, status)
            items.push(...parsed.items)
            total = Math.max(parsed.total, items.filter(i => i.kind === kind && i.status === status).length)
            // Pages can be short of 15 when a subject was removed, so only the total (or an empty page) ends the walk.
            if (parsed.items.length === 0 || (page + 1) * PAGE >= total) break
          }
          counts[kind][status] = total
          done.push(`${kind}/${status}`)
        }
        cache.items = items.sort(byDate)
        cache.counts = counts
        cache.syncedAt = new Date().toISOString()
        cache.error = undefined
        cache.blockedUntil = undefined
        log(`synced ${items.length} items for ${uid}`)
      } catch (error) {
        const blocked = error instanceof BlockedError
        cache.error = blocked ? `${(error as Error).message}. Douban rate-limits scrapers; it usually lifts within half an hour. A browser cookie (Set cookie) helps.` : (error as Error).message
        if (blocked) cache.blockedUntil = new Date(Date.now() + 30 * 60_000).toISOString()
        // Keep partial results when they are all we have.
        if (items.length > 0 && cache.items.length === 0) { cache.items = items.sort(byDate); cache.counts = counts }
        warn(`${cache.error} (after ${done.join(', ') || 'nothing'})`)
      }
      save()
    })().finally(() => { syncing = undefined })
    return syncing
  }
  ctx.effect(() => {
    const stale = !cache.syncedAt || Date.now() - Date.parse(cache.syncedAt) > refreshMs
    if (stale) void sync()
    const timer = setInterval(() => { void sync() }, Math.min(refreshMs, 6 * 3_600_000))
    return () => clearInterval(timer)
  }, 'dsh-douban.poll')

  // ---- views over the cache --------------------------------------------------
  const pick = (kind?: Kind, status?: Status): Item[] => cache.items.filter(i => (!kind || i.kind === kind) && (!status || i.status === status))
  const line = (i: Item, withKind = true): string => `${i.title}${withKind ? ` (${KIND_WORD[i.kind]})` : ''}${i.rating ? ` ${stars(i.rating)}` : ''}${i.date ? ` · ${i.date}` : ''}${i.comment ? ` · "${i.comment.slice(0, 80)}"` : ''}`
  const avgRating = (): number | undefined => { const r = cache.items.filter(i => i.rating); return r.length ? r.reduce((a, i) => a + (i.rating ?? 0), 0) / r.length : undefined }

  // ---- what the agent sees ---------------------------------------------------
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-douban', order: 9585, text: () => {
    if (!readSettings().shared || !uidOf() || cache.items.length === 0) return ''
    const c = cache.counts
    const wish = pick(undefined, 'wish').slice(0, 5), done = pick(undefined, 'done').slice(0, 3)
    const lines = [
      `# The user's Douban (${agoWords(cache.syncedAt)})`,
      `Films: ${c.movie.done} watched, ${c.movie.wish} to watch. Books: ${c.book.done} read, ${c.book.wish} to read. Music: ${c.music.done} listened, ${c.music.wish} to listen.`,
    ]
    if (wish.length > 0) lines.push(`Latest wishes: ${wish.map(i => line(i)).join('; ')}.`)
    if (done.length > 0) lines.push(`Latest finished: ${done.map(i => line(i)).join('; ')}.`)
    lines.push('', 'When recommending films, books or music, check `douban_lookup` first so you do not suggest what they already watched or read, and prefer things on their wish list. When the user says they watched or read something, mention they can mark it on Douban (this plugin cannot write there).')
    return lines.join('\n')
  } }), 'dsh-douban.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  const kindArg = (v: unknown): Kind | undefined => KINDS.includes(v as Kind) ? v as Kind : undefined
  const statusArg = (v: unknown): Status | undefined => v === 'wish' || v === 'done' ? v : undefined
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'douban_lookup',
    description: 'Search the user\'s Douban shelves (films, books, music; both 想看/wish and 看过/done) by title. Returns status, rating and date for each match. Use before recommending anything.',
    parameters: { query: { type: 'string', required: true, description: 'Title or part of it, any language' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const q = String((args as { query?: string }).query ?? '').trim().toLowerCase()
      if (!q) throw new Error('query is required')
      if (!uidOf()) return 'Douban is not set up (no uid).'
      const words = q.split(/\s+/)
      const hits = cache.items.filter(i => { const t = i.title.toLowerCase(); return words.every(w => t.includes(w)) })
      if (hits.length === 0) return `Nothing matching "${q}" on the user's Douban shelves${cache.error ? ` (last sync failed: ${cache.error})` : ''}.`
      return hits.slice(0, 20).map(i => `- ${i.title} (${KIND_WORD[i.kind]}) · ${i.status === 'wish' ? 'wants to' : 'already'} ${i.kind === 'movie' ? 'watch' : i.kind === 'book' ? 'read' : 'listen'}${i.status === 'done' ? 'ed' : ''}${i.rating ? ` · rated ${i.rating}/5` : ''}${i.date ? ` · ${i.date}` : ''}${i.comment ? ` · "${i.comment}"` : ''}`).join('\n')
    },
  } as never)), 'dsh-douban.tool.lookup')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'douban_list',
    description: 'List the user\'s Douban shelf, newest first. kind: movie | book | music (default all); status: wish (想看) | done (看过) (default all); limit default 20.',
    parameters: { kind: { type: 'string', description: 'movie | book | music' }, status: { type: 'string', description: 'wish | done' }, limit: { type: 'number', description: 'Max rows, default 20, max 100' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const a = args as { kind?: unknown; status?: unknown; limit?: unknown }
      if (!uidOf()) return 'Douban is not set up (no uid).'
      const limit = Math.min(100, Math.max(1, Number(a.limit) || 20))
      const rows = pick(kindArg(a.kind), statusArg(a.status))
      if (rows.length === 0) return `No items${cache.error ? ` (last sync failed: ${cache.error})` : ''}.`
      return `${rows.length} items, showing ${Math.min(limit, rows.length)}:\n${rows.slice(0, limit).map(i => `- [${i.status}] ${line(i)}`).join('\n')}`
    },
  } as never)), 'dsh-douban.tool.list')

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const describe = (): SourceView => {
      const s = readSettings(), uid = uidOf()
      const actions: SourceView['actions'] = [
        { id: 'uid', label: uid ? 'Change user id' : 'Set user id', kind: 'input', placeholder: uid || 'e.g. ahbei', hint: 'The <uid> in https://www.douban.com/people/<uid>/' },
        { id: 'cookie', label: readSecrets().cookie || config.cookie ? 'Replace cookie' : 'Set cookie', kind: 'input', placeholder: 'bid=…; dbcl2=…; ck=…', hint: 'Optional. Your douban.com Cookie header, for a private profile or when Douban blocks anonymous reads' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'doubanShared', label: 'Visible to the character', kind: 'toggle', value: s.shared, hint: 'Off hides your shelves from the prompt' },
      ]
      const setup: SourceView['setup'] = [{
        title: 'Connect your Douban',
        steps: [
          'Open douban.com, click your avatar → 我的豆瓣. The address bar shows https://www.douban.com/people/<uid>/ — that <uid> is your user id. Enter it with "Set user id".',
          'Without a cookie this reads your public profile, so 设置 → 隐私设置 must allow others to see your 想看 / 看过 (电影、读书、音乐). Otherwise paste your browser Cookie header with "Set cookie".',
          'Nothing is written to Douban; the shelves are re-read every ' + String(config.refreshHours ?? 12) + ' h and on Refresh.',
        ],
      }]
      const c = cache.counts
      const statLabels = ['Films to watch', 'Films watched', 'Books to read', 'Books read', 'Albums', 'Average rating']
      if (!uid) return { status: 'empty', summary: 'No Douban user id yet', shared: s.shared, placeholder: true, stats: statLabels.map(label => ({ label, value: '—' })), setup, actions }
      const avg = avgRating()
      const stats: SourceView['stats'] = [
        { label: 'Films to watch', value: String(c.movie.wish) },
        { label: 'Films watched', value: String(c.movie.done) },
        { label: 'Books to read', value: String(c.book.wish) },
        { label: 'Books read', value: String(c.book.done) },
        { label: 'Albums', value: String(c.music.done), delta: c.music.wish ? `${c.music.wish} to listen` : undefined },
        { label: 'Average rating', value: avg ? `${avg.toFixed(1)} / 5` : '—', delta: avg ? `${cache.items.filter(i => i.rating).length} rated` : undefined },
      ]
      const data = { uid, items: cache.items.slice(0, 400), counts: c, syncedAt: cache.syncedAt }
      const lists: SourceView['lists'] = [
        { title: 'Recent wish', items: pick(undefined, 'wish').slice(0, 8).map(i => ({ primary: i.title, secondary: `${KIND_WORD[i.kind]} · ${i.date}` })) },
        { title: 'Recent done', items: pick(undefined, 'done').slice(0, 8).map(i => ({ primary: i.title, secondary: `${i.rating ? `${stars(i.rating)} · ` : ''}${KIND_WORD[i.kind]} · ${i.date}` })) },
      ]
      if (cache.error && cache.items.length === 0) return { status: 'error', summary: cache.error, shared: s.shared, placeholder: true, stats, setup, actions }
      if (cache.items.length === 0) return { status: syncing ? 'empty' : 'error', summary: syncing ? `Reading ${uid}'s shelves…` : `No items found for ${uid}. Is the profile public?`, shared: s.shared, placeholder: true, stats, setup, actions }
      return { status: 'connected', summary: `${uid} · ${cache.items.length} items · ${agoWords(cache.syncedAt)}${cache.error ? ` · last sync failed: ${cache.error}` : ''}`, shared: s.shared, data, stats, lists, setup, actions }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await sync(true); if (cache.error) throw new Error(cache.error); return { ok: true } }
      if (action === 'doubanShared') { writeSettings({ shared: Boolean(value) }); changed(); return { ok: true } }
      if (action === 'uid') {
        const uid = String(value ?? '').trim().replace(/^https?:\/\/[^/]+\/people\//, '').replace(/\/.*$/, '')
        if (!uid) throw new Error('enter your Douban user id')
        writeSettings({ uid }); cache.items = []; cache.counts = emptyCounts(); cache.error = undefined; cache.blockedUntil = undefined; cache.syncedAt = undefined; save()
        await sync(true)
        if (cache.error) throw new Error(cache.error)
        return { ok: true, message: `Loaded ${cache.items.length} items for ${uid}.` }
      }
      if (action === 'cookie') {
        writeSecrets({ cookie: String(value ?? '').trim() }); cache.blockedUntil = undefined; save()
        await sync(true)
        if (cache.error) throw new Error(cache.error)
        return { ok: true, message: 'Cookie saved.' }
      }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: 'douban', label: 'Douban', category: 'media', describe, act })
      const notify = (): void => registry.changed('douban')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-douban.source')
  })
}
