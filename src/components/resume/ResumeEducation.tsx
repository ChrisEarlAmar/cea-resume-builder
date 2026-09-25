import type { Education } from '../../types/resume'
import { formatDateRange } from '../../utils/resumeHelpers'
import { ResumeSection } from './ResumeSection'

interface ResumeEducationProps {
  education: Education[]
}

const hasContent = (item: Education): boolean => Boolean(
  item.institution.trim() || item.degree.trim() || item.field.trim() || item.description.trim(),
)

export const ResumeEducation = ({ education }: ResumeEducationProps) => {
  const items = education.filter(hasContent)
  if (items.length === 0) return null

  return (
    <ResumeSection label="Education">
      <div className="resume-entries">
        {items.map((item) => {
          const degree = [item.degree, item.field].filter(Boolean).join(', ')
          return (
            <article className="resume-entry resume-entry--education" key={item.id}>
              <p className="resume-entry__rail">{formatDateRange(item.startDate, item.endDate)}</p>
              <div className="resume-entry__body">
                {degree ? <h3>{degree}</h3> : null}
                {item.institution ? <p className="resume-entry__meta">{item.institution}</p> : null}
                {item.description ? <p className="resume-entry__description">{item.description}</p> : null}
              </div>
            </article>
          )
        })}
      </div>
    </ResumeSection>
  )
}
