// Official sample model with its authored motions, expressions, masks and physics.
(async()=>{
 const active=()=>window.galCharacter.state.mode==='live2d'&&window.galCharacter.state.model==='mao';
 if(!active())await new Promise(resolve=>{const on=()=>{if(active()){window.removeEventListener('gal-character-state',on);resolve();}};window.addEventListener('gal-character-state',on);});
 const panel=document.createElement('div');panel.className='live2d-controls';panel.dataset.model='mao';panel.textContent='Mao…';document.getElementById('character-motion-host').append(panel);
 const loading=document.createElement('div');loading.className='model-loading';loading.setAttribute('role','status');loading.setAttribute('aria-live','polite');
 const loadingText=document.createElement('span'),back=window.galUi.button();back.type='button';loading.append(loadingText,back);document.getElementById('character').append(loading);
 let phase=0,ready=false,controlsReady=false;
 const loadingCopy={zh:['正在准备 Mao…','正在读取模型与动作…','正在准备画面…','切回立绘'],en:['Preparing Mao…','Loading model and motions…','Preparing graphics…','Use character art'],ja:['Mao を準備中…','モデルとモーションを読み込み中…','描画を準備中…','立ち絵に戻る']};
 function loadingState(){const copy=loadingCopy[window.galVoice?.language]||loadingCopy.zh;loadingText.textContent=copy[phase];back.textContent=copy[3];loading.hidden=ready||!active();if(!ready&&!controlsReady){panel.textContent=copy[phase];panel.hidden=!active();}}
 back.onclick=()=>{const picker=document.getElementById('character-renderer');picker.value='sprite';picker.dispatchEvent(new Event('change'));};
 window.addEventListener('gal-character-state',loadingState);window.addEventListener('gal-language',loadingState);loadingState();
 // Give input and paint a turn between indivisible Core/GPU operations. Pause work if switched away.
 async function checkpoint(next=phase){phase=next;loadingState();await new Promise(r=>setTimeout(r,0));if(!active())await new Promise(resolve=>{const on=()=>{if(active()){window.removeEventListener('gal-character-state',on);resolve();}};window.addEventListener('gal-character-state',on);});}
 let canvas;
 try{
 await checkpoint();
 await(window.__cubismCoreReady ||= new Promise((resolve,reject)=>{if(window.Live2DCubismCore)return resolve();const s=document.createElement('script');s.src='/live2d/vendor/live2dcubismcore.min.js';s.onload=resolve;s.onerror=reject;document.head.append(s);}));
 const {CubismFramework,CubismUserModel,CubismMatrix44,CubismEyeBlink,CubismModelSettingJson,CubismShaderManager_WebGL}=await import('./vendor/cubism-framework.mjs');
 CubismFramework.startUp();CubismFramework.initialize();
 const base='/live2d/mao/';
 const cache=new Map();const bytes=file=>{if(!cache.has(file))cache.set(file,(async()=>{const r=await fetch(base+file,{signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error(file+': '+r.status);return r.arrayBuffer();})());return cache.get(file);};
 const raw=await bytes('Mao.model3.json'),json=JSON.parse(new TextDecoder().decode(raw)),refs=json.FileReferences;
 await checkpoint(1);
 const files=[refs.Moc,refs.Physics,refs.Pose,...Object.values(refs.Motions).flat().map(x=>x.File),...refs.Expressions.map(x=>x.File)];
 const images=refs.Textures.map(file=>{const image=new Image();image.src=base+file;return image.decode().then(()=>image);});
 const [,textures]=await Promise.all([Promise.all(files.map(bytes)),Promise.all(images)]);
 await checkpoint();
 const settings=new CubismModelSettingJson(raw,raw.byteLength);
 const user=new CubismUserModel();user.loadModel(await bytes(refs.Moc));
 const model=user.getModel(),id=name=>CubismFramework.getIdManager().getId(name);
 await checkpoint();
 const physics=await bytes(refs.Physics);user.loadPhysics(physics,physics.byteLength);
 const pose=await bytes(refs.Pose);user.loadPose(pose,pose.byteLength);
 const motions=[];for(const [group,items]of Object.entries(refs.Motions))for(const [index,item]of items.entries()){await checkpoint();const b=await bytes(item.File);const m=user.loadMotion(b,b.byteLength,item.File);m.setEffectIds(Array.from({length:settings.getEyeBlinkParameterCount()},(_,i)=>settings.getEyeBlinkParameterId(i)),Array.from({length:settings.getLipSyncParameterCount()},(_,i)=>settings.getLipSyncParameterId(i)));m.setFadeInTime(.5);m.setFadeOutTime(.5);motions.push({group,index,m});}
 const expressions=[];for(const item of refs.Expressions){const b=await bytes(item.File);expressions.push(user.loadExpression(b,b.byteLength,item.Name));}
 await checkpoint(2);
 const blink=CubismEyeBlink.create(settings);
 canvas=document.createElement('canvas');canvas.id='mao-canvas';canvas.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none';document.getElementById('character').append(canvas);
 const gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:true,preserveDrawingBuffer:false});if(!gl)throw Error('WebGL unavailable');
 user.createRenderer(canvas.width,canvas.height);const renderer=user.getRenderer();renderer.startUp(gl);renderer.setIsPremultipliedAlpha(true);renderer.loadShaders('/live2d/vendor/Shaders/WebGL/');
 const shader=CubismShaderManager_WebGL.getInstance().getShader(gl);
 const shaderStart=performance.now();while(!shader._isShaderLoaded){if(shader._loadError)throw shader._loadError;if(performance.now()-shaderStart>30000)throw Error('Shader initialization timed out');await new Promise(r=>setTimeout(r,16));}
 await checkpoint();
 for(const [i,image]of textures.entries()){await checkpoint();const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);renderer.bindTexture(i,t);}
 const core=model.getModel();model.update();let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
 for(const [i,v]of core.drawables.vertexPositions.entries()){if(!core.drawables.opacities[i])continue;for(let k=0;k<v.length;k+=2){minX=Math.min(minX,v[k]);maxX=Math.max(maxX,v[k]);minY=Math.min(minY,v[k+1]);maxY=Math.max(maxY,v[k+1]);}}
 let paused=false,previous=0,emotion='',nodStart=-100,manualExpression=null;
 const play=n=>{user._motionManager.stopAllMotions();user._motionManager.startMotionPriority(motions[n].m,false,3);paused=false;pause.checked=false;};
 controlsReady=true;panel.replaceChildren();const status=document.createElement('span');status.textContent='Mao · Live2D Inc.';panel.append(status);
 const controls=document.createElement('div');controls.className='motion-buttons';panel.append(controls);
 const copy={zh:['点头','原作动作','回到待机','暂停动作','官方示例：Mao · © Live2D Inc.'],en:['Nod','Authored motion','Return to idle','Pause motion','Official sample: Mao · © Live2D Inc.'],ja:['うなずく','収録モーション','待機に戻る','動きを停止','公式サンプル：Mao · © Live2D Inc.']};
 const tr=()=>copy[window.galVoice?.language]||copy.zh;
 function button(label,fn){const b=window.galUi.button();b.type='button';b.textContent=label;b.onclick=fn;controls.append(b);return b;}
 const nod=button(tr()[0],()=>{user._motionManager.stopAllMotions();nodStart=performance.now()/1000;paused=false;pause.checked=false;});
 const authored=motions.map((_,i)=>button(`${tr()[1]} ${i+1}`,()=>play(i)));
 const reset=button(tr()[2],()=>{manualExpression=null;emotion='';nodStart=-100;play(0);});
 const label=document.createElement('label'),pause=document.createElement('input'),pauseText=document.createElement('span');pause.type='checkbox';pause.onchange=()=>paused=pause.checked;pauseText.textContent=tr()[3];label.append(pause,pauseText);panel.append(label);
 const note=document.createElement('small');note.textContent=tr()[4];panel.append(note);
 window.addEventListener('gal-language',()=>{nod.textContent=tr()[0];authored.forEach((b,i)=>b.textContent=`${tr()[1]} ${i+1}`);reset.textContent=tr()[2];pauseText.textContent=tr()[3];note.textContent=tr()[4];});
 window.addEventListener('gal-character-state',()=>{if(window.galCharacter.state.emotion!==emotion)manualExpression=null;});
 const expressionMap={neutral:0,thinking:0,happy:1,sad:4,surprised:6,excited:3};
 model.saveParameters();
 window.maoPreview={model:core,user,play,nod:()=>nod.click(),expression:n=>{manualExpression=n;user._expressionManager.startMotion(expressions[n],false,3);},get paused(){return paused;},get emotion(){return emotion;}};
 function frame(now){try{
 const visible=active();canvas.hidden=!visible;panel.hidden=!visible;const dt=Math.min(.05,previous?(now-previous)/1000:0);previous=now;
 if(!visible){requestAnimationFrame(frame);return;}
 const state=window.galCharacter.state;
 if(!paused){
 model.loadParameters();
 if(user._motionManager.isFinished()&&now/1000-nodStart>2)user._motionManager.startMotionPriority(motions[0].m,false,1);
 user._motionManager.updateMotion(model,dt);model.saveParameters();blink.updateParameters(model,dt);
 if(state.emotion!==emotion){emotion=state.emotion;if(manualExpression===null)user._expressionManager.startMotion(expressions[expressionMap[emotion]??0],false,3);}
 user._expressionManager.updateMotion(model,dt);
 // A restrained nod drives rigged head/neck parameters, with delayed body response.
 const t=now/1000-nodStart;if(t>=0&&t<2){const smooth=x=>x*x*(3-2*x);const curve=t<.3?3*smooth(t/.3):t<.85?3-15*smooth((t-.3)/.55):t<1.55?-12+12*smooth((t-.85)/.7):0;model.setParameterValueById(id('ParamAngleY'),curve);model.setParameterValueById(id('ParamBodyAngleY'),curve*.12);}
 if(state.emotion==='thinking'){model.addParameterValueById(id('ParamAngleZ'),4);model.addParameterValueById(id('ParamEyeBallX'),.25);}
 if(state.activity==='speaking')for(let i=0;i<settings.getLipSyncParameterCount();i++)model.addParameterValueById(settings.getLipSyncParameterId(i),.15+.45*Math.abs(Math.sin(now*.012)));
 user._physics?.evaluate(model,dt);user._pose?.updateParameters(model,dt);model.update();
 }
 const ratio=Math.min(devicePixelRatio,2),w=Math.max(1,Math.round(canvas.clientWidth*ratio)),h=Math.max(1,Math.round(canvas.clientHeight*ratio));if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;user.setRenderTargetSize(w,h);}
 const fit=Math.min(w*.86/(maxX-minX),h*.92/(maxY-minY));const matrix=new CubismMatrix44(),a=matrix.getArray();a[0]=2*fit/w;a[5]=2*fit/h;a[12]=-(minX+maxX)*fit/w;a[13]=-(minY+maxY)*fit/h;
 gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);renderer.setMvpMatrix(matrix);renderer.setRenderState(null,[0,0,w,h]);renderer.drawModel();
 if(!ready){ready=true;loadingState();}
 requestAnimationFrame(frame);
 }catch(error){fail(error);}}
 function fail(error){ready=true;loadingState();if(canvas)canvas.hidden=true;panel.textContent='Mao: '+error.message;if(active())window.dispatchEvent(new CustomEvent('gal-renderer-error',{detail:error.message}));window.maoError=error.stack;console.error(error);}
 requestAnimationFrame(frame);
 }catch(error){ready=true;loadingState();if(canvas)canvas.remove();panel.textContent='Mao: '+error.message;if(active())window.dispatchEvent(new CustomEvent('gal-renderer-error',{detail:error.message}));window.maoError=error.stack;console.error(error);}
})();
