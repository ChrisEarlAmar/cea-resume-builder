import { useCallback, useEffect, useMemo, useState } from 'react'
import { cloneDefaultResume, defaultResumeData } from '../data/defaultResume'
import { isLegacyFictionalStarter, readResume, saveResume } from '../utils/storage'
import type { ResumeData } from '../types/resume'

export interface ResumeActions {
  data: ResumeData
  updateData: (updater: (current: ResumeData) => ResumeData) => void
  reset: () => void
}

const applyProfileUpdatesToSavedResume = (resume: ResumeData): ResumeData => {
  if (resume.personal.email !== defaultResumeData.personal.email) {
    return resume
  }

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
    personal: {
      ...resume.personal,
      website: resume.personal.website.trim() || defaultResumeData.personal.website,
    },
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
