import type { AiboEvent } from './server.js'

/** A small live snapshot, independent of any open chat window. */
export class PetState {
  private state = { activity: 'idle', busy: false, text: '', revision: 0, updatedAt: 0 }
  private failedUntil = 0
  private doneUntil = 0
  private pending = new Set<string>()

  update(event: AiboEvent, now = Date.now()): void {
    const s = this.state
    switch (event.type) {
      case 'session': this.reset(); return
      case 'busy':
        s.busy = event['value'] === true
        if (s.busy) { s.activity = 'reading'; s.text = ''; this.doneUntil = 0; this.failedUntil = 0 }
        else if (!this.pending.size) s.activity = 'idle'
        break
      case 'status':
        s.activity = String(event['activity'] ?? 'reading')
        break
      case 'activity':
        if (event['activity'] === 'failed') this.failedUntil = now + 4000
        else { s.activity = String(event['activity'] ?? 'idle'); if (s.activity === 'done') this.doneUntil = now + 30000 }
        break
      case 'question':
        if (event['answers'] !== undefined || event['cancelled']) this.pending.delete(String(event['id']))
        else if (Array.isArray(event['questions'])) this.pending.add(String(event['id']))
        if (!this.pending.size && s.activity === 'waiting') s.activity = s.busy ? 'reading' : 'idle'
        break
      case 'assistant':
        s.text = String(event['text'] ?? '').replace(/[（(][^）)]*[）)]/g, '').replace(/[#*_`>]/g, '').trim().slice(0, 160)
        break
      default: return
    }
    s.revision += 1
    s.updatedAt = now
  }

  reset(): void {
    this.pending.clear(); this.failedUntil = 0; this.doneUntil = 0
    this.state = { activity: 'idle', busy: false, text: '', revision: this.state.revision + 1, updatedAt: Date.now() }
  }

  snapshot(now = Date.now()): typeof this.state {
    const s = this.state
    const activity = this.pending.size ? 'waiting' : now < this.failedUntil ? 'failed'
      : s.activity === 'done' && now >= this.doneUntil ? 'idle' : s.activity
    return { ...s, activity }
  }
}
