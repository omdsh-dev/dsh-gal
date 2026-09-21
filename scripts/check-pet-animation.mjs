import assert from 'node:assert/strict';
import {atlasLayout, clips, sequence, lookFrame, presentation, memes, nextMeme, memeDelay} from '../app/ui/pet-model.js';
assert.deepEqual(Object.values(clips).map(a=>a.length),[6,8,8,4,5,8,6,6,6,8]);
assert.equal(Object.values(clips).reduce((n,a)=>n+a.length,16),81);
assert.equal(atlasLayout.rows,15);
for(const [action,clip] of Object.entries(clips)) {
  const s=sequence(action);
  if(action==='idle') {assert.equal(s.loopStart,0); assert.equal(s.frames[0].ms,1680);}
  else {
    assert.equal(s.loopStart,clip.length*3);
    assert.deepEqual(s.frames.slice(0,clip.length),clip);
    assert.equal(s.frames[s.loopStart].row,0,'action returns to idle after three cycles');
    assert.equal(s.frames[s.loopStart].ms,1680);
  }
  const still=sequence(action,true);assert.equal(still.frames.length,1);assert.equal(still.loopStart,null);
  const held=sequence(action,false,true);assert.equal(held.frames.length,clip.length);assert.equal(held.loopStart,0);
}
const rect={x:100,y:100,width:180,height:180};
const cx=190,cy=190;
for(let i=0;i<16;i++) {
  const radians=i*22.5*Math.PI/180;
  assert.deepEqual(lookFrame(cx+300*Math.sin(radians),cy-300*Math.cos(radians),rect),{row:9+Math.floor(i/8),column:i%8,ms:0});
}
assert.equal(lookFrame(cx,cy,rect),null);
assert.equal(presentation({activity:'done',revision:1},true,-1).action,'review');
assert.equal(presentation({activity:'speaking',revision:1},true,-1).action,'waving');
assert.equal(presentation({activity:'searching',revision:1},true,-1).action,'running');
console.log('PASS 81 frame contract, exact Codex clip counts, three-cycle settling, 6x idle timing, 16 gaze angles, held loops and reduced motion');

assert.equal(Object.values(memes).flat().length,24);
assert.equal(memeDelay(0),30000);assert.equal(memeDelay(1),60000);
for(const [name,frames] of Object.entries(memes)) {
  assert.equal(sequence(name).loopStart,null,'meme returns to idle after one pass');
  assert.equal(sequence(name,true).frames.length,1);
  for(const random of [0,.3,.7,1])assert.notEqual(nextMeme(name,random),name);
  assert.ok(frames.reduce((total,frame)=>total+frame.ms,0)<10000);
}
console.log('PASS 24 meme frames, bounded duration, cooldown and no immediate repeats');
