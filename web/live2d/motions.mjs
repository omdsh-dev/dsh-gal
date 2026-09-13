// Drive only the three native eye/mouth bindings. No synthetic mesh deformation.
export const durations={blink:.35,wink:1.3,talk:4};
export const demoActions=['blink','wink','talk'];
const clamp=v=>Math.max(0,Math.min(1,v));
export class MotionController {
 constructor({random=Math.random,reduced=false}={}){this.random=random;this.idle=!reduced;this.paused=false;this.action='idle';this.started=0;this.blinkAt=0;}
 play(name,now){if(name!=='idle'&&name!=='demo'&&!Object.hasOwn(durations,name))return false;this.action=name;this.started=now;this.paused=false;return true;}
 reset(now){this.play('idle',now);}
 sample(now,{speaking=false}={}){
  let action=this.action,t=Math.max(0,now-this.started),left=1,right=1,mouth=0;
  if(action==='demo'){let phase=t%8.05;for(const a of demoActions){const span=durations[a]+.8;if(phase<span){action=phase<durations[a]?a:'idle';t=phase;break;}phase-=span;}}
  else if(durations[action]&&t>=durations[action])this.action=action='idle';
  if(this.paused)action='paused';
  else {
   if(this.idle){if(!this.blinkAt)this.blinkAt=now+2+this.random()*3;if(now>=this.blinkAt){const p=(now-this.blinkAt)/.24;if(p<1)left=right=1-Math.sin(p*Math.PI);else this.blinkAt=now+2.5+this.random()*3.5;}}
   if(action==='blink')left=right=1-Math.sin(clamp(t/durations.blink)*Math.PI);
   if(action==='wink')left=1-Math.min(clamp(t/.15),clamp((durations.wink-t)/.2));
   if(action==='talk'||speaking)mouth=.35+.3*Math.sin(now*16);
  }
  return{action,left:clamp(left),right:clamp(right),mouth:clamp(mouth)};
 }
}
