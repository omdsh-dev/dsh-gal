#!/usr/bin/env node
// Shared launcher: own only processes created here; never kill an existing server.
import {spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {homedir,tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createInterface} from 'node:readline/promises';
import {once} from 'node:events';
const root=fileURLToPath(new URL('../',import.meta.url));
const url='http://127.0.0.1:4878/';
const args=process.argv.slice(2);
let mode=args.find(arg=>!arg.startsWith('--'))||'choose';
const children=new Set();let temporary,cleaning=false;
async function cleanup(){
 if(cleaning)return;cleaning=true;
 for(const child of children){if(child.exitCode===null&&child.signalCode===null){try{process.kill(-child.pid,'SIGTERM');}catch{child.kill('SIGTERM');}}}
 await Promise.all([...children].map(child=>child.exitCode!==null||child.signalCode!==null?Promise.resolve():Promise.race([once(child,'exit').catch(()=>{}),new Promise(resolve=>setTimeout(resolve,2500))])));
 for(const child of children){if(child.exitCode===null&&child.signalCode===null){try{process.kill(-child.pid,'SIGKILL');}catch{}}}
 if(temporary)await rm(temporary,{recursive:true,force:true});
}
for(const signal of ['SIGINT','SIGTERM','SIGHUP'])process.on(signal,()=>{void cleanup().then(()=>process.exit(0));});
function start(file,argv,options={}){
 const child=spawn(file,argv,{cwd:root,stdio:'inherit',detached:true,...options});children.add(child);
 child.on('error',error=>{child.launchError=error;});return child;
}
async function json(endpoint){try{const response=await fetch(endpoint,{signal:AbortSignal.timeout(1500)});return response.ok?await response.json():null;}catch{return null;}}
async function backendReady(){const manifest=await json('http://127.0.0.1:4877/manifest.json');return Boolean(manifest&&typeof manifest.characterName==="string"&&manifest.states);}
async function previewReady(){const result=await json('http://127.0.0.1:4878/_gal/health');return result?.app==='dsh-gal-preview'&&result.root===root;}
async function waitReady(check,child,name){
 const until=Date.now()+90000;
 while(Date.now()<until){if(child.launchError)throw child.launchError;if(child.exitCode!==null||child.signalCode!==null)throw new Error(`${name}启动失败，请查看上方日志。端口可能被其他程序占用。`);if(await check())return;await new Promise(resolve=>setTimeout(resolve,300));}
 throw new Error(`${name}启动超时。请检查端口和 dsh 配置。`);
}
try{
 if(args.includes('--help')){console.log('node scripts/launch.mjs [choose|desktop|web] [--no-open] [--smoke]\n--no-open: 只启动服务；--smoke: 就绪检查后退出，清理本次启动的服务。');process.exit(0);}
 if(args.some(arg=>arg.startsWith('--')&&!['--no-open','--smoke'].includes(arg)))throw new Error('未知参数；使用 --help 查看用法。');
 if(mode==='choose'){
  if(!process.stdin.isTTY)throw new Error('请选择模式：npm run start:desktop 或 npm run start:web');
  const rl=createInterface({input:process.stdin,output:process.stdout});
  try{const answer=(await rl.question('\n启动 dsh-gal\n  1. 客户端（独立窗口）\n  2. 网页端（默认浏览器）\n请选择 [1/2，回车为客户端]：')).trim();if(!['','1','2'].includes(answer))throw new Error('请输入 1 或 2。');mode=answer==='2'?'web':'desktop';}finally{rl.close();}
 }
 if(!['web','desktop'].includes(mode))throw new Error('模式应为 desktop、web 或 choose。');
 if(Number(process.versions.node.split('.')[0])<22)throw new Error('请安装 Node.js 22 或更新版本。');
 const binary=join(root,'app/src-tauri/target/release/dsh-gal-app');
 if(mode==='desktop'&&!existsSync(binary))throw new Error('客户端尚未构建：请先运行 cd app && npm run build。网页端可直接使用。');
 if(!existsSync(join(root,'lib/speech.js')))throw new Error('请先编译插件：npm run build');
 if(!await backendReady()){
  temporary=await mkdtemp(join(tmpdir(),'dsh-gal-launch-'));
  const patch=join(temporary,'gal.patch.yml');
  await writeFile(patch,`- insert:\n    - id: dsh-gal\n      name: ${JSON.stringify(join(root,'lib/index.js'))}\n      config:\n        port: 4877\n        character: ${JSON.stringify(process.env.DSH_GAL_CHARACTER||'xiaoheiyu')}\n`,{mode:0o600});
  const privateDsh=join(homedir(),'Library/Application Support/dsh-gal/runtime/node_modules/.bin/dsh');
  console.log('正在启动对话服务…');
  const child=existsSync(privateDsh)?start(process.execPath,[privateDsh,'--profile','web','--patch',patch,'--no-open','--port','0'],{cwd:homedir()}):start('dsh',['--profile','web','--patch',patch,'--no-open','--port','0'],{cwd:homedir()});
  await waitReady(backendReady,child,'对话服务');
 }else console.log('复用已有对话服务。');
 if(!await previewReady()){
  console.log('正在启动界面服务…');const child=start(process.execPath,[join(root,'scripts/ui-preview.mjs')]);await waitReady(previewReady,child,'界面服务');
 }else console.log('复用已有界面服务。');
 console.log(`已就绪：${url}`);
 if(args.includes('--smoke')){await cleanup();}
 else if(mode==='desktop'&&!args.includes('--no-open')){
  console.log('正在打开客户端…');const child=start(binary,[],{env:{...process.env,DSH_GAL_USE_PREVIEW:'1'}});
  const [code]=await once(child,'exit');if(code)throw new Error(`客户端退出，状态码 ${code}`);await cleanup();
 }else{
  if(!args.includes('--no-open')){
   const open=spawn(process.platform==='darwin'?'open':'xdg-open',[url],{stdio:'inherit'});
   const [code]=await once(open,'exit');if(code)throw new Error(`无法打开浏览器，请手动访问 ${url}`);
  }
  if([...children].some(c=>c.exitCode===null&&c.signalCode===null)){
   console.log('此窗口正在运行服务；按 Ctrl+C 停止本次启动的服务。已有服务不会被关闭。');
   await Promise.race([...children].map(child=>once(child,'exit')));throw new Error('一个服务已退出。');
  }
 }
}catch(error){console.error(`\ndsh-gal：${error.message}`);await cleanup();process.exitCode=1;}
