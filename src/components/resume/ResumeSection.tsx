import type { ReactNode } from 'react'

interface ResumeSectionProps {
  label: string
  children: ReactNode
  className?: string
}

export const ResumeSection = ({ label, children, className = '' }: ResumeSectionProps) => (
  <section className={`resume-section ${className}`.trim()}>
    <h2 className="resume-section__label">{label}</h2>
    <div className="resume-section__content">{children}</div>
  </section>
)
