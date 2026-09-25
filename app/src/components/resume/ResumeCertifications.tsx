import type { Certification } from '../../types/resume'
import { toHttpUrl } from '../../utils/resumeHelpers'
import { ResumeSection } from './ResumeSection'

interface ResumeCertificationsProps {
  certifications: Certification[]
}

const hasContent = (certification: Certification): boolean => Boolean(
  certification.name.trim() || certification.issuer.trim() || certification.date.trim(),
)

export const ResumeCertifications = ({ certifications }: ResumeCertificationsProps) => {
  const items = certifications.filter(hasContent)
  if (items.length === 0) return null

  return (
    <ResumeSection label="Credentials">
      <div className="resume-entries">
        {items.map((certification) => {
          const url = toHttpUrl(certification.url)
          return (
            <article className="resume-entry resume-entry--certification" key={certification.id}>
              <p className="resume-entry__rail">{certification.date}</p>
              <div className="resume-entry__body">
                {certification.name ? (
                  <h3>
                    {certification.name}
                    {url ? <a className="resume-entry__link" href={url} target="_blank" rel="noreferrer">Verify</a> : null}
                  </h3>
                ) : null}
                {certification.issuer ? <p className="resume-entry__meta">{certification.issuer}</p> : null}
              </div>
            </article>
          )
        })}
      </div>
    </ResumeSection>
  )
}
