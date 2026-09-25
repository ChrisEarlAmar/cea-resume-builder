import type { ResumeData } from '../../types/resume'
import { CertificationsEditor } from './CertificationsEditor'
import { EducationEditor } from './EducationEditor'
import { ExperienceEditor } from './ExperienceEditor'
import { PersonalInfoForm } from './PersonalInfoForm'
import { ProjectsEditor } from './ProjectsEditor'
import { SkillsEditor } from './SkillsEditor'
import { SummaryForm } from './SummaryForm'

interface ResumeEditorProps {
  data: ResumeData
  onChange: (updater: (current: ResumeData) => ResumeData) => void
}

export const ResumeEditor = ({ data, onChange }: ResumeEditorProps) => (
  <div className="resume-editor">
    <PersonalInfoForm personal={data.personal} onChange={(patch) => onChange((current) => ({ ...current, personal: { ...current.personal, ...patch } }))} />
    <SummaryForm summary={data.summary} onChange={(summary) => onChange((current) => ({ ...current, summary }))} />
    <ExperienceEditor experience={data.experience} onChange={(experience) => onChange((current) => ({ ...current, experience }))} />
    <EducationEditor education={data.education} onChange={(education) => onChange((current) => ({ ...current, education }))} />
    <SkillsEditor skillGroups={data.skillGroups} onChange={(skillGroups) => onChange((current) => ({ ...current, skillGroups }))} />
    <ProjectsEditor projects={data.projects} onChange={(projects) => onChange((current) => ({ ...current, projects }))} />
    <CertificationsEditor certifications={data.certifications} onChange={(certifications) => onChange((current) => ({ ...current, certifications }))} />
  </div>
)
