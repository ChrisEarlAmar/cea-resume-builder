import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { Button } from '../ui/Button'

interface ItemControlsProps {
  itemName: string
  canMoveUp: boolean
  canMoveDown: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onDelete: () => void
}

export const ItemControls = ({
  itemName,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onDelete,
}: ItemControlsProps) => (
  <div className="item-controls" aria-label={`${itemName} controls`}>
    <Button size="icon" variant="ghost" aria-label={`Move ${itemName} up`} disabled={!canMoveUp} onClick={onMoveUp}>
      <ChevronUp size={16} aria-hidden="true" />
    </Button>
    <Button size="icon" variant="ghost" aria-label={`Move ${itemName} down`} disabled={!canMoveDown} onClick={onMoveDown}>
      <ChevronDown size={16} aria-hidden="true" />
    </Button>
    <Button size="icon" variant="ghost" aria-label={`Delete ${itemName}`} onClick={onDelete}>
      <Trash2 size={16} aria-hidden="true" />
    </Button>
  </div>
)
