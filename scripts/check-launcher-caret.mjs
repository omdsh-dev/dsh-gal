import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const handlers=new Map(), documentEvents=new Map(), windowEvents=new Map(), events=new Map(), calls=[];
let focus=true, scheduled;
const input={value:'你好abcd',selectionStart:2,selectionEnd:4,selectionDirection:'forward',scrollLeft:0,
  addEventListener:(name,fn)=>handlers.set(name,fn), getBoundingClientRect:()=>({left:100,top:30,width:90,height:28})};
const mirror={style:{},textContent:'',setAttribute(){},getBoundingClientRect(){return {width:this.textContent.length*10}}};
const document={activeElement:input,hasFocus:()=>focus,getElementById:()=>input,createElement:()=>mirror,body:{append(){}},addEventListener:(name,fn)=>documentEvents.set(name,fn)};
vm.runInNewContext(fs.readFileSync(new URL('../app/ui/launcher-caret.js',import.meta.url),'utf8'),{
  document,console,requestAnimationFrame:fn=>{scheduled=fn;return 1},cancelAnimationFrame(){scheduled=undefined},ResizeObserver:class{observe(){}},
  getComputedStyle:()=>({font:'14px sans-serif',letterSpacing:'0px',textTransform:'none',paddingLeft:'8px',paddingRight:'8px',borderLeftWidth:'0px',borderRightWidth:'0px'}),
  window:{addEventListener:(name,fn)=>windowEvents.set(name,fn),__TAURI__:{core:{invoke:async(name,args)=>calls.push({name,args})},event:{listen:(name,fn)=>events.set(name,fn)}}}
});
const flush=()=>scheduled();
const point=()=>JSON.parse(JSON.stringify(calls.at(-1).args.point));
flush();assert.deepEqual(point(),[148,44]);
input.selectionDirection='backward';documentEvents.get('selectionchange')();flush();assert.deepEqual(point(),[128,44]);
input.scrollLeft=200;handlers.get('scroll')();flush();assert.deepEqual(point(),[108,44],'scrolled caret is clipped to input');
input.scrollLeft=0;input.value='x'.repeat(100);input.selectionEnd=100;input.selectionDirection='forward';handlers.get('input')();flush();assert.deepEqual(point(),[182,44]);
focus=false;windowEvents.get('blur')();flush();assert.equal(point(),null,'losing window focus clears gaze');
focus=true;document.activeElement={};handlers.get('blur')();flush();assert.equal(point(),null,'focusing a button clears gaze');
document.activeElement=input;events.get('aibo://launcher-open')();flush();assert.deepEqual(point(),[182,44]);
assert.ok(calls.every(({name,args})=>name==='pet_caret' && Object.keys(args).join()==='point'),'only coordinates leave launcher');
console.log('PASS caret measurement, selection direction, scroll clipping, blur, reopen and coordinate-only IPC');
