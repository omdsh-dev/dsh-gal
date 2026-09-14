/*
 * dsh-notes helper: Apple Notes through JXA. Run with
 *   osascript -l JavaScript notes.js <command> [args...]
 * Commands:
 *   list [limit] [bodies]    folders + notes (id, name, folder, dates, preview); previews for the `bodies` most recent
 *   read <id>                one note, full plaintext
 *   search <query> [limit]   name or body contains query (case-insensitive)
 *   create <folder> <title> <body>
 *   append <id> <text>
 * JSON on stdout; errors as `error:<message>` on stderr with exit 1, `denied:automation` when not authorised.
 */
ObjC.import('stdlib')

const PREVIEW = 400
const MAX_NOTES = 2000

function fail(message) {
  const text = String(message)
  const denied = /-1743|not authori[sz]ed|not permitted|-10004/i.test(text)
  $.NSFileHandle.fileHandleWithStandardError.writeData($.NSString.alloc.initWithUTF8String((denied ? 'denied:automation ' : 'error:') + text).dataUsingEncoding($.NSUTF8StringEncoding))
  $.exit(1)
}

const iso = d => (d instanceof Date && !isNaN(d.getTime())) ? d.toISOString() : null
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
/** Plain text → simple HTML paragraphs; blank lines separate paragraphs. */
const toHtml = text => String(text).replace(/\r\n?/g, '\n').split('\n').map(line => line.trim() === '' ? '<div><br></div>' : `<div>${esc(line)}</div>`).join('')

function app() {
  const notes = Application('Notes')
  notes.includeStandardAdditions = false
  return notes
}

/** All folders, flattened (Notes nests folders since macOS 10.15). */
function allFolders(notes) {
  const out = []
  const walk = (folders, prefix) => {
    for (const f of folders) {
      let name
      try { name = f.name() } catch (e) { continue }
      const path = prefix ? `${prefix}/${name}` : name
      out.push({ ref: f, name, path })
      try { walk(f.folders(), path) } catch (e) { /* no subfolders */ }
    }
  }
  walk(notes.folders(), '')
  return out
}

/** Bulk-fetch the index: one Apple Event per property, not per note. */
function index(notes) {
  const all = notes.notes
  const ids = all.id(), names = all.name(), modified = all.modificationDate(), created = all.creationDate()
  let folders = []
  try { folders = all.container.name() } catch (e) { folders = ids.map(() => '') }
  let locked = []
  try { locked = all.passwordProtected() } catch (e) { locked = ids.map(() => false) }
  const rows = ids.map((id, i) => ({ id, name: names[i] || 'Untitled', folder: folders[i] || '', modified: iso(modified[i]), created: iso(created[i]), locked: Boolean(locked[i]) }))
  rows.sort((a, b) => (b.modified || '').localeCompare(a.modified || ''))
  return rows
}

function byId(notes, id) {
  const hits = notes.notes.whose({ id })()
  if (hits.length === 0) throw new Error(`no note with id ${id}`)
  return hits[0]
}

function cmdList(argv) {
  const notes = app()
  const limit = Math.min(Number(argv[0]) || MAX_NOTES, MAX_NOTES)
  const bodies = Number(argv[1]) || 0
  const folders = allFolders(notes).map(f => { let count = 0; try { count = f.ref.notes.length } catch (e) { /* locked */ } return { name: f.name, path: f.path, count } })
  const rows = index(notes).slice(0, limit)
  if (bodies > 0) {
    // Plaintext for the most recent notes only; one event per note, and locked notes have no readable body.
    const head = rows.slice(0, bodies)
    for (const row of head) {
      if (row.locked) { row.preview = ''; continue }
      try { row.preview = String(notes.notes.byId(row.id).plaintext() || '').slice(0, PREVIEW) } catch (e) { row.preview = '' }
    }
  }
  return { folders, notes: rows, total: rows.length, truncated: rows.length >= limit }
}

function cmdRead(argv) {
  const notes = app()
  const id = argv[0]
  if (!id) throw new Error('read needs an id')
  const note = byId(notes, id)
  let folder = ''
  try { folder = note.container.name() } catch (e) { /* ignore */ }
  return { id: note.id(), name: note.name(), folder, modified: iso(note.modificationDate()), created: iso(note.creationDate()), body: String(note.plaintext() || '') }
}

function cmdSearch(argv) {
  const notes = app()
  const query = String(argv[0] || '').trim()
  const limit = Math.min(Number(argv[1]) || 20, 100)
  if (!query) throw new Error('search needs a query')
  const q = query.toLowerCase()
  const rows = index(notes).slice(0, MAX_NOTES)
  const hits = []
  // Titles first (cheap, already fetched), then bodies of the rest, most recent first, until we have enough.
  for (const row of rows) if (row.name.toLowerCase().includes(q)) { row.match = 'title'; hits.push(row) }
  if (hits.length < limit) {
    for (const row of rows) {
      if (hits.length >= limit) break
      if (row.match || row.locked) continue
      let body = ''
      try { body = String(notes.notes.byId(row.id).plaintext() || '') } catch (e) { continue }
      const at = body.toLowerCase().indexOf(q)
      if (at >= 0) { row.match = 'body'; row.snippet = body.slice(Math.max(0, at - 80), at + 120).replace(/\s+/g, ' ').trim(); hits.push(row) }
    }
  }
  return hits.slice(0, limit)
}

function cmdCreate(argv) {
  const notes = app()
  const folderName = String(argv[0] || '').trim(), title = String(argv[1] || '').trim(), body = String(argv[2] || '')
  if (!title) throw new Error('create needs a title')
  let folder
  if (folderName) {
    const found = allFolders(notes).find(f => f.name.toLowerCase() === folderName.toLowerCase() || f.path.toLowerCase() === folderName.toLowerCase())
    if (!found) throw new Error(`no folder named ${folderName}`)
    folder = found.ref
  } else {
    try { folder = notes.defaultAccount.defaultFolder() } catch (e) { folder = notes.folders()[0] }
  }
  // Notes takes the title from the first line of the body.
  const html = `<div><h1>${esc(title)}</h1></div>${toHtml(body)}`
  const note = notes.Note({ body: html })
  folder.notes.push(note)
  let fname = ''
  try { fname = folder.name() } catch (e) { /* ignore */ }
  return { id: note.id(), name: note.name(), folder: fname, modified: iso(note.modificationDate()) }
}

function cmdAppend(argv) {
  const notes = app()
  const id = argv[0], text = String(argv[1] || '')
  if (!id) throw new Error('append needs an id')
  if (!text.trim()) throw new Error('append needs text')
  const note = byId(notes, id)
  note.body = String(note.body()) + toHtml(text)
  return { id: note.id(), name: note.name(), modified: iso(note.modificationDate()) }
}

function run(argv) {
  const [command, ...rest] = argv
  try {
    const result = command === 'list' ? cmdList(rest) : command === 'read' ? cmdRead(rest) : command === 'search' ? cmdSearch(rest) : command === 'create' ? cmdCreate(rest) : command === 'append' ? cmdAppend(rest) : null
    if (result === null) throw new Error(`unknown command ${command}; use list | read | search | create | append`)
    return JSON.stringify(result)
  } catch (error) {
    fail(error && error.message ? `${error.message}${error.errorNumber ? ` (${error.errorNumber})` : ''}` : String(error))
  }
}
