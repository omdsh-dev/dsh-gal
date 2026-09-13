/* Dialogue replay and persisted interface / speech language preferences. */
(() => {
  const $ = id => document.getElementById(id);
  const strings = {
    zh: { replay:'重读本段',stop:'停止朗读',voice:'自动朗读',mute:'已静音',skip:'显示全文',auto:'自动',log:'记录',char:'角色',edit:'设定',gallery:'立绘',hide:'隐藏',send:'发送',placeholder:'说点什么…（/help 查看命令）',system:'跟随系统',followUI:'跟随界面',greeting:'欢迎回来！我在，想聊什么就告诉我吧。',language:'界面语言',speechLanguage:'语音语言',ready:'',empty:'当前没有可朗读的文字',unavailable:'此语言的系统语音不可用',error:'朗读失败，请重试',playing:'正在朗读…',loading:'正在准备声音…',blocked:'点击“重读本段”播放语音',hint:'界面与语音可独立选择；选定的语音语言会先把台词改写成该语言再朗读',blink:'眨眼',wink:'单眼眨眼',talk:'口型演示',demo:'自动演示',reset:'停止演示',preview:'小黑鱼'},
    ja: { replay:'もう一度',stop:'読み上げ停止',voice:'自動音声',mute:'ミュート',skip:'全文表示',auto:'自動',log:'履歴',char:'キャラ',edit:'設定',gallery:'立ち絵',hide:'非表示',send:'送信',placeholder:'メッセージ…（/help）',system:'システムに従う',followUI:'表示言語に従う',greeting:'おかえりなさい！何でも話しかけてください。',language:'表示言語',speechLanguage:'音声言語',ready:'',empty:'読み上げる文章がありません',unavailable:'この言語の音声がありません',error:'読み上げに失敗しました',playing:'読み上げ中…',loading:'音声を準備中…',blocked:'「もう一度」を押して音声を再生',hint:'表示言語と音声は個別に選べます。セリフは音声の言語に書き換えてから読み上げます',blink:'まばたき',wink:'ウィンク',talk:'口の動き',demo:'自動デモ',reset:'デモ停止',preview:'小黒魚'},
    en: { replay:'Replay line',stop:'Stop voice',voice:'Auto voice',mute:'Muted',skip:'Reveal',auto:'Auto',log:'History',char:'Character',edit:'Settings',gallery:'Gallery',hide:'Hide',send:'Send',placeholder:'Say something… (/help)',system:'System language',followUI:'Follow interface',greeting:'Welcome back! I am listening — say something below.',language:'Interface',speechLanguage:'Speech',ready:'',empty:'No dialogue to read yet',unavailable:'No system voice for this language',error:'Could not play speech. Try again.',playing:'Speaking…',loading:'Preparing voice…',blocked:'Click Replay line to enable audio',hint:'Choose interface and speech independently; the line is rewritten into the speech language before it is read',blink:'Blink',wink:'Wink',talk:'Mouth demo',demo:'Auto demo',reset:'Stop demo',preview:'Xiaoheiyu'},
  };
  const browserLanguage=()=>{for(const tag of navigator.languages||[navigator.language]){const base=tag.toLowerCase().split(/[-_]/)[0];if(Object.hasOwn(strings,base))return base;}return 'en';};
  let uiPreference=localStorage.getItem('gal-language')||'auto';if(uiPreference!=='auto'&&!Object.hasOwn(strings,uiPreference))uiPreference='auto';
  let speechPreference=localStorage.getItem('gal-speech-language')||'auto';if(speechPreference!=='auto'&&!Object.hasOwn(strings,speechPreference))speechPreference='auto';
  let lang=uiPreference==='auto'?browserLanguage():uiPreference;
  let speechLang=speechPreference==='auto'?lang:speechPreference;
  let enabled=localStorage.getItem('gal-voice')!=='off';
  let autoBlocked=false;
  let message={id:null,text:''}, generation=0, currentUtterance=null;
  const audio=new Audio(), clips=new Map();
  let audioObjectUrl=null,request=null;
  const status=$('voice-feedback'), select=$('gal-language'),speechSelect=$('gal-speech-language');
  let statusKey='ready';
  const t=key=>strings[lang][key]??key;
  const notify=key=>{statusKey=key;status.textContent=t(key);};
  function speaking(value){window.dispatchEvent(new CustomEvent('gal-speaking',{detail:{speaking:value}}));}
  function stop(){autoBlocked=true;generation++;request?.abort();request=null;audio.pause();if(audioObjectUrl){URL.revokeObjectURL(audioObjectUrl);audioObjectUrl=null;}window.speechSynthesis?.cancel();currentUtterance=null;speaking(false);notify('ready');$('btn-stop-voice').disabled=true;}
  function render(){
    document.documentElement.lang=lang==='zh'?'zh-CN':lang;
    for(const [id,key] of Object.entries({'btn-replay':'replay','btn-stop-voice':'stop','btn-history':'log','btn-char':'char','btn-edit':'edit','btn-gallery':'gallery','btn-hide':'hide','btn-send':'send'}))$(id).textContent=t(key);
    $('btn-voice').textContent=t(enabled?'voice':'mute');$('btn-voice').classList.toggle('active',enabled);$('btn-voice').setAttribute('aria-pressed',String(enabled));
    $('input').placeholder=t('placeholder');$('language-label').textContent=t('language');select.value=uiPreference;select.title=t('hint');speechSelect.value=speechPreference;speechSelect.title=t('hint');$('speech-language-label').textContent=t('speechLanguage');status.textContent=t(statusKey);$('language-hint').textContent=t('hint');
    select.querySelector('[value=auto]').textContent=t('system');speechSelect.querySelector('[value=auto]').textContent=t('followUI');
    window.dispatchEvent(new CustomEvent('gal-language',{detail:{language:lang}}));
  }
  async function speak(text,clip,force=false){
    if(!enabled&&!force)return;
    stop();
    if(!text.trim()){notify('empty');return;}
    const ticket=generation;
    notify('loading');$('btn-stop-voice').disabled=false;
    request=new AbortController();
    try{
      const endpoint=window.galSpeechSettings?.api('/voice/read') || '/voice/read';
      const response=await fetch(endpoint,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text,language:speechLang,dub:true}),signal:request.signal});
      if(!response.ok){const body=await response.json().catch(()=>({error:'speech_error'}));throw new Error(body.error);}
      const blob=await response.blob();if(ticket!==generation)return;
      audioObjectUrl=URL.createObjectURL(blob);audio.src=audioObjectUrl;audio.currentTime=0;
      audio.onended=()=>{if(ticket===generation)stop();};
      audio.onerror=()=>{if(ticket===generation){stop();notify('error');}};
      await audio.play();
      if(ticket===generation){speaking(true);notify('playing');$('btn-stop-voice').disabled=false;}
    }catch(error){
      if(ticket!==generation)return;
      stop();
      if(error.name==='NotAllowedError')notify('blocked');
      else {notify('error');status.textContent=window.galSpeechSettings?.errorText(error.message)||t('error');}
    }
  }
  window.galVoice={
    greeting(value){if(value&&typeof value==='object')return value[lang]||value.en||Object.values(value)[0]||t('greeting');return value?value:t('greeting');},get enabled(){return enabled;},get language(){return lang;},get speechLanguage(){return speechLang;},t,
    stop,
    toggle(){enabled=!enabled;localStorage.setItem('gal-voice',enabled?'on':'off');if(!enabled)stop();render();return enabled;},
    setMessage(id,text){window.dispatchEvent(new Event('gal-dialogue-interrupt'));stop();message={id,text};$('btn-replay').disabled=!text.trim();autoBlocked=false;void speak(text,null);},
    receive(){ /* Legacy pre-generated VOICEVOX clips must not override the selected provider. */ },
    replay(){return speak(message.text,message.id?clips.get(message.id):null,true);},
  };
  $('btn-replay').onclick=()=>window.galVoice.replay();$('btn-stop-voice').onclick=stop;
  function resolvePreferences(){const next=uiPreference==='auto'?browserLanguage():uiPreference;const voice=speechPreference==='auto'?next:speechPreference;if(voice!==speechLang)stop();lang=next;speechLang=voice;render();}
  select.onchange=()=>{uiPreference=select.value;localStorage.setItem('gal-language',uiPreference);resolvePreferences();};
  speechSelect.onchange=()=>{speechPreference=speechSelect.value;localStorage.setItem('gal-speech-language',speechPreference);resolvePreferences();};
  window.addEventListener('languagechange',resolvePreferences);
  window.addEventListener('pagehide',stop);render();
})();
