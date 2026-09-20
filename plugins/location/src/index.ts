/*
 * dsh-location: where the user is, for any dsh session.
 *
 * A fix comes from CoreLocation through a small Swift helper compiled on
 * first use (Xcode command-line tools required) and reverse-geocoded with
 * CLGeocoder; the user can also pin a place by name (Open-Meteo geocoding)
 * and mark the current spot as home. The agent gets a one-line prompt section
 * (place, distance from home, time zone when it differs), `location_now` and
 * `location_history`. With Aibo loaded it shows up in the Data panel.
 */
import { execFile } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
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

export const name = 'dsh-location'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Minutes between location refreshes. */
  refreshMinutes?: number
  /** Within this many km of home counts as "at home". */
  homeRadiusKm?: number
}
export const Config: z<Config> = z.object({
  refreshMinutes: z.number().min(1).default(15),
  homeRadiusKm: z.number().min(0.05).default(0.5),
})

// ---- storage ----------------------------------------------------------------

interface Place { name: string; locality: string; subLocality: string; administrativeArea: string; country: string; isoCountryCode: string; timeZone: string }
interface Fix { lat: number; lon: number; accuracy: number; at: string; place?: Place; source: 'device' | 'manual' }
interface HistoryEntry { lat: number; lon: number; name: string; first: string; last: string; visits: number }
/** What the user chose: `store.doc('location', 'settings')`. */
interface Settings {
  shared: boolean
  home?: { lat: number; lon: number; name: string }
  /** A place the user pinned by name; while set, the device is not asked. */
  manual?: { lat: number; lon: number; place: Place }
}
/** What the Mac reported: `store.doc('location', 'state')`. */
interface Fixes {
  current?: Fix
  history: HistoryEntry[]
  error?: string
  /** What the helper refused: the permission, or Location Services as a whole. */
  denied?: 'location' | 'services'
}
type State = Settings & Fixes

/** Only the compiled helper still lives here (`bin/`); the data is in Aibo's store. */
const dataDir = (): string => process.env['DSH_LOCATION_DIR'] ?? join(homedir(), '.dsh', 'location')
const settingsDoc = () => openStore().doc<Settings>('location', 'settings')
const stateDoc = () => openStore().doc<Fixes>('location', 'state')
const split = (state: State): { settings: Settings; fixes: Fixes } => {
  const { shared, home, manual, ...fixes } = state
  const settings: Settings = { shared }
  if (home) settings.home = home
  if (manual) settings.manual = manual
  return { settings, fixes }
}
function readState(): State {
  return { shared: true, history: [], ...settingsDoc().get(), ...stateDoc().get() }
}
function writeState(state: State): void {
  const { settings, fixes } = split(state)
  openStore().transaction(() => { settingsDoc().set(settings); stateDoc().set(fixes) })
}
/** Import `state.json` from before the store existed, once (the file is renamed `.migrated`). */
function importLegacy(): boolean {
  return migrateFile(join(dataDir(), 'state.json'), text => {
    const old = JSON.parse(text) as Partial<State>
    if (settingsDoc().get() !== undefined || stateDoc().get() !== undefined) return
    writeState({ shared: true, history: [], ...old })
  })
}

/**
 * The helper binary, kept inside a minimal .app bundle: CoreLocation only
 * shows its permission prompt (and lists the client in System Settings) for
 * something it can name. Rebuilt when missing or older than its source.
 */
async function ensureHelper(log: (m: string) => void): Promise<string> {
  const app = join(dataDir(), 'bin', 'lkit.app', 'Contents')
  const bin = join(app, 'MacOS', 'lkit')
  const src = join(PKG_ROOT, 'helper', 'lkit.swift')
  const plist = join(PKG_ROOT, 'helper', 'Info.plist')
  const stale = !existsSync(bin) || (existsSync(src) && statSync(src).mtimeMs > statSync(bin).mtimeMs)
  if (!stale) return bin
  if (!existsSync(src)) throw new Error(`helper source missing at ${src}`)
  mkdirSync(dirname(bin), { recursive: true })
  log('compiling the CoreLocation helper (first run)…')
  try {
    await execFileAsync('xcrun', ['swiftc', '-O', '-o', bin, src, '-framework', 'CoreLocation', '-Xlinker', '-sectcreate', '-Xlinker', '__TEXT', '-Xlinker', '__info_plist', '-Xlinker', plist], { timeout: 300_000, maxBuffer: 4 * 1024 * 1024 })
  } catch (error) {
    throw new Error(`could not compile the CoreLocation helper (Xcode command-line tools installed? run: xcode-select --install): ${(error as { stderr?: string }).stderr?.split('\n').find(l => l.includes('error')) ?? String(error)}`)
  }
  copyFileSync(plist, join(app, 'Info.plist'))
  // An ad-hoc signature gives TCC a stable identity to remember the answer under.
  try { await execFileAsync('codesign', ['-s', '-', '--force', '--deep', '--identifier', 'dev.dsh.location.lkit', dirname(app)], { timeout: 60_000 }) } catch (error) { log(`codesign skipped: ${String(error)}`) }
  return bin
}

// ---- geography --------------------------------------------------------------

const toRad = (d: number): number => d * Math.PI / 180
/** Great-circle distance in km. */
function distanceKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const dLat = toRad(b.lat - a.lat), dLon = toRad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}
/** History buckets: ~500 m cells. */
const cell = (n: number): number => Math.round(Math.round(n / 0.005) * 5) / 1000
const sameCell = (a: { lat: number; lon: number }, b: { lat: number; lon: number }): boolean => cell(a.lat) === cell(b.lat) && cell(a.lon) === cell(b.lon)
const km = (n: number): string => n < 1 ? `${Math.round(n * 1000)} m` : n < 10 ? `${n.toFixed(1)} km` : `${Math.round(n)} km`
const coords = (p: { lat: number; lon: number }): string => `${p.lat.toFixed(5)}, ${p.lon.toFixed(5)}`

/** The short name of a place: sub-locality or the placemark name, then the town. */
const placeName = (p: Place | undefined, fallback: { lat: number; lon: number }): string => p?.subLocality || p?.name || p?.locality || coords(fallback)
const placeLine = (p: Place | undefined): string => p ? [p.locality || p.name, p.administrativeArea && p.administrativeArea !== p.locality ? p.administrativeArea : '', p.country].filter(Boolean).join(', ') : ''

const minutesAgo = (iso: string): number => Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000))
const agoWords = (min: number): string => min < 1 ? 'just now' : min < 60 ? `${min} min ago` : min < 60 * 36 ? `${Math.round(min / 60)} h ago` : `${Math.round(min / 1440)} d ago`
const systemTimeZone = (): string => Intl.DateTimeFormat().resolvedOptions().timeZone

async function geocodeName(query: string): Promise<{ lat: number; lon: number; place: Place }> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!res.ok) throw new Error(`geocoding failed: ${res.status}`)
  const data = await res.json() as { results?: { name: string; admin1?: string; country?: string; country_code?: string; latitude: number; longitude: number; timezone: string }[] }
  const hit = data.results?.[0]
  if (!hit) throw new Error(`no place found for "${query}"`)
  return { lat: hit.latitude, lon: hit.longitude, place: { name: hit.name, locality: hit.name, subLocality: '', administrativeArea: hit.admin1 ?? '', country: hit.country ?? '', isoCountryCode: (hit.country_code ?? '').toUpperCase(), timeZone: hit.timezone } }
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-location: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-location: ${message}`)
  const refreshMs = (config.refreshMinutes ?? 15) * 60_000
  const homeRadius = config.homeRadiusKm ?? 0.5
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  if (importLegacy()) log('imported state.json into the store')

  async function run<T>(command: string, ...args: string[]): Promise<T> {
    const bin = await ensureHelper(log)
    try {
      const { stdout } = await execFileAsync(bin, [command, ...args], { timeout: 40_000, maxBuffer: 1024 * 1024 })
      return JSON.parse(stdout) as T
    } catch (error) {
      const stderr = String((error as { stderr?: string }).stderr ?? '').trim()
      if (stderr.startsWith('denied:services')) throw Object.assign(new Error('Location Services is turned off'), { denied: 'services' })
      if (stderr.startsWith('denied:location')) throw Object.assign(new Error(stderr.includes('no answer') ? 'waiting for the location permission prompt' : 'location access denied'), { denied: 'location' })
      throw new Error(stderr || String(error))
    }
  }

  /** Records a fix as the current one and folds it into the history of places. */
  const record = (state: State, fix: Fix): void => {
    const prev = state.current
    const now = new Date().toISOString()
    const entry = state.history.find(h => sameCell(h, fix))
    const moved = !prev || !sameCell(prev, fix)
    if (entry) {
      entry.last = now
      if (moved) entry.visits += 1
      if (fix.place && (entry.name === coords(entry) || !entry.name)) entry.name = placeName(fix.place, fix)
    } else {
      state.history.push({ lat: cell(fix.lat), lon: cell(fix.lon), name: placeName(fix.place, fix), first: now, last: now, visits: 1 })
    }
    state.history.sort((a, b) => b.last.localeCompare(a.last))
    if (state.history.length > 200) state.history.length = 200
    state.current = fix
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      const state = readState()
      try {
        if (state.manual) {
          record(state, { lat: state.manual.lat, lon: state.manual.lon, accuracy: 0, at: new Date().toISOString(), place: state.manual.place, source: 'manual' })
        } else {
          const raw = await run<{ lat: number; lon: number; accuracy: number; at: string }>('fix')
          const fix: Fix = { ...raw, source: 'device' }
          // Reuse the last placemark when we have not really moved; otherwise ask Apple, and live without it if that fails.
          const prev = state.current
          if (prev?.place && prev.source === 'device' && distanceKm(prev, fix) < 0.2) fix.place = prev.place
          else {
            try { fix.place = await run<Place>('geocode', String(fix.lat), String(fix.lon)) }
            catch (error) { warn(`reverse geocoding failed: ${(error as Error).message}`) }
          }
          record(state, fix)
        }
        delete state.error
        delete state.denied
      } catch (error) {
        state.error = (error as Error).message
        const denied = (error as { denied?: State['denied'] }).denied
        if (denied) state.denied = denied; else delete state.denied
        warn(state.error)
      }
      writeState(state)
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-location.poll')

  // ---- what the agent sees ---------------------------------------------------
  const fromHome = (state: State): { km: number; atHome: boolean } | undefined => {
    if (!state.current || !state.home) return undefined
    const d = distanceKm(state.current, state.home)
    return { km: d, atHome: d <= homeRadius }
  }
  const describeNow = (state: State): string => {
    const c = state.current
    if (!c) return ''
    const p = c.place
    const parts = [
      p ? `${placeLine(p)}${p.subLocality ? ` (${p.subLocality})` : p.name && p.name !== p.locality ? ` (${p.name})` : ''}` : coords(c),
    ]
    const h = fromHome(state)
    if (h) parts.push(h.atHome ? 'at home' : `${km(h.km)} from home${state.home?.name ? ` (${state.home.name})` : ''}`)
    if (p?.timeZone && p.timeZone !== systemTimeZone()) parts.push(`time zone ${p.timeZone}`)
    if (c.source === 'manual') parts.push('set by hand')
    return parts.join(', ')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-location', order: 9570, text: () => {
    const state = readState()
    if (!state.shared || !state.current) return ''
    const age = minutesAgo(state.current.at)
    return `# Location\nLocation: ${describeNow(state)}${age > 120 ? ` (as of ${agoWords(age)})` : ''}.\nUse it for anything local: directions, nearby places, weather, what time it is for the user. \`location_now\` has the coordinates and \`location_history\` where they have been.`
  } }), 'dsh-location.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'location_now',
    description: 'Where the user is right now: place, coordinates, accuracy, how old the fix is, and the distance from home when home is set.',
    parameters: {},
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async () => {
      let state = readState()
      if (!state.current || minutesAgo(state.current.at) * 60_000 > refreshMs) { await refresh(); state = readState() }
      const c = state.current
      if (!c) throw new Error(state.error ?? 'no location yet')
      const lines = [
        `Place: ${describeNow(state) || coords(c)}`,
        `Coordinates: ${coords(c)}${c.accuracy > 0 ? ` (±${Math.round(c.accuracy)} m)` : ' (set by name, no accuracy)'}`,
        `Fix: ${agoWords(minutesAgo(c.at))}, ${c.source === 'device' ? 'from this Mac' : 'set by the user'}`,
      ]
      if (c.place?.timeZone) lines.push(`Time zone: ${c.place.timeZone}${c.place.timeZone !== systemTimeZone() ? ` (system is ${systemTimeZone()})` : ''}`)
      if (state.home) lines.push(`Home: ${state.home.name} (${coords(state.home)}), ${km(distanceKm(c, state.home))} away`)
      if (state.error) lines.push(`Note: the last refresh failed: ${state.error}`)
      return lines.join('\n')
    },
  } as never)), 'dsh-location.tool.now')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'location_history',
    description: 'Distinct places the user has been (about 500 m cells), most recent first, with first and last seen. days: how far back, default 7.',
    parameters: { days: { type: 'number', description: 'Look back this many days (default 7, max 365)' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const days = Math.min(365, Math.max(1, Number((args as { days?: number }).days ?? 7) || 7))
      const state = readState()
      const since = Date.now() - days * 86_400_000
      const items = state.history.filter(h => Date.parse(h.last) >= since)
      if (items.length === 0) return `No places recorded in the last ${days} day${days === 1 ? '' : 's'}.`
      const fmt = (iso: string): string => iso.slice(0, 16).replace('T', ' ')
      return items.map(h => `- ${h.name} (${coords(h)}) · first ${fmt(h.first)} · last ${fmt(h.last)} · ${h.visits} visit${h.visits === 1 ? '' : 's'}${state.home ? ` · ${km(distanceKm(h, state.home))} from home` : ''}`).join('\n')
    },
  } as never)), 'dsh-location.tool.history')

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const setupFor = (denied: State['denied']): SourceView['setup'] => [{
      title: denied === 'services' ? 'Turn on Location Services' : 'Allow location access',
      steps: denied === 'services'
        ? ['System Settings → Privacy & Security → Location Services → turn the switch at the top on.', 'Then press Refresh.']
        : [
          'macOS asks once, the first time the helper runs; the prompt names "lkit". If it was declined or never answered: System Settings → Privacy & Security → Location Services → enable lkit.',
          'Location Services must be on for the whole Mac (the switch at the top of that page).',
          'Then press Refresh. Or pin a place by name below instead — no permission needed.',
        ],
    }]
    const describe = (): SourceView => {
      const state = readState()
      const c = state.current
      const actions: SourceView['actions'] = [
        { id: 'setHome', label: 'Set as home', kind: 'button', hint: 'Remember the current place as home' },
        { id: 'location', label: 'Set location', kind: 'input', placeholder: 'City or place name', hint: 'Pin a place by name instead of using this Mac; "auto" goes back to the device' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'locationShared', label: 'Visible to the character', kind: 'toggle', value: state.shared, hint: 'Off hides your location from the prompt' },
      ]
      if (!c) {
        return {
          status: state.denied ? 'error' : state.error ? 'error' : 'empty',
          summary: state.denied === 'services' ? 'Location Services is off' : state.denied ? state.error ?? 'Location access was denied' : state.error ?? 'Finding this Mac…',
          shared: state.shared, placeholder: true,
          stats: ['Where', 'Since', 'From home', 'Accuracy'].map(label => ({ label, value: '—' })),
          setup: setupFor(state.denied ?? 'location'), actions,
        }
      }
      const h = fromHome(state)
      const here = state.history.find(e => sameCell(e, c))
      const age = minutesAgo(c.at)
      return {
        status: state.denied && c.source === 'device' && age > 60 ? 'error' : 'connected',
        summary: `${placeLine(c.place) || coords(c)} · ${c.source === 'manual' ? 'pinned' : `fix ${agoWords(age)}`}${state.error ? ` · ${state.error}` : ''}`,
        shared: state.shared,
        data: {
          current: { lat: c.lat, lon: c.lon, accuracy: c.accuracy, at: c.at, source: c.source, place: c.place ?? null },
          home: state.home, manual: Boolean(state.manual), systemTimeZone: systemTimeZone(),
          history: state.history.slice(0, 20),
          distanceFromHomeKm: h?.km,
        },
        stats: [
          { label: 'Where', value: placeName(c.place, c), delta: placeLine(c.place) || undefined },
          { label: 'Since', value: here ? agoWords(minutesAgo(here.first)).replace(/ ago$/, '') : '—', delta: here && here.visits > 1 ? `${here.visits} visits` : undefined },
          { label: 'From home', value: h ? (h.atHome ? 'At home' : km(h.km)) : 'Not set', delta: state.home?.name },
          { label: 'Accuracy', value: c.accuracy > 0 ? `±${Math.round(c.accuracy)} m` : 'by name', delta: c.place?.timeZone && c.place.timeZone !== systemTimeZone() ? c.place.timeZone : undefined },
        ],
        lists: state.history.length > 1 ? [{ title: 'Recent places', items: state.history.slice(0, 8).map(e => ({ primary: e.name, secondary: `${agoWords(minutesAgo(e.last))} · ${e.visits} visit${e.visits === 1 ? '' : 's'}` })) }] : [],
        setup: state.denied ? setupFor(state.denied) : [{ title: 'Where this comes from', steps: ['CoreLocation on this Mac (Wi-Fi positioning), reverse-geocoded by Apple. Refreshed every few minutes; distinct places are kept in the Aibo store.'] }],
        actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); const s = readState(); if (s.error && !s.current) throw new Error(s.error); return { ok: true } }
      if (action === 'locationShared') { const s = readState(); s.shared = Boolean(value); writeState(s); changed(); return { ok: true } }
      if (action === 'setHome') {
        const s = readState()
        if (!s.current) throw new Error('no location to call home yet')
        s.home = { lat: s.current.lat, lon: s.current.lon, name: placeName(s.current.place, s.current) }
        writeState(s); changed()
        return { ok: true, message: `Home is now ${s.home.name}.` }
      }
      if (action === 'location') {
        const q = String(value ?? '').trim()
        const s = readState()
        if (q === '' || /^(auto|device|here|clear)$/i.test(q)) { delete s.manual; writeState(s); await refresh(); return { ok: true, message: 'Back to this Mac\'s location.' } }
        const found = await geocodeName(q)
        s.manual = found
        writeState(s)
        await refresh()
        return { ok: true, message: `Location pinned to ${found.place.name}, ${found.place.country}.` }
      }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: 'location', label: 'Location', category: 'location', describe, act })
      const notify = (): void => registry.changed('location')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-location.source')
  })
}
