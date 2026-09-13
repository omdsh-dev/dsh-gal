/* dsh-gal frontend: visual-novel presentation of a dsh session.
 * Talks to the plugin server: GET /manifest.json, GET /events (SSE), POST /send.
 */
(() => {
  const qs = new URLSearchParams(location.search);
  const token = qs.get('token') ?? '';
  const withToken = (path) => token ? `${path}${path.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}` : path;

  const $ = (id) => document.getElementById(id);
  const layerA = $('layer-a'), layerB = $('layer-b'), layerImg = $('layer-img');
  const dialogueText = $('dialogue-text');
  const ticker = $('ticker'), tickerText = $('ticker-text');
  const historyEl = $('history'), historyList = $('history-list');
  const input = $('input'), btnSend = $('btn-send');
  const emotionTag = $('emotion-tag');

  let manifest = { characterName: '', defaultEmotion: 'neutral', emotions: {}, characters: [] };

  // ---------- character manifest / theme ----------
  function applyManifest(m) {
    if(manifest.characterId && manifest.characterId!==m.characterId)window.dispatchEvent(new Event('gal-character-changed'));
    manifest = m;
    $('char-name').textContent = m.characterName;
    document.title = `${m.characterName} · dsh-gal`;
    const theme = m.theme || {};
    const root = document.documentElement.style;
    theme.accent ? root.setProperty('--accent', theme.accent) : root.removeProperty('--accent');
    theme.frame ? root.setProperty('--frame', theme.frame) : root.removeProperty('--frame');
    theme.box ? root.setProperty('--box-bg', theme.box) : root.removeProperty('--box-bg');
    renderCharacterList();
    currentEmotion = '';
    const hasArt = Object.keys(m.emotions || {}).length > 0;
    $('placeholder').classList.toggle('hidden', hasArt);
    if (!hasArt) {
      for (const layer of [layerA, layerB]) { layer.classList.remove('visible'); layer.removeAttribute('src'); }
      layerImg.classList.remove('visible');
      activeLayer = null;
    }
    setEmotion(m.defaultEmotion);
    currentEmotion='';renderSprite(window.galCharacter.state.emotion);
  }

  window.addEventListener('gal-character-state',event=>{
    const state=event.detail;
    const name=manifest.characterName;
    $('char-name').textContent=name;document.title=`${name} · dsh-gal`;
    emotionTag.textContent=window.galCharacter.text(state.emotion==='neutral'?'idle':state.emotion);
    renderSprite(state.emotion);
  });

  function renderCharacterList() {
    const list = $('char-list');
    list.textContent = '';
    for (const entry of manifest.characters || []) {
      const btn = window.galUi.button();
      btn.type = 'button';
      btn.className += ' char-option' + (entry.id === manifest.characterId ? ' active' : '');
      btn.textContent = entry.promptOnly ? `${entry.name} (prompt only)` : entry.name;
      btn.title = entry.id;
      btn.addEventListener('click', async () => {
        closeOverlays();
        if (entry.id === manifest.characterId) return;
        try {
          const res = await fetch(withToken('/character'), {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: entry.id }),
          });
          if (!res.ok) throw new Error(await res.text());
        } catch (err) {
          msgQueue.push({ text: `(failed to switch character: ${err.message})`, emotion: 'sad' });
          playNext();
        }
      });
      list.appendChild(btn);
    }
  }
  function toggleCharPicker() { showOverlay('char-picker', $('char-picker').classList.contains('hidden')); }

  // ---------- overlays: editor + gallery ----------
  const overlayIds=['character-hub','history','help-panel','speech-panel'];
  let overlayRequest=0,returnFocus=null;
  const activeOverlay=()=>overlayIds.map($).find(el=>!el.classList.contains('hidden'));
  function closeOverlays(){
    overlayRequest++;
    const open=activeOverlay();
    if(open)window.dispatchEvent(new Event('gal-overlay-closed'));
    [...overlayIds,'editor','gallery','char-picker'].forEach(id=>$(id).classList.add('hidden'));
    document.querySelectorAll('#gallery video').forEach(v=>v.pause());
    window.galUi.close();
    if(open){(returnFocus?.isConnected?returnFocus:input).focus();returnFocus=null;}
  }
  function showOverlay(id,value){
    if(!value){closeOverlays();return;}
    const origin=returnFocus||document.activeElement;
    closeOverlays();returnFocus=origin;
    if(['editor','gallery','char-picker'].includes(id)){
      const view=id;$('character-hub').classList.remove('hidden');$(view).classList.remove('hidden');
      document.querySelectorAll('[data-character-view]').forEach(button=>{button.classList.toggle('active',button.dataset.characterView===view);button.setAttribute('aria-pressed',String(button.dataset.characterView===view));});
      id='character-hub';
    }
    $(id).classList.remove('hidden');
    window.galUi.open(id);
    const first=[...$(id).querySelectorAll('button,input,textarea,select')].find(el=>!el.disabled&&el.tabIndex>=0&&el.getClientRects().length);
    (first||$(id).closest('[role=dialog]')).focus();
  }
  window.addEventListener('gal-request-close',closeOverlays);
  $('btn-help').onclick=()=>showHelp();
  $('btn-restore').onclick=()=>setUiHidden(false);
  $('btn-speech-settings').onclick=()=>{window.galVoice.stop();showOverlay('speech-panel',true);void window.galSpeechSettings.load();};
  document.querySelectorAll('.overlay-close').forEach(btn=>btn.addEventListener('click',closeOverlays));
  document.addEventListener('keydown',ev=>{
    if(ev.isComposing)return;
    if(ev.key==='Escape'){ev.preventDefault();ev.stopImmediatePropagation();closeOverlays();setUiHidden(false);return;}
    const modal=activeOverlay();if(!modal)return;
    if(!ev.target.closest('input,textarea,select,button,[contenteditable=true]'))ev.stopImmediatePropagation();
  },true);

  let characterConfig = null;
  async function loadCharacterConfig() {
    const res = await fetch(withToken('/character/config'));
    if (!res.ok) throw new Error(await res.text());
    characterConfig = await res.json();
    return characterConfig;
  }
  async function openEditor() {
    const ticket=++overlayRequest;
    try {
      const c = await loadCharacterConfig();
      if(ticket!==overlayRequest)return;
      $('editor-title').textContent = `${c.name} · persona & memory`;
      $('ed-name').value = c.name;
      $('ed-greeting').value = window.galVoice.greeting(c.greeting);
      $('ed-persona').value = c.persona;
      $('ed-memory').value = c.memory;
      $('ed-rate').value = c.playbackRate || 1;
      fillVoiceSelect(c.voiceSpeaker);
      const art = c.art || {};
      $('ed-art').classList.toggle('hidden', !c.promptOnly);
      if (c.promptOnly) {
        $('ed-art-dir').textContent = c.userDir;
        $('ed-art-base').value = art.base || '';
        $('ed-art-expr').value = Object.entries(art.expressions || {}).map(([k, v]) => `${k}: ${v}`).join('\n');
        $('ed-art-motion').value = art.motion || '';
      }
      $('ed-path').textContent = c.bundled ? `${c.dir} (bundled — saving copies it to ~/.dsh/gal/characters/${c.id})` : c.dir;
      showOverlay('editor', true);
    } catch (err) { say(`(failed to load character config: ${err.message})`, 'sad'); }
  }
  $('editor-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const body = {
      name: $('ed-name').value, greeting: $('ed-greeting').value,
      persona: $('ed-persona').value, memory: $('ed-memory').value,
      playbackRate: Number($('ed-rate').value) || 1,
    };
    if ($('ed-voice').value !== '') body.voiceSpeaker = Number($('ed-voice').value);
    try {
      const res = await fetch(withToken('/character/config'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(await res.text());
      characterConfig = await res.json();
      $('ed-path').textContent = characterConfig.dir;
      manifest.playbackRate = characterConfig.playbackRate || 1;
      for (const layer of [layerA, layerB]) layer.playbackRate = manifest.playbackRate;
      showOverlay('editor', false);
      say('Saved. The new persona and memory apply from the next reply.', 'happy');
    } catch (err) { say(`(save failed: ${err.message})`, 'sad'); }
  });

  async function fillVoiceSelect(current) {
    const sel = $('ed-voice');
    sel.textContent = '';
    const none = document.createElement('option'); none.value = ''; none.textContent = 'default (plugin config)'; sel.appendChild(none);
    try {
      const res = await fetch(withToken('/voice/speakers'));
      const data = await res.json();
      $('ed-voice-state').textContent = data.available ? 'VOICEVOX running' : 'VOICEVOX not running — start it to pick a voice';
      for (const sp of data.speakers || []) {
        for (const st of sp.styles || []) {
          const opt = document.createElement('option');
          opt.value = String(st.id); opt.textContent = `${sp.name} · ${st.name} (#${st.id})`;
          if (current === st.id) opt.selected = true;
          sel.appendChild(opt);
        }
      }
      if (current !== undefined && current !== null && sel.value === '') {
        const opt = document.createElement('option'); opt.value = String(current); opt.textContent = `#${current}`; opt.selected = true; sel.appendChild(opt);
      }
    } catch (err) { $('ed-voice-state').textContent = `voice list unavailable: ${err.message}`; }
  }

  async function openGallery() {
    const ticket=++overlayRequest;
    try {
      const c = await loadCharacterConfig();
      if(ticket!==overlayRequest)return;
      $('gallery-title').textContent = `${c.name} · sprites & loops`;
      const grid = $('gallery-grid');
      grid.textContent = '';
      for (const asset of c.assets) {
        const tile = document.createElement('div');
        tile.className = 'g-tile' + (asset.image || asset.video ? '' : ' missing');
        const media = document.createElement(asset.video ? 'video' : 'img');
        if (asset.video) { media.src = withToken(`/character/${encodeURIComponent(asset.video)}`); media.muted = true; media.loop = true; media.playsInline = true; media.autoplay = true; }
        else if (asset.image) media.src = withToken(`/character/${encodeURIComponent(asset.image)}`);
        const cap = document.createElement('div');
        cap.className = 'g-cap';
        cap.textContent = `${asset.emotion}${asset.video ? ' · ' + asset.video : ''}${asset.image ? ' · ' + asset.image : ''}${asset.image || asset.video ? '' : ' · missing'}`;
        const up = window.galUi.button();
        up.type = 'button'; up.className += ' g-up'; up.textContent = '↑'; up.title = `Upload a .png or .mp4 for ${asset.emotion}`;
        up.addEventListener('click', (ev) => { ev.stopPropagation(); pickAsset(asset.emotion); });
        tile.append(media, cap, up);
        tile.addEventListener('click', () => { if (manifest.emotions[asset.emotion]) { setEmotion(asset.emotion); } });
        tile.addEventListener('dragover', (ev) => { ev.preventDefault(); tile.classList.add('drop'); });
        tile.addEventListener('dragleave', () => tile.classList.remove('drop'));
        tile.addEventListener('drop', (ev) => {
          ev.preventDefault(); tile.classList.remove('drop');
          const file = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
          if (file) uploadAsset(asset.emotion, file);
        });
        grid.appendChild(tile);
      }
      showOverlay('gallery', true);
    } catch (err) { say(`(failed to load assets: ${err.message})`, 'sad'); }
  }
  $('btn-edit').addEventListener('click', openEditor);
  $('btn-gallery').addEventListener('click', openGallery);

  // ---------- asset upload / pack import & export ----------
  window.addEventListener('dragover', (ev) => ev.preventDefault());
  window.addEventListener('drop', (ev) => ev.preventDefault());
  const MIME_BY_EXT = { png: 'image/png', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', mp4: 'video/mp4', webm: 'video/webm' };
  function pickAsset(emotion) {
    const input = $('asset-file');
    input.value = '';
    input.onchange = () => { if (input.files[0]) uploadAsset(emotion, input.files[0]); };
    input.click();
  }
  async function uploadAsset(emotion, file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const type = MIME_BY_EXT[ext] || file.type;
    if (!type) { say(`(unsupported file: ${file.name})`, 'sad'); return; }
    $('gallery-title').textContent = `uploading ${emotion} · ${file.name}…`;
    try {
      const res = await fetch(withToken(`/character/asset?emotion=${encodeURIComponent(emotion)}`), { method: 'PUT', headers: { 'content-type': type }, body: file });
      if (!res.ok) throw new Error(await res.text());
      await openGallery();
      say(`Saved ${file.name} as ${emotion}.`, 'happy');
    } catch (err) { say(`(upload failed: ${err.message})`, 'sad'); await openGallery().catch(() => {}); }
  }
  $('btn-import').addEventListener('click', () => {
    const input = $('import-file');
    input.value = '';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      closeOverlays();
      const hint = file.name.replace(/\.zip$/i, '').replace(/-pack$/i, '');
      say(`Importing ${file.name}…`, 'thinking');
      try {
        const res = await fetch(withToken(`/character/import?id=${encodeURIComponent(hint)}`), { method: 'POST', headers: { 'content-type': 'application/zip' }, body: file });
        if (!res.ok) throw new Error(await res.text());
        const { id } = await res.json();
        const sw = await fetch(withToken('/character'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id }) });
        if (!sw.ok) say(`Imported ${id}. Pick it from CHAR.`, 'happy');
      } catch (err) { say(`(import failed: ${err.message})`, 'sad'); }
    };
    input.click();
  });
  $('btn-export').addEventListener('click', () => {
    closeOverlays();
    const a = document.createElement('a');
    a.href = withToken('/character/export');
    a.download = `${manifest.characterId || 'character'}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
  });

  // Utility results are UI notices, never character dialogue or speech.
  let noticeTimer;
  function say(text){$('ui-notice').textContent=text;clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>$('ui-notice').textContent='',6500);}
  function showHelp(){
    window.galVoice.stop();
    const language=window.galVoice.language;
    const descriptions={zh:['开始新会话，旧记录仍保留','选择角色，或按 ID 切换','编辑角色设定和记忆','查看立绘与动画资源','查看对话记录','开关自动朗读','打开此帮助'],ja:['新しい会話を開始','キャラクターを選択','設定とメモリを編集','画像と動画を表示','会話履歴を表示','自動音声を切り替え','このヘルプを表示'],en:Object.values(COMMANDS)};
    $('help-title').textContent={zh:'命令与快捷键',ja:'コマンドとショートカット',en:'Commands and shortcuts'}[language];
    $('help-list').replaceChildren();Object.keys(COMMANDS).forEach((command,i)=>{const row=document.createElement('div'),code=document.createElement('code'),label=document.createElement('span');code.textContent=command;label.textContent=descriptions[language][i];row.append(code,label);$('help-list').append(row);});
    $('help-keys').textContent={zh:'ESC 关闭面板 · Enter 发送 · L 记录 · V 自动朗读。输入时快捷键不会触发。',ja:'ESC で閉じる · Enter で送信 · L 履歴 · V 音声。入力中はショートカット無効。',en:'ESC closes panels · Enter sends · L history · V auto voice. Shortcuts are inactive while typing.'}[language];
    showOverlay('help-panel',true);
  }
  // ---------- slash commands ----------
  const COMMANDS = {
    '/new': 'start a fresh session (the current one stays in dsh web)',
    '/char [id]': 'switch character, or open the picker',
    '/edit': 'edit persona, greeting and memory',
    '/gallery': 'browse sprites and loops',
    '/log': 'open the backlog',
    '/voice': 'toggle voice playback',
    '/help': 'this list',
  };
  async function runCommand(line) {
    const [cmd, ...rest] = line.trim().split(/\s+/);
    const arg = rest.join(' ');
    switch (cmd) {
      case '/new': {
        try {
          const res = await fetch(withToken('/session/new'), { method: 'POST' });
          if (!res.ok) throw new Error(await res.text());
        } catch (err) { say(`(failed to start a session: ${err.message})`, 'sad'); }
        return;
      }
      case '/char':
        if (arg === '') { toggleCharPicker(); return; }
        try {
          const res = await fetch(withToken('/character'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: arg }) });
          if (!res.ok) throw new Error(await res.text());
        } catch (err) { say(`(unknown character "${arg}")`, 'sad'); }
        return;
      case '/edit': openEditor(); return;
      case '/gallery': openGallery(); return;
      case '/voice': toggleVoice(); say('Voice preference updated.', 'neutral'); return;
      case '/log': toggleHistory(); return;
      case '/help':
        showHelp();
        return;
      default:
        say(`Unknown command ${cmd}. Try /help.`, 'surprised');
    }
  }
  let currentEmotion = '';
  let activeLayer = null; // which video layer is showing
  let busy = false, sending = false;

  // ---------- character emotion layers ----------
  function setEmotion(name) {
    window.dispatchEvent(new CustomEvent('gal-emotion',{detail:{emotion:name}}));
  }
  function renderSprite(name){
    const emo = manifest.emotions[name] ? name : manifest.defaultEmotion;
    if (emo === currentEmotion) return;
    currentEmotion = emo;

    const asset = manifest.emotions[emo];
    if (!asset) return;
    if (asset.video) {
      const next = activeLayer === layerA ? layerB : layerA;
      next.src = withToken(asset.video);
      next.playbackRate = manifest.playbackRate || 1;
      next.play().catch(() => {});
      next.classList.add('visible');
      if (activeLayer) activeLayer.classList.remove('visible');
      layerImg.classList.remove('visible');
      activeLayer = next;
    } else if (asset.image) {
      layerImg.src = withToken(asset.image);
      layerImg.classList.add('visible');
      if (activeLayer) { activeLayer.classList.remove('visible'); activeLayer = null; }
    }
  }

  // ---------- dialogue: a live stream into one scrolling box ----------
  // Replies arrive token by token (SSE `delta`), so the reveal runs at the
  // model's real pace instead of replaying a typewriter over text we already
  // have. There is no paging: the box scrolls and stays pinned to the newest
  // line until the reader scrolls up themselves.
  const msgQueue = [];       // queued non-streamed lines (greeting, notices)
  let streaming = false;     // a reply is currently arriving
  let streamText = '';       // what has arrived so far
  let paintHandle = null;
  let following = true;      // stay pinned to the bottom

  const textWindow = $('text-window');

  function atBottom() { return textWindow.scrollHeight - textWindow.scrollTop - textWindow.clientHeight < 24; }

  function updateJumpButton() {
    const button = $('btn-skip'), lang = window.galVoice.language;
    button.hidden = following || atBottom();
    button.textContent = { zh: '回到最新', en: 'Jump to latest', ja: '最新へ' }[lang] || 'Jump to latest';
    button.title = button.textContent;
  }
  window.addEventListener('gal-language', updateJumpButton);

  textWindow.addEventListener('scroll', () => { following = atBottom(); updateJumpButton(); });

  function scrollToLatest() {
    following = true;
    textWindow.scrollTop = textWindow.scrollHeight;
    updateJumpButton();
  }

  function paint(text) {
    dialogueText.innerHTML = window.galMarkdown.render(text);
    if (following) textWindow.scrollTop = textWindow.scrollHeight;
    updateJumpButton();
  }

  // At most one repaint per frame: a fast stream would otherwise re-render the
  // whole reply for every token that lands.
  function schedulePaint() {
    if (paintHandle !== null) return;
    paintHandle = requestAnimationFrame(() => { paintHandle = null; paint(streamText); });
  }

  function cancelPaint() {
    if (paintHandle === null) return;
    cancelAnimationFrame(paintHandle);
    paintHandle = null;
  }

  function beginStream() {
    streaming = true; streamText = ''; following = true;
    dialogueText.textContent = '';
    updateJumpButton();
  }

  function pushStream(text) {
    if (!streaming) beginStream();
    streamText += text;
    schedulePaint();
  }

  // The committed message is authoritative: a retried or interrupted attempt
  // can differ from the frames already painted.
  function showMessage(text) {
    streaming = false; streamText = text; following = true;
    cancelPaint();
    paint(text);
  }

  // ---------- voice ----------
  let currentMessageId = null;
  function toggleVoice() { return window.galVoice.toggle(); }
  $('btn-voice').addEventListener('click', toggleVoice);

  function playNext() {
    const next = msgQueue.shift();
    if (next === undefined) return;
    if (next.emotion) setEmotion(next.emotion);
    currentMessageId = next.id || null;
    showMessage(next.text);
    window.galVoice.setMessage(currentMessageId, next.text);
  }

  // VN conventions: click anywhere on the stage advances; right-click (or H)
  // hides the window to admire the art; any input restores it.
  function setUiHidden(value) {
    document.body.classList.toggle('ui-hidden', value);
  }
  $('stage').addEventListener('click', (ev) => {
    const el = ev.target;
    if(activeOverlay()||el.closest('button,input,textarea,select,a,label,summary,[role=button],#motion-debug-panel'))return;
    if (el.closest('#input-row') || el.closest('#menu-row') || el.closest('#history') || el.closest('#char-picker') || el.closest('.overlay')) return;
    if (!$('char-picker').classList.contains('hidden')) { closeOverlays(); return; }
    if (document.body.classList.contains('ui-hidden')) { setUiHidden(false); return; }
    scrollToLatest();
  });
  $('stage').addEventListener('contextmenu', (ev) => {
    if (activeOverlay()||ev.target.closest('input,textarea,select,[contenteditable=true]')) return;
    ev.preventDefault();
    setUiHidden(!document.body.classList.contains('ui-hidden'));
  });
  document.addEventListener('keydown', (ev) => {
    if(ev.isComposing||ev.metaKey||ev.altKey||ev.ctrlKey&&ev.key!=='Control'||activeOverlay())return;
    if (ev.target.closest('input,textarea,select,button,[contenteditable=true]') || ev.target.closest('#editor')) return;
    if (document.body.classList.contains('ui-hidden')) { setUiHidden(false); return; }
    if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); scrollToLatest(); }
    if (ev.key === 'l' || ev.key === 'L') toggleHistory();
    if (ev.key === 'v' || ev.key === 'V') toggleVoice();
    if (ev.key === 'h' || ev.key === 'H') setUiHidden(true);
    if (ev.key === 'c' || ev.key === 'C') toggleCharPicker();
    if (ev.key === 'e' || ev.key === 'E') openEditor();
    if (ev.key === 'g' || ev.key === 'G') openGallery();
  });
  $('btn-char').addEventListener('click', toggleCharPicker);
  $('btn-character-select').addEventListener('click',()=>showOverlay('char-picker',true));
  $('btn-skip').addEventListener('click', scrollToLatest);
  $('btn-hide').addEventListener('click', () => setUiHidden(true));

  // ---------- history ----------
  const history = []; // {role, text}
  function pushHistory(role, text) {
    history.push({ role, text });
    const entry = document.createElement('div');
    entry.className = `h-entry ${role}`;
    const roleEl = document.createElement('div');
    roleEl.className = 'h-role';
    roleEl.textContent = role === 'user' ? 'You' : role === 'assistant' ? manifest.characterName : role === 'voice' ? `${manifest.characterName} · voice` : 'Action';
    const textEl = document.createElement('div');
    textEl.className = 'h-text';
    textEl.textContent = text;
    entry.append(roleEl, textEl);
    historyList.appendChild(entry);
  }
  function toggleHistory() {
    showOverlay('history',historyEl.classList.contains('hidden'));
    if (!historyEl.classList.contains('hidden')) historyList.scrollTop = historyList.scrollHeight;
  }
  $('btn-history').addEventListener('click', toggleHistory);
  $('btn-close-history').addEventListener('click', toggleHistory);

  // ---------- busy / ticker ----------
  function setBusy(value) {
    busy = value;
    window.dispatchEvent(new CustomEvent('gal-busy',{detail:{busy:value}}));
    btnSend.disabled = sending;
    if (value) {
      ticker.classList.remove('hidden');
      if (tickerText.textContent === '') tickerText.textContent = 'thinking…';
    } else {
      ticker.classList.add('hidden');
      tickerText.textContent = '';
    }
  }

  // ---------- input ----------
  input.addEventListener('keydown',ev=>{if(ev.key==='Enter'&&ev.isComposing){ev.preventDefault();ev.stopPropagation();}});
  $('input-row').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (text === '') return;
    if(ev.isComposing)return;
    if (text.startsWith('/')) { input.value = ''; runCommand(text); return; }
    if (sending) return;
    sending=true;btnSend.disabled=true;
    interruptPresentation();
    input.value = '';
    try {
      const res = await fetch(withToken('/send'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      if(!input.value)input.value=text;
      say(`发送失败：${err.message}`);
    } finally {sending=false;btnSend.disabled=false;if(!activeOverlay())input.focus();}
  });

  function interruptPresentation(){
    window.dispatchEvent(new Event('gal-dialogue-interrupt'));
    window.galVoice.stop();
    msgQueue.length = 0; streaming = false; streamText = '';
    cancelPaint(); updateJumpButton();
  }
  // ---------- event stream ----------
  function handleEvent(ev) {
    switch (ev.type) {
      case 'user':
        interruptPresentation();
        pushHistory('user', ev.text);
        $('last-user').classList.remove('hidden');
        $('last-user-text').textContent = ev.text;
        setBusy(true);
        break;
      case 'status':
        tickerText.textContent = ev.text;
        ticker.classList.remove('hidden');
        break;
      case 'assistant':
        pushHistory('assistant', ev.text);
        setBusy(false);
        // live conversation favors freshness: unshown backlog yields to the
        // newest reply (everything stays readable in History)
        msgQueue.length = 0;
        msgQueue.push({ id: ev.id, text: ev.text, emotion: ev.emotion });
        playNext();
        break;
      case 'delta':
        if (ev.reset) { beginStream(); break; }
        if (typeof ev.text === 'string') pushStream(ev.text);
        break;
      case 'busy':
        setBusy(ev.value);
        break;
      case 'emotion':
        setEmotion(ev.emotion);
        break;
      case 'voice':
        if (ev.line && ev.line !== '') pushHistory('voice', ev.line);
        window.galVoice.receive(ev.id, withToken(ev.url));
        break;
      case 'session': {
        history.length = 0;
        historyList.textContent = '';
        $('last-user').classList.add('hidden');
        setBusy(false);
        interruptPresentation();msgQueue.push({text:window.galVoice.greeting(manifest.greeting),emotion:manifest.defaultEmotion});playNext();
        pushHistory('status', `— new session ${ev.id} —`);
        break;
      }
      case 'memory':
        if (!$('editor').classList.contains('hidden')) $('ed-memory').value = ev.memory;
        break;
      case 'manifest': {
        applyManifest(ev.manifest);
        if (ev.silent) break;
        msgQueue.length = 0;
        msgQueue.push({ text: window.galVoice.greeting(ev.manifest.greeting), emotion: ev.manifest.defaultEmotion });
        streaming = false; streamText = ''; cancelPaint();
        playNext();
        break;
      }
      case 'snapshot':
        for (const entry of ev.entries) pushHistory(entry.role, entry.text);
        if (ev.entries.length > 0) {
          const last = ev.entries[ev.entries.length - 1];
          if (last.role === 'assistant') { msgQueue.push({ text: last.text, emotion: ev.emotion }); playNext(); }
        }
        break;
    }
  }

  function connect() {
    const source = new EventSource(withToken('/events'));
    source.onopen = () => $('conn-dot').classList.add('on');
    source.onerror = () => $('conn-dot').classList.remove('on');
    source.onmessage = (msg) => {
      try { handleEvent(JSON.parse(msg.data)); } catch { /* ignore malformed frames */ }
    };
  }

  // ---------- boot ----------
  fetch(withToken('/manifest.json'))
    .then((res) => res.json())
    .then((m) => {
      applyManifest(m);
      connect();
      const greeting = window.galVoice.greeting(m.greeting);
      msgQueue.push({ text: greeting, emotion: m.defaultEmotion });
      playNext();
    })
    .catch(() => {
      dialogueText.textContent = 'Failed to load manifest — is the dsh-gal plugin running?';
    });
})();
