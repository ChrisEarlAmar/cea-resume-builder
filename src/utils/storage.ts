import type { ResumeData } from '../types/resume'

const STORAGE_KEY = 'resume-studio-document-v1'

/**
 * The app initially shipped with a fictional Maya Reyes document. Upgrade only
 * that untouched starter so genuine browser-local edits are never overwritten.
 */
export const isLegacyFictionalStarter = (resume: ResumeData): boolean =>
  resume.personal.name === 'Maya Reyes' &&
  resume.personal.email === 'maya.reyes@example.com' &&
  resume.personal.github === 'github.com/mayareyes'

export const readResume = (): ResumeData | null => {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) return null

    const parsed: unknown = JSON.parse(rawValue)
    if (!isResumeData(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

export const saveResume = (resume: ResumeData): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resume))
  } catch {
    // Editing continues when storage is full or unavailable.
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const isResumeData = (value: unknown): value is ResumeData => {
  if (!isRecord(value)) return false
  return (
    isRecord(value.personal) &&
    typeof value.summary === 'string' &&
    Array.isArray(value.experience) &&
    Array.isArray(value.education) &&
    Array.isArray(value.skillGroups) &&
    Array.isArray(value.projects) &&
    Array.isArray(value.certifications) &&
    Object.values(value.personal).every((item) => typeof item === 'string') &&
    value.experience.every((item) => isRecord(item) && isStringArray(item.highlights)) &&
    value.education.every((item) => isRecord(item)) &&
    value.skillGroups.every((item) => isRecord(item) && isStringArray(item.skills)) &&
    value.projects.every((item) => isRecord(item) && isStringArray(item.technologies)) &&
    value.certifications.every((item) => isRecord(item))
  )
}
