/*
 * Chat-room layout: the whole conversation on the left, the character on the
 * right. Same server, same event stream as the classic stage; nothing here
 * depends on the imperative controllers of that page.
 */
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUp, BookOpen, Brain, Check, ChevronDown, ChevronRight, Copy, FileText, Files, FolderOpen, Hourglass, Image as ImageIcon, ListChecks, PenLine, Plug, Search, Settings, Sparkles, Square, Terminal, TriangleAlert, Volume2, VolumeX } from 'lucide-react'
import { render as renderMarkdown } from '../markdown'
import { CharacterPanel } from './CharacterPanel'
import { MemoryPanel } from './MemoryPanel'
import { ListsPanel } from './ListsPanel'
import { FilesPanel } from './FilesPanel'
import { SettingsPanel, errorText } from './SettingsPanel'
import { HelpPanel } from './HelpPanel'
import { DataPanel } from './DataPanel'
import { ACTIVITY_LABEL, browserLanguage, formatBytes, getJson, kindLabel, nextKey, postJson, withToken, type Artifact, type Item, type Lang, type List, type Manifest, type MemoryEntry, type Step } from './lib'
import './chat.css'

const ACTIVITY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  reading: BookOpen, writing: PenLine, searching: Search, running: Terminal, waiting: Hourglass, failed: TriangleAlert, done: Check, idle: Sparkles,
}
type PanelId = 'character' | 'memory' | 'files' | 'lists' | 'data' | 'settings' | 'help' | null
type CharTab = 'pick' | 'art' | 'persona'

// ---- small hooks --------------------------------------------------------

export type ThemePref = 'system' | 'light' | 'dark'
/** Follows the system until the user picks a side; only an explicit choice is stored. */
function useTheme(): [ThemePref, (pref: ThemePref) => void] {
  const [pref, setPrefState] = React.useState<ThemePref>(() => { const v = localStorage.getItem('gal-chat-theme'); return v === 'light' || v === 'dark' ? v : 'system' })
  React.useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const apply = (): void => { document.documentElement.classList.toggle('dark', pref === 'dark' || (pref === 'system' && media.matches)) }
    apply()
    if (pref !== 'system') return
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [pref])
  const setPref = (next: ThemePref): void => { setPrefState(next); if (next === 'system') localStorage.removeItem('gal-chat-theme'); else localStorage.setItem('gal-chat-theme', next) }
  return [pref, setPref]
}

/** Speech is requested by the page, line by line, from the local speech service. */
// A one-sample silent WAV. Playing it inside a real user gesture unlocks the
// shared player, so later replies (fetched asynchronously) may play in WebKit.
const SILENT = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'

function useVoice(enabled: boolean, language: Lang): { speak: (text: string) => void; stop: () => void; status: string; speaking: boolean } {
  const [status, setStatus] = React.useState('')
  const [speaking, setSpeaking] = React.useState(false)
  const generation = React.useRef(0)
  const player = React.useRef<HTMLAudioElement | null>(null)
  const unlocked = React.useRef(false)
  const pending = React.useRef<string | null>(null)
  const request = React.useRef<AbortController | null>(null)
  const objectUrl = React.useRef<string | null>(null)
  // Recent lines, synthesized once: a replay plays from here instead of
  // waiting on the dub rewrite and the provider again.
  const clips = React.useRef(new Map<string, Blob>())
  const remember = (key: string, blob: Blob): void => {
    const store = clips.current
    store.delete(key); store.set(key, blob)
    while (store.size > 24) { const oldest = store.keys().next().value; if (oldest === undefined) break; store.delete(oldest) }
  }
  const getPlayer = (): HTMLAudioElement => {
    if (!player.current) { const el = new Audio(); el.preload = 'auto'; player.current = el }
    return player.current
  }
  const stop = React.useCallback(() => {
    generation.current += 1
    request.current?.abort(); request.current = null
    pending.current = null
    if (player.current) { player.current.pause(); player.current.onended = null; player.current.onerror = null }
    if (objectUrl.current) { URL.revokeObjectURL(objectUrl.current); objectUrl.current = null }
    setSpeaking(false); setStatus('')
  }, [])
  const playUrl = React.useCallback(async (url: string, ticket: number): Promise<void> => {
    const el = getPlayer()
    el.onended = () => { if (ticket === generation.current) stop() }
    el.onerror = () => { if (ticket === generation.current) { stop(); setStatus(errorText('speech_error')) } }
    el.src = url
    await el.play()
    if (ticket === generation.current) { setSpeaking(true); setStatus('Speaking…') }
  }, [stop])
  const speak = React.useCallback((text: string) => {
    stop()
    if (!enabled || text.trim() === '') return
    const ticket = generation.current
    const controller = new AbortController(); request.current = controller
    setStatus('Preparing voice…')
    void (async () => {
      try {
        const key = `${language}\n${text}`
        let blob = clips.current.get(key)
        if (blob === undefined) {
          const res = await fetch(withToken('/voice/read'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, language, dub: true }), signal: controller.signal })
          if (!res.ok) throw new Error(((await res.json().catch(() => ({ error: 'speech_error' }))) as { error?: string }).error ?? 'speech_error')
          blob = await res.blob()
          remember(key, blob)
        }
        if (ticket !== generation.current) return
        const url = URL.createObjectURL(blob); objectUrl.current = url
        try { await playUrl(url, ticket) }
        catch (err) {
          if (err instanceof DOMException && err.name === 'NotAllowedError') { pending.current = url; setStatus('Click or press a key to hear the reply') }
          else throw err
        }
      } catch (err) {
        if (ticket !== generation.current) return
        stop()
        if (!(err instanceof DOMException && err.name === 'AbortError')) setStatus(errorText((err as Error).message))
      }
    })()
  }, [enabled, language, stop, playUrl])
  // First real gesture: unlock the shared player, and flush a reply that was blocked by autoplay rules.
  React.useEffect(() => {
    const unlock = (): void => {
      if (pending.current) { const url = pending.current; pending.current = null; void playUrl(url, generation.current).catch(() => setStatus(errorText('speech_error'))); unlocked.current = true; return }
      if (unlocked.current) return
      const el = getPlayer(); el.src = SILENT
      void el.play().then(() => { unlocked.current = true }).catch(() => {})
    }
    window.addEventListener('pointerdown', unlock, true)
    window.addEventListener('keydown', unlock, true)
    return () => { window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true) }
  }, [playUrl])
  React.useEffect(() => { window.addEventListener('pagehide', stop); return () => window.removeEventListener('pagehide', stop) }, [stop])
  return { speak, stop, status, speaking }
}

// ---- app ----------------------------------------------------------------

function App(): React.ReactElement {
  const [manifest, setManifest] = React.useState<Manifest | null>(null)
  const [items, setItems] = React.useState<Item[]>([])
  const [busy, setBusy] = React.useState(false)
  const [activity, setActivity] = React.useState('idle')
  const [beat, setBeat] = React.useState<string | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [connected, setConnected] = React.useState(false)
  const [notice, setNotice] = React.useState('')
  const [panel, setPanel] = React.useState<PanelId>(null)
  const [charTab, setCharTab] = React.useState<CharTab>('pick')
  const [fileId, setFileId] = React.useState<string | null>(null)
  const [memory, setMemory] = React.useState<MemoryEntry[]>([])
  const [lists, setLists] = React.useState<List[]>([])
  const [listId, setListId] = React.useState<string | null>(null)
  const [artifacts, setArtifacts] = React.useState<Artifact[]>([])
  const [sourcesVersion, setSourcesVersion] = React.useState(0)
  const [voiceOn, setVoiceOnState] = React.useState(() => localStorage.getItem('gal-voice') !== 'off')
  const [speechPref, setSpeechPrefState] = React.useState<'auto' | Lang>(() => { const v = localStorage.getItem('gal-speech-language'); return v === 'zh' || v === 'en' || v === 'ja' ? v : 'auto' })
  const [theme, setTheme] = useTheme()
  const lang = browserLanguage()
  const speechLang: Lang = speechPref === 'auto' ? lang : speechPref
  const voice = useVoice(voiceOn, speechLang)
  const doneTimer = React.useRef<number | null>(null)
  const noticeTimer = React.useRef<number | null>(null)
  const lastLine = React.useRef('')
  const composerRef = React.useRef<HTMLTextAreaElement>(null)

  // Read-aloud and speech language are the user's, kept on the server so every
  // browser agrees; localStorage only covers the first frame before they load.
  const applyPrefs = (prefs: { voice?: unknown; speechLanguage?: unknown }): void => {
    if (typeof prefs.voice === 'boolean') { setVoiceOnState(prefs.voice); localStorage.setItem('gal-voice', prefs.voice ? 'on' : 'off') }
    const l = prefs.speechLanguage
    if (l === 'auto' || l === 'zh' || l === 'en' || l === 'ja') { setSpeechPrefState(l); localStorage.setItem('gal-speech-language', l) }
  }
  const applyPrefsRef = React.useRef(applyPrefs); applyPrefsRef.current = applyPrefs
  React.useEffect(() => { getJson<{ voice: boolean; speechLanguage: string }>('/settings').then(applyPrefs).catch(() => { /* keep the local guess */ }) }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const setVoiceOn = (on: boolean): void => { applyPrefs({ voice: on }); if (!on) voice.stop(); void postJson('/settings', { voice: on }).catch(() => notify('Could not save the voice setting')) }
  const setSpeechPref = (pref: 'auto' | Lang): void => { applyPrefs({ speechLanguage: pref }); voice.stop(); void postJson('/settings', { speechLanguage: pref }).catch(() => notify('Could not save the speech language')) }
  const notify = React.useCallback((text: string) => {
    setNotice(text)
    if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(''), 6500)
  }, [])

  // Voice follows the newest finished line. Kept in refs so the event
  // handler below never has to be re-subscribed.
  const speakRef = React.useRef(voice.speak); speakRef.current = voice.speak
  const stopRef = React.useRef(voice.stop); stopRef.current = voice.stop
  const langRef = React.useRef(lang); langRef.current = lang

  const handleEvent = React.useCallback((ev: Record<string, any>) => {
    switch (ev.type) {
      case 'user':
        stopRef.current()
        setItems(prev => [...closeSteps(prev), { kind: 'msg', key: nextKey(), role: 'user', text: String(ev.text ?? ''), at: Date.now() }])
        setBusy(true)
        break
      case 'status': {
        const step: Step = { activity: String(ev.activity ?? 'reading'), text: String(ev.tool ?? ev.text ?? ''), ...ev.command === undefined ? {} : { command: String(ev.command) } }
        setItems(prev => {
          // The model opens an (often empty) stream before every tool call.
          // Drop a trailing empty one so consecutive tool activity within a
          // turn folds into a single group instead of one per call.
          const tail = prev[prev.length - 1]
          const base = tail?.kind === 'msg' && tail.streaming && tail.text === '' ? prev.slice(0, -1) : prev
          const last = base[base.length - 1]
          if (last?.kind === 'steps') return [...base.slice(0, -1), { ...last, steps: [...last.steps, step], live: true }]
          return [...base, { kind: 'steps', key: nextKey(), steps: [step], live: true }]
        })
        if (ev.activity) setActivity(String(ev.activity))
        break
      }
      case 'activity':
        if (ev.beat) {
          setBeat(String(ev.activity))
          window.setTimeout(() => setBeat(null), 2600)
          if (ev.activity === 'failed') setItems(prev => {
            const last = prev[prev.length - 1]
            if (last?.kind !== 'steps' || last.steps.length === 0) return prev
            const steps = [...last.steps]; steps[steps.length - 1] = { ...steps[steps.length - 1], failed: true }
            return [...prev.slice(0, -1), { ...last, steps }]
          })
          break
        }
        setActivity(String(ev.activity))
        if (ev.activity === 'done') {
          if (doneTimer.current !== null) window.clearTimeout(doneTimer.current)
          doneTimer.current = window.setTimeout(() => setActivity(a => a === 'done' ? 'idle' : a), 30_000)
        }
        break
      case 'delta':
        if (ev.reset) { setItems(prev => [...closeSteps(settleStreams(prev)), { kind: 'msg', key: nextKey(), role: 'assistant', text: '', streaming: true, at: Date.now() }]); break }
        if (ev.done) break
        if (typeof ev.text === 'string') setItems(prev => {
          const index = lastStreaming(prev)
          if (index === -1) return [...closeSteps(prev), { kind: 'msg', key: nextKey(), role: 'assistant', text: ev.text, streaming: true, at: Date.now() }]
          const live = prev[index] as Extract<Item, { kind: 'msg' }>
          return [...prev.slice(0, index), { ...live, text: live.text + ev.text }, ...prev.slice(index + 1)]
        })
        break
      case 'assistant': {
        const text = String(ev.text ?? '')
        setItems(prev => {
          const index = lastStreaming(prev)
          const done: Item = { kind: 'msg', key: nextKey(), role: 'assistant', text, at: Date.now() }
          if (index === -1) return [...closeSteps(prev), done]
          return settleStreams([...prev.slice(0, index), done, ...prev.slice(index + 1)])
        })
        lastLine.current = text
        speakRef.current(text)
        break
      }
      case 'busy':
        setBusy(Boolean(ev.value))
        if (!ev.value) setItems(prev => closeSteps(settleStreams(prev)))
        break
      case 'session':
        setItems([{ kind: 'notice', key: nextKey(), text: 'New session' }])
        setBusy(false); setActivity('idle')
        break
      case 'manifest':
        setManifest(ev.manifest)
        setPreview(null)
        break
      case 'snapshot': {
        const entries = Array.isArray(ev.entries) ? ev.entries as { role: string; text: string; activity?: string; tool?: string; command?: string; failed?: boolean; list?: List }[] : []
        const restored: Item[] = []
        for (const entry of entries) {
          if (entry.role === 'status') {
            const step: Step = { activity: String(entry.activity ?? 'reading'), text: String(entry.tool ?? entry.text ?? ''), ...entry.command === undefined ? {} : { command: String(entry.command) }, ...entry.failed ? { failed: true } : {} }
            const last = restored[restored.length - 1]
            if (last?.kind === 'steps') last.steps.push(step)
            else restored.push({ kind: 'steps', key: nextKey(), steps: [step], live: false })
          } else if (entry.role === 'list' && entry.list) {
            restored.push({ kind: 'list', key: nextKey(), list: entry.list })
          } else if (entry.role === 'user' || entry.role === 'assistant') {
            restored.push({ kind: 'msg', key: nextKey(), role: entry.role, text: entry.text, at: 0 })
          }
        }
        if (restored.length > 0) { setItems(restored); const last = restored[restored.length - 1]; if (last.kind === 'msg' && last.role === 'assistant') lastLine.current = last.text }
        if (Array.isArray(ev.artifacts)) setArtifacts(ev.artifacts)
        break
      }
      case 'artifact':
        if (Array.isArray(ev.artifacts)) setArtifacts(ev.artifacts)
        if (ev.fresh && ev.artifact) setItems(prev => [...prev, { kind: 'artifact', key: nextKey(), artifact: ev.artifact }])
        break
      case 'memory':
        if (Array.isArray(ev.entries)) setMemory(ev.entries)
        break
      case 'sources':
        setSourcesVersion(v => v + 1)
        break
      case 'notice':
        if (typeof ev.text === 'string') setItems(prev => [...prev, { kind: 'notice', key: nextKey(), text: ev.text }])
        break
      case 'settings':
        if (ev.prefs) applyPrefsRef.current(ev.prefs as { voice?: unknown; speechLanguage?: unknown })
        break
      case 'lists': {
        const next = Array.isArray(ev.lists) ? ev.lists as List[] : []
        setLists(next)
        const fresh = typeof ev.fresh === 'string' ? next.find(list => list.id === ev.fresh) : undefined
        if (fresh) setItems(prev => [...prev, { kind: 'list', key: nextKey(), list: fresh }])
        break
      }
    }
  }, [])

  React.useEffect(() => {
    let source: EventSource | null = null
    getJson<Manifest>('/manifest.json').then(m => {
      setManifest(m)
      source = new EventSource(withToken('/events'))
      source.onopen = () => setConnected(true)
      source.onerror = () => setConnected(false)
      source.onmessage = msg => { try { handleEvent(JSON.parse(msg.data)) } catch { /* ignore */ } }
    }).catch(() => setItems([{ kind: 'notice', key: nextKey(), text: 'Could not reach the dsh-gal server.' }]))
    return () => { source?.close() }
  }, [handleEvent])
  React.useEffect(() => { if (manifest) document.title = `${manifest.characterName} · dsh-gal` }, [manifest?.characterName]) // eslint-disable-line react-hooks/exhaustive-deps

  const openPanel = React.useCallback((id: PanelId, opts?: { tab?: CharTab; file?: string | null }) => {
    if (opts?.tab) setCharTab(opts.tab)
    setFileId(opts?.file ?? null)
    setPanel(id)
  }, [])
  const newSession = React.useCallback(async () => { try { await fetch(withToken('/session/new'), { method: 'POST' }) } catch (err) { notify(`Could not start a session: ${(err as Error).message}`) } }, [notify])
  const replay = React.useCallback(() => { if (lastLine.current !== '') voice.speak(lastLine.current) }, [voice])

  const runCommand = React.useCallback(async (line: string): Promise<void> => {
    const [cmd, ...rest] = line.trim().split(/\s+/)
    const arg = rest.join(' ')
    switch (cmd) {
      case '/new': await newSession(); return
      case '/char':
        if (arg === '') { openPanel('character', { tab: 'pick' }); return }
        try { await postJson('/character', { id: arg }) } catch { notify(`Unknown character "${arg}"`) }
        return
      case '/edit': openPanel('character', { tab: 'persona' }); return
      case '/gallery': openPanel('character', { tab: 'art' }); return
      case '/memory': openPanel('memory'); return
      case '/files': openPanel('files'); return
      case '/lists': openPanel('lists'); return
      case '/data': openPanel('data'); return
      case '/voice': setVoiceOn(!voiceOn); notify(voiceOn ? 'Voice off.' : 'Voice on.'); return
      case '/help': openPanel('help'); return
      default: notify(`Unknown command ${cmd}. Try /help.`)
    }
  }, [newSession, notify, openPanel, voiceOn]) // eslint-disable-line react-hooks/exhaustive-deps

  const send = React.useCallback(async (text: string) => {
    if (text.startsWith('/')) { await runCommand(text); return }
    const res = await fetch(withToken('/send'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }) })
    if (!res.ok) throw new Error(await res.text())
  }, [runCommand])

  // Keyboard: ⌥ shortcuts anywhere, single keys only outside the input.
  React.useEffect(() => {
    const onKey = (ev: KeyboardEvent): void => {
      if (ev.isComposing) return
      const target = ev.target as HTMLElement | null
      const typing = Boolean(target?.closest?.('input,textarea,select,[contenteditable]'))
      if (ev.altKey && !ev.metaKey && !ev.ctrlKey) {
        const map: Record<string, () => void> = {
          KeyM: () => openPanel('memory'), KeyF: () => openPanel('files'), KeyL: () => openPanel('lists'), KeyD: () => openPanel('data'), KeyC: () => openPanel('character'), KeyS: () => openPanel('settings'),
          KeyV: () => { setVoiceOn(!voiceOn) }, KeyR: replay, Slash: () => openPanel('help'),
        }
        const action = map[ev.code]
        if (action) { ev.preventDefault(); action(); return }
      }
      if (typing || panel !== null) return
      if (ev.key === '/' || ev.key === '、' || ev.key === '／') { ev.preventDefault(); composerRef.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openPanel, panel, replay, voiceOn]) // eslint-disable-line react-hooks/exhaustive-deps

  const shown = preview ?? beat ?? (busy ? activity : activity === 'done' ? 'done' : activity === 'waiting' ? 'waiting' : 'idle')
  const name = manifest?.characterName ?? '…'
  const closePanel = (open: boolean): void => { if (!open) setPanel(null) }

  return (
    <div className="app">
      <section className="chat">
        <header className="chat-header">
          <button type="button" className="who" title="Character (⌥C)" onClick={() => openPanel('character')}>
            <Avatar manifest={manifest} />
            <div className="who-text">
              <span className="who-name">{name}</span>
              <span className={`who-state${busy || voice.speaking ? ' busy' : ''}${connected ? '' : ' off'}`}><i className="dot" />{!connected ? 'Disconnected' : voice.speaking && !busy ? 'Speaking' : (ACTIVITY_LABEL[shown] ?? shown)}</span>
            </div>
          </button>
          <div className="header-actions">
            <IconButton title={voiceOn ? 'Voice on (⌥V)' : 'Voice off (⌥V)'} onClick={() => setVoiceOn(!voiceOn)} active={voiceOn}>{voiceOn ? <Volume2 /> : <VolumeX />}</IconButton>
            <IconButton title="Memory (⌥M)" onClick={() => openPanel('memory')}><Brain /></IconButton>
            <IconButton title="Files (⌥F)" onClick={() => openPanel('files')}><Files /></IconButton>
            <IconButton title="Lists (⌥L)" onClick={() => openPanel('lists')}><ListChecks /></IconButton>
            <IconButton title="Connectors (⌥D)" onClick={() => openPanel('data')}><Plug /></IconButton>
            <IconButton title="Settings (⌥S)" onClick={() => openPanel('settings')}><Settings /></IconButton>
          </div>
        </header>
        <MessageList items={items} lists={lists} name={name} busy={busy} onReplay={text => voice.speak(text)} onOpenFile={id => openPanel('files', { file: id })} onOpenList={id => { setListId(id); openPanel('lists') }} />
        <Composer ref={composerRef} onSend={send} busy={busy} name={name} notice={notice} voiceStatus={voice.speaking ? '' : voice.status} speaking={voice.speaking} onStopVoice={voice.stop} />
      </section>
      <Stage manifest={manifest} activity={shown} name={name} />

      <CharacterPanel open={panel === 'character'} onOpenChange={closePanel} tab={charTab} setTab={setCharTab} manifest={manifest} lang={lang} preview={preview} setPreview={setPreview} notify={notify}
        onManifestChange={patch => setManifest(m => m ? { ...m, ...patch } : m)} />
      <MemoryPanel open={panel === 'memory'} onOpenChange={closePanel} entries={memory} setEntries={setMemory} notify={notify} />
      <ListsPanel open={panel === 'lists'} onOpenChange={closePanel} lists={lists} setLists={setLists} openId={listId} notify={notify} />
      <FilesPanel open={panel === 'files'} onOpenChange={closePanel} artifacts={artifacts} setArtifacts={setArtifacts} openId={fileId} notify={notify} />
      <SettingsPanel open={panel === 'settings'} onOpenChange={closePanel} theme={theme} setTheme={setTheme} voiceOn={voiceOn} setVoiceOn={setVoiceOn} speechPref={speechPref} setSpeechPref={setSpeechPref} speechLang={speechLang} onNewSession={() => { void newSession() }} stopVoice={voice.stop} onHelp={() => openPanel('help')} />
      <DataPanel open={panel === 'data'} onOpenChange={closePanel} version={sourcesVersion} notify={notify} />
      <HelpPanel open={panel === 'help'} onOpenChange={closePanel} />
    </div>
  )
}

function closeSteps(items: Item[]): Item[] {
  const last = items[items.length - 1]
  if (last?.kind === 'steps' && last.live) return [...items.slice(0, -1), { ...last, live: false }]
  return items
}
// A stream that opened but never said anything (the model went straight to a
// tool) leaves no trace; one that did is settled where it stands.
function settleStreams(items: Item[]): Item[] {
  return items.filter(item => !(item.kind === 'msg' && item.streaming && item.text === '')).map(item => item.kind === 'msg' && item.streaming ? { ...item, streaming: false } : item)
}
function lastStreaming(items: Item[]): number {
  for (let i = items.length - 1; i >= 0; i--) { const item = items[i]; if (item.kind === 'msg' && item.streaming) return i }
  return -1
}

// ---- header pieces ------------------------------------------------------

function Avatar({ manifest }: { manifest: Manifest | null }): React.ReactElement {
  const image = manifest?.states.idle?.image
  if (image) return <img className="avatar" src={withToken(image)} alt="" />
  return <div className="avatar avatar-letter">{(manifest?.characterName ?? '?').slice(0, 1)}</div>
}

function IconButton({ title, onClick, active, children }: { title: string; onClick: () => void; active?: boolean; children: React.ReactNode }): React.ReactElement {
  return <button type="button" className={`icon-button${active ? ' active' : ''}`} title={title} aria-label={title} onClick={onClick}>{children}</button>
}

// ---- messages -----------------------------------------------------------

function MessageList({ items, lists, name, busy, onReplay, onOpenFile, onOpenList }: { items: Item[]; lists: List[]; name: string; busy: boolean; onReplay: (text: string) => void; onOpenFile: (id: string) => void; onOpenList: (id: string) => void }): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null)
  const pinned = React.useRef(true)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (el && pinned.current) el.scrollTop = el.scrollHeight
  })
  const onScroll = (): void => {
    const el = ref.current
    if (!el) return
    pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48
  }
  const lastIsSteps = items[items.length - 1]?.kind === 'steps'
  return (
    <div className="messages" ref={ref} onScroll={onScroll}>
      <div className="messages-inner">
        {items.map(item => {
          switch (item.kind) {
            case 'msg': return item.role === 'user' ? <UserBubble key={item.key} text={item.text} /> : <AssistantTurn key={item.key} name={name} text={item.text} streaming={item.streaming === true} onReplay={onReplay} />
            case 'steps': return <StepsGroup key={item.key} steps={item.steps} live={item.live} />
            case 'artifact': return <ArtifactRow key={item.key} artifact={item.artifact} onOpen={() => onOpenFile(item.artifact.id)} />
            case 'list': return <ListRow key={item.key} list={lists.find(list => list.id === item.list.id) ?? item.list} onOpen={() => onOpenList(item.list.id)} />
            case 'notice': return <div key={item.key} className="notice">{item.text}</div>
          }
        })}
        {busy && !lastIsSteps && !items.some(item => item.kind === 'msg' && item.streaming) && (
          <div className="turn assistant"><div className="turn-label">{name}</div><span className="shimmer">Thinking…</span></div>
        )}
      </div>
    </div>
  )
}

function UserBubble({ text }: { text: string }): React.ReactElement {
  return <div className="turn user"><div className="bubble">{text}</div></div>
}

function AssistantTurn({ name, text, streaming, onReplay }: { name: string; text: string; streaming: boolean; onReplay: (text: string) => void }): React.ReactElement {
  const [copied, setCopied] = React.useState(false)
  const html = React.useMemo(() => renderMarkdown(text), [text])
  const copy = async (): Promise<void> => { try { await navigator.clipboard.writeText(text); setCopied(true); window.setTimeout(() => setCopied(false), 1500) } catch { /* ignore */ } }
  return (
    <div className="turn assistant">
      <div className="turn-label">{name}</div>
      {text === '' && streaming ? <span className="shimmer">Thinking…</span> : <div className={`prose${streaming ? ' streaming' : ''}`} dangerouslySetInnerHTML={{ __html: html }} />}
      {!streaming && text !== '' && (
        <div className="turn-actions">
          <button type="button" className="text-button" onClick={() => { void copy() }}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy'}</button>
          <button type="button" className="text-button" onClick={() => onReplay(text)}><Volume2 />Replay</button>
        </div>
      )}
    </div>
  )
}

function StepsGroup({ steps, live }: { steps: Step[]; live: boolean }): React.ReactElement {
  const [open, setOpen] = React.useState(false)
  const expanded = live || open
  const failed = steps.filter(step => step.failed).length
  const count = `${steps.length} step${steps.length === 1 ? '' : 's'}`
  const summary = live ? describe(steps[steps.length - 1]) : failed ? `Worked through ${count}, ${failed} didn't go through` : `Worked through ${count}`
  return (
    <div className={`steps${live ? ' live' : ''}`}>
      <button type="button" className="steps-head" onClick={() => setOpen(o => !o)} aria-expanded={expanded}>
        {expanded ? <ChevronDown className="chev" /> : <ChevronRight className="chev" />}
        <span className={live ? 'shimmer' : ''}>{summary}</span>
      </button>
      {expanded && (
        <ol className="steps-list">
          {steps.map((step, index) => {
            const Icon = ACTIVITY_ICON[step.failed ? 'failed' : step.activity] ?? BookOpen
            return (
              <li key={index} className={step.failed ? 'failed' : ''}>
                <Icon className="step-icon" />
                <span className="step-text">{describe(step)}</span>
                {step.command && <code className="step-cmd" title={step.command}>{step.command}</code>}
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

function describe(step: Step | undefined): string {
  if (!step) return ''
  const verb = ACTIVITY_LABEL[step.activity] ?? step.activity
  const tool = step.text.replace(/…$/, '')
  return tool ? `${verb} · ${tool}` : verb
}

function ListRow({ list, onOpen }: { list: List; onOpen: () => void }): React.ReactElement {
  const open = list.items.filter(item => !item.done).length
  return (
    <div className="turn assistant">
      <div className="artifact list-card" role="button" tabIndex={0} onClick={onOpen} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}>
        <div className="artifact-thumb"><ListChecks /></div>
        <div className="artifact-meta">
          <span className="artifact-name">{list.title}</span>
          <span className="artifact-sub">List · {open} item{open === 1 ? '' : 's'}{list.items.length - open > 0 ? ` · ${list.items.length - open} done` : ''}</span>
        </div>
      </div>
    </div>
  )
}

function ArtifactRow({ artifact, onOpen }: { artifact: Artifact; onOpen: () => void }): React.ReactElement {
  const Icon = artifact.kind === 'image' ? ImageIcon : FileText
  const url = withToken(`/artifact/${encodeURIComponent(artifact.id)}`)
  const reveal = async (): Promise<void> => { await fetch(withToken(`/artifact/${encodeURIComponent(artifact.id)}/reveal`), { method: 'POST' }) }
  return (
    <div className="turn assistant">
      <div className="artifact" role="button" tabIndex={0} onClick={onOpen} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}>
        <div className={`artifact-thumb${artifact.kind === 'image' ? ' image' : ''}`}>{artifact.kind === 'image' ? <img src={url} alt="" loading="lazy" /> : <Icon />}</div>
        <div className="artifact-meta">
          <span className="artifact-name">{artifact.description ?? artifact.name}</span>
          <span className="artifact-sub">{artifact.description ? `${artifact.name} · ` : ''}{kindLabel(artifact)}{typeof artifact.size === 'number' ? ` · ${formatBytes(artifact.size)}` : ''}</span>
        </div>
        <button type="button" className="icon-button" title="Reveal in Finder" aria-label="Reveal in Finder" onClick={e => { e.stopPropagation(); void reveal() }}><FolderOpen /></button>
      </div>
    </div>
  )
}

// ---- composer -----------------------------------------------------------

const Composer = React.forwardRef<HTMLTextAreaElement, { onSend: (text: string) => Promise<void>; busy: boolean; name: string; notice: string; voiceStatus: string; speaking: boolean; onStopVoice: () => void }>(
  function Composer({ onSend, busy, name, notice, voiceStatus, speaking, onStopVoice }, forwarded): React.ReactElement {
    const [text, setText] = React.useState('')
    const [error, setError] = React.useState('')
    const ref = React.useRef<HTMLTextAreaElement>(null)
    React.useImperativeHandle(forwarded, () => ref.current as HTMLTextAreaElement)
    React.useEffect(() => { const el = ref.current; if (!el) return; el.style.height = 'auto'; el.style.height = `${Math.min(el.scrollHeight, 240)}px` }, [text])
    const submit = async (): Promise<void> => {
      const value = text.trim()
      if (value === '') return
      setText(''); setError('')
      try { await onSend(value) } catch (err) { setText(value); setError(err instanceof Error ? err.message : String(err)) }
      ref.current?.focus()
    }
    // Transient text floats above the pill so the layout never shifts. Errors clear on the next keystroke.
    const chip = error ? { kind: 'error', text: error } : notice ? { kind: 'notice', text: notice } : voiceStatus ? { kind: 'voice', text: voiceStatus } : null
    return (
      <div className="composer-dock">
        <div className={`composer${busy ? ' busy' : ''}`}>
          <div className="composer-pill">
            <textarea ref={ref} value={text} rows={1} placeholder={`Message ${name}`} spellCheck={false} onChange={e => { setText(e.target.value); if (error) setError('') }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void submit() }
                if (e.key === 'Escape') ref.current?.blur()
              }} />
            {speaking && <button type="button" className="send quiet" onClick={onStopVoice} title="Stop speaking" aria-label="Stop speaking"><Square /></button>}
            <button type="button" className="send" onClick={() => { void submit() }} disabled={text.trim() === ''} title="Send (Enter)" aria-label="Send"><ArrowUp /></button>
          </div>
          {chip && <div className={`composer-chip ${chip.kind}`} role="status">{chip.text}</div>}
        </div>
      </div>
    )
  })

// ---- stage --------------------------------------------------------------

function Stage({ manifest, activity, name }: { manifest: Manifest | null; activity: string; name: string }): React.ReactElement {
  const a = React.useRef<HTMLVideoElement>(null)
  const b = React.useRef<HTMLVideoElement>(null)
  const img = React.useRef<HTMLImageElement>(null)
  const active = React.useRef<HTMLVideoElement | null>(null)
  const current = React.useRef('')
  React.useEffect(() => { current.current = '' }, [manifest?.characterId])
  React.useEffect(() => {
    if (!manifest) return
    const key = manifest.states[activity] ? activity : 'idle'
    const asset = manifest.states[key]
    if (!asset || key === current.current) return
    current.current = key
    if (asset.video) {
      const next = active.current === a.current ? b.current : a.current
      if (!next) return
      next.src = withToken(asset.video)
      next.playbackRate = manifest.playbackRate || 1
      next.play().catch(() => {})
      next.classList.add('visible')
      active.current?.classList.remove('visible')
      img.current?.classList.remove('visible')
      active.current = next
    } else if (asset.image && img.current) {
      img.current.src = withToken(asset.image)
      img.current.classList.add('visible')
      active.current?.classList.remove('visible')
      active.current = null
    }
  }, [manifest, activity])
  React.useEffect(() => { for (const v of [a.current, b.current]) if (v) v.playbackRate = manifest?.playbackRate || 1 }, [manifest?.playbackRate])
  const hasArt = Boolean(manifest && Object.keys(manifest.states).length > 0)
  return (
    <aside className="stage">
      {hasArt ? (
        <>
          <video ref={a} className="layer" muted loop playsInline preload="auto" />
          <video ref={b} className="layer" muted loop playsInline preload="auto" />
          <img ref={img} className="layer" alt="" />
        </>
      ) : (
        <div className="stage-empty"><div className="avatar avatar-letter big">{name.slice(0, 1)}</div><p>{name} has no artwork yet.</p></div>
      )}
    </aside>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
