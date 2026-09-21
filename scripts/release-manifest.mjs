import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root = path.resolve(import.meta.dirname, '..');
const json = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
export function compare(a, b) {
  const parse = v => {
    assert.match(v, /^\d+\.\d+\.\d+$/, 'Expected stable major.minor.patch');
    return v.split('.').map(Number);
  };
  const x = parse(a), y = parse(b);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
}
export function manifest(version, arch, signature) {
  compare(version, version);
  assert.ok(['arm64', 'x64'].includes(arch), 'Only macOS arm64/x64 is supported');
  assert.ok(signature.trim(), 'Updater signature is required');
  return {
    version, notes: `Aibo ${version}`, pub_date: new Date().toISOString(),
    platforms: { [`darwin-${arch === 'arm64' ? 'aarch64' : 'x86_64'}`]: {
      url: `https://github.com/omdsh-dev/dsh-gal/releases/download/v${version}/Aibo.app.tar.gz`,
      signature: signature.trim(),
    } },
  };
}
if (process.argv[1] === import.meta.filename) {
  const version = json('app/src-tauri/tauri.conf.json').version;
  for (const file of ['package.json', 'app/package.json']) assert.equal(json(file).version, version, `${file} version differs`);
  const cargo = fs.readFileSync(path.join(root, 'app/src-tauri/Cargo.toml'), 'utf8').match(/^version = "([^"]+)"/m)[1];
  assert.equal(cargo, version, 'Cargo version differs');
  compare(version, version);
  const [command, output] = process.argv.slice(2);
  if (command === 'version') console.log(version);
  else if (command === 'create') {
    assert.equal(process.platform, 'darwin', 'Build macOS releases on macOS');
    const signature = fs.readFileSync(path.join(output, 'Aibo.app.tar.gz.sig'), 'utf8');
    assert.ok(fs.statSync(path.join(output, 'Aibo.app.tar.gz')).size > 0);
    fs.writeFileSync(path.join(output, 'latest.json'), JSON.stringify(manifest(version, process.arch, signature), null, 2) + '\n');
  } else if (command === 'newer') {
    // gh --paginate emits adjacent arrays.
    const releases = JSON.parse('[' + fs.readFileSync(output, 'utf8').trim().replace(/\]\s*\[/g, '],[') + ']').flat();
    for (const release of releases) {
      assert.notEqual(release.tag_name, `v${version}`, 'Version already released');
      if (!release.draft && !release.prerelease && /^v\d+\.\d+\.\d+$/.test(release.tag_name))
        assert.ok(compare(version, release.tag_name.slice(1)) > 0, 'Bump above published version');
    }
  } else throw new Error('Expected version, create <dir>, or newer <releases.json>');
}
