import React from 'react'
import { Activity, AlertTriangle, Fan, Gauge, Lightbulb, Lock, Play, Power, Sparkles, Thermometer, ToggleLeft, Zap } from 'lucide-react'
import './home.css'

export type HomeReader = { name: string; output: string; at: string; error?: string }
export type HomeEntity = { id: string; name: string; domain: string; state: string; unit?: string }
export type HomeData = {
  backend: 'shortcuts' | 'homeassistant'
  folder?: string
  readers: HomeReader[]
  actions: { name: string; running?: boolean }[]
  entities?: HomeEntity[]
}
type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>

const TOGGLABLE = new Set(['light', 'switch', 'fan', 'input_boolean', 'media_player', 'humidifier'])
const RUNNABLE = new Set(['scene', 'script'])

const readerLabel = (name: string): string => name.replace(/^get\s+/i, '')
const agoLabel = (iso: string): string => {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60000)
  if (!Number.isFinite(m)) return ''
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 60 * 36 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`
}
/** A reader that returned a flat JSON object gets a key/value list; anything else is shown as text. */
const asRecord = (output: string): Record<string, string> | undefined => {
  if (!output.startsWith('{')) return undefined
  try {
    const parsed: unknown = JSON.parse(output)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return undefined
    const entries = Object.entries(parsed as Record<string, unknown>).filter(([, v]) => v === null || ['string', 'number', 'boolean'].includes(typeof v))
    return entries.length > 0 && entries.length <= 12 ? Object.fromEntries(entries.map(([k, v]) => [k, v === null ? '—' : String(v)])) : undefined
  } catch { return undefined }
}

function DomainIcon({ domain }: { domain: string }): React.ReactElement {
  const Icon = domain === 'light' ? Lightbulb : domain === 'switch' || domain === 'input_boolean' ? Power : domain === 'fan' ? Fan : domain === 'climate' ? Thermometer : domain === 'lock' ? Lock : domain === 'binary_sensor' ? Activity : domain === 'sensor' ? Gauge : domain === 'scene' || domain === 'script' ? Sparkles : ToggleLeft
  return <Icon />
}

function ReadingCard({ r }: { r: HomeReader }): React.ReactElement {
  const record = r.error && !r.output ? undefined : asRecord(r.output)
  const wide = Boolean(record) || r.output.length > 60
  return (
    <div className={`home-reading${wide ? ' wide' : ''}${r.error && !r.output ? ' failed' : ''}`} title={r.error ? r.error : undefined}>
      <small>{r.error ? <AlertTriangle /> : <Gauge />}{readerLabel(r.name)}</small>
      {record
        ? <dl>{Object.entries(record).map(([k, v]) => <React.Fragment key={k}><dt>{k}</dt><dd>{v}</dd></React.Fragment>)}</dl>
        : r.error && !r.output ? <b>{r.error}</b> : <b className={r.output ? '' : 'empty'}>{r.output || 'No output'}</b>}
      <time dateTime={r.at}>{r.error && r.output ? `Last good value · ${agoLabel(r.at)}` : `Updated ${agoLabel(r.at)}`}</time>
    </div>
  )
}

export function HomeView({ data, placeholder, busy, act }: { data?: HomeData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const [running, setRunning] = React.useState<string>('')
  const [ran, setRan] = React.useState<string>('')
  const [pending, setPending] = React.useState<Record<string, boolean>>({})
  const run = async (name: string): Promise<void> => {
    if (running) return
    setRunning(name); setRan('')
    const ok = await act('run', { json: { value: name } })
    setRunning('')
    if (ok) { setRan(name); window.setTimeout(() => setRan(current => current === name ? '' : current), 2500) }
  }
  const toggle = async (e: HomeEntity, on: boolean): Promise<void> => {
    setPending(p => ({ ...p, [e.id]: on }))
    const ok = await act('run', { json: { value: `${e.id} ${on ? 'on' : 'off'}` } })
    if (!ok) setPending(p => { const next = { ...p }; delete next[e.id]; return next })
    else window.setTimeout(() => setPending(p => { const next = { ...p }; delete next[e.id]; return next }), 4000)
  }

  const readers = data?.readers ?? []
  const actions = data?.actions ?? []
  const entities = data?.entities ?? []
  const devices = entities.filter(e => TOGGLABLE.has(e.domain) || e.domain === 'climate' || e.domain === 'cover' || e.domain === 'lock')
  const sensors = entities.filter(e => e.domain === 'sensor' || e.domain === 'binary_sensor')
  const scenes = entities.filter(e => RUNNABLE.has(e.domain))
  const empty = !placeholder && readers.length + actions.length + entities.length === 0

  if (placeholder || !data) {
    return (
      <div className="home placeholder" aria-hidden>
        <section className="home-group">
          <h3 className="section">Readings</h3>
          <div className="home-readings">
            {[0, 1].map(i => <div key={i} className="home-reading"><small><Gauge />&nbsp;</small><b className="empty">—</b><time>&nbsp;</time></div>)}
          </div>
        </section>
        <section className="home-group">
          <h3 className="section">Actions</h3>
          <div className="home-tiles">
            {[0, 1, 2].map(i => <div key={i} className="home-tile skeleton"><span className="home-tile-icon"><Play /></span><span /></div>)}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="home">
      {empty && <p className="home-empty">Nothing in the Shortcuts folder{data.folder ? ` "${data.folder}"` : ''} yet.<br /><span className="field-hint home-hint">Add "Get …" shortcuts for readings and any others as actions, then refresh.</span></p>}

      {(readers.length > 0 || sensors.length > 0) && (
        <section className="home-group">
          <h3 className="section">Readings <span className="badge">{readers.length + sensors.length}</span></h3>
          <div className="home-readings">
            {readers.map(r => <ReadingCard key={r.name} r={r} />)}
            {sensors.map(e => (
              <div key={e.id} className="home-reading" title={e.id}>
                <small><DomainIcon domain={e.domain} />{e.name}</small>
                <b>{e.state}{e.unit ? <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted-fg)', marginLeft: 3 }}>{e.unit}</span> : null}</b>
              </div>
            ))}
          </div>
        </section>
      )}

      {devices.length > 0 && (
        <section className="home-group">
          <h3 className="section">Devices <span className="badge">{devices.length}</span></h3>
          <ul className="home-devices">
            {devices.map(e => {
              const on = e.id in pending ? pending[e.id] : e.state === 'on'
              const canToggle = TOGGLABLE.has(e.domain)
              return (
                <li key={e.id} className="home-device" title={e.id}>
                  <span className={`home-device-icon${on && canToggle ? ' on' : ''}`}><DomainIcon domain={e.domain} /></span>
                  <span className="home-device-text"><b>{e.name}</b><small>{e.id}</small></span>
                  {canToggle
                    ? <input type="checkbox" className="switch" checked={Boolean(on)} disabled={busy !== '' || running !== ''} onChange={ev => { void toggle(e, ev.target.checked) }} />
                    : <span className="home-device-state">{e.state}{e.unit ? ` ${e.unit}` : ''}</span>}
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {(actions.length > 0 || scenes.length > 0) && (
        <section className="home-group">
          <h3 className="section">Actions <span className="badge">{actions.length + scenes.length}</span></h3>
          <div className="home-tiles">
            {actions.map(a => {
              const isRunning = running === a.name || Boolean(a.running)
              return (
                <button key={a.name} type="button" className={`home-tile${isRunning ? ' running' : ''}${ran === a.name ? ' done' : ''}`} disabled={busy !== '' && !isRunning || running !== ''} onClick={() => { void run(a.name) }} title={`Run "${a.name}"`}>
                  <span className="home-tile-icon">{isRunning ? <Zap /> : <Play />}</span>
                  <span>{a.name}</span>
                  {ran === a.name && <span className="home-tile-feedback">Ran</span>}
                </button>
              )
            })}
            {scenes.map(e => (
              <button key={e.id} type="button" className={`home-tile${running === e.id ? ' running' : ''}${ran === e.id ? ' done' : ''}`} disabled={busy !== '' || running !== ''} onClick={() => { void run(e.id) }} title={e.id}>
                <span className="home-tile-icon">{running === e.id ? <Zap /> : <Sparkles />}</span>
                <span>{e.name}</span>
                {ran === e.id && <span className="home-tile-feedback">Ran</span>}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
