// Updates stay in the native process: the remotely served chat has no install
// or restart permission. Only release builds register the updater.
use std::sync::atomic::{AtomicBool, Ordering};
use std::time::Duration;
use tauri::{menu::{Menu, MenuItem, Submenu}, AppHandle};
use tauri_plugin_updater::UpdaterExt;

static BUSY: AtomicBool = AtomicBool::new(false);
static READY: AtomicBool = AtomicBool::new(false);

struct CheckGuard;
impl Drop for CheckGuard {
    fn drop(&mut self) { BUSY.store(false, Ordering::SeqCst); }
}

fn check(app: AppHandle, item: MenuItem<tauri::Wry>) {
    if READY.load(Ordering::SeqCst) || BUSY.swap(true, Ordering::SeqCst) { return; }
    tauri::async_runtime::spawn(async move {
        let _guard = CheckGuard;
        let _ = item.set_text("正在检查更新…");
        let _ = item.set_enabled(false);
        let result = async {
            let update = app.updater_builder().timeout(Duration::from_secs(60)).build()?
                .check().await?;
            if let Some(update) = update {
                let version = update.version.clone();
                let _ = item.set_text(format!("正在下载 {version}…"));
                update.download_and_install(|_, _| {}, || {}).await?;
                READY.store(true, Ordering::SeqCst);
                let _ = item.set_text(format!("重启以更新至 {version}…"));
            } else {
                let _ = item.set_text("已是最新版本 · 再次检查");
            }
            Ok::<(), tauri_plugin_updater::Error>(())
        }.await;
        if let Err(error) = result {
            eprintln!("[aibo updater] {error}");
            let _ = item.set_text("更新失败 · 点击重试");
        }
        let _ = item.set_enabled(true);
    });
}

pub fn setup(app: &mut tauri::App) -> tauri::Result<()> {
    let item = MenuItem::with_id(app, "aibo-update",
        if cfg!(debug_assertions) { "开发版不检查更新" } else { "检查更新…" },
        !cfg!(debug_assertions), None::<&str>)?;
    // Preserve the standard app/edit/window menu and its keyboard shortcuts.
    let menu = Menu::default(app.handle())?;
    let updates = Submenu::with_items(app, "更新", true, &[&item])?;
    menu.append(&updates)?;
    app.set_menu(menu)?;
    if cfg!(debug_assertions) { return Ok(()); }
    app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
    let manual = item.clone();
    app.on_menu_event(move |app, event| {
        if event.id().as_ref() == "aibo-update" {
            if READY.load(Ordering::SeqCst) {
                // Explicitly stop dsh before relaunch; restart may bypass normal
                // exit callbacks on some platforms.
                use tauri::Manager;
                let state = app.state::<std::sync::Mutex<super::Supervisor>>();
                if let Some(mut child) = state.lock().unwrap().child.take() {
                    super::kill_tree(&mut child);
                }
                app.restart();
            } else {
                check(app.clone(), manual.clone());
            }
        }
    });
    let handle = app.handle().clone();
    // Blocking timer lives off the UI/async executor; no startup dialog or
    // automatic restart interrupts an active conversation.
    std::thread::spawn(move || {
        std::thread::sleep(Duration::from_secs(20));
        loop {
            check(handle.clone(), item.clone());
            std::thread::sleep(Duration::from_secs(4 * 60 * 60));
        }
    });
    Ok(())
}
