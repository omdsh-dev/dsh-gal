# dsh-images

Pictures for the DeepSeek Harness. `image_search` finds candidates, `image_show` downloads the chosen one into the shared store (`~/.dsh/gal/store` blobs, `images/`) and, when [dsh-gal](../../README.md) is loaded, presents it in the room as an image card and returns the line to embed in the reply. Remote image URLs are never pasted into replies: they break on referer checks and rot.

Two sources. Without a key, [Wikimedia Commons](https://commons.wikimedia.org) (open-licensed; good for places, landmarks, nature, animals and art; thin for products, people and news). With a [Brave Search API](https://brave.com/search/api) key, pasted once in the Connectors panel or set in the config, Brave's image endpoint over the whole web; the key stays in `~/.dsh/images/key.json`. Recent searches and shown pictures live in the store (`images/settings`, `images/recent`).

## Mount

```yaml
- insert:
    - id: dsh-images
      name: /path/to/dsh-gal/plugins/images/lib/index.js
      config:
        braveKey: ""          # optional; or paste it in the panel
        safesearch: strict
```

## Build

```bash
DSH_PKG_ROOT=/path/to/dsh/node_modules ../../scripts/build.sh   # builds dsh-gal and every plugin
```
