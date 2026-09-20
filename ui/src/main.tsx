import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {createPortal,flushSync} from 'react-dom';
import {Dialog,DialogContent,DialogTitle} from '@/components/ui/dialog';
import {buttonVariants} from '@/components/ui/button';
import {Stage} from './Stage';
import {CharacterHub,MemoryPanel,ArtifactsPanel,SpeechPanel,HelpPanel,History} from './Panels';
import './theme.css';
import {render as renderMarkdown} from './markdown';

declare global { interface Window {aiboUi:any;aiboVoice:any;aiboMarkdown:any;} }
// The imperative controllers below expect this to exist before they load.
window.aiboMarkdown={render:renderMarkdown};
const definitions={'character-hub':CharacterHub,'memory-panel':MemoryPanel,'artifacts-panel':ArtifactsPanel,'speech-panel':SpeechPanel,'help-panel':HelpPanel,history:History};
type PanelId=keyof typeof definitions;
const parking=document.createElement('div');parking.id='panel-parking';parking.hidden=true;document.body.append(parking);
const hosts=Object.fromEntries(Object.keys(definitions).map(id=>{const el=document.createElement('div');el.id=id;el.className='aibo-panel hidden';parking.append(el);return[id,el];})) as Record<PanelId,HTMLDivElement>;
let setPanel:(id:PanelId|null)=>void;
const bridge={
 open(id:PanelId){flushSync(()=>setPanel(id));},
 close(){flushSync(()=>setPanel(null));},
 button(){const button=document.createElement('button');button.type='button';button.className=buttonVariants({variant:'ghost'});button.dataset.slot='button';return button;},
 requestClose(){window.dispatchEvent(new Event('aibo-request-close'));}
};
window.aiboUi=bridge;
function PanelMount({id}:{id:PanelId}){
 const ref=React.useRef<HTMLDivElement>(null);
 React.useLayoutEffect(()=>{const el=hosts[id];ref.current!.append(el);return()=>{parking.append(el);};},[id]);
 return <div ref={ref} className="panel-mount"/>;
}
function ModalManager(){
 const [current,setCurrent]=React.useState<PanelId|null>(null);const[language,setLanguage]=React.useState('zh');
 setPanel=setCurrent;
 React.useEffect(()=>{const change=()=>setLanguage(window.aiboVoice?.language||'zh');window.addEventListener('aibo-language',change);return()=>window.removeEventListener('aibo-language',change);},[]);
 const names:Record<string,string[]>={zh:['角色','记忆','手记','设置','帮助与快捷键','对话记录'],en:['Character','Memory','Files','Settings','Help & shortcuts','Conversation history'],ja:['キャラクター','記憶','手記','設定','ヘルプとショートカット','会話履歴']};
 const title=current?(names[language]||names.zh)[Object.keys(definitions).indexOf(current)]:'';
 return <Dialog open={Boolean(current)} onOpenChange={open=>{if(!open)bridge.requestClose();}}><DialogContent className="aibo-dialog" closeLabel={language==='zh'?'关闭':language==='ja'?'閉じる':'Close'} aria-describedby={undefined} onOpenAutoFocus={e=>e.preventDefault()} onCloseAutoFocus={e=>e.preventDefault()} onEscapeKeyDown={e=>{if(e.isComposing)e.preventDefault();}}>
 <DialogTitle className="sr-only">{title}</DialogTitle>
 {current&&<PanelMount key={current} id={current}/>}
 </DialogContent></Dialog>;
}
function App(){return <><Stage/>{Object.entries(definitions).map(([id,Panel])=>createPortal(<Panel/>,hosts[id as PanelId],id))}<ModalManager/></>;}
flushSync(()=>createRoot(document.getElementById('root')!).render(<App/>));
// Load imperative controllers only after all persistent React UI nodes exist.
for(const file of ['voice-controls.js','speech-settings.js','character-state.js','app.js','layout-labels.js','ui-labels.js']){
 await new Promise<void>((resolve,reject)=>{const script=document.createElement('script');script.src='./'+file;script.onload=()=>resolve();script.onerror=()=>reject(Error('Cannot load '+file));document.body.append(script);});
}
