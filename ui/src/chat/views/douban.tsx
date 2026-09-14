import './douban.css'
import { useMemo, useState } from 'react'
import { BookOpen, Clapperboard, Disc3, Film, Search, Star } from 'lucide-react'

export type DoubanKind = 'movie' | 'book' | 'music'
export type DoubanStatus = 'wish' | 'done'
export interface DoubanItem { id: string; kind: DoubanKind; status: DoubanStatus; title: string; url: string; cover: string; date: string; rating?: number; comment?: string }
export interface DoubanData {
  uid: string
  items: DoubanItem[]
  counts: Record<DoubanKind, Record<DoubanStatus, number>>
  syncedAt?: string
}

type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>
const KINDS: { id: DoubanKind; label: string; Icon: typeof Film }[] = [{ id: 'movie', label: 'Movies', Icon: Film }, { id: 'book', label: 'Books', Icon: BookOpen }, { id: 'music', label: 'Music', Icon: Disc3 }]
const STATUS_LABEL: Record<DoubanKind, Record<DoubanStatus, string>> = {
  movie: { wish: 'Want to watch', done: 'Watched' }, book: { wish: 'Want to read', done: 'Read' }, music: { wish: 'Want to listen', done: 'Listened' },
}
const PAGE = 48

function Stars({ n }: { n: number }): React.ReactElement {
  return <span className="douban-stars" aria-label={`${n} of 5`}>{[1, 2, 3, 4, 5].map(i => <Star key={i} className={i <= n ? '' : 'off'} />)}</span>
}

function Cover({ item }: { item: DoubanItem }): React.ReactElement {
  const [broken, setBroken] = useState(false)
  const Icon = item.kind === 'movie' ? Clapperboard : item.kind === 'book' ? BookOpen : Disc3
  return (
    <div className={`douban-cover${item.kind === 'music' ? ' music' : ''}`}>
      {item.cover && !broken
        ? <img src={item.cover} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setBroken(true)} />
        : <span className="douban-blank"><Icon /></span>}
    </div>
  )
}

export function DoubanView({ data, placeholder }: { data?: DoubanData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const [kind, setKind] = useState<DoubanKind>('movie')
  const [status, setStatus] = useState<DoubanStatus>('wish')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE)

  const items = useMemo(() => {
    const q = query.trim().toLowerCase()
    const words = q ? q.split(/\s+/) : []
    return (data?.items ?? []).filter(i => i.kind === kind && i.status === status && (words.length === 0 || words.every(w => i.title.toLowerCase().includes(w) || (i.comment ?? '').toLowerCase().includes(w))))
  }, [data, kind, status, query])

  if (placeholder || !data) {
    return (
      <div className="douban placeholder">
        <div className="douban-bar">
          <div className="douban-tabs">{KINDS.map(k => <span key={k.id} className={`douban-tab${k.id === 'movie' ? ' active' : ''}`}><k.Icon />{k.label}</span>)}</div>
          <span className="douban-seg"><button type="button" className="active">Wish</button><button type="button">Done</button></span>
        </div>
        <div className="douban-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="douban-tile"><div className="douban-cover" /><span className="douban-line" /><span className="douban-line short" /></div>
          ))}
        </div>
      </div>
    )
  }

  const pick = (k: DoubanKind, s: DoubanStatus): void => { setKind(k); setStatus(s); setShown(PAGE) }
  const visible = items.slice(0, shown)
  return (
    <div className="douban">
      <div className="douban-bar">
        <div className="douban-tabs">
          {KINDS.map(k => (
            <button key={k.id} type="button" className={`douban-tab${k.id === kind ? ' active' : ''}`} onClick={() => pick(k.id, status)}>
              <k.Icon />{k.label}<small>{data.counts[k.id].wish + data.counts[k.id].done}</small>
            </button>
          ))}
        </div>
        <span className="douban-seg">
          <button type="button" className={status === 'wish' ? 'active' : ''} onClick={() => pick(kind, 'wish')}>Wish</button>
          <button type="button" className={status === 'done' ? 'active' : ''} onClick={() => pick(kind, 'done')}>Done</button>
        </span>
        <label className="douban-search">
          <Search />
          <input className="input" value={query} placeholder={`Search ${STATUS_LABEL[kind][status].toLowerCase()}…`} onChange={e => { setQuery(e.target.value); setShown(PAGE) }} />
        </label>
      </div>
      <div className="douban-meta">
        <span>{STATUS_LABEL[kind][status]} · {query ? `${items.length} of ${data.counts[kind][status]}` : data.counts[kind][status]}{!query && data.counts[kind][status] > items.length ? ` (${items.length} loaded)` : ''}</span>
        <a href={`https://${kind}.douban.com/people/${encodeURIComponent(data.uid)}/${status === 'wish' ? 'wish' : 'collect'}`} target="_blank" rel="noreferrer">Open on Douban</a>
      </div>
      {items.length === 0 && <p className="rem-empty">{query ? `Nothing matching "${query}".` : `Nothing here yet.`}</p>}
      {items.length > 0 && (
        <div className="douban-grid">
          {visible.map(i => (
            <a key={`${i.kind}-${i.id}`} className="douban-tile" href={i.url} target="_blank" rel="noreferrer" title={i.comment ? `${i.title}\n${i.comment}` : i.title}>
              <Cover item={i} />
              <b>{i.title}</b>
              <small>{i.status === 'done' && i.rating ? <Stars n={i.rating} /> : null}<span>{i.date}</span></small>
              {i.status === 'done' && i.comment ? <span className="douban-comment">{i.comment}</span> : null}
            </a>
          ))}
        </div>
      )}
      {items.length > shown && <button type="button" className="button douban-more" onClick={() => setShown(n => n + PAGE)}>Show more ({items.length - shown} left)</button>}
    </div>
  )
}
