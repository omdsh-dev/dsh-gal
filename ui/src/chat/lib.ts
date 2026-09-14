/* Shared types, transport and labels for the chat layout. */

export const token = new URLSearchParams(location.search).get('token') ?? ''
export const withToken = (path: string): string => token ? `${path}${path.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}` : path

export async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(withToken(path), init)
  if (!res.ok) throw new Error((await res.text()) || `${res.status}`)
  return res.json() as Promise<T>
}
export const postJson = <T>(path: string, body: unknown): Promise<T> =>
  getJson<T>(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })

export type Lang = 'zh' | 'en' | 'ja'
export type StateAsset = { video?: string; image?: string; from: string }
export type Manifest = {
  characterId: string
  characterName: string
  greeting: string | Partial<Record<Lang, string>>
  playbackRate?: number
  promptOnly?: boolean
  states: Record<string, StateAsset>
  characters: { id: string; name: string; promptOnly: boolean }[]
}
export type CharacterConfig = {
  id: string; dir: string; name: string
  greeting: string | Partial<Record<Lang, string>>
  persona: string; playbackRate: number; voiceSpeaker?: number
  art?: { base?: string; expressions?: Record<string, string>; motion?: string }
  promptOnly: boolean; bundled: boolean; userDir: string
  assets: { state: string; video?: string; image?: string; fallback?: string }[]
}
export type Artifact = { id: string; path: string; name: string; kind: 'markdown' | 'text' | 'image' | 'other'; description?: string; exists?: boolean; size?: number; at: string; source?: string }
export type MemoryEntry = { date: string; text: string }
export type ListItem = { id: string; text: string; done: boolean; note?: string; addedAt: string; doneAt?: string }
export type List = { id: string; title: string; description?: string; items: ListItem[]; createdAt: string; updatedAt: string }

export type Step = { activity: string; text: string; command?: string; failed?: boolean }
export type Item =
  | { kind: 'msg'; key: string; role: 'user' | 'assistant'; text: string; streaming?: boolean; at: number }
  | { kind: 'steps'; key: string; steps: Step[]; live: boolean }
  | { kind: 'artifact'; key: string; artifact: Artifact }
  | { kind: 'list'; key: string; list: List }
  | { kind: 'notice'; key: string; text: string }

let keyCounter = 0
export const nextKey = (): string => `k${++keyCounter}`

export const ACTIVITIES = ['idle', 'reading', 'writing', 'searching', 'running', 'waiting', 'failed', 'done'] as const
export const ACTIVITY_LABEL: Record<string, string> = {
  idle: 'Idle', reading: 'Reading', writing: 'Writing', searching: 'Searching', running: 'Running a command',
  waiting: 'Waiting for you', failed: 'Something went wrong', done: 'Done', speaking: 'Speaking',
}

export function browserLanguage(): Lang {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.toLowerCase().split(/[-_]/)[0]
    if (base === 'zh' || base === 'en' || base === 'ja') return base
  }
  return 'en'
}

/** The greeting for the current language when a pack keeps one per language. */
export function greetingText(value: Manifest['greeting'] | undefined, lang: Lang): string {
  if (value && typeof value === 'object') return value[lang] ?? value.en ?? Object.values(value)[0] ?? ''
  return typeof value === 'string' ? value : ''
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export function kindLabel(item: Artifact): string {
  if (item.kind === 'markdown') return 'Markdown'
  if (item.kind === 'text') return 'Text'
  if (item.kind === 'image') return 'Image'
  const ext = item.name.includes('.') ? item.name.split('.').pop() ?? '' : ''
  return ext !== '' && ext.length <= 5 ? ext.toUpperCase() : 'File'
}

export function whenLabel(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleString(undefined, { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
