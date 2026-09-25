import type { Project } from '../../types/resume'
import { toHttpUrl } from '../../utils/resumeHelpers'
import { ResumeSection } from './ResumeSection'

interface ResumeProjectsProps {
  projects: Project[]
}

const hasContent = (project: Project): boolean => Boolean(
  project.name.trim() || project.description.trim() || project.technologies.some((technology) => technology.trim()),
)

export const ResumeProjects = ({ projects }: ResumeProjectsProps) => {
  const items = projects.filter(hasContent)
  if (items.length === 0) return null

  return (
    <ResumeSection label="Selected work">
      <div className="resume-entries">
        {items.map((project, index) => {
          const url = toHttpUrl(project.url)
          const technologies = project.technologies.filter((technology) => technology.trim())
          return (
            <article className="resume-entry resume-entry--project" key={project.id}>
              <p className="resume-entry__rail">{String(index + 1).padStart(2, '0')}</p>
              <div className="resume-entry__body">
                {project.name ? (
                  <h3>
                    {project.name}
                    {url ? <a className="resume-entry__link" href={url} target="_blank" rel="noreferrer">View project</a> : null}
                  </h3>
                ) : null}
                {project.description ? <p className="resume-entry__description">{project.description}</p> : null}
                {technologies.length > 0 ? <p className="resume-entry__stack"><strong>Stack</strong> {technologies.join(', ')}</p> : null}
              </div>
            </article>
          )
        })}
      </div>
    </ResumeSection>
  )
}
