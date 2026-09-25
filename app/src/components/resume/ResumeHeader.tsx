import type { PersonalDetails } from '../../types/resume'
import { formatUrlLabel, toHttpUrl } from '../../utils/resumeHelpers'

interface ResumeHeaderProps {
  personal: PersonalDetails
}

interface ContactLinkProps {
  value: string
}

const ContactLink = ({ value }: ContactLinkProps) => {
  const href = toHttpUrl(value)
  const label = formatUrlLabel(value)
  if (!href) return <span>{label}</span>
  return <a href={href} target="_blank" rel="noreferrer" aria-label={value}>{label}</a>
}

export const ResumeHeader = ({ personal }: ResumeHeaderProps) => {
  const contactDetails = [personal.email, personal.phone, personal.location].filter(Boolean)
  const links = [personal.linkedin, personal.github, personal.website].filter(Boolean)

  return (
    <header className="resume-header">
      <div className="resume-header__identity">
        {personal.name ? <h1>{personal.name}</h1> : null}
        {personal.title ? <p className="resume-header__title">{personal.title}</p> : null}
        <span className="resume-header__rule" aria-hidden="true" />
      </div>
      {(contactDetails.length > 0 || links.length > 0) ? (
        <address className="resume-header__contact">
          {contactDetails.map((detail) => <span key={detail}>{detail}</span>)}
          {links.map((link) => <ContactLink key={link} value={link} />)}
        </address>
      ) : null}
    </header>
  )
}
