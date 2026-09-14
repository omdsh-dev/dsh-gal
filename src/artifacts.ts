/*
 * Files she produced for the user.
 *
 * A reply that says "written to 济州岛行程.md" is only useful if the page can
 * be opened from where it was mentioned. Every file the agent writes or
 * explicitly presents during a session is indexed here — the file itself stays
 * where the agent put it (the session's working directory); only the pointer
 * is kept, in `~/.dsh/gal/artifacts.json`, so the list survives a restart and
 * a change of character.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join } from 'node:path'
import { userCharactersDir } from './characters.js'
import { migrateFile, openStore } from './store.js'

export type ArtifactKind = 'markdown' | 'text' | 'image' | 'other'

export interface Artifact {
  id: string
  /** Absolute path of the file. */
  path: string
  /** File name, as she would say it. */
  name: string
  kind: ArtifactKind
  /** Session that produced it. */
  sessionId: string
  /** When it was last written or presented (ISO). */
  at: string
  /** `presented` — declared as a deliverable; `written` — seen being written by a tool. */
  source: 'presented' | 'written'
  /** Her description of it, when presented with one. */
  description?: string
}

const LIMIT = 200

/** `~/.dsh/gal/artifacts.json`, or `DSH_GAL_ARTIFACTS` when set. */
export function artifactsPath(): string {
  return process.env['DSH_GAL_ARTIFACTS'] ?? join(dirname(userCharactersDir()), 'artifacts.json')
}

const TEXT_EXT = new Set(['.txt', '.json', '.yaml', '.yml', '.csv', '.tsv', '.toml', '.ini', '.log', '.ts', '.tsx', '.js', '.mjs', '.cjs', '.jsx', '.py', '.rb', '.go', '.rs', '.sh', '.zsh', '.html', '.css', '.xml', '.sql', '.env', '.cfg', '.conf'])
const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'])

export function artifactKind(path: string): ArtifactKind {
  const ext = extname(path).toLowerCase()
  if (ext === '.md' || ext === '.markdown' || ext === '.mdx') return 'markdown'
  if (IMAGE_EXT.has(ext)) return 'image'
  if (TEXT_EXT.has(ext) || ext === '') return 'text'
  return 'other'
}

export function mimeFor(kind: ArtifactKind, path: string): string {
  const ext = extname(path).toLowerCase()
  if (kind === 'markdown') return 'text/markdown; charset=utf-8'
  if (kind === 'text') return 'text/plain; charset=utf-8'
  if (kind === 'image') return ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml' } as Record<string, string>)[ext] ?? 'application/octet-stream'
  return 'application/octet-stream'
}

const COLLECTION = 'artifacts'
let imported = false
const valid = (item: unknown): item is Artifact => typeof item === 'object' && item !== null && typeof (item as Artifact).path === 'string' && typeof (item as Artifact).id === 'string'

function read(): Artifact[] {
  const store = openStore()
  if (!imported) {
    imported = true
    migrateFile(artifactsPath(), text => {
      const parsed = JSON.parse(text) as unknown
      const list = Array.isArray(parsed) ? parsed : (parsed as { artifacts?: unknown })?.artifacts
      if (!Array.isArray(list)) return
      store.transaction(() => { for (const item of list) if (valid(item)) store.doc<Artifact>(COLLECTION, item.id).set(item) })
    })
  }
  return store.docs<Artifact>(COLLECTION).map(d => d.value).filter(valid).sort((a, b) => a.at.localeCompare(b.at))
}

function write(list: Artifact[]): void {
  const store = openStore()
  store.transaction(() => {
    const keep = new Set(list.map(item => item.id))
    for (const d of store.docs<Artifact>(COLLECTION)) if (!keep.has(d.id)) store.doc(COLLECTION, d.id).delete()
    for (const item of list) store.doc<Artifact>(COLLECTION, item.id).set(item)
  })
}

/** Newest last. Entries whose file has vanished are kept: she still said she wrote it. */
export function listArtifacts(): Artifact[] {
  return read()
}

export function findArtifact(id: string): Artifact | undefined {
  return read().find(item => item.id === id)
}

/**
 * Record a file. A path already on the list is refreshed in place (moved to
 * the end, source upgraded to `presented` if it now is) rather than listed
 * twice — one file is one page, however many times it was edited.
 */
export function recordArtifact(input: { path: string; sessionId: string; source: Artifact['source']; description?: string }): { artifact: Artifact; fresh: boolean } {
  const list = read()
  const index = list.findIndex(item => item.path === input.path)
  const existing = index === -1 ? undefined : list[index]
  const artifact: Artifact = {
    id: existing?.id ?? `a${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    path: input.path,
    name: basename(input.path),
    kind: artifactKind(input.path),
    sessionId: input.sessionId,
    at: new Date().toISOString(),
    source: existing?.source === 'presented' ? 'presented' : input.source,
    ...(input.description ?? existing?.description) === undefined ? {} : { description: input.description ?? existing?.description },
  }
  if (index !== -1) list.splice(index, 1)
  list.push(artifact)
  while (list.length > LIMIT) list.shift()
  write(list)
  return { artifact, fresh: existing === undefined }
}

export function forgetArtifact(id: string): Artifact[] {
  const list = read().filter(item => item.id !== id)
  write(list)
  return list
}

/** Whether the file is still there, and how big it is. */
export function artifactStat(artifact: Artifact): { exists: boolean; size: number; mtime: string } {
  try {
    const info = statSync(artifact.path)
    return { exists: info.isFile(), size: info.size, mtime: info.mtime.toISOString() }
  } catch {
    return { exists: false, size: 0, mtime: '' }
  }
}

/**
 * Which tools write files, and where. The editor is the one that ships with
 * dsh; the loose match covers plugins that name their own write tool.
 */
export function writtenPath(toolName: string, rawArguments: string): string | undefined {
  let args: Record<string, unknown>
  try { args = JSON.parse(rawArguments) as Record<string, unknown> } catch { return undefined }
  if (typeof args !== 'object' || args === null) return undefined
  const path = [args['path'], args['file_path'], args['filePath'], args['file']].find((value): value is string => typeof value === 'string' && value.trim() !== '')
  if (path === undefined) return undefined
  if (toolName === 'str_replace_editor') {
    const command = String(args['command'] ?? '')
    return command === 'create' || command === 'str_replace' || command === 'insert' ? path : undefined
  }
  return /write|create|edit|save|append/i.test(toolName) ? path : undefined
}

/**
 * Prompt section: a file is something she hands over, not something she reads
 * out. The UI shows every file she writes as a page the user can open, so the
 * reply only has to name it.
 */
export function artifactSection(): string {
  return [
    '# Files you write',
    'Anything you write to a file during this conversation shows up for the user as a page they can open from your reply, so name the file in your reply (its file name in backticks, e.g. `济州岛行程.md`) and say in a sentence what is in it. Do not paste the whole file into your reply.',
    'If a `present` tool is available, call it for each file that is a deliverable the user asked for, right after writing it — that is what marks it as theirs to keep.',
  ].join('\n')
}
