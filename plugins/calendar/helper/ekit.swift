// ekit: a tiny EventKit bridge. Prints JSON; takes one command.
//
//   ekit events <fromISO> <toISO>          events in the window, all calendars
//   ekit calendars                          the calendars themselves
//   ekit reminders [all|open|completed]     reminders (default open)
//   ekit lists                              reminder lists
//   ekit add <title> [dueISO] [list] [notes]   create a reminder
//   ekit complete <id>                      mark a reminder done
//   ekit status                             authorization state
//
// Built with an embedded Info.plist so the calendar/reminders permission
// prompt can name the usage strings, as a bare command-line tool otherwise
// gets denied without a word.
import EventKit
import Foundation

// TCC attributes a command-line tool to whatever app launched it (a terminal,
// the desktop app), and denies silently when that app has no calendar usage
// string. So on first entry the tool re-spawns itself as its own responsible
// process — the same trick Chrome and VS Code helpers use — and the prompt
// names "ekit" with the strings embedded above.
@_silgen_name("responsibility_spawnattrs_setdisclaim")
func responsibility_spawnattrs_setdisclaim(_ attrs: UnsafeMutablePointer<posix_spawnattr_t?>, _ disclaim: Int32) -> Int32

func respawnDisclaimed() -> Never {
  var attrs: posix_spawnattr_t? = nil
  posix_spawnattr_init(&attrs)
  _ = responsibility_spawnattrs_setdisclaim(&attrs, 1)
  var argv: [UnsafeMutablePointer<CChar>?] = CommandLine.arguments.map { strdup($0) } + [nil]
  var env = ProcessInfo.processInfo.environment
  env["EKIT_DISCLAIMED"] = "1"
  var envp: [UnsafeMutablePointer<CChar>?] = env.map { strdup("\($0.key)=\($0.value)") } + [nil]
  var pid: pid_t = 0
  let rc = posix_spawn(&pid, CommandLine.arguments[0], nil, &attrs, &argv, &envp)
  posix_spawnattr_destroy(&attrs)
  if rc != 0 { FileHandle.standardError.write("respawn failed: \(rc)\n".data(using: .utf8)!); exit(1) }
  var status: Int32 = 0
  waitpid(pid, &status, 0)
  exit((status & 0x7f) == 0 ? (status >> 8) & 0xff : 1)
}
if ProcessInfo.processInfo.environment["EKIT_DISCLAIMED"] == nil { respawnDisclaimed() }

let store = EKEventStore()
let iso = ISO8601DateFormatter()
iso.formatOptions = [.withInternetDateTime]
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
func parse(_ s: String) -> Date? { iso.date(from: s) ?? isoLocal.date(from: s) }
func fmt(_ d: Date?) -> Any { d.map { isoLocal.string(from: $0) } ?? NSNull() }

func request(_ type: EKEntityType) {
  let sem = DispatchSemaphore(value: 0)
  var ok = false
  var err: String? = nil
  let done: (Bool, Error?) -> Void = { granted, error in ok = granted; err = error?.localizedDescription; sem.signal() }
  if #available(macOS 14.0, *) {
    if type == .event { store.requestFullAccessToEvents(completion: done) } else { store.requestFullAccessToReminders(completion: done) }
  } else {
    store.requestAccess(to: type, completion: done)
  }
  sem.wait()
  if !ok { fail("denied:" + (type == .event ? "calendars" : "reminders") + (err.map { ":" + $0 } ?? ""), code: 2) }
}

func statusName(_ s: EKAuthorizationStatus) -> String {
  switch s {
  case .notDetermined: return "notDetermined"
  case .restricted: return "restricted"
  case .denied: return "denied"
  case .authorized: return "authorized"
  case .fullAccess: return "fullAccess"
  case .writeOnly: return "writeOnly"
  @unknown default: return "unknown"
  }
}

func calendarJSON(_ c: EKCalendar) -> [String: Any] {
  ["id": c.calendarIdentifier, "title": c.title, "source": c.source?.title ?? "", "color": c.cgColor.map { String(format: "#%02X%02X%02X", Int($0.components![0] * 255), Int($0.components![1] * 255), Int($0.components![2] * 255)) } ?? ""]
}

let args = CommandLine.arguments.dropFirst()
guard let command = args.first else { fail("usage: ekit <events|calendars|reminders|lists|add|complete|status> …") }
let rest = Array(args.dropFirst())

switch command {
case "status":
  out(["calendars": statusName(EKEventStore.authorizationStatus(for: .event)), "reminders": statusName(EKEventStore.authorizationStatus(for: .reminder))])

case "calendars":
  request(.event)
  out(store.calendars(for: .event).map(calendarJSON))

case "events":
  guard rest.count >= 2, let from = parse(rest[0]), let to = parse(rest[1]) else { fail("usage: ekit events <from> <to>") }
  request(.event)
  let predicate = store.predicateForEvents(withStart: from, end: to, calendars: nil)
  let events = store.events(matching: predicate).sorted { $0.startDate < $1.startDate }
  out(events.map { e -> [String: Any] in
    [
      "id": e.eventIdentifier ?? "", "title": e.title ?? "", "start": fmt(e.startDate), "end": fmt(e.endDate), "allDay": e.isAllDay,
      "location": e.location ?? "", "notes": (e.notes ?? "").prefix(400).description, "calendar": e.calendar.title, "calendarId": e.calendar.calendarIdentifier,
      "status": e.status == .canceled ? "canceled" : e.status == .tentative ? "tentative" : "confirmed",
      "attendees": (e.attendees ?? []).count, "url": e.url?.absoluteString ?? "",
    ]
  })

case "lists":
  request(.reminder)
  out(store.calendars(for: .reminder).map(calendarJSON))

case "reminders":
  request(.reminder)
  let mode = rest.first ?? "open"
  let predicate: NSPredicate = mode == "all" ? store.predicateForReminders(in: nil)
    : mode == "completed" ? store.predicateForCompletedReminders(withCompletionDateStarting: Calendar.current.date(byAdding: .day, value: -14, to: Date()), ending: nil, calendars: nil)
    : store.predicateForIncompleteReminders(withDueDateStarting: nil, ending: nil, calendars: nil)
  let sem = DispatchSemaphore(value: 0)
  var result: [EKReminder] = []
  store.fetchReminders(matching: predicate) { result = $0 ?? []; sem.signal() }
  sem.wait()
  out(result.map { r -> [String: Any] in
    let due = r.dueDateComponents.flatMap { Calendar.current.date(from: $0) }
    return [
      "id": r.calendarItemIdentifier, "title": r.title ?? "", "due": fmt(due), "hasTime": r.dueDateComponents?.hour != nil,
      "completed": r.isCompleted, "completedAt": fmt(r.completionDate), "priority": r.priority, "notes": (r.notes ?? "").prefix(400).description,
      "list": r.calendar.title, "listId": r.calendar.calendarIdentifier, "created": fmt(r.creationDate),
    ]
  })

case "add":
  guard let title = rest.first, !title.isEmpty else { fail("usage: ekit add <title> [due] [list] [notes]") }
  request(.reminder)
  let reminder = EKReminder(eventStore: store)
  reminder.title = title
  if rest.count >= 2, !rest[1].isEmpty {
    guard let due = parse(rest[1]) ?? isoLocal.date(from: rest[1] + "T09:00:00") else { fail("bad due date: " + rest[1]) }
    let hasTime = rest[1].contains("T")
    reminder.dueDateComponents = Calendar.current.dateComponents(hasTime ? [.year, .month, .day, .hour, .minute] : [.year, .month, .day], from: due)
    if hasTime { reminder.addAlarm(EKAlarm(absoluteDate: due)) }
  }
  let lists = store.calendars(for: .reminder)
  if rest.count >= 3, !rest[2].isEmpty {
    guard let list = lists.first(where: { $0.title.caseInsensitiveCompare(rest[2]) == .orderedSame }) else { fail("no reminder list named " + rest[2] + " (have: " + lists.map { $0.title }.joined(separator: ", ") + ")") }
    reminder.calendar = list
  } else {
    guard let list = store.defaultCalendarForNewReminders() ?? lists.first else { fail("no reminder list available") }
    reminder.calendar = list
  }
  if rest.count >= 4 { reminder.notes = rest[3] }
  do { try store.save(reminder, commit: true) } catch { fail("save failed: " + error.localizedDescription) }
  out(["id": reminder.calendarItemIdentifier, "title": reminder.title ?? "", "list": reminder.calendar.title, "due": fmt(reminder.dueDateComponents.flatMap { Calendar.current.date(from: $0) })])

case "complete":
  guard let id = rest.first else { fail("usage: ekit complete <id>") }
  request(.reminder)
  guard let reminder = store.calendarItem(withIdentifier: id) as? EKReminder else { fail("no reminder with id " + id) }
  reminder.isCompleted = true
  do { try store.save(reminder, commit: true) } catch { fail("save failed: " + error.localizedDescription) }
  out(["id": id, "completed": true])

default:
  fail("unknown command " + command)
}
