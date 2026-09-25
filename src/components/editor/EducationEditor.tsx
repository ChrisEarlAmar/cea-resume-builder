import { Plus } from 'lucide-react'
import type { Education } from '../../types/resume'
import { createId, moveItem, removeArrayItem, updateArrayItem } from '../../utils/resumeHelpers'
import { Button } from '../ui/Button'
import { Field, Textarea } from '../ui/Field'
import { ItemControls } from './ItemControls'
import { SectionCard } from './SectionCard'

interface EducationEditorProps {
  education: Education[]
  onChange: (education: Education[]) => void
}

const newEducation = (): Education => ({
  id: createId('education'),
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: '',
})

export const EducationEditor = ({ education, onChange }: EducationEditorProps) => {
  const updateEducation = (id: string, patch: Partial<Education>) => onChange(updateArrayItem(education, id, patch))
  return (
    <SectionCard title="Education" description="Degrees, coursework, and academic achievements." defaultOpen={false}>
      <div className="collection-list">
        {education.length === 0 ? <p className="empty-state">No education entries yet.</p> : null}
        {education.map((item, index) => (
          <article className="collection-item" key={item.id}>
            <div className="collection-item__header">
              <span className="collection-item__eyebrow">Education {index + 1}</span>
              <ItemControls
                itemName={`education ${index + 1}`}
                canMoveUp={index > 0}
                canMoveDown={index < education.length - 1}
                onMoveUp={() => onChange(moveItem(education, index, index - 1))}
                onMoveDown={() => onChange(moveItem(education, index, index + 1))}
                onDelete={() => onChange(removeArrayItem(education, item.id))}
              />
            </div>
            <div className="form-grid form-grid--two">
              <Field label="Degree" value={item.degree} placeholder="Bachelor of Science" onChange={(event) => updateEducation(item.id, { degree: event.target.value })} />
              <Field label="Field of study" value={item.field} placeholder="Information Technology" onChange={(event) => updateEducation(item.id, { field: event.target.value })} />
              <Field label="Institution" value={item.institution} placeholder="University name" onChange={(event) => updateEducation(item.id, { institution: event.target.value })} />
              <Field label="Start date" value={item.startDate} placeholder="2019" onChange={(event) => updateEducation(item.id, { startDate: event.target.value })} />
              <Field label="End date" value={item.endDate} placeholder="2023" onChange={(event) => updateEducation(item.id, { endDate: event.target.value })} />
            </div>
            <Textarea label="Description" value={item.description} rows={3} placeholder="Honors, activities, relevant coursework, or a concise note." onChange={(event) => updateEducation(item.id, { description: event.target.value })} />
          </article>
        ))}
      </div>
      <Button className="add-item-button" size="small" variant="secondary" onClick={() => onChange([...education, newEducation()])}>
        <Plus size={15} aria-hidden="true" /> Add education
      </Button>
    </SectionCard>
  )
}
