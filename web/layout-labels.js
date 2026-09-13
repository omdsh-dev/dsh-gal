(() => {
 const labels={zh:{character:'角色',close:'关闭 / ESC',choose:'选择角色',edit:'人设与记忆',gallery:'立绘素材'},en:{character:'Character',close:'Close / ESC',choose:'Choose character',edit:'Persona & memory',gallery:'Artwork'},ja:{character:'キャラ',close:'閉じる / ESC',choose:'キャラ選択',edit:'人格と記憶',gallery:'立ち絵素材'}};
 function render(){const copy=labels[window.galVoice.language]||labels.en;document.querySelectorAll('[data-layout-text]').forEach(el=>el.textContent=copy[el.dataset.layoutText]);for(const id of ['edit','gallery'])document.getElementById('btn-'+id).textContent=copy[id];}
 window.addEventListener('gal-language',render);render();
})();
