/*
 * The user's data, in one place.
 *
 * Everything dsh-gal and its bundled connectors keep for the user — settings,
 * memory, lists, what she wrote, what each connector has synced, the
 * transcript the room shows — goes through this store instead of a file per
 * feature. Today it is one SQLite file under `~/.dsh/gal/`; the interface is
 * kept small and sync-shaped (documents with an updated-at, append-only logs)
 * so a hosted backend can stand behind the same calls later.
 *
 * What does NOT belong here: secrets (API keys, cookies stay in their own
 * files, later the keychain), compiled helpers and thumbnails (machine-local
 * caches), and the theme (a per-screen choice kept in the browser).
 *
 * `openStore()` returns one instance per path per process, so the plugin and
 * every connector share a connection; dsh-gal also publishes it as the
 * `galStore` service for plugins that live outside this repository.
 */
import { DatabaseSync } from 'node:sqlite'
import { existsSync, mkdirSync, readFileSync, renameSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'

/** One stored document: the value plus when it last changed (ms since epoch). */
export interface StoredDoc<T> { id: string; value: T; updatedAt: number }
/** One appended entry: its position in the log and when it was written. */
export interface LogEntry<T> { seq: number; at: number; event: T }

export interface DocHandle<T> {
  get(): T | undefined
  set(value: T): void
  /** Merge a partial object into the current value (or the given default). */
  patch(partial: Partial<T>, fallback: T): T
  delete(): void
  updatedAt(): number | undefined
}

export interface LogHandle<T> {
  append(event: T): number
  /** Entries with seq > `after`, oldest first. */
  read(after?: number, limit?: number): LogEntry<T>[]
  last(): LogEntry<T> | undefined
  count(): number
  clear(): void
}

export type Listener = (change: { collection: string; id: string; kind: 'doc' | 'log' }) => void

export interface GalStore {
  /** Where the store lives; blobs go beside it. */
  readonly path: string
  doc<T>(collection: string, id: string): DocHandle<T>
  docs<T>(collection: string): StoredDoc<T>[]
  log<T>(collection: string, id: string): LogHandle<T>
  /** Ids of every log in a collection with their entry counts, most recently written first. */
  logs(collection: string): { id: string; count: number; lastAt: number }[]
  /** A directory for machine-local blobs of one feature (thumbnails, exports). */
  blobDir(feature: string): string
  /** Change notifications for one collection, or every collection with '*'. */
  watch(collection: string, listener: Listener): () => void
  /** Run several writes as one transaction. */
  transaction<T>(fn: () => T): T
}

/** `~/.dsh/gal/store.sqlite`, or `DSH_GAL_STORE` when set. */
export function storePath(): string {
  return process.env['DSH_GAL_STORE'] ?? join(homedir(), '.dsh', 'gal', 'store.sqlite')
}

const instances = new Map<string, GalStore>()

/** Open (or reuse) the store at `path`. */
export function openStore(path: string = storePath()): GalStore {
  const existing = instances.get(path)
  if (existing !== undefined) return existing
  const store = createStore(path)
  instances.set(path, store)
  return store
}

function createStore(path: string): GalStore {
  mkdirSync(dirname(path), { recursive: true })
  const db = new DatabaseSync(path)
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;
    CREATE TABLE IF NOT EXISTS docs (
      collection TEXT NOT NULL, id TEXT NOT NULL, json TEXT NOT NULL, updated_at INTEGER NOT NULL,
      PRIMARY KEY (collection, id)
    );
    CREATE TABLE IF NOT EXISTS logs (
      collection TEXT NOT NULL, id TEXT NOT NULL, seq INTEGER NOT NULL, at INTEGER NOT NULL, json TEXT NOT NULL,
      PRIMARY KEY (collection, id, seq)
    );
    CREATE INDEX IF NOT EXISTS logs_by_time ON logs (collection, id, at);
  `)
  const q = {
    getDoc: db.prepare('SELECT json, updated_at FROM docs WHERE collection = ? AND id = ?'),
    putDoc: db.prepare('INSERT INTO docs (collection, id, json, updated_at) VALUES (?, ?, ?, ?) ON CONFLICT (collection, id) DO UPDATE SET json = excluded.json, updated_at = excluded.updated_at'),
    delDoc: db.prepare('DELETE FROM docs WHERE collection = ? AND id = ?'),
    allDocs: db.prepare('SELECT id, json, updated_at FROM docs WHERE collection = ? ORDER BY updated_at DESC'),
    nextSeq: db.prepare('SELECT COALESCE(MAX(seq), 0) + 1 AS seq FROM logs WHERE collection = ? AND id = ?'),
    putLog: db.prepare('INSERT INTO logs (collection, id, seq, at, json) VALUES (?, ?, ?, ?, ?)'),
    readLog: db.prepare('SELECT seq, at, json FROM logs WHERE collection = ? AND id = ? AND seq > ? ORDER BY seq LIMIT ?'),
    lastLog: db.prepare('SELECT seq, at, json FROM logs WHERE collection = ? AND id = ? ORDER BY seq DESC LIMIT 1'),
    countLog: db.prepare('SELECT COUNT(*) AS n FROM logs WHERE collection = ? AND id = ?'),
    clearLog: db.prepare('DELETE FROM logs WHERE collection = ? AND id = ?'),
    listLogs: db.prepare('SELECT id, COUNT(*) AS n, MAX(at) AS last_at FROM logs WHERE collection = ? GROUP BY id ORDER BY last_at DESC'),
  }
  const listeners = new Map<string, Set<Listener>>()
  const emit = (collection: string, id: string, kind: 'doc' | 'log'): void => {
    const change = { collection, id, kind }
    for (const key of [collection, '*']) for (const fn of listeners.get(key) ?? []) { try { fn(change) } catch { /* a listener must not break a write */ } }
  }
  let depth = 0
  const store: GalStore = {
    path,
    doc<T>(collection: string, id: string): DocHandle<T> {
      const get = (): T | undefined => {
        const row = q.getDoc.get(collection, id) as { json: string } | undefined
        if (row === undefined) return undefined
        try { return JSON.parse(row.json) as T } catch { return undefined }
      }
      const set = (value: T): void => { q.putDoc.run(collection, id, JSON.stringify(value), Date.now()); emit(collection, id, 'doc') }
      return {
        get,
        set,
        patch(partial, fallback) { const next = { ...(get() ?? fallback), ...partial }; set(next); return next },
        delete() { q.delDoc.run(collection, id); emit(collection, id, 'doc') },
        updatedAt() { return (q.getDoc.get(collection, id) as { updated_at: number } | undefined)?.updated_at },
      }
    },
    docs<T>(collection: string): StoredDoc<T>[] {
      return (q.allDocs.all(collection) as { id: string; json: string; updated_at: number }[]).flatMap(row => {
        try { return [{ id: row.id, value: JSON.parse(row.json) as T, updatedAt: row.updated_at }] } catch { return [] }
      })
    },
    log<T>(collection: string, id: string): LogHandle<T> {
      const parse = (row: { seq: number; at: number; json: string }): LogEntry<T> | undefined => {
        try { return { seq: row.seq, at: row.at, event: JSON.parse(row.json) as T } } catch { return undefined }
      }
      return {
        append(event) {
          const seq = (q.nextSeq.get(collection, id) as { seq: number }).seq
          q.putLog.run(collection, id, seq, Date.now(), JSON.stringify(event))
          emit(collection, id, 'log')
          return seq
        },
        read(after = 0, limit = 10_000) {
          return (q.readLog.all(collection, id, after, limit) as { seq: number; at: number; json: string }[]).flatMap(row => { const e = parse(row); return e === undefined ? [] : [e] })
        },
        last() { const row = q.lastLog.get(collection, id) as { seq: number; at: number; json: string } | undefined; return row === undefined ? undefined : parse(row) },
        count() { return (q.countLog.get(collection, id) as { n: number }).n },
        clear() { q.clearLog.run(collection, id); emit(collection, id, 'log') },
      }
    },
    logs(collection) {
      return (q.listLogs.all(collection) as { id: string; n: number; last_at: number }[]).map(row => ({ id: row.id, count: row.n, lastAt: row.last_at }))
    },
    blobDir(feature) {
      const dir = join(dirname(path), 'blobs', feature.replace(/[^\w.-]+/g, '_'))
      mkdirSync(dir, { recursive: true })
      return dir
    },
    watch(collection, listener) {
      let set = listeners.get(collection)
      if (set === undefined) { set = new Set(); listeners.set(collection, set) }
      set.add(listener)
      return () => { set.delete(listener) }
    },
    transaction<T>(fn: () => T): T {
      if (depth > 0) return fn()
      depth += 1
      db.exec('BEGIN')
      try { const out = fn(); db.exec('COMMIT'); return out }
      catch (error) { db.exec('ROLLBACK'); throw error }
      finally { depth -= 1 }
    },
  }
  return store
}

/**
 * Import a file written by an earlier version into the store, once. The file
 * is renamed with a `.migrated` suffix afterwards so this never repeats.
 */
export function migrateFile(file: string, apply: (text: string) => void): boolean {
  if (!existsSync(file)) return false
  try {
    apply(readFileSync(file, 'utf8'))
    renameSync(file, `${file}.migrated`)
    return true
  } catch { return false }
}
