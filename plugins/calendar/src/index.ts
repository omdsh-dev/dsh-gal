/*
 * dsh-calendar: the user's calendar and reminders, for any dsh session.
 *
 * Both come from EventKit through a small Swift helper compiled on first use
 * (Xcode command-line tools required), so every account already synced into
 * Calendar.app and Reminders.app — iCloud, Google, Exchange — just works,
 * after the one-time macOS permission prompt. The agent gets today's agenda
 * and open reminders as a prompt section, lookup tools, and tools to add and
 * complete reminders. With Aibo loaded, both show up in its Data panel.
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

export const name = 'dsh-calendar'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Minutes between refreshes of the cached agenda. */
  refreshMinutes?: number
  /** Days ahead to load. */
  daysAhead?: number
  /** Only these calendars (titles); empty = all. */
  calendars?: string[]
  /** Register the reminders source and tools. */
  reminders?: boolean
}
export const Config: z<Config> = z.object({
  refreshMinutes: z.number().min(1).default(5),
  daysAhead: z.number().step(1).min(1).max(30).default(7),
  calendars: z.array(z.string()).default([]),
  reminders: z.boolean().default(true),
})

// ---- storage and the helper -------------------------------------------------

interface Event { id: string; title: string; start: string; end: string; allDay: boolean; location: string; notes: string; calendar: string; status: string; attendees: number; url: string }
interface Reminder { id: string; title: string; due: string | null; hasTime: boolean; completed: boolean; completedAt: string | null; priority: number; notes: string; list: string; created: string | null }
interface Settings { calendarShared: boolean; remindersShared: boolean }

/** Machine-local files only: the compiled helper lives in `<dataDir>/bin`. */
const dataDir = (): string => process.env['DSH_CALENDAR_DIR'] ?? join(homedir(), '.dsh', 'calendar')

// Settings live in Aibo's store as doc('calendar', 'settings'). Events and
// reminders are never stored: they are re-read from EventKit on every refresh.
const DEFAULT_SETTINGS: Settings = { calendarShared: true, remindersShared: true }
const settingsDoc = () => openStore().doc<Settings>('calendar', 'settings')
function readSettings(): Settings { return { ...DEFAULT_SETTINGS, ...settingsDoc().get() } }
function writeSettings(patch: Partial<Settings>): Settings { return settingsDoc().patch(patch, DEFAULT_SETTINGS) }
/** One-time import of the settings.json earlier versions kept in the data directory. */
function importLegacySettings(log: (m: string) => void): void {
  migrateFile(join(dataDir(), 'settings.json'), text => {
    const old = JSON.parse(text) as Partial<Settings>
    const patch: Partial<Settings> = {}
    if (typeof old.calendarShared === 'boolean') patch.calendarShared = old.calendarShared
    if (typeof old.remindersShared === 'boolean') patch.remindersShared = old.remindersShared
    writeSettings(patch)
    log('imported settings.json into the store')
  })
}

/** The helper binary: rebuilt when missing or older than its source. */
async function ensureHelper(log: (m: string) => void): Promise<string> {
  const bin = join(dataDir(), 'bin', 'ekit')
  const src = join(PKG_ROOT, 'helper', 'ekit.swift')
  const plist = join(PKG_ROOT, 'helper', 'Info.plist')
  const stale = !existsSync(bin) || (existsSync(src) && statSync(src).mtimeMs > statSync(bin).mtimeMs)
  if (!stale) return bin
  if (!existsSync(src)) throw new Error(`helper source missing at ${src}`)
  mkdirSync(dirname(bin), { recursive: true })
  log('compiling the EventKit helper (first run)…')
  try {
    await execFileAsync('xcrun', ['swiftc', '-O', '-o', bin, src, '-framework', 'EventKit', '-Xlinker', '-sectcreate', '-Xlinker', '__TEXT', '-Xlinker', '__info_plist', '-Xlinker', plist], { timeout: 300_000, maxBuffer: 4 * 1024 * 1024 })
  } catch (error) {
    throw new Error(`could not compile the EventKit helper (Xcode command-line tools installed? run: xcode-select --install): ${(error as { stderr?: string }).stderr?.split('\n').find(l => l.includes('error')) ?? String(error)}`)
  }
  // An ad-hoc signature gives TCC a stable identity to remember the answer under.
  try { await execFileAsync('codesign', ['-s', '-', '--force', '--identifier', 'dev.dsh.calendar.ekit', bin], { timeout: 60_000 }) } catch (error) { log(`codesign skipped: ${String(error)}`) }
  return bin
}

// ---- time helpers -----------------------------------------------------------

const pad = (n: number): string => String(n).padStart(2, '0')
const localIso = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
const dayOf = (iso: string): string => iso.slice(0, 10)
const today = (): string => dayOf(localIso(new Date()))
const shiftDay = (day: string, n: number): string => { const d = new Date(`${day}T12:00:00`); d.setDate(d.getDate() + n); return dayOf(localIso(d)) }
const hhmm = (iso: string): string => iso.slice(11, 16)
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayLabel = (day: string): string => day === today() ? 'Today' : day === shiftDay(today(), 1) ? 'Tomorrow' : `${WEEKDAY[new Date(`${day}T12:00:00`).getDay()]} ${day.slice(0, 4) === today().slice(0, 4) ? day.slice(5) : day}`
const minutesUntil = (iso: string): number => Math.round((new Date(iso).getTime() - Date.now()) / 60000)
const inWords = (min: number): string => min < 1 ? 'now' : min < 60 ? `in ${min} min` : min < 60 * 36 ? `in ${Math.round(min / 60)} h` : `in ${Math.round(min / 1440)} d`
const agoWords = (min: number): string => min < 60 ? `${min} min` : min < 60 * 36 ? `${Math.round(min / 60)} h` : `${Math.round(min / 1440)} d`

function eventLine(e: Event, withDay = false): string {
  const when = e.allDay ? 'all day' : `${hhmm(e.start)}–${hhmm(e.end)}`
  return `${withDay ? `${dayLabel(dayOf(e.start))} ` : ''}${when} ${e.title}${e.location ? ` @ ${e.location.split('\n')[0]}` : ''}${e.calendar ? ` [${e.calendar}]` : ''}${e.status === 'canceled' ? ' (canceled)' : ''}`
}
function reminderLine(r: Reminder): string {
  const due = r.due === null ? '' : r.hasTime ? `${dayLabel(dayOf(r.due))} ${hhmm(r.due)}` : dayLabel(dayOf(r.due))
  return `${r.title}${due ? ` · ${due}` : ''}${r.priority > 0 && r.priority <= 4 ? ' · !' : ''} [${r.list}]`
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-calendar: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-calendar: ${message}`)
  const refreshMs = (config.refreshMinutes ?? 5) * 60_000
  const daysAhead = config.daysAhead ?? 7
  const onlyCalendars = new Set((config.calendars ?? []).map(c => c.toLowerCase()))
  const withReminders = config.reminders !== false
  importLegacySettings(log)

  // The cache is what the prompt section reads; sections are synchronous.
  const cache = { events: [] as Event[], reminders: [] as Reminder[], colors: {} as Record<string, string>, at: 0, error: '', denied: { calendars: false, reminders: false } }
  const listeners = new Set<(id: string) => void>()
  const changed = (id: string): void => { for (const fn of listeners) fn(id) }

  async function run<T>(command: string, ...args: string[]): Promise<T> {
    const bin = await ensureHelper(log)
    try {
      const { stdout } = await execFileAsync(bin, [command, ...args], { timeout: 30_000, maxBuffer: 16 * 1024 * 1024 })
      return JSON.parse(stdout) as T
    } catch (error) {
      const stderr = String((error as { stderr?: string }).stderr ?? '').trim()
      if (stderr.startsWith('denied:calendars')) { cache.denied.calendars = true; throw new Error('calendar access denied') }
      if (stderr.startsWith('denied:reminders')) { cache.denied.reminders = true; throw new Error('reminders access denied') }
      throw new Error(stderr || String(error))
    }
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      const errors: string[] = []
      try {
        // From Monday of this week, so the panel can draw the week; the prompt only reads from today on.
        const monday = shiftDay(today(), -((new Date(`${today()}T12:00:00`).getDay() + 6) % 7))
        const from = `${monday}T00:00:00`, to = `${shiftDay(today(), Math.max(daysAhead, 14))}T00:00:00`
        const events = await run<Event[]>('events', from, to)
        try { cache.colors = Object.fromEntries((await run<{ title: string; color: string }[]>('calendars')).map(c => [c.title, c.color])) } catch { /* colours are decoration */ }
        cache.events = events.filter(e => onlyCalendars.size === 0 || onlyCalendars.has(e.calendar.toLowerCase()))
        cache.denied.calendars = false
      } catch (error) { errors.push((error as Error).message) }
      if (withReminders) {
        try { cache.reminders = await run<Reminder[]>('reminders', 'open'); cache.denied.reminders = false }
        catch (error) { errors.push((error as Error).message) }
      }
      cache.at = Date.now()
      cache.error = errors.join('; ')
      if (cache.error) warn(cache.error)
      changed('calendar'); changed('reminders')
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-calendar.poll')

  // ---- views over the cache --------------------------------------------------
  const eventsOn = (day: string): Event[] => cache.events.filter(e => dayOf(e.start) === day || (e.allDay && dayOf(e.start) <= day && dayOf(e.end) > day))
  const upcoming = (): Event[] => cache.events.filter(e => dayOf(e.start) >= today() || (e.allDay && dayOf(e.end) > today()))
  const nextEvent = (): Event | undefined => { const now = localIso(new Date()); return upcoming().find(e => !e.allDay && e.start > now && e.status !== 'canceled') }
  const currentEvent = (): Event | undefined => { const now = localIso(new Date()); return cache.events.find(e => !e.allDay && e.start <= now && e.end > now && e.status !== 'canceled') }
  const overdue = (): Reminder[] => cache.reminders.filter(r => r.due !== null && dayOf(r.due) < today())
  const dueToday = (): Reminder[] => cache.reminders.filter(r => r.due !== null && dayOf(r.due) === today())
  const dueSoon = (): Reminder[] => cache.reminders.filter(r => r.due !== null && dayOf(r.due) > today() && dayOf(r.due) <= shiftDay(today(), 7))
  const undated = (): Reminder[] => cache.reminders.filter(r => r.due === null)

  // ---- what the agent sees ---------------------------------------------------
  const calendarSection = (): string => {
    if (!readSettings().calendarShared || cache.denied.calendars) return ''
    const now = new Date()
    const lines: string[] = [`# The user's calendar (${WEEKDAY[now.getDay()]} ${today()}, now ${pad(now.getHours())}:${pad(now.getMinutes())})`]
    const t = eventsOn(today())
    lines.push(t.length === 0 ? 'Today: nothing scheduled.' : `Today:\n${t.slice(0, 10).map(e => `- ${eventLine(e)}`).join('\n')}`)
    const cur = currentEvent(), next = nextEvent()
    if (cur) lines.push(`Right now: ${cur.title} (until ${hhmm(cur.end)}).`)
    if (next && dayOf(next.start) === today()) lines.push(`Next: ${next.title} ${inWords(minutesUntil(next.start))}.`)
    const tm = eventsOn(shiftDay(today(), 1))
    if (tm.length > 0) lines.push(`Tomorrow: ${tm.slice(0, 6).map(e => e.allDay ? e.title : `${hhmm(e.start)} ${e.title}`).join('; ')}.`)
    const later = upcoming().filter(e => dayOf(e.start) > shiftDay(today(), 1) && dayOf(e.start) <= shiftDay(today(), daysAhead)).slice(0, 5)
    if (later.length > 0) lines.push(`Later this week: ${later.map(e => `${dayLabel(dayOf(e.start))} ${e.allDay ? '' : `${hhmm(e.start)} `}${e.title}`).join('; ')}.`)
    lines.push('', 'Mention what is coming up when it helps, e.g. prep before a meeting or a clash. `calendar_events` lists any date range.')
    return lines.join('\n')
  }
  const remindersSection = (): string => {
    if (!withReminders || !readSettings().remindersShared || cache.denied.reminders) return ''
    const od = overdue(), td = dueToday()
    const lines: string[] = ['# The user\'s reminders']
    if (od.length > 0) lines.push(`Overdue (${od.length}): ${od.slice(0, 6).map(reminderLine).join('; ')}`)
    if (td.length > 0) lines.push(`Due today (${td.length}): ${td.slice(0, 8).map(reminderLine).join('; ')}`)
    const soon = dueSoon()
    if (soon.length > 0) lines.push(`Next 7 days (${soon.length}): ${soon.slice(0, 6).map(reminderLine).join('; ')}`)
    if (od.length + td.length + soon.length === 0) lines.push(`${cache.reminders.length} open, none due this week.`)
    lines.push('', 'When the user asks you to remember to do something, or mentions a task with a date, offer to add it with `reminder_add` (confirm the wording and due date briefly first). Mark things done with `reminder_complete` when they say so.')
    return lines.join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-calendar', order: 9540, text: calendarSection }), 'dsh-calendar.section')
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-calendar.reminders', order: 9541, text: remindersSection }), 'dsh-calendar.reminders.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'calendar_events',
    description: 'Events on the user\'s calendars for a date range (default: today through the next 7 days). Dates are local, YYYY-MM-DD.',
    parameters: { from: { type: 'string', description: 'Start date (inclusive), default today' }, to: { type: 'string', description: 'End date (inclusive), default from + 7 days' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { from, to } = args as { from?: string; to?: string }
      const start = from && /^\d{4}-\d{2}-\d{2}$/.test(from) ? from : today()
      const end = to && /^\d{4}-\d{2}-\d{2}$/.test(to) ? to : shiftDay(start, 7)
      const events = await run<Event[]>('events', `${start}T00:00:00`, `${shiftDay(end, 1)}T00:00:00`)
      const kept = events.filter(e => onlyCalendars.size === 0 || onlyCalendars.has(e.calendar.toLowerCase()))
      if (kept.length === 0) return `No events from ${start} to ${end}.`
      return kept.map(e => `- ${eventLine(e, true)}${e.notes ? `\n  ${e.notes.split('\n')[0]?.slice(0, 160)}` : ''}`).join('\n')
    },
  } as never)), 'dsh-calendar.tool.events')

  if (withReminders) {
    ctx.effect(() => ctx.tools.register(defineTool({
      name: 'reminders_list',
      description: 'The user\'s reminders. scope: open (default), today, overdue, week, undated, completed (last 14 days).',
      parameters: { scope: { type: 'string', description: 'open | today | overdue | week | undated | completed' } },
      output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
      execute: async (args: unknown) => {
        const scope = String((args as { scope?: string }).scope ?? 'open')
        if (scope === 'completed') { const done = await run<Reminder[]>('reminders', 'completed'); return done.length === 0 ? 'Nothing completed in the last 14 days.' : done.map(r => `- ${r.title} · done ${r.completedAt?.slice(0, 16).replace('T', ' ')} [${r.list}]`).join('\n') }
        await refresh()
        const items = scope === 'today' ? dueToday() : scope === 'overdue' ? overdue() : scope === 'week' ? [...overdue(), ...dueToday(), ...dueSoon()] : scope === 'undated' ? undated() : cache.reminders
        return items.length === 0 ? `No ${scope} reminders.` : items.map(r => `- ${reminderLine(r)} (id ${r.id})`).join('\n')
      },
    } as never)), 'dsh-calendar.tool.reminders')
    ctx.effect(() => ctx.tools.register(defineTool({
      name: 'reminder_add',
      description: 'Add a reminder for the user. due: YYYY-MM-DD or YYYY-MM-DDTHH:MM (local). list: a Reminders list name, default the default list.',
      parameters: { title: { type: 'string', required: true, description: 'Short imperative title' }, due: { type: 'string', description: 'YYYY-MM-DD or YYYY-MM-DDTHH:MM' }, list: { type: 'string', description: 'Reminders list name' }, notes: { type: 'string', description: 'Optional notes' } },
      output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
      execute: async (args: unknown) => {
        const { title, due, list, notes } = args as { title: string; due?: string; list?: string; notes?: string }
        if (!title?.trim()) throw new Error('title is required')
        const dueArg = due === undefined ? '' : /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(due) ? `${due}:00` : due
        const made = await run<{ id: string; title: string; list: string; due: string | null }>('add', title.trim(), dueArg, list ?? '', notes ?? '')
        void refresh()
        return `Added "${made.title}" to ${made.list}${made.due ? `, due ${made.due.slice(0, 16).replace('T', ' ')}` : ''} (id ${made.id}).`
      },
    } as never)), 'dsh-calendar.tool.add')
    ctx.effect(() => ctx.tools.register(defineTool({
      name: 'reminder_complete',
      description: 'Mark a reminder as done, by id (from reminders_list) or exact title.',
      parameters: { id: { type: 'string', description: 'Reminder id' }, title: { type: 'string', description: 'Exact title, when the id is unknown' } },
      output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
      execute: async (args: unknown) => {
        const { id, title } = args as { id?: string; title?: string }
        let target = id
        if (!target && title) { await refresh(); target = cache.reminders.find(r => r.title.trim().toLowerCase() === title.trim().toLowerCase())?.id }
        if (!target) throw new Error('no such reminder')
        await run('complete', target)
        void refresh()
        return 'Done.'
      },
    } as never)), 'dsh-calendar.tool.complete')
  }

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const permission = (kind: 'calendars' | 'reminders'): SourceView['setup'] => [{
      title: `Allow access to ${kind}`,
      steps: [
        `macOS asks once, the first time the helper runs. If it was declined: System Settings → Privacy & Security → ${kind === 'calendars' ? 'Calendars' : 'Reminders'} → enable the app you launched dsh from (a terminal, or the desktop app).`,
        'Then press Refresh.',
      ],
    }]
    const stamp = (): string => cache.at === 0 ? 'not loaded yet' : `refreshed ${agoWords(Math.round((Date.now() - cache.at) / 60000))} ago`
    const calendarView = (): SourceView => {
      const s = readSettings()
      if (cache.denied.calendars) return { status: 'error', summary: 'Calendar access was denied', shared: s.calendarShared, setup: permission('calendars'), actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }] }
      if (cache.error && cache.events.length === 0 && cache.at !== 0) return { status: 'error', summary: cache.error, shared: s.calendarShared, actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }] }
      const t = eventsOn(today()), next = nextEvent(), cur = currentEvent()
      const days = Array.from({ length: daysAhead }, (_, i) => shiftDay(today(), i))
      return {
        status: cache.at === 0 ? 'empty' : 'connected', summary: `${upcoming().filter(e => dayOf(e.start) <= shiftDay(today(), daysAhead)).length} events in the next ${daysAhead} days · ${stamp()}`, shared: s.calendarShared, placeholder: cache.at === 0,
        data: { today: today(), events: cache.events.map(e => ({ id: e.id, title: e.title, start: e.start, end: e.end, allDay: e.allDay, location: e.location, calendar: e.calendar, color: cache.colors[e.calendar] ?? '', status: e.status })) },
        stats: [
          { label: 'Today', value: `${t.length} event${t.length === 1 ? '' : 's'}` },
          { label: cur ? 'Now' : 'Next', value: cur ? cur.title : next ? next.title : '—', delta: cur ? `until ${hhmm(cur.end)}` : next ? `${dayLabel(dayOf(next.start))} ${hhmm(next.start)} · ${inWords(minutesUntil(next.start))}` : undefined },
          { label: 'This week', value: `${upcoming().filter(e => dayOf(e.start) <= shiftDay(today(), 6)).length} events` },
        ],
        lists: days.map(day => ({ title: dayLabel(day), items: eventsOn(day).map(e => ({ primary: e.title, secondary: `${e.allDay ? 'all day' : `${hhmm(e.start)}–${hhmm(e.end)}`}${e.location ? ` · ${e.location.split('\n')[0]}` : ''} · ${e.calendar}` })) })).filter(l => l.items.length > 0).slice(0, 5),
        actions: [
          { id: 'refresh', label: 'Refresh', kind: 'button' },
          { id: 'calendarShared', label: 'Visible to the character', kind: 'toggle', value: s.calendarShared, hint: 'Off hides the agenda from the prompt' },
        ],
      }
    }
    const remindersView = (): SourceView => {
      const s = readSettings()
      if (cache.denied.reminders) return { status: 'error', summary: 'Reminders access was denied', shared: s.remindersShared, setup: permission('reminders'), actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }] }
      const od = overdue(), td = dueToday(), soon = dueSoon()
      return {
        status: cache.at === 0 ? 'empty' : 'connected', summary: `${cache.reminders.length} open · ${stamp()}`, shared: s.remindersShared, placeholder: cache.at === 0,
        data: { today: today(), reminders: cache.reminders.map(r => ({ id: r.id, title: r.title, due: r.due, hasTime: r.hasTime, list: r.list, priority: r.priority, notes: r.notes })) },
        stats: [
          { label: 'Overdue', value: String(od.length), tone: od.length > 0 ? 'down' : 'flat' },
          { label: 'Due today', value: String(td.length) },
          { label: 'Next 7 days', value: String(soon.length) },
        ],
        lists: [
          ...od.length === 0 ? [] : [{ title: 'Overdue', items: od.map(r => ({ primary: r.title, secondary: `${r.due ? dayLabel(dayOf(r.due)) : ''} · ${r.list}` })) }],
          ...td.length === 0 ? [] : [{ title: 'Due today', items: td.map(r => ({ primary: r.title, secondary: `${r.hasTime && r.due ? hhmm(r.due) : 'today'} · ${r.list}` })) }],
          ...soon.length === 0 ? [] : [{ title: 'Coming up', items: soon.slice(0, 12).map(r => ({ primary: r.title, secondary: `${r.due ? dayLabel(dayOf(r.due)) : ''} · ${r.list}` })) }],
          ...undated().length === 0 ? [] : [{ title: 'No date', items: undated().slice(0, 8).map(r => ({ primary: r.title, secondary: r.list })) }],
        ],
        actions: [
          { id: 'add', label: 'Add reminder', kind: 'input', placeholder: 'Buy milk tomorrow 9:00', hint: 'A title, optionally followed by "today", "tomorrow", a date or a time' },
          { id: 'refresh', label: 'Refresh', kind: 'button' },
          { id: 'remindersShared', label: 'Visible to the character', kind: 'toggle', value: s.remindersShared, hint: 'Off hides reminders from the prompt' },
        ],
      }
    }
    /** "Call mum tomorrow 18:00" → title + due. Kept deliberately simple; the model does the clever parsing. */
    const parseQuick = (line: string): { title: string; due: string } => {
      let title = line.trim(), due = ''
      const time = title.match(/\b(\d{1,2}):(\d{2})\s*$/)
      if (time) { title = title.slice(0, time.index).trim(); due = `T${pad(Number(time[1]))}:${time[2]}:00` }
      const date = title.match(/\b(today|tomorrow|\d{4}-\d{2}-\d{2})\s*$/i)
      if (date) { title = title.slice(0, date.index).trim(); const d = date[1]!.toLowerCase(); due = (d === 'today' ? today() : d === 'tomorrow' ? shiftDay(today(), 1) : d) + due }
      else if (due) due = today() + due
      return { title, due }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); return { ok: true } }
      if (action === 'complete') { const id = String(value ?? ''); if (!id) throw new Error('no reminder id'); await run('complete', id); await refresh(); return { ok: true } }
      if (action === 'calendarShared') { writeSettings({ calendarShared: Boolean(value) }); changed('calendar'); return { ok: true } }
      if (action === 'remindersShared') { writeSettings({ remindersShared: Boolean(value) }); changed('reminders'); return { ok: true } }
      if (action === 'add') {
        const { title, due } = parseQuick(String(value ?? ''))
        if (!title) throw new Error('what should the reminder say?')
        const made = await run<{ title: string; list: string; due: string | null }>('add', title, due, '', '')
        await refresh()
        return { ok: true, message: `Added "${made.title}" to ${made.list}${made.due ? ` for ${made.due.slice(0, 16).replace('T', ' ')}` : ''}.` }
      }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const disposers = [registry.register({ id: 'calendar', label: 'Calendar', category: 'calendar', describe: calendarView, act })]
      if (withReminders) disposers.push(registry.register({ id: 'reminders', label: 'Reminders', category: 'tasks', describe: remindersView, act }))
      const notify = (id: string): void => registry.changed(id)
      listeners.add(notify)
      return () => { listeners.delete(notify); for (const d of disposers) d() }
    }, 'dsh-calendar.sources')
  })
}
