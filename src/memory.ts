/*
 * What the agent remembers about the user.
 *
 * These notes are facts about the person on the other side of the screen —
 * their projects, their preferences, how they like to work. They belong to the
 * user, not to whichever character is currently on stage, so they live in one
 * file beside the character directory and survive switching packs.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { userCharactersDir } from './characters.js'

/** `~/.dsh/gal/memory.md`, or `DSH_GAL_MEMORY` when set. */
export function memoryPath(): string {
  return process.env['DSH_GAL_MEMORY'] ?? join(dirname(userCharactersDir()), 'memory.md')
}

/**
 * Memory used to be per-pack (`<pack>/memory.md`). Fold any of those into the
 * shared file the first time it is needed, oldest packs first, keeping each
 * line once; the pack copies are renamed aside so this happens exactly once.
 */
function migrateFromPacks(target: string): void {
  const root = userCharactersDir()
  if (!existsSync(root)) return
  const lines: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const legacy = join(root, entry.name, 'memory.md')
    if (!existsSync(legacy)) continue
    for (const line of readFileSync(legacy, 'utf8').split('\n')) {
      const kept = line.replace(/\s+$/, '')
      if (kept !== '' && !lines.includes(kept)) lines.push(kept)
    }
    renameSync(legacy, `${legacy}.migrated`)
  }
  if (lines.length === 0) return
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, `${lines.join('\n')}\n`)
}

export function readMemory(): string {
  const path = memoryPath()
  if (!existsSync(path)) migrateFromPacks(path)
  return existsSync(path) ? readFileSync(path, 'utf8') : ''
}

export function writeMemory(text: string): string {
  const path = memoryPath()
  mkdirSync(dirname(path), { recursive: true })
  const body = text.replace(/\s+$/, '')
  writeFileSync(path, body === '' ? '' : `${body}\n`)
  return body === '' ? '' : `${body}\n`
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
    'When the user states something about themselves that will still be true next week — a preference, a constraint, what they are working on, how they like things done — call `gal_remember` in that same turn. A stated dislike ("I cannot eat spicy food") is exactly this. Keep it to one short sentence, and do not announce that you are writing it down; a brief acknowledgement in your reply is enough.',
    'Do not record one-off details of the current task, anything you inferred rather than were told, or anything the user has since corrected.',
  ].join('\n')
}
