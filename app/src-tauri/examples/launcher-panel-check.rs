//! Native regression check. Run on macOS with:
//! cargo run --example launcher-panel-check
//! Uses the production panel implementation in an isolated AppKit process;
//! never starts the Aibo backend or sends a message to the user's session.
#[cfg(target_os = "macos")]
#[path = "../src/launcher_panel.rs"]
mod launcher_panel;

#[cfg(target_os = "macos")]
fn main() {
    use objc2::encode::{Encode, Encoding};
    use objc2::msg_send;
    use objc2::runtime::{AnyClass, AnyObject, Bool};
    use std::ffi::c_void;
    #[repr(C)]
    #[derive(Clone, Copy)]
    struct Point {
        x: f64,
        y: f64,
    }
    #[repr(C)]
    #[derive(Clone, Copy)]
    struct Size {
        width: f64,
        height: f64,
    }
    #[repr(C)]
    #[derive(Clone, Copy)]
    struct Rect {
        origin: Point,
        size: Size,
    }
    unsafe impl Encode for Point {
        const ENCODING: Encoding = Encoding::Struct("CGPoint", &[f64::ENCODING, f64::ENCODING]);
    }
    unsafe impl Encode for Size {
        const ENCODING: Encoding = Encoding::Struct("CGSize", &[f64::ENCODING, f64::ENCODING]);
    }
    unsafe impl Encode for Rect {
        const ENCODING: Encoding = Encoding::Struct("CGRect", &[Point::ENCODING, Size::ENCODING]);
    }
    unsafe fn pump() {
        let date: *mut AnyObject =
            msg_send![AnyClass::get(c"NSDate").unwrap(), dateWithTimeIntervalSinceNow: 0.08f64];
        let run_loop: *mut AnyObject =
            msg_send![AnyClass::get(c"NSRunLoop").unwrap(), currentRunLoop];
        let _: () = msg_send![run_loop, runUntilDate: date];
    }
    unsafe {
        // Force AppKit to load; record the user's foreground app for the
        // nonactivation assertion without touching that app's windows.
        let workspace = objc2_app_kit::NSWorkspace::sharedWorkspace();
        let frontmost = workspace
            .frontmostApplication()
            .map(|a| a.processIdentifier());
        let app: *mut AnyObject =
            msg_send![AnyClass::get(c"NSApplication").unwrap(), sharedApplication];
        let _: Bool = msg_send![app, setActivationPolicy: 1isize];
        let _: () = msg_send![app, finishLaunching];
        let make_window = |width: f64, height: f64, mask: usize| -> *mut AnyObject {
            let allocated: *mut AnyObject = msg_send![AnyClass::get(c"NSWindow").unwrap(), alloc];
            msg_send![allocated, initWithContentRect: Rect {
                origin: Point { x: -10000.0, y: -10000.0 },
                size: Size { width, height },
            }, styleMask: mask, backing: 2usize, defer: Bool::NO]
        };
        let main = make_window(640.0, 480.0, 15);
        let panel = make_window(700.0, 104.0, 0);
        let main_ptr = main.cast::<c_void>();
        let panel_ptr = panel.cast::<c_void>();
        launcher_panel::configure(panel_ptr);
        let nonactivating: Bool = msg_send![panel, _preventsActivation];
        let can_main: Bool = msg_send![panel, canBecomeMainWindow];
        assert!(nonactivating.as_bool() && !can_main.as_bool());
        let is_visible = |window: *mut AnyObject| -> bool {
            let value: Bool = msg_send![window, isVisible];
            value.as_bool()
        };
        let assert_foreground = || {
            assert_eq!(
                workspace
                    .frontmostApplication()
                    .map(|a| a.processIdentifier()),
                frontmost,
                "presenting the launcher activated another app"
            );
        };
        let present = || {
            launcher_panel::present(panel_ptr, main_ptr);
            pump();
            assert!(is_visible(panel), "launcher did not appear");
            assert!(
                launcher_panel::is_presented(panel_ptr),
                "launcher is hidden or on another Space"
            );
            let key: Bool = msg_send![panel, isKeyWindow];
            assert!(key.as_bool(), "launcher did not take keyboard focus");
            assert_foreground();
        };
        let _: () = msg_send![main, orderFrontRegardless];
        present();
        assert!(is_visible(main), "visible main was incorrectly hidden");
        launcher_panel::order_out(panel_ptr);
        println!("PASS visible main remains visible; app stays inactive");

        launcher_panel::order_out(main_ptr);
        present();
        assert!(!is_visible(main));
        launcher_panel::order_out(panel_ptr);
        println!("PASS individually hidden main remains hidden");

        for _ in 0..5 {
            let _: () = msg_send![main, orderFrontRegardless];
            let _: () = msg_send![app, hide: std::ptr::null_mut::<AnyObject>()];
            pump();
            let hidden: Bool = msg_send![app, isHidden];
            assert!(hidden.as_bool(), "fixture failed to reproduce Cmd+H");
            assert!(!launcher_panel::is_presented(panel_ptr));
            present();
            assert!(!is_visible(main), "Cmd+H-hidden main was restored by panel");
            launcher_panel::order_out(panel_ptr);
            pump();
            assert!(!is_visible(main), "dismissing panel restored main");
        }
        println!("PASS five Cmd+H → present → dismiss cycles keep main hidden");

        let _: () = msg_send![main, orderFrontRegardless];
        let _: () = msg_send![main, miniaturize: std::ptr::null_mut::<AnyObject>()];
        pump();
        present();
        let minimized: Bool = msg_send![main, isMiniaturized];
        assert!(minimized.as_bool(), "launcher unminimized main");
        launcher_panel::order_out(panel_ptr);
        println!("PASS minimized main stays minimized");

        launcher_panel::install_outside_click_monitor(|| {});
        launcher_panel::remove_outside_click_monitor();
        launcher_panel::remove_outside_click_monitor();
        println!("PASS outside-click monitor installs and tears down idempotently");
        let _: () = msg_send![main, deminiaturize: std::ptr::null_mut::<AnyObject>()];
        let _: () = msg_send![main, orderFrontRegardless];
        pump();
        assert!(is_visible(main), "main cannot be explicitly restored");
        launcher_panel::order_out(main_ptr);
        println!("PASS main can still be explicitly reopened");
        // Exercise native geometry without displaying the moved window.
        launcher_panel::place_on_mouse_screen(panel_ptr);
    }
}

#[cfg(not(target_os = "macos"))]
fn main() {
    eprintln!("This regression check requires macOS.");
}
