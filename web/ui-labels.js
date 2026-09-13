/* Labels for the React shell; content nodes remain owned by the UI bridge. */
(()=>{
 const copy={
 zh:{help:'帮助',restore:'返回对话','ed-name':'名字','ed-greeting':'开场白','ed-persona':'人设','ed-rate':'立绘动画速度','ed-memory':'角色记忆',save:'保存修改',import:'导入角色',export:'导出角色',galleryHint:'选择一张立绘预览表情。拖入图片或视频，或点击右上角上传按钮，即可替换素材。',history:'对话记录',close:'关闭',state:'表情预览'},
 en:{help:'Help',restore:'Back to dialogue','ed-name':'Name','ed-greeting':'Greeting','ed-persona':'Persona','ed-rate':'Artwork animation speed','ed-memory':'Character memory',save:'Save changes',import:'Import character',export:'Export character',galleryHint:'Select artwork to preview its expression. Drop an image or video, or use the upload button to replace it.',history:'Conversation history',close:'Close',state:'Expression preview'},
 ja:{help:'ヘルプ',restore:'会話に戻る','ed-name':'名前','ed-greeting':'あいさつ','ed-persona':'人格','ed-rate':'立ち絵の再生速度','ed-memory':'キャラの記憶',save:'変更を保存',import:'キャラを読み込む',export:'キャラを書き出す',galleryHint:'立ち絵を選んで表情を確認できます。画像や動画をドロップするか、アップロードボタンで素材を変更します。',history:'会話履歴',close:'閉じる',state:'表情プレビュー'}
 };
 function render(){const c=copy[window.galVoice.language]||copy.en;document.getElementById('character-state-preview').setAttribute('aria-label',c.state);document.querySelectorAll('[data-ui-text]').forEach(el=>el.textContent=c[el.dataset.uiText]||'');}
 window.addEventListener('gal-language',render);render();
})();
