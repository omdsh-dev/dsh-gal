// Launcher lifecycle regressions with a mocked Tauri bridge: no real sends.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../app/ui/launcher.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
const events = new Map();
const timers = new Map();
const sends = [];
let hides = 0, timerId = 0;
const element = id => {
  if (!elements.has(id)) {
    const classes = new Set();
    elements.set(id, {
      value: '', textContent: '', style: {}, offsetWidth: 700, handlers: new Map(),
      setAttribute() {}, focus() {}, select() {},
      addEventListener(name, callback) { this.handlers.set(name, callback); },
      classList: {
        add: (...names) => names.forEach(name => classes.add(name)),
        remove: (...names) => names.forEach(name => classes.delete(name)),
        contains: name => classes.has(name),
        toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
      },
    });
  }
  return elements.get(id);
};
vm.runInNewContext(script, {
  document: { getElementById: element },
  localStorage: { getItem: () => '0', setItem() {} },
  performance: { now: () => 1000 },
  setTimeout: callback => { timers.set(++timerId, callback); return timerId; },
  clearTimeout: id => timers.delete(id),
  window: {
    addEventListener() {},
    __TAURI__: {
      event: { listen: (name, callback) => events.set(name, callback) },
      core: { invoke: name => {
        if (name === 'hide_launcher') { ++hides; return Promise.resolve(); }
        assert.equal(name, 'send_message');
        return new Promise(resolve => sends.push(resolve));
      } },
    },
  },
});
const open = () => events.get('aibo://launcher-open')();
const send = () => {
  element('text').value = 'test';
  element('send').handlers.get('mousedown')({ preventDefault() {} });
};
const settle = async () => { sends.shift()(); await new Promise(setImmediate); };
open(); send(); await settle();
assert.equal(timers.size, 1);
const oldDismiss = [...timers.values()][0];
open();
assert.equal(timers.size, 0, 'reopening must cancel the previous success timer');
oldDismiss();
assert.equal(hides, 0, 'an already-queued old timer must not hide the new launcher');
open(); send(); open(); await settle();
assert.equal(timers.size, 0, 'a stale send completion must not arm a dismiss timer');
open(); send(); await settle();
[...timers.values()][0]();
assert.equal(hides, 1, 'a current successful background send should dismiss normally');
console.log('PASS stale timer, stale send completion, and normal background dismissal');
