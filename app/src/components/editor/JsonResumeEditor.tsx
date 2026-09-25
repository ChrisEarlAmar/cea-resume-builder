import { Braces, Check, RotateCcw, TriangleAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import type { ResumeData } from '../../types/resume'
import { parseResumeDataJson, serializeResumeData } from '../../utils/resumeValidation'
import { Button } from '../ui/Button'

interface JsonResumeEditorProps {
  data: ResumeData
  onChange: (updater: (current: ResumeData) => ResumeData) => void
}

export const JsonResumeEditor = ({ data, onChange }: JsonResumeEditorProps) => {
  const [draft, setDraft] = useState('')
  const [isDirty, setIsDirty] = useState(false)
  const serializedData = useMemo(() => serializeResumeData(data), [data])
  const currentDraft = isDirty ? draft : serializedData
  const result = useMemo(() => parseResumeDataJson(currentDraft), [currentDraft])

  const formatDraft = () => {
    if (!result.ok) return
    setDraft(serializeResumeData(result.data))
    setIsDirty(false)
  }

  const restoreCurrentData = () => {
    setIsDirty(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      formatDraft()
    }
  }

  const statusId = 'resume-json-status'
  const statusIsError = !result.ok && isDirty

  return (
    <section className="json-editor" aria-labelledby="json-editor-title">
      <div className="json-editor__header">
        <div>
          <p className="eyebrow"><Braces size={13} aria-hidden="true" /> Structured data</p>
          <h2 id="json-editor-title">resume.json</h2>
          <p>Edit the complete resume as JSON. Valid changes update the same live preview and form data immediately.</p>
        </div>
        <span className={`json-editor__state ${result.ok ? 'json-editor__state--valid' : 'json-editor__state--invalid'}`}>
          {result.ok ? <Check size={14} aria-hidden="true" /> : <TriangleAlert size={14} aria-hidden="true" />}
          {result.ok ? 'Valid' : 'Fix JSON'}
        </span>
      </div>

      <div className="json-editor__code-shell">
        <div className="json-editor__tab" aria-hidden="true"><Braces size={13} /> resume.json</div>
        <label className="sr-only" htmlFor="resume-json-input">Resume JSON</label>
        <textarea
          id="resume-json-input"
          className="json-editor__input"
          value={currentDraft}
          spellCheck={false}
          aria-invalid={statusIsError}
          aria-describedby={statusId}
          onChange={(event) => {
            const nextDraft = event.target.value
            const nextResult = parseResumeDataJson(nextDraft)
            setDraft(nextDraft)
            setIsDirty(true)
            if (nextResult.ok) onChange(() => nextResult.data)
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="json-editor__footer">
        <p id={statusId} className={`json-editor__message ${statusIsError ? 'json-editor__message--error' : ''}`} role={statusIsError ? 'alert' : 'status'}>
          {statusIsError ? result.message : 'Valid JSON updates the preview immediately. Use Ctrl/Cmd + Enter to format it.'}
        </p>
        <div className="json-editor__actions">
          <Button variant="ghost" size="small" onClick={restoreCurrentData} disabled={!isDirty}>
            <RotateCcw size={14} aria-hidden="true" /> Revert draft
          </Button>
          <Button variant="primary" size="small" onClick={formatDraft} disabled={!result.ok}>
            <Check size={14} aria-hidden="true" /> Format JSON
          </Button>
        </div>
      </div>
    </section>
  )
}
