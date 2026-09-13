/*
 * Markdown for the dialogue box and the backlog.
 *
 * The box re-renders the whole message on every animation frame while tokens
 * are still arriving, so the renderer has to cope with markdown that is cut
 * off mid-construct — an unclosed fence, half a table, a dangling `**`. marked
 * degrades gracefully there, which a hand-rolled subset did not.
 *
 * A reply is model output, so it is sanitized before it reaches the DOM.
 */
import DOMPurify from 'dompurify'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

// Links open outside the app, and never with a reference back to it.
DOMPurify.addHook('afterSanitizeAttributes', node => {
  if (node.tagName === 'A' && node.hasAttribute('href')) {
    node.setAttribute('target', '_blank')
    node.setAttribute('rel', 'noopener noreferrer')
  }
})

export function render(source: string): string {
  const html = marked.parse(String(source ?? ''), { async: false })
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
}
