/* Location: where the Mac is, as a hero card with a radar, recent places as chips, and a way to pin a place by name. */
import * as React from 'react'
import { Globe, Home, LocateFixed, MapPin, Navigation } from 'lucide-react'
import './location.css'

type Place = { name: string; locality: string; subLocality: string; administrativeArea: string; country: string; isoCountryCode: string; timeZone: string }
export type LocationData = {
  current: { lat: number; lon: number; accuracy: number; at: string; source: 'device' | 'manual'; place: Place | null }
  home?: { lat: number; lon: number; name: string }
  manual: boolean
  systemTimeZone: string
  history: { lat: number; lon: number; name: string; first: string; last: string; visits: number }[]
  distanceFromHomeKm?: number
}
type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>

const minutesAgo = (iso: string): number => Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60000))
const ago = (iso: string): string => { const m = minutesAgo(iso); return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 60 * 36 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago` }
const km = (n: number): string => n < 1 ? `${Math.round(n * 1000)} m` : n < 10 ? `${n.toFixed(1)} km` : `${Math.round(n)} km`
const placeName = (p: Place | null, c: { lat: number; lon: number }): string => p?.subLocality || p?.name || p?.locality || `${c.lat.toFixed(4)}, ${c.lon.toFixed(4)}`
const placeLine = (p: Place | null): string => p ? [p.locality || p.name, p.administrativeArea && p.administrativeArea !== p.locality ? p.administrativeArea : '', p.country].filter(Boolean).join(', ') : ''

/** Concentric rings, the accuracy circle to scale, and the dot. The outer ring is the scale, labelled in metres. */
function Radar({ accuracy, pinned, idle }: { accuracy: number; pinned: boolean; idle: boolean }): React.ReactElement {
  const R = Math.max(100, accuracy * 1.4)
  const r = accuracy > 0 ? Math.max(6, accuracy / R * 54) : 0
  const scale = R >= 1000 ? `${(R / 1000).toFixed(R >= 10000 ? 0 : 1)} km` : `${Math.round(R)} m`
  return (
    <svg className={`loc-radar${idle ? ' idle' : ''}`} viewBox="0 0 120 120" aria-hidden="true">
      <circle className="loc-ring" cx="60" cy="60" r="54" />
      <circle className="loc-ring" cx="60" cy="60" r="36" />
      <circle className="loc-ring" cx="60" cy="60" r="18" />
      <line className="loc-ring" x1="60" y1="4" x2="60" y2="116" />
      <line className="loc-ring" x1="4" y1="60" x2="116" y2="60" />
      {!idle && <circle className="loc-sweep" cx="60" cy="60" r="54" />}
      {r > 0 && <circle className="loc-acc" cx="60" cy="60" r={r} />}
      {!idle && <circle className="loc-pulse" cx="60" cy="60" r="5" />}
      <circle className={`loc-dot${pinned ? ' pinned' : ''}`} cx="60" cy="60" r={idle ? 3 : 5} />
      {!idle && !pinned && <text className="loc-scale" x="114" y="114" textAnchor="end">{scale}</text>}
    </svg>
  )
}

export function LocationView({ data, placeholder, busy, act }: { data?: LocationData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const [text, setText] = React.useState('')
  const pin = async (): Promise<void> => {
    const value = text.trim()
    if (!value) return
    if (await act('location', { json: { value } })) setText('')
  }
  const c = data?.current
  const idle = !c
  const p = c?.place ?? null
  const tz = p?.timeZone && data && p.timeZone !== data.systemTimeZone ? p.timeZone : ''
  const atHome = data?.distanceFromHomeKm !== undefined && data.distanceFromHomeKm <= 0.5
  const history = data?.history ?? []
  return (
    <div className={`loc${placeholder || idle ? ' placeholder' : ''}`}>
      <div className="loc-hero">
        <Radar accuracy={c?.accuracy ?? 0} pinned={c?.source === 'manual'} idle={idle} />
        <div className="loc-where">
          <div className="loc-name">{c ? placeName(p, c) : '—'}</div>
          <div className="loc-line">{c ? placeLine(p) || 'Somewhere on the map' : placeholder ? 'Waiting for a location fix' : ''}</div>
          <div className="loc-meta">
            {c && <span><LocateFixed /> {c.source === 'manual' ? 'Pinned by name' : `Updated ${ago(c.at)}`}{c.accuracy > 0 ? ` · ±${Math.round(c.accuracy)} m` : ''}</span>}
            {c && data?.home && <span className={atHome ? 'on' : ''}><Home /> {atHome ? 'At home' : `${km(data.distanceFromHomeKm ?? 0)} from ${data.home.name}`}</span>}
            {tz && <span><Globe /> {tz}</span>}
          </div>
        </div>
      </div>

      <div className="loc-actions">
        <button type="button" className="button" disabled={busy !== '' || idle} onClick={() => { void act('setHome') }}><Home /> {busy === 'setHome' ? 'Saving…' : data?.home ? 'Update home' : 'Set as home'}</button>
        {data?.manual && <button type="button" className="text-button" disabled={busy !== ''} onClick={() => { void act('location', { json: { value: 'auto' } }) }}><Navigation /> Use this Mac's location</button>}
      </div>

      <h3 className="section">Recent places</h3>
      {history.length === 0 ? (
        <div className="loc-chips">{idle ? [0, 1, 2].map(i => <span key={i} className="loc-chip ghost" />) : <span className="loc-chip current"><MapPin /> {c ? placeName(p, c) : ''}</span>}</div>
      ) : (
        <div className="loc-chips">
          {history.slice(0, 10).map((h, i) => (
            <span key={`${h.lat},${h.lon}`} className={`loc-chip${i === 0 ? ' current' : ''}${data?.home && Math.abs(h.lat - data.home.lat) < 0.006 && Math.abs(h.lon - data.home.lon) < 0.006 ? ' home' : ''}`} title={`${h.lat.toFixed(3)}, ${h.lon.toFixed(3)} · first ${h.first.slice(0, 16).replace('T', ' ')}`}>
              {i === 0 ? <MapPin /> : <Home />}
              {h.name}
              <small>{i === 0 ? 'now' : ago(h.last)}{h.visits > 1 ? ` · ${h.visits}×` : ''}</small>
            </span>
          ))}
        </div>
      )}

      <h3 className="section">Use a different place</h3>
      <div className="loc-pin">
        <input className="input" value={text} placeholder="City or place name, e.g. Tokyo" disabled={busy !== ''} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); void pin() } }} />
        <button type="button" className="button primary" disabled={busy !== '' || text.trim() === ''} onClick={() => { void pin() }}>{busy === 'location' ? 'Pinning…' : 'Pin'}</button>
      </div>
      <p className="field-hint">Pins the place instead of asking this Mac; no permission needed. "Use this Mac's location" goes back.</p>
    </div>
  )
}
