import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  description: string
  children: ReactNode
  defaultOpen?: boolean
}

export const SectionCard = ({ title, description, children, defaultOpen = true }: SectionCardProps) => (
  <details className="editor-section" open={defaultOpen}>
    <summary className="editor-section__summary">
      <span>
        <span className="editor-section__title">{title}</span>
        <span className="editor-section__description">{description}</span>
      </span>
      <span className="editor-section__chevron" aria-hidden="true" />
    </summary>
    <div className="editor-section__body">{children}</div>
  </details>
)
