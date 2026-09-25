import { ResumeSection } from './ResumeSection'

interface ResumeSummaryProps {
  summary: string
}

export const ResumeSummary = ({ summary }: ResumeSummaryProps) =>
  summary.trim() ? (
    <ResumeSection label="Profile">
      <p className="resume-summary">{summary}</p>
    </ResumeSection>
  ) : null
