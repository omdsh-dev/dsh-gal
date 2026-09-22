import { presentation, atlasLayout, sequence, lookFrame, memes, nextMeme, memeDelay, glance, offline } from './pet-model.js';
const { core, event, window: windows } = window.__TAURI__;
const invoke = core.invoke;
const $ = id => document.getElementById(id);
let shown = false, status = { activity:'idle', revision:0 }, connected = true, dismissed = -1, animation, pollTimer, polling = false;
// Startup is not an outage: until one of these says otherwise, a failed poll
// only means dsh has not finished coming up.
let everConnected = false, failures = 0, booted = null;
const openedAt = Date.now();
let dragging = false, landingTimer, directionTimer, hovered = false;
let currentAction = 'idle', playback = sequence('idle'), step = 0, displayed = playback.frames[0], caret = null, computer = null, dragAction = 'grabbed';
let glanced = null, glanceTimer;
let lastPresentationAction = 'idle', memeTimer, lastMeme = null;
let leaveTimer, scrollFrame, shownText = null;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
// Coarse alpha runs keep the empty space around the tail click-through too.
const atlas = new Image(); atlas.src = 'pet/sprites-v3.png';
const hitFrames = new Map();
atlas.onload = () => {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 32;
  const ctx = canvas.getContext('2d', {willReadFrequently:true});
  for (let r=0;r<atlasLayout.rows;r++) for (let f=0;f<atlasLayout.columns;f++) {
    ctx.clearRect(0,0,32,32); ctx.drawImage(atlas,f*atlas.width/atlasLayout.columns,r*atlas.height/atlasLayout.rows,atlas.width/atlasLayout.columns,atlas.height/atlasLayout.rows,0,0,32,32);
    const data=ctx.getImageData(0,0,32,32).data, runs=[];
    for (let y=0;y<32;y++) {
      let start=-1;
      for(let x=0;x<=32;x++) {
        const opaque=x<32 && data[(y*32+x)*4+3]>40;
        if(opaque && start<0)start=x;
        if(!opaque && start>=0){runs.push({x:start,y,width:x-start,height:1});start=-1;}
      }
    }
    hitFrames.set(`${r}:${f}`,runs);
  }
  regions();
};
function drawBubble() {
  if ($('bubble').hidden) return;
  const {width:w,height:h} = $('bubble').getBoundingClientRect();
  if (!w || !h) return;
  const e=1, right=w-e, bottom=h-e, cx=w/2;
  const r=Math.min(27,(h-2)/2);
  // Tangent-continuous rounded corners and a softly curved, centered tail.
  $('bubble-outline').setAttribute('viewBox', `0 0 ${w} ${h+18}`);
  $('bubble-contour').setAttribute('d', `M ${r+e} ${e}
    H ${right-r} Q ${right} ${e} ${right} ${r+e}
    V ${bottom-r} Q ${right} ${bottom} ${right-r} ${bottom}
    H ${cx+19} C ${cx+8} ${bottom} ${cx+1} ${bottom+5} ${cx+1} ${bottom+13}
    Q ${cx+1} ${bottom+17} ${cx-2} ${bottom+14}
    C ${cx-10} ${bottom+6} ${cx-11} ${bottom} ${cx-21} ${bottom}
    H ${r+e} Q ${e} ${bottom} ${e} ${bottom-r}
    V ${r+e} Q ${e} ${e} ${r+e} ${e} Z`);
}
function regions() {
  drawBubble();
  const regions = ['pet','bubble'].filter(id => !$(id).hidden && !$(id).classList.contains('leaving')).flatMap(id => {
    const r = $(id).getBoundingClientRect();
    const runs = id === 'pet' ? hitFrames.get(`${displayed.row}:${displayed.column}`) : null;
    if(runs) return runs.map(p=>({x:r.x+p.x*r.width/32,y:r.y+p.y*r.height/32,width:p.width*r.width/32,height:p.height*r.height/32}));
    const inset = id === 'pet' ? r.width * .09 : 0;
    return {x:r.x+inset,y:r.y,width:r.width-inset*2,height:r.height};
  });
  void invoke('pet_regions', { regions }).catch(console.error);
}
/** Hidden, or far enough into its fade that nothing is waiting to be read. */
function bubbleGone() { return $('bubble').hidden || $('bubble').classList.contains('leaving'); }
function canPlayMeme() {
  return shown && connected && !reduced.matches && !dragging && !hovered && !caret && !computer
    && status.activity === 'idle' && !status.busy && currentAction === 'idle'
    && bubbleGone();
}
function scheduleMeme() {
  if (!canPlayMeme()) { clearTimeout(memeTimer); memeTimer=undefined; return; }
  if (memeTimer !== undefined) return;
  memeTimer=setTimeout(() => {
    memeTimer=undefined;
    if (!canPlayMeme()) return;
    lastMeme=nextMeme(lastMeme);
    selectAction(lastMeme);
  },memeDelay());
}
function gazeFrame() {
  const target = caret ?? computer ?? glanced;
  if (dragging || hovered || reduced.matches || !target || !['idle','running','waving'].includes(currentAction)) return null;
  return lookFrame(target.x,target.y,$('pet').getBoundingClientRect());
}
function renderFrame() {
  const look = gazeFrame();
  displayed = look ?? playback.frames[step];
  $('pet-art').style.backgroundPosition = `${displayed.column/(atlasLayout.columns-1)*100}% ${displayed.row/(atlasLayout.rows-1)*100}%`;
  $('pet').dataset.action = currentAction;
  // A look is one still frame, so the body keeps breathing in CSS underneath it.
  $('pet').dataset.gaze = look ? 'on' : 'off';
  regions();
}
function animate() {
  clearTimeout(animation);
  renderFrame();
  if (!shown || reduced.matches || gazeFrame()) return;
  animation = setTimeout(() => {
    step++;
    if (step >= playback.frames.length) {
      if (playback.loopStart === null) { selectAction(lastPresentationAction,true); return; }
      step = playback.loopStart;
    }
    animate();
  }, playback.frames[step].ms);
}
function updateGaze(source, point) {
  const before = gazeFrame();
  const valid = point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : null;
  const previous = source === 'caret' ? caret : computer;
  if (previous?.x === valid?.x && previous?.y === valid?.y) return;
  if (source === 'caret') caret = valid; else computer = valid;
  if ((caret || computer) && currentAction in memes) selectAction(lastPresentationAction,true);
  scheduleMeme();
  const after = gazeFrame();
  if (!before && !after) return;
  // Codex pauses the clip while looking, and restarts it when the target clears.
  if (before && !after) step = 0;
  animate();
}
/** Only an unoccupied, calm animation may be borrowed for a look. */
function canGlance() {
  return shown && !reduced.matches && !dragging && !hovered && !caret && !computer
    && !(currentAction in memes) && ['idle','running','waving'].includes(currentAction);
}
function endGlance() {
  clearTimeout(glanceTimer); glanceTimer = undefined;
  if (!glanced) return;
  // Whether the look was actually on screen: a meme or a caret target may have
  // taken the frame back already, and that clip must not be restarted here.
  const showing = !caret && !computer && gazeFrame() !== null;
  glanced = null;
  if (!showing) return;
  step = 0; animate(); scheduleMeme();
}
/** Where a mouse button just went down, anywhere on the desktop. Caret and
 *  Computer Use targets outrank it, and so does a vignette in progress: she
 *  finishes her rice before looking up. Each click restarts the beat. */
function updateClick(point) {
  const valid = point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : null;
  if (!valid || !canGlance()) { endGlance(); return; }
  const before = displayed, fresh = glanced === null;
  glanced = valid;
  clearTimeout(glanceTimer);
  glanceTimer = setTimeout(endGlance, glance.hold);
  if (fresh) { animate(); scheduleMeme(); return; }
  const after = gazeFrame();
  // Already looking: only a click in a new direction is worth a repaint.
  if (after && (after.row !== before.row || after.column !== before.column)) renderFrame();
}
function selectAction(action, force = false) {
  if (currentAction === action && !force) return;
  currentAction = action; step = 0;
  playback = sequence(action,reduced.matches,dragging);
  animate(); scheduleMeme();
}
/** Hide behind a fade instead of vanishing between two frames. The click
 *  regions are released at once, so the fading bubble is already inert. */
function setBubbleVisible(visible) {
  const bubble = $('bubble');
  if (visible) {
    clearTimeout(leaveTimer); leaveTimer = undefined;
    bubble.classList.remove('leaving');
    bubble.hidden = false;
    return;
  }
  if (bubble.hidden || leaveTimer !== undefined) return;
  bubble.classList.add('leaving');
  regions();
  leaveTimer = setTimeout(() => {
    leaveTimer = undefined;
    bubble.classList.remove('leaving');
    bubble.hidden = true;
    shownText = null;
    regions();
  }, reduced.matches ? 0 : 220);
}
/** Nothing to fade in a window nobody can see. */
function resetBubble() {
  clearTimeout(leaveTimer); leaveTimer = undefined;
  cancelAnimationFrame(scrollFrame); scrollFrame = undefined;
  $('bubble').classList.remove('leaving');
  $('bubble').hidden = true;
  shownText = null;
}
/** A reply longer than the bubble reads itself: a beat to start on the first
 *  line, then a slow pass down to the last one, where it stays. */
function autoScroll() {
  cancelAnimationFrame(scrollFrame); scrollFrame = undefined;
  const el = $('detail'), bubble = $('bubble');
  el.scrollTop = 0;
  const distance = el.scrollHeight - el.clientHeight;
  if (distance <= 2) { bubble.dataset.more = 'no'; return; }
  bubble.dataset.more = 'true';
  if (reduced.matches) return;
  const LEAD = 1600, SPEED = 26;  // ms before she starts, then px per second
  const started = performance.now();
  const step = now => {
    const elapsed = now - started - LEAD;
    const y = Math.max(0, Math.min(distance, elapsed / 1000 * SPEED));
    el.scrollTop = y;
    if (y >= distance) { bubble.dataset.more = 'end'; scrollFrame = undefined; return; }
    scrollFrame = requestAnimationFrame(step);
  };
  scrollFrame = requestAnimationFrame(step);
}
function paint() {
  const p = presentation(status, connected, dismissed);
  lastPresentationAction = p.action;
  const action=dragging ? dragAction : hovered ? 'jumping' : p.action;
  if (!(action === 'idle' && !status.busy && connected && currentAction in memes)) selectAction(action);
  const visible = !dragging && p.bubble;
  // A bubble on its way out keeps the words it had. Emptying it first would
  // collapse the shape and the fade would read as two separate exits.
  if (visible) {
    $('title').textContent = p.title; $('title').hidden = !p.title; $('detail').textContent = p.text;
    $('thinking').hidden = p.kind !== 'thinking';
    $('message').setAttribute('aria-label', p.kind === 'thinking' ? '正在思考，点击打开对话' : [p.title,p.text].filter(Boolean).join('，'));
    $('bubble').dataset.kind = p.kind;
    $('detail').hidden = !p.text;
    $('bubble').dataset.reply = String(p.kind === 'reply');
    $('bubble').dataset.tone = p.action;
  }
  setBubbleVisible(visible);
  regions(); scheduleMeme();
  // Re-measure only when the line itself changes, so the pass is not restarted
  // by the once-a-second poll that reports the same reply again.
  const line = visible && p.text ? `${p.kind}:${p.text}` : null;
  if (line !== shownText) { shownText = line; if (line) autoScroll(); else { cancelAnimationFrame(scrollFrame); scrollFrame = undefined; } }
}
$('pet').addEventListener('pointerenter', () => { hovered=true; if (!dragging) selectAction('jumping'); });
$('pet').addEventListener('pointerleave', () => { hovered=false; if (!dragging) selectAction(lastPresentationAction); });
function previewSize(size) {
  $('pet').style.width = $('pet').style.height = `${size}px`;
  $('bubble').style.bottom = `${size + 68}px`;
  $('bubble').dataset.compact = String(size >= 240);
  regions();
}
function apply(next) {
  previewSize(next.size);
}
/** The backend is bundled and started by this app; see `offline` for why a
 *  failed poll at launch is the supervisor's business and not hers. */
const lostConnection = () => offline({ failures, everConnected, booted, elapsed: Date.now() - openedAt });
async function poll() {
  if (!shown || polling) return;
  polling = true;
  try { status = await invoke('pet_status'); everConnected = true; failures = 0; connected = true; updateGaze('computer',status.gaze); }
  catch { failures += 1; connected = !lostConnection(); updateGaze('computer',null); }
  finally { polling = false; paint(); if (shown) pollTimer = setTimeout(poll, 1000); }
}
// The supervisor's own account of the backend, for the window that is up
// before it is. A pet opened later may miss these entirely, which is what the
// first successful poll and the grace period are for.
await event.listen('aibo://status', ({payload}) => {
  const stage = payload?.stage;
  if (stage !== 'ready' && stage !== 'attach' && stage !== 'error') return;
  booted = stage;
  if (shown && failures > 0) { connected = !lostConnection(); paint(); }
});
await event.listen('aibo://pet-visible', ({payload}) => {
  shown = payload; clearTimeout(pollTimer); step = 0; animate();
  if (shown) void poll(); else { endDrag(false); hovered=false; caret=computer=glanced=null; clearTimeout(glanceTimer); glanceTimer=undefined; resetBubble(); selectAction(lastPresentationAction,true); regions(); }
});
await event.listen('aibo://pet-pointer', ({payload}) => {
  if (dragging && Math.abs(payload.dx) >= 4) {
    dragAction = payload.dx > 0 ? 'running-right' : 'running-left';
    selectAction(dragAction);
    clearTimeout(directionTimer);
    directionTimer = setTimeout(() => { if (dragging) { dragAction='grabbed'; selectAction(dragAction); } },180);
  }
  renderFrame();
});
await event.listen('aibo://pet-caret', ({payload}) => updateGaze('caret',payload));
await event.listen('aibo://pet-click', ({payload}) => updateClick(payload));
await event.listen('aibo://pet-drag-ended', () => endDrag());
await event.listen('aibo://pet-preferences', ({payload}) => apply(payload));
apply(await invoke('get_pet_preferences'));
shown = await windows.getCurrentWindow().isVisible();
animate(); scheduleMeme(); if (shown) void poll();
$('message').onclick = () => { dismissed = status.revision; paint(); void invoke('open_pet_chat'); };
$('dismiss').onclick = () => { dismissed = status.revision; paint(); };
function endDrag(bounce = true) {
  if (!dragging) return;
  dragging = false; clearTimeout(directionTimer);
  $('pet').classList.remove('grabbed');
  if (bounce && shown && !reduced.matches) {
    $('pet').classList.add('landing');
    landingTimer = setTimeout(() => { $('pet').classList.remove('landing'); regions(); }, 420);
  }
  hovered = false; selectAction(lastPresentationAction,true); paint();
}
$('pet').onpointerdown = e => {
  if (e.button !== 0 || dragging) return;
  clearTimeout(landingTimer);
  dragging = true; dragAction = 'grabbed'; selectAction('grabbed',true);
  $('pet').classList.remove('landing'); $('pet').classList.add('grabbed');
  // Dedicated held frames; horizontal pulls switch to directional gait frames.
  animate(); paint();
  void invoke('start_pet_drag').catch(error => { console.error(error); endDrag(false); });
};
// Native dragging can consume pointerup. The native mouse-button check also
// emits an end event, so releasing outside the webview cannot leave her hanging.
document.addEventListener('pointerup', () => endDrag());
document.addEventListener('contextmenu', e => {
  e.preventDefault();
  if (!dragging) void invoke('show_pet_menu').catch(console.error);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { dismissed = status.revision; paint(); } });
reduced.addEventListener('change', () => selectAction(reduced.matches && currentAction in memes ? lastPresentationAction : currentAction,true));
const layoutObserver = new ResizeObserver(regions);
layoutObserver.observe(document.body);
layoutObserver.observe($('bubble'));
