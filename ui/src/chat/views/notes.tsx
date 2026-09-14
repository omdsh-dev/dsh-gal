/* Notes: folder chips, a searchable list of note cards. The plugin sends the 300 most recent notes with a short preview. */
import * as React from 'react'
import { Folder, Lock, Search, StickyNote, X } from 'lucide-react'
import './notes.css'

export type NotesData = {
  folders: { name: string; count: number }[]
  notes: { id: string; title: string; folder: string; modified: string; preview: string; locked?: boolean }[]
}

const relative = (iso: string): string => {
  if (!iso) return ''
  const min = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (min < 1) return 'just now'
  if (min < 60) return `${min} min ago`
  if (min < 60 * 36) return `${Math.round(min / 60)} h ago`
  if (min < 60 * 24 * 14) return `${Math.round(min / 1440)} d ago`
  const d = new Date(iso)
  return d.getFullYear() === new Date().getFullYear() ? d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function NotesView({ data, placeholder, busy, act }: { data?: NotesData; placeholder: boolean; busy: string; act: (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean> }): React.ReactElement {
  void busy; void act
  const [folder, setFolder] = React.useState('')
  const [query, setQuery] = React.useState('')
  const folders = data?.folders ?? []
  const notes = data?.notes ?? []
  const q = query.trim().toLowerCase()
  const shown = notes.filter(n => (folder === '' || n.folder === folder) && (q === '' || n.title.toLowerCase().includes(q) || n.preview.toLowerCase().includes(q)))
  const chips = [{ name: '', label: 'All', count: notes.length }, ...folders.map(f => ({ name: f.name, label: f.name, count: f.count }))]
  const skeleton = placeholder && notes.length === 0

  return (
    <div className={`notes${placeholder ? ' placeholder' : ''}`}>
      <div className="notes-search">
        <Search />
        <input className="input" value={query} placeholder="Search notes…" disabled={skeleton} onChange={e => setQuery(e.target.value)} />
        {query !== '' && <button type="button" className="icon-button small notes-clear" title="Clear" onClick={() => setQuery('')}><X /></button>}
      </div>
      <div className="notes-chips">
        {skeleton
          ? [96, 72, 84].map((w, i) => <span key={i} className="notes-chip skeleton" style={{ width: w }} />)
          : chips.map(c => (
            <button key={c.name} type="button" className={`notes-chip${folder === c.name ? ' active' : ''}`} onClick={() => setFolder(c.name)}>
              {c.name === '' ? <StickyNote /> : <Folder />}<span className="notes-chip-name">{c.label}</span><small>{c.count}</small>
            </button>
          ))}
      </div>
      {skeleton ? (
        <ul className="notes-list">
          {[0, 1, 2, 3].map(i => (
            <li key={i} className="notes-card skeleton"><span className="notes-line w60" /><span className="notes-line w90" /><span className="notes-line w40" /></li>
          ))}
        </ul>
      ) : shown.length === 0 ? (
        <p className="rem-empty">{notes.length === 0 ? 'No notes yet.' : q ? `Nothing matches "${query}".` : 'This folder is empty.'}</p>
      ) : (
        <ul className="notes-list">
          {shown.map(n => (
            <li key={n.id} className="notes-card">
              <div className="notes-card-head">
                <b className="notes-title">{n.locked && <Lock className="notes-lock" />}{n.title || 'Untitled'}</b>
                <small className="notes-time">{relative(n.modified)}</small>
              </div>
              {n.preview
                ? <p className="notes-preview">{n.preview}</p>
                : <p className="notes-preview muted">{n.locked ? 'Locked note' : 'No preview'}</p>}
              {folder === '' && n.folder && <span className="notes-folder"><Folder />{n.folder}</span>}
            </li>
          ))}
        </ul>
      )}
      {!skeleton && notes.length > 0 && <p className="field-hint notes-foot">{shown.length === notes.length ? `${notes.length} most recent notes` : `${shown.length} of ${notes.length} recent notes`}{q === '' ? '' : ' · search the rest through the character'}</p>}
    </div>
  )
}
