/*
 * What the agent remembers about the user.
 *
 * These notes are facts about the person on the other side of the screen —
 * their projects, their preferences, how they like to work. They belong to the
 * user, not to whichever character is currently on stage, so they live in the
 * shared store (see store.ts) and survive switching packs.
 */
import { existsSync, readFileSync, readdirSync, renameSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { userCharactersDir } from './characters.js'
import { migrateFile, openStore } from './store.js'

/** `~/.dsh/aibo/memory.md`, the pre-store file (imported once, then renamed). */
export function memoryPath(): string {
  return process.env['AIBO_MEMORY'] ?? join(dirname(userCharactersDir()), 'memory.md')
}

/**
 * Memory used to be per-pack (`<pack>/memory.md`), then one shared file. Both
 * are folded into the store the first time it is read, keeping each line once;
 * the files are renamed aside so this happens exactly once.
 */
function importLegacy(): string[] {
  const lines: string[] = []
  const take = (text: string): void => { for (const line of text.split('\n')) { const kept = line.replace(/\s+$/, ''); if (kept !== '' && !lines.includes(kept)) lines.push(kept) } }
  const root = userCharactersDir()
  if (existsSync(root)) {
    for (const entry of readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const legacy = join(root, entry.name, 'memory.md')
      if (existsSync(legacy)) { take(readFileSync(legacy, 'utf8')); renameSync(legacy, `${legacy}.migrated`) }
    }
  }
  migrateFile(memoryPath(), take)
  return lines
}

const memoryDoc = () => openStore().doc<{ text: string }>('memory', 'user')

export function readMemory(): string {
  const doc = memoryDoc()
  const current = doc.get()
  if (current !== undefined) return current.text
  const lines = importLegacy()
  const text = lines.length === 0 ? '' : `${lines.join('\n')}\n`
  doc.set({ text })
  return text
}

export function writeMemory(text: string): string {
  const body = text.replace(/\s+$/, '')
  const stored = body === '' ? '' : `${body}\n`
  memoryDoc().set({ text: stored })
  return stored
}

/** Append one dated bullet; returns the whole memory. */
export function remember(note: string): string {
  const line = `- ${new Date().toISOString().slice(0, 10)}: ${note.trim().replace(/\s*\n\s*/g, ' ')}`
  const current = readMemory().replace(/\s+$/, '')
  return writeMemory(current === '' ? line : `${current}\n${line}`)
}

/** One remembered fact. The date is when it was learned, and may be missing. */
export interface MemoryEntry { date: string; text: string }

/**
 * The file is a list, not a document: one `- YYYY-MM-DD: fact` per line. A line
 * that does not follow the convention is still an entry, just undated, so
 * hand-edited files are never silently dropped.
 */
export function memoryEntries(): MemoryEntry[] {
  return readMemory().split('\n')
    .map(line => line.replace(/^\s*[-*]\s*/, '').trim())
    .filter(line => line !== '')
    .map(line => {
      const dated = line.match(/^(\d{4}-\d{2}-\d{2})\s*[:：]\s*(.*)$/)
      return dated === null ? { date: '', text: line } : { date: dated[1] as string, text: (dated[2] as string).trim() }
    })
    .filter(entry => entry.text !== '')
}

export function writeEntries(entries: MemoryEntry[]): MemoryEntry[] {
  writeMemory(entries
    .map(entry => ({ date: String(entry.date ?? '').trim(), text: String(entry.text ?? '').replace(/\s*\n\s*/g, ' ').trim() }))
    .filter(entry => entry.text !== '')
    .map(entry => `- ${/^\d{4}-\d{2}-\d{2}$/.test(entry.date) ? `${entry.date}: ` : ''}${entry.text}`)
    .join('\n'))
  return memoryEntries()
}

/**
 * Prompt section carrying what is known about the user.
 *
 * It is emitted even when nothing is known yet: the part that says *when* to
 * write a note is what makes the memory fill up in the first place.
 */
export function memorySection(): string {
  const memory = readMemory().trim()
  return [
    '# What you remember about the user',
    memory === '' ? 'Nothing yet.' : 'Notes kept across sessions and across characters. Use them naturally; do not recite them unprompted.',
    '',
    ...memory === '' ? [] : [memory, ''],
    'When the user states something about themselves that will still be true next week — a preference, a constraint, what they are working on, how they like things done — call `aibo_remember` in that same turn. A stated dislike ("I cannot eat spicy food") is exactly this. Keep it to one short sentence, and do not announce that you are writing it down; a brief acknowledgement in your reply is enough.',
    'Do not record one-off details of the current task, anything you inferred rather than were told, or anything the user has since corrected.',
  ].join('\n')
}
