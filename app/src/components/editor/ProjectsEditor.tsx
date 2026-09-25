import { Plus } from 'lucide-react'
import type { Project } from '../../types/resume'
import { createId, moveItem, removeArrayItem, updateArrayItem } from '../../utils/resumeHelpers'
import { Button } from '../ui/Button'
import { Field, Textarea } from '../ui/Field'
import { ItemControls } from './ItemControls'
import { SectionCard } from './SectionCard'

interface ProjectsEditorProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

const newProject = (): Project => ({
  id: createId('project'),
  name: '',
  description: '',
  technologies: [],
  link: '',
})

export const ProjectsEditor = ({ projects, onChange }: ProjectsEditorProps) => {
  const updateProject = (id: string, patch: Partial<Project>) => onChange(updateArrayItem(projects, id, patch))
  return (
    <SectionCard title="Projects" description="Selected work that shows how you think and build." defaultOpen={false}>
      <div className="collection-list">
        {projects.length === 0 ? <p className="empty-state">No projects yet. Add a project that complements your experience.</p> : null}
        {projects.map((item, index) => (
          <article className="collection-item" key={item.id}>
            <div className="collection-item__header">
              <span className="collection-item__eyebrow">Project {index + 1}</span>
              <ItemControls
                itemName={`project ${index + 1}`}
                canMoveUp={index > 0}
                canMoveDown={index < projects.length - 1}
                onMoveUp={() => onChange(moveItem(projects, index, index - 1))}
                onMoveDown={() => onChange(moveItem(projects, index, index + 1))}
                onDelete={() => onChange(removeArrayItem(projects, item.id))}
              />
            </div>
            <div className="form-grid form-grid--two">
              <Field label="Project name" value={item.name} placeholder="Project name" onChange={(event) => updateProject(item.id, { name: event.target.value })} />
              <Field label="Project link" value={item.link} placeholder="project.example.com" onChange={(event) => updateProject(item.id, { link: event.target.value })} />
            </div>
            <Textarea label="Description" value={item.description} rows={3} placeholder="What it is, why it matters, and what you contributed." onChange={(event) => updateProject(item.id, { description: event.target.value })} />
            <Field
              label="Technologies"
              value={item.technologies.join(', ')}
              placeholder="React, TypeScript, PostgreSQL"
              hint="Separate technologies with commas."
              onChange={(event) => updateProject(item.id, { technologies: event.target.value.split(',').map((technology) => technology.trim()).filter(Boolean) })}
            />
          </article>
        ))}
      </div>
      <Button className="add-item-button" size="small" variant="secondary" onClick={() => onChange([...projects, newProject()])}>
        <Plus size={15} aria-hidden="true" /> Add project
      </Button>
    </SectionCard>
  )
}
