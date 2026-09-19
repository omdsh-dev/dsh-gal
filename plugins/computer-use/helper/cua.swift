/*
 * dsh-computer-use native helper.
 *
 * A long-running process the plugin spawns once and talks to over stdio, one
 * JSON object per line: `{"id":1,"method":"get_app_state","params":{...}}` in,
 * `{"id":1,"result":...}` or `{"id":1,"error":{"code","message"}}` out.
 *
 * The shape mirrors Codex's Computer Use service (the Sky "window API"): the
 * model targets one app at a time, observes it as a screenshot plus an
 * indexed accessibility tree, and acts on element indices from the latest
 * observation or on screenshot pixel coordinates. Indices are only valid for
 * the observation that produced them.
 *
 *   observe : ScreenCaptureKit window capture + AXUIElement tree walk
 *   act     : AXPress / AXValue where the element supports it, otherwise
 *             CGEvent mouse and keyboard synthesis
 *
 * Needs Accessibility and Screen Recording. Both prompts are attributed to
 * the process that launched dsh (a terminal, or the dsh-gal app).
 */

import AppKit
import ApplicationServices
import CoreGraphics
import Foundation
import ScreenCaptureKit

// MARK: - Private AX API (public in practice: every automation tool uses it)

@_silgen_name("_AXUIElementGetWindow") @discardableResult
func _AXUIElementGetWindow(_ element: AXUIElement, _ identifier: UnsafeMutablePointer<CGWindowID>) -> AXError

// MARK: - Errors

struct HelperError: Error {
  let code: String
  let message: String
  init(_ code: String, _ message: String) { self.code = code; self.message = message }
}

// MARK: - JSON helpers

typealias JSON = [String: Any]

func str(_ p: JSON, _ k: String) -> String? {
  guard let v = p[k] else { return nil }
  if let s = v as? String { return s }
  if let n = v as? NSNumber { return n.stringValue }
  return nil
}
func num(_ p: JSON, _ k: String) -> Double? {
  guard let v = p[k] else { return nil }
  if let n = v as? NSNumber { return n.doubleValue }
  if let s = v as? String { return Double(s) }
  return nil
}
func int(_ p: JSON, _ k: String) -> Int? { num(p, k).map { Int($0) } }
func bool(_ p: JSON, _ k: String) -> Bool? {
  guard let v = p[k] else { return nil }
  if let b = v as? Bool { return b }
  if let n = v as? NSNumber { return n.boolValue }
  return nil
}
func require(_ p: JSON, _ k: String) throws -> String {
  guard let s = str(p, k), !s.trimmingCharacters(in: .whitespaces).isEmpty else { throw HelperError("invalid_argument", "\(k) is required") }
  return s
}

// MARK: - AX helpers

func axCopy(_ el: AXUIElement, _ attr: String) -> AnyObject? {
  var v: AnyObject?
  return AXUIElementCopyAttributeValue(el, attr as CFString, &v) == .success ? v : nil
}
func axStr(_ el: AXUIElement, _ attr: String) -> String? {
  guard let v = axCopy(el, attr) else { return nil }
  if let s = v as? String { return s }
  if let n = v as? NSNumber { return n.stringValue }
  if let u = v as? URL { return u.absoluteString }
  if let a = v as? NSAttributedString { return a.string }
  return nil
}
func axBool(_ el: AXUIElement, _ attr: String) -> Bool? { (axCopy(el, attr) as? NSNumber)?.boolValue }
func axElement(_ el: AXUIElement, _ attr: String) -> AXUIElement? {
  guard let v = axCopy(el, attr), CFGetTypeID(v) == AXUIElementGetTypeID() else { return nil }
  return unsafeBitCast(v, to: AXUIElement.self)
}
func axElements(_ el: AXUIElement, _ attr: String) -> [AXUIElement] { (axCopy(el, attr) as? [AXUIElement]) ?? [] }
func axFrame(_ el: AXUIElement) -> CGRect? {
  guard let pv = axCopy(el, kAXPositionAttribute as String), let sv = axCopy(el, kAXSizeAttribute as String) else { return nil }
  var p = CGPoint.zero, s = CGSize.zero
  guard CFGetTypeID(pv) == AXValueGetTypeID(), CFGetTypeID(sv) == AXValueGetTypeID() else { return nil }
  let ok = AXValueGetValue(unsafeBitCast(pv, to: AXValue.self), .cgPoint, &p) && AXValueGetValue(unsafeBitCast(sv, to: AXValue.self), .cgSize, &s)
  return ok ? CGRect(origin: p, size: s) : nil
}
func axActions(_ el: AXUIElement) -> [String] {
  var names: CFArray?
  return AXUIElementCopyActionNames(el, &names) == .success ? ((names as? [String]) ?? []) : []
}
func axRange(_ el: AXUIElement, _ attr: String) -> CFRange? {
  guard let v = axCopy(el, attr), CFGetTypeID(v) == AXValueGetTypeID() else { return nil }
  var r = CFRange(location: 0, length: 0)
  return AXValueGetValue(unsafeBitCast(v, to: AXValue.self), .cfRange, &r) ? r : nil
}

// MARK: - Text helpers

func oneLine(_ s: String, limit: Int) -> String {
  let collapsed = s.split(whereSeparator: { $0.isNewline || $0 == "\t" }).joined(separator: " ")
    .replacingOccurrences(of: " {2,}", with: " ", options: .regularExpression)
    .trimmingCharacters(in: .whitespaces)
  guard collapsed.count > limit else { return collapsed }
  return String(collapsed.prefix(limit)) + "…"
}

// MARK: - Apps

struct AppRef {
  let app: NSRunningApplication
  var id: String { app.bundleIdentifier ?? app.bundleURL?.path ?? "pid:\(app.processIdentifier)" }
  var name: String { app.localizedName ?? app.bundleURL?.deletingPathExtension().lastPathComponent ?? id }
  var pid: pid_t { app.processIdentifier }
  var info: JSON {
    var d: JSON = ["id": id, "displayName": name, "pid": Int(pid), "isRunning": true, "isActive": app.isActive]
    if let u = app.bundleURL { d["path"] = u.path }
    return d
  }
}

func runningApps() -> [NSRunningApplication] {
  NSWorkspace.shared.runningApplications.filter { $0.activationPolicy == .regular && !$0.isTerminated }
}

/// The helper's own host: the process tree it was launched from must never be a target.
let selfPid = ProcessInfo.processInfo.processIdentifier

func installedAppURL(named query: String) -> URL? {
  let lowered = query.lowercased()
  if query.hasPrefix("/"), FileManager.default.fileExists(atPath: query) { return URL(fileURLWithPath: query) }
  if query.contains("."), !query.contains(" "), let u = NSWorkspace.shared.urlForApplication(withBundleIdentifier: query) { return u }
  let dirs = ["/Applications", "/System/Applications", "/System/Applications/Utilities", "/Applications/Utilities", NSHomeDirectory() + "/Applications"]
  var contains: URL?
  for dir in dirs {
    guard let entries = try? FileManager.default.contentsOfDirectory(atPath: dir) else { continue }
    for entry in entries where entry.hasSuffix(".app") {
      let base = String(entry.dropLast(4)).lowercased()
      let url = URL(fileURLWithPath: dir).appendingPathComponent(entry)
      if base == lowered { return url }
      if contains == nil, base.contains(lowered) { contains = url }
    }
  }
  return contains
}

/// Resolve by bundle id, display name, process name, or path, among running apps.
func findRunning(_ query: String) -> NSRunningApplication? {
  let apps = runningApps()
  let lowered = query.lowercased()
  if let a = apps.first(where: { $0.bundleIdentifier?.lowercased() == lowered }) { return a }
  if query.hasPrefix("/"), let a = apps.first(where: { $0.bundleURL?.path == query }) { return a }
  if let a = apps.first(where: { $0.localizedName?.lowercased() == lowered }) { return a }
  if let a = apps.first(where: { $0.bundleURL?.deletingPathExtension().lastPathComponent.lowercased() == lowered }) { return a }
  let fuzzy = apps.filter { ($0.localizedName?.lowercased().contains(lowered) ?? false) || ($0.bundleIdentifier?.lowercased().hasSuffix(lowered) ?? false) }
  return fuzzy.count == 1 ? fuzzy[0] : nil
}

func launchApp(at url: URL, activate: Bool) throws -> NSRunningApplication {
  let cfg = NSWorkspace.OpenConfiguration()
  cfg.activates = activate
  var result: NSRunningApplication?
  var failure: Error?
  let sem = DispatchSemaphore(value: 0)
  NSWorkspace.shared.openApplication(at: url, configuration: cfg) { app, error in
    result = app; failure = error; sem.signal()
  }
  _ = sem.wait(timeout: .now() + 20)
  if let app = result { return app }
  throw HelperError("launch_failed", failure.map { String(describing: $0) } ?? "the app did not launch within 20 s")
}

func resolveApp(_ query: String, launch: Bool) throws -> AppRef {
  if let a = findRunning(query) {
    if a.processIdentifier == selfPid { throw HelperError("invalid_argument", "refusing to target the helper itself") }
    return AppRef(app: a)
  }
  guard launch, let url = installedAppURL(named: query) else {
    throw HelperError("app_not_found", "no running app matches \"\(query)\". Use computer_list_apps, or computer_open_app to launch one.")
  }
  let app = try launchApp(at: url, activate: false)
  // Give a fresh process a moment to create its windows.
  for _ in 0..<40 { if !axElements(AXUIElementCreateApplication(app.processIdentifier), kAXWindowsAttribute as String).isEmpty { break }; usleep(100_000) }
  return AppRef(app: app)
}

// MARK: - Windows

struct WindowInfo {
  let element: AXUIElement
  let title: String
  let frame: CGRect        // global points, top-left origin (Quartz / AX space)
  let windowId: CGWindowID?
  let role: String
  let subrole: String
}

func cgWindowId(for element: AXUIElement, pid: pid_t, frame: CGRect) -> CGWindowID? {
  var id: CGWindowID = 0
  if _AXUIElementGetWindow(element, &id) == .success, id != 0 { return id }
  // Fallback: match by owner pid and bounds among on-screen windows.
  guard let list = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID) as? [[String: Any]] else { return nil }
  for w in list {
    guard (w[kCGWindowOwnerPID as String] as? Int32) == pid, (w[kCGWindowLayer as String] as? Int) == 0,
          let b = w[kCGWindowBounds as String] as? [String: CGFloat], let n = w[kCGWindowNumber as String] as? CGWindowID else { continue }
    let r = CGRect(x: b["X"] ?? 0, y: b["Y"] ?? 0, width: b["Width"] ?? 0, height: b["Height"] ?? 0)
    if abs(r.minX - frame.minX) < 3, abs(r.minY - frame.minY) < 3, abs(r.width - frame.width) < 3, abs(r.height - frame.height) < 3 { return n }
  }
  return nil
}

func windows(of app: AppRef) -> [WindowInfo] {
  let appEl = AXUIElementCreateApplication(app.pid)
  var seen = Set<Int>()
  var ordered: [AXUIElement] = []
  for candidate in [axElement(appEl, kAXFocusedWindowAttribute as String), axElement(appEl, kAXMainWindowAttribute as String)].compactMap({ $0 }) + axElements(appEl, kAXWindowsAttribute as String) {
    let h = Int(bitPattern: UInt(CFHash(candidate)))
    if seen.insert(h).inserted { ordered.append(candidate) }
  }
  let infos: [WindowInfo] = ordered.compactMap { el in
    guard let f = axFrame(el), f.width > 1, f.height > 1 else { return nil }
    return WindowInfo(element: el, title: axStr(el, kAXTitleAttribute as String) ?? "", frame: f, windowId: cgWindowId(for: el, pid: app.pid, frame: f),
                      role: axStr(el, kAXRoleAttribute as String) ?? "AXWindow", subrole: axStr(el, kAXSubroleAttribute as String) ?? "")
  }
  // The Finder desktop and other window-less roots report as windows too but are not on
  // screen as one; a real window (one the window server knows) comes first when there is one.
  return infos.filter { $0.windowId != nil } + infos.filter { $0.windowId == nil }
}

// MARK: - Screenshot

let screenshotMaxDimension: CGFloat = 1280
let screenshotMaxBytes = 900_000

func screenRecordingGranted() -> Bool { CGPreflightScreenCaptureAccess() }

func blockingRun<T>(timeout: TimeInterval, _ body: @escaping () async throws -> T) throws -> T {
  let sem = DispatchSemaphore(value: 0)
  var outcome: Result<T, Error>?
  Task.detached { do { outcome = .success(try await body()) } catch { outcome = .failure(error) }; sem.signal() }
  guard sem.wait(timeout: .now() + timeout) == .success else { throw HelperError("capture_timeout", "the screenshot did not complete within \(Int(timeout)) s") }
  return try outcome!.get()
}

@available(macOS 14.0, *)
func captureSCK(windowId: CGWindowID, frame: CGRect, scale: CGFloat) throws -> CGImage {
  try blockingRun(timeout: 8) { () async throws -> CGImage in
    let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: false)
    guard let win = content.windows.first(where: { $0.windowID == windowId }) else { throw HelperError("capture_failed", "window \(windowId) is not shareable") }
    let cfg = SCStreamConfiguration()
    cfg.width = max(1, Int((frame.width * scale).rounded()))
    cfg.height = max(1, Int((frame.height * scale).rounded()))
    cfg.showsCursor = false
    cfg.scalesToFit = false
    cfg.ignoreShadowsSingleWindow = true
    cfg.captureResolution = .best
    return try await SCScreenshotManager.captureImage(contentFilter: SCContentFilter(desktopIndependentWindow: win), configuration: cfg)
  }
}

func captureCLI(windowId: CGWindowID) throws -> CGImage {
  let tmp = NSTemporaryDirectory() + "dsh-cua-\(UUID().uuidString).png"
  defer { try? FileManager.default.removeItem(atPath: tmp) }
  let p = Process(); p.executableURL = URL(fileURLWithPath: "/usr/sbin/screencapture"); p.arguments = ["-x", "-o", "-l", "\(windowId)", tmp]
  try p.run(); p.waitUntilExit()
  guard let src = CGImageSourceCreateWithURL(URL(fileURLWithPath: tmp) as CFURL, nil), let img = CGImageSourceCreateImageAtIndex(src, 0, nil) else { throw HelperError("capture_failed", "screencapture produced no image") }
  return img
}

func backingScale(for frame: CGRect) -> CGFloat {
  let primaryHeight = NSScreen.screens.first(where: { $0.frame.origin == .zero })?.frame.height ?? NSScreen.main?.frame.height ?? 0
  let cocoa = CGRect(x: frame.minX, y: primaryHeight - frame.maxY, width: frame.width, height: frame.height)
  return NSScreen.screens.first(where: { $0.frame.intersects(cocoa) })?.backingScaleFactor ?? NSScreen.main?.backingScaleFactor ?? 2
}

func resized(_ image: CGImage, scale: CGFloat) -> CGImage? {
  let w = max(1, Int((CGFloat(image.width) * scale).rounded())), h = max(1, Int((CGFloat(image.height) * scale).rounded()))
  guard let ctx = CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0, space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return nil }
  ctx.interpolationQuality = .high
  ctx.draw(image, in: CGRect(x: 0, y: 0, width: w, height: h))
  return ctx.makeImage()
}
func png(_ image: CGImage) -> Data? { NSBitmapImageRep(cgImage: image).representation(using: .png, properties: [:]) }

/// Shrink to the long-side budget, then further until the PNG fits the byte budget.
func boundedPNG(_ image: CGImage) throws -> (data: Data, width: Int, height: Int) {
  var scale = min(1, screenshotMaxDimension / CGFloat(max(image.width, image.height)))
  var best: (Data, Int, Int)?
  for _ in 0..<8 {
    let attempt: (Data, Int, Int)? = autoreleasepool {
      guard let r = scale < 1 ? resized(image, scale: scale) : image, let d = png(r) else { return nil }
      return (d, r.width, r.height)
    }
    guard let a = attempt else { break }
    best = a
    if a.0.count <= screenshotMaxBytes { break }
    scale *= 0.8
  }
  guard let b = best else { throw HelperError("capture_failed", "could not encode the screenshot") }
  return b
}

struct Screenshot { let png: Data; let width: Int; let height: Int; let pixelsPerPoint: CGFloat }

func screenshot(of window: WindowInfo) throws -> Screenshot {
  guard screenRecordingGranted() else { throw HelperError("screen_recording_denied", "Screen Recording permission is missing") }
  guard let wid = window.windowId else { throw HelperError("capture_failed", "could not identify the window on screen") }
  var image: CGImage
  if #available(macOS 14.0, *) {
    do { image = try captureSCK(windowId: wid, frame: window.frame, scale: backingScale(for: window.frame)) }
    catch { image = try captureCLI(windowId: wid) }  // e.g. SCStreamErrorDomain -3811 for a window the stream cannot start on
  } else { image = try captureCLI(windowId: wid) }
  let out = try boundedPNG(image)
  return Screenshot(png: out.data, width: out.width, height: out.height, pixelsPerPoint: CGFloat(out.width) / window.frame.width)
}

// MARK: - Accessibility tree

struct Node {
  let index: Int
  let depth: Int
  let role: String
  let subrole: String
  let label: String
  let value: String
  let frame: CGRect?
  let actions: [String]
  let enabled: Bool
  let focused: Bool
  let selected: Bool?
  var secure: Bool { subrole == "AXSecureTextField" }
}

let interactiveRoles: Set<String> = [
  "AXButton", "AXLink", "AXTextField", "AXTextArea", "AXCheckBox", "AXRadioButton", "AXPopUpButton", "AXComboBox", "AXMenuButton",
  "AXMenuItem", "AXMenuBarItem", "AXTabButton", "AXTab", "AXSlider", "AXDisclosureTriangle", "AXSearchField", "AXIncrementor", "AXSegment",
  "AXRow", "AXCell", "AXColorWell", "AXDateField", "AXTimeField", "AXStepper", "AXSwitch", "AXToggle", "AXImage",
]
let textRoles: Set<String> = ["AXStaticText", "AXHeading", "AXTextField", "AXTextArea", "AXSearchField", "AXComboBox", "AXWebArea"]
let noiseActions: Set<String> = ["AXScrollToVisible", "AXShowMenu", "AXRaise", "AXShowDefaultUI", "AXShowAlternateUI", "AXCancel"]
let skipRoles: Set<String> = ["AXScrollBar", "AXSplitter", "AXGrowArea", "AXUnknown"]

final class Snapshot {
  let app: AppRef
  let window: WindowInfo
  var elements: [AXUIElement] = []
  var nodes: [Node] = []
  var screenshot: Screenshot?
  var windowFrame: CGRect
  init(app: AppRef, window: WindowInfo) { self.app = app; self.window = window; self.windowFrame = window.frame }

  /// screenshot pixels per point; without a screenshot, coordinates are window points.
  var pixelsPerPoint: CGFloat { screenshot?.pixelsPerPoint ?? 1 }
  func toPixel(_ p: CGPoint) -> CGPoint { CGPoint(x: (p.x - windowFrame.minX) * pixelsPerPoint, y: (p.y - windowFrame.minY) * pixelsPerPoint) }
  func toScreen(_ p: CGPoint) -> CGPoint { CGPoint(x: windowFrame.minX + p.x / pixelsPerPoint, y: windowFrame.minY + p.y / pixelsPerPoint) }
  var pixelSize: CGSize { screenshot.map { CGSize(width: $0.width, height: $0.height) } ?? windowFrame.size }
}

func walk(_ el: AXUIElement, depth: Int, snap: Snapshot, maxNodes: Int, maxDepth: Int) {
  if snap.elements.count >= maxNodes || depth > maxDepth { return }
  let role = axStr(el, kAXRoleAttribute as String) ?? "AXUnknown"
  if skipRoles.contains(role) { return }
  let idx = snap.elements.count
  snap.elements.append(el)
  let subrole = axStr(el, kAXSubroleAttribute as String) ?? ""
  var label = axStr(el, kAXTitleAttribute as String) ?? ""
  if label.isEmpty { label = axStr(el, kAXDescriptionAttribute as String) ?? "" }
  if label.isEmpty, let ph = axStr(el, "AXPlaceholderValue"), !ph.isEmpty { label = "placeholder: \(ph)" }
  if label.isEmpty, role == "AXImage" || role == "AXButton", let h = axStr(el, kAXHelpAttribute as String) { label = h }
  var value = subrole == "AXSecureTextField" ? "" : (axStr(el, kAXValueAttribute as String) ?? "")
  if role == "AXStaticText", label.isEmpty { label = value; value = "" }
  if role == "AXCheckBox" || role == "AXRadioButton" || role == "AXSwitch" || role == "AXToggle" { value = value == "1" ? "checked" : value == "0" ? "unchecked" : value }
  let node = Node(index: idx, depth: depth, role: role, subrole: subrole, label: oneLine(label, limit: 120), value: oneLine(value, limit: 160), frame: axFrame(el),
                  actions: axActions(el), enabled: axBool(el, kAXEnabledAttribute as String) ?? true, focused: axBool(el, kAXFocusedAttribute as String) ?? false, selected: axBool(el, kAXSelectedAttribute as String))
  snap.nodes.append(node)
  // Menus that are not open expose their items anyway; walking them would list every command in the app.
  if role == "AXMenuBarItem" || (role == "AXMenu" && depth > 0 && axElements(el, kAXChildrenAttribute as String).isEmpty) { return }
  for child in axElements(el, kAXChildrenAttribute as String) {
    if snap.elements.count >= maxNodes { break }
    walk(child, depth: depth + 1, snap: snap, maxNodes: maxNodes, maxDepth: maxDepth)
  }
}

func interesting(_ n: Node) -> Bool {
  if n.role == "AXWindow" || n.role == "AXSheet" || n.role == "AXDrawer" || n.role == "AXPopover" { return true }
  if interactiveRoles.contains(n.role) { return n.role != "AXImage" || !n.label.isEmpty }
  if n.role == "AXMenu" { return true }
  if !n.actions.filter({ !noiseActions.contains($0) }).isEmpty { return true }
  if textRoles.contains(n.role), !(n.label.isEmpty && n.value.isEmpty) { return true }
  if n.focused { return true }
  return false
}

func renderLine(_ n: Node, snap: Snapshot, withIndex: Bool) -> String {
  let indent = String(repeating: " ", count: min(n.depth, 12))
  var line = (withIndex ? "[\(n.index)] " : "") + indent + n.role.replacingOccurrences(of: "AX", with: "")
  if n.secure { line += " SECURE" }
  if !n.label.isEmpty { line += " \"\(n.label)\"" }
  if !n.value.isEmpty { line += " value=\"\(n.value)\"" }
  if let f = n.frame {
    let p = snap.toPixel(CGPoint(x: f.midX, y: f.midY))
    let size = snap.pixelSize
    if p.x >= 0, p.y >= 0, p.x <= size.width, p.y <= size.height { line += " @(\(Int(p.x)),\(Int(p.y)))" }
  }
  var flags: [String] = []
  if !n.enabled { flags.append("disabled") }
  if n.focused { flags.append("focused") }
  if n.selected == true { flags.append("selected") }
  if !flags.isEmpty { line += " <" + flags.joined(separator: ",") + ">" }
  let acts = n.actions.filter { !noiseActions.contains($0) && $0 != "AXPress" }.map { oneLine($0.replacingOccurrences(of: "AX", with: ""), limit: 40) }.filter { !$0.isEmpty }
  if !acts.isEmpty { line += " {" + acts.joined(separator: ",") + "}" }
  return line
}

func renderTree(_ snap: Snapshot, maxLines: Int) -> (indexed: String, bare: [String]) {
  var indexed: [String] = [], bare: [String] = []
  var lastLabel = ""
  for n in snap.nodes where interesting(n) {
    if n.role == "AXStaticText", n.label == lastLabel { continue }
    indexed.append(renderLine(n, snap: snap, withIndex: true))
    bare.append(renderLine(n, snap: snap, withIndex: false))
    if interactiveRoles.contains(n.role) { lastLabel = n.label }
    if indexed.count >= maxLines { indexed.append("… (truncated at \(maxLines) elements; scroll or focus a smaller area)"); break }
  }
  return (indexed.joined(separator: "\n"), bare)
}

// MARK: - Observation state

var snapshots: [String: Snapshot] = [:]      // by app id
var previousLines: [String: [String]] = [:]  // index-free lines of the last full render, by app id

func observe(_ app: AppRef, includeScreenshot: Bool, disableDiff: Bool, maxNodes: Int) throws -> JSON {
  guard AXIsProcessTrusted() else { throw HelperError("accessibility_denied", "Accessibility permission is missing") }
  let wins = windows(of: app)
  guard let win = wins.first else {
    throw HelperError("no_window", "\(app.name) has no window to observe. Open one first (computer_open_app or a keyboard shortcut like cmd+n).")
  }
  let snap = Snapshot(app: app, window: win)
  var captureError: String?
  if includeScreenshot {
    func attempt() -> String? {
      do { snap.screenshot = try screenshot(of: win); return nil } catch let e as HelperError { return e.message } catch { return String(describing: error) }
    }
    captureError = attempt()
    // A window on another Space (a full-screen app, say) cannot be captured from here;
    // bringing the app forward switches to it, which any action would do anyway.
    if captureError != nil, captureError != "Screen Recording permission is missing", !app.app.isActive {
      activate(app, window: win.element)
      usleep(350_000)
      if let f = axFrame(win.element) { snap.windowFrame = f }
      captureError = attempt()
    }
  }
  walk(win.element, depth: 0, snap: snap, maxNodes: maxNodes, maxDepth: 40)
  // The menu bar lives under the app element, not the window. Its items are listed so
  // they can be clicked (AXPick opens the menu); a menu's contents are walked only while
  // it is open, otherwise every command in the app would be listed on every observation.
  let appEl = AXUIElementCreateApplication(app.pid)
  if let bar = axElement(appEl, kAXMenuBarAttribute as String) {
    for item in axElements(bar, kAXChildrenAttribute as String) {
      walk(item, depth: 0, snap: snap, maxNodes: maxNodes, maxDepth: 0)
      guard axBool(item, kAXSelectedAttribute as String) == true, let menu = axElements(item, kAXChildrenAttribute as String).first else { continue }
      walk(menu, depth: 1, snap: snap, maxNodes: maxNodes, maxDepth: 6)
    }
  }
  snapshots[app.id] = snap
  let rendered = renderTree(snap, maxLines: 700)
  var text = rendered.indexed
  var changed = true
  if !disableDiff, let prev = previousLines[app.id] {
    let prevSet = Set(prev), curSet = Set(rendered.bare)
    let added = rendered.bare.filter { !prevSet.contains($0) }, removed = prev.filter { !curSet.contains($0) }
    if added.isEmpty && removed.isEmpty {
      changed = false
      text = "(the accessibility tree is the same as in the previous observation, so element indices still apply; the screenshot, when attached, is freshly captured)"
    } else if added.count + removed.count < max(8, rendered.bare.count / 2) {
      let addedIdx = snap.nodes.filter { interesting($0) }.map { renderLine($0, snap: snap, withIndex: true) }.filter { line in added.contains(where: { line.hasSuffix($0) }) }
      text = "Changes since the previous observation (+\(added.count) −\(removed.count) of \(rendered.bare.count) lines; unchanged elements keep their meaning but indices may shift — use the ones shown here or observe with disableDiff for the full tree):\n"
        + (addedIdx.isEmpty ? "" : "ADDED / CHANGED:\n" + addedIdx.prefix(300).joined(separator: "\n") + "\n")
        + (removed.isEmpty ? "" : "REMOVED:\n" + removed.prefix(100).map { "  - " + $0 }.joined(separator: "\n"))
    }
  }
  previousLines[app.id] = rendered.bare
  let others = wins.dropFirst().map { $0.title }.filter { !$0.isEmpty }
  var result: JSON = [
    "app": app.info,
    "window": ["title": win.title, "x": Int(win.frame.minX), "y": Int(win.frame.minY), "width": Int(win.frame.width), "height": Int(win.frame.height), "otherWindows": Array(others.prefix(8))],
    "text": text, "changed": changed, "elementCount": snap.nodes.count,
  ]
  if let s = snap.screenshot { result["screenshot"] = ["png": s.png.base64EncodedString(), "width": s.width, "height": s.height] }
  if let e = captureError { result["screenshotError"] = e }
  return result
}

func element(_ app: AppRef, index: Int) throws -> (AXUIElement, Node, Snapshot) {
  guard let snap = snapshots[app.id] else { throw HelperError("stale_index", "no observation of \(app.name) yet; call computer_get_app_state first") }
  guard index >= 0, index < snap.elements.count else { throw HelperError("stale_index", "element \(index) is not in the latest observation of \(app.name); call computer_get_app_state again") }
  return (snap.elements[index], snap.nodes[index], snap)
}

func currentSnapshot(_ app: AppRef) throws -> Snapshot {
  guard let snap = snapshots[app.id] else { throw HelperError("stale_index", "observe \(app.name) with computer_get_app_state before using coordinates") }
  // Windows move: refresh the frame so pixel coordinates land where the screenshot showed them.
  if let f = axFrame(snap.window.element) { snap.windowFrame = f }
  return snap
}

// MARK: - Input

func activate(_ app: AppRef, window: AXUIElement?) {
  if !app.app.isActive {
    if #available(macOS 14.0, *) { app.app.activate() } else { app.app.activate(options: [.activateIgnoringOtherApps]) }
  }
  if let w = window {
    // Raise is not enough when another of the app's windows (an open panel, a sheet's
    // parent) holds key focus: make the observed window the main, focused one.
    AXUIElementPerformAction(w, kAXRaiseAction as CFString)
    AXUIElementSetAttributeValue(w, kAXMainAttribute as CFString, kCFBooleanTrue)
    AXUIElementSetAttributeValue(w, kAXFocusedAttribute as CFString, kCFBooleanTrue)
  }
  for _ in 0..<20 { if app.app.isActive { break }; usleep(25_000) }
  usleep(60_000)
}

func post(_ e: CGEvent) { e.post(tap: .cghidEventTap) }

/// Keyboard events go to the target process directly: they do not depend on which app
/// the window server considers frontmost at that instant, which is exactly what is
/// racy right after an activation or a new window.
var keyboardTarget: pid_t?
func postKey(_ e: CGEvent) { if let pid = keyboardTarget { e.postToPid(pid) } else { e.post(tap: .cghidEventTap) } }

func mouseButton(_ s: String?) throws -> CGMouseButton {
  switch (s ?? "left").lowercased() {
  case "left", "l": return .left
  case "right", "r": return .right
  case "middle", "m": return .center
  default: throw HelperError("invalid_argument", "mouse_button must be left, right or middle")
  }
}

func clickAt(_ p: CGPoint, button: CGMouseButton, count: Int, holding flags: CGEventFlags = []) {
  let (down, up, drag): (CGEventType, CGEventType, CGEventType) = button == .right ? (.rightMouseDown, .rightMouseUp, .rightMouseDragged)
    : button == .center ? (.otherMouseDown, .otherMouseUp, .otherMouseDragged) : (.leftMouseDown, .leftMouseUp, .leftMouseDragged)
  _ = drag
  if let m = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: button) { m.flags = flags; post(m) }
  usleep(30_000)
  for i in 1...max(1, count) {
    if let d = CGEvent(mouseEventSource: nil, mouseType: down, mouseCursorPosition: p, mouseButton: button) { d.setIntegerValueField(.mouseEventClickState, value: Int64(i)); d.flags = flags; post(d) }
    usleep(25_000)
    if let u = CGEvent(mouseEventSource: nil, mouseType: up, mouseCursorPosition: p, mouseButton: button) { u.setIntegerValueField(.mouseEventClickState, value: Int64(i)); u.flags = flags; post(u) }
    if i < count { usleep(70_000) }
  }
}

func dragBetween(_ from: CGPoint, _ to: CGPoint) {
  if let m = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: from, mouseButton: .left) { post(m) }
  usleep(40_000)
  if let d = CGEvent(mouseEventSource: nil, mouseType: .leftMouseDown, mouseCursorPosition: from, mouseButton: .left) { post(d) }
  usleep(120_000)
  let steps = 24
  for i in 1...steps {
    let t = CGFloat(i) / CGFloat(steps)
    let p = CGPoint(x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t)
    if let e = CGEvent(mouseEventSource: nil, mouseType: .leftMouseDragged, mouseCursorPosition: p, mouseButton: .left) { post(e) }
    usleep(12_000)
  }
  usleep(80_000)
  if let u = CGEvent(mouseEventSource: nil, mouseType: .leftMouseUp, mouseCursorPosition: to, mouseButton: .left) { post(u) }
}

func scrollAt(_ p: CGPoint, direction: String, pages: Double) throws {
  let (v, h): (Int32, Int32)
  switch direction.lowercased() {
  case "up", "u": (v, h) = (1, 0)
  case "down", "d": (v, h) = (-1, 0)
  case "left", "l": (v, h) = (0, 1)
  case "right", "r": (v, h) = (0, -1)
  default: throw HelperError("invalid_argument", "direction must be up, down, left or right")
  }
  if let m = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: p, mouseButton: .left) { post(m) }
  usleep(40_000)
  var remaining = Int32((max(0.1, pages) * 10).rounded())
  while remaining > 0 {
    let step = min(3, remaining)
    if let e = CGEvent(scrollWheelEvent2Source: nil, units: .line, wheelCount: 2, wheel1: v * step, wheel2: h * step, wheel3: 0) { post(e) }
    remaining -= step
    usleep(15_000)
  }
}

let keyCodes: [String: CGKeyCode] = [
  "return": 36, "enter": 36, "kp_enter": 76, "tab": 48, "space": 49, "backspace": 51, "delete": 51, "forwarddelete": 117, "escape": 53, "esc": 53,
  "left": 123, "right": 124, "down": 125, "up": 126, "home": 115, "end": 119, "pageup": 116, "pagedown": 121, "page_up": 116, "page_down": 121,
  "f1": 122, "f2": 120, "f3": 99, "f4": 118, "f5": 96, "f6": 97, "f7": 98, "f8": 100, "f9": 101, "f10": 109, "f11": 103, "f12": 111,
  "a": 0, "s": 1, "d": 2, "f": 3, "h": 4, "g": 5, "z": 6, "x": 7, "c": 8, "v": 9, "b": 11, "q": 12, "w": 13, "e": 14, "r": 15, "y": 16, "t": 17,
  "o": 31, "u": 32, "i": 34, "p": 35, "l": 37, "j": 38, "k": 40, "n": 45, "m": 46,
  "1": 18, "2": 19, "3": 20, "4": 21, "5": 23, "6": 22, "7": 26, "8": 28, "9": 25, "0": 29,
  "minus": 27, "-": 27, "equal": 24, "=": 24, "plus": 24, "comma": 43, ",": 43, "period": 47, ".": 47, "slash": 44, "/": 44, "semicolon": 41, ";": 41,
  "quote": 39, "'": 39, "grave": 50, "`": 50, "bracketleft": 33, "[": 33, "bracketright": 30, "]": 30, "backslash": 42, "\\": 42,
]

/// xdotool / X keysym style: `cmd+shift+t`, `Return`, `Control_L+a`, `super+c`.
func keyChord(_ spec: String) throws -> (CGKeyCode, CGEventFlags) {
  let parts = spec.split(separator: "+").map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }
  guard let last = parts.last else { throw HelperError("invalid_argument", "key is required") }
  var flags = CGEventFlags()
  for m in parts.dropLast() {
    switch m.lowercased() {
    case "cmd", "command", "super", "super_l", "super_r", "meta", "win": flags.insert(.maskCommand)
    case "shift", "shift_l", "shift_r": flags.insert(.maskShift)
    case "ctrl", "control", "control_l", "control_r": flags.insert(.maskControl)
    case "alt", "option", "opt", "alt_l", "alt_r": flags.insert(.maskAlternate)
    case "fn": flags.insert(.maskSecondaryFn)
    default: throw HelperError("invalid_argument", "unknown modifier \(m)")
    }
  }
  var name = last.lowercased()
  if name.count == 1, let up = last.first, up.isUppercase, up.isLetter { flags.insert(.maskShift) }
  if name == "kp_0" { name = "0" }
  guard let code = keyCodes[name] else { throw HelperError("invalid_argument", "unknown key \(last)") }
  if ["up", "down", "left", "right", "home", "end", "pageup", "pagedown", "page_up", "page_down", "forwarddelete"].contains(name) { flags.insert(.maskSecondaryFn) }
  return (code, flags)
}

func pressChord(_ spec: String) throws {
  let (code, flags) = try keyChord(spec)
  let source = CGEventSource(stateID: .combinedSessionState)
  if let d = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: true) { d.flags = flags; postKey(d) }
  usleep(30_000)
  if let u = CGEvent(keyboardEventSource: source, virtualKey: code, keyDown: false) { u.flags = flags; postKey(u) }
  usleep(30_000)
}

func typeString(_ text: String) {
  let source = CGEventSource(stateID: .combinedSessionState)
  for ch in text {
    if ch == "\n" || ch == "\r" { try? pressChord("Return"); continue }
    if ch == "\t" { try? pressChord("Tab"); continue }
    var units = Array(String(ch).utf16)
    if let d = CGEvent(keyboardEventSource: source, virtualKey: 0, keyDown: true) { d.keyboardSetUnicodeString(stringLength: units.count, unicodeString: &units); postKey(d) }
    if let u = CGEvent(keyboardEventSource: source, virtualKey: 0, keyDown: false) { u.keyboardSetUnicodeString(stringLength: units.count, unicodeString: &units); postKey(u) }
    usleep(8_000)
  }
}

/// Where keystrokes would land right now, for the plugin's diagnostics.
func focusedInfo(_ app: AppRef) -> JSON {
  let appEl = AXUIElementCreateApplication(app.pid)
  guard let f = axElement(appEl, kAXFocusedUIElementAttribute as String) else { return ["focused": NSNull()] }
  var d: JSON = ["role": axStr(f, kAXRoleAttribute as String) ?? "", "subrole": axStr(f, kAXSubroleAttribute as String) ?? "", "value": oneLine(axStr(f, kAXValueAttribute as String) ?? "", limit: 200)]
  if let w = axElement(f, kAXWindowAttribute as String) { d["window"] = axStr(w, kAXTitleAttribute as String) ?? "" }
  d["appActive"] = app.app.isActive
  return d
}

func focusedIsSecure(_ app: AppRef) -> Bool {
  guard let f = axElement(AXUIElementCreateApplication(app.pid), kAXFocusedUIElementAttribute as String) else { return false }
  return axStr(f, kAXSubroleAttribute as String) == "AXSecureTextField"
}

func targetPoint(_ app: AppRef, _ p: JSON) throws -> (CGPoint, Snapshot, Node?) {
  if let idx = int(p, "element_index") {
    let (_, node, snap) = try element(app, index: idx)
    guard let f = node.frame else { throw HelperError("no_frame", "element \(idx) has no position; click by coordinates instead") }
    return (CGPoint(x: f.midX, y: f.midY), snap, node)
  }
  guard let x = num(p, "x"), let y = num(p, "y") else { throw HelperError("invalid_argument", "give element_index, or x and y in screenshot pixels") }
  let snap = try currentSnapshot(app)
  let size = snap.pixelSize
  guard x >= 0, y >= 0, x <= size.width, y <= size.height else { throw HelperError("invalid_argument", "(\(Int(x)),\(Int(y))) is outside the \(Int(size.width))×\(Int(size.height)) screenshot") }
  return (snap.toScreen(CGPoint(x: x, y: y)), snap, nil)
}

// MARK: - Handlers

func handle(_ method: String, _ p: JSON) throws -> Any {
  switch method {
  case "ping": return ["ok": true, "pid": Int(selfPid)]
  case "permissions":
    return ["accessibility": AXIsProcessTrusted(), "screenRecording": screenRecordingGranted()]
  case "request_permissions":
    let ax = AXIsProcessTrustedWithOptions([kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true] as CFDictionary)
    let sr = screenRecordingGranted() || CGRequestScreenCaptureAccess()
    return ["accessibility": ax, "screenRecording": sr]
  case "list_apps":
    let running = runningApps().filter { $0.processIdentifier != selfPid }.map { AppRef(app: $0).info }
    return running.sorted { ($0["displayName"] as? String ?? "") < ($1["displayName"] as? String ?? "") }
  case "resolve_app":
    // Identity only, for the plugin's per-app approval: nothing is launched or touched.
    let q = try require(p, "app")
    if let r = findRunning(q) { return AppRef(app: r).info }
    guard let url = installedAppURL(named: q) else { throw HelperError("app_not_found", "no app matches \"\(q)\"") }
    let bundle = Bundle(url: url)
    return ["id": bundle?.bundleIdentifier ?? url.path, "displayName": (bundle?.infoDictionary?["CFBundleDisplayName"] as? String) ?? (bundle?.infoDictionary?["CFBundleName"] as? String) ?? url.deletingPathExtension().lastPathComponent, "path": url.path, "isRunning": false]
  case "open_app":
    let q = try require(p, "app")
    let app: AppRef
    if let r = findRunning(q) { app = AppRef(app: r) }
    else {
      guard let url = installedAppURL(named: q) else { throw HelperError("app_not_found", "no installed app matches \"\(q)\"") }
      app = AppRef(app: try launchApp(at: url, activate: true))
      for _ in 0..<50 { if !windows(of: app).isEmpty { break }; usleep(100_000) }
    }
    activate(app, window: windows(of: app).first?.element)
    return app.info
  case "get_app_state":
    let app = try resolveApp(try require(p, "app"), launch: true)
    return try observe(app, includeScreenshot: bool(p, "screenshot") ?? true, disableDiff: bool(p, "disableDiff") ?? false, maxNodes: min(6000, max(200, int(p, "maxNodes") ?? 3000)))
  case "click":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let button = try mouseButton(str(p, "mouse_button"))
    let count = max(1, min(3, int(p, "click_count") ?? 1))
    if let idx = int(p, "element_index"), button == .left, count == 1, !(bool(p, "force_mouse") ?? false) {
      let (el, node, snap) = try element(app, index: idx)
      // The accessibility action needs no pointer and works on background apps.
      if node.actions.contains("AXPress"), AXUIElementPerformAction(el, kAXPressAction as CFString) == .success { return ["method": "AXPress", "element": idx] }
      if node.role == "AXMenuItem" || node.role == "AXMenuBarItem", AXUIElementPerformAction(el, "AXPick" as CFString) == .success { return ["method": "AXPick", "element": idx] }
      _ = snap
    }
    let (pt, snap, node) = try targetPoint(app, p)
    activate(app, window: snap.window.element)
    var flags = CGEventFlags()
    if let k = str(p, "key") { for m in k.split(separator: "+") { flags.formUnion(try keyChord(String(m) + "+a").1) } }
    clickAt(pt, button: button, count: count, holding: flags)
    var out: JSON = ["method": "mouse", "x": Int(snap.toPixel(pt).x), "y": Int(snap.toPixel(pt).y)]
    if let n = node { out["element"] = n.index }
    return out
  case "move_mouse":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let (pt, snap, _) = try targetPoint(app, p)
    activate(app, window: snap.window.element)
    if let m = CGEvent(mouseEventSource: nil, mouseType: .mouseMoved, mouseCursorPosition: pt, mouseButton: .left) { post(m) }
    return ["ok": true]
  case "drag":
    let app = try resolveApp(try require(p, "app"), launch: false)
    guard let fx = num(p, "from_x"), let fy = num(p, "from_y"), let tx = num(p, "to_x"), let ty = num(p, "to_y") else { throw HelperError("invalid_argument", "from_x, from_y, to_x and to_y are required") }
    let snap = try currentSnapshot(app)
    activate(app, window: snap.window.element)
    dragBetween(snap.toScreen(CGPoint(x: fx, y: fy)), snap.toScreen(CGPoint(x: tx, y: ty)))
    return ["ok": true]
  case "scroll":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let (pt, snap, _) = try targetPoint(app, p)
    activate(app, window: snap.window.element)
    try scrollAt(pt, direction: str(p, "direction") ?? "down", pages: num(p, "pages") ?? 1)
    return ["ok": true]
  case "focused":
    return focusedInfo(try resolveApp(try require(p, "app"), launch: false))
  case "press_key":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let key = try require(p, "key")
    activate(app, window: snapshots[app.id]?.window.element ?? windows(of: app).first?.element)
    keyboardTarget = app.pid; defer { keyboardTarget = nil }
    try pressChord(key)
    return ["ok": true]
  case "type_text":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let text = try require(p, "text")
    activate(app, window: snapshots[app.id]?.window.element ?? windows(of: app).first?.element)
    if focusedIsSecure(app) { throw HelperError("secure_field", "the focused field is a password field; the user has to type this themselves") }
    keyboardTarget = app.pid; defer { keyboardTarget = nil }
    typeString(text)
    return ["ok": true, "characters": text.count, "focused": focusedInfo(app)]
  case "paste":
    let app = try resolveApp(try require(p, "app"), launch: false)
    let text = try require(p, "text")
    activate(app, window: snapshots[app.id]?.window.element ?? windows(of: app).first?.element)
    if focusedIsSecure(app) { throw HelperError("secure_field", "the focused field is a password field; the user has to type this themselves") }
    let pb = NSPasteboard.general
    let previous = pb.string(forType: .string)
    pb.clearContents()
    if str(p, "format") == "html" { pb.setString(text, forType: .html) } else { pb.setString(text, forType: .string) }
    usleep(50_000)
    try pressChord("cmd+v")
    usleep(400_000)
    if let prev = previous { pb.clearContents(); pb.setString(prev, forType: .string) }
    return ["ok": true]
  case "set_value":
    let app = try resolveApp(try require(p, "app"), launch: false)
    guard let idx = int(p, "element_index") else { throw HelperError("invalid_argument", "element_index is required") }
    let value = str(p, "value") ?? ""
    let (el, node, _) = try element(app, index: idx)
    if node.secure { throw HelperError("secure_field", "element \(idx) is a password field; the user has to type this themselves") }
    let err = AXUIElementSetAttributeValue(el, kAXValueAttribute as CFString, value as CFTypeRef)
    guard err == .success else { throw HelperError("action_failed", "the element did not accept a value (AX error \(err.rawValue)); click it and use computer_type_text instead") }
    return ["ok": true]
  case "select_text":
    let app = try resolveApp(try require(p, "app"), launch: false)
    guard let idx = int(p, "element_index") else { throw HelperError("invalid_argument", "element_index is required") }
    let (el, node, _) = try element(app, index: idx)
    if node.secure { throw HelperError("secure_field", "element \(idx) is a password field") }
    let full = axStr(el, kAXValueAttribute as String) ?? ""
    let needle = (str(p, "prefix") ?? "") + (str(p, "text") ?? "") + (str(p, "suffix") ?? "")
    guard !needle.isEmpty, let r = full.range(of: needle) else { throw HelperError("not_found", "the text was not found in element \(idx)") }
    let prefixLen = (str(p, "prefix") ?? "").utf16.count, textLen = (str(p, "text") ?? "").utf16.count
    let start = full.utf16.distance(from: full.utf16.startIndex, to: r.lowerBound.samePosition(in: full.utf16)!) + prefixLen
    var range: CFRange
    switch str(p, "selection_type") ?? "text" {
    case "cursor_before": range = CFRange(location: start, length: 0)
    case "cursor_after": range = CFRange(location: start + textLen, length: 0)
    default: range = CFRange(location: start, length: textLen)
    }
    guard let v = AXValueCreate(.cfRange, &range), AXUIElementSetAttributeValue(el, kAXSelectedTextRangeAttribute as CFString, v) == .success else { throw HelperError("action_failed", "the element does not support text selection") }
    AXUIElementSetAttributeValue(el, kAXFocusedAttribute as CFString, kCFBooleanTrue)
    return ["ok": true, "location": range.location, "length": range.length]
  case "perform_secondary_action":
    let app = try resolveApp(try require(p, "app"), launch: false)
    guard let idx = int(p, "element_index") else { throw HelperError("invalid_argument", "element_index is required") }
    var action = try require(p, "action")
    if !action.hasPrefix("AX") { action = "AX" + action }
    let (el, node, _) = try element(app, index: idx)
    guard node.actions.contains(action) else { throw HelperError("invalid_argument", "element \(idx) supports: \(node.actions.joined(separator: ", "))") }
    let err = AXUIElementPerformAction(el, action as CFString)
    guard err == .success else { throw HelperError("action_failed", "\(action) failed (AX error \(err.rawValue))") }
    return ["ok": true]
  default:
    throw HelperError("unknown_method", "unknown method \(method)")
  }
}

// MARK: - Main loop

let output = FileHandle.standardOutput
let outputLock = NSLock()
func send(_ obj: JSON) {
  guard let data = try? JSONSerialization.data(withJSONObject: obj) else { return }
  outputLock.lock(); output.write(data); output.write("\n".data(using: .utf8)!); outputLock.unlock()
}

let queue = DispatchQueue(label: "dsh-cua.requests")
Thread.detachNewThread {
  while let line = readLine(strippingNewline: true) {
    guard !line.isEmpty, let data = line.data(using: .utf8), let req = (try? JSONSerialization.jsonObject(with: data)) as? JSON else { continue }
    let id = req["id"] ?? NSNull()
    let method = (req["method"] as? String) ?? ""
    let params = (req["params"] as? JSON) ?? [:]
    queue.async {
      do { send(["id": id, "result": try handle(method, params)]) }
      catch let e as HelperError { send(["id": id, "error": ["code": e.code, "message": e.message]]) }
      catch { send(["id": id, "error": ["code": "internal", "message": String(describing: error)]]) }
    }
  }
  exit(0)
}
RunLoop.main.run()
