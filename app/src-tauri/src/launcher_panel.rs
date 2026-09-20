//! Native launcher lifecycle, following Cetus's panel.rs and quick/panel.rs.
//! All operations run together on AppKit's main thread. In particular, presenting
//! a panel can unhide the entire app; preserve the main window in the SAME pass.
use objc2::msg_send;
use objc2::runtime::{AnyClass, AnyObject, Bool};
use std::ffi::c_void;
use std::sync::Mutex;

pub fn configure(ptr: *mut std::ffi::c_void) {
    use objc2::runtime::{AnyClass, AnyObject, Bool, ClassBuilder, Sel};
    use objc2::sel;
    const NONACTIVATING_PANEL: usize = 1 << 7;
    // Join every space and sit alongside a fullscreen app rather than switching
    // away from it: summoned over fullscreen Safari, the bar must appear there.
    const CAN_JOIN_ALL_SPACES: usize = 1 << 0;
    const STATIONARY: usize = 1 << 4;
    const FULL_SCREEN_AUXILIARY: usize = 1 << 8;

    // A borderless window answers `canBecomeKeyWindow` with NO, and re-classing
    // drops tao's override of it — so the panel needs one of its own, or it can
    // be shown and never take a keystroke. One subclass, registered once.
    fn panel_class() -> Option<&'static AnyClass> {
        const NAME: &std::ffi::CStr = c"AiboLauncherPanel";
        if let Some(class) = AnyClass::get(NAME) {
            return Some(class);
        }
        let superclass = AnyClass::get(c"NSPanel")?;
        let mut builder = ClassBuilder::new(NAME, superclass)?;
        extern "C-unwind" fn yes(_this: &AnyObject, _sel: Sel) -> Bool {
            Bool::YES
        }
        extern "C-unwind" fn no(_this: &AnyObject, _sel: Sel) -> Bool {
            Bool::NO
        }
        unsafe {
            builder.add_method(
                sel!(canBecomeMainWindow),
                no as extern "C-unwind" fn(_, _) -> Bool,
            );
            builder.add_method(
                sel!(canBecomeKeyWindow),
                yes as extern "C-unwind" fn(_, _) -> Bool,
            );
        }
        Some(builder.register())
    }

    if ptr.is_null() {
        return;
    }
    let Some(class) = panel_class() else { return };
    // SAFETY: the pointer is the window's live NSWindow, and this runs on the
    // main thread during setup, before the window is ever shown.
    unsafe {
        let object = &*(ptr as *const AnyObject);
        AnyObject::set_class(object, class);
        let mask: usize = objc2::msg_send![object, styleMask];
        let _: () = objc2::msg_send![object, setStyleMask: mask | NONACTIVATING_PANEL];
        // Re-classing skips NSPanel's initializer. Changing the style mask alone
        // does not set WindowServer's prevents-activation tag, so clicking the
        // webview would still activate Aibo and bring its main window forward.
        // Synchronize that tag explicitly (AppKit SPI, like macOSPrivateApi).
        // https://philz.blog/nspanel-nonactivating-style-mask-flag/
        let supports_activation_tag: Bool = objc2::msg_send![object,
            respondsToSelector: sel!(_setPreventsActivation:)];
        if supports_activation_tag.as_bool() {
            let _: () = objc2::msg_send![object, _setPreventsActivation: Bool::YES];
        } else {
            eprintln!("[aibo] launcher: AppKit cannot set the prevents-activation tag");
        }
        let _: () = objc2::msg_send![object, setHidesOnDeactivate: Bool::NO];
        let _: () = objc2::msg_send![object, setFloatingPanel: Bool::YES];
        let _: () = objc2::msg_send![object, setLevel: 25isize];
        let _: () = objc2::msg_send![object, setCollectionBehavior: CAN_JOIN_ALL_SPACES | STATIONARY | FULL_SCREEN_AUXILIARY];
    }
}

/// True only when the panel can actually be seen on this Space. Cmd+H can
/// leave native visibility bookkeeping set while the whole application is hidden.
pub fn is_presented(ptr: *mut c_void) -> bool {
    if ptr.is_null() {
        return false;
    }
    unsafe {
        let app: *mut AnyObject =
            msg_send![AnyClass::get(c"NSApplication").unwrap(), sharedApplication];
        let hidden: Bool = msg_send![app, isHidden];
        let window = &*(ptr as *const AnyObject);
        let visible: Bool = msg_send![window, isVisible];
        let on_space: Bool = msg_send![window, isOnActiveSpace];
        !hidden.as_bool() && visible.as_bool() && on_space.as_bool()
    }
}

/// Preserve hidden/minimized main-window state across AppKit's implicit unhide.
/// This must be synchronous: queuing Tauri hide() can let main flash first.
pub fn present(ptr: *mut c_void, main_ptr: *mut c_void) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        let app: *mut AnyObject =
            msg_send![AnyClass::get(c"NSApplication").unwrap(), sharedApplication];
        let hidden: Bool = msg_send![app, isHidden];
        let main = (main_ptr as *const AnyObject).as_ref();
        let keep_main_hidden = main.is_some_and(|w| {
            let visible: Bool = msg_send![w, isVisible];
            let minimized: Bool = msg_send![w, isMiniaturized];
            hidden.as_bool() || !visible.as_bool() || minimized.as_bool()
        });
        let window = &*(ptr as *const AnyObject);
        let _: () = msg_send![window, setCollectionBehavior: (1usize << 0) | (1 << 4) | (1 << 8)];
        let _: () = msg_send![window, setIgnoresMouseEvents: Bool::NO];
        let _: () = msg_send![window, orderFrontRegardless];
        let _: () = msg_send![window, makeKeyWindow];
        if keep_main_hidden {
            order_out(main_ptr);
        }
    }
}

pub fn order_out(ptr: *mut c_void) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        let window = &*(ptr as *const AnyObject);
        let _: () = msg_send![window, orderOut: std::ptr::null_mut::<AnyObject>()];
    }
}

use objc2::encode::{Encode, Encoding};
// Minimal AppKit geometry types (NSPoint/NSSize/NSRect are CGPoint/CGSize/CGRect
// on 64-bit macOS). We declare them locally with the right Objective-C struct
// encodings so `msg_send!` can return them by value without pulling in another
// crate.
#[repr(C)]
#[derive(Clone, Copy)]
struct NSPoint {
    x: f64,
    y: f64,
}
#[repr(C)]
#[derive(Clone, Copy)]
struct NSSize {
    width: f64,
    height: f64,
}
#[repr(C)]
#[derive(Clone, Copy)]
struct NSRect {
    origin: NSPoint,
    size: NSSize,
}

unsafe impl Encode for NSPoint {
    const ENCODING: Encoding = Encoding::Struct("CGPoint", &[f64::ENCODING, f64::ENCODING]);
}
unsafe impl Encode for NSSize {
    const ENCODING: Encoding = Encoding::Struct("CGSize", &[f64::ENCODING, f64::ENCODING]);
}
unsafe impl Encode for NSRect {
    const ENCODING: Encoding = Encoding::Struct("CGRect", &[NSPoint::ENCODING, NSSize::ENCODING]);
}

unsafe fn mouse_screen_frame() -> Option<NSRect> {
    let ns_event = AnyClass::get(c"NSEvent")?;
    let ns_screen = AnyClass::get(c"NSScreen")?;
    let mouse: NSPoint = msg_send![ns_event, mouseLocation];
    let screens: *mut AnyObject = msg_send![ns_screen, screens];
    if screens.is_null() {
        return None;
    }
    let count: usize = msg_send![screens, count];
    // Find the screen whose frame contains the cursor.
    for i in 0..count {
        let screen: *mut AnyObject = msg_send![screens, objectAtIndex: i];
        if screen.is_null() {
            continue;
        }
        let f: NSRect = msg_send![screen, frame];
        if mouse.x >= f.origin.x
            && mouse.x < f.origin.x + f.size.width
            && mouse.y >= f.origin.y
            && mouse.y < f.origin.y + f.size.height
        {
            return Some(f);
        }
    }
    None
}

/// Use AppKit points for both cursor and screen geometry (Cetus's approach).
/// Mixing Tauri physical pixels with AppKit points misplaces scaled displays.
pub fn place_on_mouse_screen(ptr: *mut c_void) {
    if ptr.is_null() {
        return;
    }
    unsafe {
        let Some(screen) = mouse_screen_frame() else {
            return;
        };
        let window = &*(ptr as *const AnyObject);
        let frame: NSRect = msg_send![window, frame];
        let origin = NSPoint {
            x: screen.origin.x + (screen.size.width - frame.size.width) / 2.0,
            y: screen.origin.y + screen.size.height * 0.76 - frame.size.height,
        };
        let _: () = msg_send![window, setFrameOrigin: origin];
    }
}

use block2::RcBlock;
// Retained `id` returned by `addGlobalMonitorForEventsMatchingMask:handler:`,
// stored as a pointer-sized int so it survives across the present/park pair. 0 =
// no monitor installed. Only touched on the main thread (install/remove are both
// invoked from main-thread closures), but guarded so the type is `Sync`.
static CLICK_MONITOR: Mutex<usize> = Mutex::new(0);

// NSEventMask bits for the buttons that should count as an "outside click".
const NS_EVENT_MASK_LEFT_MOUSE_DOWN: u64 = 1 << 1;
const NS_EVENT_MASK_RIGHT_MOUSE_DOWN: u64 = 1 << 3;
const NS_EVENT_MASK_OTHER_MOUSE_DOWN: u64 = 1 << 25;

/// Install a global mouse-down monitor so the launcher dismisses when the user
/// clicks anywhere outside it — the Raycast/Spotlight mechanism.
///
/// A global monitor only sees events delivered to *other* applications, so a
/// click inside our own (key) panel never fires it; we don't have to hit-test.
/// This is far more reliable than `windowDidResignKey` for a non-activating
/// floating `NSPanel`, which keeps key across many app/desktop switches and so
/// misses most outside clicks. Mouse monitoring needs no Accessibility grant
/// (only keyboard monitoring does). Replaces any monitor already installed.
/// MUST run on the main thread.
pub fn install_outside_click_monitor(handler: impl Fn() + 'static) {
    remove_outside_click_monitor();
    let block = RcBlock::new(move |_event: *mut AnyObject| handler());
    unsafe {
        let Some(ns_event) = AnyClass::get(c"NSEvent") else {
            return;
        };
        let mask: u64 = NS_EVENT_MASK_LEFT_MOUSE_DOWN
            | NS_EVENT_MASK_RIGHT_MOUSE_DOWN
            | NS_EVENT_MASK_OTHER_MOUSE_DOWN;
        let monitor: *mut AnyObject = msg_send![
            ns_event,
            addGlobalMonitorForEventsMatchingMask: mask,
            handler: &*block,
        ];
        if monitor.is_null() {
            return;
        }
        // The returned token is autoreleased; retain it so it's still valid when
        // `removeMonitor:` is called later.
        let retained: *mut AnyObject = msg_send![monitor, retain];
        if let Ok(mut g) = CLICK_MONITOR.lock() {
            *g = retained as usize;
        }
    }
}

/// Tear down the global mouse-down monitor installed by
/// [`install_outside_click_monitor`]. No-op if none is installed. MUST run on
/// the main thread.
pub fn remove_outside_click_monitor() {
    let ptr = match CLICK_MONITOR.lock() {
        Ok(mut g) => std::mem::replace(&mut *g, 0),
        Err(_) => 0,
    };
    if ptr == 0 {
        return;
    }
    unsafe {
        let Some(ns_event) = AnyClass::get(c"NSEvent") else {
            return;
        };
        let obj = ptr as *mut AnyObject;
        let _: () = msg_send![ns_event, removeMonitor: obj];
        let _: () = msg_send![obj, release];
    }
}
