// Development-only visual fixture: no real agent calls or user session writes.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve('app/ui');
const bridge=`<script>
if(new URLSearchParams(location.search).has('docs'))document.write('<style>*,*::before,*::after{animation:none!important;transition:none!important}</style>');
const listeners={};window.petEmit=(name,payload)=>listeners[name]?.({payload});window.petFixture=new URLSearchParams(location.search).get('docs')==='reply'?{activity:'done',busy:false,revision:1,text:'伞带上。济州这几天会下雨，别又淋湿了。'}:new URLSearchParams(location.search).get('docs')==='thinking'?{activity:'reading',busy:true,revision:1,text:''}:{activity:'idle',busy:false,revision:1,text:''};
window.__TAURI__={core:{invoke:async(name,args)=>{
if(name==='get_pet_preferences')return {enabled:true,showWithMain:true,size:180};
if(name==='set_pet_preferences')return args;
if(name==='pet_status')return window.petFixture;
if(name==='pet_regions'){window.petRegions=args.regions;return;}
window.lastPetAction=name;
if(name==='start_pet_drag')window.fixtureDragging=true;
}},event:{listen:async(name,fn)=>{listeners[name]=fn;}},window:{getCurrentWindow:()=>({isVisible:async()=>true,startDragging:async()=>{}})}};
document.addEventListener('pointermove',e=>window.petEmit('aibo://pet-pointer',{x:e.clientX,y:e.clientY,dx:e.movementX}));
document.addEventListener('pointerup',()=>{window.fixtureDragging=false;window.petEmit('aibo://pet-drag-ended');});
</script>`;
createServer(async(req,res)=>{
try{const url=new URL(req.url,'http://localhost');if(url.pathname==='/docs.html'){res.setHeader('Content-Type','text/html');res.end(await readFile('scripts/pet-docs.html'));return;}const path=resolve(root,'.'+url.pathname);if(!path.startsWith(root+'/')){res.writeHead(403).end();return;}
let content=await readFile(path);const ext=extname(path);if(ext==='.html')content=content.toString().replace('</head>',bridge+'</head>');
res.setHeader('Content-Type',({'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2','.png':'image/png'})[ext]||'application/octet-stream');res.end(content);
}catch{res.writeHead(404).end();}
}).listen(14988,'127.0.0.1',()=>console.log('Pet fixture http://127.0.0.1:14988/pet.html'));
