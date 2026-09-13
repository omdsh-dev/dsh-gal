# 小黑鱼本地 Live2D 预览

运行 `node scripts/live2d-preview.mjs`，打开 http://127.0.0.1:4878/?live2d=1 。
依赖已有 dsh-gal 服务运行在 127.0.0.1:4877。页面/API代理用于本机预览，不替换正式角色包。

model/ 来自 Cubism 5.4 alpha2 中已绑定双眼与嘴巴的测试工程，按 SDK 5.3 导出。仅用于本地评估。
`node scripts/check-live2d-model.mjs` 使用官方 Core 验证导出后的三个参数：0、0.5、1 的图层透明度。已通过。
预览提供眨眼、单眼眨眼、嘴巴开合与循环演示；说话按钮是口型演示；实际朗读另有简单嘴巴开合，尚无音素级同步。
渲染器仅针对当前无蒙版、普通混合的模型，不是通用 Live2D 渲染器。头部、身体、头发和物理尚未绑定。
已在浏览器检查模型、海底背景和交互；重读与停止朗读验证通过。

vendor/live2dcubismcore.min.js 来自官方 https://cubism.live2d.com/sdk-web/core/06/live2dcubismcore.min.js
该文件适用 Live2D 专有许可，不适用本仓库 BSD 许可。正式发布前需单独核对 SDK 和模型发布条件。

## 交互更新

- 对话栏新增重读当前消息、停止朗读；重读可以在静音状态下手动触发。
- 中文、日文、英文选项切换主要界面控件和朗读声音，保存到 localStorage。对白原文不自动翻译。
- 本地预览通过 `/voice/read` 使用 macOS Tingting / Kyoko / Samantha 生成 WAV 并缓存最近 12 段；日文消息已有 VOICEVOX 音频时优先重播该音频。其他环境降级至浏览器语音。
- 朗读时嘴巴做简单开合，不是音素级口型同步。
- 新增海底背景和“停止演示”按钮。
- 已实测三种语言 WAV、页面重读与停止、语言偏好刷新保留；原始模型参数检查仍通过。

两腿之间的原始身体贴图仍有不透明白色残留，尚未修复。生成式编辑返回了尺寸不符、无透明通道的图片，未替换运行时贴图。

## 重影修正（本地预览）

确认 head_base 的自动差分分层残留了手部、裙摆、尾巴及腿部碎片，与 body 层错位叠加。预览片元着色器对该层使用模型坐标 Y >= 0.07 的绘制范围，保留头发并排除下部残片。该阈值仅适用于当前未绑定身体运动的模型；源 PSD / CMO3 / 贴图未修改，重新导出或使用其他播放器仍需清理原分层。浏览器已检查修正后的轮廓，眼睛和嘴巴参数检查通过。

## Common motions (local preview)

Added natural blink, breathing/sway, optional pointer following, nod, shake, tilt, greeting, happy, surprised, sleepy, thinking and small bow. One-shot gestures return to idle. Cycle demo, reset and pause are available; reduced-motion preference disables idle by default. Dialogue emotion events can trigger matching gestures.

Only eye/mouth openness uses native Cubism bindings. Other movement is a small shared model-space deformation in the web renderer, not new Cubism keyforms or motion3/physics3 assets. Expression presets combine the existing eye/mouth artwork and gestures. They do not add new brows, blush or smile shapes. These additions do not travel with the moc3 alone.

Still requires source artwork separation and rigging: independent pupil gaze, eyebrows, perspective head X/Y turns, hand waving, separate hair/accessory/tail physics. The current model has only nine meshes. Source layer cleanup and the opaque leg gap also remain unresolved.

Validation: check-live2d-motions.mjs covers bounds, completion, interruptions, reset, pause and reduced motion. Browser exercised all actions with no WebGL errors and checked tilt, bow, happy, pointer follow, pause and language changes.

Reference: https://docs.live2d.com/en/cubism-editor-manual/standard-parameter-list/

## Leg-gap cutout and separate languages

The local preview now removes the opaque leg-gap region using a UV-space cutout on the body draw only. Bounds follow the inner stocking outlines at atlas rows 295-447, with softened edges. The original atlas, PSD and CMO3 are unchanged; other players still require source cleanup. Earlier statements that the gap remains visible apply to the source asset, not this updated web preview. Browser readback at atlas row 350: left stocking alpha 255, gap alpha 0, right stocking alpha 255.

Interface language uses gal-language; speech language independently uses gal-speech-language. Existing language choice initializes the new speech preference once. UI changes preserve playback; speech changes stop old playback. Dialogue text is not translated. Browser verified English and Chinese synthesis requests independently of UI, live status translation, and independent persistence across reload.

## Procedural body motions withdrawn

The user rejected the squash/lean motions. Removed all synthetic vertex deformation, body gestures, pointer following and emotion presets. Only native eye/mouth opacity bindings remain, with automatic blink and speech mouth movement. Previous common-motion notes describe a withdrawn implementation. Refined head/body motion requires source layer cleanup, deformers and authored keyforms; it is not completed.

## Interaction regression pass

- New messages stop pending/playing speech, cancel old presentation timers and allow follow-ups while the backend is busy (backend follow-up queuing semantics remain unchanged). HTTP submission alone prevents duplicate sends. Failed sends restore the draft. Late voice events cannot restart a stopped line.
- Local macOS synthesis now receives an AbortSignal; disconnecting the request terminates the child process and cleans its temporary directory. Background VOICEVOX synthesis in the upstream plugin is not terminated; its obsolete audio is ignored by the client.
- Editor, gallery, history, character picker and help close with ESC even from editable fields; focus returns to the opener. Tab stays within the open panel; delayed panel loads cannot reopen after ESC.
- /help is a temporary localized panel. Utility notices and errors no longer enter character dialogue or TTS. Opening help stops current voice.
- Fixed automatic paging timer cancellation, leftover typewriter cursor, modifier-key shortcuts and IME Enter handling.

Validated in Ego Browser: all five panels close with ESC; focus restoration/Tab wrapping; ESC during delayed editor load; help preserves dialogue and makes zero speech requests; deliberately delayed synthesis response discarded after interruption; late VOICEVOX event suppressed; failed-send draft restored while busy; narrow help panel has no horizontal overflow. Two real backend turns returned the requested test replies, with playback interrupted before the second send. Node checks verified local synthesis cancellation followed by successful WAV generation. JS syntax and git diff whitespace checks passed.
