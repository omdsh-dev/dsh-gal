/*
 * UI preferences that belong to the user, not to a browser: whether replies
 * are read aloud and in which language. Kept in the shared store so every
 * browser and the desktop shell agree. Theme stays in the browser: it is a
 * per-screen choice.
 */
import { dirname, join } from 'node:path'
import { userCharactersDir } from './characters.js'
import { migrateFile, openStore } from './store.js'

export interface UiPrefs { voice: boolean; speechLanguage: 'auto' | 'zh' | 'en' | 'ja' }
const DEFAULTS: UiPrefs = { voice: true, speechLanguage: 'auto' }

/** `~/.dsh/aibo/settings.json`, the pre-store file (imported once, then renamed). */
export function prefsPath(): string {
  return process.env['AIBO_SETTINGS'] ?? join(dirname(userCharactersDir()), 'settings.json')
}

function normalize(input: Partial<UiPrefs>): UiPrefs {
  const lang = input.speechLanguage
  return {
    voice: typeof input.voice === 'boolean' ? input.voice : DEFAULTS.voice,
    speechLanguage: lang === 'zh' || lang === 'en' || lang === 'ja' || lang === 'auto' ? lang : DEFAULTS.speechLanguage,
  }
}

const doc = () => openStore().doc<UiPrefs>('settings', 'ui')
let imported = false

export function readPrefs(): UiPrefs {
  if (!imported) { imported = true; migrateFile(prefsPath(), text => { if (doc().get() === undefined) doc().set(normalize(JSON.parse(text) as Partial<UiPrefs>)) }) }
  return normalize(doc().get() ?? {})
}

export function writePrefs(patch: Partial<UiPrefs>): UiPrefs {
  const next = normalize({ ...readPrefs(), ...patch })
  doc().set(next)
  return next
}
