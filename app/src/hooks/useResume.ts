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
const LEGACY_ROLE_TITLE = 'Full-Stack Web Developer'
const LEGACY_PHONE_NUMBER = '0977 049 4633'
const LEGACY_PROFILE_SUMMARIES = [
  'Full-stack web developer building back-office applications with Laravel, React, TypeScript, SQL, and Oracle ERP data. Builds REST APIs and accounting exception reports, and maintains a customer-data survey tool used by 120+ stores with real-time updates, access controls, filtering, and PDF export.',
  'Full-stack web developer building back-office applications for CitiHardware with Laravel, React, TypeScript, SQL, and Oracle ERP data. Builds REST APIs and accounting exception reports, and maintains a customer-data survey tool used by 120+ stores with real-time updates, access controls, filtering, and PDF export.',
  'Systems developer building back-office applications for CitiHardware with Laravel, React, TypeScript, SQL, and Oracle ERP data. Builds REST APIs and accounting exception reports, and maintains a customer-data survey tool used by 120+ stores with real-time updates, access controls, filtering, and PDF export.',
  "Systems Developer at DecoArts Marketing, Inc., building Laravel and React back-office applications for CitiHardware. Work includes REST APIs, accounting exception reports against Oracle ERP data, and a customer experience management system I built for CitiHardware's 140 stores and continue to develop as the company adds locations.",
  'Systems Developer at DecoArts Marketing, Inc., building Laravel and React back-office systems for CitiHardware, including REST APIs, Oracle ERP reports, and a customer experience platform for 140 stores.',
]
const LEGACY_HIGHLIGHT_INDEX: Record<string, number> = {
  'Built back-office applications for CitiHardware, including accounting exception-report generators that query Oracle ERP data with optimized SQL for audit and compliance work.': 0,
  'Built accounting exception-report generators that query Oracle ERP data with optimized SQL for audit and compliance work.': 0,
  'Developed accounting exception reports for CitiHardware that query Oracle ERP data with SQL for audit and compliance reviews.': 0,
  'Built SQL-backed accounting exception reports from Oracle ERP data for audit and compliance work.': 0,
  'Built and integrated REST APIs for Laravel and React applications.': 1,
  'Maintained a customer-data survey tool used by 120+ stores, adding PDF export, real-time updates, access controls, and advanced filtering.': 3,
  'Built a point-of-sale customer display system showing transaction line items, campaign videos, and static banners.': 4,
  'Used Electron for desktop packaging and Capacitor for mobile builds of web applications.': 2,
  "Built the customer experience management system for CitiHardware's 140 stores and continue to add features as the company adds locations, including PDF exports, live updates, access controls, and filtering.": 3,
  "Built and continue to extend CitiHardware's 140-store customer experience platform, with live updates, access controls, filtering, and PDF export.": 3,
  'Created a customer-facing point-of-sale display that shows transaction line items alongside campaign videos and static banners.': 4,
}
const ELECTRON_CAPACITOR_HIGHLIGHT =
  'Packaged web applications for desktop with Electron and mobile with Capacitor.'
const POINT_OF_SALE_HIGHLIGHT =
  'Built a point-of-sale display for transaction items, campaign videos, and static banners.'
const LEGACY_PROJECT_DESCRIPTIONS: Record<string, string[]> = {
  'project-batch-manager': [
    'Windows utility, packaged as an executable, for running and managing batch scripts for PHP Artisan commands, queues, and WebSocket servers.',
    'Windows utility packaged as an executable to run batch scripts for PHP Artisan commands, queues, and WebSocket servers.',
    'Windows desktop utility for PHP Artisan commands, queues, and WebSocket servers.',
  ],
  'project-mvp-survey-tool': [
    'MVP survey platform for branch and store data collection, with WebSocket updates for real-time monitoring.',
    'Survey-system prototype for branch and store data collection, built as an early version of the company’s customer experience management system. Includes WebSocket updates for live monitoring.',
    "Early survey-system version of the company's customer experience platform for branch and store data collection.",
  ],
  'project-quizey': [
    'Quiz web app where people create and share quizzes without accounts; it stores data in IndexedDB and uses a custom .qzy file format for sharing.',
    'Quiz app that lets people create and share quizzes without signing in. It stores quiz data in IndexedDB and uses custom .qzy files for sharing.',
    'No-sign-in quiz app with IndexedDB storage and a custom .qzy sharing format.',
  ],
}

const applyProfileUpdatesToSavedResume = (resume: ResumeData): ResumeData => {
  if (resume.personal.email !== defaultResumeData.personal.email) {
    return resume
  }

  const experience = resume.experience.map((item) => {
    const defaultExperience = defaultResumeData.experience.find(({ id }) => id === item.id)
    if (!defaultExperience) return item

    const highlights = item.highlights.map((highlight) => {
      const defaultIndex = LEGACY_HIGHLIGHT_INDEX[highlight]
      return defaultIndex === undefined ? highlight : defaultExperience.highlights[defaultIndex]
    })
    const apiHighlightIndex = highlights.indexOf(defaultExperience.highlights[1])
    const highlightsWithDesktopMobile = highlights.includes(ELECTRON_CAPACITOR_HIGHLIGHT)
      ? highlights
      : apiHighlightIndex === -1
        ? [...highlights, ELECTRON_CAPACITOR_HIGHLIGHT]
        : [
            ...highlights.slice(0, apiHighlightIndex + 1),
            ELECTRON_CAPACITOR_HIGHLIGHT,
            ...highlights.slice(apiHighlightIndex + 1),
          ]

    return {
      ...item,
      company: item.company === LEGACY_EMPLOYER_NAME ? defaultExperience.company : item.company,
      position: item.position === LEGACY_ROLE_TITLE ? defaultExperience.position : item.position,
      highlights: highlightsWithDesktopMobile.includes(POINT_OF_SALE_HIGHLIGHT)
        ? highlightsWithDesktopMobile
        : [...highlightsWithDesktopMobile, POINT_OF_SALE_HIGHLIGHT],
    }
  })
  const summary = LEGACY_PROFILE_SUMMARIES.includes(resume.summary)
    ? defaultResumeData.summary
    : resume.summary

  const updatedSkillGroups = resume.skillGroups.map((group) => {
    const defaultGroup = defaultResumeData.skillGroups.find(({ id }) => id === group.id)
    if (!defaultGroup) return group

    const skills = group.skills.map((skill) => {
      if (skill === 'Docker (Beginner)') return 'Docker'
      if (group.id === 'skills-ai-agents-tools' && skill === 'Claude') return 'Claude Code'
      return skill
    })
    const missingSkills = defaultGroup.skills.filter((skill) => !skills.includes(skill))

    return missingSkills.length > 0
      ? { ...group, skills: [...skills, ...missingSkills] }
      : skills.some((skill, index) => skill !== group.skills[index])
        ? { ...group, skills }
        : group
  })
  const missingDefaultSkillGroups = defaultResumeData.skillGroups
    .filter((defaultGroup) => !updatedSkillGroups.some(({ id }) => id === defaultGroup.id))
    .map((group) => ({ ...group, skills: [...group.skills] }))
  const skillGroups = [...updatedSkillGroups, ...missingDefaultSkillGroups]

  const projectsWithLinks = resume.projects.map((project) => {
    const defaultProject = defaultResumeData.projects.find(({ id }) => id === project.id)
    if (!defaultProject) return project

    return {
      ...project,
      description: LEGACY_PROJECT_DESCRIPTIONS[project.id]?.includes(project.description)
        ? defaultProject.description
        : project.description,
      link: project.link.trim() ? project.link : defaultProject.link,
    }
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
      title: resume.personal.title === LEGACY_ROLE_TITLE
        ? defaultResumeData.personal.title
        : resume.personal.title,
      phone: resume.personal.phone === LEGACY_PHONE_NUMBER
        ? defaultResumeData.personal.phone
        : resume.personal.phone,
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
