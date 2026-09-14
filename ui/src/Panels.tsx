import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {NativeSelect} from '@/components/ui/native-select';
import {Kbd,KbdGroup} from '@/components/ui/kbd';
export const CharacterHub=React.memo(function CharacterHub(){return (<>
<div className="overlay-head">
<span id="character-hub-title" data-layout-text="character">{"角色"}</span>
<Button type="button" className="overlay-close" data-layout-text="close" hidden={true} variant="ghost" data-slot="button">{"关闭 / ESC"}</Button>
</div>
<nav className="character-tabs" aria-label="角色管理">
<Button type="button" id="btn-character-select" data-character-view="char-picker" data-layout-text="choose" variant="ghost" data-slot="button">{"选择角色"}</Button>
<Button type="button" id="btn-gallery" data-character-view="gallery" title="Sprites & loops (⌥G)" variant="ghost" data-slot="button">{"GALLERY"}</Button>
<Button type="button" id="btn-edit" data-character-view="editor" title="Persona (⌥E)" variant="ghost" data-slot="button">{"EDIT"}</Button>
</nav>
<div className="character-display-settings">
<Label className="language-control">
<span data-ui-text="state">{"表情预览"}</span>
<NativeSelect id="character-state-preview" aria-label="state">
<option value="auto">{"跟随对话"}</option>
<option value="idle">{"待机"}</option>
<option value="reading">{"在看"}</option>
<option value="writing">{"在写"}</option>
<option value="searching">{"在查"}</option>
<option value="running">{"在跑命令"}</option>
<option value="waiting">{"等你"}</option>
<option value="failed">{"出错了"}</option>
<option value="done">{"完成"}</option>
</NativeSelect>
</Label>
</div>
<div id="char-picker" className="character-view hidden">
<div id="char-picker-head">{"Character"}</div>
<div id="char-list">
</div>
<div id="char-picker-foot">
<Button type="button" id="btn-import" title="Import a character pack (.zip)" data-ui-text="import" variant="ghost" data-slot="button">{"Import pack…"}</Button>
<Button type="button" id="btn-export" title="Download the current pack as .zip (memory stays local)" data-ui-text="export" variant="ghost" data-slot="button">{"Export pack"}</Button>
<input id="import-file" type="file" accept=".zip,application/zip" hidden={true} />
</div>
</div>
<div id="editor" className="character-view hidden">
<div className="overlay-head">
<span id="editor-title">{"Character"}</span>
<Button type="button" className="overlay-close" data-close="editor" hidden={true} variant="ghost" data-slot="button">{"Close"}</Button>
</div>
<form id="editor-form" className="overlay-body">
<Label>
<span data-ui-text="ed-name">{"名字"}</span>
<Input id="ed-name" type="text" spellCheck={false} />
</Label>
<Label>
<span data-ui-text="ed-greeting">{"开场白"}</span>
<Textarea id="ed-greeting" rows={2}>
</Textarea>
</Label>
<Label>
<span data-ui-text="ed-persona">{"人设"}</span>
<Textarea id="ed-persona" rows={8}>
</Textarea>
</Label>
<div id="ed-art" className="hidden">
<div className="ed-art-head">{"This pack has no images yet. Generate them with any image model and drop six files into "}<code id="ed-art-dir">
</code>{": neutral, happy, thinking, surprised, sad, excited (.png), optionally .mp4 loops with the same names."}</div>
<Label>{"Base image prompt (neutral) "}<Textarea id="ed-art-base" rows={4} readOnly={true}>
</Textarea>
</Label>
<Label>{"Expression deltas (edit the base image with each) "}<Textarea id="ed-art-expr" rows={5} readOnly={true}>
</Textarea>
</Label>
<Label>{"Motion prompt (image-to-video) "}<Textarea id="ed-art-motion" rows={2} readOnly={true}>
</Textarea>
</Label>
</div>
<Label>
<span data-ui-text="ed-rate">{"立绘动画速度"}</span>
<Input id="ed-rate" type="number" min="0.25" max="4" step="0.05" />
</Label>
<Label hidden={true}>{"Voice — VOICEVOX speaker style ("}<span id="ed-voice-state">{"checking…"}</span>{") "}<NativeSelect id="ed-voice">
</NativeSelect>
</Label>
<div className="overlay-actions">
<span id="ed-path" className="dim">
</span>
<Button type="submit" id="ed-save" data-ui-text="save" variant="default" data-slot="button">{"SAVE"}</Button>
</div>
</form>
</div>
<div id="gallery" className="character-view hidden">
<div className="overlay-head">
<span id="gallery-title">{"Gallery"}</span>
<Button type="button" className="overlay-close" data-close="gallery" hidden={true} variant="ghost" data-slot="button">{"Close"}</Button>
</div>
<div id="gallery-grid" className="overlay-body">
</div>
<div id="gallery-hint" className="dim" data-ui-text="galleryHint">{"Click a tile to show that expression on stage. Drop a .png / .mp4 onto a tile, or use its ↑ button, to replace that expression. Files live in the pack directory shown in EDIT."}</div>
<input id="asset-file" type="file" accept=".png,.webp,.jpg,.jpeg,.mp4,.webm,image/png,image/webp,image/jpeg,video/mp4,video/webm" hidden={true} />
</div>
</>);});
export const SpeechPanel=React.memo(function SpeechPanel(){return (<>
<div className="overlay-head">
<span id="speech-title" data-speech-text="title">{"语音设置"}</span>
<Button type="button" className="overlay-close" data-close="speech-panel" data-speech-text="cancel" hidden={true} variant="ghost" data-slot="button">{"关闭 / ESC"}</Button>
</div>
<div className="overlay-body">
<div className="general-settings" data-section="general">
<div className="language-settings">
<Label className="language-control">
<span id="language-label">{"界面语言"}</span>
<NativeSelect id="gal-language" aria-describedby="language-hint">
<option value="auto">{"自动"}</option>
<option value="zh">{"中文"}</option>
<option value="ja">{"日本語"}</option>
<option value="en">{"English"}</option>
</NativeSelect>
</Label>
<Label className="language-control">
<span id="speech-language-label">{"语音语言"}</span>
<NativeSelect id="gal-speech-language" aria-describedby="language-hint">
<option value="auto">{"自动"}</option>
<option value="zh">{"中文"}</option>
<option value="ja">{"日本語"}</option>
<option value="en">{"English"}</option>
</NativeSelect>
</Label>
</div>
<Button type="button" id="btn-voice" title="Voice on/off (V)" variant="ghost" data-slot="button">{"VOICE"}</Button>
</div>
<p className="speech-intro" data-speech-text="choose">
</p>
<form id="speech-form">
<div className="speech-grid">
<Label>
<span data-speech-text="language">
</span>
<NativeSelect id="speech-edit-language">
<option value="zh">{"中文"}</option>
<option value="en">{"English"}</option>
<option value="ja">{"日本語"}</option>
</NativeSelect>
</Label>
<Label>
<span data-speech-text="provider">
</span>
<NativeSelect id="speech-provider">
</NativeSelect>
</Label>
<Label>
<span data-speech-text="model">
</span>
<NativeSelect id="speech-model">
</NativeSelect>
</Label>
<Label>
<span data-speech-text="voice">
</span>
<Input id="speech-voice" required={true} maxLength={160} autoComplete="off" spellCheck={false} />
<NativeSelect id="speech-local-voice" hidden={true} />
<Button id="speech-refresh-voices" type="button" variant="ghost" hidden={true} data-speech-text="refreshVoices" />
<span id="speech-voices-status" role="status" aria-live="polite" />
</Label>
</div>
<p id="speech-description">
</p>
<p id="speech-voice-hint" className="speech-muted" data-speech-text="voiceHint">
</p>
<a id="speech-docs" target="_blank" rel="noopener noreferrer" data-speech-text="docs">
</a>
<div id="speech-key-fields">
<Label>
<span data-speech-text="key">
</span>
<Input id="speech-key" type="password" autoComplete="new-password" maxLength={4096} spellCheck={false} />
</Label>
<p className="speech-muted" data-speech-text="keyHint">
</p>
<Label className="speech-checkbox">
<Input id="speech-clear-key" type="checkbox" className="native-checkbox" />
<span data-speech-text="clear">
</span>
</Label>
</div>
<p className="speech-muted" data-speech-text="discard">
</p>
<div className="speech-actions">
<Button id="speech-test" type="button" data-speech-text="test" variant="ghost" data-slot="button">
</Button>
<Button id="speech-stop" type="button" disabled={true} data-speech-text="stop" variant="ghost" data-slot="button">
</Button>
<Button id="speech-save" type="submit" data-speech-text="save" variant="default" data-slot="button">
</Button>
</div>
</form>
<p id="speech-status" role="status" aria-live="polite">
</p>
</div>
</>);});
export const MemoryPanel=React.memo(function MemoryPanel(){return (<>
<div className="overlay-head">
<span id="memory-title" data-ui-text="memory-title">{"记忆"}</span>
<Button type="button" className="overlay-close" data-close="memory-panel" hidden={true} variant="ghost" data-slot="button">{"关闭 / ESC"}</Button>
</div>
<div className="overlay-body">
<p id="memory-hint" className="dim" data-ui-text="memory-hint">{"这些是关于你的笔记，所有角色共用，换角色也不会丢。"}</p>
<div id="mem-list">
</div>
<p id="mem-empty" className="dim hidden" data-ui-text="memory-empty">{"还没有记住任何事。"}</p>
<form id="memory-add" className="overlay-actions">
<Input id="mem-new" type="text" data-ui-placeholder="memory-add" placeholder="记住一件事…" spellCheck={false} />
<Button type="submit" id="mem-add" data-ui-text="memory-add-button" variant="default" data-slot="button">{"ADD"}</Button>
</form>
</div>
</>);});
export const ArtifactsPanel=React.memo(function ArtifactsPanel(){return (<>
<div className="overlay-head">
<span id="artifacts-title" data-ui-text="artifacts-title">{"手记"}</span>
<Button type="button" className="overlay-close" data-close="artifacts-panel" hidden={true} variant="ghost" data-slot="button">{"关闭 / ESC"}</Button>
</div>
<div id="art-list-view" className="overlay-body">
<p className="dim" data-ui-text="artifacts-hint">{""}</p>
<div id="art-list">
</div>
<p id="art-empty" className="dim hidden" data-ui-text="artifacts-empty">{""}</p>
</div>
<div id="art-view" className="overlay-body hidden">
<div className="art-view-head">
<Button type="button" id="art-back" variant="ghost" data-slot="button" data-ui-text="artifacts-back">{""}</Button>
<div className="art-view-title">
<span id="art-view-name">
</span>
<span id="art-view-desc" className="dim">
</span>
<span id="art-view-path" className="dim">
</span>
</div>
<div className="art-view-actions">
<Button type="button" id="art-reveal" variant="ghost" data-slot="button" data-ui-text="artifacts-reveal">{""}</Button>
<Button type="button" id="art-copy" variant="ghost" data-slot="button" data-ui-text="artifacts-copy">{""}</Button>
<Button type="button" id="art-forget" variant="ghost" data-slot="button" data-ui-text="artifacts-forget">{""}</Button>
</div>
</div>
<span id="art-status" className="dim" role="status" aria-live="polite">
</span>
<div id="art-body">
</div>
</div>
</>);});
export const HelpPanel=React.memo(function HelpPanel(){return (<>
<div className="overlay-head">
<span id="help-title">{"命令与快捷键"}</span>
<Button type="button" className="overlay-close" data-close="help-panel" hidden={true} variant="ghost" data-slot="button">{"关闭 / ESC"}</Button>
</div>
<div className="overlay-body">
<h3 className="help-section" data-ui-text="help-commands">{""}</h3>
<div id="help-list">
</div>
<h3 className="help-section" data-ui-text="help-keys-title">{""}</h3>
<div id="help-shortcuts">
<div className="help-key"><KbdGroup><Kbd>{"Space"}</Kbd><Kbd>{"Enter"}</Kbd></KbdGroup><span data-ui-text="key-advance">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"/"}</Kbd><Kbd>{"、"}</Kbd></KbdGroup><span data-ui-text="key-input">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"Esc"}</Kbd></KbdGroup><span data-ui-text="key-blur">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"L"}</Kbd></KbdGroup><span data-ui-text="key-log">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"M"}</Kbd></KbdGroup><span data-ui-text="key-memory">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"F"}</Kbd></KbdGroup><span data-ui-text="key-artifacts">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"C"}</Kbd></KbdGroup><span data-ui-text="key-char">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"G"}</Kbd></KbdGroup><span data-ui-text="key-gallery">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"E"}</Kbd></KbdGroup><span data-ui-text="key-edit">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"S"}</Kbd></KbdGroup><span data-ui-text="key-settings">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"V"}</Kbd></KbdGroup><span data-ui-text="key-voice">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"R"}</Kbd></KbdGroup><span data-ui-text="key-replay">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"N"}</Kbd></KbdGroup><span data-ui-text="key-new">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"H"}</Kbd></KbdGroup><span data-ui-text="key-hide">{""}</span></div>
<div className="help-key"><KbdGroup><Kbd>{"\u2325"}</Kbd><Kbd>{"/"}</Kbd></KbdGroup><span data-ui-text="key-help">{""}</span></div>
</div>
<p id="help-keys">
</p>
</div>
</>);});
export const History=React.memo(function History(){return (<>
<div id="history-head">
<span data-ui-text="history">{"Backlog"}</span>
<Button id="btn-close-history" data-ui-text="close" hidden={true} variant="ghost" data-slot="button">{"Close"}</Button>
</div>
<div id="history-list">
</div>
</>);});
