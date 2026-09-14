import * as React from 'react'
import { Heart, Image as ImageIcon, Images, Play } from 'lucide-react'
import { postJson } from '../lib'
import './photos.css'

export type PhotosData = {
  days: { day: string; count: number }[]
  recent: { id: string; at: string | null; type: 'image' | 'video' | 'other'; w: number; h: number; fav: boolean; hasLocation: boolean; duration?: number | null }[]
  albums: { title: string; count: number }[]
}
type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>

const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const SHORT_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const pad = (n: number): string => String(n).padStart(2, '0')
const mmss = (s: number): string => `${Math.floor(s / 60)}:${pad(Math.round(s % 60))}`
const dayTitle = (day: string): string => `${WEEKDAY[new Date(`${day}T12:00:00`).getDay()]}, ${SHORT_MONTH[Number(day.slice(5, 7)) - 1]} ${Number(day.slice(8))}`
const hhmm = (iso: string): string => iso.slice(11, 16)

/** Thumbnails come through `act('thumb')` as data URLs (the server serves no files); fetched lazily per visible tile, cached for the session. */
const thumbCache = new Map<string, string>()
const thumbFailed = new Set<string>()

function Tile({ item, dim }: { item: PhotosData['recent'][number]; dim: boolean }): React.ReactElement {
  const [src, setSrc] = React.useState<string | undefined>(thumbCache.get(item.id))
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (src || dim || thumbFailed.has(item.id) || !ref.current) return
    const node = ref.current
    let cancelled = false
    const load = (): void => { void fetchThumb(item.id).then(url => { if (cancelled) return; if (url) setSrc(url); else thumbFailed.add(item.id) }) }
    if (typeof IntersectionObserver === 'undefined') { load(); return }
    const io = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { io.disconnect(); load() } }, { rootMargin: '200px' })
    io.observe(node)
    return () => { cancelled = true; io.disconnect() }
  }, [item.id, src, dim])
  const label = item.at ? `${dayTitle(item.at.slice(0, 10))} ${hhmm(item.at)}` : ''
  return (
    <div ref={ref} className={`photos-tile${src ? ' loaded' : ''}`} title={`${label}${item.w ? ` · ${item.w}×${item.h}` : ''}${item.hasLocation ? ' · located' : ''}`}>
      {src ? <img src={src} alt="" loading="lazy" draggable={false} /> : <span className="photos-tile-blank"><ImageIcon /></span>}
      {item.type === 'video' && <span className="photos-video"><Play />{item.duration ? mmss(item.duration) : ''}</span>}
      {item.fav && <span className="photos-fav"><Heart /></span>}
    </div>
  )
}

/**
 * The plugin's `act('thumb', { json: { id } })` answers `{ dataUrl }`; the
 * panel's own `act` discards bodies and reloads the source on every call, so
 * tiles post to the same route directly, one lazy request per visible tile.
 */
async function fetchThumb(id: string): Promise<string | undefined> {
  const cached = thumbCache.get(id)
  if (cached) return cached
  try {
    const body = await postJson<{ dataUrl?: string }>('/sources/photos/thumb', { id })
    if (body.dataUrl) thumbCache.set(id, body.dataUrl)
    return body.dataUrl
  } catch { return undefined }
}

export function PhotosView({ data, placeholder, busy }: { data?: PhotosData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const days = data?.days ?? Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); return { day: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, count: 0 } })
  const recent = data?.recent ?? []
  const albums = data?.albums ?? []
  const max = Math.max(1, ...days.map(d => d.count))
  const total = days.reduce((s, d) => s + d.count, 0)
  const dim = placeholder || !data
  const tiles: PhotosData['recent'] = dim && recent.length === 0 ? Array.from({ length: 10 }, (_, i) => ({ id: `blank-${i}`, at: null, type: 'image' as const, w: 0, h: 0, fav: false, hasLocation: false })) : recent
  return (
    <div className={`photos${dim ? ' placeholder' : ''}`}>
      <section className="photos-strip">
        <div className="photos-strip-head"><h3 className="section">Photos per day</h3><small>{dim ? '' : `${total} in 30 days`}</small></div>
        <div className="photos-bars">
          {days.map(d => (
            <div key={d.day} className="photos-bar-col" title={`${dayTitle(d.day)}: ${d.count} photo${d.count === 1 ? '' : 's'}`}>
              <div className={`photos-bar${d.count === 0 ? ' none' : ''}`} style={{ height: `${d.count === 0 ? 3 : Math.max(6, d.count / max * 100)}%` }} />
            </div>
          ))}
        </div>
        <div className="photos-bar-axis"><small>{dayTitle(days[0]!.day)}</small><small>Today</small></div>
      </section>

      <section>
        <h3 className="section">Recent {!dim && recent.length > 0 && <span className="badge">{recent.length}</span>}</h3>
        {tiles.length === 0
          ? <p className="rem-empty">{busy === 'refresh' ? 'Loading…' : 'No photos in the last 30 days.'}</p>
          : <div className="photos-grid">{tiles.map(item => <Tile key={item.id} item={item} dim={dim} />)}</div>}
      </section>

      {(albums.length > 0 || dim) && (
        <section>
          <h3 className="section">Albums</h3>
          <div className="photos-albums">
            {(dim && albums.length === 0 ? [{ title: '', count: 0 }, { title: '', count: 0 }, { title: '', count: 0 }] : albums).map((a, i) => (
              <div key={`${a.title}-${i}`} className="photos-album">
                <span className="photos-album-icon">{a.title === 'Favorites' ? <Heart /> : <Images />}</span>
                <span className="photos-album-text"><b>{a.title || ' '}</b><small>{a.title ? `${a.count} item${a.count === 1 ? '' : 's'}` : ' '}</small></span>
              </div>
            ))}
          </div>
        </section>
      )}
      {dim && <p className="field-hint" style={{ marginTop: 12 }}>Thumbnails and a 30-day activity strip appear here once Photos access is granted.</p>}
    </div>
  )
}
