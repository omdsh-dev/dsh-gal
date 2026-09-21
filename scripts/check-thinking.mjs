import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { applyThinking, thinkingView } from '../lib/thinking.js';
const temp = mkdtempSync(join(tmpdir(), 'aibo-thinking-'));
process.env.AIBO_STORE = join(temp, 'store.sqlite');
process.env.AIBO_SETTINGS = join(temp, 'legacy.json');
const { readPrefs, writePrefs } = await import('../lib/prefs.js');
const { AiboServer } = await import('../lib/server.js');
const info = { reasoning: { efforts: ['off','low','high','max'].map(id => ({id,name:id})), defaultEffort:'high' } };
const resolve = async () => info;
let server;
try {
  assert.equal(readPrefs().reasoningEffort, 'low', 'fresh and pre-thinking preferences default to low');
  const old = { provider:'deepseek',model:'flash',reasoningEffort:'high',maxTokens:123 };
  assert.deepEqual(await applyThinking(old, readPrefs().reasoningEffort, resolve), {...old, reasoningEffort:'low'});
  writePrefs({ reasoningEffort:'max' });
  writePrefs({ voice:false });
  assert.equal(readPrefs().reasoningEffort,'max', 'unrelated preference writes preserve thinking');
  assert.equal((await applyThinking(old, readPrefs().reasoningEffort, resolve)).reasoningEffort,'max', 'ongoing session reads new preference');
  assert.equal((await applyThinking(old,'default',resolve)).reasoningEffort,undefined,'provider default clears resumed effort');
  assert.equal((await applyThinking(old,'low',async()=>({}))).reasoningEffort,undefined,'non-reasoning models receive no effort');
  const view = thinkingView('deepseek','flash',info,'default');
  assert.equal(view.effective,'high');
  assert.equal(thinkingView('other','other',{reasoning:{efforts:[{id:'medium',name:'Medium'}],defaultEffort:'medium'}},'low').selected,'default');
  const thinking = async () => thinkingView('deepseek','flash',info,readPrefs().reasoningEffort);
  server = new AiboServer({ port:14989, token:'test-thinking', webRoot:'web', log:()=>{}, thinking,
    saveThinking: async effort => {
      if (effort !== 'default' && !info.reasoning.efforts.some(e=>e.id===effort)) throw new Error('Unsupported effort');
      writePrefs({reasoningEffort:effort}); return thinking();
    },
  });
  await server.start();
  const url='http://127.0.0.1:14989/thinking';
  assert.equal((await fetch(url)).status,401);
  const headers={'x-aibo-token':'test-thinking','content-type':'application/json'};
  assert.equal((await (await fetch(url,{headers})).json()).selected,'max');
  const update=await fetch(url,{method:'POST',headers,body:JSON.stringify({effort:'low'})});
  assert.equal(update.status,200); assert.equal((await update.json()).selected,'low');
  const bad=await fetch(url,{method:'POST',headers,body:JSON.stringify({effort:'invented'})});
  assert.equal(bad.status,400); assert.equal(readPrefs().reasoningEffort,'low');
  assert.equal((await fetch(url,{method:'POST',headers,body:'{}'})).status,400);
  console.log('PASS thinking low default, saved preference, live/resumed request override, model capabilities, default fallback and authenticated HTTP settings');
} finally { server?.stop(); rmSync(temp,{recursive:true,force:true}); }
