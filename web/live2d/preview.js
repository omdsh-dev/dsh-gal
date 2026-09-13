/* Local evaluation renderer for this unmasked, normal-blend Cubism model. */
(async () => {
  if(window.__galLive2DStarted)return;window.__galLive2DStarted=true;
  if(window.galCharacter.state.mode!=='live2d'||window.galCharacter.state.model!=='xiaoheiyu')await new Promise(resolve=>{const start=event=>{if(event.detail.mode==='live2d'&&event.detail.model==='xiaoheiyu'){window.removeEventListener('gal-character-state',start);resolve();}};window.addEventListener('gal-character-state',start);});
  const panel = document.createElement('div');
  panel.className = 'live2d-controls';panel.dataset.model='xiaoheiyu';
  const status = document.createElement('span'); status.textContent = '加载小黑鱼…'; panel.append(status); document.getElementById('character-motion-host').append(panel);
  try {
    await (window.__cubismCoreReady ||= new Promise((resolve, reject) => { if(window.Live2DCubismCore)return resolve();const script = document.createElement('script'); script.src = '/live2d/vendor/live2dcubismcore.min.js'; script.onload = resolve; script.onerror = reject; document.head.append(script); }));
    const {MotionController,durations}=await import('./motions.mjs');
    const {ExpressionController,boundParameters}=await import('./expressions.mjs');
    const expression=new ExpressionController();
    const motion=new MotionController({reduced:matchMedia('(prefers-reduced-motion: reduce)').matches});
    const base = '/live2d/model/';
    const jsonResponse = await fetch(base + 'xiaoheiyu-api-test.model3.json');
    if (!jsonResponse.ok) throw new Error('等待导出已绑定的 model3.json / moc3');
    const settings = await jsonResponse.json();
    const response = await fetch(base + settings.FileReferences.Moc);
    if (!response.ok) throw new Error('模型文件加载失败');
    const bytes = await response.arrayBuffer();
    const core = window.Live2DCubismCore;
    const readyDeadline = performance.now() + 5000;
    while (true) {
      try { core.Version.csmGetVersion(); break; }
      catch (error) { if (performance.now() > readyDeadline) throw error; await new Promise(resolve => setTimeout(resolve, 20)); }
    }
    const moc = core.Moc.fromArrayBuffer(bytes);
    if (!moc) throw new Error('Cubism Core 无法读取模型');
    const model = core.Model.fromMoc(moc); model.update();
    const d = model.drawables;
    if (Array.from(d.maskCounts).some(Boolean)) throw new Error('此预览器暂不支持裁剪蒙版');
    if (Array.from(d.constantFlags).some(f => f & 3)) throw new Error('此预览器暂不支持特殊混合模式');
    const canvas = document.createElement('canvas'); canvas.id = 'live2d-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:2;pointer-events:none';
    document.getElementById('character').append(canvas);
    const gl = canvas.getContext('webgl', { alpha:true, premultipliedAlpha:true, antialias:true, preserveDrawingBuffer:true });
    if (!gl) throw new Error('需要 WebGL');
    const shader = (type, source) => { const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s; };
    const program=gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,'attribute vec2 p;attribute vec2 uv;uniform vec2 scale;uniform vec2 center;varying vec2 tex;varying float modelY;void main(){modelY=p.y;gl_Position=vec4((p-center)*scale,0.,1.);tex=vec2(uv.x,1.-uv.y);}'));
    // UV-space cutout follows the existing inner stocking contours; atlas bytes stay unchanged.
    const gapShader="float gapCut(vec2 uv){vec2 p=uv*1024.;if(p.y<295.||p.y>447.||p.x<771.||p.x>790.)return 0.;vec2 edge=vec2(774.,787.);if(p.y<300.)edge=mix(vec2(776.,783.),vec2(776.,783.),(p.y-295.)/5.);else if(p.y<305.)edge=mix(vec2(776.,783.),vec2(776.,783.),(p.y-300.)/5.);else if(p.y<310.)edge=mix(vec2(776.,783.),vec2(776.,783.),(p.y-305.)/5.);else if(p.y<315.)edge=mix(vec2(776.,783.),vec2(777.,783.),(p.y-310.)/5.);else if(p.y<320.)edge=mix(vec2(777.,783.),vec2(777.,782.),(p.y-315.)/5.);else if(p.y<325.)edge=mix(vec2(777.,782.),vec2(778.,782.),(p.y-320.)/5.);else if(p.y<330.)edge=mix(vec2(778.,782.),vec2(777.,783.),(p.y-325.)/5.);else if(p.y<335.)edge=mix(vec2(777.,783.),vec2(776.,784.),(p.y-330.)/5.);else if(p.y<340.)edge=mix(vec2(776.,784.),vec2(775.,785.),(p.y-335.)/5.);else if(p.y<345.)edge=mix(vec2(775.,785.),vec2(774.,786.),(p.y-340.)/5.);else if(p.y<350.)edge=mix(vec2(774.,786.),vec2(774.,786.),(p.y-345.)/5.);else if(p.y<355.)edge=mix(vec2(774.,786.),vec2(775.,786.),(p.y-350.)/5.);else if(p.y<360.)edge=mix(vec2(775.,786.),vec2(775.,785.),(p.y-355.)/5.);else if(p.y<365.)edge=mix(vec2(775.,785.),vec2(776.,785.),(p.y-360.)/5.);else if(p.y<370.)edge=mix(vec2(776.,785.),vec2(776.,785.),(p.y-365.)/5.);else if(p.y<375.)edge=mix(vec2(776.,785.),vec2(776.,785.),(p.y-370.)/5.);else if(p.y<380.)edge=mix(vec2(776.,785.),vec2(775.,785.),(p.y-375.)/5.);else if(p.y<385.)edge=mix(vec2(775.,785.),vec2(775.,786.),(p.y-380.)/5.);else if(p.y<390.)edge=mix(vec2(775.,786.),vec2(774.,786.),(p.y-385.)/5.);else if(p.y<395.)edge=mix(vec2(774.,786.),vec2(774.,787.),(p.y-390.)/5.);else if(p.y<400.)edge=mix(vec2(774.,787.),vec2(773.,788.),(p.y-395.)/5.);else if(p.y<405.)edge=mix(vec2(773.,788.),vec2(773.,788.),(p.y-400.)/5.);else if(p.y<410.)edge=mix(vec2(773.,788.),vec2(772.,789.),(p.y-405.)/5.);else if(p.y<415.)edge=mix(vec2(772.,789.),vec2(772.,789.),(p.y-410.)/5.);else if(p.y<420.)edge=mix(vec2(772.,789.),vec2(772.,789.),(p.y-415.)/5.);else if(p.y<425.)edge=mix(vec2(772.,789.),vec2(772.,789.),(p.y-420.)/5.);else if(p.y<430.)edge=mix(vec2(772.,789.),vec2(772.,789.),(p.y-425.)/5.);else if(p.y<435.)edge=mix(vec2(772.,789.),vec2(773.,789.),(p.y-430.)/5.);else if(p.y<440.)edge=mix(vec2(773.,789.),vec2(773.,788.),(p.y-435.)/5.);else if(p.y<445.)edge=mix(vec2(773.,788.),vec2(774.,787.),(p.y-440.)/5.);return smoothstep(edge.x+.3,edge.x+1.1,p.x)*(1.-smoothstep(edge.y-1.1,edge.y-.3,p.x))*smoothstep(295.,296.,p.y)*(1.-smoothstep(446.,447.,p.y));}";
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;uniform sampler2D image;uniform float opacity;uniform float minY;uniform float bodyLayer;varying vec2 tex;varying float modelY;'+gapShader+'void main(){if(modelY<minY)discard;vec4 c=texture2D(image,tex);c.a*=1.-bodyLayer*gapCut(tex);gl_FragColor=vec4(c.rgb*c.a,c.a)*opacity;}'));
    gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));gl.useProgram(program);
    const position=gl.getAttribLocation(program,'p'),uv=gl.getAttribLocation(program,'uv');
    const scale=gl.getUniformLocation(program,'scale'),center=gl.getUniformLocation(program,'center'),opacity=gl.getUniformLocation(program,'opacity'),clipMinY=gl.getUniformLocation(program,'minY'),bodyLayer=gl.getUniformLocation(program,'bodyLayer');
    gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.disable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
    const textures=[];
    for(const file of settings.FileReferences.Textures){
      const image=new Image();image.src=base+file;await image.decode();
      const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);textures.push(texture);
    }
    const buffers=Array.from({length:d.count},(_,i)=>{const b={p:gl.createBuffer(),uv:gl.createBuffer(),indices:gl.createBuffer()};gl.bindBuffer(gl.ARRAY_BUFFER,b.uv);gl.bufferData(gl.ARRAY_BUFFER,d.vertexUvs[i],gl.STATIC_DRAW);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b.indices);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,d.indices[i],gl.STATIC_DRAW);return b;});
    const params=model.parameters, index=Object.fromEntries(params.ids.map((id,i)=>[id,i]));
    const supported=boundParameters(model);
    const set=(id,value)=>{if(index[id]!==undefined&&supported.includes(id))params.values[index[id]]=Math.max(params.minimumValues[index[id]],Math.min(params.maximumValues[index[id]],value));};
    let speaking=false,manual=false;
    window.addEventListener('gal-speaking',event=>{speaking=event.detail.speaking;});
    const copy={
      zh:{blink:'眨眼',wink:'单眼眨眼',talk:'口型演示',nod:'点头',shake:'摇头',tilt:'歪头',greet:'打招呼',happy:'开心',surprised:'惊讶',sleepy:'困倦',think:'思考',bow:'欠身致意',demo:'轮流演示',reset:'回到待机',idle:'自动眨眼',follow:'鼠标跟随',pause:'暂停动作',paused:'已暂停',title:'动作',note:'基础状态反馈：仅眼口已绑定；精细情绪需补绑眉毛和嘴型。'},
      ja:{blink:'まばたき',wink:'ウィンク',talk:'口の動き',nod:'うなずく',shake:'首を振る',tilt:'首をかしげる',greet:'あいさつ',happy:'喜び',surprised:'驚き',sleepy:'眠い',think:'考える',bow:'会釈',demo:'連続デモ',reset:'待機に戻る',idle:'自動まばたき',follow:'マウス追従',pause:'動きを停止',paused:'停止中',title:'モーション',note:'基本反応のみ。眉と笑顔のリギングが必要です。'},
      en:{blink:'Blink',wink:'Wink',talk:'Mouth demo',nod:'Nod',shake:'Shake head',tilt:'Tilt',greet:'Greet',happy:'Happy',surprised:'Surprised',sleepy:'Sleepy',think:'Thinking',bow:'Small bow',demo:'Cycle demo',reset:'Return to idle',idle:'Auto blink',follow:'Follow pointer',pause:'Pause motion',paused:'Paused',title:'Motions',note:'Basic feedback only. Expressive brows and smile are not rigged.'}
    };
    const tr=key=>(copy[window.galVoice?.language]||copy.zh)[key]||key;
    const buttons=document.createElement('div');buttons.className='motion-buttons';panel.append(buttons);
    const start=value=>{manual=false;motion.play(value,performance.now()/1000);pause.checked=false;};
    for(const value of [...Object.keys(durations),'demo','reset']){
      const b=window.galUi.button();b.dataset.action=value;b.type='button';
      b.onclick=()=>{if(value==='reset'){manual=false;motion.reset(performance.now()/1000);pause.checked=false;}else start(value);};buttons.append(b);
    }
    const toggles=document.createElement('div');toggles.className='motion-toggles';panel.append(toggles);
    const toggle=(key,checked,change)=>{const label=document.createElement('label'),input=document.createElement('input'),text=document.createElement('span');input.type='checkbox';input.checked=checked;input.dataset.motion=key;text.dataset.label=key;input.onchange=()=>change(input.checked);label.append(input,text);toggles.append(label);return input;};
    toggle('idle',motion.idle,value=>{motion.idle=value;});
    const pause=toggle('pause',false,value=>{manual=false;motion.reset(performance.now()/1000);motion.paused=value;});
    const note=document.createElement('small');note.dataset.label='note';panel.append(note);
    const labels=()=>{panel.querySelectorAll('[data-action]').forEach(b=>b.textContent=tr(b.dataset.action));panel.querySelectorAll('[data-label]').forEach(e=>e.textContent=tr(e.dataset.label));};
    window.addEventListener('gal-language',labels);
    let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
    for(const vertices of d.vertexPositions)for(let j=0;j<vertices.length;j+=2){minX=Math.min(minX,vertices[j]);maxX=Math.max(maxX,vertices[j]);minY=Math.min(minY,vertices[j+1]);maxY=Math.max(maxY,vertices[j+1]);}
    labels();
    window.live2dPreview={model,motion,supported,play:start,pose:(left,right,mouth)=>{manual=true;motion.reset(performance.now()/1000);set('ParamEyeLOpen',left);set('ParamEyeROpen',right);set('ParamMouthOpenY',mouth);},get action(){return manual?'manual':motion.action;}};
    let previousAction='',previousTime=0;
    const draw=now=>{
      const character=window.galCharacter?.state;
      canvas.hidden=character?.mode!=='live2d'||character?.model!=='xiaoheiyu';panel.hidden=canvas.hidden;
      if(canvas.hidden){requestAnimationFrame(draw);return;}
      expression.set(character?.emotion||'neutral',now/1000);
      const state=motion.sample(now/1000,{speaking});
      if(!manual&&!motion.paused){const values=expression.sample(now/1000,state,supported,previousTime?(now-previousTime)/1000:.016);for(const [id,value] of Object.entries(values))set(id,value);}
      previousTime=now;
      status.textContent=`${window.galVoice?.t('preview')||'小黑鱼'} · ${window.galCharacter?.text(character.emotion==='neutral'?'idle':character.emotion)||tr(state.action)} · ${tr(manual?'idle':state.action)}`;
      if(previousAction!==state.action){previousAction=state.action;buttons.querySelectorAll('button').forEach(b=>{const active=b.dataset.action===state.action||(b.dataset.action==='demo'&&motion.action==='demo');b.classList.toggle('active',active);});}
      model.update();
      const ratio=Math.min(devicePixelRatio,2),w=Math.round(canvas.clientWidth*ratio),h=Math.round(canvas.clientHeight*ratio);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
      const fit=Math.min(w*.9/(maxX-minX),h*.94/(maxY-minY));gl.uniform2f(scale,2*fit/w,2*fit/h);gl.uniform2f(center,(minX+maxX)/2,(minY+maxY)/2);
      const orders=model.getRenderOrders();const order=Array.from({length:d.count},(_,i)=>i).sort((a,b)=>orders[a]-orders[b]);
      // The generated head layer contains stray hands/skirt/legs. Clip these in
      // model space for this local preview; the source Cubism artwork still needs cleanup.
      for(const i of order){if(d.opacities[i]<=0)continue;gl.uniform1f(clipMinY,d.ids[i]==='head_base'?.07:-1000);gl.uniform1f(bodyLayer,d.ids[i]==='body'?1:0);const b=buffers[i];gl.bindTexture(gl.TEXTURE_2D,textures[d.textureIndices[i]]);gl.uniform1f(opacity,d.opacities[i]);gl.bindBuffer(gl.ARRAY_BUFFER,b.p);gl.bufferData(gl.ARRAY_BUFFER,d.vertexPositions[i],gl.DYNAMIC_DRAW);gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,b.uv);gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,b.indices);gl.drawElements(gl.TRIANGLES,d.indices[i].length,gl.UNSIGNED_SHORT,0);}
      d.resetDynamicFlags();requestAnimationFrame(draw);
    };requestAnimationFrame(draw);
  }catch(error){status.textContent='Live2D：'+error.message;window.dispatchEvent(new CustomEvent('gal-renderer-error',{detail:error.message}));console.error(error);}
})();
