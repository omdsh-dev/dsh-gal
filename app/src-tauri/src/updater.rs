// Only the native process can download/install updates or restart the app.
use std::sync::{atomic::{AtomicBool, Ordering}, Mutex};
use std::time::Duration;
use tauri::{menu::{Menu, MenuItem, Submenu}, AppHandle, Manager};
use tauri_plugin_dialog::{DialogExt, MessageDialogButtons};
use tauri_plugin_updater::UpdaterExt;

static BUSY: AtomicBool = AtomicBool::new(false);
static READY: AtomicBool = AtomicBool::new(false);
static OFFERED: Mutex<Option<String>> = Mutex::new(None);

struct CheckGuard;
impl Drop for CheckGuard {
    fn drop(&mut self) { BUSY.store(false, Ordering::SeqCst); }
}
fn should_offer(previous: Option<&str>, version: &str, manual: bool) -> bool {
    manual || previous != Some(version)
}
async fn confirm(app: AppHandle, title: String, message: String, action: &str) -> Result<bool, String> {
    let action = action.to_owned();
    // The dialog plugin dispatches AppKit work onto the main thread; waiting
    // happens off the UI and async executors. No webview dialog IPC is enabled.
    tauri::async_runtime::spawn_blocking(move || app.dialog().message(message).title(title)
        .buttons(MessageDialogButtons::OkCancelCustom(action, "稍后".into())).blocking_show())
        .await.map_err(|error| error.to_string())
}
fn restart(app: &AppHandle) {
    // Restart can bypass exit callbacks, so stop our dsh process first.
    let state = app.state::<Mutex<super::Supervisor>>();
    if let Some(mut child) = state.lock().unwrap().child.take() { super::kill_tree(&mut child); }
    app.restart();
}
fn check(app: AppHandle, item: MenuItem<tauri::Wry>, manual: bool) {
    if READY.load(Ordering::SeqCst) || BUSY.swap(true, Ordering::SeqCst) { return; }
    tauri::async_runtime::spawn(async move {
        let _guard = CheckGuard;
        let _ = item.set_text("正在检查更新…");
        let _ = item.set_enabled(false);
        let result = async {
            let update = app.updater_builder().timeout(Duration::from_secs(60)).build()
                .map_err(|e| e.to_string())?.check().await.map_err(|e| e.to_string())?;
            if let Some(update) = update {
                let version = update.version.clone();
                let _ = item.set_text(format!("更新至 {version}…"));
                let offer = {
                    let mut previous = OFFERED.lock().unwrap();
                    let offer = should_offer(previous.as_deref(), &version, manual);
                    if offer { *previous = Some(version.clone()); }
                    offer
                };
                if !offer || !confirm(app.clone(), format!("Aibo {version} 可更新"),
                    "发现新版本。点击后将下载、验证签名并安装；完成后可选择重启。会话与设置会保留。".into(), "下载并安装").await? {
                    return Ok::<(), String>(());
                }
                let _ = item.set_text(format!("正在下载 {version}…"));
                update.download_and_install(|_, _| {}, || {}).await.map_err(|e| e.to_string())?;
                READY.store(true, Ordering::SeqCst);
                let _ = item.set_text(format!("重启以更新至 {version}…"));
                if confirm(app.clone(), "更新已安装".into(),
                    format!("重启后即可使用 Aibo {version}。如果还有任务正在执行，可以稍后从「更新」菜单重启。"), "重启 Aibo").await? {
                    restart(&app);
                }
            } else {
                let _ = item.set_text("已是最新版本 · 再次检查");
            }
            Ok::<(), String>(())
        }.await;
        if let Err(error) = result {
            eprintln!("[aibo updater] {error}");
            if READY.load(Ordering::SeqCst) { let _ = item.set_text("更新已安装 · 点击重启"); }
            else {
                // A failed transfer should be offered again on the next check.
                *OFFERED.lock().unwrap() = None;
                let _ = item.set_text("更新失败 · 点击重试");
            }
        }
        let _ = item.set_enabled(true);
    });
}

pub fn setup(app: &mut tauri::App) -> tauri::Result<()> {
    let item = MenuItem::with_id(app, "aibo-update",
        if cfg!(debug_assertions) { "开发版不检查更新" } else { "检查更新…" },
        !cfg!(debug_assertions), None::<&str>)?;
    let menu = Menu::default(app.handle())?;
    let updates = Submenu::with_items(app, "更新", true, &[&item])?;
    menu.append(&updates)?;
    app.set_menu(menu)?;
    if cfg!(debug_assertions) { return Ok(()); }
    app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
    app.handle().plugin(tauri_plugin_dialog::init())?;
    let manual = item.clone();
    app.on_menu_event(move |app, event| {
        if event.id().as_ref() == "aibo-update" {
            if READY.load(Ordering::SeqCst) { restart(app); }
            else { check(app.clone(), manual.clone(), true); }
        }
    });
    let handle = app.handle().clone();
    std::thread::spawn(move || {
        std::thread::sleep(Duration::from_secs(20));
        loop {
            check(handle.clone(), item.clone(), false);
            std::thread::sleep(Duration::from_secs(4 * 60 * 60));
        }
    });
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::should_offer;
    #[test]
    fn prompt_once_per_version_but_manual_check_can_retry() {
        assert!(should_offer(None, "0.2.0", false));
        assert!(!should_offer(Some("0.2.0"), "0.2.0", false));
        assert!(should_offer(Some("0.2.0"), "0.2.0", true));
        assert!(should_offer(Some("0.2.0"), "0.2.1", false));
    }
}
