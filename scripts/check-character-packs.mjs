// Every bundled pack must show something for every activity, and must have
// its own idle: the rest may fall back (a thinking loop covers writing, and
// so on), idle may not.
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCharacterPack, resolveStateAsset } from '../lib/characters.js';
import { ACTIVITIES } from '../lib/activity.js';

const root = fileURLToPath(new URL('../characters/', import.meta.url));
const ids = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
assert.ok(ids.length > 0, 'no bundled packs found');

for (const id of ids) {
  const pack = loadCharacterPack(join(root, id), id);
  assert.ok(pack, `${id}: character.json is unreadable`);
  assert.ok(pack.name, `${id}: pack has no name`);
  assert.ok(pack.persona, `${id}: pack has no persona`);
  if (pack.promptOnly) { console.log(`  ${id}: prompt-only pack, no art expected`); continue; }
  const idle = resolveStateAsset(pack, 'idle');
  assert.ok(idle && (idle.from === 'idle' || idle.from === 'neutral'), `${id}: no idle asset`);
  const own = [], borrowed = [];
  for (const activity of ACTIVITIES) {
    const resolved = resolveStateAsset(pack, activity);
    assert.ok(resolved && (resolved.asset.video || resolved.asset.image), `${id}: nothing to show for ${activity}`);
    for (const file of [resolved.asset.video, resolved.asset.image].filter(Boolean)) {
      const size = statSync(join(pack.dir, file)).size;
      assert.ok(size > 1024, `${id}: ${file} is empty or truncated`);
    }
    (resolved.from === activity ? own : borrowed).push(resolved.from === activity ? activity : `${activity}←${resolved.from}`);
  }
  console.log(`  ${id}: ${own.length} own (${own.join(', ')}), ${borrowed.length} via fallback (${borrowed.join(', ')})`);
}
console.log(`PASS: ${ids.length} bundled pack(s), every activity has something to show.`);
