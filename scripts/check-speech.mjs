import assert from 'node:assert/strict';
import {mkdtemp,rm,stat,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {SpeechService} from '../lib/speech.js';
const dir=await mkdtemp(join(tmpdir(),'gal-speech-test-'));
const signal=new AbortController().signal;
let calls=[],mode='ok';
const mock=async(url,options)=>{
  calls.push({url,options});
  if(mode==='abort')return new Promise((_,reject)=>options.signal.addEventListener('abort',()=>reject(options.signal.reason),{once:true}));
  if(mode==='auth')return new Response('secret upstream details',{status:401});
  if(mode==='quota')return new Response('',{status:429});
  if(mode==='invalid')return Response.json({base_resp:{status_code:0},data:{audio:'zz'}});
  if(mode==='business')return Response.json({base_resp:{status_code:1008}});
  if(url.includes('t2a_v2'))return Response.json({base_resp:{status_code:0},data:{audio:Buffer.from('ID3mock').toString('hex')}});
  if(url.endsWith('/speakers'))return Response.json([{name:'テストキャラ',styles:[{id:3,name:'ノーマル',type:'talk'},{id:4,name:'歌唱',type:'sing'}]}]);
  if(url.includes('audio_query'))return Response.json({accent_phrases:[]});
  return new Response('ID3mock',{headers:{'content-type':'audio/mpeg'}});
};
const service=new SpeechService(join(dir,'speech.json'),mock);
let server;
try{
  const localChoices=await service.voices('local','zh',signal);assert.ok(localChoices.length>1);assert.ok(localChoices.every(v=>v.locale.startsWith('zh_')));
  const alternative=localChoices.find(v=>v.id!=='Tingting');
  await service.save({language:'zh',profile:{provider:'local',model:'system',voice:alternative.id}});assert.equal((await service.publicConfig()).profiles.zh.voice,alternative.id);
  await assert.rejects(service.save({language:'en',profile:{provider:'local',model:'system',voice:alternative.id}}),/invalid_settings/);
  assert.deepEqual(await service.voices('voicevox','ja',signal),[{id:'3',name:'テストキャラ · ノーマル',locale:'ja_JP'}]);
  let config=await service.publicConfig();assert.equal(config.profiles.zh.provider,'local');assert.equal(config.profiles.ja.provider,'local');
  for(const provider of config.catalog.filter(p=>p.key)){
    const profile={provider:provider.id,model:provider.models[0],voice:provider.voices.zh||'test-voice'};
    await assert.rejects(service.synthesize({language:'zh',text:'你好',profile},signal),/key_required/);
    const saved=await service.save({language:'zh',profile,apiKey:'test-secret'});
    assert.equal(saved.hasKeys[provider.id],true);assert.ok(!JSON.stringify(saved).includes('test-secret'));
    const result=await service.synthesize({language:'zh',text:'你好'},signal);assert.equal(result.type,'audio/mpeg');assert.equal(result.data.toString(),'ID3mock');
    const call=calls.at(-1),body=JSON.parse(call.options.body);
    if(provider.id==='fish'){assert.equal(body.reference_id,'test-voice');assert.equal(call.options.headers.model,profile.model);}
    if(provider.id==='elevenlabs'){assert.equal(body.language_code,'zh');assert.equal(call.options.headers['xi-api-key'],'test-secret');}
    if(provider.id.startsWith('minimax')){assert.equal(body.language_boost,'Chinese');assert.ok(call.url.includes(provider.id==='minimax-cn'?'api.minimaxi.com':'api.minimax.io'));}
  }
  assert.equal((await stat(join(dir,'speech.json'))).mode&0o777,0o600);
  config=await new SpeechService(join(dir,'speech.json'),mock).publicConfig();assert.equal(config.profiles.zh.provider,'minimax');assert.equal(config.profiles.en.provider,'local');
  for(const [errorMode,error] of [['auth',/auth_error/],['quota',/quota_error/],['invalid',/invalid_audio/],['business',/provider_error:1008/]]){mode=errorMode;await assert.rejects(service.synthesize({language:'zh',text:'你好'},signal),error);}
  mode='abort';const controller=new AbortController();const pending=service.synthesize({language:'zh',text:'你好'},controller.signal);await new Promise(resolve=>setTimeout(resolve,20));controller.abort();await assert.rejects(pending,{name:'AbortError'});
  mode='ok';const profile=config.profiles.zh;await service.save({language:'zh',profile,clearKey:true});assert.equal((await service.publicConfig()).hasKeys.minimax,false);
  await assert.rejects(service.synthesize({language:'zh',text:'你好'},signal),/key_required/);
  await assert.rejects(service.save({language:'zh',profile:{provider:'voicevox',model:'voicevox',voice:'3'}}),/invalid_settings/);
  await assert.rejects(service.save({language:'zh',profile:{provider:'local',model:'system',voice:'-x'}}),/invalid_settings/);
  // Real local synthesis across the three supported languages, plus interruption.
  for(const [language,text] of [['zh','你好'],['en','Hello'],['ja','こんにちは']]){
    const audio=await service.synthesize({language,text,profile:{provider:'local',model:'system',voice:config.catalog[0].voices[language]}},signal);
    assert.equal(audio.data.subarray(0,4).toString(),'RIFF');
  }
  const cancel=new AbortController();const localPending=service.synthesize({language:'en',text:'This is an interruption test. '.repeat(150)},cancel.signal);setTimeout(()=>cancel.abort(),15);await assert.rejects(localPending,{name:'AbortError'});
  server=createServer(async(req,res)=>{if(!await service.handle(req,res)){res.writeHead(404);res.end();}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base=`http://127.0.0.1:${server.address().port}`;
  assert.equal((await fetch(base+'/voice/config',{headers:{origin:'https://example.com'}})).status,403);
  assert.equal((await fetch(base+'/voice/config',{method:'POST',headers:{'content-type':'text/plain'},body:'{}'})).status,415);
  const publicResponse=await (await fetch(base+'/voice/config')).text();assert.ok(!publicResponse.includes('test-secret'));
  console.log('PASS: all cloud adapters, credentials redaction/persistence/deletion, error handling, cancellation, three real local voices, origin/content-type checks.');
}finally{server?.close();await rm(dir,{recursive:true,force:true});}
