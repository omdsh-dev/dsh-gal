/*
 * dsh-notes: the user's Apple Notes, for any dsh session.
 *
 * Notes.app is read and written through a JXA script (`helper/notes.js`) run
 * with `osascript`, so every account already synced into Notes — iCloud,
 * Google, Exchange — just works after the one-time Automation prompt. The
 * agent gets a short index as a prompt section, search/read tools, and tools
 * to create or append to a note. With dsh-gal loaded, notes show up in its
 * Data panel.
 */
import { execFile } from 'node:child_process'
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
const HELPER = join(PKG_ROOT, 'helper', 'notes.js')

// ---- the slice of dsh-gal's contract this plugin uses ----------------------
interface SourceView {
  status: 'connected' | 'empty' | 'error'; summary: string; shared: boolean; placeholder?: boolean
  /** Raw data for the panel's own renderer of this source. */
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

export const name = 'dsh-notes'
export const inject = { tools: { required: true }, systemPrompt: { required: true } }

export interface Config {
  /** Minutes between refreshes of the cached index. */
  refreshMinutes?: number
  /** Only these folders (names); empty = all. */
  folders?: string[]
}
export const Config: z<Config> = z.object({
  refreshMinutes: z.number().min(1).default(15),
  folders: z.array(z.string()).default([]),
})

// ---- storage and the helper -------------------------------------------------

interface NoteRow { id: string; name: string; folder: string; modified: string | null; created: string | null; locked: boolean; preview?: string; match?: 'title' | 'body'; snippet?: string }
interface Folder { name: string; path: string; count: number }
interface ListResult { folders: Folder[]; notes: NoteRow[]; total: number; truncated: boolean }
interface FullNote { id: string; name: string; folder: string; modified: string | null; created: string | null; body: string }
interface Settings { notesShared: boolean }

const MAX_NOTES = 2000
const PREVIEW_NOTES = 300
const DEFAULT_SETTINGS: Settings = { notesShared: true }
/** Where this plugin's files used to live; only the legacy `settings.json` (imported once) is looked for here now. */
const dataDir = (): string => process.env['DSH_NOTES_DIR'] ?? join(homedir(), '.dsh', 'notes')
// Settings live in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`, doc notes/settings). The notes index itself stays in memory.
const settingsDoc = () => openStore().doc<Settings>('notes', 'settings')
function readSettings(): Settings {
  return { ...DEFAULT_SETTINGS, ...(settingsDoc().get() ?? {}) }
}
function writeSettings(patch: Partial<Settings>): Settings {
  return settingsDoc().patch(patch, DEFAULT_SETTINGS)
}
/** One-time import of the pre-store `settings.json`; the file is renamed `.migrated` afterwards. */
function importLegacySettings(): boolean {
  return migrateFile(join(dataDir(), 'settings.json'), text => {
    const old = JSON.parse(text) as Partial<Settings>
    if (typeof old.notesShared === 'boolean') settingsDoc().patch({ notesShared: old.notesShared }, DEFAULT_SETTINGS)
  })
}

// ---- time helpers -----------------------------------------------------------

const agoWords = (iso: string | null): string => {
  if (!iso) return ''
  const min = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  return min < 1 ? 'just now' : min < 60 ? `${min} min ago` : min < 60 * 36 ? `${Math.round(min / 60)} h ago` : min < 60 * 24 * 14 ? `${Math.round(min / 1440)} d ago` : iso.slice(0, 10)
}
const oneLine = (s: string, n: number): string => s.replace(/\s+/g, ' ').trim().slice(0, n)

// ---- the plugin -------------------------------------------------------------

export function apply(ctx: Context, config: Config): void {
  const log = (message: string): void => ctx.logger.info(`dsh-notes: ${message}`)
  const warn = (message: string): void => ctx.logger.warn(`dsh-notes: ${message}`)
  const refreshMs = (config.refreshMinutes ?? 15) * 60_000
  if (importLegacySettings()) log('imported settings.json into the dsh-gal store')
  const onlyFolders = new Set((config.folders ?? []).map(f => f.toLowerCase()))
  const inScope = (n: { folder: string }): boolean => onlyFolders.size === 0 || onlyFolders.has(n.folder.toLowerCase())

  // The cache is what the prompt section reads; sections are synchronous.
  const cache = { notes: [] as NoteRow[], folders: [] as Folder[], at: 0, error: '', denied: false, truncated: false }
  const listeners = new Set<() => void>()
  const changed = (): void => { for (const fn of listeners) fn() }

  async function run<T>(command: string, ...args: string[]): Promise<T> {
    try {
      const { stdout } = await execFileAsync('osascript', ['-l', 'JavaScript', HELPER, command, ...args], { timeout: 60_000, maxBuffer: 32 * 1024 * 1024 })
      cache.denied = false
      return JSON.parse(stdout) as T
    } catch (error) {
      const err = error as { stderr?: string; killed?: boolean; signal?: string; message?: string }
      const stderr = String(err.stderr ?? '').trim()
      if (stderr.startsWith('denied:') || /-1743|not authori[sz]ed/i.test(stderr)) { cache.denied = true; throw new Error('Notes access denied (Automation permission)') }
      if (err.killed || err.signal === 'SIGTERM' || /-1712/.test(stderr)) throw new Error('Notes did not answer within 60 s. Usually an unanswered or declined Automation prompt: check System Settings → Privacy & Security → Automation → Notes for the app dsh runs in.')
      throw new Error(stderr.replace(/^error:/, '') || err.message || String(error))
    }
  }

  let refreshing: Promise<void> | undefined
  const refresh = (): Promise<void> => {
    refreshing ??= (async () => {
      try {
        const result = await run<ListResult>('list', String(MAX_NOTES), String(PREVIEW_NOTES))
        cache.notes = result.notes.filter(inScope)
        cache.folders = result.folders.filter(f => onlyFolders.size === 0 || onlyFolders.has(f.name.toLowerCase()))
        cache.truncated = result.truncated
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
  }, 'dsh-notes.poll')

  // ---- views over the cache --------------------------------------------------
  const weekAgo = (): string => new Date(Date.now() - 7 * 86_400_000).toISOString()
  const editedThisWeek = (): NoteRow[] => cache.notes.filter(n => (n.modified ?? '') >= weekAgo())
  const findByTitle = (title: string): NoteRow | undefined => {
    const t = title.trim().toLowerCase()
    return cache.notes.find(n => n.name.trim().toLowerCase() === t) ?? cache.notes.find(n => n.name.toLowerCase().includes(t))
  }
  const resolveId = async (id?: string, title?: string): Promise<string> => {
    if (id?.trim()) return id.trim()
    if (!title?.trim()) throw new Error('give a note id or a title')
    if (cache.at === 0) await refresh()
    const hit = findByTitle(title) ?? (await run<NoteRow[]>('search', title, '5')).find(n => n.match === 'title')
    if (!hit) throw new Error(`no note titled "${title}"`)
    return hit.id
  }
  const noteLine = (n: NoteRow): string => `${n.name} [${n.folder || 'Notes'}] · ${agoWords(n.modified)}`

  // ---- what the agent sees ---------------------------------------------------
  const section = (): string => {
    if (!readSettings().notesShared || cache.denied || cache.at === 0 || (cache.error && cache.notes.length === 0)) return ''
    const lines: string[] = [`# The user's Apple Notes`, `${cache.notes.length}${cache.truncated ? '+' : ''} notes in ${cache.folders.length} folders; ${editedThisWeek().length} edited in the last 7 days.`]
    const recent = cache.notes.slice(0, 5)
    if (recent.length > 0) lines.push('Most recently edited:', ...recent.map(n => `- ${noteLine(n)}`))
    lines.push('', 'When the user refers to something they wrote down, look it up with `notes_search` and read it with `notes_read` rather than guessing. Write with `notes_create` or `notes_append` only when asked.')
    return lines.join('\n')
  }
  ctx.effect(() => ctx.systemPrompt.section({ name: 'dsh-notes', order: 9555, text: section }), 'dsh-notes.section')

  const text = (value: unknown): { type: 'text'; text: string }[] => [{ type: 'text', text: String(value) }]
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'notes_search',
    description: 'Search the user\'s Apple Notes by title or body text (case-insensitive). Returns matching notes with id, folder, last edit and a snippet; use notes_read for the full text.',
    parameters: { query: { type: 'string', required: true, description: 'Words to look for in titles or bodies' }, limit: { type: 'number', description: 'Max results, default 10' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { query, limit } = args as { query: string; limit?: number }
      if (!query?.trim()) throw new Error('query is required')
      const hits = (await run<NoteRow[]>('search', query.trim(), String(Math.min(Math.max(1, limit ?? 10), 50)))).filter(inScope)
      if (hits.length === 0) return `No notes match "${query}".`
      return hits.map(n => `- ${noteLine(n)} (id ${n.id})${n.snippet ? `\n  …${oneLine(n.snippet, 200)}…` : ''}`).join('\n')
    },
  } as never)), 'dsh-notes.tool.search')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'notes_read',
    description: 'Read one Apple Note in full, by id (from notes_search) or by title.',
    parameters: { id: { type: 'string', description: 'Note id' }, title: { type: 'string', description: 'Title, when the id is unknown (exact, else first containing match)' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { id, title } = args as { id?: string; title?: string }
      const note = await run<FullNote>('read', await resolveId(id, title))
      const body = note.body.length > 20_000 ? `${note.body.slice(0, 20_000)}\n…(truncated)` : note.body
      return `# ${note.name}\nFolder: ${note.folder || 'Notes'} · edited ${note.modified?.slice(0, 16).replace('T', ' ') ?? '?'} · id ${note.id}\n\n${body}`
    },
  } as never)), 'dsh-notes.tool.read')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'notes_create',
    description: 'Create a new Apple Note. Only when the user asks to write something down. body is plain text; blank lines separate paragraphs.',
    parameters: { title: { type: 'string', required: true, description: 'Note title (first line)' }, body: { type: 'string', required: true, description: 'Plain-text body' }, folder: { type: 'string', description: 'Folder name; default the default Notes folder' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { title, body, folder } = args as { title: string; body: string; folder?: string }
      if (!title?.trim()) throw new Error('title is required')
      const made = await run<{ id: string; name: string; folder: string }>('create', folder ?? '', title.trim(), body ?? '')
      void refresh()
      return `Created "${made.name}" in ${made.folder || 'Notes'} (id ${made.id}).`
    },
  } as never)), 'dsh-notes.tool.create')
  ctx.effect(() => ctx.tools.register(defineTool({
    name: 'notes_append',
    description: 'Append plain text to the end of an existing Apple Note, by id or title. Only when the user asks.',
    parameters: { id: { type: 'string', description: 'Note id' }, title: { type: 'string', description: 'Title, when the id is unknown' }, text: { type: 'string', required: true, description: 'Plain text to add' } },
    output: { schema: { type: 'string' }, render: (_a: unknown, v: unknown) => text(v) },
    execute: async (args: unknown) => {
      const { id, title, text: body } = args as { id?: string; title?: string; text: string }
      if (!body?.trim()) throw new Error('text is required')
      const done = await run<{ id: string; name: string }>('append', await resolveId(id, title), body)
      void refresh()
      return `Appended to "${done.name}".`
    },
  } as never)), 'dsh-notes.tool.append')

  // ---- what dsh-gal shows, when it is there ----------------------------------
  ctx.inject(['galSources'], (gal: CordisContext) => {
    const registry = (gal as unknown as { galSources: GalSources }).galSources
    const permission: SourceView['setup'] = [{
      title: 'Allow dsh to control Notes',
      steps: [
        'macOS asks once ("… wants access to control Notes") the first time the index loads. If it was declined: System Settings → Privacy & Security → Automation → the app you launched dsh from (a terminal, or the desktop app) → turn on Notes.',
        'Then press Refresh.',
      ],
    }]
    const stamp = (): string => cache.at === 0 ? 'not loaded yet' : `refreshed ${agoWords(new Date(cache.at).toISOString())}`
    const describe = (): SourceView => {
      const s = readSettings()
      const actions: SourceView['actions'] = [
        { id: 'refresh', label: 'Refresh', kind: 'button' },
        { id: 'notesShared', label: 'Visible to the character', kind: 'toggle', value: s.notesShared, hint: 'Off hides your notes from the prompt' },
      ]
      if (cache.denied) return { status: 'error', summary: 'Notes access was denied', shared: s.notesShared, setup: permission, actions }
      if (cache.error && cache.notes.length === 0 && cache.at !== 0) return { status: 'error', summary: cache.error, shared: s.notesShared, setup: permission, actions }
      const week = editedThisWeek()
      const recent = cache.notes.slice(0, PREVIEW_NOTES)
      return {
        status: cache.at === 0 ? 'empty' : 'connected', summary: `${cache.notes.length}${cache.truncated ? '+' : ''} notes in ${cache.folders.length} folders · ${stamp()}`, shared: s.notesShared, placeholder: cache.at === 0,
        data: {
          folders: cache.folders.map(f => ({ name: f.name, count: f.count })),
          notes: recent.map(n => ({ id: n.id, title: n.name, folder: n.folder, modified: n.modified ?? '', preview: oneLine(n.preview ?? '', 120), locked: n.locked })),
        },
        stats: [
          { label: 'Notes', value: String(cache.notes.length) },
          { label: 'Folders', value: String(cache.folders.length) },
          { label: 'Edited this week', value: String(week.length), tone: week.length > 0 ? 'up' : 'flat' },
        ],
        lists: [{ title: 'Recent notes', items: recent.slice(0, 12).map(n => ({ primary: n.name, secondary: `${n.folder || 'Notes'} · ${agoWords(n.modified)}` })) }],
        setup: cache.at === 0 ? permission : undefined,
        actions,
      }
    }
    const act = async (action: string, input: { json?: unknown }): Promise<unknown> => {
      const value = (input.json as { value?: unknown })?.value
      if (action === 'refresh') { await refresh(); if (cache.error) throw new Error(cache.error); return { ok: true } }
      if (action === 'notesShared') { writeSettings({ notesShared: Boolean(value) }); changed(); return { ok: true } }
      throw new Error(`unknown action ${action}`)
    }
    gal.effect(() => {
      const dispose = registry.register({ id: 'notes', label: 'Notes', category: 'notes', describe, act })
      const notify = (): void => registry.changed('notes')
      listeners.add(notify)
      return () => { listeners.delete(notify); dispose() }
    }, 'dsh-notes.source')
  })
  log(`loaded (refresh every ${config.refreshMinutes ?? 15} min)`)
}
