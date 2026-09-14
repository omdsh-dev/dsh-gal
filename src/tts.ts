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
    // Parentheses carry stage directions — （放下托盘）— which are read, not spoken.
    .replace(/（[^（）]*）/g, ' ')
    .replace(/\([^()]*\)/g, ' ')
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
  return detectLanguage(text) === 'ja'
}

export type SpokenLanguage = 'zh' | 'en' | 'ja'

const LANGUAGE_NAMES: Record<SpokenLanguage, string> = { zh: 'Chinese', en: 'English', ja: 'Japanese' }

/**
 * Which language a line reads as. A Japanese sentence is mostly kana with some
 * kanji; a Chinese sentence is Han characters throughout, and a Japanese title
 * quoted inside it ("NHKオンデマンド") must not flip the verdict — that once
 * sent a whole Chinese reply to the Japanese voice undubbed. So the call is by
 * share: kana against all CJK characters. Anything without CJK is English.
 */
export function detectLanguage(text: string): SpokenLanguage {
  const kana = (text.match(/[぀-ヿ]/g) ?? []).length
  const han = (text.match(/[\u4e00-\u9fff]/g) ?? []).length
  if (kana + han === 0) return 'en'
  if (kana === 0) return 'zh'
  // Real Japanese prose runs well above 30% kana; a Chinese line with a quoted
  // Japanese name stays far below it.
  return kana / (kana + han) >= 0.3 ? 'ja' : 'zh'
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
