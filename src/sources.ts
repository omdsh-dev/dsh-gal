/*
 * Data sources: what other plugins let her see.
 *
 * dsh is plugins all the way down, so a data source (Apple Health, a
 * calendar, mail) is its own plugin: it owns the sync, the storage, the tool
 * and the prompt section, and works in any dsh session. When dsh-gal is also
 * loaded it registers itself here, and the Data panel shows it — from a
 * declarative view the source describes, so the UI never needs to know what a
 * "step" is. The service is `ctx.galSources`.
 */

export type SourceCategory = 'health' | 'calendar' | 'tasks' | 'mail' | 'notes' | 'finance' | 'location' | 'travel' | 'media' | 'other'

/** One tile of a number with an optional comparison. */
export interface SourceStat { label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'flat' }
/** A series the panel draws as small bars, oldest first. `day` is a date, or a local ISO hour for an hourly series. */
export interface SourceSeries { label: string; unit?: string; points: { day: string; value?: number }[] }
/** Free-form rows, e.g. recent workouts or upcoming events. */
export interface SourceList { title: string; items: { primary: string; secondary?: string }[] }
/** Setup instructions: numbered steps plus values the user copies (an endpoint, a key). */
export interface SourceSetup { title: string; steps: string[]; fields?: { label: string; value: string; secret?: boolean }[] }
/** Something the user can do from the panel. `upload` posts the chosen file as the body; `toggle` and `input` post `{ value }`. */
export interface SourceAction { id: string; label: string; kind: 'button' | 'upload' | 'toggle' | 'danger' | 'input'; accept?: string; value?: boolean; confirm?: string; hint?: string; placeholder?: string }

export interface SourceView {
  status: 'connected' | 'empty' | 'error'
  /** One line under the name: "312 days · last sync 2 h ago". */
  summary: string
  /** Whether the character currently sees this data. */
  shared: boolean
  /** True when stats and series preview what will appear once connected; the panel dims them. */
  placeholder?: boolean
  /** Raw data for a renderer the panel has for this source id (calendar, reminders, weather); the generic blocks below still cover any other source. */
  data?: unknown
  stats?: SourceStat[]
  series?: SourceSeries[]
  lists?: SourceList[]
  setup?: SourceSetup[]
  actions?: SourceAction[]
}

export interface SourceActionInput {
  json?: unknown
  /** Non-JSON bodies are written to a temp file (removed after the action) instead of being held in memory. */
  file?: string
  raw?: Buffer
  contentType: string
  query: URLSearchParams
}

export interface GalSource {
  id: string
  label: string
  category: SourceCategory
  /** Everything the panel shows. Called on open and after every change. */
  describe(): SourceView | Promise<SourceView>
  /** `POST /sources/<id>/<action>`. Return value is sent back as JSON. Throw to report an error. */
  act?(action: string, input: SourceActionInput): Promise<unknown> | unknown
}

export interface GalSources {
  /** Register a source; returns the disposer. Re-registering an id replaces it. */
  register(source: GalSource): () => void
  list(): GalSource[]
  get(id: string): GalSource | undefined
  /** Tell the UI a source has new data. */
  changed(id: string): void
  /** Subscribe to registration and data changes. */
  on(listener: (id: string) => void): () => void
}

export function createSourceRegistry(): GalSources {
  const sources = new Map<string, GalSource>()
  const listeners = new Set<(id: string) => void>()
  const emit = (id: string): void => { for (const listener of listeners) listener(id) }
  return {
    register(source) {
      sources.set(source.id, source)
      emit(source.id)
      return () => { if (sources.get(source.id) === source) { sources.delete(source.id); emit(source.id) } }
    },
    list: () => [...sources.values()].sort((a, b) => a.label.localeCompare(b.label)),
    get: id => sources.get(id),
    changed: emit,
    on(listener) { listeners.add(listener); return () => listeners.delete(listener) },
  }
}
