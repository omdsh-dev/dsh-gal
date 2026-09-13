(() => {
 const labels={zh:{character:'角色',close:'关闭 / ESC',choose:'选择角色',motion:'动作调试',edit:'人设与记忆',gallery:'立绘素材',auto:'自动翻页'},en:{character:'Character',close:'Close / ESC',choose:'Choose character',motion:'Motion preview',edit:'Persona & memory',gallery:'Artwork',auto:'Auto advance'},ja:{character:'キャラ',close:'閉じる / ESC',choose:'キャラ選択',motion:'モーション確認',edit:'人格と記憶',gallery:'立ち絵素材',auto:'自動送り'}};
 function render(){const copy=labels[window.galVoice.language]||labels.en;document.querySelectorAll('[data-layout-text]').forEach(el=>el.textContent=copy[el.dataset.layoutText]);for(const id of ['edit','gallery','auto'])document.getElementById('btn-'+id).textContent=copy[id];}
 window.addEventListener('gal-language',render);render();
})();
