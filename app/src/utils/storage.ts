import type { ResumeData } from '../types/resume'
import { toResumeData } from './resumeValidation'

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
    return toResumeData(parsed)
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
