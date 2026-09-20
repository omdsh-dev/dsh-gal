/* Shared presentation state: what she is doing, as the stage shows it.
 * Fed by harness signals only — no reading of her lines. Priority mirrors
 * src/activity.ts: preview → failed beat → waiting → running tool → reading
 * (busy) → done (turn just ended) → idle. Speech is tracked beside it. */
(() => {
 const activities=['idle','reading','writing','searching','running','waiting','failed','done'];
 const BEAT_MS={failed:2600};
 // "Done" is the afterglow of a finished turn: it stays while she delivers the
 // reply and fades on its own if nothing else happens.
 const DONE_MS=30000;
 let busy=false,speaking=false,tool=null,waiting=false,done=false,beat=null,beatTimer=null,doneTimer=null,preview=null;
 const labels={
  zh:{auto:'跟随对话',idle:'待机',reading:'在看',writing:'在写',searching:'在查',running:'在跑命令',waiting:'等你',failed:'出错了',done:'完成',speaking:'说话'},
  en:{auto:'Follow dialogue',idle:'Idle',reading:'Reading',writing:'Writing',searching:'Searching',running:'Running',waiting:'Waiting for you',failed:'Failed',done:'Done',speaking:'Speaking'},
  ja:{auto:'会話に従う',idle:'待機',reading:'読んでる',writing:'書いてる',searching:'調べてる',running:'実行中',waiting:'待ってる',failed:'失敗',done:'完了',speaking:'発話中'}};
 const text=key=>(labels[window.aiboVoice?.language]||labels.zh)[key]||key;
 const steady=()=>preview||beat||(waiting?'waiting':busy?(tool||'reading'):done?'done':'idle');
 const state=()=>({activity:steady(),speaking,busy,preview:Boolean(preview)});
 function publish(){window.dispatchEvent(new CustomEvent('aibo-character-state',{detail:state()}));}
 const test=document.getElementById('character-state-preview');
 function render(){for(const option of test.options)option.textContent=text(option.value);}
 test.onchange=()=>{preview=test.value==='auto'?null:test.value;publish();};
 function setDone(value){done=value;clearTimeout(doneTimer);if(value)doneTimer=setTimeout(()=>{done=false;publish();},DONE_MS);}
 // Steady signals: what the running tool is, whether she is blocked on you.
 window.addEventListener('aibo-activity',event=>{
  const activity=event.detail.activity;if(!activities.includes(activity))return;
  if(activity==='waiting'){waiting=true;}
  else if(activity==='done'){waiting=false;tool=null;setDone(true);}
  else if(activity==='reading'){waiting=false;tool=null;}
  else{waiting=false;tool=activity;}
  publish();
 });
 // A beat is a moment, not a state: it shows through for a bit, then hands
 // the stage back to whatever was underneath.
 window.addEventListener('aibo-beat',event=>{const activity=event.detail.activity;if(!activities.includes(activity))return;beat=activity;clearTimeout(beatTimer);beatTimer=setTimeout(()=>{beat=null;publish();},BEAT_MS[activity]||2600);publish();});
 window.addEventListener('aibo-preview',event=>{preview=activities.includes(event.detail.activity)?event.detail.activity:null;test.value=preview||'auto';publish();});
 window.addEventListener('aibo-busy',event=>{busy=Boolean(event.detail.busy);if(busy)setDone(false);else{tool=null;waiting=false;}publish();});
 window.addEventListener('aibo-speaking',event=>{speaking=Boolean(event.detail.speaking);publish();});
 window.addEventListener('aibo-character-changed',()=>{tool=null;waiting=false;beat=null;clearTimeout(beatTimer);setDone(false);preview=null;test.value='auto';publish();});
 window.addEventListener('aibo-language',()=>{render();publish();});
 window.aiboCharacter={get state(){return state();},text,activities};render();publish();
})();
