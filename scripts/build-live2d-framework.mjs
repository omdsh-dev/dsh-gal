// Apply a narrow, reproducible scheduling patch to the pinned upstream source.
import {build} from '../ui/node_modules/esbuild/lib/main.js';
import {readFile} from 'node:fs/promises';
await build({entryPoints:['web/live2d/sdk-entry.ts'],bundle:true,format:'esm',minify:true,outfile:'web/live2d/vendor/cubism-framework.mjs',plugins:[{name:'cooperative-shader-startup',setup(build){build.onLoad({filter:/cubismshader_webgl\.ts$/},async({path})=>{
 let contents=await readFile(path,'utf8');
 const edits=[
 ['.then(() => {','.then(async () => {'],
 ['this.registerBlendShader();','await this.registerBlendShader();'],
 ['public registerBlendShader(): void {','public async registerBlendShader(): Promise<void> {'],
 ['        this.generateBlendShader(','        await new Promise(resolve => setTimeout(resolve, 0));\n        this.generateBlendShader('],
 ["console.error('Failed to load shaders:', error);","this._loadError = error;\n        console.error('Failed to load shaders:', error);"],
 ['    return await response.text();',"    if (!response.ok) throw new Error('Shader fetch failed: ' + response.status);\n    return await response.text();"]
 ];
 for(const [from,to] of edits){if(contents.split(from).length!==2)throw Error('Pinned Framework patch mismatch: '+from);contents=contents.replace(from,to);}
 return {contents,loader:'ts'};
});}}]});
