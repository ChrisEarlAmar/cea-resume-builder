import { useId } from 'react'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export const Field = ({ label, hint, id, className = '', ...props }: FieldProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <label className={`field ${className}`.trim()} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <input id={inputId} className="field__input" {...props} />
      {hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string
}

export const Textarea = ({ label, hint, id, className = '', ...props }: TextareaProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  return (
    <label className={`field ${className}`.trim()} htmlFor={inputId}>
      <span className="field__label">{label}</span>
      <textarea id={inputId} className="field__input field__textarea" {...props} />
      {hint ? <span className="field__hint">{hint}</span> : null}
    </label>
  )
}
