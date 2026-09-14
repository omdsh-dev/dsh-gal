// ckit: a tiny Contacts bridge. Prints JSON; takes one command.
//
//   ckit all               every contact (no notes, no images)
//   ckit search <query>    name / nickname / email / phone / organization substring
//   ckit status            authorization state
//
// Built with an embedded Info.plist so the contacts permission prompt can
// name the usage string, as a bare command-line tool otherwise gets denied
// without a word.
import Contacts
import Foundation

// TCC attributes a command-line tool to whatever app launched it (a terminal,
// the desktop app), and denies silently when that app has no contacts usage
// string. So on first entry the tool re-spawns itself as its own responsible
// process, and the prompt names "ckit" with the string embedded above.
@_silgen_name("responsibility_spawnattrs_setdisclaim")
func responsibility_spawnattrs_setdisclaim(_ attrs: UnsafeMutablePointer<posix_spawnattr_t?>, _ disclaim: Int32) -> Int32

func respawnDisclaimed() -> Never {
  var attrs: posix_spawnattr_t? = nil
  posix_spawnattr_init(&attrs)
  _ = responsibility_spawnattrs_setdisclaim(&attrs, 1)
  var argv: [UnsafeMutablePointer<CChar>?] = CommandLine.arguments.map { strdup($0) } + [nil]
  var env = ProcessInfo.processInfo.environment
  env["CKIT_DISCLAIMED"] = "1"
  var envp: [UnsafeMutablePointer<CChar>?] = env.map { strdup("\($0.key)=\($0.value)") } + [nil]
  var pid: pid_t = 0
  let rc = posix_spawn(&pid, CommandLine.arguments[0], nil, &attrs, &argv, &envp)
  posix_spawnattr_destroy(&attrs)
  if rc != 0 { FileHandle.standardError.write("respawn failed: \(rc)\n".data(using: .utf8)!); exit(1) }
  var status: Int32 = 0
  waitpid(pid, &status, 0)
  exit((status & 0x7f) == 0 ? (status >> 8) & 0xff : 1)
}
if ProcessInfo.processInfo.environment["CKIT_DISCLAIMED"] == nil { respawnDisclaimed() }

let store = CNContactStore()

func fail(_ message: String, code: Int32 = 1) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(code)
}
func out(_ value: Any) {
  let data = try! JSONSerialization.data(withJSONObject: value, options: [.sortedKeys])
  FileHandle.standardOutput.write(data)
  FileHandle.standardOutput.write("\n".data(using: .utf8)!)
}

func request() {
  let sem = DispatchSemaphore(value: 0)
  var ok = false
  var err: String? = nil
  store.requestAccess(for: .contacts) { granted, error in ok = granted; err = error?.localizedDescription; sem.signal() }
  sem.wait()
  if !ok { fail("denied:contacts" + (err.map { ":" + $0 } ?? ""), code: 2) }
}

func statusName(_ s: CNAuthorizationStatus) -> String {
  switch s {
  case .notDetermined: return "notDetermined"
  case .restricted: return "restricted"
  case .denied: return "denied"
  case .authorized: return "authorized"
  case .limited: return "limited"
  @unknown default: return "unknown"
  }
}

let keys: [CNKeyDescriptor] = [
  CNContactIdentifierKey as CNKeyDescriptor, CNContactGivenNameKey as CNKeyDescriptor, CNContactFamilyNameKey as CNKeyDescriptor,
  CNContactNicknameKey as CNKeyDescriptor, CNContactOrganizationNameKey as CNKeyDescriptor, CNContactJobTitleKey as CNKeyDescriptor,
  CNContactEmailAddressesKey as CNKeyDescriptor, CNContactPhoneNumbersKey as CNKeyDescriptor, CNContactBirthdayKey as CNKeyDescriptor,
  CNContactFormatter.descriptorForRequiredKeys(for: .fullName),
]

/// Apple stores "no year" as year 1604 (or nil); anything before 1900 is a placeholder.
func birthdayString(_ c: CNContact) -> Any {
  guard let b = c.birthday, let m = b.month, let d = b.day else { return NSNull() }
  let md = String(format: "%02d-%02d", m, d)
  if let y = b.year, y >= 1900 { return String(format: "%04d-", y) + md }
  return md
}

func contactJSON(_ c: CNContact) -> [String: Any] {
  let full = CNContactFormatter.string(from: c, style: .fullName) ?? ""
  let fallback = [c.givenName, c.familyName].filter { !$0.isEmpty }.joined(separator: " ")
  let name = full.isEmpty ? (fallback.isEmpty ? (c.organizationName.isEmpty ? c.nickname : c.organizationName) : fallback) : full
  return [
    "id": c.identifier, "givenName": c.givenName, "familyName": c.familyName, "fullName": name, "nickname": c.nickname,
    "organization": c.organizationName, "jobTitle": c.jobTitle,
    "emails": c.emailAddresses.map { String($0.value) },
    "phones": c.phoneNumbers.map { $0.value.stringValue },
    "birthday": birthdayString(c),
  ]
}

func fetchAll() -> [CNContact] {
  let req = CNContactFetchRequest(keysToFetch: keys)
  req.sortOrder = .givenName
  req.unifyResults = true
  var result: [CNContact] = []
  do { try store.enumerateContacts(with: req) { c, _ in result.append(c) } } catch { fail("fetch failed: " + error.localizedDescription) }
  return result
}

let digits = { (s: String) -> String in s.filter { $0.isNumber } }
func matches(_ c: CNContact, _ q: String, _ qDigits: String) -> Bool {
  let hay = [CNContactFormatter.string(from: c, style: .fullName) ?? "", c.givenName, c.familyName, c.nickname, c.organizationName, c.jobTitle] + c.emailAddresses.map { String($0.value) }
  if hay.contains(where: { $0.localizedCaseInsensitiveContains(q) }) { return true }
  if !qDigits.isEmpty, qDigits.count >= 3, c.phoneNumbers.contains(where: { digits($0.value.stringValue).contains(qDigits) }) { return true }
  return false
}

let args = CommandLine.arguments.dropFirst()
guard let command = args.first else { fail("usage: ckit <all|search|status> …") }
let rest = Array(args.dropFirst())

switch command {
case "status":
  out(["contacts": statusName(CNContactStore.authorizationStatus(for: .contacts))])

case "all":
  request()
  out(fetchAll().map(contactJSON))

case "search":
  let q = rest.joined(separator: " ").trimmingCharacters(in: .whitespaces)
  guard !q.isEmpty else { fail("usage: ckit search <query>") }
  request()
  let qd = digits(q)
  out(fetchAll().filter { matches($0, q, qd) }.map(contactJSON))

default:
  fail("unknown command " + command)
}
