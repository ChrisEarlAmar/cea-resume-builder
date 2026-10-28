import type { ResumeData } from '../../types/resume'
import { AtsResumeTemplate } from './AtsResumeTemplate'

interface ResumeTemplateProps {
  data: ResumeData
}

export const ResumeTemplate = ({ data }: ResumeTemplateProps) => <AtsResumeTemplate data={data} />
