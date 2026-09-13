import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=new URL('../web/live2d/',import.meta.url);
const context=vm.createContext({console,setTimeout,clearTimeout,atob});
vm.runInContext(fs.readFileSync(new URL('vendor/live2dcubismcore.min.js',root),'utf8'),context);
await new Promise(resolve=>setTimeout(resolve,300));
const bytes=fs.readFileSync(new URL('model/xiaoheiyu-api-test.moc3',root));
context.bytes=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
const results=vm.runInContext(`(()=>{
const moc=Live2DCubismCore.Moc.fromArrayBuffer(bytes),model=Live2DCubismCore.Model.fromMoc(moc),d=model.drawables;
const results=[];
for(const [param,open,closed] of [['ParamEyeLOpen','eye_open_L','eye_closed_L'],['ParamEyeROpen','eye_open_R','eye_closed_R'],['ParamMouthOpenY','mouth_open','mouth_closed']]){
 for(const value of [0,.5,1]){model.parameters.values[model.parameters.ids.indexOf(param)]=value;model.update();results.push({param,value,open:d.opacities[d.ids.indexOf(open)],closed:d.opacities[d.ids.indexOf(closed)]});}
}
return JSON.stringify({results,masks:Array.from(d.maskCounts),constantFlags:Array.from(d.constantFlags),orders:Array.from(model.getRenderOrders())});
})()`,context);
const data=JSON.parse(results);
for(const row of data.results){assert(Math.abs(row.open-row.value)<.001,JSON.stringify(row));assert(Math.abs(row.closed-(1-row.value))<.001,JSON.stringify(row));}
assert(data.masks.every(v=>v===0));assert(data.constantFlags.every(v=>(v & 3)===0));
console.log(JSON.stringify({passed:true,...data},null,2));
