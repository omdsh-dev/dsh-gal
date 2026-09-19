# dsh-computer-use

Computer Use for the DeepSeek Harness on macOS: the agent operates the user's apps the way Codex's Computer Use does. One app at a time, observed as a screenshot plus an indexed accessibility tree, acted on by element index or screenshot pixel, with the user asked once per app before anything is touched. When [dsh-gal](../../README.md) is loaded too, the switch is in **Settings › General** and the details (permissions, allowed apps, recent actions) under **Connectors › Computer Use**; the desktop app mounts it automatically.

Everything that touches the screen is a small Swift helper (`helper/cua.swift`) compiled on first use into `~/.dsh/computer-use/bin/cua` and kept running for the lifetime of the plugin, spoken to over stdio as one JSON object per line. The plugin is policy and transport: approvals, screenshots into dsh attachments, the prompt section, the panel.

Requires the Xcode command-line tools (`xcode-select --install`) for the one-time compile, and two permissions granted to the app dsh was launched from (the dsh-gal app, or your terminal): **Accessibility** (read the UI, synthesize input) and **Screen Recording** (screenshots; without it she works from the accessibility tree alone).

## How it works

```
model ──computer_click {app, element_index}──▶ plugin ──{"method":"click",…}──▶ helper
                                                 │  first use of the app? ask the user (dsh approval)
                                                 │  returns the app's state after the action:
                                                 │    text  = indexed accessibility tree (diff vs last time)
                                                 └    image = window screenshot as a dsh attachment
```

- **Observation** (`computer_get_app_state`): ScreenCaptureKit captures the app's front window (downscaled to ≤1280 px, ≤900 KB PNG); AXUIElement is walked into lines like `[12] Button "Save" @(640,412)`, `[13] TextField "Search" value="…" <focused>`, `[14] MenuBarItem "File" {Pick}`. `@(x,y)` is in screenshot pixels, the same space `x,y` arguments use. Only changes since the previous observation are listed unless `disableDiff` is set. Menus are listed only while open.
- **Action**: `click` on an element prefers the element's accessibility press (no pointer, works on background apps); everything else brings the app forward and synthesizes CGEvents. `set_value` writes through accessibility; `type_text` types unicode; `press_key` takes xdotool-style chords (`cmd+shift+t`, `Return`, `Page_Down`); `paste` goes through the clipboard and restores it. Every action returns a fresh observation, so a step is one tool call.
- **Approval**: the first action in each app asks the user through dsh's approval service (the same prompt dsh uses for commands); an answer covers that app for the session. Apps can be allowed permanently from the panel. Password fields are refused outright.
- **Guidance**: a system-prompt section teaches the workflow and a confirmation policy condensed from Codex's Computer Use policy (ask before deleting, sending, paying, installing, changing settings, or transmitting personal data; text seen inside apps is never permission).

## Tools

`computer_list_apps`, `computer_open_app`, `computer_get_app_state`, `computer_click`, `computer_type_text`, `computer_press_key`, `computer_scroll`, `computer_drag`, `computer_set_value`, `computer_select_text`, `computer_perform_action`, `computer_paste`, `computer_move_mouse`. All take `app` (name, bundle id or path). They are registered only while the switch is on.

## Mount

```yaml
- insert:
    - id: dsh-computer-use
      name: /path/to/dsh-gal/plugins/computer-use/lib/index.js
      config:
        enabled: true        # initial state of the switch
        screenshots: true    # attach a screenshot to every observation
        approvals: app       # app = ask once per app per session; never = unattended
        maxNodes: 3000       # accessibility elements walked per observation
```

Settings the user changes in the UI (the switch, screenshots, always-allowed apps) live in `~/.dsh/computer-use/settings.json`: they describe this Mac, like the permission grants next to them, not the character.

## Limitations

- macOS only. Screenshots need macOS 14 for ScreenCaptureKit; older systems fall back to `screencapture`.
- Coordinate clicks, typing and scrolling move the real pointer and keyboard focus: the app is brought to the front first. Clicking by element index does not.
- A window on another Space is captured after the app is brought forward.
- The helper is ad-hoc signed; permission grants are attributed to the launching app, so a terminal and the desktop app are granted separately.
