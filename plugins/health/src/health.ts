/*
 * Apple Health as something she can see.
 *
 * HealthKit has no cloud API: the data only leaves the phone when the user
 * sends it. Three doors, one store: a Health Auto Export / Shortcuts payload
 * pushed to the ingest endpoint, or the Health app's export.zip dropped on
 * the dsh-gal Data panel. Everything collapses into one row per day of a few daily
 * numbers — enough to notice a trend, never a clinical record — kept in the
 * shared dsh-gal store; only the ingest key stays in `~/.dsh/health/`.
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { createInterface } from 'node:readline'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'

/** Daily numbers. Sums are per day; rates are day averages; levels are the last reading. */
export const METRICS = {
  steps: { label: 'Steps', unit: '', agg: 'sum', digits: 0 },
  activeEnergy: { label: 'Active energy', unit: 'kcal', agg: 'sum', digits: 0 },
  exerciseMin: { label: 'Exercise', unit: 'min', agg: 'sum', digits: 0 },
  distanceKm: { label: 'Walk + run', unit: 'km', agg: 'sum', digits: 1 },
  standHours: { label: 'Stand hours', unit: 'h', agg: 'sum', digits: 0 },
  sleepHours: { label: 'Sleep', unit: 'h', agg: 'sum', digits: 1 },
  inBedHours: { label: 'In bed', unit: 'h', agg: 'sum', digits: 1 },
  deepHours: { label: 'Deep sleep', unit: 'h', agg: 'sum', digits: 1 },
  remHours: { label: 'REM sleep', unit: 'h', agg: 'sum', digits: 1 },
  restingHr: { label: 'Resting HR', unit: 'bpm', agg: 'avg', digits: 0 },
  hrAvg: { label: 'Heart rate', unit: 'bpm', agg: 'avg', digits: 0 },
  hrv: { label: 'HRV', unit: 'ms', agg: 'avg', digits: 0 },
  weightKg: { label: 'Weight', unit: 'kg', agg: 'last', digits: 1 },
  vo2max: { label: 'VO2 max', unit: '', agg: 'last', digits: 1 },
} as const
export type Metric = keyof typeof METRICS
const METRIC_NAMES = Object.keys(METRICS) as Metric[]

export type DayRow = Partial<Record<Metric, number>>
export interface Workout { start: string; type: string; minutes: number; energy?: number; distanceKm?: number }
export interface HealthStore {
  version: 1
  /** Whether the summary is shown to the character. Off hides it from the prompt and the tool. */
  shared: boolean
  days: Record<string, DayRow>
  workouts: Workout[]
  syncs: { at: string; source: string; days: number; workouts: number }[]
}

const EMPTY: HealthStore = { version: 1, shared: true, days: {}, workouts: [], syncs: [] }

/** `~/.dsh/health`, or `DSH_HEALTH_DIR` when set. Only the ingest key lives here now. */
export function dataDir(): string {
  return process.env['DSH_HEALTH_DIR'] ?? join(homedir(), '.dsh', 'health')
}

/*
 * Where it is kept: the shared dsh-gal store, as two documents. `health/settings`
 * is the user's choice (shared or not), `health/data` is everything the phone
 * sent. One document for all the days keeps the merge in `commit` a plain
 * object spread, the same as when it was one file.
 */
type Settings = { shared: boolean }
type Data = Pick<HealthStore, 'days' | 'workouts' | 'syncs'>
const settingsDoc = () => openStore().doc<Settings>('health', 'settings')
const dataDoc = () => openStore().doc<Data>('health', 'data')

/** The pre-store `health.json` is folded into the two documents once, then renamed `.migrated`. */
let migrated = false
function migrateOnce(): void {
  if (migrated) return
  migrated = true
  migrateFile(join(dataDir(), 'health.json'), text => {
    const old = { ...structuredClone(EMPTY), ...JSON.parse(text) as Partial<HealthStore> }
    // Whatever the phone has pushed since the store took over wins over the file.
    const current = readHealth()
    writeHealth({
      version: 1,
      shared: settingsDoc().get()?.shared ?? old.shared,
      days: { ...old.days, ...current.days },
      workouts: [...old.workouts, ...current.workouts.filter(w => !old.workouts.some(o => o.start === w.start))].sort((a, b) => a.start.localeCompare(b.start)),
      syncs: [...old.syncs, ...current.syncs].slice(-50),
    })
  })
}

export function readHealth(): HealthStore {
  migrateOnce()
  const settings = settingsDoc().get()
  const data = dataDoc().get()
  return { ...structuredClone(EMPTY), ...settings === undefined ? {} : { shared: settings.shared }, ...data === undefined ? {} : structuredClone(data) }
}

function writeHealth(store: HealthStore): void {
  const s = openStore()
  s.transaction(() => {
    settingsDoc().set({ shared: store.shared })
    dataDoc().set({ days: store.days, workouts: store.workouts, syncs: store.syncs })
  })
}

export function clearHealth(): void {
  const store = readHealth()
  writeHealth({ ...structuredClone(EMPTY), shared: store.shared })
}

export function setHealthShared(shared: boolean): HealthStore {
  const store = readHealth()
  store.shared = shared
  writeHealth(store)
  return store
}

/** A random key for the phone. Created once, kept beside the data. */
export function ingestKey(): string {
  const path = join(dataDir(), 'ingest-key')
  if (existsSync(path)) { const key = readFileSync(path, 'utf8').trim(); if (key !== '') return key }
  const key = Array.from({ length: 24 }, () => 'abcdefghijkmnpqrstuvwxyz23456789'[Math.floor(Math.random() * 32)]).join('')
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(path, `${key}\n`, { mode: 0o600 })
  return key
}

// ---- one batch of samples → day rows ------------------------------------

interface Sample { metric: Metric; day: string; value: number; source: string }

/** Per (day, metric): sums are kept per source and the largest source wins,
 * which is how Health itself avoids counting the phone and the watch twice. */
class Batch {
  private sums = new Map<string, Map<string, number>>()
  private avgs = new Map<string, { total: number; n: number }>()
  private lasts = new Map<string, number>()
  workouts: Workout[] = []
  days = new Set<string>()

  add({ metric, day, value, source }: Sample): void {
    if (!Number.isFinite(value) || !/^\d{4}-\d{2}-\d{2}$/.test(day)) return
    this.days.add(day)
    const key = `${day}|${metric}`
    const agg = METRICS[metric].agg
    if (agg === 'sum') {
      const bySource = this.sums.get(key) ?? new Map<string, number>()
      bySource.set(source, (bySource.get(source) ?? 0) + value)
      this.sums.set(key, bySource)
    } else if (agg === 'avg') {
      const cur = this.avgs.get(key) ?? { total: 0, n: 0 }
      this.avgs.set(key, { total: cur.total + value, n: cur.n + 1 })
    } else this.lasts.set(key, value)
  }

  rows(): Record<string, DayRow> {
    const out: Record<string, DayRow> = {}
    const set = (key: string, value: number): void => {
      const [day, metric] = key.split('|') as [string, Metric]
      ;(out[day] ??= {})[metric] = value
    }
    for (const [key, bySource] of this.sums) set(key, Math.max(...bySource.values()))
    for (const [key, { total, n }] of this.avgs) set(key, total / n)
    for (const [key, value] of this.lasts) set(key, value)
    return out
  }
}

/** Merge a batch: for every (day, metric) the batch carries, the batch wins. Workouts dedupe on start time. */
function commit(batch: Batch, source: string): HealthStore {
  const store = readHealth()
  const rows = batch.rows()
  for (const [day, row] of Object.entries(rows)) store.days[day] = { ...store.days[day], ...row }
  const seen = new Set(store.workouts.map(w => w.start))
  let added = 0
  for (const w of batch.workouts) if (!seen.has(w.start)) { store.workouts.push(w); seen.add(w.start); added += 1 }
  store.workouts.sort((a, b) => a.start.localeCompare(b.start))
  if (store.workouts.length > 2000) store.workouts.splice(0, store.workouts.length - 2000)
  store.syncs.push({ at: new Date().toISOString(), source, days: Object.keys(rows).length, workouts: added })
  if (store.syncs.length > 50) store.syncs.splice(0, store.syncs.length - 50)
  writeHealth(store)
  return store
}

// ---- units and identifiers ---------------------------------------------

const toKg = (v: number, unit: string): number => /lb/i.test(unit) ? v * 0.45359237 : /^g$/i.test(unit) ? v / 1000 : v
const toKm = (v: number, unit: string): number => /^mi/i.test(unit) ? v * 1.609344 : /^m$/i.test(unit) ? v / 1000 : /^ft/i.test(unit) ? v * 0.0003048 : v
const toKcal = (v: number, unit: string): number => /kj/i.test(unit) ? v / 4.184 : v
const toMin = (v: number, unit: string): number => /^s/i.test(unit) ? v / 60 : /^h/i.test(unit) ? v * 60 : v
export const today = (): string => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const dayOf = (date: string): string => String(date).slice(0, 10).replace(/\//g, '-')
const parseDate = (date: string): number => {
  const m = String(date).match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})(?:\.\d+)?\s*(Z|[+-]\d{2}:?\d{2})?$/)
  if (!m) return Date.parse(date)
  const tz = m[3] === undefined ? '' : m[3] === 'Z' ? 'Z' : m[3].replace(/(\d{2})(\d{2})$/, '$1:$2')
  return Date.parse(`${m[1]}T${m[2]}${tz}`)
}
const hoursBetween = (start: string, end: string): number => Math.max(0, (parseDate(end) - parseDate(start)) / 3600000)

/** HealthKit type identifier (Records in export.xml, or a Shortcuts payload) → metric + unit conversion. */
function fromHK(type: string, value: number, unit: string): { metric: Metric; value: number } | undefined {
  const t = type.replace(/^HKQuantityTypeIdentifier|^HKCategoryTypeIdentifier/, '')
  switch (t) {
    case 'StepCount': return { metric: 'steps', value }
    case 'ActiveEnergyBurned': return { metric: 'activeEnergy', value: toKcal(value, unit) }
    case 'AppleExerciseTime': return { metric: 'exerciseMin', value: toMin(value, unit || 'min') }
    case 'DistanceWalkingRunning': return { metric: 'distanceKm', value: toKm(value, unit) }
    case 'AppleStandHour': return { metric: 'standHours', value: 1 }
    case 'RestingHeartRate': return { metric: 'restingHr', value }
    case 'HeartRate': return { metric: 'hrAvg', value }
    case 'HeartRateVariabilitySDNN': return { metric: 'hrv', value }
    case 'BodyMass': return { metric: 'weightKg', value: toKg(value, unit) }
    case 'VO2Max': return { metric: 'vo2max', value }
    default: return undefined
  }
}

/** Sleep records carry a category, not a number: the hours come from the interval. Night sleep lands on the day it ended. */
function sleepSample(value: string, start: string, end: string, source: string): Sample[] {
  const hours = hoursBetween(start, end)
  // A single interval longer than a day is a broken record (a watch that never ended the session), not a long sleep.
  if (hours > 16) return []
  const day = dayOf(end)
  const v = value.replace('HKCategoryValueSleepAnalysis', '')
  if (v === 'InBed') return [{ metric: 'inBedHours', day, value: hours, source }]
  if (v === 'Awake') return []
  const out: Sample[] = [{ metric: 'sleepHours', day, value: hours, source }]
  if (v === 'AsleepDeep') out.push({ metric: 'deepHours', day, value: hours, source })
  if (v === 'AsleepREM') out.push({ metric: 'remHours', day, value: hours, source })
  return out
}

const workoutName = (type: string): string => type.replace(/^HKWorkoutActivityType/, '').replace(/([a-z])([A-Z])/g, '$1 $2')

// ---- door 1: Health Auto Export JSON ------------------------------------

/** Health Auto Export metric names → ours. Sleep and heart rate carry several fields per point. */
const HAE: Record<string, Metric> = {
  step_count: 'steps', active_energy: 'activeEnergy', apple_exercise_time: 'exerciseMin', walking_running_distance: 'distanceKm',
  apple_stand_hour: 'standHours', resting_heart_rate: 'restingHr', heart_rate_variability: 'hrv',
  weight_body_mass: 'weightKg', body_mass: 'weightKg', vo2_max: 'vo2max',
}

type HaePoint = { date?: string; qty?: number; Avg?: number; asleep?: number; inBed?: number; deep?: number; rem?: number; core?: number; sleepEnd?: string; source?: string }
type HaeMetric = { name?: string; units?: string; data?: HaePoint[] }
type HaeWorkout = { name?: string; start?: string; end?: string; duration?: number; activeEnergy?: { qty?: number; units?: string }; activeEnergyBurned?: { qty?: number; units?: string }; distance?: { qty?: number; units?: string } }

function readHae(body: { data?: { metrics?: HaeMetric[]; workouts?: HaeWorkout[] } }, batch: Batch): boolean {
  const metrics = body.data?.metrics ?? []
  const workouts = body.data?.workouts ?? []
  if (metrics.length === 0 && workouts.length === 0) return false
  for (const m of metrics) {
    const name = String(m.name ?? '')
    const unit = String(m.units ?? '')
    for (const p of m.data ?? []) {
      // Health has already merged phone and watch in these totals, so every point goes in one bucket.
      const source = 'hae'
      if (name === 'sleep_analysis') {
        const day = dayOf(p.sleepEnd ?? p.date ?? '')
        const asleep = p.asleep ?? ((p.core ?? 0) + (p.deep ?? 0) + (p.rem ?? 0))
        if (asleep > 0) batch.add({ metric: 'sleepHours', day, value: asleep, source })
        if (p.inBed !== undefined) batch.add({ metric: 'inBedHours', day, value: p.inBed, source })
        if (p.deep !== undefined) batch.add({ metric: 'deepHours', day, value: p.deep, source })
        if (p.rem !== undefined) batch.add({ metric: 'remHours', day, value: p.rem, source })
        continue
      }
      const day = dayOf(p.date ?? '')
      if (name === 'heart_rate') { if (p.Avg !== undefined) batch.add({ metric: 'hrAvg', day, value: p.Avg, source }); continue }
      const metric = HAE[name]
      if (metric === undefined || p.qty === undefined) continue
      const value = metric === 'weightKg' ? toKg(p.qty, unit) : metric === 'distanceKm' ? toKm(p.qty, unit) : metric === 'activeEnergy' ? toKcal(p.qty, unit) : metric === 'exerciseMin' ? toMin(p.qty, unit || 'min') : p.qty
      batch.add({ metric, day, value, source })
    }
  }
  for (const w of workouts) {
    if (!w.start) continue
    const minutes = w.duration !== undefined ? w.duration / 60 : w.end ? hoursBetween(w.start, w.end) * 60 : 0
    const energy = w.activeEnergy ?? w.activeEnergyBurned
    batch.workouts.push({
      start: w.start, type: String(w.name ?? 'Workout'), minutes: Math.round(minutes),
      ...energy?.qty === undefined ? {} : { energy: Math.round(toKcal(energy.qty, energy.units ?? '')) },
      ...w.distance?.qty === undefined ? {} : { distanceKm: Number(toKm(w.distance.qty, w.distance.units ?? '').toFixed(2)) },
    })
  }
  return true
}

// ---- door 2: plain samples (Shortcuts, scripts) --------------------------

type PlainSample = { type?: string; metric?: string; date?: string; start?: string; end?: string; value?: number | string; unit?: string; source?: string }
type PlainWorkout = { type?: string; start?: string; end?: string; minutes?: number; energy?: number; distanceKm?: number }

function readPlain(body: { samples?: PlainSample[]; workouts?: PlainWorkout[] }, batch: Batch): boolean {
  const samples = body.samples ?? []
  const workouts = body.workouts ?? []
  if (samples.length === 0 && workouts.length === 0) return false
  for (const s of samples) {
    const source = String(s.source ?? 'shortcut')
    const type = String(s.type ?? s.metric ?? '')
    const start = s.start ?? s.date ?? ''
    const end = s.end ?? s.start ?? s.date ?? ''
    if (/SleepAnalysis/.test(type) || type === 'sleep') {
      const value = String(s.value ?? 'AsleepUnspecified')
      for (const sample of sleepSample(value, start, end, source)) batch.add(sample)
      continue
    }
    const value = Number(s.value)
    if (Number.isNaN(value)) continue
    if ((METRIC_NAMES as string[]).includes(type)) { batch.add({ metric: type as Metric, day: dayOf(end), value, source }); continue }
    const mapped = fromHK(type, value, String(s.unit ?? ''))
    if (mapped) batch.add({ metric: mapped.metric, day: dayOf(end), value: mapped.value, source })
  }
  for (const w of workouts) {
    if (!w.start) continue
    batch.workouts.push({ start: w.start, type: workoutName(String(w.type ?? 'Workout')), minutes: Math.round(w.minutes ?? (w.end ? hoursBetween(w.start, w.end) * 60 : 0)), ...w.energy === undefined ? {} : { energy: Math.round(w.energy) }, ...w.distanceKm === undefined ? {} : { distanceKm: w.distanceKm } })
  }
  return true
}

/**
 * Form fields (`steps=8123&sleepHours=7.2&date=2026-09-14`) or CSV lines
 * (`steps,8123` / `HKQuantityTypeIdentifierStepCount,2026-09-14 08:00:00 +0800,2026-09-14 08:30:00 +0800,412,count`).
 * A Shortcut can produce either with one action; a missing date means today.
 */
export function parseSimple(text: string, contentType: string): { samples: PlainSample[] } {
  const samples: PlainSample[] = []
  if (contentType.includes('x-www-form-urlencoded')) {
    const params = new URLSearchParams(text)
    const date = params.get('date') ?? today()
    for (const [key, value] of params) {
      if (key === 'date' || key === 'key' || key === 'source' || value.trim() === '') continue
      samples.push({ type: key, date, value: value.trim() })
    }
    return { samples }
  }
  for (const line of text.split(/\r?\n/)) {
    const cells = line.split(',').map(c => c.trim())
    if (cells.length < 2 || cells[0] === '' || /^(type|metric)$/i.test(cells[0] as string)) continue
    if (cells.length >= 4) samples.push({ type: cells[0], start: cells[1], end: cells[2], value: cells[3], unit: cells[4] ?? '' })
    else if (cells.length === 3) samples.push({ type: cells[0], date: cells[1], value: cells[2] })
    else samples.push({ type: cells[0], date: today(), value: cells[1] })
  }
  return { samples }
}

/** One pushed payload, whichever shape it is. Returns what changed. */
export function ingestHealth(body: unknown, source: string): { days: number; workouts: number } {
  if (body === null || typeof body !== 'object') throw new Error('expected a JSON object')
  const batch = new Batch()
  const ok = readHae(body as Parameters<typeof readHae>[0], batch) || readPlain(body as Parameters<typeof readPlain>[0], batch)
  if (!ok) throw new Error('no recognised health data in the payload (expected data.metrics[] or samples[])')
  const store = commit(batch, source)
  const last = store.syncs[store.syncs.length - 1] as HealthStore['syncs'][number]
  return { days: last.days, workouts: last.workouts }
}

// ---- door 3: export.zip from the Health app ------------------------------

/**
 * export.xml is one element per line and can run to a gigabyte, so it is
 * streamed straight out of `unzip` and matched line by line; nothing is
 * parsed as a document.
 */
export async function importHealthExport(zipPath: string): Promise<{ days: number; workouts: number }> {
  const batch = new Batch()
  const attr = (line: string, name: string): string => { const m = line.match(new RegExp(` ${name}="([^"]*)"`)); return m ? m[1] as string : '' }
  const proc = spawn('unzip', ['-p', zipPath, 'apple_health_export/export.xml', 'export.xml'], { stdio: ['ignore', 'pipe', 'pipe'] })
  let stderr = ''
  proc.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })
  const lines = createInterface({ input: proc.stdout, crlfDelay: Infinity })
  let records = 0
  for await (const line of lines) {
    if (line.startsWith('<Record ') || line.startsWith(' <Record ')) {
      records += 1
      const type = attr(line, 'type')
      const source = attr(line, 'sourceName')
      if (type === 'HKCategoryTypeIdentifierSleepAnalysis') {
        for (const s of sleepSample(attr(line, 'value'), attr(line, 'startDate'), attr(line, 'endDate'), source)) batch.add(s)
        continue
      }
      const mapped = fromHK(type, Number(attr(line, 'value')), attr(line, 'unit'))
      if (mapped) batch.add({ metric: mapped.metric, day: dayOf(attr(line, 'endDate')), value: mapped.value, source })
    } else if (line.startsWith('<Workout ') || line.startsWith(' <Workout ')) {
      const duration = Number(attr(line, 'duration'))
      const energy = Number(attr(line, 'totalEnergyBurned'))
      const distance = Number(attr(line, 'totalDistance'))
      batch.workouts.push({
        start: attr(line, 'startDate'), type: workoutName(attr(line, 'workoutActivityType')), minutes: Math.round(toMin(duration, attr(line, 'durationUnit') || 'min')),
        ...energy > 0 ? { energy: Math.round(toKcal(energy, attr(line, 'totalEnergyBurnedUnit'))) } : {},
        ...distance > 0 ? { distanceKm: Number(toKm(distance, attr(line, 'totalDistanceUnit')).toFixed(2)) } : {},
      })
    }
  }
  const code = await new Promise<number>(resolve => proc.on('close', resolve))
  if (code !== 0 && records === 0) throw new Error(`could not read export.xml from the zip${stderr.trim() ? `: ${stderr.trim().split('\n').pop()}` : ''}`)
  if (records === 0 && batch.workouts.length === 0) throw new Error('the zip has no Health records')
  const store = commit(batch, 'export.zip')
  const last = store.syncs[store.syncs.length - 1] as HealthStore['syncs'][number]
  return { days: last.days, workouts: last.workouts }
}

// ---- reading it back -----------------------------------------------------

const shiftDay = (day: string, delta: number): string => { const d = new Date(`${day}T12:00:00`); d.setDate(d.getDate() + delta); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
export const fmt = (metric: Metric, value: number): string => {
  const { digits, unit } = METRICS[metric]
  const n = digits === 0 ? Math.round(value).toLocaleString('en-US') : value.toFixed(digits)
  return unit === '' ? n : `${n} ${unit}`
}

/** Last `days` calendar days ending today, oldest first, including empty days. */
export function healthRows(days: number): { day: string; row: DayRow }[] {
  const store = readHealth()
  const end = today()
  const out: { day: string; row: DayRow }[] = []
  for (let i = days - 1; i >= 0; i -= 1) { const day = shiftDay(end, -i); out.push({ day, row: store.days[day] ?? {} }) }
  return out
}

function average(rows: { row: DayRow }[], metric: Metric): number | undefined {
  const values = rows.map(r => r.row[metric]).filter((v): v is number => v !== undefined)
  if (values.length === 0) return undefined
  return METRICS[metric].agg === 'last' ? values[values.length - 1] : values.reduce((a, b) => a + b, 0) / values.length
}

export interface HealthOverview {
  shared: boolean
  connected: boolean
  firstDay?: string
  lastDay?: string
  dayCount: number
  lastSync?: HealthStore['syncs'][number]
  /** 14 days ending today. */
  rows: { day: string; row: DayRow }[]
  /** Metric → this week's average and last week's. */
  weeks: Partial<Record<Metric, { now?: number; before?: number }>>
  workouts: Workout[]
  metrics: typeof METRICS
}

export function healthOverview(): HealthOverview {
  const store = readHealth()
  const days = Object.keys(store.days).sort()
  const week = healthRows(7)
  const before = healthRows(14).slice(0, 7)
  const weeks: HealthOverview['weeks'] = {}
  for (const metric of METRIC_NAMES) {
    const now = average(week, metric), prev = average(before, metric)
    if (now !== undefined || prev !== undefined) weeks[metric] = { ...now === undefined ? {} : { now }, ...prev === undefined ? {} : { before: prev } }
  }
  return {
    shared: store.shared, connected: days.length > 0, dayCount: days.length,
    ...days.length === 0 ? {} : { firstDay: days[0] as string, lastDay: days[days.length - 1] as string },
    ...store.syncs.length === 0 ? {} : { lastSync: store.syncs[store.syncs.length - 1] as HealthStore['syncs'][number] },
    rows: healthRows(14), weeks, workouts: store.workouts.slice(-10).reverse(), metrics: METRICS,
  }
}

/** Deviations worth a word, against a 28-day baseline. Empty most days, which is the point. */
export function healthNotable(): string[] {
  const store = readHealth()
  if (Object.keys(store.days).length < 3) return []
  const rows = healthRows(28)
  const notes: string[] = []
  const baseline = (metric: Metric, exclude: string): number | undefined => average(rows.filter(r => r.day !== exclude && r.row[metric] !== undefined), metric)
  const lastNight = [...rows].reverse().find(r => r.row.sleepHours !== undefined)
  if (lastNight && (lastNight.day === today() || lastNight.day === shiftDay(today(), -1))) {
    const h = lastNight.row.sleepHours as number
    const base = baseline('sleepHours', lastNight.day)
    if (h < 5.5) notes.push(`Short night: ${fmt('sleepHours', h)} asleep (${lastNight.day === today() ? 'last night' : 'the night before'})`)
    else if (base !== undefined && h < base - 1.5) notes.push(`Slept ${fmt('sleepHours', h)}, about ${(base - h).toFixed(1)} h under the usual`)
    else if (base !== undefined && h > base + 1.5) notes.push(`Long sleep: ${fmt('sleepHours', h)}, well over the usual ${fmt('sleepHours', base)}`)
  }
  const yesterday = shiftDay(today(), -1)
  const y = store.days[yesterday]
  if (y?.steps !== undefined) {
    const base = baseline('steps', yesterday)
    if (base !== undefined && base > 2000 && y.steps < base * 0.4) notes.push(`Yesterday was still: ${fmt('steps', y.steps)} steps against a usual ${fmt('steps', base)}`)
    if (base !== undefined && y.steps > Math.max(base * 1.8, 12000)) notes.push(`Yesterday was a big day on foot: ${fmt('steps', y.steps)} steps`)
  }
  const recentRhr = average(rows.slice(-3).filter(r => r.row.restingHr !== undefined), 'restingHr')
  const baseRhr = average(rows.slice(0, -3).filter(r => r.row.restingHr !== undefined), 'restingHr')
  if (recentRhr !== undefined && baseRhr !== undefined && recentRhr >= baseRhr + 5) notes.push(`Resting heart rate has been up: ${fmt('restingHr', recentRhr)} over the last three days vs a baseline of ${fmt('restingHr', baseRhr)}`)
  const recentHrv = average(rows.slice(-3).filter(r => r.row.hrv !== undefined), 'hrv')
  const baseHrv = average(rows.slice(0, -3).filter(r => r.row.hrv !== undefined), 'hrv')
  if (recentHrv !== undefined && baseHrv !== undefined && recentHrv <= baseHrv * 0.75) notes.push(`HRV has dipped: ${fmt('hrv', recentHrv)} over the last three days vs a baseline of ${fmt('hrv', baseHrv)}`)
  const lastWorkout = store.workouts[store.workouts.length - 1]
  if (lastWorkout && store.workouts.length >= 4) {
    const gap = Math.round((Date.parse(today()) - Date.parse(lastWorkout.start.slice(0, 10))) / 86400000)
    const starts = store.workouts.slice(-8).map(w => Date.parse(w.start.slice(0, 10)))
    const usualGap = (starts[starts.length - 1]! - starts[0]!) / 86400000 / Math.max(1, starts.length - 1)
    if (gap >= Math.max(7, usualGap * 3)) notes.push(`No workout for ${gap} days; they used to come every ${Math.round(usualGap)} or so`)
  }
  return notes.slice(0, 3)
}

/**
 * The prompt section: this week against last, last night, recent workouts.
 * Silent when there is nothing, so an unconnected install costs no tokens.
 */
export function healthSection(): string {
  const store = readHealth()
  if (!store.shared || Object.keys(store.days).length === 0) return ''
  const o = healthOverview()
  const lines: string[] = []
  const headline: Metric[] = ['steps', 'sleepHours', 'exerciseMin', 'activeEnergy', 'restingHr', 'hrv', 'weightKg']
  for (const metric of headline) {
    const w = o.weeks[metric]
    if (w?.now === undefined) continue
    const delta = w.before === undefined || w.before === 0 ? '' : ` (last week ${fmt(metric, w.before)})`
    lines.push(METRICS[metric].agg === 'last' ? `- ${METRICS[metric].label}: ${fmt(metric, w.now)} latest${delta}` : `- ${METRICS[metric].label}: ${fmt(metric, w.now)} avg this week${delta}`)
  }
  const last = [...o.rows].reverse().find(r => r.row.sleepHours !== undefined)
  if (last) lines.push(`- Last recorded night (${last.day}): ${fmt('sleepHours', last.row.sleepHours as number)} asleep${last.row.deepHours !== undefined ? `, ${fmt('deepHours', last.row.deepHours)} deep` : ''}`)
  const todayRow = store.days[today()]
  if (todayRow?.steps !== undefined) lines.push(`- Today so far: ${fmt('steps', todayRow.steps)} steps${todayRow.exerciseMin !== undefined ? `, ${fmt('exerciseMin', todayRow.exerciseMin)} exercise` : ''}`)
  const recent = o.workouts.slice(0, 3).map(w => `${w.start.slice(0, 10)} ${w.type} ${w.minutes} min`)
  if (recent.length > 0) lines.push(`- Recent workouts: ${recent.join('; ')}`)
  const notable = healthNotable()
  if (lines.length === 0) return ''
  return [
    '# The user\'s health data (Apple Health, synced by the user)',
    `Data covers ${o.firstDay} to ${o.lastDay}${o.lastSync ? `, last sync ${o.lastSync.at.slice(0, 16).replace('T', ' ')}` : ''}. Daily totals only.`,
    ...lines,
    ...notable.length === 0 ? [] : ['', 'Worth noticing today:', ...notable.map(n => `- ${n}`)],
    '',
    'Use it the way a friend who noticed would: mention a trend when it is relevant or clearly worth a word, ask before digging in, and never diagnose. `health_lookup` returns the day-by-day numbers when you need them.',
  ].join('\n')
}

/** The tool: day-by-day rows as a compact table. */
export function healthTable(days: number, only?: Metric[]): string {
  const store = readHealth()
  if (!store.shared) return 'Health data is not shared with you right now.'
  if (Object.keys(store.days).length === 0) return 'No health data has been synced yet.'
  const rows = healthRows(Math.max(1, Math.min(90, days)))
  const metrics = (only && only.length > 0 ? only : METRIC_NAMES).filter(m => rows.some(r => r.row[m] !== undefined))
  if (metrics.length === 0) return `No values for those metrics in the last ${days} days.`
  const head = ['day', ...metrics.map(m => `${METRICS[m].label}${METRICS[m].unit ? ` (${METRICS[m].unit})` : ''}`)]
  const body = rows.filter(r => metrics.some(m => r.row[m] !== undefined)).map(r => [r.day, ...metrics.map(m => r.row[m] === undefined ? '' : (METRICS[m].digits === 0 ? String(Math.round(r.row[m] as number)) : (r.row[m] as number).toFixed(METRICS[m].digits)))])
  const workouts = store.workouts.filter(w => w.start.slice(0, 10) >= (rows[0] as { day: string }).day)
  return [
    `| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...body.map(r => `| ${r.join(' | ')} |`),
    ...workouts.length === 0 ? [] : ['', 'Workouts:', ...workouts.map(w => `- ${w.start.slice(0, 16).replace('T', ' ')} ${w.type}, ${w.minutes} min${w.energy ? `, ${w.energy} kcal` : ''}${w.distanceKm ? `, ${w.distanceKm} km` : ''}`)],
  ].join('\n')
}
