# Live2D local evaluation assets

Mao is an official Live2D sample, © Live2D Inc. It is separate from Xiaoheiyu and is not original artwork of this project.

Model source: https://github.com/Live2D/CubismWebSamples/tree/b1de66b0b1f1cb881d95fb6158622aeb6a2827bd/Samples/Resources/Mao

Model conditions: https://www.live2d.com/eula/live2d-sample-model-terms_en.html
General material license: https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html

The model is downloaded for local evaluation and excluded from Git. Its textures and rig were not modified. This is not an unrestricted open-source reskin template. Check applicable terms before distributing models or publishing the app.

Framework source: https://github.com/Live2D/CubismWebFramework/tree/d4da0aa07e47d2c1e4f5fa7ea6047861ea5e5d0b
License: vendor/Framework-LICENSE.md. The Framework and Core are not covered by this application's BSD license.
The existing official Cubism Core 6.0.1 is shared by both renderers.

Rebuild: extract the pinned Framework source to `.local/live2d-framework`, then run:

```
node scripts/build-live2d-framework.mjs
```

Copy Framework `Shaders/` to `web/live2d/vendor/Shaders/` together with its license.

The Mao adapter loads model3, motion3, exp3, physics3 and pose3. State expressions use official expression files. The nod changes the rig's head and body parameters; there is no whole-image squash. Speech currently uses approximate mouth timing, not phoneme recognition.

Xiaoheiyu keeps its existing renderer and runtime cutouts. This step does not rebuild its PSD, meshes, brow rig or whale-tail rig.

The build script applies a guarded scheduling patch to the pinned shader source: blend shader combinations yield to the event loop, and shader fetch errors are surfaced. Upstream source stays unchanged. The Mao adapter waits for shader readiness before drawing, downloads model/motion/expression resources concurrently, decodes textures ahead of upload, and yields between Core operations. The loading status offers a return to character art; inactive initialization pauses at checkpoints and resumes on selection. An initialized model is reused. Core model loading and individual GPU operations remain synchronous.
