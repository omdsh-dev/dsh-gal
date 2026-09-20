# dsh-messages

iMessage and SMS for the DeepSeek Harness. The last week of conversations from Messages.app becomes a short prompt section (who is waiting for a reply, how busy the week was) plus two tools to look at threads, in any dsh session. When [Aibo](../../README.md) is loaded too, it shows up in its Data panel as **Messages**.

Everything is read straight from `~/Library/Messages/chat.db` with the system `sqlite3`, read-only (`?mode=ro`), never copied. Sender handles are resolved to names from the Contacts stores (`~/Library/Application Support/AddressBook/Sources/*/AddressBook-v22.abcddb`) when those are readable, or from a `names` map in the config; otherwise the raw phone number or email is shown.

## Privacy

This is the most private source, so it is **hidden from the character by default**. Turning "Visible to the character" on in the Data panel shares only the number of active conversations and the names of people awaiting a reply with how long they have waited — never message text. The tools can read threads, and their descriptions tell the model to use them only when the user asks about their messages.

## Permissions

macOS only lets apps with **Full Disk Access** read the Messages database. If it is missing, the source shows `error` with the steps: System Settings → Privacy & Security → Full Disk Access → add the app dsh runs in (your terminal, Cetus, or the dsh binary), relaunch it, press Refresh. No prompt is shown by macOS for this permission.

## Mount

```yaml
- insert:
    - id: dsh-messages
      name: /path/to/aibo/plugins/messages/lib/index.js
      config:
        days: 7               # window kept in the cache
        refreshMinutes: 5
        names: {}             # "+8613800000000": "Mum" — used before Contacts
        dbPath: ""            # empty = ~/Library/Messages/chat.db
```

## What the agent sees

- Section `dsh-messages` (order 9565, empty unless shared): `Messages: N conversations active this week; awaiting your reply: Alice (3 h), Bob (2 d).`
- Tools: `messages_recent({days?, chat?})` lists threads with name, last time, awaiting flag and an 80-character snippet; `messages_read({chat, limit?})` returns the recent messages of one thread (sender, time, text).

Threads whose only sender is a short code or alphanumeric id (carriers, banks, OTPs) are never counted as awaiting a reply.

## Storage

The shared switch lives in the shared aibo store (`~/.dsh/aibo/store.sqlite`, document `messages/settings`). An earlier `~/.dsh/messages/settings.json` (or `DSH_MESSAGES_DIR/settings.json`) is imported once on first use and renamed `settings.json.migrated`. Nothing else is written; message data is read live from chat.db, never stored, and the Messages database is never modified.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
