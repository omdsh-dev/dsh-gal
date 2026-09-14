/* Lists she keeps for you. She maintains them with tools; you edit them here. */
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, ListChecks, Plus, Trash2, X } from 'lucide-react'
import { getJson, postJson, type List, type ListItem } from './lib'

export function ListsPanel({ open, onOpenChange, lists, setLists, openId, notify }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  lists: List[]
  setLists: (lists: List[]) => void
  openId: string | null
  notify: (text: string) => void
}): React.ReactElement {
  const [active, setActive] = React.useState<string | null>(null)
  const [creating, setCreating] = React.useState(false)
  React.useEffect(() => {
    if (!open) return
    getJson<{ lists: List[] }>('/lists').then(data => setLists(data.lists)).catch(err => notify(`Could not load lists: ${(err as Error).message}`))
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => { if (open && openId) { setActive(openId); setCreating(false) } }, [open, openId])
  React.useEffect(() => {
    if (active !== null && lists.some(list => list.id === active)) return
    setActive(lists[0]?.id ?? null)
  }, [lists, active])
  const act = async (body: Record<string, unknown>): Promise<boolean> => {
    try { setLists((await postJson<{ lists: List[] }>('/lists', body)).lists); return true }
    catch (err) { notify(`Could not update the list: ${(err as Error).message}`); return false }
  }
  const list = creating ? null : lists.find(item => item.id === active) ?? null
  const sorted = [...lists].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="panel-overlay" />
        <Dialog.Content className="panel full lists" aria-describedby={undefined} onOpenAutoFocus={e => e.preventDefault()}>
          <aside className="src-side">
            <div className="src-side-head">
              <Dialog.Title className="panel-title">Lists</Dialog.Title>
              <p className="panel-subtitle">Things worth coming back to.</p>
            </div>
            <nav className="src-nav">
              {sorted.map(item => {
                const open = item.items.filter(entry => !entry.done).length
                return (
                  <button key={item.id} type="button" className={`src-item${item.id === active && !creating ? ' active' : ''}`} onClick={() => { setActive(item.id); setCreating(false) }}>
                    <span className="src-icon"><ListChecks /></span>
                    <span className="src-text"><b>{item.title}</b><small>{item.items.length === 0 ? 'Empty' : open === 0 ? `All ${item.items.length} done` : `${open} open${item.items.length - open > 0 ? ` · ${item.items.length - open} done` : ''}`}</small></span>
                  </button>
                )
              })}
              <button type="button" className={`src-item new${creating ? ' active' : ''}`} onClick={() => setCreating(true)}>
                <span className="src-icon"><Plus /></span>
                <span className="src-text"><b>New list</b></span>
              </button>
            </nav>
            <p className="src-side-foot">She adds to these as you talk. Ask her to keep track of anything.</p>
          </aside>
          <section className="src-main">
            <Dialog.Close className="icon-button src-close" aria-label="Close"><X /></Dialog.Close>
            {creating || lists.length === 0
              ? <NewList onCreate={async title => { if (await act({ action: 'create', title })) setCreating(false) }} />
              : list && <ListMain key={list.id} list={list} act={act} onDeleted={() => setActive(null)} />}
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function NewList({ onCreate }: { onCreate: (title: string) => Promise<void> }): React.ReactElement {
  const [title, setTitle] = React.useState('')
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => { window.setTimeout(() => ref.current?.focus(), 50) }, [])
  const submit = async (): Promise<void> => { const value = title.trim(); if (value === '') return; await onCreate(value); setTitle('') }
  return (
    <div className="src-empty">
      <ListChecks />
      <p>Start a list</p>
      <p className="field-hint">Dramas to watch, gifts to consider, things to pack. She can add to it later.</p>
      <form className="row new-list" onSubmit={e => { e.preventDefault(); if (!(e.nativeEvent as SubmitEvent & { isComposing?: boolean }).isComposing) void submit() }}>
        <input ref={ref} className="input" value={title} placeholder="List title" spellCheck={false} onChange={e => setTitle(e.target.value)} />
        <button type="submit" className="button primary" disabled={title.trim() === ''}>Create</button>
      </form>
    </div>
  )
}

function ListMain({ list, act, onDeleted }: { list: List; act: (body: Record<string, unknown>) => Promise<boolean>; onDeleted: () => void }): React.ReactElement {
  const [draft, setDraft] = React.useState('')
  const [showDone, setShowDone] = React.useState(false)
  const open = list.items.filter(item => !item.done)
  const done = list.items.filter(item => item.done)
  const add = async (): Promise<void> => {
    const text = draft.trim()
    if (text === '') return
    setDraft('')
    if (!await act({ action: 'add', list: list.id, text })) setDraft(text)
  }
  const remove = async (): Promise<void> => {
    if (!window.confirm(`Delete "${list.title}"? This cannot be undone.`)) return
    if (await act({ action: 'delete', list: list.id })) onDeleted()
  }
  return (
    <>
      <header className="src-head">
        <div className="src-head-text">
          <EditableTitle value={list.title} onChange={title => { void act({ action: 'rename', list: list.id, title }) }} />
          <EditableLine value={list.description ?? ''} placeholder="Add a description" onChange={description => { void act({ action: 'rename', list: list.id, description }) }} />
        </div>
        <div className="src-head-actions">
          <button type="button" className="icon-button" title="Delete list" aria-label="Delete list" onClick={() => { void remove() }}><Trash2 /></button>
        </div>
      </header>
      <div className="src-body">
        <div className="rem-add">
          <input className="input" value={draft} placeholder="Add an item…" spellCheck={false} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); void add() } }} />
          <button type="button" className="button primary" disabled={draft.trim() === ''} onClick={() => { void add() }}>Add</button>
        </div>
        {list.items.length === 0 && <p className="rem-empty">Nothing here yet.</p>}
        {open.length > 0 && (
          <ul className="rem-list">
            {open.map(item => <Row key={item.id} item={item} list={list} act={act} />)}
          </ul>
        )}
        {done.length > 0 && (
          <section className="rem-group">
            <button type="button" className="text-button done-toggle" onClick={() => setShowDone(v => !v)}>{showDone ? 'Hide' : 'Show'} {done.length} done</button>
            {showDone && (
              <ul className="rem-list">
                {done.map(item => <Row key={item.id} item={item} list={list} act={act} />)}
              </ul>
            )}
          </section>
        )}
      </div>
    </>
  )
}

function Row({ item, list, act }: { item: ListItem; list: List; act: (body: Record<string, unknown>) => Promise<boolean> }): React.ReactElement {
  const [text, setText] = React.useState(item.text)
  const [note, setNote] = React.useState(item.note ?? '')
  React.useEffect(() => { setText(item.text); setNote(item.note ?? '') }, [item.text, item.note])
  const patch = (body: Record<string, unknown>): void => { void act({ action: 'item', list: list.id, item: item.id, ...body }) }
  const commitText = (): void => { const value = text.trim(); if (value === '') { setText(item.text); return } if (value !== item.text) patch({ text: value }) }
  const commitNote = (): void => { const value = note.trim(); if (value !== (item.note ?? '')) patch({ note: value }) }
  const keys = (commit: () => void, reset: () => void) => (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLInputElement).blur() }
    if (e.key === 'Escape') { e.preventDefault(); reset(); (e.target as HTMLInputElement).blur() }
    void commit
  }
  return (
    <li className={`rem-row list-row${item.done ? ' done' : ''}`}>
      <button type="button" className={`rem-check${item.done ? ' checked' : ''}`} title={item.done ? 'Mark not done' : 'Mark done'} onClick={() => patch({ done: !item.done })}><Check /></button>
      <span className="rem-text">
        <input className="list-text" value={text} spellCheck={false} onChange={e => setText(e.target.value)} onBlur={commitText} onKeyDown={keys(commitText, () => setText(item.text))} />
        <input className="list-note" value={note} placeholder="Note" spellCheck={false} onChange={e => setNote(e.target.value)} onBlur={commitNote} onKeyDown={keys(commitNote, () => setNote(item.note ?? ''))} />
      </span>
      <button type="button" className="icon-button small list-remove" title="Remove" aria-label="Remove" onClick={() => patch({ remove: true })}><X /></button>
    </li>
  )
}

function EditableTitle({ value, onChange }: { value: string; onChange: (value: string) => void }): React.ReactElement {
  const [text, setText] = React.useState(value)
  React.useEffect(() => setText(value), [value])
  const commit = (): void => { const next = text.trim(); if (next === '') { setText(value); return } if (next !== value) onChange(next) }
  return <input className="list-title" value={text} spellCheck={false} onChange={e => setText(e.target.value)} onBlur={commit}
    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLInputElement).blur() } if (e.key === 'Escape') { setText(value); (e.target as HTMLInputElement).blur() } }} />
}

function EditableLine({ value, placeholder, onChange }: { value: string; placeholder: string; onChange: (value: string) => void }): React.ReactElement {
  const [text, setText] = React.useState(value)
  React.useEffect(() => setText(value), [value])
  const commit = (): void => { const next = text.trim(); if (next !== value) onChange(next) }
  return <input className="list-desc" value={text} placeholder={placeholder} spellCheck={false} onChange={e => setText(e.target.value)} onBlur={commit}
    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); (e.target as HTMLInputElement).blur() } if (e.key === 'Escape') { setText(value); (e.target as HTMLInputElement).blur() } }} />
}
