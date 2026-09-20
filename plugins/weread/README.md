# dsh-weread

WeRead (微信读书) for the DeepSeek Harness. The shelf, what the user is reading and has finished, and every highlight and note become available in any dsh session: a short prompt section plus tools to list the shelf, pull a book's highlights grouped by chapter, and search across them. When [Aibo](../../README.md) is loaded too, it shows up in the Data panel as a shelf of covers you can click through.

WeRead has no public API. Like weread2notion and weread-exporter, this uses the web endpoints (`i.weread.qq.com`) with the cookie of a logged-in browser session, which you paste once in the Data panel. Nothing is written to your WeRead account.

## Mount

```yaml
- insert:
    - id: dsh-weread
      name: /path/to/aibo/plugins/weread/lib/index.js
      config:
        refreshHours: 6     # shelf refresh
        cookie: ''          # optional; usually pasted in the Data panel instead
```

## Setup

1. Open https://weread.qq.com in a desktop browser and log in with the WeChat QR code.
2. DevTools → Network → any request to weread.qq.com → Request Headers → copy the whole `Cookie` value.
3. Data panel → WeRead → Paste cookie.

WeRead logs sessions out after a while (errcode -2012); the source then shows an error with the same steps, paste a fresh cookie.

## Storage

The shelf, the "Visible to the character" switch and the cached highlights (up to 200 per book) live in aibo's shared store (`~/.dsh/aibo/store.sqlite`, documents `weread/settings`, `weread/shelf` and one `weread.highlights/<bookId>` per book); only the cookie stays in `~/.dsh/weread/cookie.json` (`DSH_WEREAD_DIR` overrides the directory) and is never shown back in the UI. An older `state.json` is imported once on first load and renamed `state.json.migrated`.

## What the agent sees

- Section `dsh-weread` (order 9580): book count, up to three books in progress with percentage, up to three recently finished.
- Tools: `weread_shelf({filter?: 'reading'|'finished'|'all'})`, `weread_highlights({book})` (title or bookId, markdown grouped by chapter with the user's notes), `weread_search({query})` over titles, authors and cached highlights.
- Panel actions: Paste cookie, Sync highlights (books with notes, 20 per run, 300 ms between requests), Refresh, Visible to the character.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds Aibo and every plugin
```
