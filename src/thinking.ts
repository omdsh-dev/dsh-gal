/** Keep the UI and agent requests on the adapter's exact supported effort IDs. */
export interface ThinkingModel {
  reasoning?: { efforts: readonly { id: string; name: string; description?: string }[]; defaultEffort?: string }
}
export function thinkingView(provider: string, model: string, info: ThinkingModel, preferred: string) {
  const efforts = info.reasoning?.efforts ?? []
  const selected = efforts.some(e => e.id === preferred) ? preferred : 'default'
  return { provider, model, selected, effective: selected === 'default' ? info.reasoning?.defaultEffort : selected, efforts }
}
export async function applyThinking<T extends { provider?: string; model?: string; reasoningEffort?: unknown }>(
  config: T, preferred: string, resolve: (provider: string, model: string) => Promise<ThinkingModel>,
): Promise<Omit<T, 'reasoningEffort'> & { reasoningEffort?: string }> {
  if (!config.provider || !config.model) return config as Omit<T, 'reasoningEffort'>
  const view = thinkingView(config.provider, config.model, await resolve(config.provider, config.model), preferred)
  // Clear stale effort from a resumed session when using the provider default.
  const { reasoningEffort: _old, ...rest } = config
  return { ...rest, ...(view.selected === 'default' ? {} : { reasoningEffort: view.selected }) }
}
