// Measure the actual input caret; ordinary mouse movements never supply gaze.
const input = document.getElementById('text');
const mirror = document.createElement('span');
mirror.setAttribute('aria-hidden','true');
Object.assign(mirror.style,{position:'fixed',visibility:'hidden',whiteSpace:'pre',pointerEvents:'none',left:'-10000px'});
document.body.append(mirror);
let frame;
function report() {
  cancelAnimationFrame(frame);
  frame = requestAnimationFrame(() => {
    let point = null;
    if (document.hasFocus() && document.activeElement === input) {
      const style = getComputedStyle(input), rect = input.getBoundingClientRect();
      for (const key of ['font','letterSpacing','textTransform']) mirror.style[key] = style[key];
      const end = input.selectionDirection === 'backward' ? input.selectionStart : input.selectionEnd;
      mirror.textContent = input.value.slice(0,end ?? input.value.length);
      const left = parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
      const right = parseFloat(style.paddingRight) + parseFloat(style.borderRightWidth);
      point = [rect.left + Math.max(left,Math.min(rect.width-right,left+mirror.getBoundingClientRect().width-input.scrollLeft)),rect.top+rect.height/2];
    }
    void window.__TAURI__.core.invoke('pet_caret',{point}).catch(console.error);
  });
}
for (const name of ['input','keyup','click','select','scroll','focus','blur','compositionend']) input.addEventListener(name,report);
document.addEventListener('selectionchange',report);
for (const name of ['focus','blur','resize']) window.addEventListener(name,report);
window.__TAURI__.event.listen('aibo://launcher-open',report);
new ResizeObserver(report).observe(input);
report();
