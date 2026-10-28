import type { ReactNode } from 'react'
import type { Certification, Education, Experience, Project, ResumeData, SkillGroup } from '../../types/resume'
import { formatDateRange, formatUrlLabel, toHttpUrl } from '../../utils/resumeHelpers'

interface AtsResumeTemplateProps {
  data: ResumeData
}

const hasExperienceContent = (item: Experience): boolean => Boolean(
  item.position.trim() || item.company.trim() || item.location.trim() || item.highlights.some((highlight) => highlight.trim()),
)

const hasEducationContent = (item: Education): boolean => Boolean(
  item.institution.trim() || item.degree.trim() || item.field.trim() || item.description.trim(),
)

const hasProjectContent = (item: Project): boolean => Boolean(
  item.name.trim() || item.description.trim() || item.technologies.some((technology) => technology.trim()),
)

const hasCertificationContent = (item: Certification): boolean => Boolean(
  item.name.trim() || item.issuer.trim() || item.date.trim(),
)

const AtsLink = ({ value }: { value: string }) => {
  const href = toHttpUrl(value)
  const label = formatUrlLabel(value)
  return href ? <a href={href} target="_blank" rel="noreferrer">{label}</a> : <span>{label}</span>
}

const AtsSection = ({ title, children }: { title: string, children: ReactNode }) => (
  <section className="resume-ats__section">
    <h2>{title}</h2>
    {children}
  </section>
)

const AtsExperience = ({ items }: { items: Experience[] }) => {
  const experience = items.filter(hasExperienceContent)
  if (experience.length === 0) return null

  return (
    <AtsSection title="Experience">
      {experience.map((item) => {
        const meta = [item.company, item.location, formatDateRange(item.startDate, item.endDate, item.current)].filter(Boolean)
        const highlights = item.highlights.filter((highlight) => highlight.trim())
        return (
          <article className="resume-ats__entry" key={item.id}>
            {item.position ? <h3>{item.position}</h3> : null}
            {meta.length > 0 ? <p className="resume-ats__meta">{meta.join(' | ')}</p> : null}
            {highlights.length > 0 ? (
              <ul>{highlights.map((highlight, index) => <li key={`${item.id}-${index}`}>{highlight}</li>)}</ul>
            ) : null}
          </article>
        )
      })}
    </AtsSection>
  )
}

const AtsEducation = ({ items }: { items: Education[] }) => {
  const education = items.filter(hasEducationContent)
  if (education.length === 0) return null

  return (
    <AtsSection title="Education">
      {education.map((item) => {
        const degree = [item.degree, item.field].filter(Boolean).join(', ')
        const meta = [item.institution, formatDateRange(item.startDate, item.endDate)].filter(Boolean)
        return (
          <article className="resume-ats__entry" key={item.id}>
            {degree ? <h3>{degree}</h3> : null}
            {meta.length > 0 ? <p className="resume-ats__meta">{meta.join(' | ')}</p> : null}
            {item.description ? <p>{item.description}</p> : null}
          </article>
        )
      })}
    </AtsSection>
  )
}

const AtsSkills = ({ groups }: { groups: SkillGroup[] }) => {
  const populatedGroups = groups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (populatedGroups.length === 0) return null

  return (
    <AtsSection title="Skills">
      <div className="resume-ats__skills">
        {populatedGroups.map((group) => (
          <p key={group.id}>
            {group.name ? <strong>{group.name}: </strong> : null}
            {group.skills.join(', ')}
          </p>
        ))}
      </div>
    </AtsSection>
  )
}

const AtsProjects = ({ items }: { items: Project[] }) => {
  const projects = items.filter(hasProjectContent)
  if (projects.length === 0) return null

  return (
    <AtsSection title="Projects">
      {projects.map((project) => {
        const technologies = project.technologies.filter((technology) => technology.trim())
        return (
          <article className="resume-ats__entry" key={project.id}>
            {project.name ? <h3>{project.name}</h3> : null}
            {project.link.trim() ? <p className="resume-ats__project-link"><AtsLink value={project.link} /></p> : null}
            {project.description ? <p>{project.description}</p> : null}
            {technologies.length > 0 ? <p><strong>Technologies: </strong>{technologies.join(', ')}</p> : null}
          </article>
        )
      })}
    </AtsSection>
  )
}

const AtsCertifications = ({ items }: { items: Certification[] }) => {
  const certifications = items.filter(hasCertificationContent)
  if (certifications.length === 0) return null

  return (
    <AtsSection title="Certifications">
      {certifications.map((item) => {
        const meta = [item.issuer, item.date].filter(Boolean)
        return (
          <article className="resume-ats__entry" key={item.id}>
            {item.name ? <h3>{item.name}</h3> : null}
            {meta.length > 0 ? <p className="resume-ats__meta">{meta.join(' | ')}</p> : null}
            {item.url.trim() ? <p><AtsLink value={item.url} /></p> : null}
          </article>
        )
      })}
    </AtsSection>
  )
}

export const AtsResumeTemplate = ({ data }: AtsResumeTemplateProps) => {
  const contactDetails = [data.personal.email, data.personal.phone, data.personal.location].filter(Boolean)
  const links = [data.personal.linkedin, data.personal.github, data.personal.website].filter(Boolean)

  return (
    <article className="resume-document resume-document--ats" aria-label="ATS-friendly resume preview">
      <header className="resume-ats__header">
        {data.personal.name ? <h1>{data.personal.name}</h1> : null}
        {data.personal.title ? <p className="resume-ats__title">{data.personal.title}</p> : null}
        {contactDetails.length > 0 ? <p>{contactDetails.join(' | ')}</p> : null}
        {links.length > 0 ? (
          <p className="resume-ats__links">
            {links.map((link, index) => <span key={link}>{index > 0 ? ' | ' : null}<AtsLink value={link} /></span>)}
          </p>
        ) : null}
      </header>

      {data.summary.trim() ? <AtsSection title="Professional Summary"><p>{data.summary}</p></AtsSection> : null}
      <AtsExperience items={data.experience} />
      <AtsEducation items={data.education} />
      <AtsSkills groups={data.skillGroups} />
      <AtsProjects items={data.projects} />
      <AtsCertifications items={data.certifications} />
    </article>
  )
}
