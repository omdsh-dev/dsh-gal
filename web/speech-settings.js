/* Provider settings; credentials are write-only and held by the local server. */
(() => {
  const $ = id => document.getElementById(id);
  const copy = {
    zh: {title:'设置',language:'配置语言',provider:'语音服务',model:'模型',voice:'音色 ID',key:'API Key',keyHint:'Key 仅保存在本机配置文件，不会包含在角色导出中。留空保留已有 Key。',savedKey:'已保存 Key · 留空保留',newKey:'填写此服务的 API Key',save:'保存设置',test:'试听当前设置',stop:'停止试听',saved:'已保存',saving:'正在保存…',loading:'正在生成试听…',playing:'正在播放试听…',done:'试听结束',local:'本地系统语音 · 免费',localHint:'使用这台 Mac 已安装的系统音色。无需 Key，不上传对白。',voicevoxHint:'本地免费日语模型，需要启动 VOICEVOX（端口 50021）。音色 ID 为 speaker style ID。',cloudHint:'使用你自己的账号额度；试听和对白会发送给所选服务，可能产生费用。语音语言不会翻译对白。',docs:'查看音色 / API 文档',clear:'删除此服务已保存的 Key',cancel:'关闭 / ESC',choose:'先试听，再选择适合角色的声音。每种语言独立保存。',discard:'切换前请保存当前设置；未保存的修改会丢弃。',voiceHint:'从服务商的音色库复制 Voice ID；Fish Audio 使用 reference_id。',key_required:'请先填写 API Key',voice_required:'请填写音色 ID',auth_error:'Key 无效或没有权限，请检查账号和服务区域',quota_error:'额度不足或请求过于频繁，请检查账号后重试',network_error:'无法连接语音服务，请检查网络或本地引擎',timeout:'语音生成超时，请重试',local_unavailable:'本地系统音色不可用，请检查已安装的系统语音',invalid_text:'没有可朗读的文字，或文字过长',invalid_settings:'语音设置无效，请重新选择',invalid_audio:'服务未返回有效音频',config_error:'无法读取语音配置',speech_error:'语音生成失败，请重试',provider_error:'服务拒绝请求，请检查模型、音色和账号额度'},
    en: {title:'Settings',language:'Configure language',provider:'Provider',model:'Model',voice:'Voice ID',key:'API Key',keyHint:'Keys stay in a local configuration file, outside character exports. Leave blank to keep the saved key.',savedKey:'Key saved · leave blank to keep',newKey:'Enter your API key',save:'Save settings',test:'Preview these settings',stop:'Stop preview',saved:'Saved',saving:'Saving…',loading:'Generating preview…',playing:'Playing preview…',done:'Preview finished',local:'Local system voice · Free',localHint:'Uses installed Mac system voices. No key and no dialogue upload.',voicevoxHint:'Free local Japanese model. Start VOICEVOX on port 50021; use a speaker style ID.',cloudHint:'Uses your account quota. Preview and dialogue text go to this provider and may incur charges. Speech language does not translate dialogue.',docs:'Voice / API documentation',clear:'Delete the saved key for this provider',cancel:'Close / ESC',choose:'Preview a voice for your character. Each language has its own settings.',discard:'Save before switching. Unsaved changes will be discarded.',voiceHint:'Copy a Voice ID from the provider. Fish Audio uses reference_id.',key_required:'Enter an API key first',voice_required:'Enter a voice ID',auth_error:'Invalid key or permission. Check account and region.',quota_error:'Quota or rate limit reached',network_error:'Cannot reach the provider or local engine',timeout:'Speech request timed out',local_unavailable:'Local system voice unavailable',invalid_text:'No speakable text, or text too long',invalid_settings:'Invalid voice settings',invalid_audio:'No valid audio returned',config_error:'Cannot read voice configuration',speech_error:'Speech failed. Please retry.',provider_error:'Request rejected. Check model, voice and account quota.'},
    ja: {title:'設定',language:'設定する言語',provider:'音声サービス',model:'モデル',voice:'音声 ID',key:'API Key',keyHint:'キーはこの端末の設定ファイルに保存され、キャラの書き出しには含まれません。空欄で既存のキーを保持します。',savedKey:'保存済み · 空欄で保持',newKey:'API キーを入力',save:'設定を保存',test:'現在の設定を試聴',stop:'試聴を停止',saved:'保存しました',saving:'保存中…',loading:'試聴を生成中…',playing:'試聴中…',done:'試聴終了',local:'ローカルシステム音声 · 無料',localHint:'Mac のインストール済み音声を使用。キー不要、台詞は送信されません。',voicevoxHint:'無料の日本語モデル。ポート 50021 で VOICEVOX を起動し、スタイル ID を指定してください。',cloudHint:'自分のアカウント枠を使用します。試聴と台詞は選択したサービスに送信され、料金が発生する場合があります。台詞は翻訳されません。',docs:'音声 / API ドキュメント',clear:'このサービスの保存済みキーを削除',cancel:'閉じる / ESC',choose:'キャラに合う声を試聴。言語ごとに個別保存します。',discard:'切り替える前に保存してください。未保存の変更は破棄されます。',voiceHint:'サービスから音声 ID をコピー。Fish Audio は reference_id を使用。',key_required:'API キーを入力してください',voice_required:'音声 ID を入力してください',auth_error:'キーまたは権限が無効です。地域も確認してください',quota_error:'利用枠またはレート制限に達しました',network_error:'音声サービスに接続できません',timeout:'音声生成がタイムアウトしました',local_unavailable:'ローカル音声を利用できません',invalid_text:'読み上げる文字がないか、長すぎます',invalid_settings:'音声設定が無効です',invalid_audio:'有効な音声が返されませんでした',config_error:'音声設定を読み込めません',speech_error:'音声生成に失敗しました',provider_error:'モデル、音声、利用枠を確認してください'}
  };

  Object.assign(copy.zh,{localVoice:'角色 / 音色',refreshVoices:'刷新音色',voicesLoading:'正在读取本地音色…',voicesEmpty:'当前语言没有可用音色。请先在系统中安装声音。',voicesError:'无法读取音色列表。请确认本地语音服务已启动后重试。',voicesMissing:'已保存音色（当前不可用）'});
  Object.assign(copy.en,{localVoice:'Character / voice',refreshVoices:'Refresh voices',voicesLoading:'Loading local voices…',voicesEmpty:'No voices for this language. Install a system voice first.',voicesError:'Cannot load voices. Check the local speech service and retry.',voicesMissing:'Saved voice (unavailable)'});
  Object.assign(copy.ja,{localVoice:'キャラクター / 音声',refreshVoices:'音声を再読み込み',voicesLoading:'音声を読み込み中…',voicesEmpty:'この言語の音声がありません。システム音声を追加してください。',voicesError:'音声を取得できません。ローカル音声サービスを確認してください。',voicesMissing:'保存済み音声（利用不可）'});
  const t = key => copy[window.galVoice?.language || 'zh'][key] || copy.en[key] || key;
  let config = null, language = 'zh', request = null, audio = null, objectUrl = null, sequence = 0, loadSequence = 0;
  const api = path => { const token = new URLSearchParams(location.search).get('token');return token ? `${path}${path.includes('?')?'&':'?'}token=${encodeURIComponent(token)}` : path; };
  const errorText = code => {const [name,detail] = String(code).split(':');return t(name in copy.en ? name : 'speech_error') + (detail ? ` (${detail})` : '');};
  const report = key => $('speech-status').textContent = t(key);
  function stop() {sequence++;request?.abort();request=null;audio?.pause();audio=null;if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;$('speech-stop').disabled=true;}
  let voicesRequest=null,voicesSequence=0,voiceReady=true,voicesStatus='';
  const isLocal=()=>['local','voicevox'].includes($('speech-provider').value);
  function voiceActions(){ $('speech-test').disabled=!voiceReady;$('speech-save').disabled=!voiceReady; }
  function voiceLabel(){document.querySelector('[data-speech-text=voice]').textContent=t(isLocal()?'localVoice':'voice');$('speech-voices-status').textContent=voicesStatus?t(voicesStatus):'';}
  async function loadVoices(){
    voicesRequest?.abort();const ticket=++voicesSequence;const provider=$('speech-provider').value;
    if(!isLocal())return;
    voicesRequest=new AbortController();voiceReady=false;voicesStatus='voicesLoading';voiceActions();voiceLabel();
    const select=$('speech-local-voice'),saved=$('speech-voice').value;select.disabled=true;select.replaceChildren(new Option(t('voicesLoading'),''));
    try {
      const response=await fetch(api('/voice/voices?provider='+encodeURIComponent(provider)+'&language='+language),{signal:voicesRequest.signal});if(!response.ok)throw new Error('voicesError');const {voices}=await response.json();if(ticket!==voicesSequence)return;
      select.replaceChildren(...voices.map(v=>{let locale=v.locale;try{locale=new Intl.DisplayNames([window.galVoice.language==='zh'?'zh-CN':window.galVoice.language],{type:'language'}).of(v.locale.replace('_','-'));}catch{}return new Option(provider==='local'?`${v.name.replace(/\s+\(.*\)$/,'')} · ${locale}`:v.name,v.id);}));
      if(saved&&!voices.some(v=>v.id===saved)){const missing=new Option(`${saved} · ${t('voicesMissing')}`,saved);missing.disabled=true;select.prepend(missing);}
      if(saved)select.value=saved;else select.value=voices[0]?.id||'';
      $('speech-voice').value=select.value;voiceReady=voices.some(v=>v.id===select.value);select.disabled=!voices.length;voicesStatus=voices.length?'':'voicesEmpty';
    }catch(error){if(ticket!==voicesSequence)return;voicesStatus='voicesError';select.replaceChildren(new Option(t('voicesError'),''));select.disabled=true;}
    voiceActions();voiceLabel();
  }
  function selected(){return config.catalog.find(p=>p.id===$('speech-provider').value);}
  function renderFields(profile) {
    const p = selected();
    $('speech-model').replaceChildren(...p.models.map(id=>new Option(id==='system'?t('local'):id,id)));
    $('speech-model').value=profile?.model || p.models[0];
    $('speech-voice').value=profile?.voice || p.voices[language] || '';
    const local=isLocal();$('speech-voice').hidden=local;$('speech-voice').disabled=local;$('speech-voice').required=!local;$('speech-voice').readOnly=false;
    $('speech-local-voice').hidden=!local;$('speech-refresh-voices').hidden=!local;
    voicesRequest?.abort();voicesSequence++;voicesStatus='';voiceReady=!local;voiceActions();voiceLabel();if(local)void loadVoices();
    $('speech-key').value='';$('speech-clear-key').checked=false;
    $('speech-key-fields').hidden=!p.key;
    $('speech-voice-hint').hidden=!p.key;
    $('speech-model').disabled=p.id==='local'||p.id==='voicevox';
    $('speech-key').placeholder=t(config.hasKeys[p.id]?'savedKey':'newKey');
    $('speech-clear-key').disabled=!config.hasKeys[p.id];
    $('speech-description').textContent=t(p.id==='local'?'localHint':p.id==='voicevox'?'voicevoxHint':'cloudHint');
    $('speech-docs').hidden=!p.docs;$('speech-docs').href=p.docs || '#';
    $('speech-status').textContent='';
  }
  function renderLanguage() {
    language=$('speech-edit-language').value;
    const profile=config.profiles[language];
    $('speech-provider').replaceChildren(...config.catalog.filter(p=>p.languages.includes(language)).map(p=>new Option(p.id==='local'?t('local'):p.name,p.id)));
    $('speech-provider').value=profile.provider;
    renderFields(profile);
  }
  function translate() {
    for(const node of document.querySelectorAll('[data-speech-text]'))node.textContent=t(node.dataset.speechText);
    $('btn-speech-settings').textContent=t('title');voiceLabel();
  }
  function payload() {return {language,profile:{provider:$('speech-provider').value,model:$('speech-model').value,voice:$('speech-voice').value.trim()},apiKey:$('speech-key').value.trim(),clearKey:$('speech-clear-key').checked};}
  async function load() {
    const ticket=++loadSequence;
    $('speech-form').hidden=true;report('loading');
    try {const response=await fetch(api('/voice/config'));if(!response.ok)throw new Error('config_error');const result=await response.json();if(ticket!==loadSequence)return;config=result;$('speech-edit-language').value=window.galVoice.speechLanguage;renderLanguage();$('speech-form').hidden=false;}
    catch(error){if(ticket===loadSequence)$('speech-status').textContent=errorText(error.message);}
  }
  $('speech-local-voice').onchange=()=>{stop();$('speech-voice').value=$('speech-local-voice').value;voiceReady=!!$('speech-local-voice').value;voicesStatus='';voiceActions();voiceLabel();};
  $('speech-refresh-voices').onclick=()=>{stop();void loadVoices();};
  $('speech-edit-language').onchange=()=>{stop();renderLanguage();};
  $('speech-provider').onchange=()=>{stop();renderFields();};
  $('speech-model').onchange=stop;$('speech-voice').oninput=stop;$('speech-key').oninput=stop;
  $('speech-clear-key').onchange=()=>{stop();if($('speech-clear-key').checked)$('speech-key').value='';};
  $('speech-form').onsubmit=async event=>{
    event.preventDefault();if(!voiceReady)return;stop();window.galVoice.stop();const ticket=sequence;report('saving');$('speech-save').disabled=true;
    try {const response=await fetch(api('/voice/config'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload())});const result=await response.json();if(!response.ok)throw new Error(result.error);if(ticket!==sequence)return;config=result;renderLanguage();report('saved');}
    catch(error){if(ticket===sequence)$('speech-status').textContent=errorText(error.message);}
    finally{voiceActions();}
  };
  $('speech-test').onclick=async()=>{
    if(!voiceReady)return;stop();window.galVoice.stop();const ticket=sequence;const body=payload();
    if(body.clearKey&&!body.apiKey&&selected().key){$('speech-status').textContent=errorText('key_required');return;}
    body.text={zh:'你好，我是小黑鱼。今天想和我聊些什么呢？',en:'Hello, I am here. What would you like to talk about today?',ja:'こんにちは。今日はどんなお話をしましょうか。'}[language];
    request=new AbortController();report('loading');$('speech-stop').disabled=false;
    try {const response=await fetch(api('/voice/read'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body),signal:request.signal});if(!response.ok)throw new Error((await response.json()).error);const blob=await response.blob();if(ticket!==sequence)return;objectUrl=URL.createObjectURL(blob);audio=new Audio(objectUrl);audio.onended=()=>{if(ticket===sequence){stop();report('done');}};audio.onerror=()=>{if(ticket===sequence){stop();report('speech_error');}};await audio.play();if(ticket===sequence)report('playing');}
    catch(error){if(ticket!==sequence)return;stop();$('speech-status').textContent=errorText(error.message);}
  };
  $('speech-stop').onclick=()=>{stop();$('speech-status').textContent='';};
  window.addEventListener('gal-overlay-closed',()=>{loadSequence++;voicesSequence++;voicesRequest?.abort();stop();$('speech-key').value='';});
  window.addEventListener('gal-dialogue-interrupt',()=>{stop();$('speech-status').textContent='';});
  window.addEventListener('pagehide',stop);
  window.addEventListener('gal-language',translate);
  window.galSpeechSettings={load,errorText,api};translate();
})();
