import assert from 'node:assert/strict';
import { PetState } from '../lib/pet-state.js';
import { presentation } from '../app/ui/pet-model.js';
const p = new PetState();
assert.equal(p.snapshot().activity, 'idle');
p.update({type:'busy',value:true},100);
p.update({type:'status',activity:'searching'},110);
assert.equal(p.snapshot(110).activity,'searching');
p.update({type:'question',id:'a',questions:[{}]},120);
p.update({type:'status',activity:'running'},130);
assert.equal(p.snapshot(130).activity,'waiting','question has priority over parallel tools');
p.update({type:'question',id:'a',answers:[]},140);
assert.equal(p.snapshot(140).activity,'running');
p.update({type:'activity',activity:'failed',beat:true},150);
assert.equal(p.snapshot(151).activity,'failed');
assert.equal(p.snapshot(5000).activity,'running','failure beat expires');
p.update({type:'assistant',text:'（微笑）完成了 **检查**'},5000);
p.update({type:'busy',value:false},5001);
p.update({type:'activity',activity:'done'},5002);
assert.equal(p.snapshot(5003).text,'完成了 检查');
assert.equal(p.snapshot(5003).activity,'done');
assert.equal(p.snapshot(35003).activity,'idle');
const current=p.snapshot(5003);
assert.equal(presentation(current,true,-1).bubble,true);
assert.equal(presentation(current,true,current.revision).bubble,false);
assert.equal(presentation(current,false,-1).row,5);
p.update({type:'busy',value:true},6000);
assert.equal(p.snapshot(6000).text,'');
p.update({type:'session'},6100);
assert.equal(p.snapshot(6100).busy,false);
assert.equal(p.snapshot(6100).activity,'idle');
console.log('PASS pet task lifecycle, pending input, failure expiry, reply, dismissal and reconnect presentation');
// Conversation bubbles expose the reply, never internal progress labels.
for (const activity of ['reading','writing','searching','running','speaking']) {
  const view=presentation({activity,revision:10,text:''},true,-1);
  assert.equal(view.kind,'thinking'); assert.equal(view.title,''); assert.equal(view.text,'');
  assert.equal(view.bubble,true);
  assert.equal(presentation({activity,revision:10},true,10).bubble,false);
}
for (const activity of ['done','speaking']) {
  const view=presentation({activity,revision:11,text:'周末见。'},true,-1);
  assert.equal(view.kind,'reply');assert.equal(view.title,'');assert.equal(view.text,'周末见。');
}
assert.equal(presentation({activity:'done',revision:12,text:''},true,-1).bubble,false,'no synthetic completion message');
assert.equal(presentation({activity:'idle',revision:12,text:'old reply'},true,-1).bubble,false);
for(const activity of ['waiting','failed']) {
  const view=presentation({activity,revision:13},true,-1);
  assert.equal(view.kind,'notice');assert.ok(view.title);assert.ok(view.text);
}
assert.equal(presentation({},false,-1).kind,'notice');
console.log('PASS message-only replies, typing indicator, empty completion, dismissal and actionable notices');
// Exercise the real HTTP server and its existing authorization boundary.
const { AiboServer } = await import('../lib/server.js');
let gaze=null;
const server = new AiboServer({petGaze:()=>gaze,clearPetGaze:()=>{gaze=null},port:14987,token:'pet-test',webRoot:'web',log:()=>{},onSend:async()=>{}});
await server.start();
try {
  const base='http://127.0.0.1:14987/pet-state';
  assert.equal((await fetch(base)).status,401);
  server.broadcast({type:'busy',value:true});
  server.broadcast({type:'status',activity:'writing'});
  const response=await fetch(base,{headers:{'x-aibo-token':'pet-test'}});
  assert.equal(response.headers.get('cache-control'),'no-store');
  const state=await response.json();
  assert.equal(state.activity,'writing');assert.equal(state.busy,true);
  gaze={x:-200,y:500};
  const snapshot=async()=>(await (await fetch(`${base}?token=pet-test`)).json());
  assert.deepEqual((await snapshot()).gaze,gaze);
  server.broadcast({type:'busy',value:false});
  assert.equal((await snapshot()).gaze,null);
  assert.equal(gaze,null,'completion clears stale target');
  gaze={x:10,y:20};
  server.broadcast({type:'busy',value:true});
  assert.equal((await snapshot()).gaze,null,'new turn cannot inherit previous gaze');
  gaze={x:10,y:20};server.broadcast({type:'activity',activity:'failed'});
  assert.equal((await snapshot()).gaze,null,'failure clears target');
  server.clearBacklog();
  assert.equal((await (await fetch(`${base}?token=pet-test`)).json()).activity,'idle');
  console.log('PASS real HTTP pet snapshot, token auth, live broadcast and new-session reset');
} finally { server.stop(); }
