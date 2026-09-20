/*
 * dsh-health: the user's Apple Health numbers, for any dsh session.
 *
 * Standalone it gives the agent a prompt section (this week against last)
 * and a `health_lookup` tool, and listens on the LAN for what the phone
 * pushes. With Aibo loaded it also registers itself as a data source, so
 * the Data panel can show the numbers, take an export.zip, and print the
 * setup the phone needs.
 */
import { createServer, type IncomingMessage, type Server, type ServerResponse } from 'node:http'
import { networkInterfaces } from 'node:os'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { METRICS, clearHealth, fmt, healthNotable, healthOverview, healthSection, healthTable, importHealthExport, ingestHealth, ingestKey, parseSimple, setHealthShared, type Metric } from './health.js'

// ---- the slice of Aibo's contract this plugin uses ----------------------
// (Kept local on purpose: dsh-health must not depend on aibo.)
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean
  /** True when stats and series are a preview of what will appear, not data. */
  placeholder?: boolean
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  series?: { label: string; unit?: string; points: { day: string; value?: number }[] }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger'; accept?: string; value?: boolean; confirm?: string; hint?: string }[]
}
interface AiboSources {
  register(source: { id: string; label: string; category: string; describe(): SourceView | Promise<SourceView>; act?(action: string, input: { json?: unknown; raw?: Buffer; file?: string; contentType: string; query: URLSearchParams }): Promise<unknown> | unknown }): () => void
  changed(id: string): void
}
interface ToolsLike { register(tool: unknown): () => void }
interface SystemPromptLike { section(section: { name: string; order: number; text: () => string }): () => void }
type Context = CordisContext & { tools: ToolsLike; systemPrompt: SystemPromptLike }

export const name = 'dsh-health'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** LAN port the phone pushes to (0.0.0.0). 0 disables the listener. */
  ingestPort?: number
}
export const Config: z<Config> = z.object({
  ingestPort: z.number().step(1).min(0).max(65_535).default(4890),
})

const SOURCE_ID = 'apple-health'

/**
 * Addresses a phone can plausibly reach: the Mac's own network interfaces
 * (en*, Wi‑Fi first) and a Tailscale address (100.64/10). VPN tunnels, VM
 * bridges and container networks are skipped, or the list is mostly noise.
 */
function lanAddresses(): { label: string; address: string }[] {
  const out: { label: string; address: string }[] = []
  const tailnet = (ip: string): boolean => { const [a, b] = ip.split('.').map(Number) as [number, number]; return a === 100 && b >= 64 && b <= 127 }
  for (const [name, list] of Object.entries(networkInterfaces())) {
    for (const iface of list ?? []) {
      if (iface.family !== 'IPv4' || iface.internal) continue
      if (/^en\d+$/.test(name)) out.push({ label: name === 'en0' ? 'Wi‑Fi / Ethernet' : `Network (${name})`, address: iface.address })
      else if (tailnet(iface.address)) out.push({ label: 'Tailscale', address: iface.address })
    }
  }
  return out.sort((a, b) => (a.label.startsWith('Wi') ? 0 : a.label === 'Tailscale' ? 1 : 2) - (b.label.startsWith('Wi') ? 0 : b.label === 'Tailscale' ? 1 : 2)).slice(0, 3)
}

const readBody = (req: IncomingMessage, limit: number): Promise<Buffer> => new Promise((resolve, reject) => {
  const chunks: Buffer[] = []
  let size = 0
  req.on('data', (chunk: Buffer) => { size += chunk.length; if (size > limit) { reject(new Error('payload too large')); req.destroy() } else chunks.push(chunk) })
  req.on('end', () => resolve(Buffer.concat(chunks)))
  req.on('error', reject)
})

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-health: ${message}`)
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }

  // ---- what the agent sees --------------------------------------------------
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-health', order: 9530, text: () => healthSection() }), 'dsh-health.section')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'health_lookup',
    description: 'Day-by-day Apple Health numbers the user has synced (steps, sleep, exercise, heart rate, HRV, weight, workouts). Use it when the conversation turns to how they slept, moved or feel; the summary in your context already covers this week.',
    parameters: {
      days: { type: 'number', description: 'How many days back from today (1–90, default 14)' },
      metrics: { type: 'array', items: { type: 'string' }, description: `Limit to these metrics: ${Object.keys(METRICS).join(', ')}` },
    },
    output: { schema: { type: 'string' }, render: (_args: unknown, value: unknown) => [{ type: 'text', text: String(value) }] },
    execute: async (args: unknown) => {
      const { days, metrics } = args as { days?: number; metrics?: string[] }
      const only = (metrics ?? []).filter((m): m is Metric => m in METRICS)
      return healthTable(Math.round(days ?? 14), only)
    },
  } as never)), 'dsh-health.tool')

  // ---- what the phone pushes ------------------------------------------------
  const ingestPort = config.ingestPort ?? 4890
  ctx.effect(() => {
    if (ingestPort === 0) return () => {}
    let server: Server | undefined = createServer((req, res) => {
      handleIngest(req, res).catch((error: unknown) => { if (!res.headersSent) res.writeHead(500); res.end(String(error)) })
    })
    server.on('error', (error: unknown) => { ctx.logger.warn(`dsh-health: ingest listener failed on ${ingestPort}: ${String(error)}`); server = undefined })
    server.listen(ingestPort, '0.0.0.0', () => log(`ingest listener on 0.0.0.0:${ingestPort} (key in ~/.dsh/health/ingest-key)`))
    return () => { server?.close(); server = undefined }
  }, 'dsh-health.ingest')

  async function handleIngest(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? '/', 'http://0.0.0.0')
    const key = req.headers['x-health-key'] ?? url.searchParams.get('key') ?? ''
    if (key !== ingestKey()) { res.writeHead(401, { 'content-type': 'text/plain' }); res.end('bad key'); return }
    if (req.method === 'GET') { res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ok: true, days: healthOverview().dayCount })); return }
    if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
    try {
      const raw = await readBody(req, 64 * 1024 * 1024)
      const contentType = String(req.headers['content-type'] ?? '')
      const text = raw.toString('utf8')
      // JSON from Health Auto Export or a script; form fields or CSV from a Shortcut.
      const body: unknown = contentType.includes('json') || /^\s*[{[]/.test(text) ? JSON.parse(text) : parseSimple(text, contentType)
      const result = ingestHealth(body, url.searchParams.get('source') ?? 'phone')
      log(`ingested ${result.days} day(s), ${result.workouts} workout(s) from ${req.socket.remoteAddress ?? '?'}`)
      changed()
      res.writeHead(200, { 'content-type': 'application/json' }); res.end(JSON.stringify({ ok: true, ...result }))
    } catch (error) {
      res.writeHead(400, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
    }
  }

  // ---- what Aibo shows, when it is there ---------------------------------
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const describe = (): SourceView => {
      const o = healthOverview()
      const stat = (metric: Metric, label = METRICS[metric].label): SourceView['stats'] extends (infer T)[] | undefined ? T | undefined : never => {
        const w = o.weeks[metric]
        if (w?.now === undefined) return undefined
        const value = fmt(metric, w.now)
        if (w.before === undefined || w.before === 0) return { label, value }
        const pct = (w.now - w.before) / w.before * 100
        // Tone is about good or bad, not up or down: a lower resting heart rate is the better direction.
        const better = metric === 'restingHr' ? pct < 0 : pct > 0
        const tone = Math.abs(pct) < 3 ? 'flat' : better ? 'up' : 'down'
        return { label, value, delta: `${pct > 0 ? '+' : ''}${pct.toFixed(0)}% vs last week`, tone }
      }
      const placeholder = !o.connected
      // Before anything is synced the panel still shows the shape of what will come: the same cards, empty.
      const stats = placeholder
        ? (['steps', 'sleepHours', 'restingHr', 'hrv', 'exerciseMin', 'weightKg'] as Metric[]).map(m => ({ label: METRICS[m].label, value: '—' }))
        : (['steps', 'sleepHours', 'exerciseMin', 'restingHr', 'hrv', 'weightKg'] as Metric[]).map(m => stat(m)).filter((s): s is NonNullable<typeof s> => s !== undefined)
      const series = (['steps', 'sleepHours'] as Metric[]).filter(m => placeholder || o.rows.some(r => r.row[m] !== undefined))
        .map(m => ({ label: METRICS[m].label, unit: METRICS[m].unit, points: o.rows.map(r => ({ day: r.day, ...r.row[m] === undefined ? {} : { value: Number((r.row[m] as number).toFixed(METRICS[m].digits)) } })) }))
      const notable = healthNotable()
      const key = ingestKey()
      const hosts = lanAddresses()
      const endpoint = (host: string): string => `http://${host}:${ingestPort}/ingest?key=${key}`
      const ago = o.lastSync ? Math.round((Date.now() - Date.parse(o.lastSync.at)) / 60000) : undefined
      const summary = !o.connected ? 'Nothing synced yet'
        : `${o.dayCount} day${o.dayCount === 1 ? '' : 's'} · ${o.firstDay} → ${o.lastDay}${ago === undefined ? '' : ` · synced ${ago < 60 ? `${ago} min` : ago < 2880 ? `${Math.round(ago / 60)} h` : `${Math.round(ago / 1440)} d`} ago via ${o.lastSync?.source}`}`
      return {
        status: o.connected ? 'connected' : 'empty', summary, shared: o.shared, placeholder, stats, series,
        lists: [
          ...notable.length === 0 ? [] : [{ title: 'Worth noticing', items: notable.map(n => ({ primary: n })) }],
          ...o.workouts.length === 0 ? [] : [{ title: 'Recent workouts', items: o.workouts.map(w => ({ primary: `${w.type} · ${w.minutes} min`, secondary: `${w.start.slice(0, 16).replace('T', ' ')}${w.energy ? ` · ${w.energy} kcal` : ''}${w.distanceKm ? ` · ${w.distanceKm} km` : ''}` })) }],
        ],
        setup: [
          {
            title: 'Automatic sync from the phone',
            steps: [
              'Easiest: the Health Auto Export app. Automations → + → REST API. URL: the endpoint below. Method POST, Export format JSON, Aggregate interval Days, Period Last 7 days. Pick the metrics (steps, sleep, resting heart rate, HRV, active energy, exercise time, weight) and enable a daily schedule.',
              'Without an app: a Shortcut. For each metric add Find Health Samples (today) → Calculate Statistics (Sum, or Average for heart rate) → then one Get Contents of URL: POST, Request Body Form, fields named steps, sleepHours, restingHr, hrv, activeEnergy, exerciseMin, weightKg. Run it from a Personal Automation (Time of Day, e.g. 23:30).',
              `The phone must reach this Mac: same Wi‑Fi, or a tailnet address. ${ingestPort === 0 ? 'The listener is disabled (ingestPort: 0).' : `The listener is on port ${ingestPort}; open http://<mac>:${ingestPort}/ingest?key=… in Safari on the phone to check reachability.`}`,
            ],
            fields: [
              ...hosts.length === 0 ? [{ label: 'Endpoint', value: endpoint('<this-mac>') }] : hosts.map(host => ({ label: host.label, value: endpoint(host.address) })),
              { label: 'Key', value: key, secret: true },
            ],
          },
          { title: 'Backfill from an export', steps: ['On the iPhone: Health → profile picture → Export All Health Data. AirDrop the export.zip here and drop it on Import.'] },
        ],
        actions: [
          { id: 'import', label: 'Import export.zip', kind: 'upload', accept: '.zip,application/zip', hint: 'Whole history, safe to repeat' },
          { id: 'shared', label: 'Visible to the character', kind: 'toggle', value: o.shared, hint: 'Off keeps the data but hides it from the prompt and the tool' },
          { id: 'clear', label: 'Delete all health data', kind: 'danger', confirm: 'Delete every synced day and workout? The phone can push them again.' },
        ],
      }
    }
    const act = async (action: string, input: { json?: unknown; raw?: Buffer; file?: string; contentType: string }): Promise<unknown> => {
      if (action === 'import') {
        if (!input.file) throw new Error('send the export.zip as the request body')
        const result = await importHealthExport(input.file)
        log(`imported ${result.days} day(s), ${result.workouts} workout(s) from export.zip`)
        changed()
        return { ok: true, ...result, message: `Imported ${result.days} days and ${result.workouts} workouts.` }
      }
      if (action === 'shared') { setHealthShared(Boolean((input.json as { value?: unknown })?.value)); changed(); return { ok: true } }
      if (action === 'clear') { clearHealth(); changed(); return { ok: true, message: 'Health data deleted.' } }
      if (action === 'ingest') { const result = ingestHealth(input.json, 'panel'); changed(); return { ok: true, ...result } }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: SOURCE_ID, label: 'Apple Health', category: 'health', describe, act })
      const notify = (): void => registry.changed(SOURCE_ID)
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-health.source')
  })
}
