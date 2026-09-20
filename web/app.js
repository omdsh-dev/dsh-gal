/* Aibo frontend: visual-novel presentation of a dsh session.
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
  const activityTag = $('activity-tag');

  let manifest = { characterName: '', states: {}, characters: [] };

  // ---------- character manifest / theme ----------
  function applyManifest(m) {
    if(manifest.characterId && manifest.characterId!==m.characterId)window.dispatchEvent(new Event('aibo-character-changed'));
    manifest = m;
    $('char-name').textContent = m.characterName;
    document.title = `${m.characterName} · Aibo`;
    const theme = m.theme || {};
    const root = document.documentElement.style;
    theme.accent ? root.setProperty('--accent', theme.accent) : root.removeProperty('--accent');
    theme.frame ? root.setProperty('--frame', theme.frame) : root.removeProperty('--frame');
    theme.box ? root.setProperty('--box-bg', theme.box) : root.removeProperty('--box-bg');
    renderCharacterList();
    currentState = '';
    const hasArt = Object.keys(m.states || {}).length > 0;
    $('placeholder').classList.toggle('hidden', hasArt);
    if (!hasArt) {
      for (const layer of [layerA, layerB]) { layer.classList.remove('visible'); layer.removeAttribute('src'); }
      layerImg.classList.remove('visible');
      activeLayer = null;
    }
    renderSprite(window.aiboCharacter.state.activity);
  }

  window.addEventListener('aibo-character-state',event=>{
    const state=event.detail;
    const name=manifest.characterName;
    $('char-name').textContent=name;document.title=`${name} · Aibo`;
    activityTag.textContent=window.aiboCharacter.text(state.activity==='idle'&&state.speaking?'speaking':state.activity);
    renderSprite(state.activity);
  });

  function renderCharacterList() {
    const list = $('char-list');
    list.textContent = '';
    for (const entry of manifest.characters || []) {
      const btn = window.aiboUi.button();
      btn.type = 'button';
      const current = entry.id === manifest.characterId;
      btn.className += ' char-option' + (current ? ' active' : '');
      // The name carries the row; "prompt only" is a property of the pack, so
      // it rides along as a badge instead of competing with the name as text.
      const label = document.createElement('span');
      label.className = 'char-option-name';
      label.textContent = entry.name;
      btn.textContent = '';
      btn.appendChild(label);
      if (entry.promptOnly) {
        const badge = document.createElement('span');
        badge.className = 'char-option-badge';
        badge.textContent = 'prompt only';
        btn.appendChild(badge);
      }
      btn.title = entry.id;
      if (current) btn.dataset.current = 'true';
      btn.addEventListener('click', async () => {
        closeOverlays();
        if (entry.id === manifest.characterId) return;
        try {
          const res = await fetch(withToken('/character'), {
            method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: entry.id }),
          });
          if (!res.ok) throw new Error(await res.text());
        } catch (err) {
          enqueue({ text: `(failed to switch character: ${err.message})` });
        }
      });
      list.appendChild(btn);
    }
  }
  function toggleCharPicker() { showOverlay('char-picker', $('char-picker').classList.contains('hidden')); }

  // ---------- overlays: editor + gallery ----------
  const overlayIds=['character-hub','history','help-panel','speech-panel','memory-panel','artifacts-panel'];
  let overlayRequest=0,returnFocus=null;
  const activeOverlay=()=>overlayIds.map($).find(el=>!el.classList.contains('hidden'));
  function closeOverlays(){
    overlayRequest++;
    const open=activeOverlay();
    if(open)window.dispatchEvent(new Event('aibo-overlay-closed'));
    [...overlayIds,'editor','gallery','char-picker'].forEach(id=>$(id).classList.add('hidden'));
    document.querySelectorAll('#gallery video').forEach(v=>v.pause());
    window.aiboUi.close();
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
    window.aiboUi.open(id);
    // The list can be longer than the panel: open it on whoever is on stage.
    $('char-list').querySelector('[data-current]')?.scrollIntoView({block:'nearest'});
    // Focus lands on the dialog itself, not on its first control: opening a
    // panel is not a choice of anything inside it, and a ring on the first
    // tab or row reads as if something were selected. Tab moves in from here.
    ($(id).closest('[role=dialog]')||$(id)).focus({preventScroll:true});
  }
  window.addEventListener('aibo-request-close',closeOverlays);
  $('btn-help').onclick=()=>showHelp();
  $('btn-restore').onclick=()=>setUiHidden(false);
  function openSpeechSettings(){window.aiboVoice.stop();showOverlay('speech-panel',true);void window.aiboSpeechSettings.load();}
  $('btn-speech-settings').onclick=openSpeechSettings;
  document.querySelectorAll('.overlay-close').forEach(btn=>btn.addEventListener('click',closeOverlays));
  document.addEventListener('keydown',ev=>{
    if(ev.isComposing)return;
    if(ev.key==='Escape'){
      ev.preventDefault();ev.stopImmediatePropagation();
      // With no panel open, Esc hands the keyboard back to the stage so the
      // single-key shortcuts work.
      if(!activeOverlay()&&document.activeElement===input){input.blur();return;}
      closeOverlays();setUiHidden(false);return;
    }
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
      $('editor-title').textContent = `${c.name} · persona`;
      $('ed-name').value = c.name;
      $('ed-greeting').value = window.aiboVoice.greeting(c.greeting);
      $('ed-persona').value = c.persona;
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
      $('ed-path').textContent = c.bundled ? `${c.dir} (bundled — saving copies it to ~/.dsh/aibo/characters/${c.id})` : c.dir;
      showOverlay('editor', true);
    } catch (err) { say(`(failed to load character config: ${err.message})`, 'sad'); }
  }
  // Memory is about the user, not about the character on stage: its own panel,
  // its own endpoint, and it survives switching packs. It is a list of facts
  // rather than a page of prose — one line is one thing she knows, and each one
  // can be dropped on its own without rewriting the rest.
  let memoryEntries = [];

  function renderMemory() {
    const list = $('mem-list'), label = window.aiboLabels || {};
    list.replaceChildren();
    memoryEntries.forEach((entry, index) => {
      const row = document.createElement('div');
      row.className = 'mem-row';
      const when = document.createElement('span');
      when.className = 'mem-date';
      when.textContent = entry.date || '';
      const text = document.createElement('input');
      text.className = 'mem-fact';
      text.type = 'text';
      text.value = entry.text;
      text.spellcheck = false;
      // Editing in place: commit on blur or Enter, revert on Escape.
      text.addEventListener('keydown', ev => {
        if (ev.key === 'Enter') { ev.preventDefault(); text.blur(); }
        if (ev.key === 'Escape') { ev.preventDefault(); text.value = entry.text; text.blur(); }
      });
      text.addEventListener('change', () => {
        const value = text.value.trim();
        if (value === entry.text) return;
        if (value === '') { text.value = entry.text; return; }
        void saveMemory(memoryEntries.map((item, i) => i === index ? { ...item, text: value } : item));
      });
      const drop = document.createElement('button');
      drop.type = 'button';
      drop.className = 'mem-drop';
      drop.textContent = '×';
      drop.title = label['memory-delete'] || 'Forget this';
      drop.onclick = () => saveMemory(memoryEntries.filter((_, i) => i !== index));
      row.append(when, text, drop);
      list.append(row);
    });
    $('mem-empty').classList.toggle('hidden', memoryEntries.length > 0);
  }

  async function saveMemory(entries) {
    try {
      const res = await fetch(withToken('/memory'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ entries }) });
      if (!res.ok) throw new Error(await res.text());
      memoryEntries = (await res.json()).entries;
      renderMemory();
    } catch (err) { say(`(save failed: ${err.message})`, 'sad'); }
  }

  async function openMemory() {
    const ticket=++overlayRequest;
    try {
      const res = await fetch(withToken('/memory'));
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if(ticket!==overlayRequest)return;
      memoryEntries = data.entries;
      renderMemory();
      showOverlay('memory-panel', true);
      // Opening the panel is for reading the list, not for editing its first
      // row: the cursor belongs in the box where a new fact is added.
      $('mem-new').focus();
    } catch (err) { say(`(failed to load memory: ${err.message})`, 'sad'); }
  }

  $('memory-add').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (ev.isComposing) return;
    const text = $('mem-new').value.trim();
    if (text === '') return;
    $('mem-new').value = '';
    await saveMemory([...memoryEntries, { date: new Date().toISOString().slice(0, 10), text }]);
  });

  // ---------- files she wrote ----------
  // A file is a page she hands over: it is listed here, and its name in her
  // line becomes the way to open it. The file itself stays where the agent
  // put it; only the pointer is kept, so the list survives a restart.
  let artifacts = [];
  let viewing = null;
  const label = key => (window.aiboLabels || {})[key] || key;
  const artifactIndex = () => { const map = new Map(); for (const item of artifacts) { map.set(item.name, item); map.set(item.path, item); } return map; };
  function setArtifacts(list) {
    artifacts = Array.isArray(list) ? list : [];
    $('btn-artifacts').dataset.count = artifacts.length > 0 ? String(artifacts.length) : '';
    if (activeOverlay() === $('artifacts-panel') && $('art-view').classList.contains('hidden')) renderArtifacts();
    linkArtifacts(dialogueText);
  }
  // A file name in backticks becomes the page's handle. Fenced blocks are
  // left alone: a path inside code is code.
  function linkArtifacts(container) {
    if (artifacts.length === 0) return;
    const known = artifactIndex();
    for (const code of container.querySelectorAll('code')) {
      if (code.closest('pre') || code.dataset.artifact) continue;
      const text = code.textContent.trim();
      const hit = known.get(text) || known.get(text.split('/').pop());
      if (!hit) continue;
      code.dataset.artifact = hit.id; code.classList.add('art-link'); code.setAttribute('role', 'button'); code.tabIndex = 0; code.title = hit.path;
      const open = ev => { ev.preventDefault(); ev.stopPropagation(); openArtifact(hit.id); };
      code.addEventListener('click', open);
      code.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') open(ev); });
    }
  }
  function whenLabel(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const lang = window.aiboVoice.language;
    return date.toLocaleString(lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function sizeLabel(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  const kindLabel = item => item.kind === 'markdown' || item.kind === 'text' || item.kind === 'image' ? label(`artifacts-kind-${item.kind}`) : ((item.name.split('.').pop() || '').length <= 5 && item.name.includes('.') ? item.name.split('.').pop().toUpperCase() : label('artifacts-kind-file'));
  // Card footers stay short: kind and size. The opened page adds when.
  const artifactMeta = (item, full = false) => [item.description ? item.name : '', kindLabel(item), item.exists === false ? label('artifacts-missing-short') : sizeLabel(item.size), full ? whenLabel(item.at) : '', full && item.source === 'presented' ? label('artifacts-presented') : ''].filter(Boolean).join(' · ');
  // Each file is a card: a look at its opening on top, the name below. Files
  // that cannot be shown (archives, binaries) fold into a single row.
  const PREVIEW_BYTES = 4096;
  function artifactCard(item) {
    const card = document.createElement('div');
    card.className = `art-card kind-${item.kind}` + (item.exists === false ? ' missing' : '');
    card.setAttribute('role', 'button'); card.tabIndex = 0; card.title = item.path;
    card.setAttribute('aria-label', item.name);
    const compact = item.kind === 'other' || item.exists === false;
    if (compact) card.classList.add('compact');
    const thumb = document.createElement('div'); thumb.className = 'art-thumb';
    const url = withToken(`/artifact/${encodeURIComponent(item.id)}`);
    if (compact) {
      thumb.append(kindIcon(item.exists === false ? 'missing' : 'file'));
    } else if (item.kind === 'image') {
      const img = document.createElement('img'); img.src = url; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      img.addEventListener('error', () => thumb.replaceChildren(kindIcon('image')));
      thumb.append(img);
    } else {
      thumb.append(kindIcon('text'));
      const sep = url.includes('?') ? '&' : '?';
      fetch(`${url}${sep}head=${PREVIEW_BYTES}`).then(async res => {
        if (!res.ok) return;
        const text = await res.text();
        if (!card.isConnected) return;
        const page = document.createElement('div'); page.className = 'art-thumb-page';
        if (item.kind === 'markdown') page.innerHTML = window.aiboMarkdown.render(text); else { const pre = document.createElement('pre'); pre.textContent = text; page.append(pre); }
        for (const el of page.querySelectorAll('a,button,input,[tabindex]')) el.removeAttribute('href'), el.removeAttribute('tabindex');
        thumb.replaceChildren(page);
      }).catch(() => {});
    }
    const foot = document.createElement('div'); foot.className = 'art-foot';
    const name = document.createElement('p'); name.className = 'art-name'; name.textContent = item.description || item.name;
    const meta = document.createElement('p'); meta.className = 'art-meta'; meta.textContent = artifactMeta(item);
    foot.append(name, meta);
    card.append(thumb, foot);
    const open = () => openArtifact(item.id);
    card.addEventListener('click', open);
    card.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); open(); } });
    return card;
  }
  function kindIcon(kind) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.5'); svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true'); svg.classList.add('art-icon');
    const paths = {
      text: ['M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', 'M14 3v6h6', 'M8 13h8', 'M8 17h8'],
      image: ['M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z', 'M4 16l5-5 4 4 3-3 4 4', 'M15 8h.01'],
      file: ['M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', 'M14 3v6h6'],
      missing: ['M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', 'M14 3v6h6', 'M9.5 13.5l5 5', 'M14.5 13.5l-5 5'],
    };
    for (const d of paths[kind] || paths.file) { const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); svg.append(p); }
    return svg;
  }
  function renderArtifacts() {
    const list = $('art-list');
    list.replaceChildren();
    const items = [...artifacts].reverse();
    const cards = items.filter(item => !(item.kind === 'other' || item.exists === false));
    const rows = items.filter(item => item.kind === 'other' || item.exists === false);
    for (const item of cards) list.append(artifactCard(item));
    if (rows.length > 0) { const strip = document.createElement('div'); strip.className = 'art-strip'; for (const item of rows) strip.append(artifactCard(item)); list.append(strip); }
    $('art-empty').classList.toggle('hidden', artifacts.length > 0);
    $('art-list-view').classList.remove('hidden'); $('art-view').classList.add('hidden');
    viewing = null;
  }
  async function openArtifacts() {
    const ticket = ++overlayRequest;
    try {
      const res = await fetch(withToken('/artifacts'));
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (ticket !== overlayRequest) return;
      artifacts = data.artifacts || [];
      $('btn-artifacts').dataset.count = artifacts.length > 0 ? String(artifacts.length) : '';
      renderArtifacts();
      showOverlay('artifacts-panel', true);
    } catch (err) { say(`(failed to load files: ${err.message})`); }
  }
  async function openArtifact(id) {
    const item = artifacts.find(entry => entry.id === id);
    if (!item) return;
    const ticket = ++overlayRequest;
    const body = $('art-body');
    body.replaceChildren();
    $('art-status').textContent = '';
    $('art-view-name').textContent = item.description || item.name;
    $('art-view-path').textContent = item.path;
    $('art-view-desc').textContent = artifactMeta(item, true);
    const url = withToken(`/artifact/${encodeURIComponent(id)}`);
    try {
      if (item.kind === 'image') {
        const img = document.createElement('img'); img.src = url; img.alt = item.name; img.className = 'art-image'; body.append(img);
      } else if (item.kind === 'other') {
        const p = document.createElement('p'); p.className = 'dim'; p.textContent = label('artifacts-binary'); body.append(p);
      } else {
        const res = await fetch(url);
        if (res.status === 404) throw new Error(label('artifacts-missing'));
        if (!res.ok) throw new Error(await res.text());
        const text = await res.text();
        if (ticket !== overlayRequest) return;
        if (item.kind === 'markdown') { const page = document.createElement('div'); page.className = 'art-page'; page.innerHTML = window.aiboMarkdown.render(text); body.append(page); }
        else { const pre = document.createElement('pre'); pre.className = 'art-pre'; pre.textContent = text; body.append(pre); }
      }
    } catch (err) { const p = document.createElement('p'); p.className = 'dim'; p.textContent = `(${err.message})`; body.append(p); }
    if (ticket !== overlayRequest) return;
    viewing = item;
    $('art-list-view').classList.add('hidden'); $('art-view').classList.remove('hidden');
    if (activeOverlay() !== $('artifacts-panel')) showOverlay('artifacts-panel', true);
    body.scrollTop = 0;
    $('art-back').focus();
  }
  $('art-back').addEventListener('click', () => renderArtifacts());
  $('art-reveal').addEventListener('click', async () => {
    if (!viewing) return;
    const res = await fetch(withToken(`/artifact/${encodeURIComponent(viewing.id)}/reveal`), { method: 'POST' });
    $('art-status').textContent = res.ok ? label('artifacts-revealed') : label('artifacts-missing');
  });
  $('art-copy').addEventListener('click', async () => {
    if (!viewing) return;
    try { await navigator.clipboard.writeText(viewing.path); $('art-status').textContent = label('artifacts-copied'); }
    catch { $('art-status').textContent = viewing.path; }
  });
  $('art-forget').addEventListener('click', async () => {
    if (!viewing) return;
    const res = await fetch(withToken(`/artifact/${encodeURIComponent(viewing.id)}`), { method: 'DELETE' });
    if (res.ok) { artifacts = (await res.json()).artifacts || []; $('btn-artifacts').dataset.count = artifacts.length > 0 ? String(artifacts.length) : ''; renderArtifacts(); }
  });
  // Tool names are not something she says. The ticker puts what she is doing
  // in her own words, from the same activity the stage shows.
  const DOING = {
    zh: { reading: '在看…', writing: '在写…', searching: '在查…', running: '在跑命令…', waiting: '等你一下…' },
    en: { reading: 'reading…', writing: 'writing…', searching: 'looking it up…', running: 'running a command…', waiting: 'waiting on you…' },
    ja: { reading: '読んでる…', writing: '書いてる…', searching: '調べてる…', running: 'コマンド実行中…', waiting: '待ってる…' },
  };
  function doing(activity) {
    const words = DOING[window.aiboVoice.language] || DOING.en;
    return words[activity] || `${activity}…`;
  }

  $('editor-form').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const body = {
      name: $('ed-name').value, greeting: $('ed-greeting').value,
      persona: $('ed-persona').value,
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
      say('Saved. The new persona applies from the next reply.', 'happy');
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
      // One tile per activity. A tile without its own file shows what stands
      // in for it, dimmed, so the gap is visible without being a hole.
      for (const asset of c.assets) {
        const own = Boolean(asset.image || asset.video);
        const shown = own ? { video: asset.video && withToken(`/character/${encodeURIComponent(asset.video)}`), image: asset.image && withToken(`/character/${encodeURIComponent(asset.image)}`) }
          : { video: manifest.states[asset.state]?.video && withToken(manifest.states[asset.state].video), image: manifest.states[asset.state]?.image && withToken(manifest.states[asset.state].image) };
        const tile = document.createElement('div');
        tile.className = 'g-tile' + (shown.video || shown.image ? '' : ' missing') + (own ? '' : ' borrowed');
        const media = document.createElement(shown.video ? 'video' : 'img');
        if (shown.video) { media.src = shown.video; media.muted = true; media.loop = true; media.playsInline = true; media.autoplay = true; }
        else if (shown.image) media.src = shown.image;
        const cap = document.createElement('div');
        cap.className = 'g-cap';
        const label = window.aiboCharacter.text(asset.state);
        cap.textContent = own ? `${label}${asset.video ? ' · ' + asset.video : ''}${asset.image ? ' · ' + asset.image : ''}`
          : asset.fallback ? `${label} · ← ${asset.fallback}` : `${label} · missing`;
        const up = window.aiboUi.button();
        up.type = 'button'; up.className += ' g-up'; up.textContent = '↑'; up.title = `Upload a .png or .mp4 for ${asset.state}`;
        up.addEventListener('click', (ev) => { ev.stopPropagation(); pickAsset(asset.state); });
        tile.append(media, cap, up);
        tile.addEventListener('click', () => { if (manifest.states[asset.state]) window.dispatchEvent(new CustomEvent('aibo-preview', { detail: { activity: asset.state } })); });
        tile.addEventListener('dragover', (ev) => { ev.preventDefault(); tile.classList.add('drop'); });
        tile.addEventListener('dragleave', () => tile.classList.remove('drop'));
        tile.addEventListener('drop', (ev) => {
          ev.preventDefault(); tile.classList.remove('drop');
          const file = ev.dataTransfer && ev.dataTransfer.files && ev.dataTransfer.files[0];
          if (file) uploadAsset(asset.state, file);
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
  function pickAsset(state) {
    const input = $('asset-file');
    input.value = '';
    input.onchange = () => { if (input.files[0]) uploadAsset(state, input.files[0]); };
    input.click();
  }
  async function uploadAsset(state, file) {
    const ext = (file.name.split('.').pop() || '').toLowerCase();
    const type = MIME_BY_EXT[ext] || file.type;
    if (!type) { say(`(unsupported file: ${file.name})`, 'sad'); return; }
    $('gallery-title').textContent = `uploading ${state} · ${file.name}…`;
    try {
      const res = await fetch(withToken(`/character/asset?state=${encodeURIComponent(state)}`), { method: 'PUT', headers: { 'content-type': type }, body: file });
      if (!res.ok) throw new Error(await res.text());
      await openGallery();
      say(`Saved ${file.name} as ${state}.`);
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
    window.aiboVoice.stop();
    const language=window.aiboVoice.language;
    const descriptions={zh:['开始新会话，旧记录仍保留','选择角色，或按 ID 切换','编辑角色设定与开场白','查看关于你的记忆（所有角色共用）','她写给你的文件','查看立绘与动画资源','查看对话记录','开关自动朗读','打开此帮助'],ja:['新しい会話を開始','キャラクターを選択','人格とあいさつを編集','あなたについての記憶（全キャラ共通）','書いてくれたファイル','画像と動画を表示','会話履歴を表示','自動音声を切り替え','このヘルプを表示'],en:Object.values(COMMANDS)};
    $('help-title').textContent={zh:'命令与快捷键',ja:'コマンドとショートカット',en:'Commands and shortcuts'}[language];
    $('help-list').replaceChildren();Object.keys(COMMANDS).forEach((command,i)=>{const row=document.createElement('div'),code=document.createElement('code'),label=document.createElement('span');code.textContent=command;label.textContent=descriptions[language][i];row.append(code,label);$('help-list').append(row);});
    $('help-keys').textContent={zh:'⌥ 组合键随时可用，打字打到一半也行。不带 ⌥ 的单键只在光标离开输入框时生效（按 / 或 、 进入输入框，按 Esc 退出）。',ja:'⌥ の組み合わせは入力中でもいつでも使えます。⌥ なしの単キーは、カーソルが入力欄に無いときだけ有効です（/ または 、 で入力欄へ、Esc で抜ける）。',en:'The ⌥ combinations work at any time, even mid-sentence. Without ⌥, a single key only works while the cursor is outside the input box (/ or 、 enters it, Esc leaves).'}[language];
    showOverlay('help-panel',true);
  }
  // ---------- slash commands ----------
  const COMMANDS = {
    '/new': 'start a fresh session (the current one stays in dsh web)',
    '/char [id]': 'switch character, or open the picker',
    '/edit': 'edit persona and greeting',
    '/memory': 'what I remember about you (shared by every character)',
    '/files': 'files she wrote for you',
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
      case '/memory': openMemory(); return;
      case '/files': openArtifacts(); return;
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
  let currentState = '';
  let activeLayer = null; // which video layer is showing
  let busy = false, sending = false;

  // ---------- character stage layers ----------
  // The manifest already resolved every activity to a file, so an activity
  // the pack has no art for simply shares a clip with one it does.
  function renderSprite(name){
    const key = manifest.states[name] ? name : 'idle';
    if (key === currentState) return;
    currentState = key;

    const asset = manifest.states[key];
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

  // ---------- dialogue: one assistant message at a time ----------
  // A turn can produce several assistant messages (message → tool → message).
  // Each one is its own scene: it streams in at the model's pace, gets read
  // aloud, and only then does the next one take the box. A message arriving
  // while the previous is still being read waits instead of replacing it —
  // what happens between them is tool work, and that belongs in the ticker,
  // not in her mouth.
  const queue = [];          // messages waiting their turn
  let current = null;        // { id, text, complete, voiceStarted }
  let live = null;           // the message currently arriving from the stream
  let paintHandle = null;
  let finishTimer = null;
  let voiceActive = false;
  let currentMessageId = null;
  let following = true;      // stay pinned to the newest line

  const textWindow = $('text-window');

  function atBottom() { return textWindow.scrollHeight - textWindow.scrollTop - textWindow.clientHeight < 24; }

  function updateAdvanceButton() {
    const button = $('btn-skip'), lang = window.aiboVoice.language;
    const waiting = queue.length > 0;
    button.hidden = !waiting && (following || atBottom());
    button.textContent = waiting
      ? ({ zh: '下一条', en: 'Next', ja: '次へ' }[lang] || 'Next')
      : ({ zh: '回到最新', en: 'Jump to latest', ja: '最新へ' }[lang] || 'Jump to latest');
    button.title = button.textContent;
  }
  window.addEventListener('aibo-language', updateAdvanceButton);

  textWindow.addEventListener('scroll', () => { following = atBottom(); updateAdvanceButton(); });

  function paint(text) {
    dialogueText.innerHTML = window.aiboMarkdown.render(text);
    linkArtifacts(dialogueText);
    if (following) textWindow.scrollTop = textWindow.scrollHeight;
    updateAdvanceButton();
  }

  // At most one repaint per frame: a fast stream would otherwise re-render the
  // whole message for every token that lands.
  function schedulePaint() {
    if (paintHandle !== null) return;
    paintHandle = requestAnimationFrame(() => { paintHandle = null; if (current) paint(current.text); });
  }

  function cancelPaint() {
    if (paintHandle !== null) { cancelAnimationFrame(paintHandle); paintHandle = null; }
    if (finishTimer !== null) { clearTimeout(finishTimer); finishTimer = null; }
  }

  function present(item) {
    cancelPaint();
    current = item;
    following = true;
    paint(item.text);
    if (item.complete) speakCurrent();
    scheduleFinish();
  }

  function speakCurrent() {
    if (current === null || current.voiceRequested) return;
    current.voiceRequested = true;
    currentMessageId = current.id || null;
    window.aiboVoice.setMessage(currentMessageId, current.text);
  }

  function enqueue(item) {
    const entry = { id: null, text: '', complete: true, voiceRequested: false, voicePlayed: false, voiceWait: 0, ...item };
    if (current === null) { present(entry); return entry; }
    queue.push(entry);
    updateAdvanceButton();
    scheduleFinish();
    return entry;
  }

  function presentNext() {
    const next = queue.shift();
    if (next === undefined) { updateAdvanceButton(); return; }
    present(next);
  }

  // Hand over only when this message is really done with: fully arrived, spoken
  // (not merely queued for speech — synthesis takes seconds, and handing over
  // early is what cancelled the previous line mid-sentence), and on screen long
  // enough to have been read. With nothing waiting there is nothing to hand
  // over to, so it simply stays.
  const READING_MS = text => Math.min(9000, Math.max(1400, text.length * 45));
  const VOICE_WAIT_LIMIT = 15000;

  function scheduleFinish() {
    if (finishTimer !== null) { clearTimeout(finishTimer); finishTimer = null; }
    if (current === null || queue.length === 0) return;
    // An unfinished line with nothing in it has no claim on the box.
    if (!current.complete) {
      if (current.text.trim() !== '') return;
      current = null; presentNext(); return;
    }
    if (voiceActive) return;                       // being spoken right now
    const awaitingVoice = current.voiceRequested && !current.voicePlayed
      && window.aiboVoice.enabled && current.voiceWait < VOICE_WAIT_LIMIT;
    const delay = awaitingVoice ? 500 : current.voicePlayed ? 700 : READING_MS(current.text);
    finishTimer = setTimeout(() => {
      finishTimer = null;
      if (awaitingVoice) { current.voiceWait += 500; scheduleFinish(); return; }
      presentNext();
    }, delay);
  }

  window.addEventListener('aibo-speaking', event => {
    voiceActive = Boolean(event.detail.speaking);
    if (voiceActive && current !== null) current.voicePlayed = true;
    scheduleFinish();
  });

  function beginStream() {
    // A fresh attempt replaces an unfinished one rather than appending to it.
    if (live !== null && !live.complete) {
      const index = queue.indexOf(live);
      if (index !== -1) queue.splice(index, 1);
      if (current === live) { live.text = ''; paint(''); }
    }
    live = enqueue({ text: '', complete: false });
  }

  // A stream can end with nothing to say — the turn was reasoning, or a tool
  // call. That empty line must not keep the box: everything queued behind it
  // would wait forever for a message that is never coming.
  function endStream() {
    if (live === null || live.complete) { live = null; return; }
    if (live.text.trim() !== '') return;   // real text: the commit finalizes it
    const ended = live;
    live = null;
    const index = queue.indexOf(ended);
    if (index !== -1) { queue.splice(index, 1); updateAdvanceButton(); return; }
    if (current === ended) { current = null; presentNext(); updateAdvanceButton(); }
  }

  function pushStream(text) {
    if (live === null || live.complete) beginStream();
    live.text += text;
    if (current === live) schedulePaint();
  }

  // The committed message is authoritative: a retried or interrupted attempt
  // can differ from the frames already painted.
  function commitMessage(id, text) {
    const item = live !== null && !live.complete ? live : enqueue({ text, complete: false });
    item.id = id; item.text = text; item.complete = true;
    live = null;
    if (current === item) {
      cancelPaint();
      paint(text);
      speakCurrent();
    }
    scheduleFinish();
  }

  function clearPresentation() {
    cancelPaint();
    queue.length = 0;
    current = null; live = null;
    updateAdvanceButton();
  }

  function advance() {
    if (queue.length > 0) { presentNext(); return; }
    following = true;
    textWindow.scrollTop = textWindow.scrollHeight;
    updateAdvanceButton();
  }

  // ---------- voice ----------
  function toggleVoice() { return window.aiboVoice.toggle(); }
  $('btn-voice').addEventListener('click', toggleVoice);


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
    advance();
  });
  $('stage').addEventListener('contextmenu', (ev) => {
    if (activeOverlay()||ev.target.closest('input,textarea,select,[contenteditable=true]')) return;
    ev.preventDefault();
    setUiHidden(!document.body.classList.contains('ui-hidden'));
  });
  // One key, one thing — but only while the cursor is not in the text box,
  // which is where it spends most of its time. `/` puts you in it and Esc
  // takes you back out, so the letters below are reachable without the mouse.
  const SHORTCUTS = {
    l: toggleHistory, v: toggleVoice, h: () => setUiHidden(true), c: toggleCharPicker,
    e: openEditor, g: openGallery, m: openMemory, f: openArtifacts, s: openSpeechSettings,
    r: () => window.aiboVoice.replay(), n: () => runCommand('/new'), '?': showHelp,
  };
  const typing = target => Boolean(target?.closest?.('input,textarea,select,button,[contenteditable=true]'));

  // The cursor lives in the text box, so a bare letter is not reachable there
  // without leaving it first. Option + the same letter works from anywhere,
  // including mid-sentence. Keyed by `code`: on macOS Option changes `key`
  // (⌥M is "µ"), but the physical key is the same one printed in the panel.
  const ALT_SHORTCUTS = {
    KeyL: toggleHistory, KeyM: openMemory, KeyF: openArtifacts, KeyC: toggleCharPicker, KeyG: openGallery,
    KeyE: openEditor, KeyS: openSpeechSettings, KeyV: toggleVoice,
    KeyR: () => window.aiboVoice.replay(), KeyN: () => runCommand('/new'),
    KeyH: () => setUiHidden(true), Slash: showHelp,
  };
  document.addEventListener('keydown', (ev) => {
    if (!ev.altKey || ev.metaKey || ev.ctrlKey || ev.isComposing) return;
    const action = ALT_SHORTCUTS[ev.code];
    if (action === undefined) return;
    ev.preventDefault();
    if (document.body.classList.contains('ui-hidden')) setUiHidden(false);
    action();
  });
  document.addEventListener('keydown', (ev) => {
    if(ev.isComposing||ev.metaKey||ev.altKey||ev.ctrlKey&&ev.key!=='Control'||activeOverlay())return;
    if (typing(ev.target) || ev.target.closest('#editor')) return;
    if (document.body.classList.contains('ui-hidden')) { setUiHidden(false); return; }
    if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); advance(); return; }
    // The same physical key on a Chinese IME gives 、 (and ／), so match the
    // key position as well as the character.
    if (ev.key === '/' || ev.key === '／' || ev.key === '、' || ev.key === '\\' || ev.code === 'Slash' || ev.code === 'Backslash') { ev.preventDefault(); input.focus(); return; }
    const action = SHORTCUTS[ev.key.toLowerCase()];
    if (action !== undefined) { ev.preventDefault(); action(); }
  });
  $('btn-char').addEventListener('click', toggleCharPicker);
  $('btn-memory').addEventListener('click', openMemory);
  $('btn-artifacts').addEventListener('click', openArtifacts);
  $('btn-character-select').addEventListener('click',()=>showOverlay('char-picker',true));
  $('btn-skip').addEventListener('click', advance);
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
    // Her lines are markdown in the box; the backlog is the same lines.
    if (role === 'assistant') { textEl.innerHTML = window.aiboMarkdown.render(text); linkArtifacts(textEl); }
    else textEl.textContent = text;
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
    window.dispatchEvent(new CustomEvent('aibo-busy',{detail:{busy:value}}));
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
    window.dispatchEvent(new Event('aibo-dialogue-interrupt'));
    window.aiboVoice.stop();
    clearPresentation();
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
        if (ev.activity) window.dispatchEvent(new CustomEvent('aibo-activity', { detail: { activity: ev.activity } }));
        tickerText.textContent = ev.activity ? doing(ev.activity) : ev.text;
        ticker.classList.remove('hidden');
        break;
      case 'assistant':
        pushHistory('assistant', ev.text);
        setBusy(false);
        // live conversation favors freshness: unshown backlog yields to the
        // newest reply (everything stays readable in History)
        commitMessage(ev.id, ev.text);
        break;
      case 'delta':
        if (ev.reset) { beginStream(); break; }
        if (ev.done) { endStream(); break; }
        if (typeof ev.text === 'string') pushStream(ev.text);
        break;
      case 'busy':
        setBusy(ev.value);
        break;
      case 'activity':
        window.dispatchEvent(new CustomEvent(ev.beat ? 'aibo-beat' : 'aibo-activity', { detail: { activity: ev.activity } }));
        // The ticker follows the steady activity too, so "在写…" does not
        // outlive the write it announced.
        if (!ev.beat && busy && ev.activity !== 'done') tickerText.textContent = doing(ev.activity);
        break;
      case 'voice':
        if (ev.line && ev.line !== '') pushHistory('voice', ev.line);
        window.aiboVoice.receive(ev.id, withToken(ev.url));
        break;
      case 'session': {
        history.length = 0;
        historyList.textContent = '';
        $('last-user').classList.add('hidden');
        setBusy(false);
        interruptPresentation();enqueue({text:window.aiboVoice.greeting(manifest.greeting)});
        pushHistory('status', `— new session ${ev.id} —`);
        break;
      }
      case 'artifact':
        // A page arrives: list it, and make its name in her line clickable.
        // The little "got it" line is the item-get moment.
        setArtifacts(ev.artifacts);
        if (ev.fresh && ev.artifact) say(`${label('artifacts-got')}${ev.artifact.name}`);
        break;
      case 'memory':
        // She remembered something while you were looking at the list. Only
        // repaint when nothing in it is being edited.
        memoryEntries = ev.entries;
        if (activeOverlay() === $('memory-panel') && !document.activeElement?.closest?.('#mem-list')) renderMemory();
        break;
      case 'manifest': {
        applyManifest(ev.manifest);
        if (ev.silent) break;
        clearPresentation();
        enqueue({ text: window.aiboVoice.greeting(ev.manifest.greeting) });
        break;
      }
      case 'snapshot':
        if (Array.isArray(ev.artifacts)) setArtifacts(ev.artifacts);
        for (const entry of ev.entries) pushHistory(entry.role, entry.text);
        if (ev.entries.length > 0) {
          const last = ev.entries[ev.entries.length - 1];
          // A reload puts her last line back in the box, already said: it is
          // not read aloud again, and the greeting queued at boot yields to it.
          if (last.role === 'assistant') { clearPresentation(); enqueue({ text: last.text, voiceRequested: true, voicePlayed: true }); }
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
      const greeting = window.aiboVoice.greeting(m.greeting);
      // The greeting is spoken once per tab; a refresh shows it silently.
      const greeted = sessionStorage.getItem('aibo-greeted') === '1';
      sessionStorage.setItem('aibo-greeted', '1');
      enqueue(greeted ? { text: greeting, voiceRequested: true, voicePlayed: true } : { text: greeting });
    })
    .catch(() => {
      dialogueText.textContent = 'Failed to load manifest — is the Aibo plugin running?';
    });
})();
