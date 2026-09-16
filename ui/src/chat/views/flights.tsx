import './flights.css'
import { Plane, PlaneLanding, PlaneTakeoff, X } from 'lucide-react'

export interface FlightLeg { iata: string; name: string; city: string; tz: string; terminal?: string; gate?: string; time: string; revisedTime?: string }
export interface FlightCard {
  id: string; number: string; date: string; dateLabel: string; airline: string; status: string; statusText: string
  tone: 'ok' | 'warn' | 'bad' | 'done' | 'flat'; delay: number; aircraft?: string; error?: string; at?: string; final: boolean
  dep?: FlightLeg; arr?: FlightLeg
}
export interface FlightsData { hasKey: boolean; flights: FlightCard[] }

type Act = (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean>

function Leg({ leg, kind }: { leg?: FlightLeg; kind: 'dep' | 'arr' }): React.ReactElement {
  const Icon = kind === 'dep' ? PlaneTakeoff : PlaneLanding
  if (!leg) return <div className={`fl-leg ${kind}`}><Icon /><b>—</b></div>
  const meta = [leg.terminal ? `T${leg.terminal}` : '', leg.gate ? `Gate ${leg.gate}` : ''].filter(Boolean).join(' · ')
  return (
    <div className={`fl-leg ${kind}`}>
      <Icon />
      <div className="fl-code">{leg.iata}</div>
      <div className="fl-time">{leg.revisedTime ? <><s>{leg.time}</s> {leg.revisedTime}</> : leg.time}</div>
      <div className="fl-city">{leg.city || leg.name}</div>
      {meta && <div className="fl-meta">{meta}</div>}
    </div>
  )
}

export function FlightsView({ data, placeholder, busy, act }: { data?: FlightsData; placeholder: boolean; busy: string; act: Act }): React.ReactElement {
  const flights = data?.flights ?? []
  if (!data?.hasKey) return <div className="fl placeholder"><div className="fl-empty"><Plane /><b>{placeholder ? 'Paste an AeroDataBox key below to start' : 'No key'}</b><small>Flights you add are checked around departure and dropped two days after they fly.</small></div></div>
  if (!flights.length) return <div className="fl"><div className="fl-empty"><Plane /><b>No flights tracked</b><small>Add one below by number and date, or let her pick it up from a booking mail.</small></div></div>
  return (
    <div className="fl">
      {flights.map(f => (
        <article key={f.id} className={`fl-card ${f.tone}`}>
          <header>
            <b>{f.number}</b>
            <span className="fl-airline">{f.airline}{f.aircraft ? ` · ${f.aircraft}` : ''}</span>
            <span className="fl-date">{f.dateLabel}</span>
            <button type="button" className="fl-x" title="Stop following" disabled={busy === 'untrack'} onClick={() => { void act('untrack', { json: { value: f.id } }) }}><X /></button>
          </header>
          <div className="fl-route">
            <Leg leg={f.dep} kind="dep" />
            <div className="fl-line"><i /><Plane /><i /></div>
            <Leg leg={f.arr} kind="arr" />
          </div>
          <footer>
            <span className={`fl-status ${f.tone}`}>{f.statusText}</span>
            {f.error && f.dep && <small className="fl-err">last check failed: {f.error}</small>}
            {f.at && <small className="fl-at">checked {ago(f.at)}</small>}
          </footer>
        </article>
      ))}
    </div>
  )
}

function ago(iso: string): string {
  const m = Math.round((Date.now() - Date.parse(iso)) / 60_000)
  return m < 1 ? 'just now' : m < 60 ? `${m} min ago` : m < 60 * 36 ? `${Math.round(m / 60)} h ago` : `${Math.round(m / 1440)} d ago`
}
