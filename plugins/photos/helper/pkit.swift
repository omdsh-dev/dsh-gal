// pkit: a tiny Photos bridge. Prints JSON; takes one command.
//
//   pkit recent <days>                 assets from the last N days, newest first (cap 2000)
//   pkit albums                        user albums plus the smart "Favorites" album
//   pkit album <title>                 assets in one album (cap 500)
//   pkit thumb <id> <maxPx> <outPath>  write a JPEG thumbnail of one asset
//   pkit status                        authorization state
//
// Built with an embedded Info.plist so the photo-library permission prompt
// can name the usage string, as a bare command-line tool otherwise gets
// denied without a word. Never touches the network: locations come out as
// raw lat/lon, grouping happens in the plugin.
import AppKit
import Foundation
import Photos

// TCC attributes a command-line tool to whatever app launched it (a terminal,
// the desktop app), and denies silently when that app has no photos usage
// string. So on first entry the tool re-spawns itself as its own responsible
// process and the prompt names "pkit" with the string embedded above.
@_silgen_name("responsibility_spawnattrs_setdisclaim")
func responsibility_spawnattrs_setdisclaim(_ attrs: UnsafeMutablePointer<posix_spawnattr_t?>, _ disclaim: Int32) -> Int32

func respawnDisclaimed() -> Never {
  var attrs: posix_spawnattr_t? = nil
  posix_spawnattr_init(&attrs)
  _ = responsibility_spawnattrs_setdisclaim(&attrs, 1)
  var argv: [UnsafeMutablePointer<CChar>?] = CommandLine.arguments.map { strdup($0) } + [nil]
  var env = ProcessInfo.processInfo.environment
  env["PKIT_DISCLAIMED"] = "1"
  var envp: [UnsafeMutablePointer<CChar>?] = env.map { strdup("\($0.key)=\($0.value)") } + [nil]
  var pid: pid_t = 0
  let rc = posix_spawn(&pid, CommandLine.arguments[0], nil, &attrs, &argv, &envp)
  posix_spawnattr_destroy(&attrs)
  if rc != 0 { FileHandle.standardError.write("respawn failed: \(rc)\n".data(using: .utf8)!); exit(1) }
  var status: Int32 = 0
  waitpid(pid, &status, 0)
  exit((status & 0x7f) == 0 ? (status >> 8) & 0xff : 1)
}
if ProcessInfo.processInfo.environment["PKIT_DISCLAIMED"] == nil { respawnDisclaimed() }

let isoLocal = DateFormatter()
isoLocal.dateFormat = "yyyy-MM-dd'T'HH:mm:ss"
isoLocal.timeZone = .current

func fail(_ message: String, code: Int32 = 1) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(code)
}
func out(_ value: Any) {
  let data = try! JSONSerialization.data(withJSONObject: value, options: [.sortedKeys])
  FileHandle.standardOutput.write(data)
  FileHandle.standardOutput.write("\n".data(using: .utf8)!)
}
func fmt(_ d: Date?) -> Any { d.map { isoLocal.string(from: $0) } ?? NSNull() }

func statusName(_ s: PHAuthorizationStatus) -> String {
  switch s {
  case .notDetermined: return "notDetermined"
  case .restricted: return "restricted"
  case .denied: return "denied"
  case .authorized: return "authorized"
  case .limited: return "limited"
  @unknown default: return "unknown"
  }
}

/** Read access is all we need; `.readWrite` is what macOS grants for full access. */
func request() {
  let current = PHPhotoLibrary.authorizationStatus(for: .readWrite)
  if current == .authorized || current == .limited { return }
  let sem = DispatchSemaphore(value: 0)
  var status = current
  PHPhotoLibrary.requestAuthorization(for: .readWrite) { status = $0; sem.signal() }
  sem.wait()
  if status != .authorized && status != .limited { fail("denied:photos:" + statusName(status), code: 2) }
}

func assetJSON(_ a: PHAsset) -> [String: Any] {
  var o: [String: Any] = [
    "id": a.localIdentifier,
    "created": fmt(a.creationDate),
    "mediaType": a.mediaType == .video ? "video" : a.mediaType == .image ? "image" : "other",
    "width": a.pixelWidth, "height": a.pixelHeight,
    "favorite": a.isFavorite,
  ]
  if a.mediaType == .video { o["duration"] = a.duration }
  if let loc = a.location { o["lat"] = loc.coordinate.latitude; o["lon"] = loc.coordinate.longitude }
  return o
}

func assets(_ result: PHFetchResult<PHAsset>, cap: Int) -> [[String: Any]] {
  var list: [[String: Any]] = []
  result.enumerateObjects { asset, index, stop in
    list.append(assetJSON(asset))
    if list.count >= cap { stop.pointee = true }
  }
  return list
}

let args = CommandLine.arguments.dropFirst()
guard let command = args.first else { fail("usage: pkit <recent|albums|album|thumb|status> …") }
let rest = Array(args.dropFirst())

switch command {
case "status":
  out(["photos": statusName(PHPhotoLibrary.authorizationStatus(for: .readWrite))])

case "recent":
  let days = max(1, Int(rest.first ?? "30") ?? 30)
  request()
  let since = Calendar.current.date(byAdding: .day, value: -days, to: Date())!
  let options = PHFetchOptions()
  options.predicate = NSPredicate(format: "creationDate >= %@ AND (mediaType == %d OR mediaType == %d)", since as NSDate, PHAssetMediaType.image.rawValue, PHAssetMediaType.video.rawValue)
  options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
  options.fetchLimit = 2000
  out(assets(PHAsset.fetchAssets(with: options), cap: 2000))

case "albums":
  request()
  var list: [[String: Any]] = []
  let favorites = PHAssetCollection.fetchAssetCollections(with: .smartAlbum, subtype: .smartAlbumFavorites, options: nil)
  favorites.enumerateObjects { c, _, _ in
    list.append(["title": c.localizedTitle ?? "Favorites", "count": PHAsset.fetchAssets(in: c, options: nil).count, "kind": "smart"])
  }
  let user = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .any, options: nil)
  user.enumerateObjects { c, _, _ in
    list.append(["title": c.localizedTitle ?? "", "count": PHAsset.fetchAssets(in: c, options: nil).count, "kind": "user"])
  }
  out(list)

case "album":
  guard let title = rest.first, !title.isEmpty else { fail("usage: pkit album <title>") }
  request()
  var found: PHAssetCollection? = nil
  let favorites = PHAssetCollection.fetchAssetCollections(with: .smartAlbum, subtype: .smartAlbumFavorites, options: nil)
  favorites.enumerateObjects { c, _, stop in if (c.localizedTitle ?? "Favorites").caseInsensitiveCompare(title) == .orderedSame || title.caseInsensitiveCompare("Favorites") == .orderedSame { found = c; stop.pointee = true } }
  if found == nil {
    let user = PHAssetCollection.fetchAssetCollections(with: .album, subtype: .any, options: nil)
    user.enumerateObjects { c, _, stop in if (c.localizedTitle ?? "").caseInsensitiveCompare(title) == .orderedSame { found = c; stop.pointee = true } }
  }
  guard let album = found else { fail("no album named " + title) }
  let options = PHFetchOptions()
  options.sortDescriptors = [NSSortDescriptor(key: "creationDate", ascending: false)]
  options.fetchLimit = 500
  out(assets(PHAsset.fetchAssets(in: album, options: options), cap: 500))

case "thumb":
  guard rest.count >= 3, let maxPx = Int(rest[1]), maxPx > 0 else { fail("usage: pkit thumb <id> <maxPx> <outPath>") }
  request()
  let fetched = PHAsset.fetchAssets(withLocalIdentifiers: [rest[0]], options: nil)
  guard let asset = fetched.firstObject else { fail("no asset with id " + rest[0]) }
  let options = PHImageRequestOptions()
  options.isSynchronous = true
  options.deliveryMode = .highQualityFormat
  options.resizeMode = .exact
  options.isNetworkAccessAllowed = true
  let side = CGFloat(maxPx)
  let scale = min(1, side / CGFloat(max(1, max(asset.pixelWidth, asset.pixelHeight))))
  let target = CGSize(width: max(1, CGFloat(asset.pixelWidth) * scale), height: max(1, CGFloat(asset.pixelHeight) * scale))
  var image: NSImage? = nil
  var info: [AnyHashable: Any]? = nil
  PHImageManager.default().requestImage(for: asset, targetSize: target, contentMode: .aspectFit, options: options) { img, i in image = img; info = i }
  guard let img = image, let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    let err = (info?[PHImageErrorKey] as? NSError)?.localizedDescription ?? (info?[PHImageResultIsInCloudKey] as? Bool == true ? "asset is in iCloud and not downloaded" : "no image")
    fail("thumbnail failed: " + err)
  }
  let rep = NSBitmapImageRep(cgImage: cg)
  guard let jpeg = rep.representation(using: .jpeg, properties: [.compressionFactor: 0.82]) else { fail("jpeg encode failed") }
  do { try jpeg.write(to: URL(fileURLWithPath: rest[2])) } catch { fail("write failed: " + error.localizedDescription) }
  out(["id": asset.localIdentifier, "path": rest[2], "width": cg.width, "height": cg.height, "bytes": jpeg.count])

default:
  fail("unknown command " + command)
}
