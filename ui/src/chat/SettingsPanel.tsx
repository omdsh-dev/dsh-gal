/* Settings: the same fixed dialog as Connectors. General, Voice and Help down the left; rows on the right. */
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { CircleHelp, Mic, SlidersHorizontal, X } from 'lucide-react'
import { HelpContent } from './HelpPanel'
import { getJson, postJson, withToken, type Lang } from './lib'

type Provider = { id: string; name: string; models: string[]; key: boolean; languages: string[]; voices: Partial<Record<Lang, string>>; docs: string }
type Profile = { provider: string; model: string; voice: string }
type SpeechConfig = { profiles: Record<Lang, Profile>; catalog: Provider[]; hasKeys: Record<string, boolean> }
type Voice = { id: string; name: string; locale: string }
type Tab = 'general' | 'voice' | 'help'

const ERRORS: Record<string, string> = {
  translation_error: 'Could not translate this reply for speech. Replay to retry.',
  key_required: 'Enter an API key first', voice_required: 'Enter a voice ID', auth_error: 'Invalid key or permission. Check account and region.',
  quota_error: 'Quota or rate limit reached', network_error: 'Cannot reach the provider or local engine', timeout: 'Speech request timed out',
  local_unavailable: 'Local system voice unavailable', invalid_text: 'No speakable text, or text too long', invalid_settings: 'Invalid voice settings',
  invalid_audio: 'No valid audio returned', config_error: 'Cannot read voice configuration', speech_error: 'Speech failed. Please retry.',
  provider_error: 'Request rejected. Check model, voice and account quota.',
}
export const errorText = (code: string): string => { const [name, detail] = String(code).split(':'); return (ERRORS[name] ?? ERRORS.speech_error) + (detail ? ` (${detail})` : '') }
const SAMPLE: Record<Lang, string> = { zh: '你好，我是小黑鱼。今天想和我聊些什么呢？', en: 'Hello, I am here. What would you like to talk about today?', ja: 'こんにちは。今日はどんなお話をしましょうか。' }
const LANG_NAME: Record<Lang, string> = { zh: '中文', en: 'English', ja: '日本語' }

export function SettingsPanel({ open, onOpenChange, theme, setTheme, voiceOn, setVoiceOn, speechPref, setSpeechPref, speechLang, onNewSession, stopVoice }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  theme: 'system' | 'light' | 'dark'
  setTheme: (pref: 'system' | 'light' | 'dark') => void
  voiceOn: boolean
  setVoiceOn: (on: boolean) => void
  speechPref: 'auto' | Lang
  setSpeechPref: (pref: 'auto' | Lang) => void
  speechLang: Lang
  onNewSession: () => void
  stopVoice: () => void
  onHelp?: () => void
}): React.ReactElement {
  const [tab, setTab] = React.useState<Tab>('general')
  const items: { id: Tab; label: string; hint: string; icon: React.ComponentType }[] = [
    { id: 'general', label: 'General', hint: 'Appearance and session', icon: SlidersHorizontal },
    { id: 'voice', label: 'Voice', hint: 'Read aloud and the speech provider', icon: Mic },
    { id: 'help', label: 'Help', hint: 'Commands and shortcuts', icon: CircleHelp },
  ]
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="panel-overlay" />
        <Dialog.Content className="panel full settings" aria-describedby={undefined} onOpenAutoFocus={e => e.preventDefault()}>
          <aside className="src-side">
            <div className="src-side-head">
              <Dialog.Title className="panel-title">Settings</Dialog.Title>
              <p className="panel-subtitle">How the room looks and sounds.</p>
            </div>
            <nav className="src-nav">
              {items.map(item => {
                const Icon = item.icon
                return (
                  <button key={item.id} type="button" className={`src-item${tab === item.id ? ' active' : ''}`} onClick={() => setTab(item.id)}>
                    <span className="src-icon"><Icon /></span>
                    <span className="src-text"><b>{item.label}</b><small>{item.hint}</small></span>
                  </button>
                )
              })}
            </nav>
          </aside>
          <section className="src-main">
            <Dialog.Close className="icon-button src-close" aria-label="Close"><X /></Dialog.Close>
            <header className="src-head">
              <div className="src-titles">
                <h2>{items.find(i => i.id === tab)?.label}</h2>
                <p className="source-summary">{items.find(i => i.id === tab)?.hint}</p>
              </div>
            </header>
            <div className="src-body">
              {tab === 'general' && (
                <>
                  <div className="settings-group">
                    <h3 className="section">Appearance</h3>
                    <div className="settings-rows">
                      <div className="setting"><span><b>Theme</b><small>System follows macOS and switches with it.</small></span>
                        <span className="seg" role="tablist">{(['system', 'light', 'dark'] as const).map(t => <button key={t} type="button" role="tab" aria-selected={theme === t} className={theme === t ? 'active' : ''} onClick={() => setTheme(t)}>{t === 'system' ? 'System' : t === 'light' ? 'Light' : 'Dark'}</button>)}</span>
                      </div>
                    </div>
                  </div>
                  {open && <ThinkingSettings />}
                  {open && <ComputerUseSettings />}
                  {open && <PetSettings />}
                  <div className="settings-group">
                    <h3 className="section">Session</h3>
                    <div className="settings-rows">
                      <div className="setting"><span><b>Start over</b><small>Opens an empty conversation. The current one stays in dsh web.</small></span><button type="button" className="button" onClick={() => { onNewSession(); onOpenChange(false) }}>New session</button></div>
                    </div>
                  </div>
                </>
              )}
              {tab === 'voice' && (
                <>
                  <div className="settings-group">
                    <h3 className="section">Playback</h3>
                    <div className="settings-rows">
                      <label className="setting"><span><b>Read replies aloud</b><small>Each reply is spoken with the provider set below.</small></span><input type="checkbox" className="switch" checked={voiceOn} onChange={e => setVoiceOn(e.target.checked)} /></label>
                      <label className="setting"><span><b>Speech language</b><small>Replies are rewritten into this language before they are read.</small></span>
                        <span className="control"><select className="input short" value={speechPref} onChange={e => setSpeechPref(e.target.value as 'auto' | Lang)}>
                          <option value="auto">Follow the browser</option><option value="zh">中文</option><option value="en">English</option><option value="ja">日本語</option>
                        </select></span>
                      </label>
                    </div>
                  </div>
                  {open && <SpeechForm speechLang={speechLang} speechPref={speechPref} setSpeechPref={setSpeechPref} stopVoice={stopVoice} />}
                </>
              )}
              {tab === 'help' && <HelpContent />}
            </div>
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

type ThinkingView = { provider: string; model: string; selected: string; effective?: string; efforts: { id: string; name: string }[] }
function ThinkingSettings(): React.ReactElement {
  const [view, setView] = React.useState<ThinkingView | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    let active = true
    void getJson<ThinkingView>('/thinking').then(value => { if (active) setView(value) }).catch(() => { if (active) setError('Could not load thinking settings. Reopen Settings to retry.') })
    return () => { active = false }
  }, [])
  const save = async (effort: string) => {
    setSaving(true); setError('')
    try { setView(await postJson<ThinkingView>('/thinking', { effort })) }
    catch { setError('Could not save thinking level. Please retry.') }
    finally { setSaving(false) }
  }
  return <div className="settings-group">
    <h3 className="section">Thinking</h3>
    <div className="settings-rows"><label className="setting"><span><b>Thinking level</b><small>{view ? `${view.model} · Applies from the next model request. Higher levels can take longer.` : 'Loading…'}</small></span>
      {view && <select className="input" aria-label="Thinking level" value={view.selected} disabled={saving || view.efforts.length === 0} onChange={e => void save(e.target.value)}>
        <option value="default">Model default{view.selected === 'default' && view.effective ? ` (${view.effective})` : ''}</option>
        {view.efforts.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>}
    </label></div>
    {error && <p role="alert">{error}</p>}
  </div>
}

type ComputerUseView = { status: string; summary: string; shared: boolean; stats?: { label: string; value: string }[]; actions?: { id: string; kind: string; value?: boolean }[] }

function PetSettings(): React.ReactElement | null {
  type Prefs = { enabled: boolean; showWithMain: boolean; size: number }
  const bridge = (window as unknown as { __TAURI__?: { core: { invoke: <T>(name: string, args?: Record<string, unknown>) => Promise<T> }; event: { listen: <T>(name: string, callback: (event: {payload:T}) => void) => Promise<() => void> } } }).__TAURI__
  const [prefs, setPrefs] = React.useState<Prefs | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [error, setError] = React.useState('')
  React.useEffect(() => {
    if (!bridge) return
    let active = true
    void bridge.core.invoke<Prefs>('get_pet_preferences').then(p => { if (active) setPrefs(p) }).catch(() => { if (active) setError('Could not load desktop pet settings.') })
    const unlisten = bridge.event.listen<Prefs>('aibo://pet-preferences', ({payload}) => { if (active) setPrefs(payload) })
    return () => { active = false; void unlisten.then(fn => fn()).catch(console.error) }
  }, [])
  if (!bridge) return null
  const save = async (patch: Partial<Prefs>): Promise<void> => {
    if (!prefs) return
    setSaving(true); setError('')
    try { setPrefs(await bridge.core.invoke<Prefs>('set_pet_preferences', { ...prefs, ...patch })) }
    catch { setError('Could not save. Please try again.') }
    finally { setSaving(false) }
  }
  return <div className="settings-group">
    <h3 className="section">Desktop pet</h3>
    <div className="settings-rows">
      {prefs && <>
        <label className="setting"><span><b>Keep Xiaoheiyu on the desktop</b><small>She stays when you close (⌘W) or hide (⌘H) the window. Quit (⌘Q) exits everything.</small></span><input className="switch" type="checkbox" checked={prefs.enabled} disabled={saving} onChange={e => void save({enabled:e.target.checked})} /></label>
        <label className="setting"><span><b>Also show with the main window</b><small>Off keeps her on the desktop only while the main window is tucked away.</small></span><input className="switch" type="checkbox" checked={prefs.showWithMain} disabled={saving || !prefs.enabled} onChange={e => void save({showWithMain:e.target.checked})} /></label>
        <label className="setting"><span><b>Pet size</b><small>Drag her to move. Click a bubble to open the conversation.</small></span><select className="input" aria-label="Pet size" value={prefs.size} disabled={saving || !prefs.enabled} onChange={e => void save({size:Number(e.target.value)})}>{Array.from({length:15},(_,i)=>120+i*10).map(size => <option key={size} value={size}>{size} px</option>)}</select></label>
      </>}
      {error && <p className="empty" role="status">{error}</p>}
    </div>
  </div>
}

/**
 * The Computer Use switch. The plugin (plugins/computer-use) registers itself
 * as a connector, so this reads and writes the same source the Data panel
 * shows; when it is not mounted the group says so instead of offering a switch.
 */
function ComputerUseSettings(): React.ReactElement {
  const [view, setView] = React.useState<ComputerUseView | null | undefined>(undefined)
  const [busy, setBusy] = React.useState('')
  const [status, setStatus] = React.useState('')
  const load = React.useCallback(() => {
    getJson<{ sources: { id: string; view: ComputerUseView }[] }>('/sources')
      .then(data => setView(data.sources.find(s => s.id === 'computer-use')?.view ?? null))
      .catch(() => setView(null))
  }, [])
  React.useEffect(() => { load() }, [load])
  const act = async (action: string, value?: boolean): Promise<void> => {
    setBusy(action); setStatus('')
    try {
      const res = await postJson<{ message?: string }>(`/sources/computer-use/${action}`, value === undefined ? {} : { value })
      if (res.message) setStatus(res.message)
      load()
    } catch (err) { setStatus((err as Error).message) }
    finally { setBusy('') }
  }
  const stat = (label: string): string => view?.stats?.find(s => s.label === label)?.value ?? '—'
  const screenshots = view?.actions?.find(a => a.id === 'screenshots')?.value ?? true
  return (
    <div className="settings-group">
      <h3 className="section">Computer Use</h3>
      <div className="settings-rows">
        {view === undefined ? <p className="empty">Loading…</p>
          : view === null ? <p className="empty">Not available: the Computer Use plugin is not mounted in this dsh.</p>
          : (
            <>
              <label className="setting"><span><b>Let her use your apps</b><small>{view.summary}</small></span><input type="checkbox" className="switch" checked={view.shared} disabled={busy !== ''} onChange={e => { void act('enabled', e.target.checked) }} /></label>
              <label className="setting"><span><b>Attach screenshots</b><small>Off sends only the accessibility tree of the window.</small></span><input type="checkbox" className="switch" checked={screenshots} disabled={busy !== '' || !view.shared} onChange={e => { void act('screenshots', e.target.checked) }} /></label>
              <div className="setting"><span><b>Permissions</b><small>Accessibility: {stat('Accessibility')} · Screen Recording: {stat('Screen Recording')}. Granted to the app Aibo was launched from.</small></span>
                <span className="control">
                  <button type="button" className="button" disabled={busy !== ''} onClick={() => { void act('request') }}>Request</button>
                  <button type="button" className="button" disabled={busy !== ''} onClick={() => { void act('refresh') }}>Check</button>
                </span>
              </div>
              <div className="setting"><span><b>Approvals</b><small>She asks before the first action in each app. Apps allowed without asking: {stat('Always allowed')}; manage them under Connectors › Computer Use.</small></span></div>
              {status && <p className="empty">{status}</p>}
            </>
          )}
      </div>
    </div>
  )
}

/** One voice per language. The segmented control picks which language's voice is being edited. */
function SpeechForm({ speechLang, speechPref, setSpeechPref, stopVoice }: { speechLang: Lang; speechPref: 'auto' | Lang; setSpeechPref: (pref: 'auto' | Lang) => void; stopVoice: () => void }): React.ReactElement {
  const [config, setConfig] = React.useState<SpeechConfig | null>(null)
  // The language being edited follows the one replies are read in, so the
  // voice on screen is the voice that will be heard.
  const [language, setLanguage] = React.useState<Lang>(speechLang)
  React.useEffect(() => setLanguage(speechLang), [speechLang])
  const [provider, setProvider] = React.useState('')
  const [model, setModel] = React.useState('')
  const [voice, setVoice] = React.useState('')
  const [apiKey, setApiKey] = React.useState('')
  const [clearKey, setClearKey] = React.useState(false)
  const [voices, setVoices] = React.useState<Voice[] | null>(null)
  const [voicesError, setVoicesError] = React.useState('')
  const [status, setStatus] = React.useState('')
  const audio = React.useRef<HTMLAudioElement | null>(null)
  const request = React.useRef<AbortController | null>(null)

  const current = config?.catalog.find(p => p.id === provider)
  const browsable = provider === 'local' || provider === 'voicevox' || provider === 'fish'
  const available = config?.catalog.filter(p => p.languages.includes(language)) ?? []

  React.useEffect(() => {
    getJson<SpeechConfig>('/voice/config').then(setConfig).catch(() => setStatus(errorText('config_error')))
  }, [])
  React.useEffect(() => {
    if (!config) return
    const profile = config.profiles[language]
    // Fill the form from the stored profile; the status line is left alone so
    // "Saved" survives the refresh that follows a save.
    setProvider(profile.provider); setModel(profile.model); setVoice(profile.voice); setApiKey(''); setClearKey(false)
  }, [config, language])
  React.useEffect(() => { setStatus('') }, [language])
  const changeProvider = (id: string): void => {
    const p = config?.catalog.find(item => item.id === id)
    if (!p) return
    setProvider(id); setModel(p.models[0]); setVoice(p.voices[language] ?? ''); setApiKey(''); setClearKey(false); setStatus('')
  }
  React.useEffect(() => {
    if (!browsable) { setVoices(null); setVoicesError(''); return }
    const controller = new AbortController()
    setVoices(null); setVoicesError('')
    fetch(withToken(`/voice/voices?provider=${encodeURIComponent(provider)}&language=${language}`), { signal: controller.signal })
      .then(async res => { if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? 'network_error'); return res.json() as Promise<{ voices: Voice[] }> })
      .then(data => { setVoices(data.voices); setVoice(v => data.voices.some(item => item.id === v) ? v : (data.voices[0]?.id ?? '')) })
      .catch(err => { if (!controller.signal.aborted) { setVoices([]); setVoicesError(errorText((err as Error).message)) } })
    return () => controller.abort()
  }, [provider, language, browsable])

  const payload = (): Record<string, unknown> => ({ language, profile: { provider, model, voice: voice.trim() }, apiKey: apiKey.trim(), clearKey })
  const stop = (): void => { request.current?.abort(); request.current = null; audio.current?.pause(); audio.current = null }
  const save = async (): Promise<void> => {
    stop(); stopVoice(); setStatus('Saving…')
    try { setConfig(await postJson<SpeechConfig>('/voice/config', payload())); setStatus('Saved') }
    catch (err) { setStatus(errorText((err as Error).message)) }
  }
  const test = async (): Promise<void> => {
    stop(); stopVoice()
    if (clearKey && apiKey.trim() === '' && current?.key) { setStatus(errorText('key_required')); return }
    request.current = new AbortController(); setStatus('Generating preview…')
    try {
      const res = await fetch(withToken('/voice/read'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...payload(), text: SAMPLE[language] }), signal: request.current.signal })
      if (!res.ok) throw new Error(((await res.json()) as { error?: string }).error ?? 'speech_error')
      const url = URL.createObjectURL(await res.blob())
      const player = new Audio(url); audio.current = player
      player.onended = () => { URL.revokeObjectURL(url); setStatus('Preview finished') }
      player.onerror = () => setStatus(errorText('speech_error'))
      await player.play(); setStatus('Playing preview…')
    } catch (err) { if (!(err instanceof DOMException && err.name === 'AbortError')) setStatus(errorText((err as Error).message)) }
  }
  React.useEffect(() => stop, [])

  if (!config) return <div className="settings-group"><h3 className="section">Speech provider</h3><p className="empty">{status || 'Loading…'}</p></div>
  const readyVoice = browsable ? Boolean(voices?.some(item => item.id === voice)) : voice.trim() !== ''
  const providerHint = provider === 'local' ? 'Uses installed Mac system voices. No key and no dialogue upload.'
    : provider === 'voicevox' ? 'Free local Japanese model. Start VOICEVOX on port 50021.'
    : 'Uses your own account. Preview and dialogue text go to this provider and may incur charges.'
  return (
    <form className="settings-group" onSubmit={e => { e.preventDefault(); void save() }}>
      <h3 className="section">Speech provider</h3>
      <div className="settings-rows">
        <div className="setting"><span><b>Voice for</b><small>Each language has its own provider and voice.
          {language === speechLang
            ? <> Replies are read in {LANG_NAME[speechLang]}{speechPref === 'auto' ? ' (following the browser)' : ''}.</>
            : <> Replies are read in {LANG_NAME[speechLang]}, not {LANG_NAME[language]}. <button type="button" className="text-button inline" onClick={() => setSpeechPref(language)}>Read replies in {LANG_NAME[language]}</button></>}
        </small></span>
          <span className="seg" role="tablist">{(['zh', 'en', 'ja'] as Lang[]).map(l => <button key={l} type="button" role="tab" aria-selected={language === l} className={language === l ? 'active' : ''} onClick={() => setLanguage(l)}>{LANG_NAME[l]}</button>)}</span>
        </div>
        <label className="setting"><span><b>Provider</b><small>{providerHint}{current?.docs ? <> <a href={current.docs} target="_blank" rel="noopener noreferrer">Documentation</a></> : null}</small></span>
          <span className="control"><select className="input" value={provider} onChange={e => changeProvider(e.target.value)}>{available.map(p => <option key={p.id} value={p.id}>{p.id === 'local' ? 'Local system voice · free' : p.name}</option>)}</select></span>
        </label>
        {(current?.models.length ?? 0) > 1 && (
          <label className="setting"><span><b>Model</b></span>
            <span className="control"><select className="input" value={model} onChange={e => setModel(e.target.value)}>{(current?.models ?? []).map(id => <option key={id} value={id}>{id}</option>)}</select></span>
          </label>
        )}
        <label className="setting"><span><b>Voice</b>{(voicesError || (browsable && voices?.length === 0)) && <small className="composer-error">{voicesError || 'No voices for this language.'}</small>}</span>
          <span className="control">
            {browsable
              ? <select className="input" value={voice} disabled={voices === null || voices.length === 0} onChange={e => setVoice(e.target.value)}>
                  {voices === null && <option value="">Loading voices…</option>}
                  {voices?.map(item => <option key={item.id} value={item.id}>{provider === 'local' ? `${item.name.replace(/\s+\(.*\)$/, '')} · ${item.locale}` : item.name}</option>)}
                </select>
              : <input className="input" value={voice} maxLength={160} spellCheck={false} onChange={e => setVoice(e.target.value)} placeholder="Voice ID from the provider" />}
          </span>
        </label>
        {current?.key && (
          <label className="setting"><span><b>API key</b><small>Kept in a local config file, outside character exports.{config.hasKeys[provider] && !clearKey ? ' A key is saved; leave blank to keep it.' : ''}</small></span>
            <span className="control">
              {config.hasKeys[provider] && <button type="button" className={`text-button${clearKey ? ' danger' : ''}`} onClick={() => { setClearKey(v => !v); setApiKey('') }}>{clearKey ? 'Will delete · undo' : 'Delete saved key'}</button>}
              <input className="input" type="password" autoComplete="new-password" value={apiKey} disabled={clearKey} onChange={e => setApiKey(e.target.value)} placeholder={clearKey ? 'Key will be deleted on save' : config.hasKeys[provider] ? '••••••••' : 'Enter your API key'} />
            </span>
          </label>
        )}
        <div className="setting-foot">
          <span className="field-hint" role="status">{status}</span>
          <span className="row">
            <button type="button" className="button" disabled={!readyVoice} onClick={() => { void test() }}>Preview</button>
            <button type="submit" className="button primary" disabled={!readyVoice}>Save</button>
          </span>
        </div>
      </div>
    </form>
  )
}
