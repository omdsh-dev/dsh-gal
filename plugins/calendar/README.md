# dsh-calendar

Calendar and Reminders for the DeepSeek Harness. Today's agenda, what is next, and open reminders become prompt sections in any dsh session, with tools to look further ahead and to add or complete reminders. When [dsh-gal](../../README.md) is loaded too, both show up in its Data panel.

Everything comes from EventKit on the Mac through a tiny Swift helper (`helper/ekit.swift`) compiled on first use into `~/.dsh/calendar/bin/ekit`, so every account already synced into Calendar.app and Reminders.app (iCloud, Google, Exchange) just works. macOS asks for calendar and reminders permission once; the prompt is attributed to the app dsh was launched from.

Requires the Xcode command-line tools (`xcode-select --install`) for the one-time compile.

## Mount

```yaml
- insert:
    - id: dsh-calendar
      name: /path/to/dsh-gal/plugins/calendar/lib/index.js
      config:
        refreshMinutes: 5     # agenda cache
        daysAhead: 7
        calendars: []         # titles to include; empty = all
        reminders: true
```

## What the agent sees

- Section `dsh-calendar`: today's events, what is happening now and what is next, tomorrow, and the rest of the week in one line each.
- Section `dsh-calendar.reminders`: overdue, due today, and the next 7 days.
- Tools: `calendar_events({from?, to?})`, `reminders_list({scope?})`, `reminder_add({title, due?, list?, notes?})`, `reminder_complete({id? | title?})`.

Each source has a "Visible to the character" switch in the Data panel, kept in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`, document `calendar/settings`; an older `~/.dsh/calendar/settings.json` is imported once). Events and reminders are never stored — they are read live from EventKit — and only the compiled helper stays in `~/.dsh/calendar/bin`. Nothing is written to your calendars; reminders are only added or completed when asked.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
