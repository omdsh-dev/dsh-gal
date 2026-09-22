/* Commands and shortcuts. */
import * as React from 'react'
import { Panel } from './Panel'
import { MOD_LABEL } from './lib'

export const COMMANDS: [string, string][] = [
  ['/new', 'Start a fresh session (the old one stays in dsh web)'],
  ['/char [id]', 'Switch character, or open the picker'],
  ['/edit', 'Edit persona and greeting'],
  ['/memory', 'What she remembers about you'],
  ['/files', 'Files she wrote for you'],
  ['/lists', 'Lists she keeps for you'],
  ['/data', 'Connectors: what she can see (calendar, reminders, weather, health)'],
  ['/gallery', 'Browse artwork and loops'],
  ['/voice', 'Toggle voice playback'],
  ['/help', 'This list'],
]
const KEYS: [string[], string][] = [
  [['Enter'], 'Send'],
  [['Shift', 'Enter'], 'New line'],
  [['/', '、'], 'Focus the input'],
  [['Esc'], 'Leave the input / close a panel'],
  [[MOD_LABEL, 'K'], 'Jump to the input'],
  [[MOD_LABEL, 'N'], 'New session'],
  [[MOD_LABEL, ','], 'Settings'],
  [[MOD_LABEL, '/'], 'Help'],
  [['⌥', 'M'], 'Memory'],
  [['⌥', 'F'], 'Files'],
  [['⌥', 'L'], 'Lists'],
  [['⌥', 'D'], 'Connectors'],
  [['⌥', 'C'], 'Character'],
  [['⌥', 'S'], 'Settings'],
  [['⌥', 'V'], 'Voice on / off'],
  [['⌥', 'R'], 'Replay the last line'],
  [['⌥', '/'], 'Help'],
]

export function HelpContent(): React.ReactElement {
  return (
    <>
      <p className="field-hint" style={{ marginBottom: 14 }}>Slash commands go in the message box. {MOD_LABEL} and ⌥ shortcuts work anywhere, even mid-sentence.</p>
      <h3 className="section">Commands</h3>
      <dl className="help-list">
        {COMMANDS.map(([command, text]) => <React.Fragment key={command}><dt><code>{command}</code></dt><dd>{text}</dd></React.Fragment>)}
      </dl>
      <h3 className="section">Keyboard</h3>
      <dl className="help-list">
        {KEYS.map(([keys, text]) => <React.Fragment key={keys.join('+')}><dt>{keys.map(key => <kbd key={key}>{key}</kbd>)}</dt><dd>{text}</dd></React.Fragment>)}
      </dl>
    </>
  )
}

export function HelpPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }): React.ReactElement {
  return <Panel open={open} onOpenChange={onOpenChange} title="Help"><HelpContent /></Panel>
}
