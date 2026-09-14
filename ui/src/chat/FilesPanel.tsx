/* Files she wrote: a grid of preview cards, and one file opened. */
import * as React from 'react'
import { ArrowLeft, Check, Copy, FileText, FileX, FolderOpen, Image as ImageIcon, Trash2 } from 'lucide-react'
import { Panel } from './Panel'
import { render as renderMarkdown } from '../markdown'
import { formatBytes, getJson, kindLabel, whenLabel, withToken, type Artifact } from './lib'

const PREVIEW_BYTES = 4096

export function FilesPanel({ open, onOpenChange, artifacts, setArtifacts, openId, notify }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  artifacts: Artifact[]
  setArtifacts: (list: Artifact[]) => void
  /** Open straight onto this file; null shows the list. */
  openId: string | null
  notify: (text: string) => void
}): React.ReactElement {
  const [viewing, setViewing] = React.useState<string | null>(null)
  React.useEffect(() => {
    if (!open) return
    setViewing(openId)
    getJson<{ artifacts: Artifact[] }>('/artifacts').then(data => setArtifacts(data.artifacts)).catch(err => notify(`Could not load files: ${(err as Error).message}`))
  }, [open, openId]) // eslint-disable-line react-hooks/exhaustive-deps
  const current = viewing === null ? undefined : artifacts.find(item => item.id === viewing)
  const items = [...artifacts].reverse()
  const cards = items.filter(item => item.kind !== 'other' && item.exists !== false)
  const rows = items.filter(item => item.kind === 'other' || item.exists === false)
  return (
    <Panel open={open} onOpenChange={onOpenChange} wide
      title={current ? <button type="button" className="text-button back" onClick={() => setViewing(null)}><ArrowLeft />All files</button> : 'Files'}
      subtitle={current ? undefined : 'Every file she wrote for you. The file stays where it is; this is just a way to open it.'}>
      {current
        ? <FileView artifact={current} onForget={async () => {
            try { setArtifacts((await getJson<{ artifacts: Artifact[] }>(`/artifact/${encodeURIComponent(current.id)}`, { method: 'DELETE' })).artifacts); setViewing(null) }
            catch (err) { notify(`Could not remove: ${(err as Error).message}`) }
          }} notify={notify} />
        : (
          <>
            {artifacts.length === 0 && <p className="empty">Nothing written yet.</p>}
            <div className="art-grid">
              {cards.map(item => <ArtifactCard key={item.id} item={item} onOpen={() => setViewing(item.id)} />)}
              {rows.length > 0 && <div className="art-strip">{rows.map(item => <ArtifactCard key={item.id} item={item} compact onOpen={() => setViewing(item.id)} />)}</div>}
            </div>
          </>
        )}
    </Panel>
  )
}

function meta(item: Artifact, full = false): string {
  return [item.description ? item.name : '', kindLabel(item), item.exists === false ? 'missing' : typeof item.size === 'number' ? formatBytes(item.size) : '', full ? whenLabel(item.at) : '', full && item.source === 'presented' ? 'delivered' : ''].filter(Boolean).join(' · ')
}

function ArtifactCard({ item, compact, onOpen }: { item: Artifact; compact?: boolean; onOpen: () => void }): React.ReactElement {
  const [preview, setPreview] = React.useState<string | null>(null)
  const url = withToken(`/artifact/${encodeURIComponent(item.id)}`)
  const textual = item.kind === 'markdown' || item.kind === 'text'
  React.useEffect(() => {
    if (compact || !textual) return
    let alive = true
    fetch(`${url}${url.includes('?') ? '&' : '?'}head=${PREVIEW_BYTES}`).then(res => res.ok ? res.text() : Promise.reject(new Error())).then(text => { if (alive) setPreview(text) }).catch(() => {})
    return () => { alive = false }
  }, [url, compact, textual])
  const Icon = item.exists === false ? FileX : item.kind === 'image' ? ImageIcon : FileText
  return (
    <div role="button" tabIndex={0} className={`art-card${compact ? ' compact' : ''}${item.exists === false ? ' missing' : ''}`} title={item.path} onClick={onOpen} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}>
      <div className="art-thumb">
        {!compact && item.kind === 'image' ? <img src={url} alt="" loading="lazy" />
          : !compact && preview !== null
            ? (item.kind === 'markdown' ? <div className="art-thumb-page" dangerouslySetInnerHTML={{ __html: renderMarkdown(preview) }} /> : <div className="art-thumb-page"><pre>{preview}</pre></div>)
            : <Icon className="art-icon" />}
      </div>
      <div className="art-foot">
        <p className="art-name">{item.description ?? item.name}</p>
        <p className="art-meta">{meta(item)}</p>
      </div>
    </div>
  )
}

function FileView({ artifact, onForget, notify }: { artifact: Artifact; onForget: () => Promise<void>; notify: (text: string) => void }): React.ReactElement {
  const [body, setBody] = React.useState<{ html?: string; text?: string; error?: string } | null>(null)
  const [copied, setCopied] = React.useState(false)
  const url = withToken(`/artifact/${encodeURIComponent(artifact.id)}`)
  React.useEffect(() => {
    setBody(null)
    if (artifact.kind === 'image' || artifact.kind === 'other') return
    let alive = true
    fetch(url).then(async res => {
      if (res.status === 404) throw new Error('The file is no longer where it was.')
      if (!res.ok) throw new Error(await res.text())
      const text = await res.text()
      if (!alive) return
      setBody(artifact.kind === 'markdown' ? { html: renderMarkdown(text) } : { text })
    }).catch(err => { if (alive) setBody({ error: (err as Error).message }) })
    return () => { alive = false }
  }, [url, artifact.kind])
  const reveal = async (): Promise<void> => { const res = await fetch(withToken(`/artifact/${encodeURIComponent(artifact.id)}/reveal`), { method: 'POST' }); notify(res.ok ? 'Shown in Finder.' : 'The file is no longer where it was.') }
  const copy = async (): Promise<void> => { try { await navigator.clipboard.writeText(artifact.path); setCopied(true); window.setTimeout(() => setCopied(false), 1500) } catch { notify(artifact.path) } }
  return (
    <div className="file-view">
      <div className="file-head">
        <div className="file-titles">
          <p className="file-name">{artifact.description ?? artifact.name}</p>
          <p className="file-meta">{meta(artifact, true)}</p>
          <p className="file-path">{artifact.path}</p>
        </div>
        <div className="row">
          <button type="button" className="button" onClick={() => { void reveal() }}><FolderOpen />Reveal</button>
          <button type="button" className="button" onClick={() => { void copy() }}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy path'}</button>
          <button type="button" className="button" onClick={() => { void onForget() }}><Trash2 />Remove</button>
        </div>
      </div>
      <div className="file-body">
        {artifact.kind === 'image' && <img className="file-image" src={url} alt={artifact.name} />}
        {artifact.kind === 'other' && <p className="empty">This kind of file cannot be shown here. Use Reveal to find it.</p>}
        {body?.error && <p className="empty">{body.error}</p>}
        {body?.html !== undefined && <div className="prose" dangerouslySetInnerHTML={{ __html: body.html }} />}
        {body?.text !== undefined && <pre className="file-pre">{body.text}</pre>}
        {body === null && artifact.kind !== 'image' && artifact.kind !== 'other' && <p className="empty">Loading…</p>}
      </div>
    </div>
  )
}
