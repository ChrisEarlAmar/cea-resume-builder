import { Braces, ListTree } from 'lucide-react'

export type EditorMode = 'form' | 'json'

interface EditorModeSwitchProps {
  mode: EditorMode
  onChange: (mode: EditorMode) => void
}

export const EditorModeSwitch = ({ mode, onChange }: EditorModeSwitchProps) => (
  <div className="editor-mode-switch" role="group" aria-label="Editor mode">
    <button
      type="button"
      className={`editor-mode-switch__button ${mode === 'form' ? 'editor-mode-switch__button--active' : ''}`}
      aria-pressed={mode === 'form'}
      onClick={() => onChange('form')}
    >
      <ListTree size={14} aria-hidden="true" /> Form
    </button>
    <button
      type="button"
      className={`editor-mode-switch__button ${mode === 'json' ? 'editor-mode-switch__button--active' : ''}`}
      aria-pressed={mode === 'json'}
      onClick={() => onChange('json')}
    >
      <Braces size={14} aria-hidden="true" /> JSON
    </button>
  </div>
)
