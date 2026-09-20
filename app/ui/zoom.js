// Document-start initialization in the main desktop webview. Native storage is
// shared by the boot, preview and bundled pages, independently of their origins.
(() => {
  const bridge = window.__TAURI_INTERNALS__;
  if (bridge.metadata.currentWindow.label !== 'main' || window.__aiboZoomInstalled) return;
  window.__aiboZoomInstalled = true;
  let zoom = 1;
  const report = error => console.error('Could not save or restore zoom', error);
  let pending = bridge.invoke('restore_zoom').then(value => { zoom = value; }).catch(report);
  const change = (direction) => {
    // Queue behind restoration as well as previous writes: a key pressed during
    // startup must step from the saved size, not the temporary 100% default.
    pending = pending.then(async () => {
      const value = direction === 0 ? 1 : Math.min(10, Math.max(0.2, Math.round((zoom + direction * 0.2) * 10) / 10));
      await bridge.invoke('set_zoom_level', { value });
      zoom = value;
    }).catch(report);
  };
  window.addEventListener('keydown', event => {
    if (!(event.metaKey || event.ctrlKey) || event.altKey || event.isComposing) return;
    let direction;
    if (event.key === '-' || event.key === '_') direction = -1;
    else if (event.key === '=' || event.key === '+') direction = 1;
    else if (event.key === '0') direction = 0;
    else return;
    event.preventDefault();
    change(direction);
  }, true);
  window.addEventListener('wheel', event => {
    if (!event.ctrlKey || event.deltaY === 0) return;
    event.preventDefault();
    change(event.deltaY < 0 ? 1 : -1);
  }, { passive: false });
})();
