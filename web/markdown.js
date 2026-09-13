/*
 * Minimal markdown for the dialogue box. The agent writes ordinary markdown;
 * showing it raw turned tables into rows of pipes.
 *
 * Everything is HTML-escaped before any markup is produced, so an assistant
 * reply can never inject elements or attributes. Only the subset a reply
 * actually uses is supported — no raw HTML pass-through, no images.
 */
(() => {
 const escape = value => value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

 function inline(text) {
  let out = escape(text);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  // Links keep their text when the target is not http(s); nothing else is clickable.
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  out = out.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  return out;
 }

 const cells = row => row.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());

 function render(source) {
  const lines = String(source ?? '').replace(/\r\n?/g, '\n').split('\n');
  const html = [];
  let i = 0;
  while (i < lines.length) {
   const line = lines[i];
   if (line.trim() === '') { i++; continue; }

   const fence = line.match(/^\s*```(\S*)\s*$/);
   if (fence) {
    const body = [];
    i++;
    while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) { body.push(lines[i]); i++; }
    i++; // closing fence, or end of input for a stream still arriving
    html.push(`<pre><code${fence[1] ? ` class="lang-${escape(fence[1])}"` : ''}>${escape(body.join('\n'))}</code></pre>`);
    continue;
   }

   const heading = line.match(/^(#{1,4})\s+(.*)$/);
   if (heading) { const level = heading[1].length + 2; html.push(`<h${level}>${inline(heading[2])}</h${level}>`); i++; continue; }

   if (/^\s*([-*_])\1{2,}\s*$/.test(line)) { html.push('<hr>'); i++; continue; }

   // A table needs its delimiter row; without it the pipes are just text.
   if (line.includes('|') && /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1] ?? '')) {
    const head = cells(line.trim());
    i += 2;
    const body = [];
    while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') { body.push(cells(lines[i].trim())); i++; }
    html.push(`<table><thead><tr>${head.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${
     body.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table>`);
    continue;
   }

   const bullet = line.match(/^\s*[-*+]\s+(.*)$/), ordered = line.match(/^\s*\d+[.)]\s+(.*)$/);
   if (bullet || ordered) {
    const tag = bullet ? 'ul' : 'ol', pattern = bullet ? /^\s*[-*+]\s+(.*)$/ : /^\s*\d+[.)]\s+(.*)$/;
    const items = [];
    while (i < lines.length) {
     const match = lines[i].match(pattern);
     if (match) { items.push(inline(match[1])); i++; continue; }
     // A wrapped continuation line belongs to the item above it.
     if (items.length > 0 && /^\s+\S/.test(lines[i])) { items[items.length - 1] += ' ' + inline(lines[i].trim()); i++; continue; }
     break;
    }
    html.push(`<${tag}>${items.map(item => `<li>${item}</li>`).join('')}</${tag}>`);
    continue;
   }

   if (/^\s*>\s?/.test(line)) {
    const quoted = [];
    while (i < lines.length && /^\s*>\s?/.test(lines[i])) { quoted.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
    html.push(`<blockquote>${render(quoted.join('\n'))}</blockquote>`);
    continue;
   }

   const paragraph = [];
   while (i < lines.length && lines[i].trim() !== '' && !/^\s*(```|#{1,4}\s|>|[-*+]\s|\d+[.)]\s)/.test(lines[i])) { paragraph.push(lines[i]); i++; }
   html.push(`<p>${inline(paragraph.join('\n')).replace(/\n/g, '<br>')}</p>`);
  }
  return html.join('');
 }

 window.galMarkdown = { render };
})();
