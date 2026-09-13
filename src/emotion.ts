/**
 * Emotion judge: decides which expression the whale girl shows for a given
 * assistant reply. Primary path is a tiny LLM classification call supplied by
 * the host plugin; a keyword heuristic covers the fallback (LLM unavailable,
 * timeout, or an answer outside the emotion set).
 */

export const EMOTIONS = ['neutral', 'happy', 'thinking', 'surprised', 'sad', 'excited'] as const
export type Emotion = typeof EMOTIONS[number]

export function isEmotion(value: unknown): value is Emotion {
  return typeof value === 'string' && (EMOTIONS as readonly string[]).includes(value)
}

/** Prompt for the classifier call; answers with exactly one label. */
export function classifierPrompt(reply: string): string {
  // Long replies carry their tone in the opening and closing; clip the middle.
  const clipped = reply.length <= 1200 ? reply : `${reply.slice(0, 700)}\n…\n${reply.slice(-400)}`
  return [
    'Pick the expression an anime character should wear while SPEAKING the following assistant reply.',
    `Answer with exactly one word from: ${EMOTIONS.join(', ')}. Do not think at length — pick the obvious label and answer immediately.`,
    'Guidelines: happy = warm, pleased, reassuring, a recommendation she stands behind, something that worked; excited = enthusiastic, a real win, strong emphasis; sad = apology, failure, bad news, sympathy; surprised = unexpected finding, something caught, a caution or a correction; thinking = weighing options, analysis, plans, uncertainty, a question back to the user.',
    // A face that never changes is the failure mode here: a person talking
    // carries something almost all the time, and the six clips exist to be used.
    'neutral is the exception, not the default: use it only when the line is genuinely flat — a bare fact, a one-word confirmation, a mechanical status report with no attitude in it. If the reply offers advice, reassures, cautions, weighs something up, or asks the user a question, one of the other five fits better. When two fit, take the stronger one.',
    '',
    '--- reply ---',
    clipped,
  ].join('\n')
}

const HEURISTICS: ReadonlyArray<{ emotion: Emotion; pattern: RegExp }> = [
  { emotion: 'sad', pattern: /\b(sorry|apolog|unfortunately|failed|cannot|can't|unable|error(s)? occurred)\b|抱歉|对不起|遗憾|失败/i },
  { emotion: 'excited', pattern: /(!{2,})|[🎉🎊✨🚀]|\b(awesome|amazing|fantastic|great news|congrat|milestone|perfect|excellent)\b|太棒|厉害|完美|恭喜/iu },
  { emotion: 'surprised', pattern: /\b(surprising|unexpected|interesting(ly)?|turns out|actually|wow)\b|竟然|居然|没想到|意外/i },
  { emotion: 'happy', pattern: /\b(done|completed|success|works|fixed|passed|ready)\b|完成|成功|搞定|好了/i },
  { emotion: 'thinking', pattern: /\b(let me|consider|analy|plan|maybe|perhaps|could|option|approach)\b|考虑|分析|思考|方案|或许/i },
]

/** Zero-cost fallback classifier. */
export function heuristicEmotion(reply: string): Emotion {
  for (const { emotion, pattern } of HEURISTICS) {
    if (pattern.test(reply)) return emotion
  }
  return 'neutral'
}

/**
 * Run the supplied LLM classifier with a deadline; fall back to keywords.
 * `classify` resolves to the model's raw text answer.
 */
export async function judgeEmotion(
  reply: string,
  classify: ((prompt: string) => Promise<string>) | undefined,
  timeoutMs: number,
): Promise<Emotion> {
  if (classify !== undefined) {
    try {
      const raw = await withTimeout(classify(classifierPrompt(reply)), timeoutMs)
      const answer = raw.trim().toLowerCase().replace(/[^a-z]/g, '')
      if (isEmotion(answer)) return answer
      // tolerate answers like "the emotion is: happy"
      const found = EMOTIONS.find(emotion => answer.includes(emotion))
      if (found !== undefined) return found
    } catch { /* fall back below */ }
  }
  return heuristicEmotion(reply)
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`emotion judge timed out after ${ms}ms`)), ms)
    promise.then(
      value => { clearTimeout(timer); resolve(value) },
      (error: unknown) => { clearTimeout(timer); reject(error instanceof Error ? error : new Error(String(error))) },
    )
  })
}
