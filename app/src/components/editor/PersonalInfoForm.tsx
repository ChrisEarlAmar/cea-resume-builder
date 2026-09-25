import type { PersonalDetails } from '../../types/resume'
import { Field } from '../ui/Field'
import { SectionCard } from './SectionCard'

interface PersonalInfoFormProps {
  personal: PersonalDetails
  onChange: (patch: Partial<PersonalDetails>) => void
}

export const PersonalInfoForm = ({ personal, onChange }: PersonalInfoFormProps) => {
  const updateField = (key: keyof PersonalDetails, value: string) => onChange({ [key]: value })

  return (
    <SectionCard title="Personal details" description="The essentials at the top of your resume.">
      <div className="form-grid form-grid--two">
        <Field label="Full name" value={personal.name} placeholder="e.g. Your full name" onChange={(event) => updateField('name', event.target.value)} />
        <Field label="Professional title" value={personal.title} placeholder="e.g. Software Engineer" onChange={(event) => updateField('title', event.target.value)} />
        <Field label="Email" type="email" value={personal.email} placeholder="you@example.com" onChange={(event) => updateField('email', event.target.value)} />
        <Field label="Phone" type="tel" value={personal.phone} placeholder="+63 917 555 0100" onChange={(event) => updateField('phone', event.target.value)} />
        <Field label="Location" value={personal.location} placeholder="City, Country" onChange={(event) => updateField('location', event.target.value)} />
        <Field label="Website" value={personal.website} placeholder="yourname.dev" onChange={(event) => updateField('website', event.target.value)} />
        <Field label="LinkedIn" value={personal.linkedin} placeholder="linkedin.com/in/yourname" onChange={(event) => updateField('linkedin', event.target.value)} />
        <Field label="GitHub" value={personal.github} placeholder="github.com/yourname" onChange={(event) => updateField('github', event.target.value)} />
      </div>
    </SectionCard>
  )
}
