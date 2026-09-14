/*
 * Lists the character keeps for the user.
 *
 * A chat answer is gone the moment it scrolls away; a list is the one shape
 * that keeps coming back — dramas to watch, gifts to consider, things to do.
 * So lists are a first-class object: she creates and maintains them with
 * tools, the user edits them in the Lists panel, and both sides see the same
 * file. Everything else she produces stays an ordinary artifact.
 *
 * Lists belong to the user (not the pack), so they live in the shared store,
 * one document per list.
 */
import { dirname, join } from 'node:path'
import { userCharactersDir } from './characters.js'
import { migrateFile, openStore } from './store.js'

export interface ListItem {
  id: string
  text: string
  done: boolean
  /** One optional line of context ("2023, TBS", "her favourite"). */
  note?: string
  addedAt: string
  doneAt?: string
}

export interface List {
  id: string
  title: string
  /** One line on what the list is for; shown under the title. */
  description?: string
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

/** `~/.dsh/gal/lists.json`, the pre-store file (imported once, then renamed). */
export function listsPath(): string {
  return process.env['DSH_GAL_LISTS'] ?? join(dirname(userCharactersDir()), 'lists.json')
}
const COLLECTION = 'lists'
let imported = false

const stamp = (): string => new Date().toISOString()
const newId = (): string => Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4)

function clean(text: unknown): string { return String(text ?? '').replace(/\s*\n\s*/g, ' ').trim() }

export function readLists(): List[] {
  const store = openStore()
  if (!imported) {
    imported = true
    migrateFile(listsPath(), text => {
      const parsed = JSON.parse(text) as { lists?: unknown }
      const lists = Array.isArray(parsed.lists) ? (parsed.lists as List[]).filter(list => typeof list?.id === 'string' && Array.isArray(list.items)) : []
      store.transaction(() => { for (const list of lists) store.doc<List>(COLLECTION, list.id).set(list) })
    })
  }
  return store.docs<List>(COLLECTION).map(d => d.value).filter(list => typeof list?.id === 'string' && Array.isArray(list.items)).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

/** Persist the given lists; any stored list not in the array is removed. */
function writeLists(lists: List[]): List[] {
  const store = openStore()
  store.transaction(() => {
    const keep = new Set(lists.map(list => list.id))
    for (const d of store.docs<List>(COLLECTION)) if (!keep.has(d.id)) store.doc(COLLECTION, d.id).delete()
    for (const list of lists) store.doc<List>(COLLECTION, list.id).set(list)
  })
  return lists
}

const slug = (text: string): string => text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '')

/** Find by id, or by title (case-insensitive, then as a slug) so the agent can name a list the way the user does. */
export function findList(ref: string, lists: List[] = readLists()): List | undefined {
  const key = clean(ref)
  if (key === '') return undefined
  return lists.find(list => list.id === key)
    ?? lists.find(list => list.title.toLowerCase() === key.toLowerCase())
    ?? lists.find(list => slug(list.title) === slug(key))
}

function makeItem(input: unknown): ListItem | undefined {
  const raw = typeof input === 'string' ? { text: input } : (input ?? {}) as { text?: unknown; note?: unknown; done?: unknown }
  const text = clean(raw.text)
  if (text === '') return undefined
  const note = clean(raw.note)
  return { id: newId(), text, done: raw.done === true, ...note === '' ? {} : { note }, addedAt: stamp(), ...raw.done === true ? { doneAt: stamp() } : {} }
}

export function createList(input: { title: unknown; description?: unknown; items?: unknown }): List {
  const title = clean(input.title)
  if (title === '') throw new Error('title is required')
  const lists = readLists()
  const existing = findList(title, lists)
  if (existing !== undefined) throw new Error(`a list named "${existing.title}" already exists (id ${existing.id}); add to it instead`)
  const description = clean(input.description)
  const items = (Array.isArray(input.items) ? input.items : []).map(makeItem).filter((item): item is ListItem => item !== undefined)
  const list: List = { id: newId(), title, ...description === '' ? {} : { description }, items, createdAt: stamp(), updatedAt: stamp() }
  writeLists([...lists, list])
  return list
}

export function addItems(ref: string, inputs: unknown[]): { list: List; added: ListItem[] } {
  const lists = readLists()
  const list = findList(ref, lists)
  if (list === undefined) throw new Error(`no list matches "${ref}"`)
  const added: ListItem[] = []
  for (const input of inputs) {
    const item = makeItem(input)
    if (item === undefined) continue
    // The same entry suggested twice is one entry.
    if (list.items.some(existing => existing.text.toLowerCase() === item.text.toLowerCase())) continue
    list.items.push(item); added.push(item)
  }
  if (added.length > 0) { list.updatedAt = stamp(); writeLists(lists) }
  return { list, added }
}

/** Match an item by id, then by exact text, then by a unique substring. */
export function findItem(list: List, ref: string): ListItem | undefined {
  const key = clean(ref)
  if (key === '') return undefined
  const byId = list.items.find(item => item.id === key)
  if (byId !== undefined) return byId
  const byText = list.items.find(item => item.text.toLowerCase() === key.toLowerCase())
  if (byText !== undefined) return byText
  const partial = list.items.filter(item => item.text.toLowerCase().includes(key.toLowerCase()))
  return partial.length === 1 ? partial[0] : undefined
}

export function updateItem(ref: string, itemRef: string, patch: { text?: unknown; note?: unknown; done?: unknown; remove?: unknown }): { list: List; item: ListItem | undefined } {
  const lists = readLists()
  const list = findList(ref, lists)
  if (list === undefined) throw new Error(`no list matches "${ref}"`)
  const item = findItem(list, itemRef)
  if (item === undefined) throw new Error(`no item in "${list.title}" matches "${itemRef}"`)
  if (patch.remove === true) {
    list.items = list.items.filter(other => other.id !== item.id)
    list.updatedAt = stamp(); writeLists(lists)
    return { list, item: undefined }
  }
  if (patch.text !== undefined && clean(patch.text) !== '') item.text = clean(patch.text)
  if (patch.note !== undefined) { const note = clean(patch.note); if (note === '') delete item.note; else item.note = note }
  if (typeof patch.done === 'boolean' && patch.done !== item.done) { item.done = patch.done; if (patch.done) item.doneAt = stamp(); else delete item.doneAt }
  list.updatedAt = stamp(); writeLists(lists)
  return { list, item }
}

export function updateList(ref: string, patch: { title?: unknown; description?: unknown }): List {
  const lists = readLists()
  const list = findList(ref, lists)
  if (list === undefined) throw new Error(`no list matches "${ref}"`)
  if (patch.title !== undefined && clean(patch.title) !== '') list.title = clean(patch.title)
  if (patch.description !== undefined) { const description = clean(patch.description); if (description === '') delete list.description; else list.description = description }
  list.updatedAt = stamp(); writeLists(lists)
  return list
}

export function deleteList(ref: string): List {
  const lists = readLists()
  const list = findList(ref, lists)
  if (list === undefined) throw new Error(`no list matches "${ref}"`)
  writeLists(lists.filter(other => other.id !== list.id))
  return list
}

/** Reorder items of one list by id; ids not mentioned keep their relative order at the end. */
export function reorderItems(ref: string, ids: string[]): List {
  const lists = readLists()
  const list = findList(ref, lists)
  if (list === undefined) throw new Error(`no list matches "${ref}"`)
  const byId = new Map(list.items.map(item => [item.id, item]))
  const ordered = ids.map(id => byId.get(id)).filter((item): item is ListItem => item !== undefined)
  const rest = list.items.filter(item => !ids.includes(item.id))
  list.items = [...ordered, ...rest]
  list.updatedAt = stamp(); writeLists(lists)
  return list
}

/** The whole list as markdown, the way she should show it back to the user. */
export function renderList(list: List): string {
  const lines = [`## ${list.title}`, ...list.description ? [list.description] : [], '']
  if (list.items.length === 0) lines.push('(empty)')
  for (const item of list.items) lines.push(`- [${item.done ? 'x' : ' '}] ${item.text}${item.note ? ` — ${item.note}` : ''}`)
  return lines.join('\n')
}

/**
 * Prompt section: an index of the lists plus the rule for when to make one.
 * Items are included in full for small lists (that is what makes "have I put
 * VIVANT on the list?" answerable without a tool call), and abbreviated after.
 */
export function listsSection(): string {
  const lists = readLists()
  const out = ['# Lists you keep for the user']
  if (lists.length === 0) out.push('None yet.')
  else {
    out.push('Each list is shared with the user, who can edit it in the Lists panel. Refer to them by title.', '')
    for (const list of [...lists].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))) {
      const open = list.items.filter(item => !item.done).length
      out.push(`## ${list.title} (id ${list.id}; ${open} open, ${list.items.length - open} done)`)
      if (list.description) out.push(list.description)
      const shown = list.items.slice(0, 40)
      for (const item of shown) out.push(`- [${item.done ? 'x' : ' '}] ${item.text}${item.note ? ` — ${item.note}` : ''}`)
      if (list.items.length > shown.length) out.push(`- … ${list.items.length - shown.length} more (use list_get)`)
      out.push('')
    }
  }
  out.push(
    '',
    'When your reply is a set of things the user may want to come back to — recommendations, options to compare, steps to do, things to buy or bring — put it in a list with `list_create` (or `list_add` when a matching list exists) in the same turn, then answer as usual and mention the list by name once. Do not make a list for a one-off answer, a single item, or something the user only asked you to explain.',
    'When the user says they finished, watched, bought or dropped something that is on a list, call `list_update` to mark it done or remove it. When they change their mind about an item, update it rather than adding a duplicate.',
    'Keep item text short (a name, not a paragraph); details go in `note`.',
  )
  return out.join('\n')
}
