/* Shared presentation state. Emotion survives busy/speech transitions. */
(() => {
 const emotions=['neutral','thinking','happy','sad','surprised','excited'];
 let model=localStorage.getItem('gal-live2d-model')==='mao'?'mao':'xiaoheiyu';
 let emotion='neutral',busy=false,speaking=false,preview=null;
 let mode=localStorage.getItem('gal-character-renderer');
 if(!['live2d','sprite'].includes(mode))mode=new URLSearchParams(location.search).get('live2d')==='1'?'live2d':'sprite';
 const labels={zh:{title:'角色展示',sprite:'角色立绘',live2d:'Live2D',auto:'跟随对话',idle:'待机',thinking:'思考',happy:'开心',sad:'悲伤',surprised:'惊讶',excited:'兴奋',speaking:'说话'},en:{title:'Character display',sprite:'Character art',live2d:'Live2D',auto:'Follow dialogue',idle:'Idle',thinking:'Thinking',happy:'Happy',sad:'Sad',surprised:'Surprised',excited:'Excited',speaking:'Speaking'},ja:{title:'キャラ表示',sprite:'立ち絵',live2d:'Live2D',auto:'会話に従う',idle:'待機',thinking:'考え中',happy:'喜び',sad:'悲しみ',surprised:'驚き',excited:'興奮',speaking:'発話中'}};
 const text=key=>(labels[window.galVoice?.language]||labels.zh)[key]||key;
 const state=()=>({emotion:preview|| (busy?'thinking':emotion),activity:busy?'thinking':speaking?'speaking':'idle',mode,model,preview:Boolean(preview)});
 function publish(){document.body.dataset.characterRenderer=mode;document.body.dataset.live2dModel=model;window.dispatchEvent(new CustomEvent('gal-character-state',{detail:state()}));}
 const renderer=document.getElementById('character-renderer'),test=document.getElementById('character-state-preview');
 function render(){renderer.options[0].textContent=text('sprite');renderer.options[1].textContent=text('live2d');document.getElementById('character-renderer-label').textContent=text('title');for(const option of test.options)option.textContent=text(option.value==='auto'?'auto':option.value==='neutral'?'idle':option.value);}
 const debugToggle=document.getElementById('motion-debug-toggle'),debugPanel=document.getElementById('motion-debug-panel'),debugClose=document.getElementById('motion-debug-close');
 let debugEnabled=false;try{debugEnabled=localStorage.getItem('gal-motion-debug')==='true';}catch{}
 function renderDebug(){debugToggle.checked=debugEnabled;debugPanel.hidden=!debugEnabled||mode!=='live2d';debugClose.setAttribute('aria-label',({zh:'关闭动作调试',en:'Close motion preview',ja:'モーション確認を閉じる'})[window.galVoice?.language]||'Close motion preview');}
 function setDebug(value){debugEnabled=value;try{localStorage.setItem('gal-motion-debug',String(value));}catch{}renderDebug();}
 debugToggle.onchange=()=>setDebug(debugToggle.checked);
 debugClose.onclick=()=>{setDebug(false);document.getElementById('btn-char').focus();};
 window.addEventListener('gal-character-state',renderDebug);window.addEventListener('gal-language',renderDebug);renderDebug();
 const modelPicker=document.getElementById('live2d-model');modelPicker.value=model;modelPicker.onchange=()=>{model=modelPicker.value;localStorage.setItem('gal-live2d-model',model);mode='live2d';renderer.value=mode;localStorage.setItem('gal-character-renderer',mode);publish();};
 renderer.value=mode;renderer.onchange=()=>{mode=renderer.value;localStorage.setItem('gal-character-renderer',mode);publish();};
 test.onchange=()=>{preview=test.value==='auto'?null:test.value;publish();};
 window.addEventListener('gal-emotion',event=>{if(emotions.includes(event.detail.emotion))emotion=event.detail.emotion;publish();});
 window.addEventListener('gal-busy',event=>{busy=Boolean(event.detail.busy);publish();});
 window.addEventListener('gal-speaking',event=>{speaking=Boolean(event.detail.speaking);publish();});
 window.addEventListener('gal-character-changed',()=>{mode='sprite';renderer.value=mode;emotion='neutral';preview=null;test.value='auto';publish();});
 window.addEventListener('gal-renderer-error',event=>{mode='sprite';renderer.value=mode;publish();document.getElementById('ui-notice').textContent='Live2D 加载失败，已切回立绘：'+event.detail;});
 window.addEventListener('gal-language',()=>{render();publish();});
 window.galCharacter={get name(){return model==='mao'?'Mao · Live2D':window.galVoice.t('preview');},get state(){return state();},text};render();publish();
})();
