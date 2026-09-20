(() => {
 const labels={zh:{character:'角色',close:'关闭 / ESC',choose:'选择角色',edit:'角色设定',gallery:'立绘素材'},en:{character:'Character',close:'Close / ESC',choose:'Choose character',edit:'Persona',gallery:'Artwork'},ja:{character:'キャラ',close:'閉じる / ESC',choose:'キャラ選択',edit:'人格設定',gallery:'立ち絵素材'}};
 function render(){const copy=labels[window.aiboVoice.language]||labels.en;document.querySelectorAll('[data-layout-text]').forEach(el=>el.textContent=copy[el.dataset.layoutText]);for(const id of ['edit','gallery'])document.getElementById('btn-'+id).textContent=copy[id];}
 window.addEventListener('aibo-language',render);render();
})();
