//! Independent desktop companion. All AppKit/window operations stay on the main thread.
use std::{fs, sync::Mutex, time::{Duration, Instant}};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Emitter, Manager};

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase", default)]
pub struct Preferences {
    pub enabled: bool,
    pub show_with_main: bool,
    pub size: u32,
    pub position: Option<(i32, i32)>,
}
impl Default for Preferences {
    fn default() -> Self { Self { enabled: false, show_with_main: false, size: 180, position: None } }
}
#[derive(Clone, Deserialize)]
pub struct Region { x: f64, y: f64, width: f64, height: f64 }
#[derive(Default)]
pub struct State {
    prefs: Preferences,
    visible: bool,
    regions: Vec<Region>,
    interactive: bool,
    dragging: bool,
    drag_anchor: Option<(f64, f64, i32, i32)>,
    last_pointer: Option<(f64, f64)>,
    pointer_emitted: Option<Instant>,
    position_pending: Option<(i32, i32)>,
    caret: Option<(f64,f64)>,
    emitted_caret: Option<(f64,f64)>,
    clicks_seen: Option<u32>,
}
fn save(prefs: &Preferences) -> Result<(), String> {
    let root = super::app_support();
    fs::create_dir_all(&root).map_err(|e| e.to_string())?;
    let tmp = root.join("pet.json.tmp");
    fs::write(&tmp, serde_json::to_vec(prefs).unwrap()).map_err(|e| e.to_string())?;
    fs::rename(tmp, root.join("pet.json")).map_err(|e| e.to_string())
}
#[tauri::command]
pub fn get_pet_preferences(app: AppHandle) -> Preferences { app.state::<Mutex<State>>().lock().unwrap().prefs.clone() }
#[tauri::command]
pub fn set_pet_preferences(app: AppHandle, enabled: bool, show_with_main: bool, size: u32) -> Result<Preferences, String> {
    let state = app.state::<Mutex<State>>();
    let mut state = state.lock().unwrap();
    let next = Preferences { enabled, show_with_main, size: size.clamp(120, 260), position: state.prefs.position };
    save(&next)?;
    state.prefs = next.clone();
    drop(state);
    let _ = app.emit("aibo://pet-preferences", &next);
    Ok(next)
}
#[tauri::command]
pub fn pet_regions(window: tauri::WebviewWindow, app: AppHandle, regions: Vec<Region>) {
    if window.label() != "pet" { return; }
    app.state::<Mutex<State>>().lock().unwrap().regions = regions.into_iter().take(256).filter(|r|
        [r.x, r.y, r.width, r.height].iter().all(|n| n.is_finite()) && r.width >= 0.0 && r.height >= 0.0
    ).collect();
}
#[tauri::command]
pub fn start_pet_drag(window: tauri::WebviewWindow, app: AppHandle) -> Result<(), String> {
    if window.label() != "pet" { return Err("Only the pet can start this drag".into()); }
    #[cfg(target_os = "macos")]
    {
        let cursor = window.cursor_position().map_err(|e| e.to_string())?;
        let origin = window.outer_position().map_err(|e| e.to_string())?;
        let state = app.state::<Mutex<State>>();
        let mut state = state.lock().unwrap();
        state.dragging = true;
        state.last_pointer = Some((cursor.x, cursor.y));
        state.drag_anchor = Some((cursor.x, cursor.y, origin.x, origin.y));
        // Move from the native cursor on each tick instead of entering AppKit's
        // blocking drag loop. The webview keeps animating and receiving drag updates.
    }
    #[cfg(not(target_os = "macos"))]
    window.start_dragging().map_err(|e| e.to_string())?;
    Ok(())
}
#[cfg(target_os = "macos")]
fn primary_button_down() -> bool {
    use objc2::{msg_send, runtime::AnyClass};
    unsafe {
        let buttons: usize = msg_send![AnyClass::get(c"NSEvent").unwrap(), pressedMouseButtons];
        buttons & 1 != 0
    }
}

struct PetContextMenu(tauri::menu::Menu<tauri::Wry>);

#[tauri::command]
pub fn show_pet_menu(window: tauri::WebviewWindow, app: AppHandle) -> Result<(), String> {
    if window.label() != "pet" { return Err("Only the pet can open this menu".into()); }
    window.popup_menu(&app.state::<PetContextMenu>().0).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn open_pet_chat(app: AppHandle) { super::focus_main(&app); }
#[tauri::command]
pub fn open_pet_launcher(app: AppHandle) { super::toggle_launcher(&app); }
#[tauri::command]
pub async fn pet_status(app: AppHandle) -> Result<serde_json::Value, String> {
    let mut status: serde_json::Value = tauri::async_runtime::spawn_blocking(|| {
        let mut response = ureq::get(&format!("{}pet-state", super::AIBO_URL))
            .config().timeout_global(Some(Duration::from_secs(2))).build().call().map_err(|e| e.to_string())?;
        let body = response.body_mut().read_to_string().map_err(|e| e.to_string())?;
        serde_json::from_str(&body).map_err(|e| e.to_string())
    }).await.map_err(|e| e.to_string())??;
    let point = status.get("gaze").and_then(|p| Some((p.get("x")?.as_f64()?, p.get("y")?.as_f64()?)));
    status["gaze"] = serde_json::Value::Null;
    if let Some((x,y)) = point {
        let (tx, rx) = std::sync::mpsc::channel();
        let handle = app.clone();
        app.run_on_main_thread(move || {
            #[cfg(target_os = "macos")]
            let local = handle.get_webview_window("pet").and_then(|w| w.ns_window().ok())
                .and_then(|ptr| super::launcher_panel::companion_local_point(ptr,x,y));
            #[cfg(not(target_os = "macos"))]
            let local: Option<(f64,f64)> = None;
            let _ = tx.send(local);
        }).map_err(|e| e.to_string())?;
        let local = tauri::async_runtime::spawn_blocking(move || rx.recv_timeout(Duration::from_secs(1)).ok().flatten())
            .await.map_err(|e| e.to_string())?;
        if let Some((x,y)) = local { status["gaze"] = serde_json::json!({"x":x,"y":y}); }
    }
    Ok(status)
}

pub fn clear_caret(app: &AppHandle) {
    let state = app.state::<Mutex<State>>();
    let mut state = state.lock().unwrap();
    state.caret = None;
    state.emitted_caret = None;
    if let Some(pet) = app.get_webview_window("pet") { let _ = pet.emit("aibo://pet-caret", serde_json::Value::Null); }
}
#[tauri::command]
pub fn pet_caret(window: tauri::WebviewWindow, app: AppHandle, point: Option<(f64,f64)>) {
    if window.label() != "launcher" { return; }
    app.state::<Mutex<State>>().lock().unwrap().caret = point.filter(|(x,y)| x.is_finite() && y.is_finite());
}

#[cfg(target_os = "macos")]
fn main_visible(window: &tauri::WebviewWindow) -> bool {
    use objc2::{msg_send, runtime::{AnyClass, AnyObject, Bool}};
    let Ok(ptr) = window.ns_window() else { return false };
    unsafe {
        let app: *mut AnyObject = msg_send![AnyClass::get(c"NSApplication").unwrap(), sharedApplication];
        let hidden: Bool = msg_send![app, isHidden];
        let w = &*(ptr as *const AnyObject);
        let visible: Bool = msg_send![w, isVisible];
        let minimized: Bool = msg_send![w, isMiniaturized];
        !hidden.as_bool() && visible.as_bool() && !minimized.as_bool()
    }
}
#[cfg(not(target_os = "macos"))]
fn main_visible(window: &tauri::WebviewWindow) -> bool { window.is_visible().unwrap_or(false) && !window.is_minimized().unwrap_or(false) }

/// Mouse-down counts for the whole session, read straight from the window
/// server. Polling these is how a click anywhere on the desktop reaches her
/// without an event tap, an input monitor, or any permission prompt: the
/// counter says a button went down, never which window or what was clicked.
#[cfg(target_os = "macos")]
fn clicks() -> u32 {
    #[link(name = "CoreGraphics", kind = "framework")]
    unsafe extern "C" { fn CGEventSourceCounterForEventType(state: u32, event: u32) -> u32; }
    // Combined session state; left, right and other (middle, back, forward).
    unsafe { [1u32, 3, 25].iter().fold(0u32, |n, e| n.wrapping_add(CGEventSourceCounterForEventType(0, *e))) }
}
#[cfg(not(target_os = "macos"))]
fn clicks() -> u32 { 0 }

fn should_show(prefs: &Preferences, main_visible: bool) -> bool { prefs.enabled && (prefs.show_with_main || !main_visible) }

fn drag_position(anchor: (f64, f64, i32, i32), cursor: (f64, f64)) -> (i32, i32) {
    (anchor.2.saturating_add((cursor.0-anchor.0).round() as i32), anchor.3.saturating_add((cursor.1-anchor.1).round() as i32))
}

fn reconcile(app: &AppHandle) {
    let Some(window) = app.get_webview_window("pet") else { return };
    let state = app.state::<Mutex<State>>();
    let mut state = state.lock().unwrap();
    let visible = should_show(&state.prefs, app.get_webview_window("main").is_some_and(|w| main_visible(&w)));
    if state.visible != visible {
        state.visible = visible;
        #[cfg(target_os = "macos")]
        if let Ok(ptr) = window.ns_window() {
            use objc2::{msg_send, runtime::AnyObject};
            unsafe {
                let w = &*(ptr as *const AnyObject);
                if visible { let _: () = msg_send![w, orderFrontRegardless]; }
                else { super::launcher_panel::order_out(ptr); }
            }
        }
        #[cfg(not(target_os = "macos"))]
        { if visible { let _ = window.show(); } else { let _ = window.hide(); } }
        let _ = window.emit("aibo://pet-visible", visible);
    }
    #[cfg(target_os = "macos")]
    if state.dragging && (!visible || !primary_button_down()) {
        state.dragging = false;
        state.drag_anchor = None;
        let _ = window.emit("aibo://pet-drag-ended", ());
    }
    if !visible { state.emitted_caret = None; return; }
    #[cfg(target_os = "macos")]
    {
        let caret = state.caret.and_then(|(x,y)| {
            let launcher = app.get_webview_window("launcher")?;
            if !launcher.is_visible().unwrap_or(false) || !launcher.is_focused().unwrap_or(false) { return None; }
            Some(super::launcher_panel::companion_caret_point(launcher.ns_window().ok()?,window.ns_window().ok()?,x,y))
        });
        if state.emitted_caret != caret {
            state.emitted_caret = caret;
            let payload = caret.map(|(x,y)| serde_json::json!({"x":x,"y":y}));
            let _ = window.emit("aibo://pet-caret", payload);
        }
    }
    // Re-enable hit testing as soon as the pointer enters a control. Polling
    // works even while the native window ignores mouse events.
    if let (Ok(cursor), Ok(mut origin), Ok(scale)) = (window.cursor_position(), window.outer_position(), window.scale_factor()) {
        if state.dragging {
            if let Some(anchor) = state.drag_anchor {
                let next = drag_position(anchor, (cursor.x, cursor.y));
                origin = tauri::PhysicalPosition::new(next.0, next.1);
                let _ = window.set_position(origin);
            }
        }
        let x = (cursor.x - origin.x as f64) / scale;
        let y = (cursor.y - origin.y as f64) / scale;
        if state.dragging && state.last_pointer != Some((cursor.x, cursor.y)) && state.pointer_emitted.is_none_or(|t| t.elapsed() >= Duration::from_millis(33)) {
            let dx = state.last_pointer.map_or(0.0, |p| (cursor.x-p.0)/scale);
            let _ = window.emit("aibo://pet-pointer", serde_json::json!({"x":x,"y":y,"dx":dx}));
            state.last_pointer = Some((cursor.x, cursor.y));
            state.pointer_emitted = Some(Instant::now());
        }
        // Only a click moves her. The position is read from the tick that
        // already runs, and is sent once per button press: plain cursor motion
        // never reaches the webview, is never traced, and is never stored.
        let seen = clicks();
        let clicked = state.clicks_seen.is_some_and(|last| last != seen);
        state.clicks_seen = Some(seen);
        if clicked && !state.dragging {
            let _ = window.emit("aibo://pet-click", serde_json::json!({"x":x,"y":y}));
        }
        let interactive = state.dragging || state.regions.iter().any(|r| x >= r.x && x <= r.x+r.width && y >= r.y && y <= r.y+r.height);
        if state.interactive != interactive {
            state.interactive = interactive;
            let _ = window.set_ignore_cursor_events(!interactive);
        }
        let pos = (origin.x, origin.y);
        if !state.dragging && state.position_pending == Some(pos) && state.prefs.position != Some(pos) {
            state.prefs.position = Some(pos);
            if let Err(e) = save(&state.prefs) { eprintln!("[aibo pet] position: {e}"); }
        }
        state.position_pending = Some(pos);
    }
}

pub fn setup(app: &mut tauri::App) -> tauri::Result<()> {
    let prefs: Preferences = fs::read_to_string(super::app_support().join("pet.json")).ok()
        .and_then(|s| serde_json::from_str(&s).ok()).unwrap_or_default();
    app.manage(Mutex::new(State { prefs: Preferences { size: prefs.size.clamp(120,260), ..prefs.clone() }, ..State::default() }));
    // The native menu remains available even in the legacy UI or while offline.
    use tauri::menu::{Menu, MenuItem, Submenu};
    let toggle = MenuItem::with_id(app, "pet-toggle", "开启 / 关闭桌宠", true, None::<&str>)?;
    let open = MenuItem::with_id(app, "pet-open-main", "打开 Aibo", true, None::<&str>)?;
    let menu = Submenu::with_items(app, "桌宠", true, &[&toggle, &open])?;
    if let Some(root) = app.menu() { root.append(&menu)?; }
    let chat = MenuItem::with_id(app, "pet-context-chat", "聊一句", true, None::<&str>)?;
    let open_app = MenuItem::with_id(app, "pet-context-open", "打开 App", true, None::<&str>)?;
    let disable = MenuItem::with_id(app, "pet-context-disable", "关闭桌宠", true, None::<&str>)?;
    app.manage(PetContextMenu(Menu::with_items(app, &[&chat, &open_app, &disable])?));
    app.on_menu_event(|app, event| match event.id().as_ref() {
        "pet-toggle" => {
            let p = get_pet_preferences(app.clone());
            if let Err(e) = set_pet_preferences(app.clone(), !p.enabled, p.show_with_main, p.size) {
                eprintln!("[aibo pet] preferences: {e}");
            }
        }
        "pet-open-main" | "pet-context-open" => super::focus_main(app),
        "pet-context-chat" => super::toggle_launcher(app),
        "pet-context-disable" => {
            let p = get_pet_preferences(app.clone());
            if let Err(e) = set_pet_preferences(app.clone(), false, p.show_with_main, p.size) {
                eprintln!("[aibo pet] preferences: {e}");
            }
        }
        _ => {}
    });
    if let Some(window) = app.get_webview_window("pet") {
        #[cfg(target_os = "macos")]
        if let Ok(ptr) = window.ns_window() {
            super::launcher_panel::configure_companion(ptr);
        }
        let _ = window.set_ignore_cursor_events(true);
        if let Ok(monitors) = window.available_monitors() {
            let size = window.outer_size()?;
            let position = prefs.position.filter(|(x,y)| monitors.iter().any(|m| {
                let p = m.position(); let s = m.size();
                *x >= p.x && *y >= p.y && *x + size.width as i32 <= p.x + s.width as i32 && *y + size.height as i32 <= p.y + s.height as i32
            }));
            if let Some((x,y)) = position { let _ = window.set_position(tauri::PhysicalPosition::new(x,y)); }
            else if let Some(m) = window.primary_monitor()?.or_else(|| monitors.into_iter().next()) {
                let p = m.position(); let s = m.size();
                let _ = window.set_position(tauri::PhysicalPosition::new(p.x+s.width as i32-size.width as i32-24, p.y+s.height as i32-size.height as i32-90));
            }
        }
    }
    // Always keep the main webview alive on close; Dock and pet reopen it.
    // This also retains the running agent and speech state while in pet mode.
    if let Some(window) = app.get_webview_window("main") {
        let w = window.clone();
        window.on_window_event(move |event| {
            if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                api.prevent_close(); let _ = w.hide();
            }
        });
    }
    let handle = app.handle().clone();
    std::thread::spawn(move || loop {
        let dragging = handle.state::<Mutex<State>>().lock().unwrap().dragging;
        std::thread::sleep(Duration::from_millis(if dragging { 16 } else { 50 }));
        let h = handle.clone();
        if handle.run_on_main_thread(move || reconcile(&h)).is_err() { break; }
    });
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn drag_keeps_grab_offset_across_negative_monitor_coordinates() {
        assert_eq!(drag_position((100.0, 200.0, 40, 60), (120.0, 230.0)), (60,90));
        assert_eq!(drag_position((100.0, 200.0, 40, 60), (-200.0, 100.0)), (-260,-40));
    }
    #[test]
    fn visibility_truth_table() {
        for enabled in [false,true] { for show_with_main in [false,true] { for visible in [false,true] {
            let prefs = Preferences { enabled, show_with_main, ..Preferences::default() };
            assert_eq!(should_show(&prefs,visible), enabled && (!visible || show_with_main));
        } } }
    }
}
