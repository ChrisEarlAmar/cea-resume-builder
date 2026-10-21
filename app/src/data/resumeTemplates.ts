import type { ResumeTemplateId } from '../types/resume'

export interface ResumeTemplateOption {
  id: ResumeTemplateId
  label: string
  description: string
}

export const resumeTemplateOptions: ResumeTemplateOption[] = [
  {
    id: 'axis',
    label: 'Axis',
    description: 'Editorial date rail with a balanced one-page rhythm.',
  },
  {
    id: 'classic',
    label: 'Classic',
    description: 'A conventional single-column format for conservative applications.',
  },
  {
    id: 'compact',
    label: 'Compact',
    description: 'A denser format for technical detail and longer work history.',
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    description: 'Skills and education sit beside the experience narrative.',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    description: 'A quieter, centered header with simple single-column reading.',
  },
]

export const getResumeTemplateOption = (template: ResumeTemplateId): ResumeTemplateOption =>
  resumeTemplateOptions.find((option) => option.id === template) ?? resumeTemplateOptions[0]
