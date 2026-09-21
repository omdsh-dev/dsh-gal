// Exercise the real pet script with native calls mocked; no desktop manipulation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { presentation, atlasLayout, sequence, lookFrame, memes, nextMeme, memeDelay } from '../app/ui/pet-model.js';
const documentEvents = new Map();
const html=fs.readFileSync(new URL('../app/ui/pet.html',import.meta.url),'utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(match=>match[1]));
let failDrag = false;
let mockStatus = {activity:'idle',revision:0};
const elements = new Map(), events = new Map(), timers = new Map(), calls = [];
let timer = 0;
const motion = {matches:false,change:null,addEventListener(_name,fn){this.change=fn}};
const element = id => {
  assert.ok(ids.has(id), `element ${id} must exist in pet.html`);
  if (!elements.has(id)) elements.set(id, { hidden:id==='bubble', style:{setProperty(name,value){this[name]=value}}, setAttribute(){}, focus(){}, dataset:{}, handlers:new Map(), hovered:false, focused:false,
    classList: { values:new Set(), add(name){this.values.add(name)}, remove(name){this.values.delete(name)}, contains(name){return this.values.has(name)} },
    addEventListener(name,fn){const previous=this.handlers.get(name);this.handlers.set(name,previous?(...args)=>{previous(...args);fn(...args)}:fn)},
    matches(){return this.hovered || this.focused}, querySelector(){return null},
    getBoundingClientRect(){return {x:0,y:0,width:180,height:180}},
  });
  return elements.get(id);
};
const script=fs.readFileSync(new URL('../app/ui/pet.js',import.meta.url),'utf8').replace(/^import .*;\n/,'');
await vm.runInNewContext(`(async()=>{${script}})()`,{
  presentation,atlasLayout,sequence,lookFrame,memes,nextMeme,memeDelay,console:{...console,error(error){if(error.message!=='mock drag failure')throw error}},
  document:{ getElementById:element, addEventListener(name,fn){documentEvents.set(name,fn)}, body:{} },
  Image:class {}, ResizeObserver:class{observe(){}}, matchMedia:()=>motion,
  setTimeout:(fn,delay)=>{fn.delay=delay;timers.set(++timer,fn);return timer},clearTimeout:id=>timers.delete(id),
  window:{__TAURI__:{core:{invoke:async(name,args)=>{
    calls.push({name,args}); if(name==='set_pet_preferences')return args; if(name==='start_pet_drag' && failDrag) throw new Error('mock drag failure'); if(name==='pet_status')return mockStatus; if(name==='get_pet_preferences')return {size:180,enabled:true,showWithMain:false};
  }},event:{listen:async(name,fn)=>events.set(name,fn)},window:{getCurrentWindow:()=>({isVisible:async()=>false})}}},
});
const enter=id=>{element(id).hovered=true;element(id).handlers.get('pointerenter')()};
const leave=id=>{element(id).hovered=false;element(id).handlers.get('pointerleave')()};
assert.ok(!ids.has('tools') && !ids.has('menu'),'pet has no toolbar or settings popover');
enter('pet');leave('pet');
assert.equal(element('pet').ondblclick,undefined,'double click has no action');
assert.equal(element('pet').onkeydown,undefined,'pet is not a chat shortcut');
let prevented=false;
documentEvents.get('contextmenu')({preventDefault(){prevented=true}});
assert.ok(prevented,'suppress webview context menu');
assert.equal(calls.at(-1).name,'show_pet_menu','right click opens native pet menu');
assert.ok(!calls.some(c=>c.name==='open_pet_chat' || c.name==='open_pet_launcher'));
events.get('aibo://pet-visible')({payload:false});
assert.equal(calls.at(-1).args.regions.length,1,'idle hit regions contain only pet');
console.log('PASS no toolbar, settings or double-click shortcut; idle hit regions');

events.get('aibo://pet-visible')({payload:true});
await new Promise(setImmediate);
const pet=element('pet');
pet.onpointerdown({button:2,detail:1});
assert.equal(pet.classList.contains('grabbed'),false,'right click does not lift');
pet.onpointerdown({button:0,detail:1});
assert.equal(pet.classList.contains('grabbed'),true);
const menuCalls=calls.filter(c=>c.name==='show_pet_menu').length;
documentEvents.get('contextmenu')({preventDefault(){}});
assert.equal(calls.filter(c=>c.name==='show_pet_menu').length,menuCalls,'dragging suppresses context menu');
enter('pet');assert.equal(pet.dataset.action,'grabbed','hover does not interrupt dragging');
assert.ok(calls.some(c=>c.name==='start_pet_drag'));
assert.equal(pet.dataset.action,'grabbed');
events.get('aibo://pet-pointer')({payload:{x:100,y:100,dx:10}});
assert.equal(pet.dataset.action,'running-right');
events.get('aibo://pet-pointer')({payload:{x:100,y:100,dx:-10}});
assert.equal(pet.dataset.action,'running-left');
for(const fn of timers.values())if(fn.delay===180)fn();
assert.equal(pet.dataset.action,'grabbed');
events.get('aibo://pet-drag-ended')();
assert.equal(pet.classList.contains('grabbed'),false,'native release outside webview ends drag');
assert.equal(pet.classList.contains('landing'),true);
for(const fn of timers.values())if(fn.delay===420)fn();
assert.equal(pet.classList.contains('landing'),false);
pet.onpointerdown({button:0,detail:2});assert.equal(pet.classList.contains('grabbed'),true,'repeated presses still allow dragging');
documentEvents.get('pointerup')();
pet.onpointerdown({button:0,detail:1});documentEvents.get('pointerup')();
assert.equal(pet.classList.contains('grabbed'),false);
pet.onpointerdown({button:0,detail:1});events.get('aibo://pet-visible')({payload:false});
assert.equal(pet.classList.contains('grabbed'),false,'hiding resets drag state');
failDrag=true;
pet.onpointerdown({button:0,detail:1});
await new Promise(setImmediate);
assert.equal(pet.classList.contains('grabbed'),false,'native failure resets drag state');
console.log('PASS pickup, native/DOM release, landing, repeated presses, hide and failed drag');

events.get('aibo://pet-preferences')({payload:{size:260,enabled:true,showWithMain:true}});
assert.equal(pet.style.width,'260px');
assert.equal(element('bubble').dataset.compact,'true');
assert.ok(!calls.some(c=>c.name==='set_pet_preferences'),'pet only receives settings changes');
element('message').onclick();
assert.equal(calls.at(-1).name,'open_pet_chat','status bubble still opens its conversation');
console.log('PASS settings page updates pet size and bubble remains actionable');

// Ordinary desktop motion must neither choose gaze frames nor reset the clock.
failDrag=false;
events.get('aibo://pet-visible')({payload:true});
await new Promise(setImmediate);
const sprite=element('pet-art');
const first=sprite.style.backgroundPosition;
const idleTimer=[...timers.entries()].find(([,fn])=>fn.delay===1680);
assert.ok(idleTimer,'idle schedules its slow first frame');
for(let i=0;i<100;i++) events.get('aibo://pet-pointer')({payload:{x:1000+i,y:-500,dx:5}});
assert.equal(sprite.style.backgroundPosition,first);
assert.equal(timers.get(idleTimer[0]),idleTimer[1],'desktop movement does not postpone idle');
timers.delete(idleTimer[0]);idleTimer[1]();
assert.notEqual(sprite.style.backgroundPosition,first,'idle advances under continuous mouse movement');
const gaze={x:90,y:-300};
events.get('aibo://pet-caret')({payload:gaze});
assert.equal(sprite.style.backgroundPosition,`0% ${9/14*100}%`);
assert.ok(![...timers.values()].some(fn=>fn.delay===660),'explicit gaze pauses animation');
events.get('aibo://pet-caret')({payload:null});
assert.equal(sprite.style.backgroundPosition,first,'clearing target restarts idle');
const clock=[...timers.entries()].find(([,fn])=>fn.delay===1680);
events.get('aibo://pet-caret')({payload:null});
assert.equal(timers.get(clock[0]),clock[1],'repeated clear does not starve idle');
for(const [activity,allowed] of [['reading',true],['speaking',true],['waiting',false],['done',false],['failed',false]]) {
  mockStatus={activity,revision:10};
  events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
  events.get('aibo://pet-caret')({payload:gaze});
  assert.equal(sprite.style.backgroundPosition===`0% ${9/14*100}%`,allowed,activity);
  if(!allowed) {
    // Even after a task clip settles, its state still excludes gaze.
    for(let n=0;n<30;n++) {
      const tick=[...timers.entries()].find(([,fn])=>[140,150,240,260,280,1680,660,840,1920].includes(fn.delay));
      if(tick){timers.delete(tick[0]);tick[1]();}
    }
    assert.ok(Number(sprite.style.backgroundPosition.split(' ')[1].slice(0,-1))<9/14*100);
  }
  events.get('aibo://pet-caret')({payload:null});
}
mockStatus={activity:'idle',revision:11,gaze:{x:600,y:90}};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
const computerPose=sprite.style.backgroundPosition;
events.get('aibo://pet-caret')({payload:gaze});assert.notEqual(sprite.style.backgroundPosition,computerPose);
events.get('aibo://pet-caret')({payload:null});assert.equal(sprite.style.backgroundPosition,computerPose,'caret has priority and falls back to CU');
mockStatus={activity:'idle',revision:11,gaze:null};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
assert.equal(sprite.style.backgroundPosition,first,'inactive Computer Use restores idle');
console.log('PASS continuous mouse motion, idle progression, explicit gaze pause/resume, caret priority and task-state gating');

// Idle vignettes are occasional, finite, and subordinate to real interactions.
events.get('aibo://pet-visible')({payload:false});timers.clear();
mockStatus={activity:'idle',busy:false,revision:30};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
const cooldown=()=>[...timers.entries()].find(([,fn])=>fn.delay>=30000&&fn.delay<=60000);
const fire=([id,fn])=>{timers.delete(id);fn()};
const pending=cooldown();assert.ok(pending);
for(let i=0;i<100;i++)events.get('aibo://pet-pointer')({payload:{x:i,y:i,dx:4}});
assert.equal(cooldown()[0],pending[0],'ordinary mouse movement keeps idle cooldown');
fire(pending);
const firstMeme=pet.dataset.action;assert.ok(firstMeme in memes);
assert.equal(element('bubble').hidden,true,'meme does not invent dialogue/status');
const pollTick=[...timers.entries()].find(([,fn])=>fn.delay===1000);fire(pollTick);await new Promise(setImmediate);
assert.equal(pet.dataset.action,firstMeme,'status polling does not replace an idle vignette');
for(const frame of memes[firstMeme]) {
  const tick=[...timers.entries()].filter(([,fn])=>fn.delay===frame.ms).at(-1);
  assert.ok(tick,`meme frame ${frame.column} scheduled`);fire(tick);
}
assert.equal(pet.dataset.action,'idle','one pass returns to ordinary idle');
assert.ok(cooldown());fire(cooldown());assert.notEqual(pet.dataset.action,firstMeme);
enter('pet');assert.equal(pet.dataset.action,'jumping');assert.equal(cooldown(),undefined);
leave('pet');assert.equal(pet.dataset.action,'idle');assert.ok(cooldown());fire(cooldown());
events.get('aibo://pet-caret')({payload:{x:900,y:50}});assert.equal(pet.dataset.action,'idle');assert.equal(cooldown(),undefined);
events.get('aibo://pet-caret')({payload:null});assert.ok(cooldown());fire(cooldown());
pet.onpointerdown({button:0,detail:1});assert.equal(pet.dataset.action,'grabbed');assert.equal(cooldown(),undefined);
events.get('aibo://pet-drag-ended')();assert.ok(cooldown());fire(cooldown());
mockStatus={activity:'reading',busy:true,revision:31};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
assert.equal(pet.dataset.action,'running');assert.equal(cooldown(),undefined);
events.get('aibo://pet-visible')({payload:false});assert.equal(cooldown(),undefined);
console.log('PASS idle meme cooldown, uninterrupted polling, finite playback, non-repetition and hover/gaze/drag/task/hide interruption');

mockStatus={activity:'idle',busy:false,revision:40};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
fire(cooldown());assert.ok(pet.dataset.action in memes);
motion.matches=true;motion.change();
assert.equal(pet.dataset.action,'idle','reduced motion cancels active meme, rather than freezing a prop pose');
assert.equal(cooldown(),undefined);
motion.matches=false;motion.change();assert.ok(cooldown());
console.log('PASS reduced motion cancels vignette and restores idle scheduling when disabled');
