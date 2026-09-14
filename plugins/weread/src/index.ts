/*
 * dsh-weread: the user's WeRead (微信读书) shelf, highlights and notes, for any
 * dsh session.
 *
 * WeRead has no public API; like weread2notion and weread-exporter this uses
 * the web endpoints with the cookie of a logged-in browser session, pasted once
 * in the Data panel (or set in the plugin config). The shelf is refreshed every
 * few hours; highlights are fetched per book on demand or by "Sync highlights",
 * and cached in dsh-gal's shared store (`~/.dsh/gal/store.sqlite`); only the
 * cookie stays in `~/.dsh/weread/cookie.json`. Nothing is ever written to WeRead.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'

// ---- the slice of dsh-gal's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  data?: unknown
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
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

export const name = 'dsh-weread'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Cookie header of a logged-in weread.qq.com session. Usually pasted in the Data panel instead. */
  cookie?: string
  /** How often the shelf is refreshed, in hours. */
  refreshHours?: number
}
export const Config: z<Config> = z.object({
  cookie: z.string().default(''),
  refreshHours: z.number().min(1).default(6),
})

// ---- storage ----------------------------------------------------------------

export interface Book {
  id: string; title: string; author: string; cover: string; category: string
  finished: boolean; progress?: number; updatedAt: string; noteCount: number
}
export interface Mark { text: string; at: string }
export interface Chapter { title: string; marks: Mark[]; notes: Mark[] }
export interface BookHighlights { chapters: Chapter[]; at: string; total: number }
/** Everything the plugin knows, assembled from the store plus the cookie file. */
interface State {
  cookie?: string
  shared: boolean
  books: Book[]
  shelfAt?: string
  highlights: Record<string, BookHighlights>
  error?: string
  /** True when the last request came back with WeRead's login-timeout code. */
  expired?: boolean
}
/** `store.doc('weread', 'settings')`: the user's choices. */
interface Settings { shared: boolean }
/** `store.doc('weread', 'shelf')`: what the last refresh brought back. */
interface Shelf { books: Book[]; shelfAt?: string; error?: string; expired?: boolean }

/*
 * Where things live: the cookie (a secret) in `~/.dsh/weread/cookie.json`
 * (`DSH_WEREAD_DIR` overrides the directory); the settings and the shelf as two
 * documents in dsh-gal's store; highlights as one document per book under
 * `weread.highlights`. An older `state.json` holding all of it is imported once.
 */
const dataDir = (): string => process.env['DSH_WEREAD_DIR'] ?? join(homedir(), '.dsh', 'weread')
const cookiePath = (): string => join(dataDir(), 'cookie.json')
const legacyStatePath = (): string => join(dataDir(), 'state.json')
const HIGHLIGHTS = 'weread.highlights'
const settingsDoc = () => openStore().doc<Settings>('weread', 'settings')
const shelfDoc = () => openStore().doc<Shelf>('weread', 'shelf')

function readCookie(): string {
  try { const raw = JSON.parse(readFileSync(cookiePath(), 'utf8')) as { cookie?: unknown }; return typeof raw.cookie === 'string' ? raw.cookie.trim() : '' } catch { return '' }
}
function writeCookie(cookie: string | undefined): void {
  if (!cookie) { rmSync(cookiePath(), { force: true }); return }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(cookiePath(), JSON.stringify({ cookie }), { mode: 0o600 })
}
function readState(): State {
  const settings = settingsDoc().get(), shelf = shelfDoc().get()
  const highlights: Record<string, BookHighlights> = {}
  for (const d of openStore().docs<BookHighlights>(HIGHLIGHTS)) if (d.value && Array.isArray(d.value.chapters)) highlights[d.id] = d.value
  return {
    cookie: readCookie() || undefined, shared: settings?.shared ?? true,
    books: Array.isArray(shelf?.books) ? shelf.books : [], shelfAt: shelf?.shelfAt, error: shelf?.error, expired: shelf?.expired, highlights,
  }
}
/** Saves the settings and the shelf; the cookie and highlights have their own writers. */
function writeState(state: State): void {
  openStore().transaction(() => {
    settingsDoc().set({ shared: state.shared })
    shelfDoc().set({ books: state.books, shelfAt: state.shelfAt, error: state.error, expired: state.expired })
  })
}
const putHighlights = (bookId: string, h: BookHighlights): void => openStore().doc<BookHighlights>(HIGHLIGHTS, bookId).set(h)
function clearHighlights(): void {
  const store = openStore()
  store.transaction(() => { for (const d of store.docs(HIGHLIGHTS)) store.doc(HIGHLIGHTS, d.id).delete() })
}
/** One-time import of the pre-store `state.json`: the cookie moves to `cookie.json`, the rest into the store. */
export function importLegacyState(): boolean {
  return migrateFile(legacyStatePath(), text => {
    const raw = JSON.parse(text) as Partial<State>
    const store = openStore()
    store.transaction(() => {
      settingsDoc().set({ shared: raw.shared !== false })
      shelfDoc().set({ books: Array.isArray(raw.books) ? raw.books : [], shelfAt: raw.shelfAt, error: raw.error, expired: raw.expired })
      const highlights = raw.highlights && typeof raw.highlights === 'object' ? raw.highlights : {}
      for (const [id, h] of Object.entries(highlights)) if (h && typeof h === 'object' && Array.isArray(h.chapters)) putHighlights(id, h)
    })
    const cookie = typeof raw.cookie === 'string' ? raw.cookie.trim() : ''
    if (cookie && !existsSync(cookiePath())) writeCookie(cookie)
  })
}

// ---- WeRead web endpoints ---------------------------------------------------

const API = 'https://i.weread.qq.com'
const WEB = 'https://weread.qq.com'
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
const MAX_MARKS = 200
const MAX_SYNC_BOOKS = 20
const DELAY_MS = 300

export class WereadError extends Error {
  constructor(message: string, public code: number | string, public expired = false) { super(message) }
}
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
const str = (v: unknown): string => typeof v === 'string' ? v : typeof v === 'number' ? String(v) : ''
const num = (v: unknown): number | undefined => typeof v === 'number' && Number.isFinite(v) ? v : typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v)) ? Number(v) : undefined
const obj = (v: unknown): Record<string, unknown> => v && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : {}
const arr = (v: unknown): unknown[] => Array.isArray(v) ? v : []
/** WeRead timestamps are unix seconds. */
const iso = (v: unknown): string => { const n = num(v); return n && n > 0 ? new Date((n < 1e12 ? n * 1000 : n)).toISOString() : '' }

/** Throws WereadError on HTTP or `errcode` failures; -2012 (login timeout) is flagged as an expired cookie. */
export function checkPayload(payload: unknown, what: string): Record<string, unknown> {
  const data = obj(payload)
  const code = num(data['errcode']) ?? num(data['errCode'])
  if (code !== undefined && code !== 0) {
    const msg = str(data['errmsg']) || str(data['errMsg']) || `errcode ${code}`
    const expired = code === -2012 || code === -2010 || code === -2013
    throw new WereadError(expired ? 'WeRead login expired, paste a fresh cookie' : `${what}: ${msg}`, code, expired)
  }
  return data
}

export interface Fetcher { (url: string): Promise<unknown> }
export function makeFetcher(cookie: string): Fetcher {
  return async (url: string): Promise<unknown> => {
    const res = await fetch(url, { headers: { Cookie: cookie, 'User-Agent': UA, Referer: `${WEB}/`, Accept: 'application/json, text/plain, */*' }, signal: AbortSignal.timeout(20_000) })
    if (res.status === 401 || res.status === 403) throw new WereadError('WeRead rejected the cookie, paste a fresh one', res.status, true)
    if (!res.ok) throw new WereadError(`WeRead ${res.status} on ${new URL(url).pathname}`, res.status)
    const text = await res.text()
    try { return JSON.parse(text) } catch { throw new WereadError(`WeRead returned a non-JSON page for ${new URL(url).pathname} (cookie expired?)`, 'parse', true) }
  }
}

/** The shelf plus the notebooks (which carry note counts), merged into Book rows, most recently touched first. */
export async function fetchShelf(get: Fetcher): Promise<Book[]> {
  let shelf: Record<string, unknown>
  try {
    shelf = checkPayload(await get(`${API}/shelf/sync?synckey=0&teenmode=0&album=1&onlyBookid=0`), 'shelf')
  } catch (error) {
    if (!(error instanceof WereadError && error.expired)) throw error
    shelf = checkPayload(await get(`${WEB}/web/shelf/sync?synckey=0&teenmode=0&album=1&onlyBookid=0`), 'shelf')
  }
  const books = new Map<string, Book>()
  const add = (raw: unknown): void => {
    const b = obj(raw)
    const info = { ...obj(b['book']), ...b }
    const id = str(info['bookId'])
    if (!id || books.has(id)) return
    const finishRaw = info['finishReading']
    books.set(id, {
      id, title: str(info['title']), author: str(info['author']), cover: str(info['cover']), category: str(info['category']),
      finished: finishRaw === 1 || finishRaw === true,
      progress: num(info['progress']) ?? num(info['readingProgress']) ?? num(obj(info['readInfo'])['progress']),
      updatedAt: iso(info['readUpdateTime']) || iso(info['updateTime']) || '', noteCount: 0,
    })
  }
  for (const raw of arr(shelf['books'])) add(raw)
  for (const group of arr(shelf['archive'])) for (const raw of arr(obj(group)['books'])) add(raw)
  await sleep(DELAY_MS)
  const notebooks = checkPayload(await get(`${API}/user/notebooks`), 'notebooks')
  for (const raw of arr(notebooks['books'])) {
    const n = obj(raw), info = obj(n['book'])
    const id = str(n['bookId']) || str(info['bookId'])
    if (!id) continue
    const count = (num(n['noteCount']) ?? 0) + (num(n['reviewCount']) ?? 0)
    const existing = books.get(id)
    if (existing) { existing.noteCount = count; if (!existing.updatedAt) existing.updatedAt = iso(n['sort']) }
    else books.set(id, { id, title: str(info['title']), author: str(info['author']), cover: str(info['cover']), category: str(info['category']), finished: false, updatedAt: iso(n['sort']), noteCount: count })
  }
  return [...books.values()].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
}

/** Reading progress for one book, as a percentage, or undefined when WeRead does not say. */
export async function fetchProgress(get: Fetcher, bookId: string): Promise<{ progress?: number; finished?: boolean; finishedAt?: string }> {
  const info = checkPayload(await get(`${API}/book/readinfo?bookId=${encodeURIComponent(bookId)}&readingDetail=1&readingBookIndex=1&finishedDate=1`), 'readinfo')
  const detail = obj(info['readDetail'])
  const progress = num(info['progress']) ?? num(info['readingProgress']) ?? num(detail['progress'])
  const finishedAt = iso(info['finishedDate'])
  const finished = finishedAt !== '' || num(info['markedStatus']) === 4 || (progress !== undefined && progress >= 100)
  return { progress: progress === undefined ? undefined : Math.max(0, Math.min(100, Math.round(progress))), finished, finishedAt }
}

/** Highlights and the user's own notes, grouped by chapter in reading order. */
export async function fetchHighlights(get: Fetcher, bookId: string): Promise<BookHighlights> {
  const marks = checkPayload(await get(`${API}/book/bookmarklist?bookId=${encodeURIComponent(bookId)}`), 'bookmarks')
  await sleep(DELAY_MS)
  const reviews = checkPayload(await get(`${API}/review/list?bookId=${encodeURIComponent(bookId)}&listType=11&mine=1&synckey=0`), 'reviews')
  const chapters = new Map<string, Chapter & { order: number }>()
  let order = 0
  for (const raw of arr(marks['chapters'])) {
    const c = obj(raw)
    const uid = str(c['chapterUid'])
    if (uid) chapters.set(uid, { title: str(c['title']) || `Chapter ${uid}`, marks: [], notes: [], order: num(c['chapterIdx']) ?? order++ })
  }
  const chapterOf = (uid: string): Chapter => {
    let c = chapters.get(uid)
    if (!c) { c = { title: uid === '' ? 'Book' : `Chapter ${uid}`, marks: [], notes: [], order: uid === '' ? -1 : 1e6 + chapters.size }; chapters.set(uid, c) }
    return c
  }
  const sortedMarks = arr(marks['updated']).map(obj).filter(m => str(m['markText']).trim() !== '')
    .sort((a, b) => (num(a['chapterUid']) ?? 0) - (num(b['chapterUid']) ?? 0) || str(a['range']).localeCompare(str(b['range']), undefined, { numeric: true }))
  let total = 0
  for (const m of sortedMarks) {
    if (total >= MAX_MARKS) break
    chapterOf(str(m['chapterUid'])).marks.push({ text: str(m['markText']).trim(), at: iso(m['createTime']) })
    total++
  }
  for (const raw of arr(reviews['reviews'])) {
    const r = { ...obj(raw), ...obj(obj(raw)['review']) }
    const content = str(r['content']).trim()
    if (!content) continue
    const type = num(r['type'])
    const uid = type === 4 ? '' : str(r['chapterUid'])
    const abstract = str(r['abstract']).trim()
    chapterOf(uid).notes.push({ text: abstract && type !== 4 ? `${content}\n> ${abstract}` : content, at: iso(r['createTime']) })
  }
  const list = [...chapters.values()].filter(c => c.marks.length > 0 || c.notes.length > 0).sort((a, b) => a.order - b.order)
    .map(({ title, marks: ms, notes }) => ({ title, marks: ms, notes }))
  return { chapters: list, at: new Date().toISOString(), total }
}

// ---- the plugin -------------------------------------------------------------

const SETUP_STEPS = [
  'Open https://weread.qq.com in a desktop browser and log in with the WeChat QR code.',
  'Open DevTools (Cmd-Option-I) → Network, click any request to weread.qq.com, and copy the whole Cookie value from Request Headers.',
  'Paste it here. It stays in ~/.dsh/weread/cookie.json and is never shown again; when WeRead logs you out, paste a fresh one.',
]

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-weread: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-weread: ${message}`)
  try { if (importLegacyState()) log('imported state.json into the store') } catch (error) { warn(`could not import state.json: ${String(error)}`) }
  const refreshMs = (config.refreshHours ?? 6) * 3_600_000
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }

  const cookieOf = (state: State): string => (state.cookie ?? '').trim() || (config.cookie ?? '').trim()
  const fetcherFor = (state: State): Fetcher => {
    const cookie = cookieOf(state)
    if (!cookie) throw new WereadError('WeRead is not connected: paste your weread.qq.com cookie in the Data panel', 'nocookie')
    return makeFetcher(cookie)
  }
  const fail = (state: State, error: unknown): void => {
    const e = error as Partial<WereadError>
    state.error = e.message ?? String(error)
    state.expired = Boolean(e.expired)
    warn(state.error)
  }
  const stale = (state: State): boolean => !state.shelfAt || Date.now() - Date.parse(state.shelfAt) > refreshMs

  let refreshing: Promise<void> | undefined
  /** Shelf + note counts, then progress for the few books most recently read. */
  const refresh = (force = false): Promise<void> => {
    refreshing ??= (async () => {
      const state = readState()
      if (!cookieOf(state)) return
      if (!force && !stale(state)) return
      try {
        const get = fetcherFor(state)
        const books = await fetchShelf(get)
        const known = new Map(state.books.map(b => [b.id, b]))
        for (const b of books) { const old = known.get(b.id); if (old?.progress !== undefined && b.progress === undefined) b.progress = old.progress }
        const recent = books.filter(b => !b.finished).slice(0, 5)
        for (const b of recent) {
          await sleep(DELAY_MS)
          try { const p = await fetchProgress(get, b.id); if (p.progress !== undefined) b.progress = p.progress; if (p.finished) b.finished = true }
          catch (error) { if (error instanceof WereadError && error.expired) throw error }
        }
        state.books = books
        state.shelfAt = new Date().toISOString()
        delete state.error; delete state.expired
        log(`shelf: ${books.length} books`)
      } catch (error) { fail(state, error) }
      writeState(state)
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, Math.min(refreshMs, 3_600_000))
    return () => clearInterval(timer)
  }, 'dsh-weread.poll')

  const findBook = (state: State, query: string): Book | undefined => {
    const q = query.trim().toLowerCase()
    if (!q) return undefined
    return state.books.find(b => b.id === query.trim())
      ?? state.books.find(b => b.title.toLowerCase() === q)
      ?? state.books.find(b => b.title.toLowerCase().includes(q))
      ?? state.books.find(b => q.includes(b.title.toLowerCase()) && b.title.length >= 2)
  }
  /** Cached highlights for a book, fetched when missing or older than the shelf refresh window. */
  const highlightsFor = async (bookId: string, force = false): Promise<BookHighlights> => {
    const state = readState()
    const cached = state.highlights[bookId]
    if (cached && !force && Date.now() - Date.parse(cached.at) < refreshMs) return cached
    try {
      const h = await fetchHighlights(fetcherFor(state), bookId)
      putHighlights(bookId, h)
      const fresh = readState()
      delete fresh.error; delete fresh.expired
      writeState(fresh); changed()
      return h
    } catch (error) {
      const fresh = readState(); fail(fresh, error); writeState(fresh); changed()
      if (cached) return cached
      throw error
    }
  }
  let syncing: Promise<number> | undefined
  /** Fetch highlights for books with notes that are not cached yet or were touched since, at most MAX_SYNC_BOOKS per run. */
  const sync = (): Promise<number> => {
    syncing ??= (async () => {
      await refresh(true)
      const state = readState()
      if (state.error && state.books.length === 0) throw new Error(state.error)
      const todo = state.books.filter(b => b.noteCount > 0).filter(b => { const h = state.highlights[b.id]; return !h || (b.updatedAt && b.updatedAt > h.at) })
        .slice(0, MAX_SYNC_BOOKS)
      let done = 0
      for (const b of todo) {
        if (done > 0) await sleep(DELAY_MS)
        try { await highlightsFor(b.id, true); done++ }
        catch (error) { if (error instanceof WereadError && error.expired) throw error }
      }
      log(`synced highlights for ${done} of ${todo.length} books`)
      return done
    })().finally(() => { syncing = undefined })
    return syncing
  }

  const pct = (b: Book): string => b.progress !== undefined ? `${b.progress}%` : 'in progress'
  const reading = (state: State): Book[] => state.books.filter(b => !b.finished && (b.progress === undefined || b.progress > 0)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  const finished = (state: State): Book[] => state.books.filter(b => b.finished).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))

  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-weread', order: 9580, text: () => {
    const state = readState()
    if (!state.shared || state.books.length === 0) return ''
    const now = reading(state).slice(0, 3).map(b => `${b.title} (${pct(b)})`).join(', ')
    const done = finished(state).slice(0, 3).map(b => b.title).join(', ')
    return `# WeRead\n${state.books.length} books on the shelf${now ? `, currently reading: ${now}` : ''}${done ? `; recently finished: ${done}` : ''}.\nUse \`weread_highlights\` when the user asks what they marked or thought about a book; \`weread_shelf\` lists the shelf, \`weread_search\` finds a passage.`
  } }), 'dsh-weread.section')

  const text = (v: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(v) }]
  const bookLine = (b: Book): string => `- ${b.title}${b.author ? ` — ${b.author}` : ''}${b.finished ? ' · finished' : b.progress !== undefined ? ` · ${b.progress}%` : ''}${b.noteCount ? ` · ${b.noteCount} notes` : ''}${b.updatedAt ? ` · ${b.updatedAt.slice(0, 10)}` : ''} (id ${b.id})`
  const markdown = (b: Book, h: BookHighlights): string => {
    if (h.chapters.length === 0) return `No highlights or notes in ${b.title} yet.`
    const parts = h.chapters.map(c => [`## ${c.title}`, ...c.marks.map(m => `> ${m.text.replace(/\n+/g, '\n> ')}`), ...c.notes.map(n => `Note: ${n.text}`)].join('\n\n'))
    return `# ${b.title}${b.author ? ` — ${b.author}` : ''}\n${h.total} highlights${h.total >= MAX_MARKS ? ' (first 200)' : ''}, ${h.chapters.reduce((n, c) => n + c.notes.length, 0)} notes, synced ${h.at.slice(0, 10)}\n\n${parts.join('\n\n')}`
  }

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'weread_shelf',
    description: 'The user\'s WeRead bookshelf. filter: reading (default) | finished | all. Each line ends with the bookId for weread_highlights.',
    parameters: { filter: { type: 'string', description: 'reading | finished | all' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const filter = String((args as { filter?: string }).filter ?? 'reading')
      await refresh()
      const state = readState()
      if (state.books.length === 0) throw new Error(state.error ?? 'WeRead is not connected yet')
      const books = filter === 'finished' ? finished(state) : filter === 'all' ? state.books : reading(state)
      if (books.length === 0) return `No ${filter} books on the shelf.`
      return `${books.length} ${filter === 'all' ? '' : `${filter} `}books:\n${books.slice(0, 80).map(bookLine).join('\n')}`
    },
  } as never)), 'dsh-weread.tool.shelf')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'weread_highlights',
    description: 'Highlights and the user\'s own notes for one WeRead book, grouped by chapter. book: a title (fuzzy) or bookId.',
    parameters: { book: { type: 'string', required: true, description: 'Book title or bookId' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const query = String((args as { book?: string }).book ?? '').trim()
      if (!query) throw new Error('book is required')
      await refresh()
      const state = readState()
      const book = findBook(state, query)
      if (!book) throw new Error(state.books.length === 0 ? (state.error ?? 'WeRead is not connected yet') : `No book matching "${query}" on the shelf`)
      return markdown(book, await highlightsFor(book.id))
    },
  } as never)), 'dsh-weread.tool.highlights')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'weread_search',
    description: 'Search the user\'s WeRead shelf (titles, authors) and the cached highlights and notes for a phrase.',
    parameters: { query: { type: 'string', required: true, description: 'Words to look for' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const query = String((args as { query?: string }).query ?? '').trim().toLowerCase()
      if (!query) throw new Error('query is required')
      const state = readState()
      const books = state.books.filter(b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query))
      const hits: string[] = []
      for (const b of state.books) {
        const h = state.highlights[b.id]
        if (!h) continue
        for (const c of h.chapters) {
          for (const m of c.marks) if (m.text.toLowerCase().includes(query)) hits.push(`- ${b.title} · ${c.title}: "${m.text.slice(0, 200)}"`)
          for (const n of c.notes) if (n.text.toLowerCase().includes(query)) hits.push(`- ${b.title} · ${c.title} (note): ${n.text.slice(0, 200)}`)
        }
      }
      if (books.length === 0 && hits.length === 0) return `Nothing matching "${query}" on the shelf or in the ${Object.keys(state.highlights).length} books with cached highlights.`
      return [books.length ? `Books:\n${books.slice(0, 20).map(bookLine).join('\n')}` : '', hits.length ? `Passages (${hits.length}):\n${hits.slice(0, 40).join('\n')}` : ''].filter(Boolean).join('\n\n')
    },
  } as never)), 'dsh-weread.tool.search')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const describe = (): SourceView => {
      const state = readState()
      const connected = cookieOf(state) !== ''
      const actions: SourceView['actions'] = [
        { id: 'cookie', label: connected ? 'Replace cookie' : 'Paste cookie', kind: 'input', placeholder: 'wr_vid=…; wr_skey=…', hint: 'The Cookie header of a logged-in weread.qq.com session' },
        { id: 'sync', label: 'Sync highlights', kind: 'button', hint: 'Fetch highlights and notes for books with notes (20 per run)' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'wereadShared', label: 'Visible to the character', kind: 'toggle', value: state.shared, hint: 'Off hides the shelf from the prompt' },
      ]
      const setup: SourceView['setup'] = [{ title: connected ? 'Cookie and privacy' : 'Connect WeRead', steps: connected ? ['The cookie is stored in ~/.dsh/weread/cookie.json and only sent to weread.qq.com. Nothing is written to your WeRead account.', ...(state.expired ? SETUP_STEPS : [])] : SETUP_STEPS }]
      const cachedIds = Object.keys(state.highlights)
      const marksCached = cachedIds.reduce((n, id) => n + (state.highlights[id]?.total ?? 0), 0)
      const highlights: Record<string, { chapters: Chapter[] }> = {}
      for (const id of cachedIds) highlights[id] = { chapters: state.highlights[id]!.chapters }
      const data = { connected, expired: Boolean(state.expired), books: state.books, highlights, syncedAt: state.shelfAt ?? '' }
      if (!connected || state.books.length === 0) {
        const status = state.error ? 'error' : 'empty'
        const summary = state.error ?? (connected ? 'Loading the shelf…' : 'Not connected. Paste your WeRead cookie to see the shelf.')
        return { status, summary, shared: state.shared, placeholder: true, data, stats: ['Books', 'Reading', 'Finished', 'Highlights'].map(label => ({ label, value: '—' })), setup, actions }
      }
      const now = reading(state), done = finished(state)
      const most = state.books.filter(b => b.noteCount > 0).sort((a, b) => b.noteCount - a.noteCount).slice(0, 5)
      const ago = state.shelfAt ? Math.round((Date.now() - Date.parse(state.shelfAt)) / 60000) : 0
      return {
        status: state.error ? 'error' : 'connected',
        summary: state.error ?? `${state.books.length} books · ${done.length} finished · ${cachedIds.length} with cached highlights · refreshed ${ago < 60 ? `${ago} min` : `${Math.round(ago / 60)} h`} ago`,
        shared: state.shared, data,
        stats: [
          { label: 'Books', value: String(state.books.length) },
          { label: 'Reading', value: String(now.length) },
          { label: 'Finished', value: String(done.length) },
          { label: 'Highlights cached', value: String(marksCached), delta: `${cachedIds.length} books` },
        ],
        lists: [
          { title: 'Currently reading', items: now.slice(0, 5).map(b => ({ primary: b.title, secondary: `${b.author ? `${b.author} · ` : ''}${pct(b)}` })) },
          { title: 'Recently finished', items: done.slice(0, 5).map(b => ({ primary: b.title, secondary: `${b.author ? `${b.author} · ` : ''}${b.updatedAt.slice(0, 10)}` })) },
          { title: 'Most highlighted', items: most.map(b => ({ primary: b.title, secondary: `${b.noteCount} notes` })) },
        ].filter(l => l.items.length > 0),
        setup, actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const body = obj(input.json)
      const value = body['value']
      if (action === 'cookie') {
        const cookie = String(value ?? '').trim().replace(/^cookie:\s*/i, '')
        if (!cookie) throw new Error('paste the Cookie header value')
        writeCookie(cookie)
        const s = readState(); delete s.error; delete s.expired; delete s.shelfAt; writeState(s)
        await refresh(true)
        const after = readState()
        if (after.error) throw new Error(after.error)
        return { ok: true, message: `WeRead connected: ${after.books.length} books on the shelf.` }
      }
      if (action === 'refresh') { await refresh(true); const s = readState(); if (s.error) throw new Error(s.error); return { ok: true } }
      if (action === 'sync') { const n = await sync(); const s = readState(); if (s.error) throw new Error(s.error); return { ok: true, message: n === 0 ? 'Highlights are up to date.' : `Synced highlights for ${n} book${n === 1 ? '' : 's'}.` } }
      if (action === 'fetch') {
        const id = String(body['book'] ?? value ?? '').trim()
        const book = findBook(readState(), id)
        if (!book) throw new Error('no such book')
        const h = await highlightsFor(book.id, true)
        return { ok: true, message: `${h.total} highlights in ${book.title}.` }
      }
      if (action === 'wereadShared') { const s = readState(); s.shared = Boolean(value); writeState(s); changed(); return { ok: true } }
      if (action === 'disconnect') {
        writeCookie(undefined); clearHighlights()
        const s = readState(); s.books = []; delete s.shelfAt; delete s.error; delete s.expired; writeState(s); changed()
        return { ok: true, message: 'WeRead disconnected.' }
      }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'weread', label: 'WeRead', category: 'media', describe, act })
      const notify = (): void => registry.changed('weread')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-weread.source')
  })
}
