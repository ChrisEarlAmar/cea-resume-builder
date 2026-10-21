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

const ClassicTemplate = ({ data }: { data: ResumeData }) => (
  <article className="resume-document resume-document--classic" aria-label="Classic resume preview">
    <ResumeHeader personal={data.personal} />
    <ResumeSummary summary={data.summary} />
    <ResumeExperience experience={data.experience} />
    <ResumeEducation education={data.education} />
    <ResumeSkills skillGroups={data.skillGroups} />
    <ResumeProjects projects={data.projects} />
    <ResumeCertifications certifications={data.certifications} />
  </article>
)

const CompactTemplate = ({ data }: { data: ResumeData }) => (
  <article className="resume-document resume-document--compact" aria-label="Compact resume preview">
    <ResumeHeader personal={data.personal} />
    <ResumeSummary summary={data.summary} />
    <ResumeExperience experience={data.experience} />
    <div className="resume-template__compact-details">
      <ResumeSkills skillGroups={data.skillGroups} />
      <ResumeEducation education={data.education} />
    </div>
    <ResumeProjects projects={data.projects} />
    <ResumeCertifications certifications={data.certifications} />
  </article>
)

const SidebarTemplate = ({ data }: { data: ResumeData }) => (
  <article className="resume-document resume-document--sidebar" aria-label="Sidebar resume preview">
    <ResumeHeader personal={data.personal} />
    <div className="resume-template__sidebar-layout">
      <aside className="resume-template__sidebar-aside">
        <ResumeSkills skillGroups={data.skillGroups} />
        <ResumeEducation education={data.education} />
        <ResumeCertifications certifications={data.certifications} />
      </aside>
      <div className="resume-template__sidebar-main">
        <ResumeSummary summary={data.summary} />
        <ResumeExperience experience={data.experience} />
        <ResumeProjects projects={data.projects} />
      </div>
    </div>
  </article>
)

const MinimalTemplate = ({ data }: { data: ResumeData }) => (
  <article className="resume-document resume-document--minimal" aria-label="Minimal resume preview">
    <ResumeHeader personal={data.personal} />
    <ResumeSummary summary={data.summary} />
    <ResumeExperience experience={data.experience} />
    <ResumeProjects projects={data.projects} />
    <ResumeSkills skillGroups={data.skillGroups} />
    <ResumeEducation education={data.education} />
    <ResumeCertifications certifications={data.certifications} />
  </article>
)

export const ResumeTemplate = ({ data, template = 'axis' }: ResumeTemplateProps) => {
  switch (template) {
    case 'classic':
      return <ClassicTemplate data={data} />
    case 'compact':
      return <CompactTemplate data={data} />
    case 'sidebar':
      return <SidebarTemplate data={data} />
    case 'minimal':
      return <MinimalTemplate data={data} />
    case 'axis':
      return <AxisTemplate data={data} />
  }
}
