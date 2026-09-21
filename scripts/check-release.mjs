import assert from 'node:assert/strict';
import { compare, manifest } from './release-manifest.mjs';
assert.ok(compare('0.1.10', '0.1.9') > 0);
assert.ok(compare('1.0.0', '0.99.99') > 0);
assert.equal(compare('1.0.0', '1.0.0'), 0);
assert.ok(compare('0.1.0', '0.2.0') < 0);
assert.throws(() => compare('0.2.0-beta.1', '0.1.0'));
assert.throws(() => manifest('0.1.0', 'ia32', 'signature'));
assert.throws(() => manifest('0.1.0', 'arm64', ' '));
for (const [arch, platform] of [['arm64', 'darwin-aarch64'], ['x64', 'darwin-x86_64']]) {
  const result = manifest('0.2.0', arch, 'signature\n');
  assert.equal(result.platforms[platform].signature, 'signature');
  assert.equal(result.platforms[platform].url, 'https://github.com/omdsh-dev/dsh-gal/releases/download/v0.2.0/Aibo.app.tar.gz');
  assert.ok(Number.isFinite(Date.parse(result.pub_date)));
}
console.log('Release version, platform, signature and URL checks passed.');
