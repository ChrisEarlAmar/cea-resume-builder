import type { Experience } from '../../types/resume'
import { formatDateRange } from '../../utils/resumeHelpers'
import { ResumeSection } from './ResumeSection'

interface ResumeExperienceProps {
  experience: Experience[]
}

const hasContent = (item: Experience): boolean => Boolean(
  item.position.trim() || item.company.trim() || item.location.trim() || item.highlights.some((highlight) => highlight.trim()),
)

export const ResumeExperience = ({ experience }: ResumeExperienceProps) => {
  const items = experience.filter(hasContent)
  if (items.length === 0) return null

  return (
    <ResumeSection label="Experience">
      <div className="resume-entries">
        {items.map((item) => {
          const meta = [item.company, item.location].filter(Boolean).join(' / ')
          const highlights = item.highlights.filter((highlight) => highlight.trim())
          return (
            <article className="resume-entry resume-entry--experience" key={item.id}>
              <p className="resume-entry__rail">{formatDateRange(item.startDate, item.endDate, item.current)}</p>
              <div className="resume-entry__body">
                {item.position ? <h3>{item.position}</h3> : null}
                {meta ? <p className="resume-entry__meta">{meta}</p> : null}
                {highlights.length > 0 ? (
                  <ul className="resume-entry__highlights">
                    {highlights.map((highlight, index) => <li key={`${item.id}-${index}`}>{highlight}</li>)}
                  </ul>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </ResumeSection>
  )
}
