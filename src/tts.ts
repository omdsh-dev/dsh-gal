/**
 * Text-to-speech for dialogue lines.
 *
 * Provider: VOICEVOX (free, local, Japanese). The engine is a plain HTTP
 * server (default http://127.0.0.1:50021); `audio_query` builds prosody,
 * `synthesis` renders a WAV. Everything here is provider-agnostic except
 * the two calls in `voicevoxSynthesize`.
 */

export interface VoicevoxSpeaker {
  name: string
  styles: { id: number; name: string }[]
}

/** Strip markdown/code/urls so the voice reads dialogue, not syntax. */
export function speakableText(text: string, maxChars = 360): string {
  let out = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/[*_~]{1,3}/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim()
  if (out.length > maxChars) {
    const cut = out.slice(0, maxChars)
    const stop = Math.max(cut.lastIndexOf('。'), cut.lastIndexOf('！'), cut.lastIndexOf('？'), cut.lastIndexOf('. '), cut.lastIndexOf('\n'))
    out = stop > maxChars / 2 ? cut.slice(0, stop + 1) : cut
  }
  return out
}

/** True when the text already reads as Japanese (kana present). */
export function looksJapanese(text: string): boolean {
  return /[぀-ヿ]/.test(text)
}

export type SpokenLanguage = 'zh' | 'en' | 'ja'

const LANGUAGE_NAMES: Record<SpokenLanguage, string> = { zh: 'Chinese', en: 'English', ja: 'Japanese' }

/**
 * Which language a line reads as. Kana means Japanese; Han characters without
 * kana mean Chinese; anything else is treated as English. Latin technical terms
 * inside a CJK line do not change the verdict.
 */
export function detectLanguage(text: string): SpokenLanguage {
  if (/[぀-ヿ]/.test(text)) return 'ja'
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh'
  return 'en'
}

/**
 * Prompt for the side LLM call that turns a reply into a spoken line in the
 * voice's own language. Handing a Japanese voice a Chinese line does not
 * produce Japanese — it produces kanji read one at a time.
 */
export function translationPrompt(text: string, characterName: string, persona: string, target: SpokenLanguage = 'ja'): string {
  const language = LANGUAGE_NAMES[target]
  return [
    `You are dubbing a visual novel. Rewrite the following line, spoken by the character "${characterName}", as natural spoken ${language} for a voice actor.`,
    persona === '' ? '' : `Character voice: ${persona.slice(0, 600)}`,
    `Rules: keep the meaning and the tone; use casual spoken register that fits the character; keep it concise (drop lists, file names and technical noise, summarise them in a phrase if needed); write everything in ${language}, numbers and technical terms may stay in ASCII; output ONLY the ${language} line, no quotes, no notes.`,
    '',
    'Line:',
    text,
  ].filter(part => part !== '').join('\n')
}

export async function voicevoxSpeakers(baseUrl: string, signal?: AbortSignal): Promise<VoicevoxSpeaker[]> {
  const res = await fetch(`${baseUrl}/speakers`, { signal: signal ?? AbortSignal.timeout(3000) })
  if (!res.ok) throw new Error(`voicevox /speakers ${res.status}`)
  const list = await res.json() as { name: string; styles: { id: number; name: string }[] }[]
  return list.map(s => ({ name: s.name, styles: s.styles.map(st => ({ id: st.id, name: st.name })) }))
}

export async function voicevoxSynthesize(baseUrl: string, text: string, speaker: number, timeoutMs = 20000): Promise<Buffer> {
  const signal = AbortSignal.timeout(timeoutMs)
  const q = await fetch(`${baseUrl}/audio_query?speaker=${speaker}&text=${encodeURIComponent(text)}`, { method: 'POST', signal })
  if (!q.ok) throw new Error(`voicevox audio_query ${q.status}: ${(await q.text()).slice(0, 200)}`)
  const query = await q.json() as Record<string, unknown>
  const s = await fetch(`${baseUrl}/synthesis?speaker=${speaker}`, {
    method: 'POST', signal, headers: { 'content-type': 'application/json' }, body: JSON.stringify(query),
  })
  if (!s.ok) throw new Error(`voicevox synthesis ${s.status}: ${(await s.text()).slice(0, 200)}`)
  return Buffer.from(await s.arrayBuffer())
}
