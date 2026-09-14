/* Contacts: the address book as a searchable, alphabetical list, with the birthdays that are close at the top. */
import * as React from 'react'
import { Cake, Search, UserRound } from 'lucide-react'
import './contacts.css'

export type ContactsData = {
  contacts: { id: string; name: string; org: string; emails: string[]; phones: string[]; birthday: string | null }[]
  birthdays: { id: string; name: string; date: string; inDays: number }[]
}
type Contact = ContactsData['contacts'][number]

const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Anna Lindqvist" → "AL"; a company or a single word gives one letter. */
function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '·'
  const first = words[0]!, last = words.length > 1 ? words[words.length - 1]! : ''
  // CJK names are family-first and short: show the last character.
  if (/[぀-ヿ㐀-鿿가-힯]/.test(first)) return first.slice(-1)
  return ((first[0] ?? '') + (last[0] ?? '')).toUpperCase()
}
/** A stable hue per name so avatars vary without being loud. */
function hue(name: string): number {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)!) >>> 0
  return h % 360
}
function letterOf(name: string): string {
  const ch = name.trim()[0] ?? '#'
  return /\p{L}/u.test(ch) ? (/[A-Za-zÀ-ɏ]/.test(ch) ? ch.normalize('NFD')[0]!.toUpperCase() : ch) : '#'
}
const whenWords = (b: { date: string; inDays: number }): string => b.inDays === 0 ? 'Today' : b.inDays === 1 ? 'Tomorrow' : `${MONTH[Number(b.date.slice(5, 7)) - 1]} ${Number(b.date.slice(8, 10))} · in ${b.inDays} days`

function Avatar({ name, dim }: { name: string; dim?: boolean }): React.ReactElement {
  return <span className={`contacts-avatar${dim ? ' dim' : ''}`} style={dim ? undefined : { '--h': hue(name) } as React.CSSProperties}>{dim ? '' : initials(name)}</span>
}

export function ContactsView({ data, placeholder }: { data?: ContactsData; placeholder: boolean; busy: string; act: (action: string, body?: { json?: unknown; file?: File }) => Promise<boolean> }): React.ReactElement {
  const [query, setQuery] = React.useState('')
  const contacts = data?.contacts ?? []
  const birthdays = (data?.birthdays ?? []).filter(b => b.inDays <= 30)

  const q = query.trim().toLowerCase(), qd = q.replace(/\D/g, '')
  const shown = React.useMemo(() => q === '' ? contacts : contacts.filter(c =>
    c.name.toLowerCase().includes(q) || c.org.toLowerCase().includes(q) || c.emails.some(e => e.toLowerCase().includes(q)) || (qd.length >= 3 && c.phones.some(p => p.replace(/\D/g, '').includes(qd))),
  ), [contacts, q, qd])
  const groups = React.useMemo(() => {
    const map = new Map<string, Contact[]>()
    for (const c of shown) { const k = letterOf(c.name); (map.get(k) ?? map.set(k, []).get(k)!).push(c) }
    return [...map.entries()].sort(([a], [b]) => a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b))
  }, [shown])

  if (placeholder || !data) {
    return (
      <div className="contacts placeholder">
        <div className="contacts-search"><Search /><input className="input" placeholder="Search by name, company, email or number" disabled /></div>
        <ul className="contacts-list">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className="contacts-row">
              <Avatar name="" dim />
              <span className="contacts-text"><i className="contacts-skeleton" style={{ width: `${38 + (i * 17) % 30}%` }} /><i className="contacts-skeleton short" style={{ width: `${22 + (i * 11) % 20}%` }} /></span>
            </li>
          ))}
        </ul>
        <p className="rem-empty">Waiting for access to Contacts</p>
      </div>
    )
  }

  return (
    <div className="contacts">
      {birthdays.length > 0 && (
        <section className="contacts-bdays">
          <h3 className="section"><Cake /> Birthdays <span className="badge">{birthdays.length}</span></h3>
          <div className="contacts-bday-strip">
            {birthdays.map(b => (
              <div key={b.id} className={`contacts-bday${b.inDays === 0 ? ' today' : ''}`}>
                <Avatar name={b.name} />
                <span className="contacts-bday-text"><b>{b.name}</b><small>{whenWords(b)}</small></span>
              </div>
            ))}
          </div>
        </section>
      )}
      <div className="contacts-search">
        <Search />
        <input className="input" value={query} placeholder="Search by name, company, email or number" onChange={e => setQuery(e.target.value)} />
        {query !== '' && <button type="button" className="text-button" onClick={() => setQuery('')}>Clear</button>}
      </div>
      {shown.length === 0 && <p className="rem-empty">{contacts.length === 0 ? 'The address book is empty.' : `Nobody matches “${query.trim()}”.`}</p>}
      {groups.map(([letter, list]) => (
        <section key={letter} className="contacts-group">
          <h4 className="contacts-letter">{letter}</h4>
          <ul className="contacts-list">
            {list.map(c => {
              const detail = c.phones[0] ?? c.emails[0] ?? ''
              return (
                <li key={c.id} className="contacts-row">
                  <Avatar name={c.name} />
                  <span className="contacts-text">
                    <b>{c.name || <span className="contacts-unnamed"><UserRound /> No name</span>}</b>
                    {(c.org || detail) && <small>{c.org}{c.org && detail ? ' · ' : ''}{detail}</small>}
                  </span>
                  {c.birthday && <small className="contacts-meta" title={`Birthday ${c.birthday}`}><Cake />{MONTH[Number(c.birthday.slice(-5, -3)) - 1]} {Number(c.birthday.slice(-2))}</small>}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
      {contacts.length >= 500 && q === '' && <p className="field-hint contacts-foot">Showing the first 500 by name. Search to find anyone else.</p>}
    </div>
  )
}
