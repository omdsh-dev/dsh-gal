/* What she remembers about you: one fact per row, edited in place. */
import * as React from 'react'
import { X } from 'lucide-react'
import { Panel } from './Panel'
import { getJson, postJson, type MemoryEntry } from './lib'

export function MemoryPanel({ open, onOpenChange, entries, setEntries, notify }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  entries: MemoryEntry[]
  setEntries: (entries: MemoryEntry[]) => void
  notify: (text: string) => void
}): React.ReactElement {
  const [draft, setDraft] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (!open) return
    getJson<{ entries: MemoryEntry[] }>('/memory').then(data => setEntries(data.entries)).catch(err => notify(`Could not load memory: ${(err as Error).message}`))
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  const save = async (next: MemoryEntry[]): Promise<void> => {
    try { setEntries((await postJson<{ entries: MemoryEntry[] }>('/memory', { entries: next })).entries) }
    catch (err) { notify(`Save failed: ${(err as Error).message}`) }
  }
  const add = async (): Promise<void> => {
    const text = draft.trim()
    if (text === '') return
    setDraft('')
    await save([...entries, { date: new Date().toISOString().slice(0, 10), text }])
  }
  return (
    <Panel open={open} onOpenChange={onOpenChange} title="Memory" subtitle="Notes about you. Every character shares them, and they survive switching packs."
      footer={
        <form className="row" onSubmit={e => { e.preventDefault(); if (!(e.nativeEvent as SubmitEvent & { isComposing?: boolean }).isComposing) void add() }}>
          <input ref={inputRef} className="input" value={draft} onChange={e => setDraft(e.target.value)} placeholder="Remember something…" spellCheck={false} />
          <button type="submit" className="button primary" disabled={draft.trim() === ''}>Add</button>
        </form>
      }>
      {entries.length === 0 && <p className="empty">Nothing remembered yet.</p>}
      <ul className="mem-list">
        {entries.map((entry, index) => <MemoryRow key={`${entry.date}-${index}`} entry={entry} onChange={text => { void save(entries.map((item, i) => i === index ? { ...item, text } : item)) }} onDrop={() => { void save(entries.filter((_, i) => i !== index)) }} />)}
      </ul>
    </Panel>
  )
}

function MemoryRow({ entry, onChange, onDrop }: { entry: MemoryEntry; onChange: (text: string) => void; onDrop: () => void }): React.ReactElement {
  const [value, setValue] = React.useState(entry.text)
  React.useEffect(() => setValue(entry.text), [entry.text])
  const commit = (): void => { const text = value.trim(); if (text === '' ) { setValue(entry.text); return } if (text !== entry.text) onChange(text) }
  return (
    <li className="mem-row">
      <span className="mem-date">{entry.date}</span>
      <input className="mem-fact" value={value} spellCheck={false} onChange={e => setValue(e.target.value)} onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLInputElement).blur() } if (e.key === 'Escape') { e.preventDefault(); setValue(entry.text); (e.target as HTMLInputElement).blur() } }} />
      <button type="button" className="icon-button small" title="Forget this" aria-label="Forget this" onClick={onDrop}><X /></button>
    </li>
  )
}
