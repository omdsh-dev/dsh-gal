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
  const advance = $('advance');
  const ticker = $('ticker'), tickerText = $('ticker-text');
  const historyEl = $('history'), historyList = $('history-list');
  const input = $('input'), btnSend = $('btn-send');
  const emotionTag = $('emotion-tag');

  let manifest = { characterName: '', defaultEmotion: 'neutral', emotions: {}, characters: [] };

  // ---------- character manifest / theme ----------
  function applyManifest(m) {
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
  }

  function renderCharacterList() {
    const list = $('char-list');
    list.textContent = '';
    for (const entry of manifest.characters || []) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'char-option' + (entry.id === manifest.characterId ? ' active' : '');
      btn.textContent = entry.promptOnly ? `${entry.name} (prompt only)` : entry.name;
      btn.title = entry.id;
      btn.addEventListener('click', async () => {
        $('char-picker').classList.add('hidden');
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
  function toggleCharPicker() { $('char-picker').classList.toggle('hidden'); }

  // ---------- overlays: editor + gallery ----------
  function showOverlay(id, value) {
    $(id).classList.toggle('hidden', !value);
    if (value) { $('history').classList.add('hidden'); $('char-picker').classList.add('hidden'); }
  }
  document.querySelectorAll('.overlay-close').forEach((btn) => btn.addEventListener('click', () => showOverlay(btn.dataset.close, false)));

  let characterConfig = null;
  async function loadCharacterConfig() {
    const res = await fetch(withToken('/character/config'));
    if (!res.ok) throw new Error(await res.text());
    characterConfig = await res.json();
    return characterConfig;
  }
  async function openEditor() {
    try {
      const c = await loadCharacterConfig();
      $('editor-title').textContent = `${c.name} · persona & memory`;
      $('ed-name').value = c.name;
      $('ed-greeting').value = c.greeting;
      $('ed-persona').value = c.persona;
      $('ed-memory').value = c.memory;
      $('ed-rate').value = c.playbackRate || 1;
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

  async function openGallery() {
    try {
      const c = await loadCharacterConfig();
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
        const up = document.createElement('button');
        up.type = 'button'; up.className = 'g-up'; up.textContent = '↑'; up.title = `Upload a .png or .mp4 for ${asset.emotion}`;
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
      $('char-picker').classList.add('hidden');
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
    $('char-picker').classList.add('hidden');
    const a = document.createElement('a');
    a.href = withToken('/character/export');
    a.download = `${manifest.characterId || 'character'}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
  });

  /** Put a line in the dialogue box without touching the session. */
  function say(text, emotion) {
    msgQueue.length = 0;
    msgQueue.push({ text, emotion });
    typing = false; waitingAdvance = false; pageRest = '';
    clearTimeout(typeTimer);
    playNext();
  }

  // ---------- slash commands ----------
  const COMMANDS = {
    '/new': 'start a fresh session (the current one stays in dsh web)',
    '/char [id]': 'switch character, or open the picker',
    '/edit': 'edit persona, greeting and memory',
    '/gallery': 'browse sprites and loops',
    '/log': 'open the backlog',
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
      case '/log': toggleHistory(); return;
      case '/help':
        say(Object.entries(COMMANDS).map(([k, v]) => `${k} — ${v}`).join('\n'), 'neutral');
        return;
      default:
        say(`Unknown command ${cmd}. Try /help.`, 'surprised');
    }
  }
  let currentEmotion = '';
  let activeLayer = null; // which video layer is showing
  let busy = false;
  let autoMode = false;

  // ---------- character emotion layers ----------
  function setEmotion(name) {
    const emo = manifest.emotions[name] ? name : manifest.defaultEmotion;
    if (emo === currentEmotion) return;
    currentEmotion = emo;
    emotionTag.textContent = emo;
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

  // ---------- typewriter with galgame paging ----------
  const msgQueue = [];   // pending assistant messages
  let typing = false;    // currently animating a page
  let pageRest = '';     // text not yet shown (later pages)
  let waitingAdvance = false;
  let typeTimer = null;
  let autoTimer = null;

  function overflowing() {
    const win = $('text-window');
    return win.scrollHeight > win.clientHeight + 2;
  }

  function beginMessage(text) {
    pageRest = text;
    nextPage();
  }

  function nextPage() {
    waitingAdvance = false;
    advance.classList.add('hidden');
    dialogueText.textContent = '';
    typePage();
  }

  function typePage() {
    typing = true;
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    const step = () => {
      if (!typing) return;
      if (pageRest.length === 0) { finishPage(cursor, false); return; }
      const ch = pageRest[0];
      dialogueText.textContent += ch;
      pageRest = pageRest.slice(1);
      dialogueText.appendChild(cursor);
      if (overflowing()) {
        // took one character too many for this page — give it back and hold
        dialogueText.removeChild(cursor);
        dialogueText.textContent = dialogueText.textContent.slice(0, -1);
        pageRest = ch + pageRest;
        finishPage(cursor, true);
        return;
      }
      typeTimer = setTimeout(step, ch === '\n' ? 90 : 18);
    };
    step();
  }

  function finishPage(cursor, more) {
    typing = false;
    clearTimeout(typeTimer);
    cursor.remove();
    if (more || msgQueue.length > 0) {
      waitingAdvance = true;
      advance.classList.remove('hidden');
      if (autoMode) autoTimer = setTimeout(advanceNow, 2400);
    }
  }

  function revealRestOfPage() {
    // fast-forward: fill until the window is full (or text ends)
    clearTimeout(typeTimer);
    while (pageRest.length > 0) {
      const ch = pageRest[0];
      dialogueText.textContent += ch;
      pageRest = pageRest.slice(1);
      if (overflowing()) {
        dialogueText.textContent = dialogueText.textContent.slice(0, -1);
        pageRest = ch + pageRest;
        break;
      }
    }
    typing = false;
    finishPage(document.createElement('span'), pageRest.length > 0);
  }

  function advanceNow() {
    clearTimeout(autoTimer);
    if (typing) { revealRestOfPage(); return; }
    if (!waitingAdvance) return;
    if (pageRest.length > 0) { nextPage(); return; }
    waitingAdvance = false;
    advance.classList.add('hidden');
    playNext();
  }

  function playNext() {
    if (typing || waitingAdvance) return;
    const next = msgQueue.shift();
    if (next === undefined) return;
    if (next.emotion) setEmotion(next.emotion);
    beginMessage(next.text);
  }

  // VN conventions: click anywhere on the stage advances; right-click (or H)
  // hides the window to admire the art; any input restores it.
  function setUiHidden(value) {
    document.body.classList.toggle('ui-hidden', value);
  }
  $('stage').addEventListener('click', (ev) => {
    const el = ev.target;
    if (el.closest('#input-row') || el.closest('#menu-row') || el.closest('#history') || el.closest('#char-picker') || el.closest('.overlay')) return;
    if (!$('char-picker').classList.contains('hidden')) { $('char-picker').classList.add('hidden'); return; }
    if (document.body.classList.contains('ui-hidden')) { setUiHidden(false); return; }
    advanceNow();
  });
  $('stage').addEventListener('contextmenu', (ev) => {
    if (ev.target.closest('#history')) return;
    ev.preventDefault();
    setUiHidden(!document.body.classList.contains('ui-hidden'));
  });
  document.addEventListener('keydown', (ev) => {
    if (ev.target === input || ev.target.closest('#editor')) return;
    if (document.body.classList.contains('ui-hidden')) { setUiHidden(false); return; }
    if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); advanceNow(); }
    if (ev.key === 'Control') revealRestOfPage();
    if (ev.key === 'l' || ev.key === 'L') toggleHistory();
    if (ev.key === 'a' || ev.key === 'A') toggleAuto();
    if (ev.key === 'h' || ev.key === 'H') setUiHidden(true);
    if (ev.key === 'c' || ev.key === 'C') toggleCharPicker();
    if (ev.key === 'e' || ev.key === 'E') openEditor();
    if (ev.key === 'g' || ev.key === 'G') openGallery();
    if (ev.key === 'Escape') { $('char-picker').classList.add('hidden'); showOverlay('editor', false); showOverlay('gallery', false); }
  });
  $('btn-char').addEventListener('click', toggleCharPicker);
  $('btn-skip').addEventListener('click', () => { if (typing) revealRestOfPage(); else advanceNow(); });
  $('btn-hide').addEventListener('click', () => setUiHidden(true));

  // ---------- history ----------
  const history = []; // {role, text}
  function pushHistory(role, text) {
    history.push({ role, text });
    const entry = document.createElement('div');
    entry.className = `h-entry ${role}`;
    const roleEl = document.createElement('div');
    roleEl.className = 'h-role';
    roleEl.textContent = role === 'user' ? 'You' : role === 'assistant' ? manifest.characterName : 'Action';
    const textEl = document.createElement('div');
    textEl.className = 'h-text';
    textEl.textContent = text;
    entry.append(roleEl, textEl);
    historyList.appendChild(entry);
  }
  function toggleHistory() {
    historyEl.classList.toggle('hidden');
    if (!historyEl.classList.contains('hidden')) historyList.scrollTop = historyList.scrollHeight;
  }
  $('btn-history').addEventListener('click', toggleHistory);
  $('btn-close-history').addEventListener('click', toggleHistory);

  function toggleAuto() {
    autoMode = !autoMode;
    $('btn-auto').classList.toggle('active', autoMode);
    if (autoMode && waitingAdvance) autoTimer = setTimeout(advanceNow, 1200);
  }
  $('btn-auto').addEventListener('click', toggleAuto);

  // ---------- busy / ticker ----------
  function setBusy(value) {
    busy = value;
    btnSend.disabled = value;
    if (value) {
      setEmotion('thinking');
      ticker.classList.remove('hidden');
      if (tickerText.textContent === '') tickerText.textContent = 'thinking…';
    } else {
      ticker.classList.add('hidden');
      tickerText.textContent = '';
    }
  }

  // ---------- input ----------
  $('input-row').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (text === '') return;
    if (text.startsWith('/')) { input.value = ''; runCommand(text); return; }
    if (busy) return;
    input.value = '';
    try {
      const res = await fetch(withToken('/send'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      msgQueue.push({ text: `(failed to send: ${err.message})`, emotion: 'sad' });
      playNext();
    }
  });

  // ---------- event stream ----------
  function handleEvent(ev) {
    switch (ev.type) {
      case 'user':
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
        msgQueue.push({ text: ev.text, emotion: ev.emotion });
        if (waitingAdvance && pageRest.length === 0) advanceNow();
        else playNext();
        break;
      case 'busy':
        setBusy(ev.value);
        break;
      case 'emotion':
        setEmotion(ev.emotion);
        break;
      case 'session': {
        history.length = 0;
        historyList.textContent = '';
        $('last-user').classList.add('hidden');
        setBusy(false);
        say(`${manifest.greeting}`, manifest.defaultEmotion);
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
        msgQueue.push({ text: ev.manifest.greeting, emotion: ev.manifest.defaultEmotion });
        typing = false; waitingAdvance = false; pageRest = '';
        clearTimeout(typeTimer);
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
      const greeting = m.greeting ?? 'Hello! I am listening — say something below.';
      msgQueue.push({ text: greeting, emotion: m.defaultEmotion });
      playNext();
    })
    .catch(() => {
      dialogueText.textContent = 'Failed to load manifest — is the dsh-gal plugin running?';
    });
})();
