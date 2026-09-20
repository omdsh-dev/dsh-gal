#!/usr/bin/env node
/**
 * Aibo overhead evaluation.
 *
 * Runs the same small tasks under two plugin configurations and compares
 * wall time and token usage:
 *   baseline — personaEnabled: false (plugin only mirrors)
 *   Aibo      — persona + memory sections on
 *
 * Usage: node scripts/eval.mjs [--dsh <path-to-dsh-bin>] [--character xiaoheiyu]
 *        [--reps 2] [--cwd /tmp/aibo-eval] [--out eval-results.json]
 * Requires: a dsh install with the plugin built (lib/), `zstd` on PATH.
 */

import { execFileSync, spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = Object.fromEntries(process.argv.slice(2).map((a, i, all) => a.startsWith('--') ? [a.slice(2), all[i + 1] ?? ''] : []).filter(Boolean))
const DSH = args.dsh ?? join(homedir(), 'Library/Application Support/aibo/runtime/node_modules/.bin/dsh')
const CHARACTER = args.character ?? 'xiaoheiyu'
const REPS = Number(args.reps ?? 2)
const CWD = args.cwd ?? '/tmp/aibo-eval'
const OUT = args.out ?? join(ROOT, 'eval-results.json')
const PORT = 4877
const BASE = `http://127.0.0.1:${PORT}`

const TASKS = [
  { id: 'list', prompt: '列出当前目录下的文件，并用一句话总结这些文件是什么。' },
  { id: 'names', prompt: '读 notes.txt，告诉我里面一共提到了几个不同的人名，分别是谁。' },
  { id: 'code', prompt: '写一个 fib.py，实现 fibonacci(n)（迭代实现），运行它打印 fibonacci(30) 的结果并告诉我。' },
]

const CONFIGS = {
  baseline: { port: PORT, character: CHARACTER, personaEnabled: false },
  aibo: { port: PORT, character: CHARACTER, personaEnabled: true },
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function waitFor(fn, timeoutMs, everyMs = 500) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const v = await fn().catch(() => undefined)
    if (v) return v
    await sleep(everyMs)
  }
  throw new Error('timeout')
}

function startDsh(configName) {
  const patchDir = mkdtempSync(join(tmpdir(), 'aibo-eval-'))
  const patch = join(patchDir, `${configName}.patch.yml`)
  const cfg = CONFIGS[configName]
  writeFileSync(patch, `- insert:\n    - id: aibo\n      name: ${JSON.stringify(join(ROOT, 'lib/index.js'))}\n      config:\n${Object.entries(cfg).map(([k, v]) => `        ${k}: ${JSON.stringify(v)}`).join('\n')}\n`)
  const child = spawn(DSH, ['--profile', 'web', '--patch', patch, '--no-open', '--port', '0'], { cwd: CWD, stdio: ['ignore', 'pipe', 'pipe'], detached: true })
  let log = ''
  child.stdout.on('data', (d) => { log += d })
  child.stderr.on('data', (d) => { log += d })
  return { child, log: () => log }
}

function stopDsh(handle) {
  try { process.kill(-handle.child.pid, 'SIGTERM') } catch { /* gone */ }
}

/** Subscribe to the plugin's SSE stream; resolves events as they arrive. */
async function openEvents() {
  const res = await fetch(`${BASE}/events`)
  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  const listeners = new Set()
  let buffer = ''
  ;(async () => {
    for (;;) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      let idx
      while ((idx = buffer.indexOf('\n\n')) >= 0) {
        const frame = buffer.slice(0, idx)
        buffer = buffer.slice(idx + 2)
        const line = frame.split('\n').find((l) => l.startsWith('data: '))
        if (!line) continue
        try { const ev = JSON.parse(line.slice(6)); for (const l of listeners) l(ev) } catch { /* ignore */ }
      }
    }
  })()
  return {
    next: (predicate, timeoutMs) => new Promise((resolveEv, reject) => {
      const timer = setTimeout(() => { listeners.delete(l); reject(new Error('event timeout')) }, timeoutMs)
      const l = (ev) => { if (predicate(ev)) { clearTimeout(timer); listeners.delete(l); resolveEv(ev) } }
      listeners.add(l)
    }),
    close: () => reader.cancel().catch(() => {}),
  }
}

function sessionDir(sessionId) {
  const root = join(process.env.DSH_HOME ?? join(homedir(), '.dsh'), 'sessions')
  for (const ws of readdirSync(root)) {
    const dir = join(root, ws, sessionId)
    if (existsSync(dir)) return dir
  }
  throw new Error(`session dir for ${sessionId} not found`)
}

/** Sum usage + timing from the persisted session log. */
function readSessionStats(sessionId) {
  const dir = sessionDir(sessionId)
  const file = readdirSync(dir).find((f) => f.endsWith('.jsonl.zstd') || f.endsWith('.jsonl'))
  const raw = file.endsWith('.zstd') ? execFileSync('zstd', ['-dc', join(dir, file)], { maxBuffer: 1 << 28 }).toString() : readFileSync(join(dir, file), 'utf8')
  const stats = { steps: 0, toolCalls: 0, inputTokens: 0, outputTokens: 0, reasoningTokens: 0, cacheReadTokens: 0, totalTokens: 0, turnMs: 0, reply: '' }
  let turnStart
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    let ev
    try { ev = JSON.parse(line) } catch { continue }
    switch (ev.type) {
      case 'turn/start': turnStart = ev.time; break
      case 'turn/end': if (turnStart) stats.turnMs += ev.time - turnStart; break
      case 'tool/call': stats.toolCalls += 1; break
      case 'assistant/message': {
        const text = (ev.data?.message?.content ?? []).filter((b) => b.type === 'text').map((b) => b.text).join('')
        if (text) stats.reply = text
        break
      }
      default: break
    }
    // usage rides on several event shapes; collect any `usage` object with inputTokens
    // usage rides on assistant/message (one per model step)
    const usage = ev.data?.usage
    if (ev.type === 'assistant/message' && usage && typeof usage.inputTokens === 'number') {
      stats.steps += 1
      stats.inputTokens += usage.inputTokens ?? 0
      stats.outputTokens += usage.outputTokens ?? 0
      stats.reasoningTokens += usage.reasoningTokens ?? 0
      stats.cacheReadTokens += usage.cacheReadTokens ?? 0
      stats.totalTokens += usage.totalTokens ?? 0
    }
  }
  return stats
}

async function runConfig(configName) {
  console.log(`\n=== ${configName} ===`)
  const handle = startDsh(configName)
  try {
    await waitFor(async () => (await fetch(`${BASE}/manifest.json`)).ok, 60_000)
    const events = await openEvents()
    const runs = []
    for (let rep = 0; rep < REPS; rep++) {
      for (const task of TASKS) {
        const sessionEv = events.next((e) => e.type === 'session', 30_000)
        const created = await fetch(`${BASE}/session/new`, { method: 'POST' })
        if (!created.ok) throw new Error(await created.text())
        const { id: sessionId } = await sessionEv
        const t0 = Date.now()
        const reply = events.next((e) => e.type === 'assistant', 240_000)
        const sent = await fetch(`${BASE}/send`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: task.prompt }) })
        if (!sent.ok) throw new Error(await sent.text())
        const assistant = await reply
        const wallMs = Date.now() - t0
        await sleep(1500) // let the session log flush
        const stats = readSessionStats(sessionId)
        const run = { config: configName, task: task.id, rep, sessionId, wallMs, ...stats, replyId: assistant.id }
        runs.push(run)
        console.log(`${task.id}#${rep}: wall ${(wallMs / 1000).toFixed(1)}s (turn ${(stats.turnMs / 1000).toFixed(1)}s) · steps ${stats.steps} · tools ${stats.toolCalls} · in ${stats.inputTokens} (cache ${stats.cacheReadTokens}) · out ${stats.outputTokens} · reasoning ${stats.reasoningTokens}`)
        console.log(`   ↳ ${stats.reply.replace(/\s+/g, ' ').slice(0, 140)}`)
      }
    }
    events.close()
    return runs
  } finally {
    stopDsh(handle)
    await sleep(2000)
  }
}

function summarize(runs) {
  const by = {}
  for (const r of runs) {
    const key = `${r.config}/${r.task}`
    const acc = (by[key] ??= { n: 0, wallMs: 0, turnMs: 0, steps: 0, toolCalls: 0, inputTokens: 0, cacheReadTokens: 0, outputTokens: 0, reasoningTokens: 0 })
    acc.n += 1
    acc.wallMs += r.wallMs; acc.turnMs += r.turnMs; acc.steps += r.steps; acc.toolCalls += r.toolCalls
    acc.inputTokens += r.inputTokens; acc.cacheReadTokens += r.cacheReadTokens; acc.outputTokens += r.outputTokens; acc.reasoningTokens += r.reasoningTokens
  }
  const rows = Object.entries(by).map(([key, a]) => ({
    key, n: a.n,
    wallS: (a.wallMs / a.n / 1000).toFixed(1), turnS: (a.turnMs / a.n / 1000).toFixed(1),
    steps: (a.steps / a.n).toFixed(1), tools: (a.toolCalls / a.n).toFixed(1),
    inTok: Math.round(a.inputTokens / a.n), cacheTok: Math.round(a.cacheReadTokens / a.n), outTok: Math.round(a.outputTokens / a.n), reasonTok: Math.round(a.reasoningTokens / a.n),
  }))
  return rows
}

const all = []
for (const name of Object.keys(CONFIGS)) all.push(...await runConfig(name))
const summary = summarize(all)
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), character: CHARACTER, reps: REPS, tasks: TASKS, runs: all, summary }, null, 2))
console.log('\n=== summary (mean per task) ===')
console.table(summary)
console.log(`written ${OUT}`)
