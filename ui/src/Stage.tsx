import * as React from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {NativeSelect} from '@/components/ui/native-select';
export const Stage=React.memo(function Stage(){return (<div id="stage">
<div id="character">
<div id="scene-background" aria-hidden="true"/>
<video id="layer-a" className="char-layer" autoPlay={true} muted={true} loop={true} playsInline={true}>
</video>
<video id="layer-b" className="char-layer" autoPlay={true} muted={true} loop={true} playsInline={true}>
</video>
<img id="layer-img" className="char-layer" alt="" />
<div id="placeholder" className="hidden">
<svg viewBox="0 0 200 260" aria-hidden="true">
<path d="M100 20a52 52 0 1 1 0 104 52 52 0 0 1 0-104zM30 260c0-62 31-100 70-100s70 38 70 100z">
</path>
</svg>
<div id="placeholder-text">{"No art yet — press "}<b>{"E"}</b>{" for the image prompt"}</div>
</div>
</div>
<div id="vignette">
</div>
<header id="topbar">
<div id="title">{"◇ "}{"DSH-GAL "}<span id="conn-dot" title="disconnected">
</span>
</div>
<div className="app-controls">
<Button id="btn-help" type="button" data-ui-text="help" variant="ghost" data-slot="button">{"帮助"}</Button>
<Button type="button" id="btn-char" title="Switch character (C)" variant="ghost" data-slot="button">{"CHAR"}</Button>
<Button type="button" id="btn-memory" title="What I remember about you (M)" variant="ghost" data-slot="button">{"MEMORY"}</Button>
<Button type="button" id="btn-speech-settings" variant="ghost" data-slot="button">{"语音设置"}</Button>
<Button type="button" id="btn-hide" title="Hide window (H / right-click)" variant="ghost" data-slot="button">{"HIDE"}</Button>
</div>
</header>
<div id="ticker" className="hidden">
<span id="ticker-text">
</span>
</div>
<div id="dialogue">
<div id="msgbox">
<div id="nameplate">
<span id="char-name">{"小黑鱼"}</span>
<span id="emotion-tag">
</span>
</div>
<div id="text-window" tabIndex={0}>
<p id="dialogue-text">
</p>
</div>
<div id="message-tools" aria-label="当前消息操作">
<Button type="button" id="btn-skip" hidden={true} variant="ghost" data-slot="button">{"回到最新"}</Button>
<Button type="button" id="btn-replay" disabled={true} variant="ghost" data-slot="button">{"重读本段"}</Button>
<Button type="button" id="btn-stop-voice" disabled={true} variant="ghost" data-slot="button">{"停止朗读"}</Button>
<div id="voice-feedback" role="status" aria-live="polite">
</div>
</div>
<div id="box-bottom">
<form id="input-row" autoComplete="off">
<Input id="input" type="text" placeholder="Say something… (/help for commands)" spellCheck={false} />
<Button id="btn-send" type="submit" variant="default" data-slot="button">{"SEND"}</Button>
</form>
<nav id="menu-row" aria-label="对话与应用控制">
<div className="conversation-controls">
<Button type="button" id="btn-history" title="Backlog (L)" variant="ghost" data-slot="button">{"LOG"}</Button>
</div>
</nav>
<div id="ui-notice" role="status" aria-live="polite">
</div>
<span id="language-hint" className="sr-only">
</span>
</div>
</div>
<div id="last-user" className="hidden">
<span className="you-label">{"You"}</span>
<span id="last-user-text">
</span>
</div>
</div>
<Button id="btn-restore" type="button" data-ui-text="restore" variant="ghost" data-slot="button">{"返回对话"}</Button>
</div>);});
