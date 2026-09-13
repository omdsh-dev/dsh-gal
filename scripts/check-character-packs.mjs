// Every bundled pack must resolve all six expressions to real, readable assets.
import assert from 'node:assert/strict';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCharacterPack } from '../lib/characters.js';
import { EMOTIONS } from '../lib/emotion.js';

const root = fileURLToPath(new URL('../characters/', import.meta.url));
const ids = readdirSync(root, { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
assert.ok(ids.length > 0, 'no bundled packs found');

for (const id of ids) {
  const pack = loadCharacterPack(join(root, id), id);
  assert.ok(pack, `${id}: character.json is unreadable`);
  assert.ok(pack.name, `${id}: pack has no name`);
  assert.ok(pack.persona, `${id}: pack has no persona`);
  if (pack.promptOnly) { console.log(`  ${id}: prompt-only pack, no art expected`); continue; }
  for (const emotion of EMOTIONS) {
    const asset = pack.emotions[emotion];
    assert.ok(asset && (asset.video || asset.image), `${id}: no asset for ${emotion}`);
    for (const file of [asset.video, asset.image].filter(Boolean)) {
      const size = statSync(join(pack.dir, file)).size;
      assert.ok(size > 1024, `${id}: ${file} is empty or truncated`);
    }
  }
  console.log(`  ${id}: ${EMOTIONS.length} expressions resolved`);
}
console.log(`PASS: ${ids.length} bundled pack(s), all expressions present.`);
