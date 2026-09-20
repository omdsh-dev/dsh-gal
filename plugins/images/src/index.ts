/*
 * dsh-images: pictures she can find and show, for any dsh session.
 *
 * Two sources: Brave Search's image endpoint when a key is pasted (the
 * Connectors panel or the plugin config; it stays in `~/.dsh/images/key.json`),
 * and Wikimedia Commons without any key (fine for places, landmarks, animals,
 * art; thin for products and news). `image_search` returns candidates with
 * their thumbnail and full-size URLs; `image_show` downloads the one she picks
 * into the shared store's blob directory and, when Aibo is loaded, presents
 * it in the room as an image card and returns the URL to embed inline. Hotlinking
 * is avoided on purpose: remote image URLs break on referer checks and rot.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import type { Context as CordisContext } from '@deepseek-ai/cordis'
import z from '@deepseek-ai/schemastery'
import { defineTool } from '@deepseek-ai/dsh-tools'
import { openStore } from '@dsh-external/aibo/store'

// ---- the slice of Aibo's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; value?: boolean; confirm?: string; hint?: string; placeholder?: string }[]
}
interface AiboSources {
  register(source: { id: string; label: string; category: string; describe(): SourceView | Promise<SourceView>; act?(action: string, input: { json?: unknown }): Promise<unknown> | unknown }): () => void
  changed(id: string): void
}
interface AiboArtifacts { publish(path: string, description?: string): { id: string; url: string } }
interface ToolsLike { register(tool: unknown): () => void }
interface SystemPromptLike { section(section: { name: string; order: number; text: () => string }): () => void }
type Context = CordisContext & { tools: ToolsLike; systemPrompt: SystemPromptLike }

export const name = 'dsh-images'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Brave Search API subscription token. Usually pasted in the Data panel instead. */
  braveKey?: string
  /** 'strict' | 'moderate' | 'off' for Brave's safesearch. */
  safesearch?: string
}
export const Config: z<Config> = z.object({
  braveKey: z.string().default(''),
  safesearch: z.string().default('strict'),
})

// ---- storage ----------------------------------------------------------------

interface Settings { shared: boolean }
interface Recent { searches: { query: string; provider: string; hits: number; at: string }[]; shown: { query: string; title: string; path: string; source: string; at: string }[] }
const dataDir = (): string => process.env['DSH_IMAGES_DIR'] ?? join(homedir(), '.dsh', 'images')
const keyPath = (): string => join(dataDir(), 'key.json')
const settingsDoc = () => openStore().doc<Settings>('images', 'settings')
const recentDoc = () => openStore().doc<Recent>('images', 'recent')
function readKey(): string {
  try { const raw = JSON.parse(readFileSync(keyPath(), 'utf8')) as { key?: unknown }; return typeof raw.key === 'string' ? raw.key.trim() : '' } catch { return '' }
}
function writeKey(key: string | undefined): void {
  if (!key) { rmSync(keyPath(), { force: true }); return }
  mkdirSync(dataDir(), { recursive: true })
  writeFileSync(keyPath(), JSON.stringify({ key }), { mode: 0o600 })
}
const readRecent = (): Recent => ({ searches: [], shown: [], ...recentDoc().get() ?? {} })
const KEEP = 30

// ---- providers --------------------------------------------------------------

export interface Hit { title: string; page: string; source: string; thumb: string; url: string; width?: number; height?: number; note?: string }
const UA = 'dsh-images/0.1 (https://github.com/omdsh-dev/aibo; a personal assistant fetching one image for its user)'

async function brave(key: string, query: string, count: number, safesearch: string): Promise<Hit[]> {
  const params = new URLSearchParams({ q: query, count: String(count), safesearch, spellcheck: '1' })
  const res = await fetch(`https://api.search.brave.com/res/v1/images/search?${params}`, { headers: { accept: 'application/json', 'x-subscription-token': key, 'user-agent': UA }, signal: AbortSignal.timeout(20_000) })
  if (res.status === 401 || res.status === 403) throw new Error('Brave rejected the key')
  if (res.status === 429) throw new Error('Brave quota exhausted for now')
  if (!res.ok) throw new Error(`Brave ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json() as { results?: { title?: string; url?: string; source?: string; thumbnail?: { src?: string }; properties?: { url?: string; width?: number; height?: number } }[] }
  return (data.results ?? []).filter(r => r.properties?.url).map(r => ({ title: r.title ?? '', page: r.url ?? '', source: r.source ?? hostOf(r.url), thumb: r.thumbnail?.src ?? r.properties!.url!, url: r.properties!.url!, width: r.properties?.width, height: r.properties?.height }))
}

async function commons(query: string, count: number): Promise<Hit[]> {
  const params = new URLSearchParams({
    action: 'query', format: 'json', formatversion: '2', generator: 'search', gsrnamespace: '6', gsrlimit: String(count), gsrsearch: `filetype:bitmap ${query}`,
    prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '1600', iiextmetadatafilter: 'ImageDescription|Artist|LicenseShortName',
  })
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`Wikimedia Commons ${res.status}`)
  const data = await res.json() as { query?: { pages?: { title?: string; index?: number; imageinfo?: { url?: string; thumburl?: string; descriptionurl?: string; width?: number; height?: number; extmetadata?: Record<string, { value?: string }> }[] }[] } }
  const strip = (html?: string): string => (html ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  return [...data.query?.pages ?? []].sort((a, b) => (a.index ?? 0) - (b.index ?? 0)).flatMap(p => {
    const i = p.imageinfo?.[0]
    if (!i?.url) return []
    const meta = i.extmetadata ?? {}
    const desc = strip(meta['ImageDescription']?.value)
    const licence = strip(meta['LicenseShortName']?.value)
    return [{ title: (p.title ?? '').replace(/^File:/, '').replace(/\.[a-z]+$/i, ''), page: i.descriptionurl ?? '', source: 'Wikimedia Commons', thumb: i.thumburl ?? i.url, url: i.url, width: i.width, height: i.height, note: [desc.slice(0, 160), licence].filter(Boolean).join(' · ') }]
  })
}
const hostOf = (url?: string): string => { try { return new URL(url ?? '').hostname.replace(/^www\./, '') } catch { return '' } }

// ---- download ---------------------------------------------------------------

const EXT: Record<string, string> = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/avif': '.avif' }
const MAX_BYTES = 15 * 1024 * 1024
async function download(url: string): Promise<{ path: string; bytes: number; type: string }> {
  const res = await fetch(url, { headers: { 'user-agent': UA, accept: 'image/*' }, redirect: 'follow', signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`download failed: ${res.status}`)
  const type = (res.headers.get('content-type') ?? '').split(';')[0]!.trim().toLowerCase()
  const ext = EXT[type]
  if (!ext) throw new Error(`not an image (${type || 'unknown type'})`)
  const length = Number(res.headers.get('content-length') ?? 0)
  if (length > MAX_BYTES) throw new Error(`image too large (${Math.round(length / 1_048_576)} MB)`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > MAX_BYTES) throw new Error('image too large')
  if (buf.length < 1024) throw new Error('image is empty or a placeholder')
  const dir = openStore().blobDir('images')
  mkdirSync(dir, { recursive: true })
  const path = join(dir, `${createHash('sha1').update(url).digest('hex').slice(0, 16)}${ext}`)
  if (!existsSync(path)) writeFileSync(path, buf)
  return { path, bytes: buf.length, type }
}

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (m: string): void => ctx.logger.info(`dsh-images: ${m}`)
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }
  const key = (): string => readKey() || (config.braveKey ?? '').trim()
  const provider = (): 'brave' | 'commons' => key() ? 'brave' : 'commons'
  const readShared = (): boolean => settingsDoc().get()?.shared ?? true
  let artifacts: AiboArtifacts | undefined
  /** The last search's hits, so `image_show` can take an index instead of a URL. */
  let lastHits: Hit[] = []

  const search = async (query: string, count: number): Promise<Hit[]> => {
    const p = provider()
    const hits = p === 'brave' ? await brave(key(), query, count, config.safesearch || 'strict') : await commons(query, count)
    const recent = readRecent()
    recent.searches = [{ query, provider: p, hits: hits.length, at: new Date().toISOString() }, ...recent.searches].slice(0, KEEP)
    recentDoc().set(recent)
    lastHits = hits
    changed()
    return hits
  }
  const dims = (h: Hit): string => h.width && h.height ? ` ${h.width}×${h.height}` : ''
  const hitLine = (h: Hit, i: number): string => `${i + 1}. ${h.title || '(untitled)'} — ${h.source}${dims(h)}${h.note ? `\n   ${h.note}` : ''}\n   image: ${h.url}${h.page ? `\n   page: ${h.page}` : ''}`

  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-images', order: 9600, text: () => {
    if (!readShared()) return ''
    return `# Pictures\nYou can show the user a picture: \`image_search\` finds candidates (${provider() === 'brave' ? 'Brave Search' : 'Wikimedia Commons, so places, landmarks, nature and art work best'}), \`image_show\` downloads one and puts it in the room as an image card. Do it when a picture answers better than words — what a place, a dish, an animal or a work looks like — and when the user asks for one. Pick by title, source and size; prefer a landscape shot from a reputable source; one image, not a gallery, unless asked. Never paste a raw remote image URL into your reply; use \`image_show\` and, when it returns an embed line, put that line in your reply where the picture belongs.`
  } }), 'dsh-images.section')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'image_search',
    description: 'Search for pictures. Returns numbered candidates with title, source, size, image URL and page URL; then call image_show with the number (or the URL) of the one to show.',
    parameters: {
      query: { type: 'string', required: true, description: 'What to look for, e.g. "Gergeti Trinity Church Kazbegi". English works best for landmarks.' },
      count: { type: 'number', description: 'How many candidates, 1–20 (default 8)' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { query?: unknown; count?: unknown }
      const query = String(a.query ?? '').trim()
      if (!query) throw new Error('image_search: query is required')
      const count = typeof a.count === 'number' && Number.isFinite(a.count) ? Math.min(20, Math.max(1, Math.round(a.count))) : 8
      const hits = await search(query, count)
      if (!hits.length) return `No pictures found for "${query}"${provider() === 'commons' ? ' on Wikimedia Commons. Try an English name, or a broader term.' : '.'}`
      return `${hits.length} candidates (${provider() === 'brave' ? 'Brave' : 'Wikimedia Commons'}):\n${hits.map(hitLine).join('\n')}`
    },
  } as never)), 'dsh-images.tool.search')

  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'image_show',
    description: 'Download one picture and show it to the user as an image card. Give the candidate number from the last image_search, or any direct image URL. Returns the line to embed in your reply.',
    parameters: {
      pick: { type: 'string', required: true, description: 'Candidate number ("3") or a direct image URL' },
      caption: { type: 'string', description: 'One short line: what it is and where it is from' },
    },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => [{ type: 'text', text: String(v) }] },
    execute: async (args: unknown) => {
      const a = args as { pick?: unknown; caption?: unknown }
      const pick = String(a.pick ?? '').trim()
      const n = /^\d+$/.test(pick) ? Number(pick) : NaN
      const hit: Hit | undefined = Number.isInteger(n) ? lastHits[n - 1] : lastHits.find(h => h.url === pick) ?? (/^https?:\/\//.test(pick) ? { title: '', page: '', source: hostOf(pick), thumb: pick, url: pick } : undefined)
      if (!hit) throw new Error(Number.isInteger(n) ? `no candidate ${n}; run image_search first` : 'image_show: give a candidate number or an http(s) image URL')
      const caption = typeof a.caption === 'string' && a.caption.trim() ? a.caption.trim() : hit.title || undefined
      // Commons renders a 1600 px copy on request; a 5000 px original is wasted in a chat column. Brave thumbnails are too small to use instead.
      const file = await download(hit.source === 'Wikimedia Commons' && hit.thumb ? hit.thumb : hit.url)
      const recent = readRecent()
      recent.shown = [{ query: recent.searches[0]?.query ?? '', title: caption ?? hit.title, path: file.path, source: hit.source, at: new Date().toISOString() }, ...recent.shown].slice(0, KEEP)
      recentDoc().set(recent)
      changed()
      log(`shown ${hit.url} (${Math.round(file.bytes / 1024)} KB)`)
      if (artifacts === undefined) return `Saved to ${file.path} (${Math.round(file.bytes / 1024)} KB). Present it to the user from there.`
      const published = artifacts.publish(file.path, caption)
      return `Shown to the user as an image card${caption ? ` ("${caption}")` : ''}. Embed line for your reply:\n![${caption ?? 'image'}](${published.url})\nSource: ${hit.page || hit.url}`
    },
  } as never)), 'dsh-images.tool.show')

  // ---- what Aibo shows, when it is there ----------------------------------
  ctx.inject(['aiboArtifacts'], (aibo: CordisContext) => {
    artifacts = (aibo as unknown as { aiboArtifacts: AiboArtifacts }).aiboArtifacts
    aibo.effect(() => () => { artifacts = undefined }, 'dsh-images.artifacts')
  })
  ctx.inject(['aiboSources'], (aibo: CordisContext) => {
    const registry = (aibo as unknown as { aiboSources: AiboSources }).aiboSources
    const describe = (): SourceView => {
      const hasKey = key() !== ''
      const recent = readRecent()
      const shared = readShared()
      const actions: SourceView['actions'] = [
        { id: 'key', label: hasKey ? 'Replace the Brave key' : 'Paste a Brave Search key', kind: 'input', placeholder: 'BSA…', hint: 'Optional. Without it, pictures come from Wikimedia Commons.' },
        { id: 'shared', label: 'Visible to the character', kind: 'toggle', value: shared, hint: 'Off removes the picture tools from her prompt' },
        ...hasKey ? [{ id: 'disconnect', label: 'Forget the key', kind: 'danger' as const, confirm: 'Remove the Brave key? Searches fall back to Wikimedia Commons.' }] : [],
      ]
      const setup: SourceView['setup'] = [{ title: 'Where pictures come from', steps: [
        'Without a key: Wikimedia Commons, free and open-licensed. Good for places, landmarks, nature, animals and art; thin for products, people and news.',
        'With a key: Brave Search images, the whole web. Get one at brave.com/search/api (the free plan is enough for a personal assistant) and paste it here; it stays in ~/.dsh/images/key.json.',
        'A picture she picks is downloaded once into the store and shown as a card, so it keeps working when the original page moves.',
      ] }]
      const shortAgo = (iso: string): string => { const m = Math.round((Date.now() - Date.parse(iso)) / 60_000); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago` }
      return {
        status: 'connected', summary: hasKey ? 'Brave Search · Wikimedia Commons as fallback' : 'Wikimedia Commons · no key', shared,
        stats: [
          { label: 'Source', value: hasKey ? 'Brave' : 'Commons', delta: hasKey ? 'web-wide' : 'open-licensed' },
          { label: 'Shown', value: String(recent.shown.length), delta: 'recent pictures' },
          { label: 'Searches', value: String(recent.searches.length), delta: 'recent' },
        ],
        lists: [
          { title: 'Recently shown', items: recent.shown.slice(0, 10).map(s => ({ primary: s.title || s.query, secondary: `${s.source} · ${shortAgo(s.at)}` })) },
          { title: 'Recent searches', items: recent.searches.slice(0, 10).map(s => ({ primary: s.query, secondary: `${s.hits} results · ${s.provider} · ${shortAgo(s.at)}` })) },
        ].filter(l => l.items.length),
        setup, actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'key') {
        const k = String(value ?? '').trim()
        if (!k) throw new Error('paste the key')
        await brave(k, 'test', 1, 'strict')
        writeKey(k); changed()
        return { ok: true, message: 'Brave Search connected.' }
      }
      if (action === 'disconnect') { writeKey(undefined); changed(); return { ok: true, message: 'Key removed; pictures come from Wikimedia Commons now.' } }
      if (action === 'shared') { settingsDoc().set({ shared: Boolean(value) }); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    aibo.effect(() => {
      const dispose = registry.register({ id: 'images', label: 'Pictures', category: 'media', describe, act })
      const notify = (): void => registry.changed('images')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-images.source')
  })
}
