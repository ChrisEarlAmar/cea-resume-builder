import { Plus } from 'lucide-react'
import type { Certification } from '../../types/resume'
import { createId, moveItem, removeArrayItem, updateArrayItem } from '../../utils/resumeHelpers'
import { Button } from '../ui/Button'
import { Field } from '../ui/Field'
import { ItemControls } from './ItemControls'
import { SectionCard } from './SectionCard'

interface CertificationsEditorProps {
  certifications: Certification[]
  onChange: (certifications: Certification[]) => void
}

const newCertification = (): Certification => ({
  id: createId('certification'),
  name: '',
  issuer: '',
  date: '',
  url: '',
})

export const CertificationsEditor = ({ certifications, onChange }: CertificationsEditorProps) => {
  const updateCertification = (id: string, patch: Partial<Certification>) => onChange(updateArrayItem(certifications, id, patch))
  return (
    <SectionCard title="Certifications" description="Relevant professional learning and credentials." defaultOpen={false}>
      <div className="collection-list">
        {certifications.length === 0 ? <p className="empty-state">No certifications yet.</p> : null}
        {certifications.map((item, index) => (
          <article className="collection-item collection-item--compact" key={item.id}>
            <div className="collection-item__header">
              <span className="collection-item__eyebrow">Certification {index + 1}</span>
              <ItemControls
                itemName={`certification ${index + 1}`}
                canMoveUp={index > 0}
                canMoveDown={index < certifications.length - 1}
                onMoveUp={() => onChange(moveItem(certifications, index, index - 1))}
                onMoveDown={() => onChange(moveItem(certifications, index, index + 1))}
                onDelete={() => onChange(removeArrayItem(certifications, item.id))}
              />
            </div>
            <div className="form-grid form-grid--two">
              <Field label="Certification name" value={item.name} placeholder="Certification name" onChange={(event) => updateCertification(item.id, { name: event.target.value })} />
              <Field label="Issuing organization" value={item.issuer} placeholder="Organization" onChange={(event) => updateCertification(item.id, { issuer: event.target.value })} />
              <Field label="Date" value={item.date} placeholder="2024" onChange={(event) => updateCertification(item.id, { date: event.target.value })} />
              <Field label="Credential URL" value={item.url} placeholder="credential.example.com" onChange={(event) => updateCertification(item.id, { url: event.target.value })} />
            </div>
          </article>
        ))}
      </div>
      <Button className="add-item-button" size="small" variant="secondary" onClick={() => onChange([...certifications, newCertification()])}>
        <Plus size={15} aria-hidden="true" /> Add certification
      </Button>
    </SectionCard>
  )
}
