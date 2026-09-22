// Launcher lifecycle regressions with a mocked Tauri bridge: no real sends.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync(new URL('../app/ui/launcher.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const elements = new Map();
const events = new Map();
const timers = new Map();
const windowEvents = new Map();
const sends = [];
let hides = 0, shows = 0, timerId = 0;
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
    addEventListener(name, callback) { windowEvents.set(name, callback); },
    __TAURI__: {
      event: { listen: (name, callback) => events.set(name, callback) },
      core: { invoke: (name, args) => {
        if (name === 'hide_launcher') { ++hides; return Promise.resolve(); }
        if (name === 'show_launcher') { ++shows; return Promise.resolve(); }
        assert.equal(name, 'send_message');
        return new Promise((resolve, reject) => sends.push({ resolve, reject, args }));
      } },
    },
  },
});
const open = () => events.get('aibo://launcher-open')();
const type = text => { element('text').value = text; };
const send = () => element('send').handlers.get('mousedown')({ preventDefault() {} });
const settle = async () => new Promise(setImmediate);
const land = async () => { sends.shift().resolve(); await settle(); };
const drop = async () => { sends.shift().reject(new Error('offline')); await settle(); await settle(); };

// The keystroke is the receipt: the bar is gone before the send resolves.
open(); type('test'); send();
assert.equal(hides, 1, 'the panel leaves on the keystroke, not on the round trip');
assert.equal(element('text').value, '', 'and takes the line with it');
assert.equal(sends.length, 1, 'the send is still in flight');
assert.equal(sends[0].args.text, 'test');
await land();
assert.equal(shows, 0, 'a send that lands says nothing');
assert.equal(hides, 1);

// A send that never lands brings the bar back, with the line intact.
open(); type('offline line'); send();
assert.equal(hides, 2);
await drop();
assert.equal(shows, 1, 'a failed send reopens the bar');
assert.equal(element('text').value, 'offline line', 'and hands the line back');
assert.ok(element('bar').classList.contains('failed'));
assert.equal(element('note').textContent, 'Could not reach her');
// Typing clears the failure rather than leaving a stale warning up.
element('text').handlers.get('input')();
assert.ok(!element('bar').classList.contains('failed'));
console.log('PASS instant dismissal, silent success, and a failure that returns the line');

// A failure must never overwrite the next line already being typed.
open(); type('first'); send(); await settle();
open(); type('second');
await drop();
assert.equal(element('text').value, 'second', 'the line in progress wins');
assert.ok(element('bar').classList.contains('failed'), 'but the failure is still reported');
// Dismissing drops the pending line, so a later reopen is clean.
const escape = (extra = {}) => windowEvents.get('keydown')({ key: 'Escape', preventDefault() {}, stopPropagation() {}, ...extra });
escape();
open();
assert.equal(element('text').value, '', 'a dismissed failure does not come back');
assert.ok(!element('bar').classList.contains('failed'));
console.log('PASS a failure yields to the next line and does not outlive a dismissal');

const hidesBefore = hides;
open(); type('unfinished message'); escape();
assert.equal(hides, hidesBefore + 1, 'Escape closes even with a draft');
assert.equal(element('text').value, '');
open(); escape({ target: element('mode') });
assert.equal(hides, hidesBefore + 2, 'Escape closes from buttons as well as the input');
open(); escape({ isComposing: true });
assert.equal(hides, hidesBefore + 2, 'Escape belongs to the IME while composing');
open(); type(''); send();
assert.equal(sends.length, 0, 'an empty line is not a send');
assert.equal(hides, hidesBefore + 2, 'and does not dismiss the bar either');
console.log('PASS Escape with draft, button focus, IME, and the empty line');
