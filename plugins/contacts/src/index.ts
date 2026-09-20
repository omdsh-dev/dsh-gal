/*
 * dsh-contacts: the user's address book, for any dsh session.
 *
 * Contacts.app through a small Swift helper compiled on first use (Xcode
 * command-line tools required), so every account already synced — iCloud,
 * Google, Exchange — just works after the one-time macOS permission prompt.
 * The agent gets a short prompt section (how many contacts, whose birthday
 * is near) and a lookup tool to resolve "call Anna" into a person. With
 * Aibo loaded, the address book shows up in its Data panel.
 */
import { execFile } from 'node:child_process'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { migrateFile, openStore } from '@dsh-external/aibo/store'

const execFileAsync = promisify(execFile)
const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

// ---- the slice of Aibo's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  /** Raw data for the panel's own renderer of this source. */
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

export const name = 'dsh-contacts'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Minutes between refreshes of the cached address book. */
  refreshMinutes?: number
}
export const Config: z<Config> = z.object({
  refreshMinutes: z.number().min(1).default(60),
})

// ---- storage and the helper -------------------------------------------------

interface Contact { id: string; givenName: string; familyName: string; fullName: string; nickname: string; organization: string; jobTitle: string; emails: string[]; phones: string[]; birthday: string | null }
interface Settings { contactsShared: boolean }

/** Machine-local files only: the compiled helper under `bin/`. Settings live in the shared store. */
const dataDir = (): string => process.env['DSH_CONTACTS_DIR'] ?? join(homedir(), '.dsh', 'contacts')

const DEFAULT_SETTINGS: Settings = { contactsShared: true }
const settingsDoc = () => openStore().doc<Settings>('contacts', 'settings')
const readSettings = (): Settings => ({ ...DEFAULT_SETTINGS, ...settingsDoc().get() })
const writeSettings = (patch: Partial<Settings>): Settings => settingsDoc().patch(patch, DEFAULT_SETTINGS)
/** Earlier versions kept `settings.json` under the data dir; import it into the store once. */
function importLegacySettings(log: (m: string) => void): void {
  const file = join(dataDir(), 'settings.json')
  const done = migrateFile(file, text => {
    const old = JSON.parse(text) as Partial<Settings>
    if (typeof old.contactsShared === 'boolean') writeSettings({ contactsShared: old.contactsShared })
  })
  if (done) log(`imported ${file} into the store`)
}

/** The helper binary: rebuilt when missing or older than its source. */
async function ensureHelper(log: (m: string) => void): Promise<string> {
  const bin = join(dataDir(), 'bin', 'ckit')
  const src = join(PKG_ROOT, 'helper', 'ckit.swift')
  const plist = join(PKG_ROOT, 'helper', 'Info.plist')
  const stale = !existsSync(bin) || (existsSync(src) && statSync(src).mtimeMs > statSync(bin).mtimeMs)
  if (!stale) return bin
  if (!existsSync(src)) throw new Error(`helper source missing at ${src}`)
  mkdirSync(dirname(bin), { recursive: true })
  log('compiling the Contacts helper (first run)…')
  try {
    await execFileAsync('xcrun', ['swiftc', '-O', '-o', bin, src, '-framework', 'Contacts', '-Xlinker', '-sectcreate', '-Xlinker', '__TEXT', '-Xlinker', '__info_plist', '-Xlinker', plist], { timeout: 300_000, maxBuffer: 4 * 1024 * 1024 })
  } catch (error) {
    throw new Error(`could not compile the Contacts helper (Xcode command-line tools installed? run: xcode-select --install): ${(error as { stderr?: string }).stderr?.split('\n').find(l => l.includes('error')) ?? String(error)}`)
  }
  // An ad-hoc signature gives TCC a stable identity to remember the answer under.
  try { await execFileAsync('codesign', ['-s', '-', '--force', '--identifier', 'dev.dsh.contacts.ckit', bin], { timeout: 60_000 }) } catch (error) { log(`codesign skipped: ${String(error)}`) }
  return bin
}

// ---- time and text helpers --------------------------------------------------

const pad = (n: number): string => String(n).padStart(2, '0')
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const agoWords = (min: number): string => min < 1 ? 'just now' : min < 60 ? `${min} min ago` : min < 60 * 36 ? `${Math.round(min / 60)} h ago` : `${Math.round(min / 1440)} d ago`

/** "MM-DD" or "YYYY-MM-DD" → the next occurrence from today: how many days away, and the date it lands on. Feb 29 rolls to Mar 1 in common years. */
function nextBirthday(birthday: string): { inDays: number; date: string; month: number; day: number; age?: number } | undefined {
  const m = birthday.match(/^(?:(\d{4})-)?(\d{2})-(\d{2})$/)
  if (!m) return undefined
  const year = m[1] ? Number(m[1]) : undefined, month = Number(m[2]), day = Number(m[3])
  const now = new Date(); const base = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let next = new Date(base.getFullYear(), month - 1, day)
  if (next < base) next = new Date(base.getFullYear() + 1, month - 1, day)
  const inDays = Math.round((next.getTime() - base.getTime()) / 86_400_000)
  const date = `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`
  return { inDays, date, month, day, ...year !== undefined ? { age: next.getFullYear() - year } : {} }
}
const whenWords = (b: { inDays: number; date: string; month: number; day: number }): string =>
  b.inDays === 0 ? 'today' : b.inDays === 1 ? 'tomorrow' : b.inDays < 7 ? `${WEEKDAY[new Date(`${b.date}T12:00:00`).getDay()]}, in ${b.inDays} days` : `${MONTH[b.month - 1]} ${b.day}, in ${b.inDays} days`

const collator = new Intl.Collator(undefined, { sensitivity: 'base', numeric: true })
const byName = (a: Contact, b: Contact): number => collator.compare(a.fullName, b.fullName)
const digits = (s: string): string => s.replace(/\D/g, '')

/** What the agent reads for one person: compact, one block. */
function contactBlock(c: Contact): string {
  // A company card carries its name as the organization too; say it once.
  const org = c.organization === c.fullName ? '' : c.organization
  const head = [c.fullName || '(no name)', c.nickname ? `“${c.nickname}”` : '', org || c.jobTitle ? `· ${[c.jobTitle, org].filter(Boolean).join(', ')}` : ''].filter(Boolean).join(' ')
  const lines = [head]
  if (c.phones.length > 0) lines.push(`  phone: ${c.phones.join(', ')}`)
  if (c.emails.length > 0) lines.push(`  email: ${c.emails.join(', ')}`)
  if (c.birthday) { const b = nextBirthday(c.birthday); lines.push(`  birthday: ${c.birthday}${b ? ` (${whenWords(b)}${b.age !== undefined ? `, turns ${b.age}` : ''})` : ''}`) }
  return lines.join('\n')
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-contacts: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-contacts: ${message}`)
  const refreshMs = (config.refreshMinutes ?? 60) * 60_000
  importLegacySettings(log)

  // The cache is what the prompt section reads; sections are synchronous.
  const cache = { contacts: [] as Contact[], at: 0, error: '', denied: false }
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }

  async function run<T>(command: string, ...args: string[]): Promise<T> {
    const bin = await ensureHelper(log)
    try {
      const { stdout } = await execFileAsync(bin, [command, ...args], { timeout: 60_000, maxBuffer: 64 * 1024 * 1024 })
      cache.denied = false
      return JSON.parse(stdout) as T
    } catch (error) {
      const stderr = String((error as { stderr?: string }).stderr ?? '').trim()
      if (stderr.startsWith('denied:contacts')) { cache.denied = true; throw new Error('contacts access denied') }
      throw new Error(stderr || String(error))
    }
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      try {
        cache.contacts = (await run<Contact[]>('all')).sort(byName)
        cache.error = ''
      } catch (error) { cache.error = (error as Error).message; warn(cache.error) }
      cache.at = Date.now()
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-contacts.poll')

  // ---- views over the cache --------------------------------------------------
  type Upcoming = { contact: Contact; inDays: number; date: string; month: number; day: number; age?: number }
  const upcomingBirthdays = (days: number): Upcoming[] => cache.contacts
    .flatMap(contact => { const b = contact.birthday ? nextBirthday(contact.birthday) : undefined; return b && b.inDays <= days ? [{ contact, ...b }] : [] })
    .sort((a, b) => a.inDays - b.inDays || byName(a.contact, b.contact))
  const search = (query: string, limit = 10): Contact[] => {
    const q = query.trim().toLowerCase(), qd = digits(q)
    if (!q) return []
    const hit = (c: Contact): number => {
      const names = [c.fullName, c.givenName, c.familyName, c.nickname].map(s => s.toLowerCase())
      if (names.some(n => n === q)) return 0
      if (names.some(n => n.startsWith(q) || n.split(/\s+/).some(w => w.startsWith(q)))) return 1
      if (names.some(n => n.includes(q))) return 2
      if ([c.organization, c.jobTitle, ...c.emails].some(s => s.toLowerCase().includes(q))) return 3
      if (qd.length >= 3 && c.phones.some(p => digits(p).includes(qd))) return 3
      return -1
    }
    return cache.contacts.map(c => ({ c, r: hit(c) })).filter(x => x.r >= 0).sort((a, b) => a.r - b.r || byName(a.c, b.c)).slice(0, limit).map(x => x.c)
  }

  // ---- what the agent sees ---------------------------------------------------
  const section = (): string => {
    if (!readSettings().contactsShared || cache.denied || cache.at === 0 || cache.contacts.length === 0) return ''
    const lines = [`# The user's contacts`, `${cache.contacts.length} people in the user's address book.`]
    const soon = upcomingBirthdays(14)
    if (soon.length > 0) lines.push(`Birthdays in the next 14 days: ${soon.slice(0, 8).map(b => `${b.contact.fullName} (${whenWords(b)}${b.age !== undefined ? `, turns ${b.age}` : ''})`).join('; ')}.`)
    lines.push('', 'When the user names a person, use `contacts_search` to resolve who they are (number, email, organization) before acting. Never list contacts unprompted.')
    return lines.join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-contacts', order: 9550, text: section }), 'dsh-contacts.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'contacts_search',
    description: 'Look up people in the user\'s address book by name, nickname, email, phone number or organization. Returns up to 10 matches with phones, emails and birthday.',
    parameters: { query: { type: 'string', required: true, description: 'A name, part of a name, an email, a phone number or a company' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const query = String((args as { query?: string }).query ?? '').trim()
      if (!query) throw new Error('query is required')
      if (cache.at === 0 || cache.error) await refresh()
      if (cache.denied) throw new Error('Contacts access was denied. System Settings → Privacy & Security → Contacts.')
      const found = search(query)
      return found.length === 0 ? `No contact matches "${query}".` : found.map(contactBlock).join('\n\n')
    },
  } as never)), 'dsh-contacts.tool.search')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'contacts_birthdays',
    description: 'Upcoming birthdays from the user\'s contacts, soonest first. days: how far ahead to look (default 30).',
    parameters: { days: { type: 'number', description: 'Days ahead, 1–366, default 30' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const raw = Number((args as { days?: number }).days)
      const days = Number.isFinite(raw) && raw > 0 ? Math.min(366, Math.round(raw)) : 30
      if (cache.at === 0 || cache.error) await refresh()
      if (cache.denied) throw new Error('Contacts access was denied. System Settings → Privacy & Security → Contacts.')
      const soon = upcomingBirthdays(days)
      return soon.length === 0 ? `No birthdays in the next ${days} days.` : soon.map(b => `- ${b.contact.fullName}: ${whenWords(b)}${b.age !== undefined ? `, turns ${b.age}` : ''}${b.contact.organization ? ` [${b.contact.organization}]` : ''}`).join('\n')
    },
  } as never)), 'dsh-contacts.tool.birthdays')

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const permission: SourceView['setup'] = [{
      title: 'Allow access to Contacts',
      steps: [
        'macOS asks once, the first time the helper runs. If it was declined: System Settings → Privacy & Security → Contacts → enable "ckit" (or the app you launched dsh from).',
        'Then press Refresh.',
      ],
    }]
    const stamp = (): string => cache.at === 0 ? 'not loaded yet' : `refreshed ${agoWords(Math.round((Date.now() - cache.at) / 60000))}`
    const describe = (): SourceView => {
      const s = readSettings()
      const actions: SourceView['actions'] = [
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'contactsShared', label: 'Visible to the character', kind: 'toggle', value: s.contactsShared, hint: 'Off hides the address book from the prompt' },
      ]
      if (cache.denied) return { status: 'error', summary: 'Contacts access was denied', shared: s.contactsShared, setup: permission, actions }
      if (cache.error && cache.contacts.length === 0 && cache.at !== 0) return { status: 'error', summary: cache.error, shared: s.contactsShared, setup: permission, actions }
      const all = cache.contacts
      const month = new Date().getMonth() + 1
      const thisMonth = all.filter(c => c.birthday && Number(c.birthday.slice(-5, -3)) === month).length
      const soon = upcomingBirthdays(30)
      const loading = cache.at === 0
      return {
        status: loading ? 'empty' : 'connected', summary: loading ? 'Loading the address book…' : `${all.length} contacts · ${stamp()}`, shared: s.contactsShared, placeholder: loading,
        data: {
          contacts: all.slice(0, 500).map(c => ({ id: c.id, name: c.fullName, org: c.organization === c.fullName ? '' : c.organization, emails: c.emails, phones: c.phones, birthday: c.birthday })),
          birthdays: soon.map(b => ({ id: b.contact.id, name: b.contact.fullName, date: b.date, inDays: b.inDays })),
        },
        stats: [
          { label: 'Contacts', value: loading ? '—' : String(all.length) },
          { label: 'With email', value: loading ? '—' : String(all.filter(c => c.emails.length > 0).length) },
          { label: 'With phone', value: loading ? '—' : String(all.filter(c => c.phones.length > 0).length) },
          { label: 'Birthdays this month', value: loading ? '—' : String(thisMonth) },
        ],
        lists: soon.length === 0 ? [] : [{ title: 'Birthdays coming up', items: soon.slice(0, 12).map(b => ({ primary: b.contact.fullName, secondary: `${whenWords(b)}${b.age !== undefined ? ` · turns ${b.age}` : ''}` })) }],
        setup: loading ? permission : undefined,
        actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); if (cache.error) throw new Error(cache.error); return { ok: true } }
      if (action === 'contactsShared') { writeSettings({ contactsShared: Boolean(value) }); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: 'contacts', label: 'Contacts', category: 'other', describe, act })
      const notify = (): void => registry.changed('contacts')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-contacts.source')
  })
}
