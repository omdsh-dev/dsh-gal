/*
 * dsh-home: the user's smart home, for any dsh session.
 *
 * HomeKit itself is out of reach for a command-line helper (the framework
 * needs a signed app with the com.apple.developer.homekit entitlement from a
 * provisioning profile), so this goes through the Shortcuts app: the user
 * puts shortcuts that read or control their Home into a folder ("Home"), and
 * the plugin lists and runs them with `/usr/bin/shortcuts`. Shortcuts named
 * "Get …" are readers — their text output is captured and cached, refreshed
 * every few minutes — and everything else is an action ("Lights off",
 * "Movie scene"). An optional Home Assistant backend reads entity states over
 * its REST API and calls services. The agent gets a one-line summary per
 * reading as a prompt section, `home_status` to re-read, and `home_run` to
 * act. With dsh-gal loaded, it shows up in the Data panel.
 */
import { execFile } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { migrateFile, openStore } from '@dsh-external/dsh-gal/store'

const execFileAsync = promisify(execFile)
const SHORTCUTS = '/usr/bin/shortcuts'

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

export const name = 'dsh-home'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Shortcuts folder whose shortcuts are exposed. */
  folder?: string
  /** Minutes between re-runs of the "Get …" reader shortcuts. */
  refreshMinutes?: number
  /** Seconds a single shortcut may run before it is killed. */
  timeoutSeconds?: number
  /** Optional Home Assistant: `url` like http://homeassistant.local:8123 and a long-lived access token. */
  homeAssistant?: { url?: string; token?: string }
}
export const Config: z<Config> = z.object({
  folder: z.string().default('Home'),
  refreshMinutes: z.number().min(1).default(10),
  timeoutSeconds: z.number().min(5).max(300).default(30),
  homeAssistant: z.object({ url: z.string().default(''), token: z.string().default('') }).default({ url: '', token: '' }),
})

// ---- storage ----------------------------------------------------------------
// Settings and the last reader outputs live in the shared dsh-gal store; the
// Home Assistant token stays in the plugin config and is never written here.

interface Settings { homeShared: boolean }
interface Reading { name: string; output: string; at: string; error?: string }
/** What survives a restart: the readers' last outputs, so a failing reader can still show its last good value. */
interface SavedState { readings: Reading[]; at: number }
const dataDir = (): string => process.env['DSH_HOME_DIR'] ?? join(homedir(), '.dsh', 'home')
const settingsDoc = () => openStore().doc<Settings>('home', 'settings')
const stateDoc = () => openStore().doc<SavedState>('home', 'state')
function readSettings(): Settings {
  return { homeShared: true, ...settingsDoc().get() ?? {} }
}
function writeSettings(patch: Partial<Settings>): Settings {
  return settingsDoc().patch(patch, { homeShared: true })
}
/** One-time import of the pre-store `settings.json`; a legacy value never overrides what the store already holds. */
function importLegacySettings(): boolean {
  return migrateFile(join(dataDir(), 'settings.json'), text => {
    const legacy = JSON.parse(text) as Partial<Settings>
    if (settingsDoc().get() === undefined) settingsDoc().set({ homeShared: legacy.homeShared ?? true })
  })
}

// ---- Shortcuts --------------------------------------------------------------

interface Shortcut { name: string; id: string }
const isReader = (n: string): boolean => /^get\s/i.test(n)

async function shortcuts(args: string[], timeoutMs = 20_000): Promise<string> {
  try {
    const { stdout } = await execFileAsync(SHORTCUTS, args, { timeout: timeoutMs, maxBuffer: 4 * 1024 * 1024 })
    return stdout
  } catch (error) {
    const e = error as { stderr?: string; killed?: boolean; code?: string | number; message?: string }
    if (e.killed || e.code === 'ETIMEDOUT') throw new Error(`timed out after ${Math.round(timeoutMs / 1000)}s`)
    if (e.code === 'ENOENT') throw new Error('the shortcuts command is not available (macOS 12 or later is required)')
    const line = String(e.stderr ?? '').trim().split('\n').pop() ?? ''
    throw new Error(line.replace(/^Error:\s*/, '') || e.message || String(error))
  }
}
const lines = (s: string): string[] => s.split('\n').map(l => l.trim()).filter(Boolean)

/** `shortcuts list --folder-name X` silently falls back to every shortcut when X does not exist, so the folder is checked first. */
async function listFolders(): Promise<string[]> { return lines(await shortcuts(['list', '--folders'])) }
async function listFolder(folder: string): Promise<Shortcut[]> {
  return lines(await shortcuts(['list', '--folder-name', folder, '--show-identifiers'])).map(l => {
    const m = l.match(/^(.*) \(([0-9A-F-]{36})\)$/i)
    return m ? { name: m[1]!, id: m[2]! } : { name: l, id: '' }
  })
}
/** Runs a shortcut; returns its output (text, or compact JSON when the output parses as JSON) when `capture` is set. */
async function runShortcut(target: Shortcut, opts: { capture: boolean; input?: string; timeoutMs: number }): Promise<string> {
  const stamp = `${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const out = join(tmpdir(), `dsh-home-${stamp}.txt`)
  const inp = join(tmpdir(), `dsh-home-${stamp}-in.txt`)
  const args = ['run', target.id || target.name]
  if (opts.input !== undefined) { writeFileSync(inp, opts.input); args.push('--input-path', inp) }
  if (opts.capture) args.push('--output-path', out)
  try {
    await shortcuts(args, opts.timeoutMs)
    if (!opts.capture) return ''
    let text = ''
    try { text = readFileSync(out, 'utf8').trim() } catch { return '' }
    try { const parsed: unknown = JSON.parse(text); return typeof parsed === 'string' ? parsed : JSON.stringify(parsed) } catch { return text }
  } finally {
    rmSync(out, { force: true }); rmSync(inp, { force: true })
  }
}

// ---- Home Assistant ---------------------------------------------------------

interface Entity { id: string; name: string; domain: string; state: string; unit?: string; attributes: Record<string, unknown> }
const HA_DOMAINS = new Set(['light', 'switch', 'fan', 'cover', 'lock', 'climate', 'sensor', 'binary_sensor', 'scene', 'script', 'media_player', 'vacuum', 'humidifier', 'input_boolean'])
const TOGGLABLE = new Set(['light', 'switch', 'fan', 'input_boolean', 'media_player', 'humidifier'])

class HomeAssistant {
  constructor(private readonly url: string, private readonly token: string) {}
  private async call<T>(method: 'GET' | 'POST', path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.url.replace(/\/+$/, '')}${path}`, {
      method, headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(15_000),
    })
    if (res.status === 401 || res.status === 403) throw new Error('Home Assistant rejected the token')
    if (!res.ok) throw new Error(`Home Assistant ${method} ${path}: ${res.status} ${(await res.text()).slice(0, 200)}`)
    return await res.json() as T
  }
  async states(): Promise<Entity[]> {
    const raw = await this.call<{ entity_id: string; state: string; attributes: Record<string, unknown> }[]>('GET', '/api/states')
    return raw
      .map(s => ({ id: s.entity_id, domain: s.entity_id.split('.')[0] ?? '', state: s.state, name: String(s.attributes['friendly_name'] ?? s.entity_id), unit: typeof s.attributes['unit_of_measurement'] === 'string' ? s.attributes['unit_of_measurement'] : undefined, attributes: s.attributes }))
      .filter(e => HA_DOMAINS.has(e.domain) && e.state !== 'unavailable' && (e.state !== 'unknown' || e.domain === 'scene' || e.domain === 'script') && !(e.domain === 'sensor' && (e.state === '' || /^\d{4}-\d{2}-\d{2}T/.test(e.state))))
      .sort((a, b) => a.name.localeCompare(b.name))
  }
  service(domain: string, service: string, data: Record<string, unknown>): Promise<unknown> { return this.call('POST', `/api/services/${domain}/${service}`, data) }
}

/**
 * "light.living_room on" · "scene.movie" · "climate.hall set_temperature temperature=22" · "cover.garage open"
 * → domain, service, service data. Plain on/off/toggle map to turn_on/turn_off/toggle; scenes and scripts run on their own.
 */
function parseHaCommand(text: string, known: Entity[]): { domain: string; service: string; data: Record<string, unknown>; label: string } | undefined {
  const tokens = text.trim().split(/\s+/)
  let first = tokens[0] ?? ''
  // Also accept a friendly name ("Living room lights on") when it matches one entity.
  if (!/^[a-z_]+\.[a-z0-9_]+$/i.test(first)) {
    const lower = text.trim().toLowerCase()
    const hit = known.filter(e => lower.startsWith(e.name.toLowerCase())).sort((a, b) => b.name.length - a.name.length)[0]
    if (!hit) return undefined
    first = hit.id
    tokens.splice(0, hit.name.split(/\s+/).length, hit.id)
  }
  const domain = first.split('.')[0]!
  if (!HA_DOMAINS.has(domain)) return undefined
  const entity = known.find(e => e.id === first)
  const label = entity?.name ?? first
  const verb = (tokens[1] ?? '').toLowerCase()
  const data: Record<string, unknown> = { entity_id: first }
  for (const kv of tokens.slice(2)) { const m = kv.match(/^([a-z_]+)=(.+)$/i); if (m) data[m[1]!] = /^-?\d+(\.\d+)?$/.test(m[2]!) ? Number(m[2]) : m[2] }
  if (domain === 'scene' || domain === 'script') return { domain, service: 'turn_on', data, label }
  if (verb === '' || verb === 'on') return { domain, service: 'turn_on', data, label: `${label} on` }
  if (verb === 'off') return { domain, service: 'turn_off', data, label: `${label} off` }
  if (verb === 'toggle') return { domain, service: 'toggle', data, label: `${label} toggled` }
  if (domain === 'cover' && (verb === 'open' || verb === 'close' || verb === 'stop')) return { domain, service: `${verb}_cover`, data, label: `${label} ${verb}` }
  if (domain === 'lock' && (verb === 'lock' || verb === 'unlock')) return { domain, service: verb, data, label: `${label} ${verb}ed` }
  if (/^\d+(\.\d+)?$/.test(verb) && domain === 'climate') return { domain, service: 'set_temperature', data: { ...data, temperature: Number(verb) }, label: `${label} → ${verb}°` }
  if (/^\d+$/.test(verb) && domain === 'light') return { domain, service: 'turn_on', data: { ...data, brightness_pct: Number(verb) }, label: `${label} ${verb}%` }
  return { domain, service: verb, data, label: `${label} ${verb}` }
}
const entityLine = (e: Entity): string => {
  if (e.domain === 'climate') { const t = e.attributes['temperature'], cur = e.attributes['current_temperature']; return `${e.name} ${e.state}${t !== undefined && t !== null ? ` set ${t}°` : ''}${cur !== undefined && cur !== null ? ` (now ${cur}°)` : ''}` }
  if (e.domain === 'light' && e.state === 'on' && typeof e.attributes['brightness'] === 'number') return `${e.name} on ${Math.round((e.attributes['brightness'] as number) / 2.55)}%`
  return `${e.name} ${e.state}${e.unit ? ` ${e.unit}` : ''}`
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-home: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-home: ${message}`)
  const folder = (config.folder ?? 'Home').trim() || 'Home'
  const refreshMs = (config.refreshMinutes ?? 10) * 60_000
  const timeoutMs = (config.timeoutSeconds ?? 30) * 1000
  const haUrl = (config.homeAssistant?.url ?? '').trim(), haToken = (config.homeAssistant?.token ?? '').trim()
  const ha = haUrl && haToken ? new HomeAssistant(haUrl, haToken) : undefined
  const backend: 'shortcuts' | 'homeassistant' = ha ? 'homeassistant' : 'shortcuts'
  if (importLegacySettings()) log('imported settings.json into the store')

  // The cache is what the prompt section reads; sections are synchronous. The
  // readers' last outputs are loaded from the store so a reader that fails on
  // the first refresh after a restart still reports its last good value; `at`
  // stays 0 until this process has refreshed once, as before.
  const cache = {
    shortcuts: [] as Shortcut[], readings: stateDoc().get()?.readings ?? [], entities: [] as Entity[],
    folderFound: true, at: 0, error: '', haError: '', running: new Set<string>(),
  }
  const saveReadings = (): void => { try { stateDoc().set({ readings: cache.readings, at: cache.at || Date.now() }) } catch (error) { warn(`could not save readings: ${(error as Error).message}`) } }
  const readers = (): Shortcut[] => cache.shortcuts.filter(s => isReader(s.name))
  const actions = (): Shortcut[] => cache.shortcuts.filter(s => !isReader(s.name))
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  const findShortcut = (n: string): Shortcut | undefined => { const q = n.trim().toLowerCase(); return cache.shortcuts.find(s => s.name.toLowerCase() === q) ?? cache.shortcuts.find(s => s.id.toLowerCase() === q) }

  async function readOne(s: Shortcut): Promise<Reading> {
    try { return { name: s.name, output: await runShortcut(s, { capture: true, timeoutMs }), at: new Date().toISOString() } }
    catch (error) { const previous = cache.readings.find(r => r.name === s.name); return { name: s.name, output: previous?.output ?? '', at: previous?.at ?? new Date().toISOString(), error: (error as Error).message } }
  }
  async function runReaders(): Promise<void> {
    const list = readers()
    if (list.length === 0) { if (cache.readings.length > 0) { cache.readings = []; saveReadings() } return }
    cache.readings = await Promise.all(list.map(readOne))
    for (const r of cache.readings) if (r.error) warn(`reader "${r.name}": ${r.error}`)
    saveReadings()
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      try {
        const folders = await listFolders()
        cache.folderFound = folders.some(f => f.toLowerCase() === folder.toLowerCase())
        cache.shortcuts = cache.folderFound ? await listFolder(folders.find(f => f.toLowerCase() === folder.toLowerCase()) ?? folder) : []
        cache.error = ''
        await runReaders()
      } catch (error) { cache.error = (error as Error).message; warn(cache.error) }
      if (ha) {
        try { cache.entities = await ha.states(); cache.haError = '' }
        catch (error) { cache.haError = (error as Error).message; warn(`Home Assistant: ${cache.haError}`) }
      }
      cache.at = Date.now()
      changed()
    })().finally(() => { refreshing = undefined })
    return refreshing
  }
  ctx.effect(() => {
    void refresh()
    const timer = setInterval(() => { void refresh() }, refreshMs)
    return () => clearInterval(timer)
  }, 'dsh-home.poll')

  /** Runs an action by name: a shortcut in the folder, or (Home Assistant) an entity command. Returns a short confirmation. */
  async function runAction(nameOrCommand: string): Promise<string> {
    const target = nameOrCommand.trim()
    if (!target) throw new Error('which action?')
    if (cache.at === 0) await refresh()
    const s = findShortcut(target)
    if (s) {
      if (isReader(s.name)) { const r = await readOne(s); cache.readings = cache.readings.map(x => x.name === r.name ? r : x); if (!cache.readings.some(x => x.name === r.name)) cache.readings.push(r); saveReadings(); changed(); if (r.error) throw new Error(r.error); return `${s.name}: ${r.output || '(no output)'}` }
      cache.running.add(s.name); changed()
      try { await runShortcut(s, { capture: false, timeoutMs }) } finally { cache.running.delete(s.name) }
      log(`ran "${s.name}"`)
      // Readings are stale now; re-read shortly (lights take a moment to report).
      setTimeout(() => { void runReaders().then(changed) }, 1500)
      return `Ran ${s.name}`
    }
    if (ha) {
      const cmd = parseHaCommand(target, cache.entities)
      if (cmd) {
        await ha.service(cmd.domain, cmd.service, cmd.data)
        log(`Home Assistant ${cmd.domain}.${cmd.service} ${JSON.stringify(cmd.data)}`)
        setTimeout(() => { void ha.states().then(e => { cache.entities = e; changed() }).catch(() => undefined) }, 1500)
        return `Ran ${cmd.label}`
      }
    }
    const known = [...actions().map(a => a.name), ...(ha ? cache.entities.filter(e => TOGGLABLE.has(e.domain) || e.domain === 'scene').map(e => e.id) : [])]
    throw new Error(`no action named "${target}"${cache.folderFound ? '' : ` (no Shortcuts folder "${folder}")`}${known.length > 0 ? `. Available: ${known.slice(0, 20).join(', ')}` : ''}`)
  }

  // ---- what the agent sees ---------------------------------------------------
  const readingLines = (): string[] => cache.readings.filter(r => r.output || r.error).map(r => `${r.name.replace(/^get\s+/i, '')}: ${r.error && !r.output ? `(failed: ${r.error})` : r.output.slice(0, 300)}`)
  const section = (): string => {
    if (!readSettings().homeShared || cache.at === 0) return ''
    if (!cache.folderFound && cache.entities.length === 0) return ''
    const out: string[] = ['# Home']
    for (const line of readingLines().slice(0, 20)) out.push(line)
    if (cache.entities.length > 0) {
      const on = cache.entities.filter(e => TOGGLABLE.has(e.domain) || e.domain === 'climate' || e.domain === 'cover' || e.domain === 'lock')
      if (on.length > 0) out.push(`Devices: ${on.slice(0, 30).map(entityLine).join('; ')}`)
      const sensors = cache.entities.filter(e => e.domain === 'sensor' || e.domain === 'binary_sensor')
      if (sensors.length > 0) out.push(`Sensors: ${sensors.slice(0, 20).map(entityLine).join('; ')}`)
    }
    const acts = [...actions().map(a => a.name), ...cache.entities.filter(e => e.domain === 'scene' || e.domain === 'script').map(e => e.name)]
    if (acts.length > 0) out.push(`Actions available: ${acts.slice(0, 40).join(', ')}`)
    out.push('', '`home_status` re-reads everything; `home_run` runs an action by name — it changes the physical home, so confirm with the user first unless they clearly asked for it.')
    return out.join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-home', order: 9575, text: section }), 'dsh-home.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  const statusText = (): string => {
    const out: string[] = []
    if (cache.error) out.push(`Shortcuts: ${cache.error}`)
    else if (!cache.folderFound) out.push(`No Shortcuts folder "${folder}" yet.`)
    for (const line of readingLines()) out.push(`- ${line}`)
    if (cache.folderFound && readers().length === 0 && !cache.error) out.push(`No "Get …" reader shortcuts in "${folder}".`)
    if (ha) {
      if (cache.haError) out.push(`Home Assistant: ${cache.haError}`)
      for (const e of cache.entities.filter(e => e.domain !== 'scene' && e.domain !== 'script')) out.push(`- ${entityLine(e)} (${e.id})`)
    }
    const acts = [...actions().map(a => a.name), ...cache.entities.filter(e => e.domain === 'scene' || e.domain === 'script').map(e => `${e.name} (${e.id})`)]
    out.push(acts.length > 0 ? `Actions: ${acts.join(', ')}` : 'No actions available.')
    return out.join('\n')
  }
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'home_status',
    description: 'Re-runs the "Get …" reader shortcuts (and reads Home Assistant states when configured) and returns the current state of the user\'s home plus the list of available actions.',
    parameters: {},
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async () => { await refresh(); return statusText() },
  } as never)), 'dsh-home.tool.status')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'home_run',
    description: 'Runs a home action: a shortcut from the Home folder by name (e.g. "Lights off", "Movie scene"), or with Home Assistant an entity command like "light.living_room on", "switch.fan toggle", "scene.movie", "climate.hall 22". This changes the physical home — confirm with the user first unless they clearly asked for exactly this.',
    parameters: { name: { type: 'string', required: true, description: 'Shortcut name, or a Home Assistant entity command' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => runAction(String((args as { name?: string }).name ?? '')),
  } as never)), 'dsh-home.tool.run')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const ago = (ms: number): string => { const m = Math.round(ms / 60000); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 60 * 36 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago` }
    const setup: SourceView['setup'] = [{
      title: 'Connect your Home through Shortcuts',
      steps: [
        `Open the Shortcuts app and create a folder named "${folder}".`,
        'Add shortcuts to it using the "Control Home" action (for scenes and accessories) or "Get State of Home Accessory" (for readings). Anything else in the folder works too.',
        'Name readers "Get …" (e.g. "Get living room") and end them with a "Text" or "Get Contents" action so they output text; everything else is a button ("Lights off", "Movie scene").',
        'Press Refresh.',
      ],
    }]
    const haSetup: SourceView['setup'] = ha ? [{ title: 'Home Assistant', steps: [`Entities are read from ${haUrl} with the configured long-lived access token (Profile → Security → Long-lived access tokens).`] }] : []
    const describe = (): SourceView => {
      const s = readSettings()
      const baseActions: SourceView['actions'] = [
        { id: 'run', label: 'Run action', kind: 'input', placeholder: actions()[0]?.name ?? 'Lights off', hint: 'Name of a shortcut in the folder, or a Home Assistant command like "light.kitchen on"' },
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'homeShared', label: 'Visible to the character', kind: 'toggle', value: s.homeShared, hint: 'Off hides your home from the prompt' },
      ]
      const data = {
        backend, folder,
        readers: cache.readings.map(r => ({ name: r.name, output: r.output, at: r.at, error: r.error })),
        actions: actions().map(a => ({ name: a.name, running: cache.running.has(a.name) })),
        entities: ha ? cache.entities.map(e => ({ id: e.id, name: e.name, domain: e.domain, state: e.state, unit: e.unit })) : undefined,
      }
      const nothingFromShortcuts = !cache.folderFound || cache.error !== ''
      if (cache.at === 0) return { status: 'empty', summary: 'Loading…', shared: s.homeShared, placeholder: true, data, setup, actions: baseActions }
      if (nothingFromShortcuts && cache.entities.length === 0) {
        if (cache.error) return { status: 'error', summary: `Shortcuts: ${cache.error}`, shared: s.homeShared, data, setup, actions: baseActions }
        if (ha && cache.haError) return { status: 'error', summary: `Home Assistant: ${cache.haError} · no Shortcuts folder "${folder}"`, shared: s.homeShared, data, setup: [...haSetup, ...setup], actions: baseActions }
        return { status: 'empty', summary: `No Shortcuts folder "${folder}" yet`, shared: s.homeShared, placeholder: true, data, setup, actions: baseActions }
      }
      const failed = cache.readings.filter(r => r.error).length
      const parts = [
        cache.folderFound ? `${readers().length} reading${readers().length === 1 ? '' : 's'} · ${actions().length} action${actions().length === 1 ? '' : 's'} in "${folder}"` : `no "${folder}" folder`,
        ha ? (cache.haError ? `Home Assistant: ${cache.haError}` : `${cache.entities.length} Home Assistant entities`) : '',
        failed > 0 ? `${failed} reader${failed === 1 ? '' : 's'} failing` : '',
        `refreshed ${ago(Date.now() - cache.at)}`,
      ].filter(Boolean)
      const lists: SourceView['lists'] = [
        ...cache.readings.length === 0 ? [] : [{ title: 'Readings', items: cache.readings.map(r => ({ primary: r.name.replace(/^get\s+/i, ''), secondary: r.error && !r.output ? `failed: ${r.error}` : r.output.slice(0, 120) || '(no output)' })) }],
        ...actions().length === 0 ? [] : [{ title: 'Actions', items: actions().map(a => ({ primary: a.name, secondary: 'shortcut' })) }],
        ...cache.entities.length === 0 ? [] : [{ title: 'Home Assistant', items: cache.entities.slice(0, 40).map(e => ({ primary: e.name, secondary: `${e.state}${e.unit ? ` ${e.unit}` : ''} · ${e.id}` })) }],
      ]
      return {
        status: 'connected', summary: parts.join(' · '), shared: s.homeShared, data, lists,
        setup: [...haSetup, ...(cache.folderFound && readers().length + actions().length > 0 ? [] : setup)],
        actions: baseActions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); if (cache.error && cache.entities.length === 0) throw new Error(cache.error); return { ok: true } }
      if (action === 'homeShared') { writeSettings({ homeShared: Boolean(value) }); changed(); return { ok: true } }
      if (action === 'run') { const message = await runAction(String(value ?? '')); changed(); return { ok: true, message } }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'home', label: 'Home', category: 'other', describe, act })
      const notify = (): void => registry.changed('home')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-home.source')
  })
}
