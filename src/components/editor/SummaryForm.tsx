import { Textarea } from '../ui/Field'
import { SectionCard } from './SectionCard'

interface SummaryFormProps {
  summary: string
  onChange: (summary: string) => void
}

export const SummaryForm = ({ summary, onChange }: SummaryFormProps) => (
  <SectionCard title="Professional summary" description="A concise introduction in your own voice.">
    <Textarea
      label="Summary"
      value={summary}
      rows={5}
      placeholder="Describe the work you do and the impact you create."
      onChange={(event) => onChange(event.target.value)}
    />
  </SectionCard>
)
