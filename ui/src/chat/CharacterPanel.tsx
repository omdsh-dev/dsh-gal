/* Who is on stage, her artwork, and her persona. */
import * as React from 'react'
import { Download, Upload } from 'lucide-react'
import { Field, Panel, Tabs } from './Panel'
import { ACTIVITIES, ACTIVITY_LABEL, getJson, postJson, withToken, type CharacterConfig, type Lang, type Manifest } from './lib'

type Tab = 'pick' | 'art' | 'persona'
const MIME_BY_EXT: Record<string, string> = { png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', mp4: 'video/mp4', webm: 'video/webm' }

export function CharacterPanel({ open, onOpenChange, tab, setTab, manifest, lang, preview, setPreview, notify, onManifestChange }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  tab: Tab
  setTab: (tab: Tab) => void
  manifest: Manifest | null
  lang: Lang
  preview: string | null
  setPreview: (activity: string | null) => void
  notify: (text: string) => void
  onManifestChange: (patch: Partial<Manifest>) => void
}): React.ReactElement {
  const [config, setConfig] = React.useState<CharacterConfig | null>(null)
  const reload = React.useCallback(() => {
    getJson<CharacterConfig>('/character/config').then(setConfig).catch(err => notify(`Could not load character: ${(err as Error).message}`))
  }, [notify])
  React.useEffect(() => { if (open) reload() }, [open, manifest?.characterId, reload])

  return (
    <Panel open={open} onOpenChange={onOpenChange} wide title="Character" subtitle={config ? config.dir : undefined}>
      <Tabs value={tab} onChange={setTab} items={[{ id: 'pick', label: 'Choose' }, { id: 'art', label: 'Artwork' }, { id: 'persona', label: 'Persona' }]} />
      {tab === 'pick' && <PickTab manifest={manifest} notify={notify} close={() => onOpenChange(false)} />}
      {tab === 'art' && config && manifest && <ArtTab config={config} manifest={manifest} preview={preview} setPreview={setPreview} reload={reload} notify={notify} />}
      {tab === 'persona' && config && <PersonaTab key={config.id} config={config} lang={lang} setConfig={setConfig} notify={notify} onManifestChange={onManifestChange} />}
    </Panel>
  )
}

function PickTab({ manifest, notify, close }: { manifest: Manifest | null; notify: (text: string) => void; close: () => void }): React.ReactElement {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const pick = async (id: string): Promise<void> => {
    close()
    if (id === manifest?.characterId) return
    try { await postJson('/character', { id }) } catch (err) { notify(`Could not switch: ${(err as Error).message}`) }
  }
  const importPack = async (file: File): Promise<void> => {
    const hint = file.name.replace(/\.zip$/i, '').replace(/-pack$/i, '')
    notify(`Importing ${file.name}…`)
    try {
      const res = await fetch(withToken(`/character/import?id=${encodeURIComponent(hint)}`), { method: 'POST', headers: { 'content-type': 'application/zip' }, body: file })
      if (!res.ok) throw new Error(await res.text())
      const { id } = await res.json() as { id: string }
      await postJson('/character', { id })
      close()
    } catch (err) { notify(`Import failed: ${(err as Error).message}`) }
  }
  return (
    <>
      <div className="char-grid">
        {(manifest?.characters ?? []).map(entry => (
          <button key={entry.id} type="button" className={`char-option${entry.id === manifest?.characterId ? ' active' : ''}`} title={entry.id} onClick={() => { void pick(entry.id) }}>
            <span className="char-option-name">{entry.name}</span>
            {entry.promptOnly && <span className="badge">prompt only</span>}
          </button>
        ))}
      </div>
      <div className="row end" style={{ marginTop: 16 }}>
        <input ref={fileRef} type="file" accept=".zip,application/zip" hidden onChange={e => { const file = e.target.files?.[0]; e.target.value = ''; if (file) void importPack(file) }} />
        <button type="button" className="button" onClick={() => fileRef.current?.click()}><Upload />Import pack…</button>
        <a className="button" href={withToken('/character/export')} download={`${manifest?.characterId ?? 'character'}.zip`}><Download />Export pack</a>
      </div>
    </>
  )
}

function ArtTab({ config, manifest, preview, setPreview, reload, notify }: { config: CharacterConfig; manifest: Manifest; preview: string | null; setPreview: (activity: string | null) => void; reload: () => void; notify: (text: string) => void }): React.ReactElement {
  const fileRef = React.useRef<HTMLInputElement>(null)
  const pending = React.useRef<string>('')
  const upload = async (state: string, file: File): Promise<void> => {
    const ext = (file.name.split('.').pop() ?? '').toLowerCase()
    const type = MIME_BY_EXT[ext] ?? file.type
    if (!type) { notify(`Unsupported file: ${file.name}`); return }
    notify(`Uploading ${file.name} as ${state}…`)
    try {
      const res = await fetch(withToken(`/character/asset?state=${encodeURIComponent(state)}`), { method: 'PUT', headers: { 'content-type': type }, body: file })
      if (!res.ok) throw new Error(await res.text())
      notify(`Saved ${file.name} as ${state}.`)
      reload()
    } catch (err) { notify(`Upload failed: ${(err as Error).message}`) }
  }
  return (
    <>
      <div className="row between">
        <Field label="Preview on stage">
          <select className="input" value={preview ?? 'auto'} onChange={e => setPreview(e.target.value === 'auto' ? null : e.target.value)}>
            <option value="auto">Follow the conversation</option>
            {ACTIVITIES.map(state => <option key={state} value={state}>{ACTIVITY_LABEL[state]}</option>)}
          </select>
        </Field>
      </div>
      <div className="g-grid">
        {config.assets.map(asset => {
          const own = Boolean(asset.image || asset.video)
          const shown = own
            ? { video: asset.video && withToken(`/character/${encodeURIComponent(asset.video)}`), image: asset.image && withToken(`/character/${encodeURIComponent(asset.image)}`) }
            : { video: manifest.states[asset.state]?.video && withToken(manifest.states[asset.state].video!), image: manifest.states[asset.state]?.image && withToken(manifest.states[asset.state].image!) }
          return (
            <div key={asset.state} className={`g-tile${own ? '' : ' borrowed'}${shown.video || shown.image ? '' : ' missing'}`}
              onClick={() => { if (manifest.states[asset.state]) setPreview(asset.state) }}
              onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('drop') }}
              onDragLeave={e => e.currentTarget.classList.remove('drop')}
              onDrop={e => { e.preventDefault(); e.currentTarget.classList.remove('drop'); const file = e.dataTransfer.files[0]; if (file) void upload(asset.state, file) }}>
              {shown.video ? <video src={shown.video} muted loop playsInline autoPlay /> : shown.image ? <img src={shown.image} alt="" /> : <div className="g-none" />}
              <div className="g-cap">
                <span>{ACTIVITY_LABEL[asset.state]}</span>
                <span className="g-sub">{own ? [asset.video, asset.image].filter(Boolean).join(' · ') : asset.fallback ? `← ${ACTIVITY_LABEL[asset.fallback] ?? asset.fallback}` : 'missing'}</span>
              </div>
              <button type="button" className="icon-button small g-up" title={`Upload a .png or .mp4 for ${asset.state}`} onClick={e => { e.stopPropagation(); pending.current = asset.state; fileRef.current?.click() }}><Upload /></button>
            </div>
          )
        })}
      </div>
      <input ref={fileRef} type="file" accept=".png,.webp,.jpg,.jpeg,.mp4,.webm" hidden onChange={e => { const file = e.target.files?.[0]; e.target.value = ''; if (file) void upload(pending.current, file) }} />
      <p className="field-hint">Click a tile to show that state on stage. Drop a .png or .mp4 onto a tile, or use its upload button, to replace it. Dimmed tiles borrow another state's file.</p>
    </>
  )
}

function PersonaTab({ config, lang, setConfig, notify, onManifestChange }: { config: CharacterConfig; lang: Lang; setConfig: (c: CharacterConfig) => void; notify: (text: string) => void; onManifestChange: (patch: Partial<Manifest>) => void }): React.ReactElement {
  const [name, setName] = React.useState(config.name)
  const [persona, setPersona] = React.useState(config.persona)
  const [rate, setRate] = React.useState(String(config.playbackRate || 1))
  const [saving, setSaving] = React.useState(false)
  const save = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setSaving(true)
    try {
      const next = await postJson<CharacterConfig>('/character/config', { name, persona, playbackRate: Number(rate) || 1 })
      setConfig(next)
      onManifestChange({ characterName: next.name, playbackRate: next.playbackRate })
      notify('Saved. The new persona applies from the next reply.')
    } catch (err) { notify(`Save failed: ${(err as Error).message}`) }
    finally { setSaving(false) }
  }
  return (
    <form className="form" onSubmit={e => { void save(e) }}>
      <Field label="Name"><input className="input" value={name} onChange={e => setName(e.target.value)} spellCheck={false} /></Field>
      <Field label="Persona"><textarea className="input" rows={10} value={persona} onChange={e => setPersona(e.target.value)} /></Field>
      <Field label="Artwork playback speed"><input className="input narrow" type="number" min="0.25" max="4" step="0.05" value={rate} onChange={e => setRate(e.target.value)} /></Field>
      {config.promptOnly && config.art && (
        <details className="details">
          <summary>Image prompts for this pack</summary>
          <p className="field-hint">This pack has no images yet. Generate them with any image model and drop files named after each state into <code>{config.userDir}</code>.</p>
          <Field label="Base image"><textarea className="input" rows={4} readOnly value={config.art.base ?? ''} /></Field>
          <Field label="State deltas"><textarea className="input" rows={5} readOnly value={Object.entries(config.art.expressions ?? {}).map(([k, v]) => `${k}: ${v}`).join('\n')} /></Field>
          <Field label="Motion"><textarea className="input" rows={2} readOnly value={config.art.motion ?? ''} /></Field>
        </details>
      )}
      <div className="row between">
        <span className="field-hint">{config.bundled ? `Bundled pack. Saving copies it to ${config.userDir}` : config.dir}</span>
        <button type="submit" className="button primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </div>
    </form>
  )
}
