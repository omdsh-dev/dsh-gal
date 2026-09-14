import './weread.css'
import React from 'react'
import { BookOpen, ChevronLeft, KeyRound, MessageSquareQuote, RefreshCw } from 'lucide-react'

export interface WereadBook { id: string; title: string; author: string; cover: string; category: string; finished: boolean; progress?: number; updatedAt: string; noteCount: number }
export interface WereadMark { text: string; at: string }
export interface WereadChapter { title: string; marks: WereadMark[]; notes: WereadMark[] }
export interface WereadData {
  connected: boolean
  expired?: boolean
  books: WereadBook[]
  highlights: Record<string, { chapters: WereadChapter[] }>
  syncedAt: string
}
type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>
type Filter = 'all' | 'reading' | 'finished' | 'notes'

export function WereadView({ data, placeholder, busy, act }: { data?: WereadData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const [selected, setSelected] = React.useState('')
  const [filter, setFilter] = React.useState<Filter>('all')
  const [cookie, setCookie] = React.useState('')
  const books = data?.books ?? []
  const connected = data?.connected ?? false
  const book = books.find(b => b.id === selected)

  const submitCookie = async (): Promise<void> => {
    const value = cookie.trim()
    if (!value) return
    if (await act('cookie', { json: { value } })) setCookie('')
  }

  if (!connected || data?.expired) {
    return (
      <div className={`weread${placeholder ? ' placeholder' : ''}`}>
        <div className="weread-connect">
          <div className="weread-connect-icon"><KeyRound /></div>
          <b>{data?.expired ? 'WeRead logged you out' : 'Connect WeRead'}</b>
          <p className="field-hint">Log in at weread.qq.com in a browser, copy the Cookie header from DevTools (Network → any request → Request Headers) and paste it here. It is stored locally and never shown again.</p>
          <div className="weread-cookie">
            <input className="input" type="password" value={cookie} placeholder="wr_vid=…; wr_skey=…" autoComplete="off" spellCheck={false} disabled={busy !== ''} onChange={e => setCookie(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); void submitCookie() } }} />
            <button type="button" className="button primary" disabled={busy !== '' || cookie.trim() === ''} onClick={() => { void submitCookie() }}>{busy === 'cookie' ? 'Connecting…' : 'Connect'}</button>
          </div>
        </div>
        <div className="weread-grid">
          {Array.from({ length: 5 }, (_, i) => <div key={i} className="weread-book ghost"><div className="weread-cover" /><span className="weread-title" /></div>)}
        </div>
      </div>
    )
  }

  if (book) {
    const h = data?.highlights[book.id]
    const marks = h?.chapters.reduce((n, c) => n + c.marks.length, 0) ?? 0
    const notes = h?.chapters.reduce((n, c) => n + c.notes.length, 0) ?? 0
    return (
      <div className="weread">
        <button type="button" className="text-button back" onClick={() => setSelected('')}><ChevronLeft /> Shelf</button>
        <div className="weread-detail-head">
          <Cover book={book} />
          <div className="weread-detail-meta">
            <h3>{book.title}</h3>
            <small>{book.author}{book.category ? ` · ${book.category}` : ''}</small>
            <div className="weread-detail-status">{book.finished ? <span className="badge weread-finished">Finished</span> : <Progress value={book.progress} wide />}</div>
            <small>{h ? `${marks} highlights · ${notes} notes` : book.noteCount > 0 ? `${book.noteCount} notes on WeRead, not fetched yet` : 'No highlights on WeRead'}</small>
            {(book.noteCount > 0 || h) && <button type="button" className="button" disabled={busy !== ''} onClick={() => { void act('fetch', { json: { book: book.id } }) }}><RefreshCw className={busy === 'fetch' ? 'spinning' : ''} />{h ? 'Refetch' : 'Fetch highlights'}</button>}
          </div>
        </div>
        {h && h.chapters.length > 0 ? h.chapters.map((c, i) => (
          <section key={i} className="weread-chapter">
            <h3 className="section">{c.title}</h3>
            {c.marks.map((m, k) => <blockquote key={`m${k}`} className="weread-quote">{m.text}</blockquote>)}
            {c.notes.map((n, k) => <div key={`n${k}`} className="weread-note"><MessageSquareQuote /><div>{n.text.split('\n').map((line, j) => <p key={j} className={line.startsWith('> ') ? 'weread-note-ref' : ''}>{line.replace(/^> /, '')}</p>)}</div></div>)}
          </section>
        )) : <p className="rem-empty">{h ? 'Nothing marked in this book.' : 'Highlights show up here once fetched.'}</p>}
      </div>
    )
  }

  const visible = books.filter(b => filter === 'all' ? true : filter === 'reading' ? !b.finished : filter === 'finished' ? b.finished : b.noteCount > 0)
  const cached = Object.keys(data?.highlights ?? {}).length
  return (
    <div className={`weread${placeholder ? ' placeholder' : ''}`}>
      <div className="weread-bar">
        <div className="weread-filters">
          {(['all', 'reading', 'finished', 'notes'] as Filter[]).map(f => <button key={f} type="button" className={`weread-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f === 'all' ? `All ${books.length}` : f === 'reading' ? 'Reading' : f === 'finished' ? 'Finished' : 'With notes'}</button>)}
        </div>
        <button type="button" className="button" disabled={busy !== '' || placeholder} title={`${cached} books with cached highlights`} onClick={() => { void act('sync') }}><RefreshCw className={busy === 'sync' ? 'spinning' : ''} />{busy === 'sync' ? 'Syncing…' : 'Sync highlights'}</button>
      </div>
      {visible.length === 0 && <p className="rem-empty">{placeholder ? 'Waiting for the shelf' : 'Nothing here.'}</p>}
      <div className="weread-grid">
        {visible.map(b => (
          <button key={b.id} type="button" className="weread-book" onClick={() => setSelected(b.id)} title={`${b.title}${b.author ? ` — ${b.author}` : ''}`}>
            <Cover book={b} />
            <span className="weread-title">{b.title}</span>
            {b.finished ? <span className="badge weread-finished">Finished</span> : <Progress value={b.progress} />}
          </button>
        ))}
      </div>
    </div>
  )
}

function Cover({ book }: { book: WereadBook }): React.ReactElement {
  const [broken, setBroken] = React.useState(false)
  return (
    <div className="weread-cover">
      {book.cover && !broken ? <img src={book.cover} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setBroken(true)} /> : <BookOpen />}
      {book.noteCount > 0 && <span className="weread-count" title={`${book.noteCount} notes`}>{book.noteCount}</span>}
    </div>
  )
}

function Progress({ value, wide }: { value?: number; wide?: boolean }): React.ReactElement {
  const v = value === undefined ? 0 : Math.max(0, Math.min(100, value))
  return (
    <span className={`weread-progress${wide ? ' wide' : ''}`} title={value === undefined ? 'In progress' : `${v}%`}>
      <i style={{ width: `${v}%` }} />
      {wide && <small>{value === undefined ? 'In progress' : `${v}% read`}</small>}
    </span>
  )
}
