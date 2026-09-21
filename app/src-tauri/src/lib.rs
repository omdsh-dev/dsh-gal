//! Aibo desktop shell: a Tauri window around the Aibo visual-novel UI.
//!
//! On launch the supervisor
//!   1. installs a private dsh runtime under Application Support (once),
//!   2. stages the bundled plugin next to it and links its dependencies into
//!      that runtime,
//!   3. spawns `dsh --profile web --patch <aibo.patch.yml>` with the plugin
//!      mounted on 127.0.0.1:4877 — unless an Aibo server is already
//!      answering there, in which case it simply attaches,
//!   4. polls the plugin's manifest and navigates the window to it.
//! The child process is killed when the window closes.
//!
//! A second, frameless `launcher` window is bound to a global shortcut so a
//! message can be sent from any app without going to the main window at all:
//! the line goes to the running session, the bar puts itself away, and focus
//! returns to whatever you were doing. Her reply is waiting in the main window
//! whenever you next open it.

use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::{Child, Command, Stdio};
use std::sync::atomic::{AtomicI32, Ordering};
use std::sync::Mutex;
use std::time::{Duration, Instant};

#[cfg(target_os = "macos")]
mod launcher_panel;
mod updater;

use serde::Serialize;
use tauri::{AppHandle, Emitter, Manager, RunEvent};

/// dsh version the private runtime pins. Bump together with the plugin.
const DSH_VERSION: &str = "0.1.5-rc.1";
/// Port the bundled plugin listens on (matches the plugin's default).
const AIBO_PORT: u16 = 4877;
const AIBO_URL: &str = "http://127.0.0.1:4877/";
/// The UI is the same page in a browser and in this shell; the marker tells it
/// to leave room for the traffic lights and to make the top strip draggable.
const AIBO_SHELL_URL: &str = "http://127.0.0.1:4877/?shell=desktop";

#[derive(Clone, Serialize)]
struct Status {
    stage: &'static str,
    detail: String,
}

struct Supervisor {
    child: Option<Child>,
}

/// Process group of the spawned dsh, for the SIGTERM/SIGINT path where the
/// Tauri exit event never runs (e.g. `kill <pid>` or a logout).
static CHILD_PGID: AtomicI32 = AtomicI32::new(0);

#[cfg(unix)]
extern "C" fn on_terminate(_sig: libc::c_int) {
    let pgid = CHILD_PGID.load(Ordering::SeqCst);
    if pgid > 0 {
        unsafe { libc::killpg(pgid, libc::SIGTERM) };
    }
    unsafe { libc::_exit(0) }
}

#[cfg(unix)]
fn install_signal_handlers() {
    unsafe {
        libc::signal(libc::SIGTERM, on_terminate as libc::sighandler_t);
        libc::signal(libc::SIGINT, on_terminate as libc::sighandler_t);
        libc::signal(libc::SIGHUP, on_terminate as libc::sighandler_t);
    }
}

fn emit(app: &AppHandle, stage: &'static str, detail: impl Into<String>) {
    let detail = detail.into();
    eprintln!("[aibo] {stage}: {detail}");
    let _ = app.emit("aibo://status", Status { stage, detail });
}

fn app_support() -> PathBuf {
    dirs::data_dir()
        .unwrap_or_else(|| PathBuf::from("/tmp"))
        .join("aibo")
}

/// Run a command through the user's login shell so `node`/`npm` resolve from
/// their PATH (Homebrew, nvm, fnm, volta…) even when launched from Finder.
fn login_shell(script: &str) -> Command {
    let shell = std::env::var("SHELL").unwrap_or_else(|_| "/bin/zsh".into());
    let mut cmd = Command::new(shell);
    cmd.arg("-lc").arg(script);
    cmd
}

fn shell_quote(path: &Path) -> String {
    format!("'{}'", path.display().to_string().replace('\'', "'\\''"))
}

fn aibo_alive() -> bool {
    ureq::get(&format!("{AIBO_URL}manifest.json"))
        .config()
        .timeout_global(Some(Duration::from_millis(800)))
        .build()
        .call()
        .map(|resp| resp.status() == 200)
        .unwrap_or(false)
}

fn ensure_runtime(app: &AppHandle, runtime: &Path) -> Result<PathBuf, String> {
    let dsh_bin = runtime.join("node_modules/.bin/dsh");
    let stamp = runtime.join(".dsh-version");
    let installed = fs::read_to_string(&stamp).map(|v| v.trim() == DSH_VERSION).unwrap_or(false);
    if dsh_bin.exists() && installed {
        return Ok(dsh_bin);
    }
    fs::create_dir_all(runtime).map_err(|e| e.to_string())?;
    fs::write(runtime.join(".npmrc"), "legacy-peer-deps=false\nfund=false\naudit=false\n").map_err(|e| e.to_string())?;
    if !runtime.join("package.json").exists() {
        fs::write(runtime.join("package.json"), "{\"name\":\"aibo-runtime\",\"private\":true}\n").map_err(|e| e.to_string())?;
    }
    emit(app, "install", format!("installing dsh {DSH_VERSION} (first launch, a few minutes)…"));
    let script = format!(
        "cd {} && npm install --no-progress @deepseek-ai/dsh@{}",
        shell_quote(runtime),
        DSH_VERSION
    );
    let output = login_shell(&script).output().map_err(|e| format!("cannot run login shell: {e}"))?;
    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let tail: String = stderr.lines().rev().take(12).collect::<Vec<_>>().into_iter().rev().collect::<Vec<_>>().join("\n");
        return Err(format!("npm install failed — is Node.js 22+ installed and on your shell PATH?\n{tail}"));
    }
    if !dsh_bin.exists() {
        return Err("npm install finished but node_modules/.bin/dsh is missing".into());
    }
    fs::write(&stamp, DSH_VERSION).map_err(|e| e.to_string())?;
    Ok(dsh_bin)
}

/// Copy the bundled plugin into Application Support (a fresh copy on every
/// launch so upgrades take effect) and link its dependencies into the runtime.
fn stage_plugin(app: &AppHandle, root: &Path, runtime: &Path) -> Result<PathBuf, String> {
    let source = app
        .path()
        .resource_dir()
        .map_err(|e| e.to_string())?
        .join("plugin");
    let dev_source = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../plugin");
    let source = if source.join("lib/index.js").exists() {
        source
    } else if dev_source.join("lib/index.js").exists() {
        dev_source
    } else {
        return Err(format!("bundled plugin not found at {}", source.display()));
    };
    let target = root.join("plugin");
    let _ = fs::remove_dir_all(&target);
    copy_dir(&source, &target).map_err(|e| format!("cannot stage plugin: {e}"))?;
    let nm = target.join("node_modules");
    fs::create_dir_all(&nm).map_err(|e| e.to_string())?;
    let scope = nm.join("@deepseek-ai");
    let _ = fs::remove_file(&scope);
    std::os::unix::fs::symlink(runtime.join("node_modules/@deepseek-ai"), &scope).map_err(|e| e.to_string())?;
    for dep in ["zod", "cosmokit"] {
        let src = runtime.join("node_modules").join(dep);
        if src.exists() {
            let _ = fs::remove_file(nm.join(dep));
            let _ = std::os::unix::fs::symlink(&src, nm.join(dep));
        }
    }
    emit(app, "stage", format!("plugin staged at {}", target.display()));
    Ok(target)
}

fn copy_dir(from: &Path, to: &Path) -> std::io::Result<()> {
    fs::create_dir_all(to)?;
    for entry in fs::read_dir(from)? {
        let entry = entry?;
        let dest = to.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_dir(&entry.path(), &dest)?;
        } else {
            fs::copy(entry.path(), dest)?;
        }
    }
    Ok(())
}

/// Every plugin staged under `plugin/plugins/` is mounted next to the UI plugin:
/// the data connectors the Data panel lists, and Computer Use. A plugin's mount
/// id is `dsh-<directory>`, which is the name each one exports.
fn plugin_rows(plugin: &Path) -> String {
    let mut dirs: Vec<PathBuf> = match fs::read_dir(plugin.join("plugins")) {
        Ok(entries) => entries.flatten().map(|e| e.path()).filter(|p| p.join("lib/index.js").exists()).collect(),
        Err(_) => return String::new(),
    };
    dirs.sort();
    let mut rows = String::new();
    for dir in dirs {
        let Some(name) = dir.file_name().and_then(|n| n.to_str()) else { continue };
        let entry = serde_json::to_string(&dir.join("lib/index.js").display().to_string()).unwrap();
        rows.push_str(&format!("    - id: dsh-{name}\n      name: {entry}\n"));
        // The only connector that needs a setting to be useful at all: the port
        // the phone pushes Health exports to.
        if name == "health" {
            rows.push_str("      config:\n        ingestPort: 4890\n");
        }
    }
    rows
}

fn write_patch(root: &Path, plugin: &Path) -> Result<PathBuf, String> {
    let patch = root.join("aibo.patch.yml");
    let plugin_rows = plugin_rows(plugin);
    let body = format!(
        "# Generated by the Aibo app on every launch.\n- insert:\n    - id: aibo\n      name: {}\n      config:\n        port: {}\n        character: {}\n{}",
        serde_json::to_string(&plugin.join("lib/index.js").display().to_string()).unwrap(),
        AIBO_PORT,
        std::env::var("AIBO_CHARACTER").unwrap_or_else(|_| {
            // The pack the staging script bundled: cetus when the checkout has it, else xiaoheiyu.
            if plugin.join("characters/cetus").exists() { "cetus".into() } else { "xiaoheiyu".into() }
        }),
        plugin_rows,
    );
    fs::write(&patch, body).map_err(|e| e.to_string())?;
    Ok(patch)
}

fn spawn_dsh(root: &Path, dsh_bin: &Path, patch: &Path) -> Result<Child, String> {
    let log = fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(root.join("dsh-web.log"))
        .map_err(|e| e.to_string())?;
    let _ = writeln!(&log, "\n==== Aibo launch {:?} ====", std::time::SystemTime::now());
    // dsh needs Node 22+. The login shell's first `node` may be older (a stray
    // /usr/local/bin/node next to a Homebrew one, say), so the newest usable
    // install found in the usual places is put first on PATH before exec.
    let script = format!(
        concat!(
            // zsh aborts the whole script on an unmatched glob unless nomatch is off; bash has no such option and ignores the line.
            "setopt nonomatch 2>/dev/null; ",
            "for n in \"$(command -v node 2>/dev/null)\" /opt/homebrew/bin/node /opt/homebrew/opt/node@22/bin/node /usr/local/bin/node ",
            "\"$HOME\"/.nvm/versions/node/v2[2-9]*/bin/node \"$HOME\"/.nvm/versions/node/v[3-9]*/bin/node; do ",
            "[ -x \"$n\" ] || continue; ",
            "if \"$n\" -e 'process.exit(parseInt(process.versions.node)>=22?0:1)' 2>/dev/null; then export PATH=\"$(dirname \"$n\"):$PATH\"; break; fi; ",
            "done; ",
            "cd \"$HOME\" && exec {} --profile web --patch {} --no-open --port 0"
        ),
        shell_quote(dsh_bin),
        shell_quote(patch)
    );
    let mut cmd = login_shell(&script);
    cmd.stdin(Stdio::null())
        .stdout(Stdio::from(log.try_clone().map_err(|e| e.to_string())?))
        .stderr(Stdio::from(log));
    // Own process group so the whole node tree dies with one signal.
    #[cfg(unix)]
    {
        use std::os::unix::process::CommandExt;
        cmd.process_group(0);
    }
    cmd.spawn().map_err(|e| format!("cannot spawn dsh: {e}"))
}

fn kill_tree(child: &mut Child) {
    #[cfg(unix)]
    unsafe {
        libc::killpg(child.id() as i32, libc::SIGTERM);
    }
    let deadline = Instant::now() + Duration::from_secs(3);
    while Instant::now() < deadline {
        if let Ok(Some(_)) = child.try_wait() {
            return;
        }
        std::thread::sleep(Duration::from_millis(100));
    }
    #[cfg(unix)]
    unsafe {
        libc::killpg(child.id() as i32, libc::SIGKILL);
    }
    let _ = child.wait();
}

fn boot(app: AppHandle) {
    // Explicit launcher mode: attach to the same current UI as the browser.
    // The launcher owns its services, so closing this shell must not kill them.
    if std::env::var("AIBO_USE_PREVIEW").as_deref() == Ok("1") {
        let url = "http://127.0.0.1:4878/?shell=desktop";
        let ready = ureq::get("http://127.0.0.1:4878/_aibo/health")
            .config().timeout_global(Some(Duration::from_secs(3))).build().call()
            .map(|response| response.status() == 200).unwrap_or(false);
        if ready {
            emit(&app, "ready", url);
            if let Some(window) = app.get_webview_window("main") {
                if let Err(error) = window.navigate(url.parse().unwrap()) {
                    emit(&app, "error", error.to_string());
                }
            }
        } else { emit(&app, "error", "界面服务尚未启动，请使用启动客户端.command。"); }
        return;
    }
    let root = app_support();
    let result: Result<(), String> = (|| {
        if aibo_alive() {
            emit(&app, "attach", "an Aibo server is already running — attaching");
            return Ok(());
        }
        let runtime = root.join("runtime");
        emit(&app, "runtime", format!("runtime: {}", runtime.display()));
        let dsh_bin = ensure_runtime(&app, &runtime)?;
        let plugin = stage_plugin(&app, &root, &runtime)?;
        let patch = write_patch(&root, &plugin)?;
        emit(&app, "spawn", "starting dsh web…");
        let child = spawn_dsh(&root, &dsh_bin, &patch)?;
        CHILD_PGID.store(child.id() as i32, Ordering::SeqCst);
        {
            let state = app.state::<Mutex<Supervisor>>();
            state.lock().unwrap().child = Some(child);
        }
        let deadline = Instant::now() + Duration::from_secs(90);
        while Instant::now() < deadline {
            if aibo_alive() {
                return Ok(());
            }
            let state = app.state::<Mutex<Supervisor>>();
            let mut guard = state.lock().unwrap();
            if let Some(child) = guard.child.as_mut() {
                if let Ok(Some(status)) = child.try_wait() {
                    let log = fs::read_to_string(root.join("dsh-web.log")).unwrap_or_default();
                    let tail: Vec<&str> = log.lines().filter(|l| !l.trim_start().starts_with("at ")).collect();
                    let tail = tail.iter().rev().take(15).cloned().collect::<Vec<_>>().into_iter().rev().collect::<Vec<_>>().join("\n");
                    return Err(format!("dsh exited early ({status})\n{tail}"));
                }
            }
            drop(guard);
            std::thread::sleep(Duration::from_millis(400));
        }
        Err("dsh started but the Aibo UI never came up on port 4877 (see dsh-web.log)".into())
    })();
    match result {
        Ok(()) => {
            emit(&app, "ready", AIBO_URL);
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.navigate(AIBO_SHELL_URL.parse().unwrap());
            }
        }
        Err(message) => emit(&app, "error", message),
    }
}

#[tauri::command]
fn retry(app: AppHandle) {
    std::thread::spawn(move || boot(app));
}

#[tauri::command]
fn support_dir() -> String {
    app_support().display().to_string()
}

/// Shortcut that summons the launcher from anywhere.
const LAUNCHER_SHORTCUT: &str = "shift+cmd+space";

/// The app that was frontmost when the launcher was summoned. Showing the bar
/// normally leaves that app active. Restore only if Aibo actually took over;
/// never raise every window of the previous app or override a subsequent switch.
/// 0 = nothing to restore (summoned from Aibo itself, or already handed back).
static PREVIOUS_APP: AtomicI32 = AtomicI32::new(0);

#[cfg(target_os = "macos")]
fn remember_frontmost() {
    use objc2_app_kit::NSWorkspace;
    let pid = NSWorkspace::sharedWorkspace()
        .frontmostApplication()
        .map(|app| app.processIdentifier())
        .unwrap_or(0);
    // Summoned from Aibo itself: there is nowhere else to hand focus back to.
    let pid = if pid == std::process::id() as i32 { 0 } else { pid };
    PREVIOUS_APP.store(pid, Ordering::SeqCst);
}

#[cfg(target_os = "macos")]
fn restore_frontmost(pid: i32) {
    use objc2_app_kit::{NSApplicationActivationOptions, NSRunningApplication, NSWorkspace};
    if NSWorkspace::sharedWorkspace().frontmostApplication()
        .map(|app| app.processIdentifier()) != Some(std::process::id() as i32) {
        return;
    }
    if pid <= 0 {
        return;
    }
    if let Some(app) = NSRunningApplication::runningApplicationWithProcessIdentifier(pid) {
        // Not `ActivateIgnoringOtherApps`: deprecated and a no-op since macOS 14,
        // and unnecessary anyway — Aibo is the active app here and is yielding.
        app.activateWithOptions(NSApplicationActivationOptions::empty());
    }
}

#[cfg(not(target_os = "macos"))]
fn remember_frontmost() {}

#[cfg(not(target_os = "macos"))]
fn restore_frontmost(_pid: i32) {
    PREVIOUS_APP.store(0, Ordering::SeqCst);
}

/// Put the bar away. `restore` hands activation back to the app it was summoned
/// from — right after a send or an Escape, wrong when the launcher lost focus
/// because the user clicked somewhere else, which already moved activation.
fn dismiss_launcher(app: &AppHandle, restore: bool) {
    let handle = app.clone();
    let _ = app.run_on_main_thread(move || dismiss_launcher_on_main(&handle, restore));
}

fn dismiss_launcher_on_main(app: &AppHandle, restore: bool) {
    // Take this before orderOut triggers the focus-loss callback reentrantly.
    let previous = PREVIOUS_APP.swap(0, Ordering::SeqCst);
    #[cfg(target_os = "macos")]
    launcher_panel::remove_outside_click_monitor();
    if let Some(window) = app.get_webview_window("launcher") {
        #[cfg(target_os = "macos")]
        if let Ok(ptr) = window.ns_window() { launcher_panel::order_out(ptr); }
        #[cfg(not(target_os = "macos"))]
        let _ = window.hide();
    }
    if restore { restore_frontmost(previous); }
}

#[cfg(target_os = "macos")]
fn make_nonactivating_panel(window: &tauri::WebviewWindow) {
    if let Ok(ptr) = window.ns_window() { launcher_panel::configure(ptr); }
}

#[cfg(not(target_os = "macos"))]
fn make_nonactivating_panel(_window: &tauri::WebviewWindow) {}

/// Where the bar sits on the screen it is summoned to: centred across, and a
/// little above the middle — dead centre puts it under the eye's resting line
/// and makes the screen feel bottom-heavy, which is why no launcher does it.
#[cfg(not(target_os = "macos"))]
const LAUNCHER_TOP: f64 = 0.24;

/// Place the launcher on the monitor the pointer (and so the user) is on,
/// rather than wherever the window happened to be left.
#[cfg(not(target_os = "macos"))]
fn place_launcher(app: &AppHandle, window: &tauri::WebviewWindow) {
    // The monitor under the pointer, not the one the hidden window was left on:
    // summoned from a second screen, the bar has to arrive on that screen.
    let monitor = app
        .cursor_position()
        .ok()
        .and_then(|point| app.monitor_from_point(point.x, point.y).ok().flatten())
        .or_else(|| window.current_monitor().ok().flatten());
    let Some(monitor) = monitor else {
        let _ = window.center();
        return;
    };
    let Ok(size) = window.outer_size() else { return };
    let area = monitor.size();
    let origin = monitor.position();
    let x = origin.x + ((area.width as i32 - size.width as i32) / 2);
    let y = origin.y + (area.height as f64 * LAUNCHER_TOP) as i32;
    let _ = window.set_position(tauri::PhysicalPosition::new(x, y));
}

/// Suppress the incidental Reopen generated when a hidden app presents a panel.
static LAST_LAUNCHER_OPEN: Mutex<Option<Instant>> = Mutex::new(None);

/// Toggle the entire native lifecycle in one main-thread pass.
fn toggle_launcher(app: &AppHandle) {
    let handle = app.clone();
    let _ = app.run_on_main_thread(move || {
        let Some(window) = handle.get_webview_window("launcher") else { return };
        #[cfg(target_os = "macos")]
        let visible = window.ns_window().ok().is_some_and(launcher_panel::is_presented);
        #[cfg(not(target_os = "macos"))]
        let visible = window.is_visible().unwrap_or(false);
        if visible {
            dismiss_launcher_on_main(&handle, true);
            return;
        }
        remember_frontmost();
        *LAST_LAUNCHER_OPEN.lock().unwrap() = Some(Instant::now());
        #[cfg(target_os = "macos")]
        {
            let main = handle.get_webview_window("main").and_then(|w| w.ns_window().ok())
                .unwrap_or(std::ptr::null_mut());
            if let Ok(ptr) = window.ns_window() {
                launcher_panel::place_on_mouse_screen(ptr);
                launcher_panel::present(ptr, main);
                let monitor_app = handle.clone();
                launcher_panel::install_outside_click_monitor(move || {
                    dismiss_launcher_on_main(&monitor_app, false);
                });
            }
        }
        #[cfg(not(target_os = "macos"))]
        {
            place_launcher(&handle, &window);
            let _ = window.show();
            let _ = window.set_focus();
        }
        let _ = window.emit("aibo://launcher-open", ());
    });
}

fn focus_main(app: &AppHandle) {
    let handle = app.clone();
    let _ = app.run_on_main_thread(move || {
        *LAST_LAUNCHER_OPEN.lock().unwrap() = None;
        dismiss_launcher_on_main(&handle, false);
        if let Some(window) = handle.get_webview_window("main") {
            let _ = window.show();
            let _ = window.unminimize();
            let _ = window.set_focus();
        }
    });
}

#[tauri::command]
fn hide_launcher(app: AppHandle) {
    dismiss_launcher(&app, true);
}

/// Post the line to the running plugin. Where the user ends up afterwards is
/// the bar's own switch (`open_main`, on by default and remembered by the page):
///   * on — the main window comes forward, which is also the confirmation that
///     the line landed, so no focus is handed back.
///   * off — nothing is summoned: the turn runs in the session, dismissing the
///     bar hands focus back to the app they were in, and her reply is on the
///     stage when they next open it.
/// Sending from here rather than from the page keeps the launcher off the
/// plugin's origin: no CORS, no token.
#[tauri::command]
fn send_message(app: AppHandle, text: String, open_main: bool) -> Result<(), String> {
    let text = text.trim().to_string();
    if text.is_empty() {
        return Err("empty".into());
    }
    // ureq is built without its json feature here, so the body is serialised by
    // hand — the same one field the composer posts.
    let body = serde_json::json!({ "text": text }).to_string();
    ureq::post(&format!("{AIBO_URL}send"))
        .config().timeout_global(Some(Duration::from_secs(15))).build()
        .header("content-type", "application/json")
        .send(body.as_str())
        .map_err(|error: ureq::Error| error.to_string())?;
    if open_main {
        focus_main(&app);
    }
    Ok(())
}

/// Bind the global shortcut. Another app may already own the combination, in
/// which case registration fails and the launcher is simply unavailable —
/// never a reason to fail the launch.
fn register_launcher_shortcut(app: &AppHandle) {
    use tauri_plugin_global_shortcut::{Builder, ShortcutState};
    let handle = app.clone();
    if let Err(error) = app.plugin(
        Builder::new()
            .with_handler(move |_app, _shortcut, event| {
                if event.state() == ShortcutState::Pressed {
                    toggle_launcher(&handle);
                }
            })
            .build(),
    ) {
        eprintln!("[aibo] launcher: cannot install the shortcut plugin: {error}");
        return;
    }
    use tauri_plugin_global_shortcut::GlobalShortcutExt;
    if let Err(error) = app.global_shortcut().register(LAUNCHER_SHORTCUT) {
        eprintln!("[aibo] launcher: {LAUNCHER_SHORTCUT} is taken by another app ({error})");
    }
}

/// One desktop preference, independent of the page's origin or backend session.
fn saved_zoom() -> f64 {
    fs::read_to_string(app_support().join("zoom.json")).ok()
        .and_then(|text| serde_json::from_str::<f64>(&text).ok())
        .filter(|value| value.is_finite() && (0.2..=10.0).contains(value))
        .unwrap_or(1.0)
}

#[tauri::command]
fn set_zoom_level(window: tauri::WebviewWindow, value: f64) -> Result<(), String> {
    if window.label() != "main" || !value.is_finite() || !(0.2..=10.0).contains(&value) {
        return Err("invalid zoom".into());
    }
    window.set_zoom(value).map_err(|error| error.to_string())?;
    let root = app_support();
    fs::create_dir_all(&root).map_err(|error| error.to_string())?;
    fs::write(root.join("zoom.json"), value.to_string()).map_err(|error| error.to_string())
}

#[tauri::command]
fn restore_zoom(window: tauri::WebviewWindow) -> Result<f64, String> {
    let value = saved_zoom();
    set_zoom_level(window, value)?;
    Ok(value)
}

pub fn run() {
    #[cfg(unix)]
    install_signal_handlers();
    tauri::Builder::default()
        .manage(Mutex::new(Supervisor { child: None }))
        .invoke_handler(tauri::generate_handler![retry, support_dir, send_message, hide_launcher, set_zoom_level, restore_zoom])
        .plugin(tauri::plugin::Builder::<tauri::Wry>::new("saved-zoom")
            .js_init_script(include_str!("../../ui/zoom.js"))
            .build())
        .setup(|app| {
            updater::setup(app)?;
            // The `main` window comes from tauri.conf.json; only the supervisor starts here.
            let handle = app.handle().clone();
            std::thread::spawn(move || boot(handle));
            register_launcher_shortcut(app.handle());
            // Clicking away from the launcher dismisses it, the way a panel should.
            if let Some(window) = app.get_webview_window("launcher") {
                // Frost it. The page paints a translucent wash on top, so what
                // shows through is the desktop blurred by AppKit rather than a
                // CSS backdrop-filter, which in a webview can only blur itself.
                make_nonactivating_panel(&window);
                #[cfg(target_os = "macos")]
                {
                    use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial, NSVisualEffectState};
                    let _ = apply_vibrancy(
                        &window,
                        NSVisualEffectMaterial::HudWindow,
                        Some(NSVisualEffectState::Active),
                        Some(16.0),
                    );
                }
                let handle = app.handle().clone();
                window.on_window_event(move |event| {
                    if let tauri::WindowEvent::Focused(false) = event {
                        dismiss_launcher(&handle, false);
                    }
                });
            }
            Ok(())
        })
        .build(tauri::generate_context!())
        .expect("error while building aibo")
        .run(|app, event| {
            #[cfg(target_os = "macos")]
            if let RunEvent::Reopen { .. } = &event {
                // Like Cetus: presenting a hidden app may itself emit Reopen.
                // Only an explicit later Dock reopen should restore main.
                let recent_panel = LAST_LAUNCHER_OPEN.lock().unwrap()
                    .is_some_and(|at| at.elapsed() < Duration::from_millis(1500));
                if !recent_panel { focus_main(app); }
            }
            if let RunEvent::Exit | RunEvent::ExitRequested { .. } = event {
                let state = app.state::<Mutex<Supervisor>>();
                let child = state.lock().unwrap().child.take();
                if let Some(mut child) = child {
                    kill_tree(&mut child);
                }
            }
        });
}
