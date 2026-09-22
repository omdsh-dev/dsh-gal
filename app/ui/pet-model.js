// Sprite layout and playback contract. Matches Codex's 9 action rows + 16 looks,
// plus a held/dangling row and three optional idle meme rows.
export const atlasLayout = { columns: 8, rows: 15, cell: 256 };
const strip = (row, count, ms, last = ms) => Array.from({length:count}, (_,column) => ({row,column,ms:column === count-1 ? last : ms}));
export const clips = {
  idle: [280,110,110,140,140,320].map((ms,column)=>({row:0,column,ms})),
  'running-right': strip(1,8,120,220), 'running-left': strip(2,8,120,220),
  waving: strip(3,4,140,280), jumping: strip(4,5,140,280), failed: strip(5,8,140,240),
  waiting: strip(6,6,150,260), running: strip(7,6,120,220), review: strip(8,6,150,280),
  grabbed: strip(11,8,140,200),
};
// Optional idle vignettes, separate from task/interaction clips.
export const memes = {
  'meme-rice': [700,420,400,600,520,520,900,600].map((ms,column)=>({row:12,column,ms})),
  'meme-nap': [650,650,850,1400,1400,1400,800,650].map((ms,column)=>({row:13,column,ms})),
  'meme-book': [800,700,600,500,650,500,1000,700].map((ms,column)=>({row:14,column,ms})),
};
export function nextMeme(last, random = Math.random()) {
  const choices=Object.keys(memes).filter(name=>name!==last);
  return choices[Math.min(choices.length-1,Math.floor(Math.max(0,random)*choices.length))];
}
export function memeDelay(random = Math.random()) { return 30000 + Math.floor(Math.min(1,Math.max(0,random))*30000); }
export const slowIdle = clips.idle.map(f=>({...f,ms:f.ms*6}));
export const rows = { idle:0,reading:7,writing:7,searching:7,running:7,waiting:6,done:8,failed:5,speaking:3 };
export const labels = { idle:'我在这里',reading:'正在思考…',writing:'正在写…',searching:'正在查找…',running:'正在处理…',waiting:'需要你看一下',done:'完成了',failed:'遇到了一点问题',speaking:'正在回复…' };
const actions = { idle:'idle',reading:'running',writing:'running',searching:'running',running:'running',waiting:'waiting',done:'review',failed:'failed',speaking:'waving' };
export function presentation(status, connected, dismissedRevision) {
  if (!connected) return {action:'failed',row:5,kind:'notice',title:'暂时连不上小黑鱼',text:'点击打开 Aibo 查看连接状态',bubble:true};
  const activity = status.activity in rows ? status.activity : status.busy ? 'reading' : 'idle';
  const notice = activity === 'waiting' || activity === 'failed';
  const reply = (activity === 'done' || activity === 'speaking') && !!status.text?.trim();
  const thinking = ['reading','writing','searching','running','speaking'].includes(activity) && !reply;
  const kind = notice ? 'notice' : reply ? 'reply' : thinking ? 'thinking' : 'none';
  return {action:actions[activity],row:rows[activity],kind,
    title:notice ? labels[activity] : '',
    text:reply ? status.text : activity==='waiting'?'点击回到对话，继续下一步':activity==='failed'?'点击查看详情':'',
    bubble:kind !== 'none' && status.revision!==dismissedRevision};
}
export function sequence(action, reduced = false, held = false) {
  const frames = memes[action] ?? clips[action] ?? clips.idle;
  if (reduced) return {frames:[frames[0]],loopStart:null};
  if (action in memes) return {frames,loopStart:null};
  if (held) return {frames,loopStart:0};
  if (action === 'idle') return {frames:slowIdle,loopStart:0};
  return {frames:[...frames,...frames,...frames,...slowIdle],loopStart:frames.length*3};
}
// A click is an event, not a state: she looks where you clicked, holds it for
// `hold`, then goes back to idle. Nothing else on the desktop moves her — plain
// cursor motion never selects a frame, which is what keeps the idle loop alive.
export const glance = { hold: 1200 };
// A failed poll at launch is not an outage. The backend ships inside the app
// and is started by it, so before it answers for the first time the honest
// reading is "not up yet" — the supervisor's business, not hers.
export const startup = { tolerance: 2, grace: 60000 };
/**
 * Whether a run of failed polls deserves the offline notice.
 * @param failures       consecutive failed polls
 * @param everConnected  a poll has answered at least once
 * @param booted         the supervisor's last word: 'ready' | 'attach' | 'error' | null
 * @param elapsed        ms since this window opened
 */
export function offline({ failures, everConnected = false, booted = null, elapsed = 0 }) {
  if (failures < startup.tolerance) return false;
  return everConnected || booted !== null || elapsed > startup.grace;
}
// Clockwise from up, at 22.5° intervals. Caret and Computer Use targets hold these
// frames; a click borrows one for the length of a glance.
export function lookFrame(x, y, rect) {
  const dx=x-(rect.x+rect.width/2),dy=y-(rect.y+rect.height/2);
  if (Math.hypot(dx,dy)<1) return null;
  const angle=(Math.atan2(dx,-dy)*180/Math.PI+360)%360;
  const index=Math.round(angle/22.5)%16;
  return {row:9+Math.floor(index/8),column:index%8,ms:0};
}
