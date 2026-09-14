// lkit: a tiny CoreLocation bridge. Prints JSON; takes one command.
//
//   lkit fix                    one location fix: {lat, lon, accuracy, at}
//   lkit status                 authorization state and whether Location Services is on
//   lkit geocode <lat> <lon>    reverse geocode through CLGeocoder (Apple's service, over the network)
//
// Built with an embedded Info.plist so the location permission prompt can
// name the usage strings; a bare command-line tool otherwise gets denied
// without a word. Location Services must be enabled for the machine
// (System Settings → Privacy & Security → Location Services).
import CoreLocation
import Foundation

// TCC attributes a command-line tool to whatever app launched it (a terminal,
// the desktop app), and denies silently when that app has no location usage
// string. So on first entry the tool re-spawns itself as its own responsible
// process, and the prompt names "lkit" with the strings embedded above.
@_silgen_name("responsibility_spawnattrs_setdisclaim")
func responsibility_spawnattrs_setdisclaim(_ attrs: UnsafeMutablePointer<posix_spawnattr_t?>, _ disclaim: Int32) -> Int32

func respawnDisclaimed() -> Never {
  var attrs: posix_spawnattr_t? = nil
  posix_spawnattr_init(&attrs)
  _ = responsibility_spawnattrs_setdisclaim(&attrs, 1)
  var argv: [UnsafeMutablePointer<CChar>?] = CommandLine.arguments.map { strdup($0) } + [nil]
  var env = ProcessInfo.processInfo.environment
  env["LKIT_DISCLAIMED"] = "1"
  var envp: [UnsafeMutablePointer<CChar>?] = env.map { strdup("\($0.key)=\($0.value)") } + [nil]
  var pid: pid_t = 0
  let rc = posix_spawn(&pid, CommandLine.arguments[0], nil, &attrs, &argv, &envp)
  posix_spawnattr_destroy(&attrs)
  if rc != 0 { FileHandle.standardError.write("respawn failed: \(rc)\n".data(using: .utf8)!); exit(1) }
  var status: Int32 = 0
  waitpid(pid, &status, 0)
  exit((status & 0x7f) == 0 ? (status >> 8) & 0xff : 1)
}
if ProcessInfo.processInfo.environment["LKIT_DISCLAIMED"] == nil { respawnDisclaimed() }

let iso = ISO8601DateFormatter()
iso.formatOptions = [.withInternetDateTime]

func fail(_ message: String, code: Int32 = 1) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(code)
}
func out(_ value: Any) {
  let data = try! JSONSerialization.data(withJSONObject: value, options: [.sortedKeys])
  FileHandle.standardOutput.write(data)
  FileHandle.standardOutput.write("\n".data(using: .utf8)!)
}

func statusName(_ s: CLAuthorizationStatus) -> String {
  switch s {
  case .notDetermined: return "notDetermined"
  case .restricted: return "restricted"
  case .denied: return "denied"
  case .authorizedAlways: return "authorizedAlways"
  case .authorized: return "authorized"
  @unknown default: return "unknown"
  }
}
func currentStatus(_ manager: CLLocationManager) -> CLAuthorizationStatus {
  if #available(macOS 11.0, *) { return manager.authorizationStatus }
  return CLLocationManager.authorizationStatus()
}
func requestAuthorization(_ manager: CLLocationManager) {
  // Both exist on macOS 10.15+; "when in use" is the narrower ask and what the prompt names.
  if #available(macOS 10.15, *) { manager.requestWhenInUseAuthorization() } else { manager.requestAlwaysAuthorization() }
}

/// Runs the location manager until one fix, a denial, or the timeout.
final class Fixer: NSObject, CLLocationManagerDelegate {
  let manager = CLLocationManager()
  var done = false
  var lastError: String? = nil

  var started = false
  var prompted = false

  func run(timeout: TimeInterval) {
    manager.delegate = self
    manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
    // Asking and starting at once yields an immediate kCLErrorDenied while the
    // prompt is still up, so wait for the answer before starting updates.
    if currentStatus(manager) == .notDetermined { prompted = true; requestAuthorization(manager) } else { start() }
    let deadline = Date().addingTimeInterval(timeout)
    while !done && Date() < deadline { RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.2)) }
    if !done {
      if currentStatus(manager) == .notDetermined { fail("denied:location:no answer to the permission prompt", code: 2) }
      fail("timeout: no location fix in \(Int(timeout)) s" + (lastError.map { " (\($0))" } ?? ""), code: 3)
    }
  }
  func start() { if !started { started = true; manager.startUpdatingLocation() } }
  func authorized(_ s: CLAuthorizationStatus) {
    if s == .denied || s == .restricted { fail("denied:location:" + statusName(s), code: 2) }
    if s != .notDetermined { start() }
  }
  func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) { authorized(currentStatus(manager)) }
  func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) { authorized(status) }
  func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    guard let l = locations.last, l.horizontalAccuracy >= 0 else { return }
    done = true
    manager.stopUpdatingLocation()
    out(["lat": l.coordinate.latitude, "lon": l.coordinate.longitude, "accuracy": l.horizontalAccuracy, "at": iso.string(from: l.timestamp)])
    exit(0)
  }
  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    if let e = error as? CLError, e.code == .denied, currentStatus(manager) != .notDetermined { fail("denied:location:" + statusName(currentStatus(manager)), code: 2) }
    // kCLErrorLocationUnknown is transient: keep waiting for a fix until the deadline.
    lastError = error.localizedDescription
  }
}

let args = CommandLine.arguments.dropFirst()
guard let command = args.first else { fail("usage: lkit <fix|status|geocode> …") }
let rest = Array(args.dropFirst())

switch command {
case "status":
  let m = CLLocationManager()
  out(["authorization": statusName(currentStatus(m)), "servicesEnabled": CLLocationManager.locationServicesEnabled()])

case "fix":
  if !CLLocationManager.locationServicesEnabled() { fail("denied:services:Location Services is turned off", code: 2) }
  let fixer = Fixer()
  fixer.run(timeout: 20)

case "geocode":
  guard rest.count >= 2, let lat = Double(rest[0]), let lon = Double(rest[1]) else { fail("usage: lkit geocode <lat> <lon>") }
  // CLGeocoder answers on the main queue, so spin the run loop rather than block on a semaphore.
  var finished = false
  var result: [String: Any]? = nil
  var errText: String? = nil
  let geocoder = CLGeocoder()
  geocoder.reverseGeocodeLocation(CLLocation(latitude: lat, longitude: lon)) { marks, error in
    if let p = marks?.first {
      result = [
        "name": p.name ?? "", "locality": p.locality ?? "", "subLocality": p.subLocality ?? "",
        "administrativeArea": p.administrativeArea ?? "", "country": p.country ?? "", "isoCountryCode": p.isoCountryCode ?? "",
        "timeZone": p.timeZone?.identifier ?? "",
      ]
    } else { errText = error?.localizedDescription ?? "no placemark" }
    finished = true
  }
  let deadline = Date().addingTimeInterval(20)
  while !finished && Date() < deadline { RunLoop.current.run(mode: .default, before: Date().addingTimeInterval(0.2)) }
  if !finished { fail("geocode timeout", code: 3) }
  if let r = result { out(r) } else { fail("geocode failed: \(errText ?? "unknown")", code: 1) }

default:
  fail("unknown command \(command)")
}
