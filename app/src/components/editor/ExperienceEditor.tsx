import { Plus, Trash2 } from 'lucide-react'
import type { Experience } from '../../types/resume'
import { createId, moveItem, removeArrayItem, updateArrayItem } from '../../utils/resumeHelpers'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { ItemControls } from './ItemControls'
import { SectionCard } from './SectionCard'

interface ExperienceEditorProps {
  experience: Experience[]
  onChange: (experience: Experience[]) => void
}

const newExperience = (): Experience => ({
  id: createId('experience'),
  company: '',
  position: '',
  location: '',
  startDate: '',
  endDate: '',
  current: false,
  highlights: [''],
})

export const ExperienceEditor = ({ experience, onChange }: ExperienceEditorProps) => {
  const updateExperience = (id: string, patch: Partial<Experience>) =>
    onChange(updateArrayItem(experience, id, patch))

  const updateHighlight = (experienceId: string, index: number, value: string) => {
    const target = experience.find((item) => item.id === experienceId)
    if (!target) return
    const highlights = target.highlights.map((highlight, highlightIndex) =>
      highlightIndex === index ? value : highlight,
    )
    updateExperience(experienceId, { highlights })
  }

  return (
    <SectionCard title="Experience" description="Roles, impact, and accomplishments.">
      <div className="collection-list">
        {experience.length === 0 ? <p className="empty-state">No roles yet. Add your most recent role first.</p> : null}
        {experience.map((item, index) => (
          <article className="collection-item" key={item.id}>
            <div className="collection-item__header">
              <span className="collection-item__eyebrow">Role {index + 1}</span>
              <ItemControls
                itemName={`role ${index + 1}`}
                canMoveUp={index > 0}
                canMoveDown={index < experience.length - 1}
                onMoveUp={() => onChange(moveItem(experience, index, index - 1))}
                onMoveDown={() => onChange(moveItem(experience, index, index + 1))}
                onDelete={() => onChange(removeArrayItem(experience, item.id))}
              />
            </div>
            <div className="form-grid form-grid--two">
              <Field label="Job title" value={item.position} placeholder="Senior Software Engineer" onChange={(event) => updateExperience(item.id, { position: event.target.value })} />
              <Field label="Company" value={item.company} placeholder="Company name" onChange={(event) => updateExperience(item.id, { company: event.target.value })} />
              <Field label="Location" value={item.location} placeholder="City, Country or Remote" onChange={(event) => updateExperience(item.id, { location: event.target.value })} />
              <Field label="Start date" value={item.startDate} placeholder="Jan 2024" onChange={(event) => updateExperience(item.id, { startDate: event.target.value })} />
              <Field label="End date" value={item.endDate} placeholder="Jan 2025" disabled={item.current} onChange={(event) => updateExperience(item.id, { endDate: event.target.value })} />
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(event) => updateExperience(item.id, { current: event.target.checked })}
                />
                <span>Current position</span>
              </label>
            </div>
            <div className="nested-editor">
              <div className="nested-editor__header">
                <span className="field__label">Highlights</span>
                <Button size="small" variant="ghost" onClick={() => updateExperience(item.id, { highlights: [...item.highlights, ''] })}>
                  <Plus size={14} aria-hidden="true" /> Add bullet
                </Button>
              </div>
              {item.highlights.map((highlight, highlightIndex) => (
                <div className="bullet-editor" key={`${item.id}-highlight-${highlightIndex}`}>
                  <span className="bullet-editor__marker" aria-hidden="true">—</span>
                  <label className="sr-only" htmlFor={`${item.id}-highlight-${highlightIndex}`}>Highlight {highlightIndex + 1}</label>
                  <textarea
                    id={`${item.id}-highlight-${highlightIndex}`}
                    className="field__input field__textarea field__textarea--compact"
                    value={highlight}
                    rows={2}
                    placeholder="Describe an outcome, contribution, or responsibility."
                    onChange={(event) => updateHighlight(item.id, highlightIndex, event.target.value)}
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label={`Delete highlight ${highlightIndex + 1}`}
                    onClick={() => updateExperience(item.id, { highlights: item.highlights.filter((_, currentIndex) => currentIndex !== highlightIndex) })}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <Button className="add-item-button" size="small" variant="secondary" onClick={() => onChange([...experience, newExperience()])}>
        <Plus size={15} aria-hidden="true" /> Add experience
      </Button>
    </SectionCard>
  )
}
