export type ResumeTemplateId = 'axis'

export interface PersonalDetails {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  highlights: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface SkillGroup {
  id: string
  name: string
  skills: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
}

export interface ResumeData {
  personal: PersonalDetails
  summary: string
  experience: Experience[]
  education: Education[]
  skillGroups: SkillGroup[]
  projects: Project[]
  certifications: Certification[]
}

export interface ResumeDocument {
  template: ResumeTemplateId
  data: ResumeData
}
