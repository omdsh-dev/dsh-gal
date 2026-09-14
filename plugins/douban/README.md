# dsh-douban

Your Douban shelves for the DeepSeek Harness: 想看 / 看过 for films, books and music. A short prompt section (counts, latest wishes, latest ratings) tells the character what you have already seen and what you want to see, and two lookup tools let it check before recommending. When [dsh-gal](../../README.md) is loaded too, the shelves show up in its Data panel as a poster grid.

Douban has no personal API, so the plugin reads the profile pages (`movie|book|music.douban.com/people/<uid>/wish|collect`) with a desktop user agent, 500 ms apart, at most 40 pages per shelf, and parses the HTML. Nothing is ever written to Douban.

## Mount

```yaml
- insert:
    - id: dsh-douban
      name: /path/to/dsh-gal/plugins/douban/lib/index.js
      config:
        uid: ahbei          # https://www.douban.com/people/<uid>/ — or set it from the Data panel
        cookie: ""          # optional: your douban.com Cookie header, for a private profile
        refreshHours: 12
```

## Setup

1. The user id is the last part of `https://www.douban.com/people/<uid>/` (avatar → 我的豆瓣). Put it in the config or use "Set user id" in the Data panel.
2. Without a cookie only public shelves are visible: on Douban, 设置 → 隐私设置 must allow others to see your 想看 / 看过. For a private profile paste your browser's Cookie header ("Set cookie" in the panel, or `cookie` in the config).
3. Douban rate-limits anonymous readers (403 or "检测到有异常请求"). The plugin then keeps what it has, backs off for 30 minutes and shows the reason in the panel; a cookie usually avoids it.

## Storage

The uid, the "Visible to the character" switch, the items, counts and last sync live in the shared dsh-gal store (`~/.dsh/gal/store.sqlite`, docs `douban/settings`, `douban/state` and one `douban.items` doc per item). Only the cookie and the `bid` stay in `~/.dsh/douban/secrets.json`; override that directory with `DSH_DOUBAN_DIR`. An older `settings.json` / `state.json` there is imported once on first load and renamed `.migrated`.

## What the agent sees

- Section `dsh-douban`: counts per kind, the 5 latest wishes, the 3 latest finished items with stars, and the rule to check before recommending.
- Tools: `douban_lookup({query})` searches titles across every shelf; `douban_list({kind?, status?, limit?})` lists a shelf newest first.

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
