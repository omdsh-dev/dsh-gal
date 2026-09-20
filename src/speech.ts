/** Shared BYOK speech service for the plugin and local preview. Never exposes credentials. */
import { mkdir, readFile, writeFile, rename, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { randomUUID } from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { localSpeech, localVoices } from './local-speech.js'
import { speakableText, type SpokenLanguage } from './tts.js'
type Language = 'zh' | 'en' | 'ja'
type Profile = { provider: string; model: string; voice: string }
type State = { profiles: Record<Language, Profile>; keys: Record<string, string> }
export const catalog = [
  { id: 'local', name: 'Local', models: ['system'], key: false, languages: ['zh','en','ja'], voices: { zh:'Tingting', en:'Samantha', ja:'Kyoko' }, docs: '' },
  { id: 'voicevox', name: 'VOICEVOX', models: ['voicevox'], key: false, languages: ['ja'], voices: { ja:'3' }, docs:'https://voicevox.hiroshiba.jp/' },
  { id: 'elevenlabs', name: 'ElevenLabs', models: ['eleven_multilingual_v2','eleven_v3','eleven_flash_v2_5'], key: true, languages: ['zh','en','ja'], voices: {}, docs:'https://elevenlabs.io/docs/api-reference/text-to-speech/convert' },
  { id: 'fish', name: 'Fish Audio', models: ['s2.1-pro-free','s2-pro','s2.1-pro','s1'], key: true, languages: ['zh','en','ja'], voices: { zh:'7f92f8afb8ec43bf81429cc1c9199cb1', en:'7f92f8afb8ec43bf81429cc1c9199cb1', ja:'7f92f8afb8ec43bf81429cc1c9199cb1' }, docs:'https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech' },
  { id: 'minimax-cn', name: 'MiniMax · 中国', models: ['speech-2.8-hd','speech-2.8-turbo','speech-2.6-hd'], key: true, languages: ['zh','en','ja'], voices: { zh:'female-shaonv', en:'English_captivating_female1', ja:'Japanese_DependableWoman' }, docs:'https://platform.minimaxi.com/docs/faq/system-voice-id' },
  { id: 'minimax', name: 'MiniMax · Global', models: ['speech-2.8-hd','speech-2.8-turbo','speech-2.6-hd'], key: true, languages: ['zh','en','ja'], voices: { zh:'female-shaonv', en:'English_captivating_female1', ja:'Japanese_DependableWoman' }, docs:'https://platform.minimax.io/docs/faq/system-voice-id' },
]
const defaults = (): State => ({ profiles: Object.fromEntries(['zh','en','ja'].map(language => [language, { provider:'local', model:'system', voice: catalog[0].voices[language as Language] }])) as State['profiles'], keys: {} })
export class SpeechService {
  private queue: Promise<unknown> = Promise.resolve()
  constructor(private file = join(homedir(), '.config', 'aibo', 'speech.json'), private fetcher: typeof fetch = fetch) {}
  private async state(): Promise<State> {
    try { return JSON.parse(await readFile(this.file, 'utf8')) as State }
    catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return defaults(); throw new Error('config_error') }
  }
  async publicConfig() {
    const state = await this.state()
    return { profiles: state.profiles, catalog, hasKeys: Object.fromEntries(catalog.map(p => [p.id, Boolean(state.keys[p.id])])) }
  }
  private profile(language: unknown, value: unknown): Profile {
    if (!['zh','en','ja'].includes(String(language)) || !value || typeof value !== 'object') throw new Error('invalid_settings')
    const p = value as Profile, provider = catalog.find(v => v.id === p.provider)
    if (!provider || !provider.languages.includes(String(language)) || !provider.models.includes(p.model)) throw new Error('invalid_settings')
    if (typeof p.voice !== 'string' || !p.voice.trim() || p.voice.length > 160 || /[\r\n]/.test(p.voice)) throw new Error('voice_required')
    if (p.provider === 'local' && p.voice.startsWith('-')) throw new Error('invalid_settings')
    if (p.provider === 'voicevox' && !/^\d{1,5}$/.test(p.voice)) throw new Error('invalid_settings')
    return { provider:p.provider, model:p.model, voice:p.voice.trim() }
  }
  async voices(provider: string, language: string, signal: AbortSignal) {
    if (!['zh','en','ja'].includes(language)) throw new Error('invalid_settings')
    if (provider === 'local') return (await localVoices()).filter(v => v.locale.startsWith(language+'_'))
    // Fish voices are community models addressed by id. Nobody remembers those,
    // so the popular ones for this language are offered as a list.
    if (provider === 'fish') {
      const key = (await this.state()).keys['fish']
      if (key === undefined || key === '') throw new Error('key_required')
      try {
        const response = await this.fetcher(`https://api.fish.audio/model?page_size=40&page_number=1&language=${language}&sort_by=task_count`, {
          headers: { Authorization: `Bearer ${key}` },
          signal: AbortSignal.any([signal, AbortSignal.timeout(8000)]),
          redirect: 'error',
        })
        if (response.status === 401 || response.status === 403) throw new Error('auth_error')
        if (!response.ok) throw new Error('network_error')
        const body = await response.json() as { items?: { _id?: string; title?: string; tags?: string[] }[] }
        const locale = { zh: 'zh_CN', en: 'en_US', ja: 'ja_JP' }[language] ?? 'zh_CN'
        return (body.items ?? [])
          .filter(item => typeof item._id === 'string' && typeof item.title === 'string')
          .map(item => ({ id: item._id as string, name: `${item.title as string}${(item.tags ?? []).length > 0 ? ` · ${(item.tags ?? []).slice(0, 3).join(', ')}` : ''}`, locale }))
      } catch (error) {
        signal.throwIfAborted()
        throw new Error(error instanceof Error && error.message === 'auth_error' ? 'auth_error' : 'network_error')
      }
    }
    if (provider !== 'voicevox' || language !== 'ja') throw new Error('invalid_settings')
    try {
      const response = await this.fetcher('http://127.0.0.1:50021/speakers', { signal:AbortSignal.any([signal,AbortSignal.timeout(5000)]), redirect:'error' })
      if (!response.ok) throw new Error('network_error')
      const speakers = await response.json() as {name:string;styles:{id:number;name:string;type?:string}[]}[]
      return speakers.flatMap(speaker => speaker.styles.filter(style => Number.isInteger(style.id) && style.id >= 0 && (!style.type || style.type === 'talk')).map(style => ({id:String(style.id),name:`${speaker.name} · ${style.name}`,locale:'ja_JP'})))
    } catch { signal.throwIfAborted(); throw new Error('network_error') }
  }
  private async validateLocalVoice(profile: Profile, language: string) {
    if (profile.provider === 'local' && !(await localVoices()).some(v=>v.id===profile.voice && v.locale.startsWith(language+'_'))) throw new Error('invalid_settings')
  }
  async save(body: Record<string, unknown>) {
    const operation = this.queue.catch(() => {}).then(async () => {
      const profile = this.profile(body.language, body.profile), state = await this.state()
      await this.validateLocalVoice(profile,String(body.language))
      if (body.clearKey === true) delete state.keys[profile.provider]
      if (typeof body.apiKey === 'string' && body.apiKey.trim()) {
        if (body.apiKey.length > 4096 || /[\r\n]/.test(body.apiKey)) throw new Error('invalid_key')
        state.keys[profile.provider] = body.apiKey.trim()
      }
      state.profiles[body.language as Language] = profile
      await mkdir(dirname(this.file), { recursive:true, mode:0o700 })
      const temp = `${this.file}.${randomUUID()}.tmp`
      try { await writeFile(temp, JSON.stringify(state), { mode:0o600 }); await rename(temp, this.file) }
      finally { await rm(temp, { force:true }) }
      return this.publicConfig()
    })
    this.queue = operation
    return operation
  }
  /**
   * Rewrites a dialogue line into the voice's own language. Set by the plugin;
   * previews and unset hosts synthesize the text as written.
   */
  dub?: (text: string, language: SpokenLanguage) => Promise<string>

  /**
   * A line of speech. Providers that stream give back their body untouched so
   * playback can start on the first chunk: Fish answers in ~0.5s but takes ~5s
   * to finish a long line, and waiting for the last byte was most of the delay
   * before she said anything.
   */
  async synthesize(body: Record<string, unknown>, signal: AbortSignal): Promise<{data?:Buffer;stream?:ReadableStream<Uint8Array>;type:string}> {
    if (typeof body.text !== 'string' || body.text.length > 6000) throw new Error('invalid_text')
    let text = speakableText(body.text, 6000)
    if (!text) throw new Error('invalid_text')
    const state = await this.state(), language = body.language as Language
    // A dub is an improvement, never a precondition: if it fails, she still speaks.
    if (body.dub === true && this.dub !== undefined) {
      try { text = speakableText(await this.dub(text, language as SpokenLanguage), 6000) || text } catch { /* keep the line as written */ }
    }
    const p = this.profile(language, body.profile ?? state.profiles[language])
    const timeout = AbortSignal.any([signal, AbortSignal.timeout(60000)])
    if (p.provider === 'local') { await this.validateLocalVoice(p,language);return { data:await localSpeech(text,p.voice,timeout), type:'audio/wav' } }
    const provider = catalog.find(v => v.id === p.provider)!
    const key = typeof body.apiKey === 'string' && body.apiKey.trim() ? body.apiKey.trim() : state.keys[p.provider]
    if (provider.key && !key) throw new Error('key_required')
    const post = async (url: string, payload: unknown, headers: Record<string,string> = {}) => {
      let response: Response
      try { response = await this.fetcher(url, { method:'POST', headers:{'content-type':'application/json',...headers}, body:JSON.stringify(payload), signal:timeout, redirect:'error' }) }
      catch { timeout.throwIfAborted(); throw new Error('network_error') }
      if (!response.ok) {
        await response.body?.cancel()
        throw new Error(response.status === 401 || response.status === 403 ? 'auth_error' : response.status === 429 ? 'quota_error' : `provider_error:${response.status}`)
      }
      return response
    }
    if (p.provider === 'voicevox') {
      const query = await post(`http://127.0.0.1:50021/audio_query?speaker=${p.voice}&text=${encodeURIComponent(text)}`, undefined)
      const response = await post(`http://127.0.0.1:50021/synthesis?speaker=${p.voice}`, await query.json())
      return { data:Buffer.from(await response.arrayBuffer()), type:'audio/wav' }
    }
    let response: Response
    if (p.provider === 'elevenlabs') {
      response = await post(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(p.voice)}?output_format=mp3_44100_128`, {text,model_id:p.model,language_code:language}, {'xi-api-key':key})
    } else if (p.provider === 'fish') {
      response = await post('https://api.fish.audio/v1/tts', {text,reference_id:p.voice,format:'mp3'}, {Authorization:`Bearer ${key}`,model:p.model})
    } else {
      response = await post(`https://${p.provider === 'minimax-cn' ? 'api.minimaxi.com' : 'api.minimax.io'}/v1/t2a_v2`, {text,model:p.model,stream:false,output_format:'hex',language_boost:{zh:'Chinese',en:'English',ja:'Japanese'}[language],voice_setting:{voice_id:p.voice,speed:1,vol:1,pitch:0},audio_setting:{sample_rate:32000,bitrate:128000,format:'mp3',channel:1}}, {Authorization:`Bearer ${key}`})
      const result = await response.json() as {base_resp?:{status_code:number};data?:{audio:string}}
      if (result.base_resp?.status_code !== 0) throw new Error(`provider_error:${result.base_resp?.status_code ?? 'unknown'}`)
      const hex = result.data?.audio
      if (!hex || !/^(?:[a-f\d]{2})+$/i.test(hex)) throw new Error('invalid_audio')
      return { data:Buffer.from(hex,'hex'), type:'audio/mpeg' }
    }
    if (!(response.headers.get('content-type') || '').match(/audio|octet-stream/)) { await response.body?.cancel(); throw new Error('invalid_audio') }
    if (body.stream === true && response.body !== null) return { stream: response.body, type:'audio/mpeg' }
    const data = Buffer.from(await response.arrayBuffer())
    if (!data.length) throw new Error('invalid_audio')
    return {data,type:'audio/mpeg'}
  }
  async handle(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
    const pathname = new URL(req.url || '/', 'http://localhost').pathname
    if (!['/voice/config','/voice/read','/voice/voices'].includes(pathname)) return false
    const host = req.headers.host || ''
    if (!/^(127\.0\.0\.1|localhost):\d+$/.test(host) || (req.headers.origin && req.headers.origin !== `http://${host}`)) {
      res.writeHead(403); res.end(); return true
    }
    const controller = new AbortController()
    res.on('close', () => { if (!res.writableEnded) controller.abort() })
    res.setHeader('cache-control','no-store')
    try {
      if (pathname === '/voice/voices' && req.method === 'GET') {
        const query = new URL(req.url!, 'http://localhost').searchParams
        res.setHeader('content-type','application/json');res.end(JSON.stringify({voices:await this.voices(query.get('provider')||'',query.get('language')||'',controller.signal)}));return true
      }
      if (pathname === '/voice/config' && req.method === 'GET') {
        res.setHeader('content-type','application/json'); res.end(JSON.stringify(await this.publicConfig())); return true
      }
      if (req.method !== 'POST') { res.writeHead(405); res.end(); return true }
      if (!req.headers['content-type']?.startsWith('application/json')) { res.writeHead(415);res.end();return true }
      const chunks: Buffer[] = []; let size = 0
      for await (const chunk of req) { size += chunk.length; if (size > 40000) throw new Error('invalid_text'); chunks.push(chunk) }
      const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string,unknown>
      if (pathname === '/voice/config') { res.setHeader('content-type','application/json');res.end(JSON.stringify(await this.save(body))) }
      else {
        const audio = await this.synthesize(body,controller.signal)
        res.setHeader('content-type',audio.type)
        if (audio.stream === undefined) { res.end(audio.data); return true }
        // Headers are already out by the time a provider fails mid-line, so a
        // late failure can only end the response; the client treats a short
        // line as a playback error.
        const reader = audio.stream.getReader()
        try {
          for (;;) {
            const { done, value } = await reader.read()
            if (done) break
            if (!res.write(Buffer.from(value))) await new Promise<void>(resolve => res.once('drain', resolve))
          }
        } catch { /* provider or client went away */ }
        finally { await reader.cancel().catch(() => {}); res.end() }
      }
    } catch (error) {
      if (controller.signal.aborted) return true
      const message = error instanceof Error ? error.message : ''
      const code = /^(invalid_settings|invalid_key|voice_required|invalid_text|key_required|auth_error|quota_error|network_error|invalid_audio|local_unavailable|config_error|provider_error:[\w]+)$/.test(message) ? message : error instanceof Error && error.name === 'TimeoutError' ? 'timeout' : 'speech_error'
      res.writeHead(400,{'content-type':'application/json'});res.end(JSON.stringify({error:code}))
    }
    return true
  }
}
