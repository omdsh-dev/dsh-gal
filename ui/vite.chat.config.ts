import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
// Second entry: the chat-room layout (history on the left, character on the
// right). Built separately so the classic stage bundle stays untouched.
export default defineConfig({define:{"process.env.NODE_ENV":JSON.stringify("production")},resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}},build:{target:'es2022',outDir:'../web/chat',emptyOutDir:true,lib:{entry:'src/chat/main.tsx',formats:['es'],fileName:()=> 'app.js',cssFileName:'app'},rollupOptions:{onwarn(warning,warn){if(warning.code==='MODULE_LEVEL_DIRECTIVE')return;warn(warning);},output:{assetFileNames:'app.[ext]'}}}});
