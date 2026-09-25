export const createId = (prefix: string): string => {
  const unique = typeof crypto?.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  return `${prefix}-${unique}`
}

export const moveItem = <T>(items: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= items.length || from === to) return items
  const nextItems = [...items]
  const [item] = nextItems.splice(from, 1)
  nextItems.splice(to, 0, item)
  return nextItems
}

export const updateArrayItem = <T extends { id: string }>(
  items: T[],
  id: string,
  patch: Partial<T>,
): T[] => items.map((item) => (item.id === id ? { ...item, ...patch } : item))

export const removeArrayItem = <T extends { id: string }>(items: T[], id: string): T[] =>
  items.filter((item) => item.id !== id)

export const formatDateRange = (startDate: string, endDate: string, current = false): string => {
  const end = current ? 'Present' : endDate
  if (startDate && end) return `${startDate} - ${end}`
  return startDate || end
}

export const toHttpUrl = (value: string): string | null => {
  const trimmed = value.trim()
  if (!trimmed) return null
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(candidate)
    return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null
  } catch {
    return null
  }
}

/** Keeps long source URLs legible in the compact resume header. */
export const formatUrlLabel = (value: string): string => {
  const trimmed = value.trim()
  const normalized = trimmed.replace(/^https?:\/\//i, '').replace(/^www\./i, '')
  return normalized.replace(/\/$/, '')
}
