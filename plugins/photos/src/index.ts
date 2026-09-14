/*
 * dsh-photos: what the user has been photographing, for any dsh session.
 *
 * The Photos library is read through a small Swift helper compiled on first
 * use (Xcode command-line tools required), after the one-time macOS
 * permission prompt. The agent gets a short, metadata-only prompt section
 * (counts per day, trip-like clusters by rounded location — never pixels),
 * tools to list recent assets and per-day counts, and `photos_thumbnail`,
 * which writes a JPEG a vision-capable model can then look at. With dsh-gal
 * loaded, an activity strip, thumbnails and albums show up in its Data panel.
 */
import { execFile } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'

const execFileAsync = promisify(execFile)
const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

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

export const name = 'dsh-photos'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Days of history to cache (the panel strip and the tools' default window). */
  days?: number
  /** Minutes between refreshes of the cache. */
  refreshMinutes?: number
}
export const Config: z<Config> = z.object({
  days: z.number().step(1).min(7).max(365).default(30),
  refreshMinutes: z.number().min(1).default(30),
})

// ---- storage and the helper -------------------------------------------------

interface Asset { id: string; created: string | null; mediaType: 'image' | 'video' | 'other'; width: number; height: number; favorite: boolean; duration?: number; lat?: number; lon?: number }
interface Album { title: string; count: number; kind: 'smart' | 'user' }
interface Settings { photosShared: boolean }

/** Helper binary and thumbnails stay here (machine-local); settings live in the shared store. */
const dataDir = (): string => process.env['DSH_PHOTOS_DIR'] ?? join(homedir(), '.dsh', 'photos')
const thumbsDir = (): string => join(dataDir(), 'thumbs')
const DEFAULT_SETTINGS: Settings = { photosShared: true }
const settingsDoc = () => openStore().doc<Settings>('photos', 'settings')
/** One-time import of the old `settings.json` into the store (renamed `.migrated` afterwards). */
function importLegacySettings(log: (m: string) => void): void {
  const file = join(dataDir(), 'settings.json')
  if (migrateFile(file, text => {
    const old = JSON.parse(text) as Partial<Settings>
    settingsDoc().patch({ photosShared: old.photosShared ?? true }, DEFAULT_SETTINGS)
  })) log(`imported ${file} into the store`)
}
function readSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...settingsDoc().get() }
}
function writeSettings(patch: Partial<Settings>): Settings {
  return settingsDoc().patch(patch, DEFAULT_SETTINGS)
}

/** The helper binary: rebuilt when missing or older than its source. */
async function ensureHelper(log: (m: string) => void): Promise<string> {
  const bin = join(dataDir(), 'bin', 'pkit')
  const src = join(PKG_ROOT, 'helper', 'pkit.swift')
  const plist = join(PKG_ROOT, 'helper', 'Info.plist')
  const stale = !existsSync(bin) || (existsSync(src) && statSync(src).mtimeMs > statSync(bin).mtimeMs)
  if (!stale) return bin
  if (!existsSync(src)) throw new Error(`helper source missing at ${src}`)
  mkdirSync(dirname(bin), { recursive: true })
  log('compiling the Photos helper (first run)…')
  try {
    await execFileAsync('xcrun', ['swiftc', '-O', '-o', bin, src, '-framework', 'Photos', '-framework', 'AppKit', '-Xlinker', '-sectcreate', '-Xlinker', '__TEXT', '-Xlinker', '__info_plist', '-Xlinker', plist], { timeout: 300_000, maxBuffer: 4 * 1024 * 1024 })
  } catch (error) {
    throw new Error(`could not compile the Photos helper (Xcode command-line tools installed? run: xcode-select --install): ${(error as { stderr?: string }).stderr?.split('\n').find(l => l.includes('error')) ?? String(error)}`)
  }
  // An ad-hoc signature gives TCC a stable identity to remember the answer under.
  try { await execFileAsync('codesign', ['-s', '-', '--force', '--identifier', 'dev.dsh.photos.pkit', bin], { timeout: 60_000 }) } catch (error) { log(`codesign skipped: ${String(error)}`) }
  return bin
}

// ---- small helpers ----------------------------------------------------------

const pad = (n: number): string => String(n).padStart(2, '0')
const localIso = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
const dayOf = (iso: string): string => iso.slice(0, 10)
const today = (): string => dayOf(localIso(new Date()))
const shiftDay = (day: string, n: number): string => { const d = new Date(`${day}T12:00:00`); d.setDate(d.getDate() + n); return dayOf(localIso(d)) }
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const dayLabel = (day: string): string => day === today() ? 'today' : day === shiftDay(today(), -1) ? 'yesterday' : `${WEEKDAY[new Date(`${day}T12:00:00`).getDay()]} ${day.slice(5)}`
const agoWords = (min: number): string => min < 60 ? `${min} min` : min < 60 * 36 ? `${Math.round(min / 60)} h` : `${Math.round(min / 1440)} d`
const plural = (n: number, word: string): string => `${n} ${word}${n === 1 ? '' : 's'}`
const mmss = (s: number): string => `${Math.floor(s / 60)}:${pad(Math.round(s % 60))}`
/** A localIdentifier ("ABCD-1234/L0/001") as a file name. */
const safeId = (id: string): string => id.replace(/[^A-Za-z0-9_-]+/g, '_').slice(0, 120)
const roundLoc = (n: number): number => Math.round(n * 100) / 100

/** Days with location, grouped by rounded (0.01°) spot: a run of consecutive days at one spot is a trip-like cluster. */
interface Cluster { lat: number; lon: number; days: string[]; count: number }
function clusters(assets: Asset[]): Cluster[] {
  const bySpot = new Map<string, { lat: number; lon: number; days: Map<string, number> }>()
  for (const a of assets) {
    if (a.lat === undefined || a.lon === undefined || a.created === null) continue
    const lat = roundLoc(a.lat), lon = roundLoc(a.lon), key = `${lat},${lon}`
    const spot = bySpot.get(key) ?? { lat, lon, days: new Map<string, number>() }
    spot.days.set(dayOf(a.created), (spot.days.get(dayOf(a.created)) ?? 0) + 1)
    bySpot.set(key, spot)
  }
  const out: Cluster[] = []
  for (const spot of bySpot.values()) {
    const days = [...spot.days.keys()].sort()
    let run: string[] = []
    const flush = (): void => { if (run.length > 0) out.push({ lat: spot.lat, lon: spot.lon, days: run, count: run.reduce((n, d) => n + (spot.days.get(d) ?? 0), 0) }); run = [] }
    for (const day of days) { if (run.length > 0 && shiftDay(run[run.length - 1]!, 1) !== day) flush(); run.push(day) }
    flush()
  }
  return out.sort((a, b) => b.count - a.count)
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-photos: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-photos: ${message}`)
  const days = config.days ?? 30
  const refreshMs = (config.refreshMinutes ?? 30) * 60_000
  importLegacySettings(log)

  // The cache is what the prompt section reads; sections are synchronous.
  const cache = { assets: [] as Asset[], albums: [] as Album[], at: 0, error: '', denied: false }
  const listeners = new Set<(id: string) => void>()
  const changed = (id: string): void => { for (const fn of listeners) fn(id) }

  async function run<T>(command: string, ...args: string[]): Promise<T> {
    const bin = await ensureHelper(log)
    try {
      const { stdout } = await execFileAsync(bin, [command, ...args], { timeout: 120_000, maxBuffer: 32 * 1024 * 1024 })
      return JSON.parse(stdout) as T
    } catch (error) {
      const stderr = String((error as { stderr?: string }).stderr ?? '').trim()
      if (stderr.startsWith('denied:photos')) { cache.denied = true; throw new Error('photo library access denied') }
      throw new Error(stderr || String(error))
    }
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      try {
        cache.assets = await run<Asset[]>('recent', String(days))
        cache.denied = false
        try { cache.albums = await run<Album[]>('albums') } catch { /* albums are decoration */ }
        cache.error = ''
      } catch (error) { cache.error = (error as Error).message; warn(cache.error) }
      cache.at = Date.now()
      changed('photos')
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-photos.poll')

  // ---- views over the cache --------------------------------------------------
  const since = (n: number): Asset[] => { const from = shiftDay(today(), -(n - 1)); return cache.assets.filter(a => a.created !== null && dayOf(a.created) >= from) }
  const perDay = (n: number): { day: string; count: number }[] => {
    const counts = new Map<string, number>()
    for (const a of since(n)) if (a.created !== null) counts.set(dayOf(a.created), (counts.get(dayOf(a.created)) ?? 0) + 1)
    return Array.from({ length: n }, (_, i) => shiftDay(today(), i - (n - 1))).map(day => ({ day, count: counts.get(day) ?? 0 }))
  }
  const assetLine = (a: Asset): string => {
    const size = a.width && a.height ? `${a.width}×${a.height}` : ''
    const loc = a.lat !== undefined && a.lon !== undefined ? `@ ${roundLoc(a.lat)},${roundLoc(a.lon)}` : ''
    return [a.created?.slice(0, 16).replace('T', ' ') ?? 'undated', a.mediaType === 'video' ? `video ${a.duration ? mmss(a.duration) : ''}`.trim() : 'photo', size, loc, a.favorite ? '♥' : '', `(id ${a.id})`].filter(Boolean).join(' ')
  }

  // ---- what the agent sees (metadata only, never pixels) ---------------------
  const section = (): string => {
    if (!readSettings().photosShared || cache.denied || cache.at === 0) return ''
    const week = since(7)
    const lines: string[] = ['# The user\'s photo library (metadata only)']
    if (week.length === 0) lines.push(`No photos in the last 7 days; ${plural(since(days).length, 'photo')} in the last ${days} days.`)
    else {
      const busiest = perDay(7).filter(d => d.count > 0).sort((a, b) => b.count - a.count).slice(0, 3)
      const videos = week.filter(a => a.mediaType === 'video').length
      lines.push(`${plural(week.length, 'photo')} in the last 7 days${videos > 0 ? ` (${plural(videos, 'video')})` : ''}; ${busiest.map(d => { const l = dayLabel(d.day); return `${d.count} ${l === 'today' || l === 'yesterday' ? l : `on ${l}`}` }).join(', ')}.`)
    }
    const trips = clusters(since(days)).filter(c => c.days.length >= 2 || c.count >= 8).slice(0, 2)
    for (const c of trips) lines.push(`A trip-like cluster of ${plural(c.count, 'photo')} on ${c.days.length === 1 ? c.days[0] : `${c.days[0]}…${c.days[c.days.length - 1]}`} around ${c.lat},${c.lon} (lat,lon; no place name resolved).`)
    lines.push('', 'Bring this up only when it fits, e.g. asking about a day that was full of pictures. `photos_recent` lists assets, `photos_days` gives per-day counts, and `photos_thumbnail` saves a small JPEG you can view if you can read images.')
    return lines.join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-photos', order: 9560, text: section }), 'dsh-photos.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'photos_recent',
    description: `Recent photos and videos from the user's library (metadata only): id, taken date, type, size, rounded lat/lon when present, favorite. Newest first. Default: last 7 days, 50 items.`,
    parameters: { days: { type: 'number', description: `Days back to include (1–${days}; larger windows are fetched live)` }, limit: { type: 'number', description: 'Max items, default 50, cap 200' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { days: d, limit } = args as { days?: number; limit?: number }
      const n = Math.max(1, Math.min(365, Math.round(Number(d) || 7)))
      const cap = Math.max(1, Math.min(200, Math.round(Number(limit) || 50)))
      if (cache.at === 0) await refresh()
      const list = n <= days ? since(n) : await run<Asset[]>('recent', String(n))
      if (list.length === 0) return `No photos in the last ${plural(n, 'day')}.`
      return [`${plural(list.length, 'item')} in the last ${plural(n, 'day')}${list.length > cap ? `, first ${cap}` : ''}:`, ...list.slice(0, cap).map(a => `- ${assetLine(a)}`)].join('\n')
    },
  } as never)), 'dsh-photos.tool.recent')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'photos_days',
    description: `How many photos and videos the user took on each day, oldest first. Default: last ${days} days. Days with nothing are listed as 0.`,
    parameters: { days: { type: 'number', description: `Days back (1–${days})` } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const n = Math.max(1, Math.min(days, Math.round(Number((args as { days?: number }).days) || days)))
      if (cache.at === 0) await refresh()
      const rows = perDay(n)
      const total = rows.reduce((s, r) => s + r.count, 0)
      return [`${plural(total, 'item')} over the last ${plural(n, 'day')}:`, ...rows.map(r => `- ${r.day} (${WEEKDAY[new Date(`${r.day}T12:00:00`).getDay()]}): ${r.count}`)].join('\n')
    },
  } as never)), 'dsh-photos.tool.days')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'photos_thumbnail',
    description: 'Save a small JPEG of one photo (by id from photos_recent) to ~/.dsh/photos/thumbs/ and return its absolute path. If you can read or present image files, open that path to actually look at the picture; describe it to the user only after you have.',
    parameters: { id: { type: 'string', required: true, description: 'Asset id from photos_recent' }, maxPx: { type: 'number', description: 'Longest side in pixels, default 768, cap 2048' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { id, maxPx } = args as { id: string; maxPx?: number }
      if (!id?.trim()) throw new Error('id is required')
      const px = Math.max(64, Math.min(2048, Math.round(Number(maxPx) || 768)))
      mkdirSync(thumbsDir(), { recursive: true })
      const path = join(thumbsDir(), `${safeId(id)}-${px}.jpg`)
      const made = await run<{ width: number; height: number; bytes: number }>('thumb', id.trim(), String(px), path)
      return `Saved ${made.width}×${made.height} JPEG (${Math.max(1, Math.round(made.bytes / 1024))} KB) to ${path}`
    },
  } as never)), 'dsh-photos.tool.thumbnail')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const permission: SourceView['setup'] = [{
      title: 'Allow access to Photos',
      steps: [
        'macOS asks once, the first time the helper runs. If it was declined: System Settings → Privacy & Security → Photos → enable "pkit" (or the app you launched dsh from) with Full Access.',
        'Then press Refresh.',
      ],
    }]
    const stamp = (): string => cache.at === 0 ? 'not loaded yet' : `refreshed ${agoWords(Math.round((Date.now() - cache.at) / 60000))} ago`
    const view = (): SourceView => {
      const s = readSettings()
      const shared = { id: 'photosShared', label: 'Visible to the character', kind: 'toggle' as const, value: s.photosShared, hint: 'Off hides the day summaries from the prompt; images are never sent' }
      if (cache.denied) return { status: 'error', summary: 'Photos access was denied', shared: s.photosShared, setup: permission, actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }, shared] }
      if (cache.error && cache.at !== 0) return { status: 'error', summary: cache.error, shared: s.photosShared, setup: cache.error.includes('compile') ? [{ title: 'Install the Xcode command-line tools', steps: ['Run `xcode-select --install` in a terminal.', 'Then press Refresh.'] }] : undefined, actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }, shared] }
      const week = since(7), month = since(30)
      const videos = month.filter(a => a.mediaType === 'video').length, favs = month.filter(a => a.favorite).length
      return {
        status: cache.at === 0 ? 'empty' : 'connected', summary: `${plural(week.length, 'photo')} this week · ${plural(month.length, 'photo')} in 30 days · ${stamp()}`, shared: s.photosShared, placeholder: cache.at === 0,
        data: {
          days: perDay(30),
          recent: cache.assets.slice(0, 60).map(a => ({ id: a.id, at: a.created, type: a.mediaType, w: a.width, h: a.height, fav: a.favorite, hasLocation: a.lat !== undefined, duration: a.duration ?? null })),
          albums: cache.albums.map(a => ({ title: a.title, count: a.count })),
        },
        stats: [
          { label: 'Last 7 days', value: String(week.length) },
          { label: 'Last 30 days', value: String(month.length) },
          { label: 'Videos', value: String(videos) },
          { label: 'Favorites', value: String(favs) },
        ],
        series: [{ label: 'Photos per day', unit: 'photos', points: perDay(30).map(d => ({ day: d.day, value: d.count })) }],
        setup: cache.at === 0 ? permission : undefined,
        actions: [{ id: 'refresh', label: 'Refresh', kind: 'button' }, shared],
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const body = (input.json ?? {}) as { value?: unknown; id?: unknown }
      if (action === 'refresh') { await refresh(); return { ok: true } }
      if (action === 'photosShared') { writeSettings({ photosShared: Boolean(body.value) }); changed('photos'); return { ok: true } }
      if (action === 'thumb') {
        const id = String(body.id ?? '')
        if (!id) throw new Error('no asset id')
        mkdirSync(thumbsDir(), { recursive: true })
        const path = join(thumbsDir(), `${safeId(id)}-256.jpg`)
        if (!existsSync(path)) await run('thumb', id, '256', path)
        return { dataUrl: `data:image/jpeg;base64,${readFileSync(path).toString('base64')}` }
      }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'photos', label: 'Photos', category: 'media', describe: view, act })
      const notify = (id: string): void => registry.changed(id)
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-photos.sources')
  })
}
