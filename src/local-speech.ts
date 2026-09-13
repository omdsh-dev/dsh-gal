import { promisify } from 'node:util'
import { execFile, spawn } from 'node:child_process'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
const cache = new Map<string, Buffer>()
function run(file: string, args: string[], text: string | undefined, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted()
    const child = spawn(file, args, { stdio: ['pipe', 'ignore', 'ignore'] })
    const abort = () => child.kill()
    signal.addEventListener('abort', abort, { once: true })
    child.on('error', reject)
    child.on('close', code => {
      signal.removeEventListener('abort', abort)
      if (signal.aborted) reject(signal.reason)
      else if (code === 0) resolve()
      else reject(new Error('local_unavailable'))
    })
    child.stdin.on('error', () => {})
    child.stdin.end(text)
  })
}
export async function localSpeech(text: string, voice: string, signal: AbortSignal): Promise<Buffer> {
  signal.throwIfAborted()
  if (process.platform !== 'darwin') throw new Error('local_unavailable')
  const key = JSON.stringify([voice, text])
  if (cache.has(key)) return cache.get(key)!
  const dir = await mkdtemp(join(tmpdir(), 'dsh-gal-speech-'))
  try {
    const aiff = join(dir, 'voice.aiff'), wav = join(dir, 'voice.wav')
    await run('/usr/bin/say', ['-v', voice, '-o', aiff], text, signal)
    await run('/usr/bin/afconvert', ['-f', 'WAVE', '-d', 'LEI16@22050', aiff, wav], undefined, signal)
    signal.throwIfAborted()
    const data = await readFile(wav)
    cache.set(key, data)
    while (cache.size > 12) cache.delete(cache.keys().next().value!)
    return data
  } finally { await rm(dir, { recursive: true, force: true }) }
}

export type LocalVoice = { id: string; name: string; locale: string }
export function parseLocalVoices(output: string): LocalVoice[] {
  return output.split('\n').flatMap(line => {
    const match = line.match(/^(.+?)\s+([a-z]{2,3}_[A-Z]{2})\s+#/)
    return match ? [{ id:match[1].trim(), name:match[1].trim(), locale:match[2] }] : []
  })
}
let voiceCache: { until:number; voices:LocalVoice[] } | undefined
export async function localVoices(): Promise<LocalVoice[]> {
  if (process.platform !== 'darwin') throw new Error('local_unavailable')
  if (voiceCache && voiceCache.until > Date.now()) return voiceCache.voices
  try {
    const { stdout } = await promisify(execFile)('/usr/bin/say', ['-v','?'], { timeout:5000, maxBuffer:1024*1024 })
    const voices = parseLocalVoices(stdout)
    if (!voices.length) throw new Error('local_unavailable')
    voiceCache = { until:Date.now()+30000, voices }
    return voices
  } catch { throw new Error('local_unavailable') }
}
