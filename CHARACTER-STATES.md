# Character presentation and state

The toolbar now has a **角色展示** selector and a state-preview selector. Choose **角色立绘** for the current character pack's images/videos, or **小黑鱼 Live2D** for the bundled prototype. Display choice is remembered in this browser; changing character packs switches back to that pack's art. State previews are temporary: choose **跟随对话** to resume automatic behavior.

`web/character-state.js` owns semantic state independently of rendering:

- Emotion: neutral, thinking, happy, sad, surprised, excited.
- Activity: idle, thinking, speaking. Busy temporarily displays thinking without replacing the previous emotion; voice adds speaking without discarding emotion.
- Inputs: gal-emotion, gal-busy, gal-speaking, gal-character-changed.
- Output: gal-character-state. Consumers can read `window.galCharacter.state` when they initialize late.

The existing sprite renderer consumes this state and picks the pack's emotion image/video, falling back to its default asset. The Live2D renderer consumes the same state and applies native parameter presets with interpolation. Hidden sprite videos pause in Live2D mode; switching back restores them. Live2D loads on first use and skips model rendering when hidden. Loading errors fall back to character art.

## Prototype limitations

The current Live2D loader is still specifically for the bundled Xiaoheiyu prototype. This is not a generic third-party model importer or a new character-pack Live2D schema. The present runtime supports normal-blend, unmasked meshes; model-specific artwork cleanup shaders remain in place.

`web/live2d/expressions.mjs` detects actual parameter effects by comparing model geometry and opacities at parameter endpoints. Parameter names alone are not enough: the model lists many unbound default parameters. Tests confirm only ParamEyeLOpen, ParamEyeROpen and ParamMouthOpenY affect the current model.

Consequently, this model has basic eye/mouth feedback for state transitions, a small open-mouth surprised pose and speaking/idle behavior. A wink is not a fully rigged happy face; a slow blink is not a properly drawn sad face. Rich presets for smile, cheeks, eyebrows and head angles are gated by real bindings, so unbound parameters are not advertised as working. No whole-body scaling or flattening was added.

To achieve polished expressions, the Cubism source needs genuine brow shape/angle, eye-smile, mouth-form and head-turn keyforms, plus appropriate hair/body physics. The runtime state mapping can then use those bindings; this change does not create the missing artwork or rigging.

Validation: `node scripts/check-character-states.mjs` checks the real model bindings, missing-parameter protection, all six emotion presets and resetting to neutral. Ego Browser checked both presentation modes, happy sprite selection, Live2D surprised mouth, busy→emotion restoration and simultaneous happy+speaking state.

## 2026-09-13: official Mao evaluation adapter

The character hub now selects Xiaoheiyu or Mao independently of the sprite/Live2D rendering mode. The selection persists across reloads. Mao uses the official Cubism Web Framework (bundled locally), including clipping masks, authored motion and expression files, pose, and physics. Existing Xiaoheiyu keeps its original limited renderer.

Mao has eight supplied motions and eight supplied expression files. Dialogue states map neutral/thinking to exp_01, happy to exp_02, sad to exp_05, surprised to exp_07, excited to exp_04. Thinking additionally offsets native head tilt and gaze parameters. Nod is a short custom curve on the existing head/neck rig, with a small body response. Voice still uses approximate opening timing rather than phoneme alignment.

Browser validation: 37 masked meshes render; happy smile=1, sad brow=-1, surprised eye form=-1; neutral restores these values. Nod traverses upward anticipation, downward angle near -12, and zero. Switching adapters hides the inactive canvas immediately. No Xiaoheiyu artwork or rig was rebuilt.

Source and licensing: `web/live2d/THIRD-PARTY.md`. Mao is an official sample, not an unrestricted original asset of this project.
