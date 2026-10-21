import { useCallback, useEffect, useMemo, useState } from 'react'
import { cloneDefaultResume, defaultResumeData } from '../data/defaultResume'
import { isLegacyFictionalStarter, readResume, saveResume } from '../utils/storage'
import type { ResumeData } from '../types/resume'

export interface ResumeActions {
  data: ResumeData
  updateData: (updater: (current: ResumeData) => ResumeData) => void
  reset: () => void
}

const LEGACY_EMPLOYER_NAME = 'DecoArts Marketing, Inc. / CitiHardware Inc.'
const LEGACY_PROFILE_SUMMARY =
  'Full-stack web developer building back-office applications with Laravel, React, TypeScript, SQL, and Oracle ERP data. Builds REST APIs and accounting exception reports, and maintains a customer-data survey tool used by 120+ stores with real-time updates, access controls, filtering, and PDF export.'
const LEGACY_ACCOUNTING_HIGHLIGHT =
  'Built accounting exception-report generators that query Oracle ERP data with optimized SQL for audit and compliance work.'

const applyProfileUpdatesToSavedResume = (resume: ResumeData): ResumeData => {
  if (resume.personal.email !== defaultResumeData.personal.email) {
    return resume
  }

  const experience = resume.experience.map((item) => {
    const defaultExperience = defaultResumeData.experience.find(({ id }) => id === item.id)
    if (!defaultExperience) return item

    return {
      ...item,
      company: item.company === LEGACY_EMPLOYER_NAME ? defaultExperience.company : item.company,
      highlights: item.highlights.map((highlight) =>
        highlight === LEGACY_ACCOUNTING_HIGHLIGHT
          ? defaultExperience.highlights[0]
          : highlight,
      ),
    }
  })
  const summary = resume.summary === LEGACY_PROFILE_SUMMARY
    ? defaultResumeData.summary
    : resume.summary

  const skillGroups = resume.skillGroups.map((group) => {
    const defaultGroup = defaultResumeData.skillGroups.find(({ id }) => id === group.id)
    if (!defaultGroup) return group

    const skills = group.skills.map((skill) =>
      skill === 'Docker (Beginner)' ? 'Docker' : skill,
    )
    const missingSkills = defaultGroup.skills.filter((skill) => !skills.includes(skill))

    return missingSkills.length > 0
      ? { ...group, skills: [...skills, ...missingSkills] }
      : skills.some((skill, index) => skill !== group.skills[index])
        ? { ...group, skills }
        : group
  })

  const projectsWithLinks = resume.projects.map((project) => {
    const defaultProject = defaultResumeData.projects.find(({ id }) => id === project.id)
    return defaultProject && !project.link.trim()
      ? { ...project, link: defaultProject.link }
      : project
  })
  const quizeyProject = defaultResumeData.projects.find(({ id }) => id === 'project-quizey')
  const projects = quizeyProject && !projectsWithLinks.some(({ id }) => id === quizeyProject.id)
    ? [...projectsWithLinks, { ...quizeyProject, technologies: [...quizeyProject.technologies] }]
    : projectsWithLinks

  return {
    ...resume,
    summary,
    personal: {
      ...resume.personal,
      website: resume.personal.website.trim() || defaultResumeData.personal.website,
    },
    experience,
    skillGroups,
    projects,
  }
}

export const useResume = (): ResumeActions => {
  const [data, setData] = useState<ResumeData>(() => {
    const savedResume = readResume()
    return savedResume && !isLegacyFictionalStarter(savedResume)
      ? applyProfileUpdatesToSavedResume(savedResume)
      : cloneDefaultResume()
  })

  useEffect(() => {
    saveResume(data)
  }, [data])

  const updateData = useCallback((updater: (current: ResumeData) => ResumeData) => {
    setData((current) => updater(current))
  }, [])

  const reset = useCallback(() => {
    setData(cloneDefaultResume())
  }, [])

  return useMemo(() => ({ data, updateData, reset }), [data, reset, updateData])
}
