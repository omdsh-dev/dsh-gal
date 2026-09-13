# Galgame UI

React 19 + shadcn/ui (New York, Radix Dialog), Tailwind CSS and Vite. The deep-sea theme keeps the character stage separate from application controls.

## Build and run

From the repository root:

```sh
npm ci --prefix ui
npm run check:ui
npm run build:ui
npm run start:web
```

Desktop and web launchers serve the same compiled `web/ui/app.js` and `web/ui/app.css`. They do not require a separate Vite server. For local editing, `npm --prefix ui run dev` rebuilds these files on change; refresh the existing app to see updates. Compiled assets are checked in so the existing launchers keep working without an install on every launch.

## Ownership

- `src/Stage.tsx`: character stage, message actions, input and global navigation.
- `src/Panels.tsx`: character, artwork, persona, voice/language settings, help and history.
- `src/components/ui`: copied shadcn source, MIT license in `SHADCN-LICENSE.md`. NativeSelect is the native form-control variant styled with the same tokens. Dynamic model controls use the shared Button variant recipe.
- `src/theme.css`: Galgame theme and responsive layouts.
- `src/main.tsx`: persistent panel hosts and the controller adapter. Dialog portals own focus trapping, backdrop dismissal and scroll locking. Panel content stays mounted in React portals and is parked in a hidden container when closed, so existing controller references and form values remain valid.
- Existing `web/app.js`, speech and character controllers still own dialogue, requests and model state. They never rerender the React shell; React does not reconcile controller-managed dialogue text, character lists or media canvases on each turn.

Do not replace a panel host or re-render its uncontrolled values from React state without also migrating its controller. Open/close dialogs through `window.galUi`; preserve the `gal-overlay-closed` event that cancels voice previews.

## Validated

TypeScript and production build pass. Ego Browser checks cover desktop and 390px layouts, modal scrolling, ESC and focus restoration, history focus containment, artwork view, help without speech, UI-language changes, hiding/restoring the scene, and speech-generation cancellation when submitting the next turn (mocked voice/send requests; no cloud key used). Native desktop packaging was not rebuilt for this UI-only change.

## Background

The stage sits on one fixed deep-sea backdrop (`web/assets/undersea.png`), applied in `src/theme.css` on `#scene-background` behind all character media. There is no scene picker: character art is full-frame and carries its own environment, so a separate background choice only fought with it. Full-frame opaque artwork covers the backdrop entirely; transparent artwork shows it through.
