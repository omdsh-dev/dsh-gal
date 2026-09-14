import * as React from 'react'
import { Eye, EyeOff, Users } from 'lucide-react'
import './messages.css'

export type MessagesThread = { id: number; name: string; participants: string[]; last: string; lastFromMe: boolean; awaiting: boolean; snippet: string; count: number }
export type MessagesData = {
  /** Whether the character sees the counts and names. */
  shared: boolean
  /** Days in the window. */
  window: number
  threads: MessagesThread[]
  days: { day: string; sent: number; received: number }[]
}

const CJK = /[぀-ヿ㐀-鿿가-힯]/
function initials(name: string): string {
  const s = name.trim()
  if (!s || /^[+\d(]/.test(s)) return '#'
  if (CJK.test(s[0]!)) return s[0]!
  const words = s.split(/\s+/).filter(Boolean)
  return words.slice(0, 2).map(w => w[0]!.toUpperCase()).join('')
}
function hue(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return h
}
function ago(iso: string): string {
  const min = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (min < 1) return 'now'
  if (min < 60) return `${min} min`
  if (min < 60 * 36) return `${Math.round(min / 60)} h`
  if (min < 60 * 24 * 14) return `${Math.round(min / 1440)} d`
  return iso.slice(0, 10)
}

function Row({ t, awaiting }: { t: MessagesThread; awaiting: boolean }): React.ReactElement {
  const group = t.participants.length > 1
  return (
    <li className={`messages-row${awaiting ? ' awaiting' : ''}`}>
      <span className="messages-avatar" style={{ '--h': hue(t.name) } as React.CSSProperties}>{group ? <Users /> : initials(t.name)}</span>
      <span className="messages-text">
        <b>{t.name}{group && <small className="messages-count">{t.participants.length}</small>}</b>
        <small className="messages-snippet">{t.snippet ? `${t.lastFromMe ? 'You: ' : ''}${t.snippet}` : t.count > 0 ? `${t.count} message${t.count === 1 ? '' : 's'}` : ''}</small>
      </span>
      <small className="messages-meta">{ago(t.last)}</small>
    </li>
  )
}

export function MessagesView({ data, placeholder }: { data?: MessagesData; placeholder: boolean; busy: string; act: (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean> }): React.ReactElement {
  const threads = data?.threads ?? []
  const waiting = threads.filter(t => t.awaiting)
  const recent = threads.filter(t => !t.awaiting)
  const shared = data?.shared ?? false
  return (
    <div className={`messages${placeholder ? ' placeholder' : ''}`}>
      <p className={`messages-note${shared ? ' on' : ''}`}>
        {shared ? <Eye /> : <EyeOff />}
        <span>{shared ? <>She sees <b>counts and names</b> of who is waiting, never a message.</> : <><b>Hidden from the character.</b> Turn on sharing to let her see who is waiting.</>}</span>
      </p>
      {placeholder && (
        <ul className="messages-list messages-skeleton" aria-hidden>
          {[0, 1, 2, 3].map(i => <li key={i} className="messages-row"><span className="messages-avatar" /><span className="messages-text"><b /><small /></span><small className="messages-meta" /></li>)}
        </ul>
      )}
      {!placeholder && threads.length === 0 && <p className="rem-empty">No conversations in the last {data?.window ?? 7} days.</p>}
      {waiting.length > 0 && (
        <section className="messages-group">
          <h3 className="section">Awaiting your reply <span className="badge">{waiting.length}</span></h3>
          <ul className="messages-list">{waiting.map(t => <Row key={t.id} t={t} awaiting />)}</ul>
        </section>
      )}
      {recent.length > 0 && (
        <section className="messages-group">
          <h3 className="section">Recent <span className="badge">{recent.length}</span></h3>
          <ul className="messages-list">{recent.map(t => <Row key={t.id} t={t} awaiting={false} />)}</ul>
        </section>
      )}
    </div>
  )
}
