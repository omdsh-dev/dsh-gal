/*
 * What she is doing, as the stage shows it.
 *
 * The stage used to show a mood picked by a side LLM call reading each reply.
 * That cost a call per message and, worse, said nothing during the part of a
 * turn the user actually watches: the wait. The harness already knows what the
 * agent is doing — reading, writing, running a command, searching, blocked on
 * an approval — so the stage shows that instead, for free and deterministically.
 *
 * Only one row can show at a time. Priority, highest first (the frontend
 * state machine in `web/character-state.js` mirrors it):
 *   preview → failed (beat) → waiting → the running tool's activity →
 *   reading (turn in flight, nothing else known) → done (turn just finished)
 *   → idle.
 */

export const ACTIVITIES = ['idle', 'reading', 'writing', 'searching', 'running', 'waiting', 'failed', 'done'] as const
export type Activity = typeof ACTIVITIES[number]

export function isActivity(value: unknown): value is Activity {
  return typeof value === 'string' && (ACTIVITIES as readonly string[]).includes(value)
}

/**
 * Which asset a pack shows for each activity: the first name the pack has
 * wins. Names from the expression era (`neutral`, `thinking`, `surprised`,
 * `happy`, …) stay accepted so every existing pack keeps working, and a pack
 * that only has the old six still covers every activity — she looks thoughtful
 * while working, surprised when a tool fails, pleased when the turn is done.
 */
export const ASSET_FALLBACKS: Record<Activity, readonly string[]> = {
  idle: ['idle', 'neutral'],
  reading: ['reading', 'thinking', 'idle', 'neutral'],
  writing: ['writing', 'reading', 'thinking', 'idle', 'neutral'],
  searching: ['searching', 'reading', 'thinking', 'idle', 'neutral'],
  running: ['running', 'writing', 'reading', 'thinking', 'idle', 'neutral'],
  waiting: ['waiting', 'idle', 'neutral'],
  failed: ['failed', 'surprised', 'sad', 'idle', 'neutral'],
  done: ['done', 'happy', 'excited', 'idle', 'neutral'],
}

/** Every asset base name a pack may ship, canonical first. */
export const ASSET_NAMES: readonly string[] = [...new Set(Object.values(ASSET_FALLBACKS).flat())]

/**
 * What a tool call means she is doing. The editor is dsh's own; the loose
 * matches cover plugins that name their tools freely. Anything unknown is
 * "reading": she is looking at something, which is never wrong for long.
 */
export function activityForTool(name: string, command?: string): Activity {
  if (name === 'str_replace_editor') return command === 'view' ? 'reading' : 'writing'
  if (name === 'present' || name === 'gal_remember') return 'writing'
  if (/bash|shell|exec|terminal|python|node\b|command/i.test(name)) return 'running'
  if (/web|search|fetch|browse|http|url/i.test(name)) return 'searching'
  if (/write|create|edit|save|append|patch/i.test(name)) return 'writing'
  return 'reading'
}
