/* Shared presentation state. Emotion survives busy/speech transitions. */
(() => {
 const emotions=['neutral','thinking','happy','sad','surprised','excited'];
 let emotion='neutral',busy=false,speaking=false,preview=null;
 const labels={zh:{auto:'跟随对话',idle:'待机',thinking:'思考',happy:'开心',sad:'悲伤',surprised:'惊讶',excited:'兴奋',speaking:'说话'},en:{auto:'Follow dialogue',idle:'Idle',thinking:'Thinking',happy:'Happy',sad:'Sad',surprised:'Surprised',excited:'Excited',speaking:'Speaking'},ja:{auto:'会話に従う',idle:'待機',thinking:'考え中',happy:'喜び',sad:'悲しみ',surprised:'驚き',excited:'興奮',speaking:'発話中'}};
 const text=key=>(labels[window.galVoice?.language]||labels.zh)[key]||key;
 const state=()=>({emotion:preview|| (busy?'thinking':emotion),activity:busy?'thinking':speaking?'speaking':'idle',preview:Boolean(preview)});
 function publish(){window.dispatchEvent(new CustomEvent('gal-character-state',{detail:state()}));}
 const test=document.getElementById('character-state-preview');
 function render(){for(const option of test.options)option.textContent=text(option.value==='auto'?'auto':option.value==='neutral'?'idle':option.value);}
 test.onchange=()=>{preview=test.value==='auto'?null:test.value;publish();};
 window.addEventListener('gal-emotion',event=>{if(emotions.includes(event.detail.emotion))emotion=event.detail.emotion;publish();});
 window.addEventListener('gal-busy',event=>{busy=Boolean(event.detail.busy);publish();});
 window.addEventListener('gal-speaking',event=>{speaking=Boolean(event.detail.speaking);publish();});
 window.addEventListener('gal-character-changed',()=>{emotion='neutral';preview=null;test.value='auto';publish();});
 window.addEventListener('gal-language',()=>{render();publish();});
 window.galCharacter={get state(){return state();},text};render();publish();
})();
