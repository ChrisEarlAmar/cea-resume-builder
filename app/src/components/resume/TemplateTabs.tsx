import type { ResumeTemplateId } from '../../types/resume'
import { resumeTemplateOptions } from '../../data/resumeTemplates'

interface TemplateTabsProps {
  value: ResumeTemplateId
  onChange: (template: ResumeTemplateId) => void
}

export const TemplateTabs = ({ value, onChange }: TemplateTabsProps) => (
  <div className="template-tabs" role="tablist" aria-label="Resume templates">
    {resumeTemplateOptions.map((template) => {
      const isSelected = template.id === value
      return (
        <button
          aria-controls="resume-preview"
          aria-selected={isSelected}
          className={`template-tab ${isSelected ? 'template-tab--active' : ''}`}
          id={`template-tab-${template.id}`}
          key={template.id}
          onClick={() => onChange(template.id)}
          role="tab"
          title={template.description}
          type="button"
        >
          {template.label}
        </button>
      )
    })}
  </div>
)
