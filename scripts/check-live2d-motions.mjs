import assert from 'node:assert/strict';
import {MotionController,durations} from '../web/live2d/motions.mjs';
for(const name of [...Object.keys(durations),'demo']){
 const m=new MotionController({random:()=>.5});assert(m.play(name,0));
 for(let t=0;t<20;t+=1/60){const s=m.sample(t);for(const key of ['left','right','mouth'])assert(s[key]>=0&&s[key]<=1);}
 if(name!=='demo')assert.equal(m.action,'idle');
}
const m=new MotionController({reduced:true});assert.equal(m.play('bow',0),false);
assert.deepEqual(m.sample(1),{action:'idle',left:1,right:1,mouth:0});
m.play('talk',2);m.play('wink',2.1);assert.equal(m.sample(2.3).action,'wink');
m.paused=true;assert.equal(m.sample(2.5,{speaking:true}).mouth,0);
m.reset(3);assert.equal(m.sample(3).action,'idle');
console.log('Passed: native eye/mouth actions, ranges, completion, interruptions, pause and reduced motion.');
