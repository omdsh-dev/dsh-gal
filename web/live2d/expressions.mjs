// Semantic presets. Only genuinely bound parameters are applied by the renderer.
export const presets={
 neutral:{},
 thinking:{ParamAngleY:-4,ParamEyeBallX:.35,ParamEyeBallY:.1,ParamBrowLY:.15,ParamBrowRY:.15},
 happy:{ParamEyeLSmile:1,ParamEyeRSmile:1,ParamMouthForm:.8,ParamCheek:.45},
 sad:{ParamBrowLAngle:-.65,ParamBrowRAngle:-.65,ParamBrowLY:-.35,ParamBrowRY:-.35,ParamMouthForm:-.7,ParamAngleY:-5},
 surprised:{ParamBrowLY:.7,ParamBrowRY:.7,ParamMouthOpenY:.55},
 excited:{ParamEyeLSmile:1,ParamEyeRSmile:1,ParamMouthForm:1,ParamCheek:.7,ParamMouthOpenY:.3},
};
// Compare actual drawable output, not just the presence of parameter names.
export function boundParameters(model){
 const p=model.parameters,d=model.drawables,saved=Float32Array.from(p.values);
 const snapshot=()=>[...d.opacities,...d.vertexPositions.flatMap(a=>Array.from(a))];
 p.values.set(p.defaultValues);model.update();const baseline=snapshot(),bound=[];
 for(let i=0;i<p.count;i++){
  for(const v of [p.minimumValues[i],p.maximumValues[i]]){
   p.values[i]=v;model.update();const values=snapshot();
   if(values.some((value,j)=>Math.abs(value-baseline[j])>1e-5)){bound.push(p.ids[i]);break;}
  }
  p.values[i]=p.defaultValues[i];
 }
 p.values.set(saved);model.update();return bound;
}
export class ExpressionController{
 constructor(){this.emotion='neutral';this.started=0;this.values={};}
 set(emotion,now){if(!Object.hasOwn(presets,emotion))emotion='neutral';if(this.emotion!==emotion){this.emotion=emotion;this.started=now;}}
 sample(now,base,available,dt){
  const supported=new Set(available),target=presets[this.emotion],result={};
  // Reset previous expressions smoothly; never apply a whole-character transform.
  for(const id of new Set(Object.values(presets).flatMap(p=>Object.keys(p)))){
   if(!supported.has(id))continue;
   const value=target[id]||0,weight=1-Math.exp(-Math.min(dt,.1)*10);
   this.values[id]=(this.values[id]||0)+(value-(this.values[id]||0))*weight;
   result[id]=this.values[id];
  }
  result.ParamEyeLOpen=base.left;result.ParamEyeROpen=base.right;
  result.ParamMouthOpenY=Math.max(base.mouth,result.ParamMouthOpenY||0);
  // The prototype has no expressive brows/smile. Give short eye feedback only.
  const limited=!supported.has('ParamMouthForm');const age=now-this.started;
  if(limited&&base.action==='idle'){
   const span=this.emotion==='sad'?1.1:this.emotion==='thinking'?.65:.4;
   if(age<span&&this.emotion!=='neutral'){
    const close=Math.sin(Math.PI*Math.max(0,age)/span);
    result.ParamEyeLOpen=Math.min(base.left,1-close);
    if(this.emotion!=='happy')result.ParamEyeROpen=Math.min(base.right,1-close);
   }
  }
  return result;
 }
}
