/*
 * Chat-room layout: the whole conversation on the left, the character on the
 * right. Same server, same event stream as the classic stage; nothing here
 * depends on the imperative controllers of that page.
 */
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUp, BookOpen, Brain, Check, CheckSquare, ChevronDown, Paperclip, ChevronRight, Copy, FileText, Files, FolderOpen, Hourglass, Image as ImageIcon, ListChecks, PenLine, Plug, Search, Settings, Sparkles, Square, Terminal, TriangleAlert, Volume2, VolumeX, X } from 'lucide-react'
import { render as renderMarkdown } from '../markdown'
import { CharacterPanel } from './CharacterPanel'
import { MemoryPanel } from './MemoryPanel'
import { ListsPanel } from './ListsPanel'
import { FilesPanel } from './FilesPanel'
import { SettingsPanel, errorText } from './SettingsPanel'
import { HelpPanel } from './HelpPanel'
import { DataPanel } from './DataPanel'
import { ACTIVITY_LABEL, browserLanguage, MOD, MOD_LABEL, formatBytes, getJson, kindLabel, nextKey, postJson, withToken, readDraftFiles, readDraftText, writeDraftFiles, writeDraftText, type Artifact, type Attachment, type Item, type Lang, type List, type Manifest, type MemoryEntry, type Question, type QuestionAnswer, type Step } from './lib'
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
  const [pref, setPrefState] = React.useState<ThemePref>(() => { const v = localStorage.getItem('aibo-chat-theme'); return v === 'light' || v === 'dark' ? v : 'system' })
  React.useEffect(() => {
    const media = matchMedia('(prefers-color-scheme: dark)')
    const apply = (): void => { document.documentElement.classList.toggle('dark', pref === 'dark' || (pref === 'system' && media.matches)) }
    apply()
    if (pref !== 'system') return
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [pref])
  const setPref = (next: ThemePref): void => { setPrefState(next); if (next === 'system') localStorage.removeItem('aibo-chat-theme'); else localStorage.setItem('aibo-chat-theme', next) }
  return [pref, setPref]
}

/** Speech is requested by the page, line by line, from the local speech service. */
// A one-sample silent WAV. Playing it inside a real user gesture unlocks the
// shared player, so later replies (fetched asynchronously) may play in WebKit.
const SILENT = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA'
// Whether this engine can be fed an mp3 progressively. WebKit can; the flag
// also decides whether the service is asked to stream its provider through.
const STREAMS = typeof MediaSource !== 'undefined' && MediaSource.isTypeSupported('audio/mpeg')

function useVoice(enabled: boolean, language: Lang): { speak: (text: string) => void; stop: () => void; status: string; speaking: boolean } {
  const [status, setStatus] = React.useState('')
  const [speaking, setSpeaking] = React.useState(false)
  const generation = React.useRef(0)
  const player = React.useRef<HTMLAudioElement | null>(null)
  const unlocked = React.useRef(false)
  // A reply that autoplay rules blocked, waiting for the next real gesture.
  const pending = React.useRef<(() => Promise<void>) | null>(null)
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
  const start = React.useCallback(async (url: string, ticket: number): Promise<void> => {
    try { await playUrl(url, ticket) }
    catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') { pending.current = () => playUrl(url, ticket); setStatus('Click or press a key to hear the reply') }
      else throw err
    }
  }, [playUrl])
  /**
   * Plays an mp3 as it arrives. WebKit will not take a fetch stream, but it
   * will play a MediaSource fed chunk by chunk, so she starts on the provider's
   * first chunk (~0.5s from Fish) instead of on its last (~5s for a long line).
   * The chunks are kept so the finished line still lands in the replay cache.
   */
  const playStream = React.useCallback(async (body: ReadableStream<Uint8Array<ArrayBuffer>>, ticket: number): Promise<Blob | null> => {
    const media = new MediaSource()
    const url = URL.createObjectURL(media); objectUrl.current = url
    const opened = new Promise<SourceBuffer>((resolve, reject) => {
      media.addEventListener('sourceopen', () => { try { resolve(media.addSourceBuffer('audio/mpeg')) } catch (err) { reject(err as Error) } }, { once: true })
      media.addEventListener('error', () => reject(new Error('speech_error')), { once: true })
    })
    const el = getPlayer()
    el.onended = () => { if (ticket === generation.current) stop() }
    el.onerror = () => { if (ticket === generation.current) { stop(); setStatus(errorText('speech_error')) } }
    // Pointing the player at the MediaSource is what opens it, so playback has
    // to be armed before the first chunk can go in — and never awaited here:
    // WebKit settles play() only once the first samples land, which is the loop
    // below. Autoplay may hold it back; the stream fills either way and the
    // next gesture releases it, no re-attaching (a MediaSource attaches once).
    el.src = url
    void el.play().then(
      () => { if (ticket === generation.current) { setSpeaking(true); setStatus('Speaking…') } },
      (err: unknown) => {
        if (ticket !== generation.current) return
        if (err instanceof DOMException && err.name === 'NotAllowedError') {
          pending.current = async () => { await el.play(); if (ticket === generation.current) { setSpeaking(true); setStatus('Speaking…') } }
          setStatus('Click or press a key to hear the reply')
        } else { stop(); setStatus(errorText('speech_error')) }
      },
    )
    const buffer = await opened
    const parts: BlobPart[] = []
    const reader = body.getReader()
    for (;;) {
      const { done, value } = await reader.read()
      if (ticket !== generation.current) { await reader.cancel().catch(() => {}); return null }
      if (done) break
      parts.push(value)
      buffer.appendBuffer(value)
      await new Promise<void>((resolve, reject) => {
        buffer.addEventListener('updateend', () => resolve(), { once: true })
        buffer.addEventListener('error', () => reject(new Error('speech_error')), { once: true })
      })
    }
    // A provider that dies mid-line can only end the response; she stops where
    // the audio stopped rather than reporting an error over what she did say.
    if (media.readyState === 'open') media.endOfStream()
    return new Blob(parts, { type: 'audio/mpeg' })
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
        const cached = clips.current.get(key)
        if (cached === undefined) {
          const res = await fetch(withToken('/voice/read'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, language, dub: true, stream: STREAMS }), signal: controller.signal })
          if (!res.ok) throw new Error(((await res.json().catch(() => ({ error: 'speech_error' }))) as { error?: string }).error ?? 'speech_error')
          if (ticket !== generation.current) return
          // Only the mp3 providers stream; local and VOICEVOX answer in wav,
          // which MediaSource will not take, and arrive complete anyway.
          if (STREAMS && res.body !== null && (res.headers.get('content-type') ?? '').startsWith('audio/mpeg')) {
            const blob = await playStream(res.body, ticket)
            if (blob !== null && ticket === generation.current) remember(key, blob)
            return
          }
          const blob = await res.blob()
          remember(key, blob)
          if (ticket !== generation.current) return
          const url = URL.createObjectURL(blob); objectUrl.current = url
          await start(url, ticket)
          return
        }
        if (ticket !== generation.current) return
        const url = URL.createObjectURL(cached); objectUrl.current = url
        await start(url, ticket)
      } catch (err) {
        if (ticket !== generation.current) return
        stop()
        if (!(err instanceof DOMException && err.name === 'AbortError')) setStatus(errorText((err as Error).message))
      }
    })()
  }, [enabled, language, stop, start, playStream])
  // First real gesture: unlock the shared player, and flush a reply that was blocked by autoplay rules.
  React.useEffect(() => {
    const unlock = (): void => {
      if (pending.current) { const resume = pending.current; pending.current = null; void resume().catch(() => setStatus(errorText('speech_error'))); unlocked.current = true; return }
      if (unlocked.current) return
      const el = getPlayer()
      // The player is shared with the reply that may be speaking right now, and
      // pointing it at the silent clip would abort that reply and surface as a
      // speech error — clicking the composer must not cut her off. Audio already
      // coming out of it is proof enough that nothing needs unlocking.
      if (!el.paused) { unlocked.current = true; return }
      if (request.current !== null) return
      el.src = SILENT
      void el.play().then(() => { unlocked.current = true }).catch(() => {})
    }
    window.addEventListener('pointerdown', unlock, true)
    window.addEventListener('keydown', unlock, true)
    return () => { window.removeEventListener('pointerdown', unlock, true); window.removeEventListener('keydown', unlock, true) }
  }, [playUrl])
  React.useEffect(() => { window.addEventListener('pagehide', stop); return () => window.removeEventListener('pagehide', stop) }, [stop])
  return { speak, stop, status, speaking }
}

// ---- mood from stage directions ------------------------------------------
//
// Her replies open with a parenthesised stage direction ("（耳根微微发红）"),
// sometimes a second one mid-reply. The stage reads them as they stream in
// and picks a matching expression, so she reacts while she is still talking
// instead of standing idle through the whole line. A direction often moves
// ("愣了一下……眼角先弯起来"), so the cue that appears last in it wins; ties
// go to the earlier row, so "笑出声" lands on excited before done sees "笑".
const MOODS: [string, RegExp][] = [
  ['excited', /耳根|脸红|红了|笑出声|眼睛(一)?亮|亮晶晶|兴奋|开心|雀跃|蹦|拍手|欢呼|哼歌|尾巴.{0,6}(甩|摇|晃|摆|勾|翘)|得意|blush|grin|excited|beam/i],
  // Comforting gestures land here too: the downcast, cooler-lit row reads as
  // sympathy when she is the one doing the consoling.
  ['sad', /眼神软|心疼|叹(了口)?气|难过|低落|失落|委屈|眼眶|鼻子一酸|垂下|耷拉|落寞|黯|放(得更|得|)轻|轻声|挨着|陪你|拍了拍|揉了揉|摸摸|温柔|sigh|sad|tear|softly|gentl/i],
  ['surprised', /愣住|愣了|一惊|瞪大|吓了一跳|惊讶|睁大|张大嘴|噎|surpris|startle|blink/i],
  ['reading', /皱眉|板起脸|沉思|想了想|思索|歪头|眯起眼|认真|盯着|frown|ponder|think/i],
  ['done', /满意|微笑|笑了笑|点头|轻笑|笑着|弯起|抿嘴笑|smile|nod|chuckle/i],
]
const DIRECTION = /[（(]([^（）()\n]{1,60})[）)]/g

/** The mood of the last complete stage direction in `text`, if any is known. */
function moodOf(text: string): string | null {
  let mood: string | null = null
  for (const m of text.matchAll(DIRECTION)) {
    let best = -1
    for (const [name, re] of MOODS) {
      const at = m[1].search(re)
      if (at > best) { best = at; mood = name }
    }
  }
  return mood
}

// ---- app ----------------------------------------------------------------

function App(): React.ReactElement {
  const [manifest, setManifest] = React.useState<Manifest | null>(null)
  const [items, setItems] = React.useState<Item[]>([])
  const [busy, setBusy] = React.useState(false)
  const [activity, setActivity] = React.useState('idle')
  const [beat, setBeat] = React.useState<string | null>(null)
  const [mood, setMood] = React.useState<string | null>(null)
  const [typing, setTyping] = React.useState(false)
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
  const [voiceOn, setVoiceOnState] = React.useState(() => localStorage.getItem('aibo-voice') !== 'off')
  const [speechPref, setSpeechPrefState] = React.useState<'auto' | Lang>(() => { const v = localStorage.getItem('aibo-speech-language'); return v === 'zh' || v === 'en' || v === 'ja' ? v : 'auto' })
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
    if (typeof prefs.voice === 'boolean') { setVoiceOnState(prefs.voice); localStorage.setItem('aibo-voice', prefs.voice ? 'on' : 'off') }
    const l = prefs.speechLanguage
    if (l === 'auto' || l === 'zh' || l === 'en' || l === 'ja') { setSpeechPrefState(l); localStorage.setItem('aibo-speech-language', l) }
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
        setMood(null)
        setItems(prev => [...closeSteps(prev), { kind: 'msg', key: nextKey(), role: 'user', text: String(ev.text ?? ''), at: Date.now(), ...Array.isArray(ev.attachments) ? { attachments: ev.attachments as Attachment[] } : {} }])
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
        setMood(null)
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
        if (ev.reset) { setItems(prev => [...closeSteps(settleStreams(prev)), { kind: 'msg', key: nextKey(), role: 'assistant', text: '', streaming: true, at: Date.now() }]); setMood(null); setActivity('writing'); break }
        if (ev.done) break
        if (typeof ev.text === 'string') setItems(prev => {
          const index = lastStreaming(prev)
          if (index === -1) return [...closeSteps(prev), { kind: 'msg', key: nextKey(), role: 'assistant', text: ev.text, streaming: true, at: Date.now() }]
          const live = prev[index] as Extract<Item, { kind: 'msg' }>
          const text = live.text + ev.text
          const next = moodOf(text)
          if (next) setMood(next)
          return [...prev.slice(0, index), { ...live, text }, ...prev.slice(index + 1)]
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
        const finalMood = moodOf(text)
        if (finalMood) setMood(finalMood)
        lastLine.current = text
        if (!ev.interrupted) speakRef.current(text)
        break
      }
      case 'busy':
        setBusy(Boolean(ev.value))
        if (!ev.value) setItems(prev => closeSteps(settleStreams(prev)))
        break
      case 'session':
        setItems([{ kind: 'notice', key: nextKey(), text: 'New session' }])
        setBusy(false); setActivity('idle'); setMood(null)
        break
      case 'manifest':
        setManifest(ev.manifest)
        setPreview(null)
        break
      case 'snapshot': {
        const entries = Array.isArray(ev.entries) ? ev.entries as { role: string; text: string; activity?: string; tool?: string; command?: string; failed?: boolean; list?: List; id?: string; questions?: Question[]; answers?: QuestionAnswer[]; cancelled?: boolean; attachments?: Attachment[] }[] : []
        const restored: Item[] = []
        for (const entry of entries) {
          if (entry.role === 'status') {
            const step: Step = { activity: String(entry.activity ?? 'reading'), text: String(entry.tool ?? entry.text ?? ''), ...entry.command === undefined ? {} : { command: String(entry.command) }, ...entry.failed ? { failed: true } : {} }
            const last = restored[restored.length - 1]
            if (last?.kind === 'steps') last.steps.push(step)
            else restored.push({ kind: 'steps', key: nextKey(), steps: [step], live: false })
          } else if (entry.role === 'list' && entry.list) {
            restored.push({ kind: 'list', key: nextKey(), list: entry.list })
          } else if (entry.role === 'question' && Array.isArray(entry.questions)) {
            restored.push({ kind: 'question', key: nextKey(), id: String(entry.id ?? ''), questions: entry.questions, ...Array.isArray(entry.answers) ? { answers: entry.answers } : {}, ...entry.cancelled ? { cancelled: true } : {} })
          } else if (entry.role === 'user' || entry.role === 'assistant') {
            restored.push({ kind: 'msg', key: nextKey(), role: entry.role, text: entry.text, at: 0, ...Array.isArray(entry.attachments) ? { attachments: entry.attachments } : {} })
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
      case 'question': {
        const id = String(ev.id ?? '')
        if (Array.isArray(ev.questions)) {
          setItems(prev => [...closeSteps(settleStreams(prev)), { kind: 'question', key: nextKey(), id, questions: ev.questions as Question[] }])
        } else {
          setItems(prev => prev.map(item => item.kind === 'question' && item.id === id ? { ...item, ...Array.isArray(ev.answers) ? { answers: ev.answers as QuestionAnswer[] } : {}, ...ev.cancelled === true ? { cancelled: true } : {} } : item))
        }
        break
      }
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
    }).catch(() => setItems([{ kind: 'notice', key: nextKey(), text: 'Could not reach the Aibo server.' }]))
    return () => { source?.close() }
  }, [handleEvent])
  React.useEffect(() => { if (manifest) document.title = `${manifest.characterName} · Aibo` }, [manifest?.characterName]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const send = React.useCallback(async (text: string, attachments: Pending[] = []) => {
    if (text.startsWith('/') && attachments.length === 0) { await runCommand(text); return }
    stopRef.current()
    const encoded = await Promise.all(attachments.map(async a => ({ kind: a.kind, name: a.file.name || (a.kind === 'image' ? 'pasted.png' : 'file'), mediaType: a.file.type || 'application/octet-stream', data: await toBase64(a.file) })))
    const res = await fetch(withToken('/send'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text, attachments: encoded }) })
    if (!res.ok) throw new Error(await res.text())
  }, [runCommand])

  // Keyboard: ⌘ and ⌥ shortcuts anywhere, single keys only outside the input.
  React.useEffect(() => {
    const onKey = (ev: KeyboardEvent): void => {
      if (ev.isComposing) return
      const target = ev.target as HTMLElement | null
      const typing = Boolean(target?.closest?.('input,textarea,select,[contenteditable]'))
      // The platform's own modifier, so the habits people already have carry over.
      if (MOD(ev) && !ev.altKey) {
        const map: Record<string, () => void> = {
          Comma: () => openPanel('settings'),
          KeyN: () => { void newSession() },
          KeyK: () => { setPanel(null); composerRef.current?.focus() },
          Slash: () => openPanel('help'),
        }
        const action = map[ev.code]
        if (action) { ev.preventDefault(); action(); return }
      }
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
  }, [newSession, openPanel, panel, replay, voiceOn]) // eslint-disable-line react-hooks/exhaustive-deps

  // The mood outlives the turn while her voice is still reading the line, then fades.
  const voiceLive = voice.speaking || voice.status === 'Preparing voice…'
  React.useEffect(() => {
    if (busy || voiceLive || mood === null) return
    const t = window.setTimeout(() => setMood(null), 6000)
    return () => window.clearTimeout(t)
  }, [busy, voiceLive, mood])
  const shown = preview ?? beat ?? (
    busy ? (activity === 'waiting' ? 'waiting' : mood ?? activity)
      : voice.speaking ? (mood ?? 'speaking')
        : mood ?? (activity === 'done' ? 'done' : activity === 'waiting' ? 'waiting' : typing ? 'listening' : 'idle'))
  const name = manifest?.characterName ?? '…'
  const closePanel = (open: boolean): void => { if (!open) setPanel(null) }

  return (
    <div className={`app${DESKTOP_SHELL ? ' shell' : ''}`}>
      {DESKTOP_SHELL && <TitlebarStrip />}
      <section className="chat">
        <header className="chat-header">
          <button type="button" className="who" title="Character (⌥C)" onClick={() => openPanel('character')}>
            <Avatar manifest={manifest} />
            <div className="who-text">
              <span className="who-name">{name}</span>
              <span className={`who-state${busy || voice.speaking ? ' busy' : ''}${connected ? '' : ' off'}`}><i className="dot" />{!connected ? 'Disconnected' : busy ? (ACTIVITY_LABEL[activity] ?? activity) : voice.speaking ? 'Speaking' : (ACTIVITY_LABEL[shown] ?? shown)}</span>
            </div>
          </button>
          <div className="header-actions">
            <IconButton title={voiceOn ? 'Voice on (⌥V)' : 'Voice off (⌥V)'} onClick={() => setVoiceOn(!voiceOn)} active={voiceOn}>{voiceOn ? <Volume2 /> : <VolumeX />}</IconButton>
            <IconButton title="Memory (⌥M)" onClick={() => openPanel('memory')}><Brain /></IconButton>
            <IconButton title="Files (⌥F)" onClick={() => openPanel('files')}><Files /></IconButton>
            <IconButton title="Lists (⌥L)" onClick={() => openPanel('lists')}><ListChecks /></IconButton>
            <IconButton title="Connectors (⌥D)" onClick={() => openPanel('data')}><Plug /></IconButton>
            <IconButton title={`Settings (${MOD_LABEL},)`} onClick={() => openPanel('settings')}><Settings /></IconButton>
          </div>
        </header>
        <MessageList items={items} lists={lists} name={name} busy={busy} onReplay={text => voice.speak(text)} onOpenFile={id => openPanel('files', { file: id })} onOpenList={id => { setListId(id); openPanel('lists') }} />
        <Composer ref={composerRef} onSend={send} busy={busy} name={name} notice={notice} voiceStatus={voice.speaking ? '' : voice.status} speaking={voice.speaking} onStopVoice={voice.stop} onTyping={setTyping} />
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

/* The desktop shell hides the title bar and floats the traffic lights over the
 * page (`?shell=desktop`), so the UI owes macOS two things a real title bar
 * gives for free: room for the lights, and a strip to drag and double-click.
 * The strip sits under the header pills, which keep their own pointer events. */
const DESKTOP_SHELL = new URLSearchParams(location.search).get('shell') === 'desktop'

/* Tauri's own drag-region script handles both gestures on this element: a
 * single press drags the window, a double press zooms it. Adding a second
 * double-click handler here would toggle twice and look like nothing happened. */
function TitlebarStrip(): React.ReactElement {
  return <div className="titlebar" data-tauri-drag-region />
}

// ---- header pieces ------------------------------------------------------

function Avatar({ manifest }: { manifest: Manifest | null }): React.ReactElement {
  // Her portrait when the pack ships one; otherwise the idle frame, cropped.
  const portrait = manifest?.avatar
  const image = portrait ?? manifest?.states.idle?.image
  if (image) return <img className={`avatar${portrait === undefined ? '' : ' avatar-portrait'}`} src={withToken(image)} alt="" />
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
            case 'msg': return item.role === 'user' ? <UserBubble key={item.key} text={item.text} attachments={item.attachments} /> : <AssistantTurn key={item.key} name={name} text={item.text} streaming={item.streaming === true} onReplay={onReplay} />
            case 'steps': return <StepsGroup key={item.key} steps={item.steps} live={item.live} />
            case 'artifact': return <ArtifactRow key={item.key} artifact={item.artifact} onOpen={() => onOpenFile(item.artifact.id)} />
            case 'list': return <ListRow key={item.key} list={lists.find(list => list.id === item.list.id) ?? item.list} onOpen={() => onOpenList(item.list.id)} />
            case 'question': return <QuestionCard key={item.key} item={item} name={name} />
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

function UserBubble({ text, attachments }: { text: string; attachments?: Attachment[] }): React.ReactElement {
  const images = (attachments ?? []).filter(a => a.kind === 'image' && a.url)
  const files = (attachments ?? []).filter(a => !(a.kind === 'image' && a.url))
  return (
    <div className="turn user">
      {images.length > 0 && <div className={`bubble-images n${Math.min(images.length, 3)}`}>{images.map((a, i) => <a key={i} href={withToken(a.url!)} target="_blank" rel="noreferrer"><img src={withToken(a.url!)} alt={a.name} loading="lazy" /></a>)}</div>}
      {files.length > 0 && <div className="bubble-files">{files.map((a, i) => <span key={i} className="bubble-file"><Paperclip /><b>{a.name}</b>{a.bytes > 0 && <small>{formatBytes(a.bytes)}</small>}</span>)}</div>}
      {text !== '' && <div className="bubble">{text}</div>}
    </div>
  )
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

/**
 * A question she asked with `ask_user_question`, answered in place: options as
 * chips (one or many), an "Other" line, then Reply. A single question with a
 * single choice and no typed text is answered by the click itself. Once
 * settled the card stays as a record of what was chosen.
 */
function QuestionCard({ item, name }: { item: Extract<Item, { kind: 'question' }>; name: string }): React.ReactElement {
  const [picked, setPicked] = React.useState<Record<string, string[]>>({})
  const [custom, setCustom] = React.useState<Record<string, string>>({})
  const [sending, setSending] = React.useState(false)
  const [error, setError] = React.useState('')
  const settled = item.answers !== undefined || item.cancelled === true
  const answered = (q: Question): string[] => { const a = item.answers?.find(x => x.id === q.id); return a ? [...a.selected, ...a.custom ? [a.custom] : []] : [] }
  const complete = item.questions.every(q => (picked[q.id]?.length ?? 0) > 0 || (custom[q.id]?.trim() ?? '') !== '')
  const submit = async (answers: QuestionAnswer[]): Promise<void> => {
    setSending(true); setError('')
    try { await postJson('/question', { id: item.id, answers }) } catch (e) { setError((e as Error).message) } finally { setSending(false) }
  }
  const collect = (): QuestionAnswer[] => item.questions.map(q => {
    const text = custom[q.id]?.trim() ?? ''
    const selected = picked[q.id] ?? []
    // A typed answer replaces the choice on a single-select question and supplements it on a multi-select one.
    return { id: q.id, selected: text !== '' && q.multiSelect !== true ? [] : selected, ...text !== '' ? { custom: text } : {} }
  })
  const choose = (q: Question, label: string): void => {
    if (settled || sending) return
    if (q.multiSelect) { setPicked(prev => { const cur = prev[q.id] ?? []; return { ...prev, [q.id]: cur.includes(label) ? cur.filter(l => l !== label) : [...cur, label] } }); return }
    setPicked(prev => ({ ...prev, [q.id]: [label] }))
    if (item.questions.length === 1 && (custom[q.id]?.trim() ?? '') === '') void submit([{ id: q.id, selected: [label] }])
  }
  return (
    <div className="turn assistant">
      <span className="turn-label">{name}</span>
      <div className={`question${settled ? ' settled' : ''}${item.cancelled ? ' cancelled' : ''}`}>
        {item.questions.map(q => {
          const chosen = settled ? answered(q) : (picked[q.id] ?? [])
          return (
            <section key={q.id} className="question-item">
              {q.header && <span className="question-header">{q.header}</span>}
              <p className="question-text">{q.question}</p>
              {q.detail && <pre className="question-detail">{q.detail}</pre>}
              {(q.options ?? []).length > 0 && (
                <div className="question-options" role={q.multiSelect ? 'group' : 'radiogroup'}>
                  {(q.options ?? []).map(o => {
                    const on = chosen.includes(o.label)
                    if (settled && !on) return null
                    return (
                      <button key={o.label} type="button" className={`question-option${on ? ' on' : ''}`} role={q.multiSelect ? 'checkbox' : 'radio'} aria-checked={on} disabled={settled || sending} onClick={() => choose(q, o.label)} title={o.description}>
                        <span className="question-check">{q.multiSelect ? <CheckSquare /> : <Check />}</span>
                        <span className="question-option-text"><b>{o.label}</b>{o.description && <small>{o.description}</small>}</span>
                      </button>
                    )
                  })}
                </div>
              )}
              {settled
                ? (answered(q).length === 0 ? <span className="question-skipped">{item.cancelled ? 'No longer waiting' : 'Skipped'}</span> : answered(q).some(a => !(q.options ?? []).some(o => o.label === a)) && <p className="question-custom-answer">{answered(q).filter(a => !(q.options ?? []).some(o => o.label === a)).join(' · ')}</p>)
                : <input className="input question-custom" placeholder={(q.options ?? []).length ? 'Other…' : 'Type your answer'} value={custom[q.id] ?? ''} disabled={sending} onChange={e => setCustom(prev => ({ ...prev, [q.id]: e.target.value }))} onKeyDown={e => { if (e.key === 'Enter' && complete && !sending) { e.preventDefault(); void submit(collect()) } }} />}
            </section>
          )
        })}
        {!settled && (
          <div className="question-actions">
            {error && <span className="question-error">{error}</span>}
            <button type="button" className="button ghost" disabled={sending} onClick={() => { void submit(item.questions.map(q => ({ id: q.id, selected: [] }))) }}>Skip</button>
            <button type="button" className="button primary" disabled={!complete || sending} onClick={() => { void submit(collect()) }}>{sending ? 'Sending…' : 'Reply'}</button>
          </div>
        )}
      </div>
    </div>
  )
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

/** A file waiting in the composer: pasted, dropped or picked. Images get a local preview. */
type Pending = { id: string; kind: 'image' | 'file'; file: File; preview?: string }
const MAX_ATTACHMENTS = 8
const MAX_IMAGE_BYTES = 20 * 1024 * 1024
const MAX_FILE_BYTES = 32 * 1024 * 1024
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).replace(/^data:[^,]*,/, ''))
    reader.onerror = () => reject(reader.error ?? new Error('could not read the file'))
    reader.readAsDataURL(file)
  })
}

const Composer = React.forwardRef<HTMLTextAreaElement, { onSend: (text: string, attachments?: Pending[]) => Promise<void>; busy: boolean; name: string; notice: string; voiceStatus: string; speaking: boolean; onStopVoice: () => void; onTyping: (active: boolean) => void }>(
  function Composer({ onSend, busy, name, notice, voiceStatus, speaking, onStopVoice, onTyping }, forwarded): React.ReactElement {
    const [text, setText] = React.useState(readDraftText)
    const [focused, setFocused] = React.useState(false)
    // She listens while a draft is being written: the box has focus and words in it.
    React.useEffect(() => { onTyping(focused && text.trim() !== '') }, [focused, text, onTyping])
    const [error, setError] = React.useState('')
    const [pending, setPending] = React.useState<Pending[]>([])
    const [dragging, setDragging] = React.useState(false)
    const composing = React.useRef(false)
    const compositionEnded = React.useRef(-Infinity)
    const sending = React.useRef(false)
    const [submitting, setSubmitting] = React.useState(false)
    const restored = React.useRef(false)
    const ref = React.useRef<HTMLTextAreaElement>(null)
    const fileRef = React.useRef<HTMLInputElement>(null)
    React.useImperativeHandle(forwarded, () => ref.current as HTMLTextAreaElement)
    React.useEffect(() => { const el = ref.current; if (!el) return; el.style.height = 'auto'; el.style.height = `${Math.min(el.scrollHeight, 240)}px` }, [text])
    // The draft outlives a reload: text in localStorage, files in IndexedDB. Nothing is written until the stored files have been read back, so a reload cannot wipe them.
    React.useEffect(() => { writeDraftText(text) }, [text])
    React.useEffect(() => {
      let alive = true
      void readDraftFiles().then(rows => {
        if (!alive) return
        const files = rows.map(r => { const file = new File([r.blob], r.name, { type: r.type }); return { id: r.id, kind: r.kind, file, ...r.kind === 'image' ? { preview: URL.createObjectURL(file) } : {} } as Pending })
        if (files.length) setPending(prev => [...files, ...prev].slice(0, MAX_ATTACHMENTS))
        restored.current = true
      })
      return () => { alive = false }
    }, [])
    React.useEffect(() => { if (restored.current) void writeDraftFiles(pending.map(p => ({ id: p.id, kind: p.kind, name: p.file.name, type: p.file.type, blob: p.file }))) }, [pending])
    const addFiles = (files: Iterable<File>): void => {
      if (sending.current) return
      const next: Pending[] = []
      let problem = ''
      for (const file of files) {
        const kind: Pending['kind'] = /^image\/(png|jpeg|webp|gif)$/.test(file.type) ? 'image' : 'file'
        if (file.size === 0) continue
        if (kind === 'image' && file.size > MAX_IMAGE_BYTES) { problem = `${file.name || 'image'} is over ${Math.round(MAX_IMAGE_BYTES / 1048576)} MB`; continue }
        if (kind === 'file' && file.size > MAX_FILE_BYTES) { problem = `${file.name} is over ${Math.round(MAX_FILE_BYTES / 1048576)} MB`; continue }
        next.push({ id: nextKey(), kind, file, ...kind === 'image' ? { preview: URL.createObjectURL(file) } : {} })
      }
      setPending(prev => {
        const merged = [...prev, ...next]
        if (merged.length > MAX_ATTACHMENTS) problem = `At most ${MAX_ATTACHMENTS} attachments per message`
        return merged.slice(0, MAX_ATTACHMENTS)
      })
      if (problem) setError(problem)
      ref.current?.focus()
    }
    const removePending = (id: string): void => { if (!sending.current) setPending(prev => prev.filter(p => p.id !== id)) }
    const onPaste = (e: React.ClipboardEvent): void => {
      const files = [...e.clipboardData.items].filter(item => item.kind === 'file').map(item => item.getAsFile()).filter((f): f is File => f !== null)
      if (files.length === 0) return
      // A screenshot on the clipboard also carries a text form in some apps; the file wins.
      e.preventDefault()
      addFiles(files)
    }
    const onDrop = (e: React.DragEvent): void => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files) }
    const submit = async (): Promise<void> => {
      const value = text.trim()
      const files = pending
      if (sending.current || composing.current || (value === '' && files.length === 0)) return
      sending.current = true; setSubmitting(true); setError('')
      try {
        await onSend(value, files)
        setText(''); setPending([])
        for (const p of files) if (p.preview) URL.revokeObjectURL(p.preview)
      } catch (err) { setError(err instanceof Error ? err.message : String(err)) }
      finally { sending.current = false; setSubmitting(false) }
      ref.current?.focus()
    }
    // Transient text floats above the pill so the layout never shifts. Errors clear on the next keystroke.
    const chip = error ? { kind: 'error', text: error } : notice ? { kind: 'notice', text: notice } : voiceStatus ? { kind: 'voice', text: voiceStatus } : null
    return (
      <div className="composer-dock" onDragOver={e => { if ([...e.dataTransfer.types].includes('Files')) { e.preventDefault(); setDragging(true) } }} onDragLeave={() => setDragging(false)} onDrop={onDrop}>
        <div className={`composer${busy ? ' busy' : ''}${dragging ? ' dragging' : ''}`}>
          {pending.length > 0 && (
            <div className="composer-attachments">
              {pending.map(p => (
                <div key={p.id} className={`composer-attachment ${p.kind}`} title={p.file.name}>
                  {p.preview ? <img src={p.preview} alt="" /> : <span className="composer-attachment-file"><Paperclip /><b>{p.file.name}</b><small>{formatBytes(p.file.size)}</small></span>}
                  <button type="button" className="composer-attachment-x" aria-label="Remove" onClick={() => removePending(p.id)}><X /></button>
                </div>
              ))}
            </div>
          )}
          <div className="composer-pill">
            <input ref={fileRef} type="file" multiple hidden onChange={e => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }} />
            <button type="button" className="send quiet attach" onClick={() => fileRef.current?.click()} title="Attach a file (or paste / drop one)" aria-label="Attach a file"><Paperclip /></button>
            <textarea ref={ref} readOnly={submitting} value={text} rows={1} placeholder={dragging ? 'Drop to attach' : `Message ${name}`} spellCheck={false} onChange={e => { setText(e.target.value); if (error) setError('') }}
              onPaste={onPaste} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
              onCompositionStart={() => { composing.current = true }}
              onCompositionEnd={() => { composing.current = false; compositionEnded.current = performance.now() }}
              onKeyDown={e => {
                // WebKit can end composition before dispatching the confirming Enter.
                if (composing.current || e.nativeEvent.isComposing || e.nativeEvent.keyCode === 229 || performance.now() - compositionEnded.current < 50) return
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void submit() }
                if (e.key === 'Escape') ref.current?.blur()
              }} />
            {speaking && <button type="button" className="send quiet" onClick={onStopVoice} title="Stop speaking" aria-label="Stop speaking"><Square /></button>}
            <button type="button" className="send" onClick={() => { void submit() }} disabled={submitting || (text.trim() === '' && pending.length === 0)} title={busy ? 'Interrupt and send (Enter)' : 'Send (Enter)'} aria-label={busy ? 'Interrupt and send' : 'Send'}><ArrowUp /></button>
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
