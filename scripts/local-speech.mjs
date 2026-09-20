import { spawn } from 'node:child_process';
import { mkdtemp,readFile,rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const voices={zh:'Tingting',ja:'Kyoko',en:'Samantha'};
const cache=new Map();
function run(file,args,text,signal){return new Promise((resolve,reject)=>{
 signal?.throwIfAborted();
 const child=spawn(file,args,{stdio:['pipe','ignore','pipe']});let error='',failure=null;
 const abort=()=>{failure=signal.reason;child.kill();};signal?.addEventListener('abort',abort,{once:true});
 const timer=setTimeout(()=>{failure=new Error('Speech timed out');child.kill();},30000);
 const cleanup=()=>{clearTimeout(timer);signal?.removeEventListener('abort',abort);};
 child.stderr.on('data',chunk=>error+=chunk);child.on('error',e=>{cleanup();reject(e);});
 child.on('close',code=>{cleanup();failure?reject(failure):code===0?resolve():reject(new Error(error||'Speech failed'));});
 child.stdin.on('error',()=>{});child.stdin.end(text);
});}
export async function localSpeech(text,language,{signal}={}){
 signal?.throwIfAborted();
 if(process.platform!=='darwin')throw new Error('Local system voice is unavailable');
 if(!voices[language]||typeof text!=='string'||!text.trim()||text.length>6000)throw new Error('Invalid speech request');
 const key=JSON.stringify([language,text]);if(cache.has(key))return cache.get(key);
 const dir=await mkdtemp(join(tmpdir(),'aibo-speech-'));
 try{const aiff=join(dir,'voice.aiff'),wav=join(dir,'voice.wav');await run('/usr/bin/say',['-v',voices[language],'-o',aiff],text,signal);await run('/usr/bin/afconvert',['-f','WAVE','-d','LEI16@22050',aiff,wav],undefined,signal);signal?.throwIfAborted();const data=await readFile(wav);cache.set(key,data);while(cache.size>12)cache.delete(cache.keys().next().value);return data;}finally{await rm(dir,{recursive:true,force:true});}
}
