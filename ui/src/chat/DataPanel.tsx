/* Connectors: what she can see about your day. A fixed-size dialog, sources down the left, one source's own view on the right. */
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { BookOpen, CalendarDays, Check, ChevronLeft, ChevronRight, Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Copy, Film, HeartPulse, House, Image as ImageIcon, ListChecks, MapPin, MessageCircle, Moon, Plug, RefreshCw, StickyNote, Sun, Upload, Users, X } from 'lucide-react'
import { getJson, withToken } from './lib'
import { ContactsView, type ContactsData } from './views/contacts'
import { NotesView, type NotesData } from './views/notes'
import { PhotosView, type PhotosData } from './views/photos'
import { MessagesView, type MessagesData } from './views/messages'
import { LocationView, type LocationData } from './views/location'
import { HomeView, type HomeData } from './views/home'
import { WereadView } from './views/weread'
import { DoubanView } from './views/douban'

export type SourceView = {
  status: 'connected' | 'empty' | 'error'
  summary: string
  shared: boolean
  placeholder?: boolean
  data?: unknown
  stats?: { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }[]
  series?: { label: string; unit?: string; points: { day: string; value?: number }[] }[]
  lists?: { title: string; items: { primary: string; secondary?: string }[] }[]
  setup?: { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }[]
  actions?: { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; accept?: string; value?: boolean; confirm?: string; hint?: string; placeholder?: string }[]
}
export type Source = { id: string; label: string; category: string; view: SourceView }
type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>

const CATEGORY_LABEL: Record<string, string> = { health: 'Health', calendar: 'Calendar', tasks: 'Tasks', mail: 'Mail', notes: 'Notes', finance: 'Finance', location: 'Location', media: 'Media', other: 'Other' }
const CATEGORY_ICON: Record<string, React.ComponentType> = { health: HeartPulse, calendar: CalendarDays, tasks: ListChecks, location: MapPin, notes: StickyNote, mail: MessageCircle, media: Film }
const SOURCE_ICON: Record<string, React.ComponentType> = { weather: CloudSun, contacts: Users, photos: ImageIcon, home: House, weread: BookOpen }
/** Actions a bespoke view renders itself, so the generic action row must not repeat them. */
const VIEW_OWNED: Record<string, string[]> = { reminders: ['add'], location: ['setHome', 'location'], home: ['run'], weread: ['sync', 'cookie', 'fetch', 'disconnect'], photos: ['thumb'] }

export function DataPanel({ open, onOpenChange, version, notify }: { open: boolean; onOpenChange: (open: boolean) => void; version: number; notify: (text: string) => void }): React.ReactElement {
  const [sources, setSources] = React.useState<Source[] | null>(null)
  const [active, setActive] = React.useState('')
  const [busy, setBusy] = React.useState('')
  const reload = React.useCallback(() => {
    getJson<{ sources: Source[] }>('/sources').then(data => {
      setSources(data.sources)
      setActive(cur => data.sources.some(s => s.id === cur) ? cur : (data.sources[0]?.id ?? ''))
    }).catch(err => notify(`Could not load connectors: ${(err as Error).message}`))
  }, [notify])
  React.useEffect(() => { if (open) reload() }, [open, version, reload])

  const source = sources?.find(s => s.id === active)
  const act: Act = async (action, body) => {
    if (!source) return false
    setBusy(action)
    try {
      const init: RequestInit = body?.file
        ? { method: 'POST', headers: { 'content-type': body.file.type || 'application/octet-stream' }, body: body.file }
        : { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body?.json ?? {}) }
      const res = await fetch(withToken(`/sources/${encodeURIComponent(source.id)}/${encodeURIComponent(action)}`), init)
      const data = await res.json().catch(() => ({})) as { error?: string; message?: string }
      if (!res.ok) throw new Error(data.error ?? res.statusText)
      if (data.message) notify(data.message)
      reload()
      return true
    } catch (err) { notify(`${source.label}: ${(err as Error).message}`); return false }
    finally { setBusy('') }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="panel-overlay" />
        <Dialog.Content className="panel full connectors" aria-describedby={undefined} onOpenAutoFocus={e => e.preventDefault()}>
          <aside className="src-side">
            <div className="src-side-head">
              <Dialog.Title className="panel-title">Connectors</Dialog.Title>
              <p className="panel-subtitle">What she can see about your day.</p>
            </div>
            <nav className="src-nav">
              {sources === null ? <p className="empty">Loading…</p>
                : sources.length === 0 ? <p className="empty">No connectors loaded.</p>
                : sources.map(s => {
                  const Icon = SOURCE_ICON[s.id] ?? CATEGORY_ICON[s.category] ?? Plug
                  return (
                    <button key={s.id} type="button" className={`src-item${s.id === active ? ' active' : ''}`} onClick={() => setActive(s.id)}>
                      <span className="src-icon"><Icon /></span>
                      <span className="src-text"><b>{s.label}</b><small><i className={`dot ${s.view.status}`} />{s.view.status === 'connected' ? (s.view.shared ? 'Connected' : 'Connected · hidden') : s.view.status === 'error' ? 'Needs attention' : 'Not set up'}</small></span>
                    </button>
                  )
                })}
            </nav>
            <p className="src-side-foot">Each connector is a dsh plugin under <code>plugins/</code>.</p>
          </aside>
          <section className="src-main">
            <Dialog.Close className="icon-button src-close" aria-label="Close"><X /></Dialog.Close>
            {source ? <SourceMain key={source.id} source={source} busy={busy} act={act} /> : sources !== null && sources.length === 0 ? <EmptyCatalog /> : null}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function EmptyCatalog(): React.ReactElement {
  return (
    <div className="src-empty">
      <Plug />
      <p>No connectors are loaded.</p>
      <p className="field-hint">Mount one of the plugins under <code>plugins/</code> (health, calendar, weather) in your dsh config and it appears here.</p>
    </div>
  )
}

function SourceMain({ source, busy, act }: { source: Source; busy: string; act: Act }): React.ReactElement {
  const v = source.view
  const shared = (v.actions ?? []).find(a => a.kind === 'toggle')
  const refresh = (v.actions ?? []).find(a => a.id === 'refresh')
  const owned = VIEW_OWNED[source.id] ?? []
  const rest = (v.actions ?? []).filter(a => a.kind !== 'toggle' && a.id !== 'refresh' && !owned.includes(a.id))
  const body = source.id === 'calendar' ? <CalendarView data={v.data as CalendarData | undefined} placeholder={v.status !== 'connected'} />
    : source.id === 'reminders' ? <RemindersView data={v.data as RemindersData | undefined} busy={busy} act={act} placeholder={v.status !== 'connected'} />
    : source.id === 'weather' ? <WeatherView data={v.data as WeatherData | undefined} placeholder={v.status !== 'connected'} />
    : source.id === 'contacts' ? <ContactsView data={v.data as ContactsData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'notes' ? <NotesView data={v.data as NotesData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'photos' ? <PhotosView data={v.data as PhotosData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'messages' ? <MessagesView data={v.data as MessagesData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'location' ? <LocationView data={v.data as LocationData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'home' ? <HomeView data={v.data as HomeData | undefined} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'weread' ? <WereadView data={v.data as never} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : source.id === 'douban' ? <DoubanView data={v.data as never} placeholder={v.status !== 'connected'} busy={busy} act={act} />
    : <GenericView view={v} />
  return (
    <>
      <header className="src-head">
        <div className="src-titles">
          <h2>{source.label} <span className="badge">{CATEGORY_LABEL[source.category] ?? source.category}</span></h2>
          <p className={`source-summary ${v.status}`}>{v.summary}</p>
        </div>
        <div className="src-head-actions">
          {shared && <label className="src-shared" title={shared.hint}><span>{shared.label}</span><input type="checkbox" className="switch" checked={Boolean(shared.value)} disabled={busy !== ''} onChange={e => { void act(shared.id, { json: { value: e.target.checked } }) }} /></label>}
          {refresh && <button type="button" className={`icon-button${busy === 'refresh' ? ' spinning' : ''}`} title="Refresh" disabled={busy !== ''} onClick={() => { void act('refresh') }}><RefreshCw /></button>}
        </div>
      </header>
      <div className="src-body">
        {v.status === 'error' && <div className="src-error">{v.summary}</div>}
        {body}
        {(v.setup?.length || rest.length) ? (
          <div className="src-setup">
            {v.setup?.map(block => (
              <details key={block.title} className="details" open={v.status !== 'connected'}>
                <summary>{block.title}</summary>
                <ol className="setup-steps">{block.steps.map((step, i) => <li key={i}>{step}</li>)}</ol>
                {block.fields?.map(field => <CopyField key={field.label} label={field.label} value={field.value} secret={field.secret} />)}
              </details>
            ))}
            {rest.length > 0 && <ActionRow actions={rest} busy={busy} act={act} />}
          </div>
        ) : null}
      </div>
    </>
  )
}

function ActionRow({ actions, busy, act }: { actions: NonNullable<SourceView['actions']>; busy: string; act: Act }): React.ReactElement {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const pending = React.useRef('')
  return (
    <div className="row end" style={{ marginTop: 14, flexWrap: 'wrap' }}>
      {actions.map(a => (
        <button key={a.id} type="button" className={`button${a.kind === 'danger' ? ' danger' : ''}`} disabled={busy !== ''} title={a.hint}
          onClick={() => {
            if (a.kind === 'upload') { pending.current = a.id; if (fileRef.current) fileRef.current.accept = a.accept ?? ''; fileRef.current?.click(); return }
            if (a.kind === 'danger' && a.confirm && !window.confirm(a.confirm)) return
            if (a.kind === 'input') { const value = window.prompt(a.hint ?? a.label, a.placeholder ?? ''); if (value === null || value.trim() === '') return; void act(a.id, { json: { value: value.trim() } }); return }
            void act(a.id)
          }}>
          {a.kind === 'upload' && <Upload />}{busy === a.id ? 'Working…' : a.label}
        </button>
      ))}
      <input ref={fileRef} type="file" hidden onChange={e => { const file = e.target.files?.[0]; e.target.value = ''; if (file) void act(pending.current, { file }) }} />
    </div>
  )
}

// ---- generic blocks (health and anything new) --------------------------------

function GenericView({ view: v }: { view: SourceView }): React.ReactElement {
  return (
    <div className={`source${v.placeholder ? ' placeholder' : ''}`}>
      {v.stats && v.stats.length > 0 && (
        <div className="stat-grid">
          {v.stats.map(s => <div key={s.label} className="stat"><small>{s.label}</small><b>{s.value}</b>{s.delta && <span className={`stat-delta ${s.tone ?? 'flat'}`}>{s.delta}</span>}</div>)}
        </div>
      )}
      {v.series?.map(series => <Bars key={series.label} series={series} />)}
      {v.lists?.map(list => (
        <section key={list.title}>
          <h3 className="section">{list.title}</h3>
          <ul className="source-list">{list.items.map((item, i) => <li key={i}><span>{item.primary}</span>{item.secondary && <small>{item.secondary}</small>}</li>)}</ul>
        </section>
      ))}
      {v.placeholder && <p className="field-hint" style={{ marginTop: 12 }}>A preview of what will show up here once data arrives.</p>}
    </div>
  )
}

/** Small bars. Missing days stay as gaps so a quiet week does not read as a bad one. */
function Bars({ series }: { series: NonNullable<SourceView['series']>[number] }): React.ReactElement {
  const values = series.points.map(p => p.value).filter((v): v is number => v !== undefined)
  const max = Math.max(1, ...values)
  const min = Math.min(...values)
  const narrow = values.length > 1 && min > 0 && (max - min) / max < 0.35
  const base = narrow ? min - (max - min) * 0.5 : 0
  const height = (v: number): number => Math.max(4, (v - base) / (max - base) * 100)
  return (
    <section className="bars">
      <div className="bars-head"><h3 className="section">{series.label}</h3><small>{values.length === 0 ? '' : `avg ${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(series.unit === '' ? 0 : 1)}${series.unit ? ` ${series.unit}` : ''}`}</small></div>
      <div className="bars-row">
        {series.points.map(p => (
          <div key={p.day} className="bar-col" title={`${p.day.replace('T', ' ')}: ${p.value === undefined ? 'no data' : `${p.value}${series.unit ? ` ${series.unit}` : ''}`}`}>
            <div className={`bar${p.value === undefined ? ' none' : ''}`} style={{ height: `${p.value === undefined ? 4 : height(p.value)}%` }} />
            <small>{p.day.includes('T') ? p.day.slice(11, 13) : p.day.slice(8)}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function CopyField({ label, value, secret }: { label: string; value: string; secret?: boolean }): React.ReactElement {
  const [copied, setCopied] = React.useState(false)
  const [shown, setShown] = React.useState(!secret)
  return (
    <div className="copy-field">
      <small>{label}</small>
      <code onClick={() => setShown(true)} title={shown ? undefined : 'Click to reveal'}>{shown ? value : '•'.repeat(Math.min(24, value.length))}</code>
      <button type="button" className="icon-button small" title="Copy" onClick={() => { void navigator.clipboard.writeText(value).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 1200) }) }}>{copied ? <Check /> : <Copy />}</button>
    </div>
  )
}

// ---- dates ------------------------------------------------------------------

const pad = (n: number): string => String(n).padStart(2, '0')
const dayStr = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const shiftDay = (day: string, n: number): string => { const d = new Date(`${day}T12:00:00`); d.setDate(d.getDate() + n); return dayStr(d) }
const weekdayOf = (day: string): number => new Date(`${day}T12:00:00`).getDay()
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const minutesOf = (iso: string): number => Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16))
const hhmm = (iso: string): string => iso.slice(11, 16)
const SHORT_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const shortDay = (day: string, today: string): string => day === today ? 'Today' : day === shiftDay(today, 1) ? 'Tomorrow' : `${WEEKDAY[weekdayOf(day)]}, ${SHORT_MONTH[Number(day.slice(5, 7)) - 1]} ${Number(day.slice(8))}${day.slice(0, 4) === today.slice(0, 4) ? '' : ` ${day.slice(0, 4)}`}`
const dayTitle = (day: string, today: string): string => day === today ? 'Today' : day === shiftDay(today, 1) ? 'Tomorrow' : day === shiftDay(today, -1) ? 'Yesterday' : `${WEEKDAY[weekdayOf(day)]}, ${MONTH[Number(day.slice(5, 7)) - 1]} ${Number(day.slice(8))}`

// ---- calendar ---------------------------------------------------------------

type CalEvent = { id: string; title: string; start: string; end: string; allDay: boolean; location: string; calendar: string; color: string; status: string }
type CalendarData = { today: string; events: CalEvent[] }

function CalendarView({ data, placeholder }: { data?: CalendarData; placeholder: boolean }): React.ReactElement {
  const today = data?.today ?? dayStr(new Date())
  const events = data?.events ?? []
  const [selected, setSelected] = React.useState(today)
  const [weekStart, setWeekStart] = React.useState(() => shiftDay(today, -((weekdayOf(today) + 6) % 7)))
  const days = Array.from({ length: 7 }, (_, i) => shiftDay(weekStart, i))
  const on = (day: string): CalEvent[] => events.filter(e => e.start.slice(0, 10) === day || (e.allDay && e.start.slice(0, 10) <= day && e.end.slice(0, 10) > day))
  // The plugin loads from Monday of this week to two weeks out; outside that the strip is greyed.
  const known = (day: string): boolean => day >= shiftDay(today, -((weekdayOf(today) + 6) % 7)) && day < shiftDay(today, 14)
  const dayEvents = on(selected)
  const timed = dayEvents.filter(e => !e.allDay).sort((a, b) => a.start.localeCompare(b.start))
  const allDay = dayEvents.filter(e => e.allDay)
  const endMin = (e: CalEvent): number => e.end.slice(0, 10) > e.start.slice(0, 10) ? 24 * 60 : minutesOf(e.end)
  const firstMin = timed.length ? Math.min(...timed.map(e => minutesOf(e.start))) : 9 * 60
  const lastMin = timed.length ? Math.max(...timed.map(endMin)) : 18 * 60
  const h0 = Math.max(0, Math.min(8, Math.floor(firstMin / 60) - 1))
  const h1 = Math.min(24, Math.max(19, Math.ceil(lastMin / 60) + 1))
  const span = (h1 - h0) * 60
  // Overlapping events share the width: greedy columns within each cluster.
  const placed = React.useMemo(() => {
    const out: { e: CalEvent; col: number; cols: number }[] = []
    let cols: number[] = [], cluster: typeof out = [], clusterEnd = -1
    const flush = (): void => { for (const item of cluster) item.cols = cols.length; cluster = []; cols = [] }
    for (const e of timed) {
      const s = minutesOf(e.start), en = Math.max(s + 15, endMin(e))
      if (s >= clusterEnd) flush()
      let col = cols.findIndex(end => end <= s)
      if (col === -1) { cols.push(en); col = cols.length - 1 } else cols[col] = en
      clusterEnd = Math.max(clusterEnd, en)
      const item = { e, col, cols: 1 }
      cluster.push(item); out.push(item)
    }
    flush()
    return out
  }, [timed])
  const nowMin = today === selected ? new Date().getHours() * 60 + new Date().getMinutes() : -1
  return (
    <div className={`cal${placeholder ? ' placeholder' : ''}`}>
      <div className="cal-week-head">
        <button type="button" className="icon-button small" onClick={() => setWeekStart(shiftDay(weekStart, -7))} aria-label="Previous week"><ChevronLeft /></button>
        <b>{MONTH[Number(weekStart.slice(5, 7)) - 1]} {weekStart.slice(0, 4)}</b>
        <button type="button" className="text-button" onClick={() => { setWeekStart(shiftDay(today, -((weekdayOf(today) + 6) % 7))); setSelected(today) }}>Today</button>
        <button type="button" className="icon-button small" onClick={() => setWeekStart(shiftDay(weekStart, 7))} aria-label="Next week"><ChevronRight /></button>
      </div>
      <div className="cal-week">
        {days.map(day => {
          const list = on(day)
          return (
            <button key={day} type="button" className={`cal-day${day === selected ? ' selected' : ''}${day === today ? ' today' : ''}${known(day) ? '' : ' unknown'}`} onClick={() => setSelected(day)}>
              <small>{WEEKDAY[weekdayOf(day)]}</small>
              <b>{Number(day.slice(8))}</b>
              <span className="cal-dots">{list.slice(0, 4).map(e => <i key={e.id} style={{ background: e.color || 'var(--brand)' }} />)}</span>
            </button>
          )
        })}
      </div>
      <div className="cal-day-head">
        <h3>{dayTitle(selected, today)}</h3>
        <small>{dayEvents.length === 0 ? (known(selected) ? 'Nothing scheduled' : 'Not loaded') : `${dayEvents.length} event${dayEvents.length === 1 ? '' : 's'}`}</small>
      </div>
      {allDay.length > 0 && <div className="cal-allday">{allDay.map(e => <span key={e.id} className="cal-chip" style={{ borderColor: e.color || 'var(--brand)' }}>{e.title}<small>{e.calendar}</small></span>)}</div>}
      <div className="cal-grid" style={{ height: `${(h1 - h0) * 44}px` }}>
        {Array.from({ length: h1 - h0 }, (_, i) => <div key={i} className="cal-hour" style={{ top: `${i / (h1 - h0) * 100}%` }}><small>{pad(h0 + i)}:00</small></div>)}
        {nowMin >= h0 * 60 && nowMin <= h1 * 60 && <div className="cal-now" style={{ top: `${(nowMin - h0 * 60) / span * 100}%` }} />}
        {placed.map(({ e, col, cols }) => {
          const s = minutesOf(e.start), en = Math.max(s + 20, endMin(e))
          return (
            <div key={e.id} className={`cal-event${e.status === 'canceled' ? ' canceled' : ''}${en - s < 40 ? ' short' : ''}`} title={`${hhmm(e.start)}–${hhmm(e.end)} ${e.title}${e.location ? ` @ ${e.location}` : ''}`}
              style={{ top: `${(s - h0 * 60) / span * 100}%`, height: `${(en - s) / span * 100}%`, left: `calc(52px + (100% - 60px) * ${col / cols})`, width: `calc((100% - 60px) * ${1 / cols} - 4px)`, borderLeftColor: e.color || 'var(--brand)', background: `color-mix(in oklab, ${e.color || 'var(--brand)'} 14%, var(--card))` }}>
              <b>{e.title}</b>
              <small>{hhmm(e.start)}–{hhmm(e.end)}{e.location ? ` · ${e.location.split('\n')[0]}` : ''}</small>
            </div>
          )
        })}
        {timed.length === 0 && <div className="cal-free">{placeholder ? 'Waiting for calendar access' : 'Free'}</div>}
      </div>
    </div>
  )
}

// ---- reminders --------------------------------------------------------------

type Reminder = { id: string; title: string; due: string | null; hasTime: boolean; list: string; priority: number; notes: string }
type RemindersData = { today: string; reminders: Reminder[] }

function RemindersView({ data, busy, act, placeholder }: { data?: RemindersData; busy: string; act: Act; placeholder: boolean }): React.ReactElement {
  const today = data?.today ?? dayStr(new Date())
  const [text, setText] = React.useState('')
  const [done, setDone] = React.useState<Set<string>>(new Set())
  const items = (data?.reminders ?? []).filter(r => !done.has(r.id))
  const groups: [string, Reminder[]][] = [
    ['Overdue', items.filter(r => r.due !== null && r.due.slice(0, 10) < today)],
    ['Today', items.filter(r => r.due !== null && r.due.slice(0, 10) === today)],
    ['Coming up', items.filter(r => r.due !== null && r.due.slice(0, 10) > today).sort((a, b) => a.due!.localeCompare(b.due!))],
    ['No date', items.filter(r => r.due === null)],
  ]
  const complete = async (r: Reminder): Promise<void> => {
    setDone(prev => new Set(prev).add(r.id))
    const ok = await act('complete', { json: { value: r.id } })
    if (!ok) setDone(prev => { const next = new Set(prev); next.delete(r.id); return next })
  }
  const submit = async (): Promise<void> => {
    const value = text.trim()
    if (!value) return
    if (await act('add', { json: { value } })) setText('')
  }
  const dueLabel = (r: Reminder): string => r.due === null ? '' : `${shortDay(r.due.slice(0, 10), today)}${r.hasTime ? ` ${hhmm(r.due)}` : ''}`
  return (
    <div className={`rem${placeholder ? ' placeholder' : ''}`}>
      <div className="rem-add">
        <input className="input" value={text} placeholder="Add a reminder… e.g. Call mum tomorrow 18:00" disabled={busy !== '' || placeholder} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); void submit() } }} />
        <button type="button" className="button primary" disabled={busy !== '' || text.trim() === ''} onClick={() => { void submit() }}>{busy === 'add' ? 'Adding…' : 'Add'}</button>
      </div>
      {items.length === 0 && <p className="rem-empty">{placeholder ? 'Waiting for reminders access' : 'All clear. Nothing open.'}</p>}
      {groups.filter(([, list]) => list.length > 0).map(([title, list]) => (
        <section key={title} className="rem-group">
          <h3 className="section">{title} <span className="badge">{list.length}</span></h3>
          <ul className="rem-list">
            {list.map(r => (
              <li key={r.id} className={`rem-row${title === 'Overdue' ? ' overdue' : ''}`}>
                <button type="button" className="rem-check" title="Mark done" disabled={busy !== ''} onClick={() => { void complete(r) }}><Check /></button>
                <span className="rem-text"><b>{r.title}</b>{r.notes && <small className="rem-notes">{r.notes.split('\n')[0]}</small>}</span>
                <small className="rem-meta">{dueLabel(r)}{dueLabel(r) && ' · '}{r.list}</small>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

// ---- weather ----------------------------------------------------------------

type WeatherData = {
  place: { name: string; country: string }; units: { deg: string; wind: string }
  current: { time: string; temp: number; feels: number; code: number; text: string; humidity: number; wind: number; isDay: boolean }
  hourly: { time: string; temp: number; rain: number; code: number }[]
  daily: { day: string; label: string; code: number; text: string; max: number; min: number; rain: number; sunrise: string; sunset: string; uv: number }[]
}
function WeatherIcon({ code, night }: { code: number; night?: boolean }): React.ReactElement {
  const Icon = code === 0 || code === 1 ? (night ? Moon : Sun) : code === 2 ? CloudSun : code === 3 ? Cloud : code <= 48 ? CloudFog : code <= 57 ? CloudDrizzle : code <= 67 || (code >= 80 && code <= 82) ? CloudRain : code <= 77 || code === 85 || code === 86 ? CloudSnow : code >= 95 ? CloudLightning : Cloud
  return <Icon />
}

function WeatherView({ data, placeholder }: { data?: WeatherData; placeholder: boolean }): React.ReactElement {
  if (!data) return <div className="wx placeholder"><div className="wx-hero"><div className="wx-icon"><Cloud /></div><div className="wx-temp">—</div><div className="wx-desc"><b>{placeholder ? 'Waiting for the forecast' : ''}</b></div></div></div>
  const r = (n: number): string => String(Math.round(n))
  const weekMin = Math.min(...data.daily.map(d => d.min)), weekMax = Math.max(...data.daily.map(d => d.max))
  const range = Math.max(1, weekMax - weekMin)
  return (
    <div className="wx">
      <div className="wx-hero">
        <div className="wx-icon"><WeatherIcon code={data.current.code} night={!data.current.isDay} /></div>
        <div className="wx-temp">{r(data.current.temp)}<span>{data.units.deg}</span></div>
        <div className="wx-desc">
          <b>{data.current.text}</b>
          <small>Feels like {r(data.current.feels)}{data.units.deg} · humidity {data.current.humidity}% · wind {r(data.current.wind)} {data.units.wind}</small>
          <small>{data.daily[0] ? `High ${r(data.daily[0].max)} · low ${r(data.daily[0].min)} · UV ${r(data.daily[0].uv)} · sun ${hhmm(data.daily[0].sunrise)}–${hhmm(data.daily[0].sunset)}` : ''}</small>
        </div>
      </div>
      <div className="wx-hours">
        {data.hourly.map((h, i) => (
          <div key={h.time} className="wx-hour">
            <small>{i === 0 ? 'Now' : `${h.time.slice(11, 13)}h`}</small>
            <WeatherIcon code={h.code} night={Number(h.time.slice(11, 13)) < 6 || Number(h.time.slice(11, 13)) >= 19} />
            <b>{r(h.temp)}°</b>
            <small className={`wx-rain${h.rain >= 30 ? ' on' : ''}`}>{h.rain >= 20 ? `${h.rain}%` : ''}</small>
          </div>
        ))}
      </div>
      <ul className="wx-days">
        {data.daily.map(d => (
          <li key={d.day}>
            <span className="wx-day">{d.label}</span>
            <span className="wx-day-icon"><WeatherIcon code={d.code} /></span>
            <span className="wx-day-text">{d.text}</span>
            <span className={`wx-rain${d.rain >= 30 ? ' on' : ''}`}>{d.rain >= 20 ? `${d.rain}%` : ''}</span>
            <span className="wx-lo">{r(d.min)}°</span>
            <span className="wx-range"><i style={{ left: `${(d.min - weekMin) / range * 100}%`, width: `${Math.max(6, (d.max - d.min) / range * 100)}%` }} /></span>
            <span className="wx-hi">{r(d.max)}°</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
