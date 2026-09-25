import type { SkillGroup } from '../../types/resume'
import { ResumeSection } from './ResumeSection'

interface ResumeSkillsProps {
  skillGroups: SkillGroup[]
}

export const ResumeSkills = ({ skillGroups }: ResumeSkillsProps) => {
  const groups = skillGroups
    .map((group) => ({ ...group, skills: group.skills.filter((skill) => skill.trim()) }))
    .filter((group) => group.skills.length > 0)
  if (groups.length === 0) return null

  return (
    <ResumeSection label="Capabilities">
      <div className="resume-skills">
        {groups.map((group) => (
          <div className="resume-skills__group" key={group.id}>
            {group.name ? <h3>{group.name}</h3> : null}
            <p>{group.skills.join(', ')}</p>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}
