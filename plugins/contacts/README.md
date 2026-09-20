# dsh-contacts

The address book for the DeepSeek Harness. A short prompt section tells the agent how many people are in Contacts.app and whose birthday is close; `contacts_search` turns "text Anna" into the right Anna with her number. When [Aibo](../../README.md) is loaded too, the address book shows up in its Data panel as a searchable list.

Everything comes from the Contacts framework on the Mac through a tiny Swift helper (`helper/ckit.swift`) compiled on first use into `~/.dsh/contacts/bin/ckit`, so every account already synced into Contacts.app (iCloud, Google, Exchange) just works. macOS asks for contacts permission once; the prompt is attributed to the helper itself (`ckit`). If it was declined: System Settings → Privacy & Security → Contacts. Notes and photos are never read.

Requires the Xcode command-line tools (`xcode-select --install`) for the one-time compile.

## Mount

```yaml
- insert:
    - id: dsh-contacts
      name: /path/to/aibo/plugins/contacts/lib/index.js
      config:
        refreshMinutes: 60    # address book cache
```

## What the agent sees

- Section `dsh-contacts`: the number of contacts, birthdays in the next 14 days, and the rule to resolve names with the tool rather than guess, and never to list contacts unprompted.
- Tools: `contacts_search({query})` (name, nickname, email, phone or organization; up to 10 matches with phones, emails, birthday), `contacts_birthdays({days?})`.

The "Visible to the character" switch in the Data panel (kept in the shared aibo store, `~/.dsh/aibo/store.sqlite`, as document `contacts/settings`; an older `~/.dsh/contacts/settings.json` is imported once) hides the prompt section; the tools stay available for explicit lookups. Nothing is ever written to your contacts.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
