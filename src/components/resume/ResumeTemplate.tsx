import type { ResumeData, ResumeTemplateId } from '../../types/resume'
import { ResumeCertifications } from './ResumeCertifications'
import { ResumeEducation } from './ResumeEducation'
import { ResumeExperience } from './ResumeExperience'
import { ResumeHeader } from './ResumeHeader'
import { ResumeProjects } from './ResumeProjects'
import { ResumeSkills } from './ResumeSkills'
import { ResumeSummary } from './ResumeSummary'

interface ResumeTemplateProps {
  data: ResumeData
  template?: ResumeTemplateId
}

const AxisTemplate = ({ data }: { data: ResumeData }) => (
  <article className="resume-document resume-document--axis" aria-label="Resume preview">
    <ResumeHeader personal={data.personal} />
    <ResumeSummary summary={data.summary} />
    <ResumeExperience experience={data.experience} />
    <ResumeEducation education={data.education} />
    <ResumeSkills skillGroups={data.skillGroups} />
    <ResumeProjects projects={data.projects} />
    <ResumeCertifications certifications={data.certifications} />
  </article>
)

export const ResumeTemplate = ({ data, template = 'axis' }: ResumeTemplateProps) => {
  switch (template) {
    case 'axis':
      return <AxisTemplate data={data} />
  }
}
