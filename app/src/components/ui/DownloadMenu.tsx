import { ChevronDown, FileDown, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { resumeTemplateOptions } from '../../data/resumeTemplates'
import type { ResumeTemplateId } from '../../types/resume'

interface DownloadMenuProps {
  activeTemplate: ResumeTemplateId
  isGenerating: boolean
  onDownload: (template: ResumeTemplateId) => void
}

export const DownloadMenu = ({ activeTemplate, isGenerating, onDownload }: DownloadMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const download = (template: ResumeTemplateId) => {
    setIsOpen(false)
    onDownload(template)
  }

  return (
    <div className="download-menu">
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="button button--primary button--small"
        disabled={isGenerating}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {isGenerating ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <FileDown size={16} aria-hidden="true" />}
        {isGenerating ? 'Preparing PDF…' : 'Download PDF'}
        {!isGenerating ? <ChevronDown size={14} aria-hidden="true" /> : null}
      </button>
      {isOpen ? (
        <div className="download-menu__panel" role="menu" aria-label="Choose a resume PDF">
          {resumeTemplateOptions.map((template) => (
            <button
              className={`download-menu__item ${template.id === activeTemplate ? 'download-menu__item--active' : ''}`}
              key={template.id}
              onClick={() => download(template.id)}
              role="menuitem"
              type="button"
            >
              <span>{template.label} PDF</span>
              {template.id === activeTemplate ? <small>Previewing</small> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
