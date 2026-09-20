# dsh-gmail

Gmail for the DeepSeek Harness, over IMAP with a [Google app password](https://myaccount.google.com/apppasswords): no Cloud project, no OAuth client. The address and the app password are pasted once in the Connectors panel (or set in the plugin config) and stay in `~/.dsh/gmail/credentials.json`; the connection is TLS to `imap.gmail.com` and read-only (bodies are fetched with PEEK, so nothing is marked read).

Every `refreshMinutes` the plugin counts unread inbox mail and pulls the headers of the last week's inbox and of travel-looking mail from the last six months (itineraries, e-tickets, hotel and flight confirmations, the usual booking senders) into the shared store (`~/.dsh/aibo/store.sqlite`, documents `gmail/settings` and `gmail/index`). The prompt carries a short digest and tells the character to keep a trip's bookings on a list, to track a flight it finds with [dsh-flights](../flights) and to follow the destination's weather with [dsh-weather](../weather). `gmail_search` takes Gmail's own search syntax (`from:`, `subject:`, `newer_than:30d`, `has:attachment`, Chinese works too); `gmail_read` returns one message as text.

Google Workspace accounts need app passwords allowed by the admin; personal accounts need 2-Step Verification on.

## Mount

```yaml
- insert:
    - id: dsh-gmail
      name: /path/to/aibo/plugins/gmail/lib/index.js
      config:
        user: ""              # or paste both in the panel
        password: ""
        refreshMinutes: 30
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
