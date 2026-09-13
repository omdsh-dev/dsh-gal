import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {boundParameters,ExpressionController,presets} from '../web/live2d/expressions.mjs';
const context=vm.createContext({console,setTimeout,clearTimeout,atob});
vm.runInContext(fs.readFileSync(new URL('../web/live2d/vendor/live2dcubismcore.min.js',import.meta.url),'utf8'),context);
await new Promise(resolve=>setTimeout(resolve,300));
const bytes=fs.readFileSync(new URL('../web/live2d/model/xiaoheiyu-api-test.moc3',import.meta.url));context.bytes=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
const model=vm.runInContext('Live2DCubismCore.Model.fromMoc(Live2DCubismCore.Moc.fromArrayBuffer(bytes))',context);
const initial=Array.from(model.parameters.values),supported=boundParameters(model);
assert.deepEqual(Array.from(supported).sort(),['ParamEyeLOpen','ParamEyeROpen','ParamMouthOpenY'].sort());assert.deepEqual(Array.from(model.parameters.values),initial);
const controller=new ExpressionController(),base={action:'idle',left:1,right:1,mouth:0};
for(const name of Object.keys(presets)){controller.set(name,0);const values=controller.sample(.2,base,supported,.016);assert.ok(Object.keys(values).every(id=>supported.includes(id)));assert.ok(Object.values(values).every(value=>value>=0&&value<=1));}
controller.set('surprised',1);const expressive=controller.sample(1.3,base,['ParamBrowLY','ParamBrowRY',...supported],.1);assert.ok(expressive.ParamBrowLY>0);
controller.set('neutral',2);let result;for(let i=0;i<50;i++)result=controller.sample(2+i*.1,base,['ParamBrowLY','ParamBrowRY',...supported],.1);assert.ok(Math.abs(result.ParamBrowLY)<.001);assert.ok(result.ParamMouthOpenY<.001);
console.log('PASS: actual model bindings, absent-parameter protection, six states, smooth reset to neutral.');
