import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  title: string
  description: string
  confirmLabel: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const Modal = ({
  title,
  description,
  confirmLabel,
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) => {
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    closeButton.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        aria-describedby="reset-description"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal__header">
          <div>
            <p className="eyebrow">Resume Studio</p>
            <h2 id="reset-title">{title}</h2>
          </div>
          <Button ref={closeButton} size="icon" variant="ghost" aria-label="Close dialog" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </Button>
        </div>
        <p id="reset-description" className="modal__description">{description}</p>
        <div className="modal__actions">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </section>
    </div>
  )
}
