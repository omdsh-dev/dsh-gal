// Local dsh-gal UI with API requests forwarded to the running dsh-gal instance.
import http from 'node:http';
import { SpeechService } from '../lib/speech.js';
const speech = new SpeechService();
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../web/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png'};
http.createServer(async (req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 if(pathname==='/_gal/health'){res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify({app:'dsh-gal-preview',root:fileURLToPath(new URL('../',import.meta.url))}));return;}
 if(await speech.handle(req,res))return;
 const file=path.resolve(root,'.'+decodeURIComponent(pathname==='/'?'/index.html':pathname));
 if(file.startsWith(root)&&fs.existsSync(file)&&fs.statSync(file).isFile()){
  res.setHeader('content-type',types[path.extname(file)]||'application/octet-stream');res.setHeader('cache-control','no-store');
  if(pathname==='/'){res.end(fs.readFileSync(file,'utf8'));}
  else fs.createReadStream(file).pipe(res);
 }else{const upstream=http.request({hostname:'127.0.0.1',port:4877,path:req.url,method:req.method,headers:req.headers},reply=>{res.writeHead(reply.statusCode,reply.headers);reply.pipe(res);});upstream.on('error',()=>{res.writeHead(502);res.end('dsh-gal upstream unavailable');});req.pipe(upstream);}
}).listen(4878,'127.0.0.1',()=>console.log('http://127.0.0.1:4878/'));
