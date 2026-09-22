// Exercise the real pet script with native calls mocked; no desktop manipulation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { presentation, atlasLayout, sequence, lookFrame, memes, nextMeme, memeDelay, glance, offline } from '../app/ui/pet-model.js';
const documentEvents = new Map();
const html=fs.readFileSync(new URL('../app/ui/pet.html',import.meta.url),'utf8');
const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(match=>match[1]));
let failDrag = false, failStatus = false;
let mockStatus = {activity:'idle',revision:0};
const elements = new Map(), events = new Map(), timers = new Map(), calls = [];
// Frames are hand-cranked, so a scroll pass can be stepped without waiting.
let frameClock = 0;
let timer = 0;
const motion = {matches:false,change:null,addEventListener(_name,fn){this.change=fn}};
const element = id => {
  assert.ok(ids.has(id), `element ${id} must exist in pet.html`);
  if (!elements.has(id)) elements.set(id, { hidden:id==='bubble', style:{setProperty(name,value){this[name]=value}}, setAttribute(){}, focus(){}, dataset:{}, handlers:new Map(), hovered:false, focused:false,
    scrollTop:0, scrollHeight:0, clientHeight:0,
    classList: { values:new Set(), add(name){this.values.add(name)}, remove(name){this.values.delete(name)}, contains(name){return this.values.has(name)} },
    addEventListener(name,fn){const previous=this.handlers.get(name);this.handlers.set(name,previous?(...args)=>{previous(...args);fn(...args)}:fn)},
    matches(){return this.hovered || this.focused}, querySelector(){return null},
    getBoundingClientRect(){return {x:0,y:0,width:180,height:180}},
  });
  return elements.get(id);
};
const script=fs.readFileSync(new URL('../app/ui/pet.js',import.meta.url),'utf8').replace(/^import .*;\n/,'');
await vm.runInNewContext(`(async()=>{${script}})()`,{
  presentation,atlasLayout,sequence,lookFrame,memes,nextMeme,memeDelay,glance,offline,console:{...console,error(error){if(error.message!=='mock drag failure')throw error}},
  document:{ getElementById:element, addEventListener(name,fn){documentEvents.set(name,fn)}, body:{} },
  Image:class {}, ResizeObserver:class{observe(){}}, matchMedia:()=>motion,
  setTimeout:(fn,delay)=>{fn.delay=delay;timers.set(++timer,fn);return timer},clearTimeout:id=>timers.delete(id),
  requestAnimationFrame:fn=>{fn.delay='frame';timers.set(++timer,fn);return timer},cancelAnimationFrame:id=>timers.delete(id),
  performance:{now:()=>frameClock},
  window:{__TAURI__:{core:{invoke:async(name,args)=>{
    calls.push({name,args}); if(name==='pet_status' && failStatus) throw new Error('offline'); if(name==='set_pet_preferences')return args; if(name==='start_pet_drag' && failDrag) throw new Error('mock drag failure'); if(name==='pet_status')return mockStatus; if(name==='get_pet_preferences')return {size:180,enabled:true,showWithMain:false};
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

// A click is the whole trigger: she looks where it landed, wherever that is,
// and the clip comes back on its own a beat later.
events.get('aibo://pet-visible')({payload:false});timers.clear();
mockStatus={activity:'idle',busy:false,revision:50};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
const rest=sprite.style.backgroundPosition, above=`0% ${9/14*100}%`;
const click=point=>events.get('aibo://pet-click')({payload:point});
const holdTimer=()=>[...timers.entries()].find(([,fn])=>fn.delay===glance.hold);
click({x:90,y:-3000});
assert.equal(sprite.style.backgroundPosition,above,'a click across the desk still turns her head');
assert.equal(pet.dataset.gaze,'on','the still frame declares itself, so the body can breathe under it');
click({x:3000,y:90});
assert.notEqual(sprite.style.backgroundPosition,above,'the next click moves her eyes again');
const hold=holdTimer();
assert.ok(hold,'the look is time-boxed');
fire(hold);
assert.equal(pet.dataset.gaze,'off');
assert.equal(sprite.style.backgroundPosition,rest,'the beat ends on its own, back to idle');
click({x:90,y:-3000});
assert.equal(pet.dataset.gaze,'on','there is no cooldown: every click counts');
const restarted=holdTimer();
click({x:90,y:-3000});
assert.notEqual(holdTimer()[0],restarted[0],'a repeat click restarts the beat instead of stacking');
fire(holdTimer());
const vignette=cooldown();assert.ok(vignette,'an idle vignette is still on the clock');
click({x:100,y:-100});
assert.equal(cooldown()[0],vignette[0],'a look never postpones the idle vignette');
fire(holdTimer());
fire(vignette);
const playing=pet.dataset.action;assert.ok(playing in memes);
click({x:90,y:-3000});
assert.equal(pet.dataset.action,playing,'she finishes her rice before looking up');
assert.equal(pet.dataset.gaze,'off');
for(const frame of memes[playing]) {
  const tick=[...timers.entries()].filter(([,fn])=>fn.delay===frame.ms).at(-1);
  if(tick)fire(tick);
}
assert.equal(pet.dataset.action,'idle');
enter('pet');click({x:90,y:-3000});
assert.equal(pet.dataset.gaze,'off','hover has its own reaction and outranks a look');
leave('pet');
click({x:90,y:-3000});assert.equal(sprite.style.backgroundPosition,above);
events.get('aibo://pet-caret')({payload:{x:900,y:50}});
assert.equal(sprite.style.backgroundPosition,lookFrameFor(900,50),'a real caret target outranks a click');
events.get('aibo://pet-caret')({payload:null});
function lookFrameFor(x,y){const f=lookFrame(x,y,{x:0,y:0,width:180,height:180});return `${f.column/7*100}% ${f.row/14*100}%`;}
console.log('PASS click-driven look, time-boxed beat, no cooldown, and meme/hover/caret priority');

// The bubble leaves on a fade, and a reply too long for it reads itself down.
const bubble=element('bubble'), detail=element('detail');
events.get('aibo://pet-visible')({payload:false});timers.clear();
mockStatus={activity:'done',busy:false,revision:60,text:'早上好。今天是周二，周五就中秋了。'};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
assert.equal(bubble.hidden,false,'a finished reply speaks up');
assert.equal(bubble.dataset.kind,'reply');
// Short enough to fit: no reveal, no scrolling.
assert.equal(bubble.dataset.more,'no');
assert.ok(!([...timers.values()].some(fn=>fn.delay==='frame')),'nothing to scroll');
// Now a reply that overflows its three lines.
detail.scrollHeight=220; detail.clientHeight=73; detail.scrollTop=0;
mockStatus={activity:'done',busy:false,revision:61,text:'早上好。今天是周二，周五就中秋了——三天，比昨天短一截了。今天上海晴，二十七度，中午出门别忘了帽子。'};
fire([...timers.entries()].find(([,fn])=>fn.delay===1000));await new Promise(setImmediate);
assert.equal(bubble.dataset.more,'true','the tail dissolves to show there is more');
// requestAnimationFrame hands its callback a timestamp; so does this.
const frame=()=>{const f=[...timers.entries()].find(([,fn])=>fn.delay==='frame');if(f){timers.delete(f[0]);f[1](frameClock);}};
frameClock=0;frame();
assert.equal(detail.scrollTop,0,'she holds on the first line before moving');
frameClock=1600;frame();
assert.equal(detail.scrollTop,0,'the lead-in is a full beat');
frameClock=1600+1000;frame();
assert.ok(detail.scrollTop>0 && detail.scrollTop<147,'then it creeps down at a readable pace');
frameClock=1600+60000;frame();
assert.equal(detail.scrollTop,147,'it stops at the last line instead of looping');
assert.equal(bubble.dataset.more,'end','the mask flips to the top edge once the end is reached');
assert.equal([...timers.values()].filter(fn=>fn.delay==='frame').length,0,'the pass releases the frame loop');
// Dismissing fades: inert and unclickable at once, hidden only after the fade.
const regionCount=()=>calls.filter(c=>c.name==='pet_regions').at(-1).args.regions.length;
const withBubble=regionCount();
element('dismiss').onclick();
assert.equal(bubble.hidden,false,'the bubble is still on screen while it fades');
assert.ok(bubble.classList.contains('leaving'));
assert.equal(regionCount(),withBubble-1,'the fading bubble stops taking clicks immediately');
const fade=[...timers.entries()].find(([,fn])=>fn.delay===220);
assert.ok(fade,'the fade is timed, not instant');
// Emptying the text first would collapse the shape mid-fade: two exits, not one.
const words=detail.textContent;
fire([...timers.entries()].find(([,fn])=>fn.delay===1000));await new Promise(setImmediate);
assert.equal(detail.textContent,words,'a leaving bubble keeps its words');
assert.equal(bubble.dataset.kind,'reply','and its shape, so the whole thing fades as one');
fire(fade);
assert.equal(bubble.hidden,true,'and only then does it leave the layout');
assert.ok(!bubble.classList.contains('leaving'));
console.log('PASS bubble fade-out, released regions, and a self-reading overflow reply');

// A connection she once had, lost: one missed poll is a blip, two is an outage.
events.get('aibo://pet-visible')({payload:false});timers.clear();
mockStatus={activity:'idle',busy:false,revision:70};
events.get('aibo://pet-visible')({payload:true});await new Promise(setImmediate);
const tick=async()=>{fire([...timers.entries()].find(([,fn])=>fn.delay===1000));await new Promise(setImmediate);};
assert.equal(bubble.hidden,true,'a healthy idle says nothing');
failStatus=true;
await tick();
assert.equal(bubble.hidden,true,'one missed poll is not worth a word');
await tick();
assert.equal(element('title').textContent,'暂时连不上小黑鱼','two in a row is');
assert.equal(pet.dataset.action,'failed');
failStatus=false;
await tick();
assert.equal(bubble.classList.contains('leaving') || bubble.hidden,true,'and it goes once she is back');
console.log('PASS blip tolerance and a reported disconnection');
