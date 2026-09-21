// Render documentation fixtures with the same WebKit engine as the macOS shell.
// No backend/user session, screen recording or desktop input is involved.
import AppKit
import WebKit
let args = CommandLine.arguments
if args.count != 5 { fatalError("capture-pet-docs <url> <png> <width> <height>") }
let width = Double(args[3])!, height = Double(args[4])!
let app = NSApplication.shared
app.setActivationPolicy(.accessory)
let window = NSWindow(contentRect: NSRect(x: -10000,y: -10000,width: width,height: height),styleMask: [.borderless],backing: .buffered,defer: false)
let web = WKWebView(frame: NSRect(x:0,y:0,width:width,height:height))
window.contentView = web
window.orderFrontRegardless()
final class Capture: NSObject, WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        DispatchQueue.main.asyncAfter(deadline: .now()+1.5) {
            let config = WKSnapshotConfiguration()
            config.rect = webView.bounds
            config.snapshotWidth = NSNumber(value: width)
            webView.takeSnapshot(with: config) { image,error in
                guard let image=image, let tiff=image.tiffRepresentation,
                      let bitmap=NSBitmapImageRep(data:tiff), let png=bitmap.representation(using:.png,properties:[:]) else {
                    fputs("Snapshot failed: \(String(describing:error))\n",stderr);exit(1)
                }
                do { try png.write(to: URL(fileURLWithPath:args[2]));print("Captured \(args[2])");exit(0) }
                catch { fputs("\(error)\n",stderr);exit(1) }
            }
        }
    }
    func webView(_ webView: WKWebView,didFail navigation:WKNavigation!,withError error:Error){fputs("\(error)\n",stderr);exit(1)}
}
let capture=Capture();web.navigationDelegate=capture
let url=URL(string:args[1])!
if url.isFileURL { web.loadFileURL(url,allowingReadAccessTo:url.deletingLastPathComponent()) }
else { web.load(URLRequest(url:url)) }
DispatchQueue.main.asyncAfter(deadline:.now()+25){fputs("Snapshot timeout\n",stderr);exit(1)}
app.run()
