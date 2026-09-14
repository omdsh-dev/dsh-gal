/* One dialog shell for every panel: Radix owns focus, scroll lock and Escape. */
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function Panel({ open, onOpenChange, title, subtitle, wide, children, footer }: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  subtitle?: React.ReactNode
  wide?: boolean
  children: React.ReactNode
  footer?: React.ReactNode
}): React.ReactElement {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="panel-overlay" />
        <Dialog.Content
          className={`panel${wide ? ' wide' : ''}`}
          aria-describedby={undefined}
          onOpenAutoFocus={e => e.preventDefault()}
          onEscapeKeyDown={e => { if ((e as unknown as KeyboardEvent).isComposing) e.preventDefault() }}
        >
          <header className="panel-head">
            <div className="panel-titles">
              <Dialog.Title className="panel-title">{title}</Dialog.Title>
              {subtitle && <p className="panel-subtitle">{subtitle}</p>}
            </div>
            <Dialog.Close className="icon-button" aria-label="Close"><X /></Dialog.Close>
          </header>
          <div className="panel-body">{children}</div>
          {footer && <footer className="panel-foot">{footer}</footer>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Tabs<T extends string>({ value, onChange, items }: { value: T; onChange: (value: T) => void; items: { id: T; label: string }[] }): React.ReactElement {
  return (
    <div className="tabs" role="tablist">
      {items.map(item => (
        <button key={item.id} type="button" role="tab" aria-selected={item.id === value} className={`tab${item.id === value ? ' active' : ''}`} onClick={() => onChange(item.id)}>{item.label}</button>
      ))}
    </div>
  )
}

export function Field({ label, hint, children }: { label: React.ReactNode; hint?: React.ReactNode; children: React.ReactNode }): React.ReactElement {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  )
}
