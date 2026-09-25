import type {
  Certification,
  Education,
  Experience,
  PersonalDetails,
  Project,
  ResumeData,
  SkillGroup,
} from '../types/resume'

type JsonParseResult =
  | { ok: true; data: ResumeData }
  | { ok: false; message: string }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string')

const hasStringFields = (value: Record<string, unknown>, fields: readonly string[]): boolean =>
  fields.every((field) => typeof value[field] === 'string')

const isPersonalDetails = (value: unknown): value is PersonalDetails =>
  isRecord(value) && hasStringFields(value, [
    'name',
    'title',
    'email',
    'phone',
    'location',
    'linkedin',
    'github',
    'website',
  ])

const isExperience = (value: unknown): value is Experience =>
  isRecord(value) &&
  hasStringFields(value, ['id', 'company', 'position', 'location', 'startDate', 'endDate']) &&
  typeof value.current === 'boolean' &&
  isStringArray(value.highlights)

const isEducation = (value: unknown): value is Education =>
  isRecord(value) &&
  hasStringFields(value, ['id', 'institution', 'degree', 'field', 'startDate', 'endDate', 'description'])

const isSkillGroup = (value: unknown): value is SkillGroup =>
  isRecord(value) &&
  hasStringFields(value, ['id', 'name']) &&
  isStringArray(value.skills)

const isProject = (value: unknown): value is Project =>
  isRecord(value) &&
  hasStringFields(value, ['id', 'name', 'description', 'link']) &&
  isStringArray(value.technologies)

const isCertification = (value: unknown): value is Certification =>
  isRecord(value) &&
  hasStringFields(value, ['id', 'name', 'issuer', 'date', 'url'])

export const isResumeData = (value: unknown): value is ResumeData =>
  isRecord(value) &&
  isPersonalDetails(value.personal) &&
  typeof value.summary === 'string' &&
  Array.isArray(value.experience) && value.experience.every(isExperience) &&
  Array.isArray(value.education) && value.education.every(isEducation) &&
  Array.isArray(value.skillGroups) && value.skillGroups.every(isSkillGroup) &&
  Array.isArray(value.projects) && value.projects.every(isProject) &&
  Array.isArray(value.certifications) && value.certifications.every(isCertification)

/** Maps the earlier `url` project field to the public `link` attribute. */
export const toResumeData = (value: unknown): ResumeData | null => {
  if (isResumeData(value)) return value
  if (!isRecord(value) || !Array.isArray(value.projects)) return null

  const migratedProjects = value.projects.map((project) => {
    if (!isRecord(project)) return project
    const { url, ...projectWithoutLegacyUrl } = project
    const link = typeof project.link === 'string'
      ? project.link
      : typeof url === 'string'
        ? url
        : ''
    return { ...projectWithoutLegacyUrl, link }
  })

  const migrated = { ...value, projects: migratedProjects }
  return isResumeData(migrated) ? migrated : null
}

export const serializeResumeData = (data: ResumeData): string => JSON.stringify(data, null, 2)

export const parseResumeDataJson = (source: string): JsonParseResult => {
  try {
    const value: unknown = JSON.parse(source)
    const resume = toResumeData(value)
    if (!resume) {
      return {
        ok: false,
        message: 'The JSON is valid syntax, but it does not match the resume data structure.',
      }
    }
    return { ok: true, data: resume }
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown JSON parsing error.'
    return { ok: false, message: reason }
  }
}
