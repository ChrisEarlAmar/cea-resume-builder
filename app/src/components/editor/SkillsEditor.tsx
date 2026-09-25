import { Plus, Trash2 } from 'lucide-react'
import type { SkillGroup } from '../../types/resume'
import { createId, moveItem, removeArrayItem, updateArrayItem } from '../../utils/resumeHelpers'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { ItemControls } from './ItemControls'
import { SectionCard } from './SectionCard'

interface SkillsEditorProps {
  skillGroups: SkillGroup[]
  onChange: (skillGroups: SkillGroup[]) => void
}

const newSkillGroup = (): SkillGroup => ({
  id: createId('skill-group'),
  name: '',
  skills: [''],
})

export const SkillsEditor = ({ skillGroups, onChange }: SkillsEditorProps) => {
  const updateGroup = (id: string, patch: Partial<SkillGroup>) => onChange(updateArrayItem(skillGroups, id, patch))

  const updateSkill = (group: SkillGroup, index: number, value: string) => {
    updateGroup(group.id, { skills: group.skills.map((skill, skillIndex) => (skillIndex === index ? value : skill)) })
  }

  return (
    <SectionCard title="Skills" description="Use categories or leave a category name blank for a simple list." defaultOpen={false}>
      <div className="collection-list">
        {skillGroups.length === 0 ? <p className="empty-state">Create a group to add skills.</p> : null}
        {skillGroups.map((group, index) => (
          <article className="collection-item collection-item--compact" key={group.id}>
            <div className="collection-item__header">
              <span className="collection-item__eyebrow">Skill group {index + 1}</span>
              <ItemControls
                itemName={`skill group ${index + 1}`}
                canMoveUp={index > 0}
                canMoveDown={index < skillGroups.length - 1}
                onMoveUp={() => onChange(moveItem(skillGroups, index, index - 1))}
                onMoveDown={() => onChange(moveItem(skillGroups, index, index + 1))}
                onDelete={() => onChange(removeArrayItem(skillGroups, group.id))}
              />
            </div>
            <Field label="Category" value={group.name} placeholder="e.g. Frontend (optional)" onChange={(event) => updateGroup(group.id, { name: event.target.value })} />
            <div className="nested-editor">
              <div className="nested-editor__header">
                <span className="field__label">Skills</span>
                <Button size="small" variant="ghost" onClick={() => updateGroup(group.id, { skills: [...group.skills, ''] })}>
                  <Plus size={14} aria-hidden="true" /> Add skill
                </Button>
              </div>
              {group.skills.map((skill, skillIndex) => (
                <div className="inline-field-row" key={`${group.id}-skill-${skillIndex}`}>
                  <Field
                    label={`Skill ${skillIndex + 1}`}
                    value={skill}
                    placeholder="e.g. TypeScript"
                    onChange={(event) => updateSkill(group, skillIndex, event.target.value)}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Delete skill ${skillIndex + 1}`}
                    onClick={() => updateGroup(group.id, { skills: group.skills.filter((_, currentIndex) => currentIndex !== skillIndex) })}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <Button className="add-item-button" size="small" variant="secondary" onClick={() => onChange([...skillGroups, newSkillGroup()])}>
        <Plus size={15} aria-hidden="true" /> Add skill group
      </Button>
    </SectionCard>
  )
}
