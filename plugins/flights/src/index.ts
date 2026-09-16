/*
 * dsh-flights: the flights the user is on, for any dsh session.
 *
 * AeroDataBox through RapidAPI (a free tier exists, one key pasted once in
 * the Data panel or set in the plugin config). A tracked flight is a number
 * and a departure date; the plugin keeps its latest status (scheduled and
 * revised times, terminal, gate, delay, cancellation) fresh — often around
 * departure, rarely far from it — and drops it two days after it flew. The
 * prompt carries the flights of the next few days; `flight_status` checks
 * any flight, `flight_track` keeps one here. Only the key is a secret
 * (`~/.dsh/flights/key.json`); the rest is in dsh-gal's shared store.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { openStore } from '@dsh-external/dsh-gal/store'

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

export const name = 'dsh-flights'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** RapidAPI key subscribed to AeroDataBox. Usually pasted in the Data panel instead. */
  apiKey?: string
  /** How often flights close to departure are refreshed, in minutes. */
  refreshMinutes?: number
}
export const Config: z<Config> = z.object({
  apiKey: z.string().default(''),
  refreshMinutes: z.number().min(5).default(30),
})

// ---- storage ----------------------------------------------------------------

export interface Leg { iata: string; name: string; city: string; tz: string; scheduled?: string; revised?: string; terminal?: string; gate?: string }
/** What one AeroDataBox answer boils down to. Times are local ISO strings with offset. */
export interface Flight { number: string; airline: string; status: string; dep: Leg; arr: Leg; aircraft?: string; updated?: string }
export interface Tracked { id: string; number: string; date: string; addedAt: string; flight?: Flight; at?: string; error?: string }
interface Settings { shared: boolean }

const dataDir = (): string => process.env['DSH_FLIGHTS_DIR'] ?? join(homedir(), '.dsh', 'flights')
const keyPath = (): string => join(dataDir(), 'key.json')
const settingsDoc = () => openStore().doc<Settings>('flights', 'settings')
const trackedDoc = () => openStore().doc<{ flights: Tracked[] }>('flights', 'tracked')
function readKey(): string {
  try { const raw = JSON.parse(readFileSync(keyPath(), 'utf8')) as { key?: unknown }; return typeof raw.key === 'string' ? raw.key.trim() : '' } catch { return '' }
}
function writeKey(key: string | undefined): void {
  if (!key) { rmSync(keyPath(), { force: true }); return }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(keyPath(), JSON.stringify({ key }), { mode: 0o600 })
}
const readShared = (): boolean => settingsDoc().get()?.shared ?? true
const writeShared = (shared: boolean): void => settingsDoc().set({ shared })
const readTracked = (): Tracked[] => { const f = trackedDoc().get()?.flights; return Array.isArray(f) ? f : [] }
const writeTracked = (flights: Tracked[]): void => trackedDoc().set({ flights })

// ---- AeroDataBox ------------------------------------------------------------

const HOST = 'aerodatabox.p.rapidapi.com'
interface AdbLeg { airport?: { iata?: string; icao?: string; name?: string; shortName?: string; municipalityName?: string; timeZone?: string }; scheduledTime?: { local?: string; utc?: string }; revisedTime?: { local?: string; utc?: string }; predictedTime?: { local?: string }; runwayTime?: { local?: string }; terminal?: string; gate?: string }
interface AdbFlight { number?: string; status?: string; lastUpdatedUtc?: string; airline?: { name?: string; iata?: string }; aircraft?: { model?: string; reg?: string }; departure?: AdbLeg; arrival?: AdbLeg; codeshareStatus?: string }

/** "ke 1234" → "KE1234" */
export const normalizeNumber = (s: string): string => s.toUpperCase().replace(/[^A-Z0-9]/g, '')
const validNumber = (s: string): boolean => /^[A-Z0-9]{2}[A-Z]?\d{1,4}[A-Z]?$/.test(s)
const isoDay = (d: Date): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const todayIso = (): string => isoDay(new Date())
const validIso = (s: unknown): string | undefined => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T12:00:00`)) ? s : undefined
const DAY_MS = 86_400_000
const daysBetween = (a: string, b: string): number => Math.round((Date.parse(`${b}T12:00:00`) - Date.parse(`${a}T12:00:00`)) / DAY_MS)
/** "2026-09-27 09:10+08:00" → "2026-09-27T09:10+08:00" (parseable, sortable). */
const localIso = (s?: string): string | undefined => s ? s.replace(' ', 'T') : undefined

async function lookup(key: string, number: string, date: string): Promise<Flight[]> {
  const url = `https://${HOST}/flights/number/${encodeURIComponent(number)}/${date}?withAircraftImage=false&withLocation=false&dateLocalRole=Departure`
  const res = await fetch(url, { headers: { 'x-rapidapi-key': key, 'x-rapidapi-host': HOST }, signal: AbortSignal.timeout(20_000) })
  if (res.status === 204 || res.status === 404) return []
  if (res.status === 401 || res.status === 403) throw new Error('AeroDataBox rejected the key (not subscribed, or the key is wrong)')
  if (res.status === 429) throw new Error('AeroDataBox quota exhausted for now')
  if (!res.ok) throw new Error(`AeroDataBox ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const raw = await res.json() as unknown
  const list = Array.isArray(raw) ? raw as AdbFlight[] : []
  const leg = (l?: AdbLeg): Leg => ({
    iata: l?.airport?.iata ?? l?.airport?.icao ?? '?', name: l?.airport?.shortName ?? l?.airport?.name ?? '', city: l?.airport?.municipalityName ?? '', tz: l?.airport?.timeZone ?? '',
    scheduled: localIso(l?.scheduledTime?.local), revised: localIso(l?.revisedTime?.local ?? l?.runwayTime?.local ?? l?.predictedTime?.local), terminal: l?.terminal, gate: l?.gate,
  })
  // Codeshares list the same physical flight again under another number; keep the operating one first.
  const sorted = [...list].sort((a, b) => (a.codeshareStatus === 'IsOperator' ? 0 : 1) - (b.codeshareStatus === 'IsOperator' ? 0 : 1))
  return sorted.map(f => ({ number: normalizeNumber(f.number ?? number), airline: f.airline?.name ?? '', status: f.status ?? 'Unknown', dep: leg(f.departure), arr: leg(f.arrival), aircraft: f.aircraft?.model, updated: f.lastUpdatedUtc }))
}

// ---- wording ----------------------------------------------------------------

const hhmm = (iso?: string): string => iso ? iso.slice(11, 16) : '--:--'
const minutesLate = (l: Leg): number => l.scheduled && l.revised ? Math.round((Date.parse(l.revised) - Date.parse(l.scheduled)) / 60_000) : 0
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayLabel = (iso: string): string => { const d = new Date(`${iso}T12:00:00`); return `${WEEKDAY[d.getDay()]} ${d.toLocaleDateString('en', { month: 'short', day: 'numeric' })}` }
/** "on time", "delayed 35 min (dep 09:45)", "departed", "cancelled", … */
export function statusText(f: Flight): string {
  const s = f.status
  const late = minutesLate(f.dep)
  if (s === 'Canceled' || s === 'CanceledUncertain') return 'cancelled'
  if (s === 'Diverted') return 'diverted'
  if (s === 'Arrived') return `arrived${f.arr.revised ? ` ${hhmm(f.arr.revised)}` : ''}${minutesLate(f.arr) >= 15 ? ` (${minutesLate(f.arr)} min late)` : ''}`
  if (s === 'Departed' || s === 'EnRoute' || s === 'Approaching') return `${s === 'Approaching' ? 'landing soon' : 'in the air'}, departed ${hhmm(f.dep.revised ?? f.dep.scheduled)}${f.arr.revised ? `, arriving ${hhmm(f.arr.revised)}` : ''}`
  if (s === 'Boarding' || s === 'GateClosed') return s === 'Boarding' ? 'boarding' : 'gate closed'
  if (late >= 15 || s === 'Delayed') return `delayed${late > 0 ? ` ${late} min, now ${hhmm(f.dep.revised)}` : ''}`
  if (s === 'Unknown') return 'no live status yet'
  return 'on time'
}
const legText = (l: Leg): string => `${l.iata}${l.city ? ` ${l.city}` : ''}${l.terminal ? ` T${l.terminal}` : ''}${l.gate ? ` gate ${l.gate}` : ''}`
export const line = (t: Tracked): string => {
  const f = t.flight
  if (!f) return `- ${t.number} on ${dayLabel(t.date)}: ${t.error ?? 'not looked up yet'}`
  return `- ${f.number}${f.airline ? ` ${f.airline}` : ''}, ${dayLabel(t.date)}: ${legText(f.dep)} ${hhmm(f.dep.scheduled)} → ${legText(f.arr)} ${hhmm(f.arr.scheduled)} (local times), ${statusText(f)}${t.error ? ` · last check failed: ${t.error}` : ''}`
}
const detail = (f: Flight, date: string): string => [
  `${f.number}${f.airline ? ` · ${f.airline}` : ''} · ${dayLabel(date)}${f.aircraft ? ` · ${f.aircraft}` : ''}`,
  `Status: ${statusText(f)} (${f.status})`,
  `Departure: ${f.dep.name || f.dep.iata} (${f.dep.iata}${f.dep.city ? `, ${f.dep.city}` : ''}) scheduled ${hhmm(f.dep.scheduled)}${f.dep.revised && f.dep.revised !== f.dep.scheduled ? `, revised ${hhmm(f.dep.revised)}` : ''}${f.dep.terminal ? `, terminal ${f.dep.terminal}` : ''}${f.dep.gate ? `, gate ${f.dep.gate}` : ''} (${f.dep.tz})`,
  `Arrival: ${f.arr.name || f.arr.iata} (${f.arr.iata}${f.arr.city ? `, ${f.arr.city}` : ''}) scheduled ${hhmm(f.arr.scheduled)}${f.arr.revised && f.arr.revised !== f.arr.scheduled ? `, revised ${hhmm(f.arr.revised)}` : ''}${f.arr.terminal ? `, terminal ${f.arr.terminal}` : ''}${f.arr.gate ? `, gate ${f.arr.gate}` : ''} (${f.arr.tz})`,
  f.updated ? `Data as of ${f.updated.replace(' ', 'T')}` : '',
].filter(Boolean).join('\n')

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (m: string): void => ctx.logger.info(`dsh-flights: ${m}`)
  const warn = (m: string): void => ctx.logger.warn(`dsh-flights: ${m}`)
  const refreshMs = (config.refreshMinutes ?? 30) * 60_000
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  const key = (): string => readKey() || (config.apiKey ?? '').trim()
  const needKey = (): string => { const k = key(); if (!k) throw new Error('no AeroDataBox key yet: paste a RapidAPI key in Connectors → Flights'); return k }

  /** Final states never change again; two days after the date the flight is gone anyway. */
  const final = (t: Tracked): boolean => t.flight !== undefined && ['Arrived', 'Canceled', 'Diverted'].includes(t.flight.status)
  const over = (t: Tracked): boolean => daysBetween(t.date, todayIso()) > 2
  /** Close to departure: from 6 h before the scheduled time until 36 h after the date's start. */
  const near = (t: Tracked): boolean => {
    const dep = t.flight?.dep.scheduled ? Date.parse(t.flight.dep.scheduled) : Date.parse(`${t.date}T00:00:00`)
    return Date.now() >= dep - 6 * 3_600_000 && Date.now() <= Date.parse(`${t.date}T00:00:00`) + 36 * 3_600_000
  }
  const stale = (t: Tracked): boolean => !t.at || Date.now() - Date.parse(t.at) > (near(t) ? refreshMs : 24 * 3_600_000)

  const refreshOne = async (t: Tracked, k: string): Promise<void> => {
    try {
      const hits = await lookup(k, t.number, t.date)
      const hit = hits[0]
      if (!hit) { t.error = `no flight ${t.number} found on ${t.date}`; delete t.flight }
      else { t.flight = hit; delete t.error }
    } catch (error) { t.error = (error as Error).message; warn(`${t.number} ${t.date}: ${t.error}`) }
    t.at = new Date().toISOString()
  }
  let refreshing: Promise<void> | undefined
  const refresh = (force = false): Promise<void> => {
    refreshing ??= (async () => {
      const k = key()
      const flights = readTracked().filter(t => !over(t))
      if (k) for (const t of flights) if (force || (!final(t) && stale(t))) await refreshOne(t, k)
      writeTracked(flights)
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, Math.min(refreshMs, 15 * 60_000))
    return () => clearInterval(timer)
  }, 'dsh-flights.poll')

  const track = async (numberRaw: string, dateRaw: string | undefined): Promise<Tracked> => {
    const number = normalizeNumber(numberRaw)
    if (!validNumber(number)) throw new Error(`"${numberRaw}" does not look like a flight number (e.g. KE1234, MU5051)`)
    const date = validIso(dateRaw) ?? todayIso()
    const flights = readTracked().filter(t => !over(t))
    let t = flights.find(x => x.number === number && x.date === date)
    if (!t) { t = { id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, number, date, addedAt: new Date().toISOString() }; flights.push(t) }
    await refreshOne(t, needKey())
    writeTracked(flights)
    changed()
    log(`tracking ${number} ${date}`)
    return t
  }
  const untrack = (ref: string): Tracked | undefined => {
    const flights = readTracked()
    const needle = normalizeNumber(ref)
    const hit = flights.find(t => t.id === ref) ?? flights.filter(t => t.number === needle).sort((a, b) => a.date.localeCompare(b.date))[0]
    if (!hit) return undefined
    writeTracked(flights.filter(t => t !== hit))
    changed()
    return hit
  }
  const upcoming = (): Tracked[] => readTracked().filter(t => !over(t)).sort((a, b) => a.date.localeCompare(b.date) || (a.flight?.dep.scheduled ?? '').localeCompare(b.flight?.dep.scheduled ?? ''))

  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-flights', order: 9590, text: () => {
    if (!readShared()) return ''
    const soon = upcoming().filter(t => daysBetween(todayIso(), t.date) <= 3)
    const later = upcoming().length - soon.length
    if (!soon.length && !later) return ''
    const lines = soon.map(line).join('\n')
    return `# Flights\n${lines || '(none in the next three days)'}${later ? `\n${later} more tracked further out.` : ''}\nMention a delay, a gate change or a cancellation when it is relevant to the user's day; otherwise leave the flights alone. \`flight_status\` checks any flight by number and date; \`flight_track\` keeps one here.`
  } }), 'dsh-flights.section')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'flight_status',
    description: 'Live status of one flight: scheduled and revised times, terminal, gate, delay or cancellation. Needs the flight number (e.g. KE1234) and the local departure date; today when omitted.',
    parameters: {
      number: { type: 'string', required: true, description: 'Flight number, e.g. "KE1234" or "MU 5051"' },
      date: { type: 'string', description: 'Local departure date, YYYY-MM-DD (default today)' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { number?: unknown; date?: unknown }
      const number = normalizeNumber(String(a.number ?? ''))
      if (!validNumber(number)) throw new Error('flight_status: give a flight number like KE1234')
      const date = validIso(a.date) ?? todayIso()
      const hits = await lookup(needKey(), number, date)
      if (!hits.length) return `No flight ${number} found on ${date}. Check the number and the local departure date.`
      return hits.map(f => detail(f, date)).join('\n\n')
    },
  } as never)), 'dsh-flights.tool.status')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'flight_track',
    description: 'Follow a flight the user is taking: it then appears in your context and in the Connectors panel with live status until two days after it flies. Call it when a booking, an itinerary or the user gives you a flight number and date. `remove: true` stops following it.',
    parameters: {
      number: { type: 'string', required: true, description: 'Flight number, e.g. "KE1234"' },
      date: { type: 'string', description: 'Local departure date, YYYY-MM-DD (default today)' },
      remove: { type: 'boolean', description: 'true to stop following this flight' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { number?: unknown; date?: unknown; remove?: unknown }
      const number = String(a.number ?? '')
      if (a.remove === true) { const gone = untrack(number); return gone ? `No longer following ${gone.number} on ${gone.date}.` : `Not following ${normalizeNumber(number)}.` }
      const t = await track(number, typeof a.date === 'string' ? a.date : undefined)
      return `Following ${t.number} on ${t.date}.\n${t.flight ? detail(t.flight, t.date) : t.error ?? ''}`
    },
  } as never)), 'dsh-flights.tool.track')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const describe = (): SourceView => {
      const hasKey = key() !== ''
      const flights = upcoming()
      const shared = readShared()
      const actions: SourceView['actions'] = [
        { id: 'track', label: 'Track a flight', kind: 'input', placeholder: 'KE1234 2026-09-27', hint: 'Flight number, then the local departure date (today when omitted)' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'key', label: hasKey ? 'Replace the API key' : 'Paste the API key', kind: 'input', placeholder: 'RapidAPI key', hint: 'A RapidAPI key subscribed to AeroDataBox' },
        { id: 'shared', label: 'Visible to the character', kind: 'toggle', value: shared, hint: 'Off hides the flights from the prompt' },
        ...hasKey ? [{ id: 'disconnect', label: 'Forget the key', kind: 'danger' as const, confirm: 'Remove the AeroDataBox key? Tracked flights stay but stop updating.' }] : [],
      ]
      const setup: SourceView['setup'] = [{ title: 'Flight data', steps: [
        'Flight status comes from AeroDataBox on RapidAPI. Sign in at rapidapi.com, open the AeroDataBox API and subscribe to its free Basic plan.',
        'Copy the X-RapidAPI-Key from any code sample on that page and paste it here. The key stays in ~/.dsh/flights/key.json.',
        'Then add a flight by number and date, or let her do it when a booking mail or an itinerary mentions one.',
      ] }]
      const view = flights.map(t => {
        const f = t.flight
        return {
          id: t.id, number: t.number, date: t.date, dateLabel: dayLabel(t.date), airline: f?.airline ?? '', status: f?.status ?? '', statusText: f ? statusText(f) : (t.error ?? 'not looked up yet'),
          tone: !f ? 'flat' : ['Canceled', 'CanceledUncertain', 'Diverted'].includes(f.status) ? 'bad' : (f.status === 'Delayed' || minutesLate(f.dep) >= 15) ? 'warn' : ['Arrived'].includes(f.status) ? 'done' : 'ok',
          delay: f ? minutesLate(f.dep) : 0, aircraft: f?.aircraft, error: t.error, at: t.at, final: final(t),
          dep: f ? { ...f.dep, time: hhmm(f.dep.scheduled), revisedTime: f.dep.revised && f.dep.revised !== f.dep.scheduled ? hhmm(f.dep.revised) : undefined } : undefined,
          arr: f ? { ...f.arr, time: hhmm(f.arr.scheduled), revisedTime: f.arr.revised && f.arr.revised !== f.arr.scheduled ? hhmm(f.arr.revised) : undefined } : undefined,
        }
      })
      const next = flights.find(t => daysBetween(todayIso(), t.date) >= 0 && !final(t))
      const lastAt = flights.map(t => t.at ?? '').sort().pop()
      const ago = lastAt ? Math.round((Date.now() - Date.parse(lastAt)) / 60_000) : undefined
      const summary = !hasKey ? 'No API key yet' : flights.length === 0 ? 'No flights tracked' : `${flights.length} flight${flights.length === 1 ? '' : 's'}${ago !== undefined ? ` · checked ${ago} min ago` : ''}`
      return {
        status: !hasKey ? 'empty' : flights.some(t => t.error && !t.flight) ? 'error' : 'connected', summary, shared, placeholder: !hasKey,
        data: { hasKey, flights: view },
        stats: [
          { label: 'Next flight', value: next?.flight ? `${next.number} ${hhmm(next.flight.dep.revised ?? next.flight.dep.scheduled)}` : next ? next.number : '—', delta: next ? `${dayLabel(next.date)}${next.flight ? ` · ${next.flight.dep.iata} → ${next.flight.arr.iata}` : ''}` : 'nothing coming up' },
          { label: 'Status', value: next?.flight ? statusText(next.flight).split(',')[0]! : '—', tone: next?.flight && (next.flight.status === 'Delayed' || minutesLate(next.flight.dep) >= 15) ? 'down' : 'flat' },
          { label: 'Tracked', value: String(flights.length) },
        ],
        lists: flights.length ? [{ title: 'Tracked flights', items: flights.map(t => ({ primary: `${t.number} · ${dayLabel(t.date)}${t.flight ? ` · ${t.flight.dep.iata} → ${t.flight.arr.iata}` : ''}`, secondary: t.flight ? `${hhmm(t.flight.dep.scheduled)} → ${hhmm(t.flight.arr.scheduled)} · ${statusText(t.flight)}` : t.error })) }] : [],
        setup, actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(true); return { ok: true } }
      if (action === 'key') { const k = String(value ?? '').trim(); if (!k) throw new Error('paste the key'); writeKey(k); await refresh(true); changed(); return { ok: true, message: 'Key saved.' } }
      if (action === 'disconnect') { writeKey(undefined); changed(); return { ok: true, message: 'Key removed.' } }
      if (action === 'track') {
        const [num, date] = String(value ?? '').trim().split(/\s+/)
        if (!num) throw new Error('enter a flight number')
        const t = await track(num, date)
        if (!t.flight) throw new Error(t.error ?? 'flight not found')
        return { ok: true, message: `Following ${t.number} on ${t.date}: ${statusText(t.flight)}.` }
      }
      if (action === 'untrack') { const gone = untrack(String(value ?? '')); if (!gone) throw new Error('no such flight'); return { ok: true, message: `Removed ${gone.number}.` } }
      if (action === 'shared') { writeShared(Boolean(value)); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'flights', label: 'Flights', category: 'travel', describe, act })
      const notify = (): void => registry.changed('flights')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-flights.source')
  })
}
