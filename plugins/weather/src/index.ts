/*
 * dsh-weather: the weather where the user is, for any dsh session.
 *
 * Open-Meteo, no key. The location is a city name (config, or set from the
 * dsh-gal Data panel), geocoded once; the default is guessed from the
 * system time zone. A short prompt section carries now, today and tomorrow;
 * `weather_lookup` answers about any place or day. Refreshed every half hour.
 */
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'

// ---- the slice of dsh-gal's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  data?: unknown
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  series?: { label: string; unit?: string; points: { day: string; value?: number }[] }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; value?: boolean; hint?: string; placeholder?: string }[]
}
interface GalSources {
  register(source: { id: string; label: string; category: string; describe(): SourceView | Promise<SourceView>; act?(action: string, input: { json?: unknown }): Promise<unknown> | unknown }): () => void
  changed(id: string): void
}
interface ToolsLike { register(tool: unknown): () => void }
interface SystemPromptLike { section(section: { name: string; order: number; text: () => string }): () => void }
type Context = CordisContext & { tools: ToolsLike; systemPrompt: SystemPromptLike }

export const name = 'dsh-weather'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** City or place name; empty = guess from the system time zone. */
  location?: string
  refreshMinutes?: number
  /** 'metric' or 'imperial'. */
  units?: string
}
export const Config: z<Config> = z.object({
  location: z.string().default(''),
  refreshMinutes: z.number().min(5).default(30),
  units: z.string().default('metric'),
})

// ---- storage ----------------------------------------------------------------

interface Place { name: string; admin: string; country: string; latitude: number; longitude: number; timezone: string }
interface Forecast {
  current: { time: string; temperature_2m: number; apparent_temperature: number; relative_humidity_2m: number; weather_code: number; wind_speed_10m: number; precipitation: number; is_day: number }
  hourly: { time: string[]; temperature_2m: number[]; precipitation_probability: number[]; weather_code: number[] }
  daily: { time: string[]; weather_code: number[]; temperature_2m_max: number[]; temperature_2m_min: number[]; precipitation_probability_max: number[]; sunrise: string[]; sunset: string[]; uv_index_max: number[] }
}
interface State { place?: Place; forecast?: Forecast; at?: string; shared: boolean; error?: string }

/*
 * Everything lives in the shared dsh-gal store: `weather/settings` holds the
 * user's choice (`shared`), `weather/state` the geocoded place and the last
 * forecast. The in-memory shape stays one `State`; only where it is read from
 * and written to changed. `~/.dsh/weather/state.json` (or `DSH_WEATHER_DIR`)
 * is imported once on first start and renamed `.migrated`.
 */
interface Settings { shared: boolean }
type Synced = Omit<State, 'shared'>
const dataDir = (): string => process.env['DSH_WEATHER_DIR'] ?? join(homedir(), '.dsh', 'weather')
const settingsDoc = () => openStore().doc<Settings>('weather', 'settings')
const stateDoc = () => openStore().doc<Synced>('weather', 'state')
function readState(): State {
  return { shared: settingsDoc().get()?.shared ?? true, ...stateDoc().get() ?? {} }
}
function writeState(state: State): void {
  const { shared, ...synced } = state
  openStore().transaction(() => { settingsDoc().set({ shared }); stateDoc().set(synced) })
}
/** One-time import of the pre-store `state.json`; a legacy value never overrides what the store already holds. */
function importLegacyState(): boolean {
  return migrateFile(join(dataDir(), 'state.json'), text => {
    const legacy = JSON.parse(text) as Partial<State>
    const { shared, ...synced } = legacy
    openStore().transaction(() => {
      if (settingsDoc().get() === undefined) settingsDoc().set({ shared: shared ?? true })
      if (stateDoc().get() === undefined) stateDoc().set(synced)
    })
  })
}

// ---- Open-Meteo -------------------------------------------------------------

const WMO: Record<number, string> = {
  0: 'clear', 1: 'mostly clear', 2: 'partly cloudy', 3: 'overcast', 45: 'fog', 48: 'freezing fog',
  51: 'light drizzle', 53: 'drizzle', 55: 'heavy drizzle', 56: 'freezing drizzle', 57: 'freezing drizzle',
  61: 'light rain', 63: 'rain', 65: 'heavy rain', 66: 'freezing rain', 67: 'freezing rain',
  71: 'light snow', 73: 'snow', 75: 'heavy snow', 77: 'snow grains', 80: 'light showers', 81: 'showers', 82: 'violent showers',
  85: 'snow showers', 86: 'heavy snow showers', 95: 'thunderstorm', 96: 'thunderstorm with hail', 99: 'thunderstorm with heavy hail',
}
const sky = (code: number): string => WMO[code] ?? `code ${code}`

async function geocode(query: string): Promise<Place> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
  const res = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (!res.ok) throw new Error(`geocoding failed: ${res.status}`)
  const data = await res.json() as { results?: { name: string; admin1?: string; country?: string; latitude: number; longitude: number; timezone: string }[] }
  const hit = data.results?.[0]
  if (!hit) throw new Error(`no place found for "${query}"`)
  return { name: hit.name, admin: hit.admin1 ?? '', country: hit.country ?? '', latitude: hit.latitude, longitude: hit.longitude, timezone: hit.timezone }
}

async function forecast(place: Place, units: string): Promise<Forecast> {
  const params = new URLSearchParams({
    latitude: String(place.latitude), longitude: String(place.longitude), timezone: 'auto', forecast_days: '7',
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,precipitation,is_day',
    hourly: 'temperature_2m,precipitation_probability,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max',
    ...units === 'imperial' ? { temperature_unit: 'fahrenheit', wind_speed_unit: 'mph', precipitation_unit: 'inch' } : {},
  })
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, { signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`forecast failed: ${res.status}`)
  return await res.json() as Forecast
}

/** "Asia/Shanghai" → "Shanghai". A guess for the first run, easy to change. */
const guessLocation = (): string => (Intl.DateTimeFormat().resolvedOptions().timeZone.split('/').pop() ?? '').replace(/_/g, ' ')

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-weather: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-weather: ${message}`)
  const units = config.units === 'imperial' ? 'imperial' : 'metric'
  const deg = units === 'imperial' ? '°F' : '°C'
  const wind = units === 'imperial' ? 'mph' : 'km/h'
  const refreshMs = (config.refreshMinutes ?? 30) * 60_000
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  if (importLegacyState()) log(`imported ${join(dataDir(), 'state.json')} into the store`)

  const r = (n: number): string => String(Math.round(n))
  const hhmm = (iso: string): string => iso.slice(11, 16)
  const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayLabel = (day: string, todayStr: string): string => day === todayStr ? 'Today' : `${WEEKDAY[new Date(`${day}T12:00:00`).getDay()]} ${day.slice(5)}`

  let refreshing: Promise<void> | undefined
  const refresh = (setLocation?: string): Promise<void> => {
    refreshing ??= (async () => {
      const state = readState()
      try {
        if (setLocation !== undefined || !state.place) {
          const query = setLocation ?? (config.location || guessLocation())
          if (!query) throw new Error('no location configured')
          state.place = await geocode(query)
          log(`location: ${state.place.name}, ${state.place.country}`)
        }
        state.forecast = await forecast(state.place, units)
        state.at = new Date().toISOString()
        delete state.error
      } catch (error) {
        state.error = (error as Error).message
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
  }, 'dsh-weather.poll')

  /** Rain worth mentioning in the rest of today: the first hour ≥ 40 % and the peak. */
  const rainAhead = (f: Forecast): string => {
    const nowIdx = f.hourly.time.findIndex(t => t >= f.current.time)
    const todayStr = f.current.time.slice(0, 10)
    const rest = f.hourly.time.map((t, i) => ({ t, p: f.hourly.precipitation_probability[i] ?? 0 })).slice(Math.max(0, nowIdx)).filter(h => h.t.startsWith(todayStr))
    const first = rest.find(h => h.p >= 40)
    if (!first) return ''
    const peak = rest.reduce((a, b) => b.p > a.p ? b : a, first)
    return `${peak.p}% chance of rain ${first.t === peak.t ? `around ${hhmm(first.t)}` : `from ${hhmm(first.t)}`}`
  }

  const summarize = (state: State): string => {
    const f = state.forecast, p = state.place
    if (!f || !p) return ''
    const todayStr = f.current.time.slice(0, 10)
    const i = f.daily.time.indexOf(todayStr)
    const rain = rainAhead(f)
    const parts = [
      `${r(f.current.temperature_2m)}${deg}${Math.abs(f.current.apparent_temperature - f.current.temperature_2m) >= 3 ? ` (feels ${r(f.current.apparent_temperature)}${deg})` : ''}, ${sky(f.current.weather_code)}`,
      i >= 0 ? `high ${r(f.daily.temperature_2m_max[i]!)} / low ${r(f.daily.temperature_2m_min[i]!)}` : '',
      rain, f.current.wind_speed_10m >= 25 ? `wind ${r(f.current.wind_speed_10m)} ${wind}` : '',
      i >= 0 && (f.daily.uv_index_max[i] ?? 0) >= 7 ? `UV ${r(f.daily.uv_index_max[i]!)}` : '',
      i >= 0 ? `sunset ${hhmm(f.daily.sunset[i]!)}` : '',
    ].filter(Boolean)
    const tm = i >= 0 && i + 1 < f.daily.time.length ? `Tomorrow: ${sky(f.daily.weather_code[i + 1]!)}, ${r(f.daily.temperature_2m_min[i + 1]!)}–${r(f.daily.temperature_2m_max[i + 1]!)}${deg}${(f.daily.precipitation_probability_max[i + 1] ?? 0) >= 40 ? `, ${f.daily.precipitation_probability_max[i + 1]}% rain` : ''}.` : ''
    return `Weather in ${p.name} (${hhmm(f.current.time)}): ${parts.join(', ')}. ${tm}`.trim()
  }

  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-weather', order: 9545, text: () => {
    const state = readState()
    if (!state.shared || !state.forecast) return ''
    return `# Weather\n${summarize(state)}\nBring it up only when it matters to what the user is doing (going out, a run, a trip). \`weather_lookup\` has the hourly and 7-day detail, for any place.`
  } }), 'dsh-weather.section')

  const table = (f: Forecast, p: Place): string => {
    const todayStr = f.current.time.slice(0, 10)
    const days = f.daily.time.map((d, i) => `- ${dayLabel(d, todayStr)}: ${sky(f.daily.weather_code[i]!)}, ${r(f.daily.temperature_2m_min[i]!)}–${r(f.daily.temperature_2m_max[i]!)}${deg}, rain ${f.daily.precipitation_probability_max[i]}%, UV ${r(f.daily.uv_index_max[i] ?? 0)}, sun ${hhmm(f.daily.sunrise[i]!)}–${hhmm(f.daily.sunset[i]!)}`)
    const nowIdx = Math.max(0, f.hourly.time.findIndex(t => t >= f.current.time))
    const hours = f.hourly.time.slice(nowIdx, nowIdx + 24).map((t, k) => `${hhmm(t)} ${r(f.hourly.temperature_2m[nowIdx + k]!)}${deg} ${sky(f.hourly.weather_code[nowIdx + k]!)}${(f.hourly.precipitation_probability[nowIdx + k] ?? 0) >= 30 ? ` ${f.hourly.precipitation_probability[nowIdx + k]}%` : ''}`)
    return `${p.name}, ${p.admin ? `${p.admin}, ` : ''}${p.country} (${p.timezone})\nNow: ${r(f.current.temperature_2m)}${deg}, feels ${r(f.current.apparent_temperature)}${deg}, ${sky(f.current.weather_code)}, humidity ${f.current.relative_humidity_2m}%, wind ${r(f.current.wind_speed_10m)} ${wind}\n\nNext 24 h:\n${hours.join('\n')}\n\n7 days:\n${days.join('\n')}`
  }
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'weather_lookup',
    description: 'Current conditions, the next 24 hours and a 7-day forecast. Defaults to the user\'s location; pass a place name for anywhere else.',
    parameters: { location: { type: 'string', description: 'City or place name (optional)' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const query = String((args as { location?: string }).location ?? '').trim()
      if (query === '') {
        const state = readState()
        if (!state.forecast || !state.place || !state.at || Date.now() - Date.parse(state.at) > refreshMs) await refresh()
        const fresh = readState()
        if (!fresh.forecast || !fresh.place) throw new Error(fresh.error ?? 'no forecast yet')
        return table(fresh.forecast, fresh.place)
      }
      const place = await geocode(query)
      return table(await forecast(place, units), place)
    },
  } as never)), 'dsh-weather.tool')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const describe = (): SourceView => {
      const state = readState()
      const f = state.forecast, p = state.place
      const actions: SourceView['actions'] = [
        { id: 'location', label: 'Change location', kind: 'input', placeholder: p ? `${p.name}` : 'City name', hint: 'A city or place name' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'shared', label: 'Visible to the character', kind: 'toggle', value: state.shared, hint: 'Off hides the weather from the prompt' },
      ]
      const setup: SourceView['setup'] = [{ title: 'Where this comes from', steps: [`Open-Meteo, no account. The location was ${config.location ? 'set in the plugin config' : 'guessed from the system time zone'}; change it here any time.`] }]
      if (!f || !p) return { status: state.error ? 'error' : 'empty', summary: state.error ?? 'Loading the forecast…', shared: state.shared, placeholder: true, stats: ['Now', 'High / low', 'Rain', 'Wind'].map(label => ({ label, value: '—' })), setup, actions }
      const todayStr = f.current.time.slice(0, 10)
      const i = Math.max(0, f.daily.time.indexOf(todayStr))
      const nowIdx = Math.max(0, f.hourly.time.findIndex(t => t >= f.current.time))
      const ago = state.at ? Math.round((Date.now() - Date.parse(state.at)) / 60000) : 0
      return {
        status: 'connected', summary: `${p.name}, ${p.country} · ${hhmm(f.current.time)} local · refreshed ${ago} min ago`, shared: state.shared,
        data: {
          place: { name: p.name, country: p.country }, units: { deg, wind },
          current: { time: f.current.time, temp: f.current.temperature_2m, feels: f.current.apparent_temperature, code: f.current.weather_code, text: sky(f.current.weather_code), humidity: f.current.relative_humidity_2m, wind: f.current.wind_speed_10m, isDay: f.current.is_day === 1 },
          hourly: f.hourly.time.slice(nowIdx, nowIdx + 24).map((t, k) => ({ time: t, temp: f.hourly.temperature_2m[nowIdx + k], rain: f.hourly.precipitation_probability[nowIdx + k] ?? 0, code: f.hourly.weather_code[nowIdx + k] })),
          daily: f.daily.time.map((d, k) => ({ day: d, label: dayLabel(d, todayStr), code: f.daily.weather_code[k], text: sky(f.daily.weather_code[k]!), max: f.daily.temperature_2m_max[k], min: f.daily.temperature_2m_min[k], rain: f.daily.precipitation_probability_max[k] ?? 0, sunrise: f.daily.sunrise[k], sunset: f.daily.sunset[k], uv: f.daily.uv_index_max[k] ?? 0 })),
        },
        stats: [
          { label: 'Now', value: `${r(f.current.temperature_2m)}${deg}`, delta: `${sky(f.current.weather_code)} · feels ${r(f.current.apparent_temperature)}${deg}` },
          { label: 'High / low', value: `${r(f.daily.temperature_2m_max[i]!)} / ${r(f.daily.temperature_2m_min[i]!)}${deg}` },
          { label: 'Rain', value: `${f.daily.precipitation_probability_max[i] ?? 0}%`, delta: rainAhead(f) || 'nothing much today' },
          { label: 'Wind', value: `${r(f.current.wind_speed_10m)} ${wind}`, delta: `humidity ${f.current.relative_humidity_2m}%` },
          { label: 'UV', value: r(f.daily.uv_index_max[i] ?? 0) },
          { label: 'Sun', value: `${hhmm(f.daily.sunrise[i]!)} – ${hhmm(f.daily.sunset[i]!)}` },
        ],
        series: [{ label: 'Next 24 hours', unit: deg, points: f.hourly.time.slice(nowIdx, nowIdx + 24).map((t, k) => ({ day: t, value: Math.round(f.hourly.temperature_2m[nowIdx + k]!) })) }],
        lists: [{ title: '7 days', items: f.daily.time.map((d, k) => ({ primary: `${dayLabel(d, todayStr)} · ${sky(f.daily.weather_code[k]!)}`, secondary: `${r(f.daily.temperature_2m_min[k]!)}–${r(f.daily.temperature_2m_max[k]!)}${deg}${(f.daily.precipitation_probability_max[k] ?? 0) >= 30 ? ` · rain ${f.daily.precipitation_probability_max[k]}%` : ''}` })) }],
        setup, actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); const s = readState(); if (s.error) throw new Error(s.error); return { ok: true } }
      if (action === 'location') { const q = String(value ?? '').trim(); if (!q) throw new Error('enter a place name'); await refresh(q); const s = readState(); if (s.error) throw new Error(s.error); return { ok: true, message: `Weather now follows ${s.place?.name}, ${s.place?.country}.` } }
      if (action === 'shared') { const s = readState(); s.shared = Boolean(value); writeState(s); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'weather', label: 'Weather', category: 'location', describe, act })
      const notify = (): void => registry.changed('weather')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-weather.source')
  })
}
