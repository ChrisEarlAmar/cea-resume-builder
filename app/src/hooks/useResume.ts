import { useCallback, useEffect, useMemo, useState } from 'react'
import { cloneDefaultResume, defaultResumeData } from '../data/defaultResume'
import { isLegacyFictionalStarter, readResume, saveResume } from '../utils/storage'
import type { ResumeData } from '../types/resume'

export interface ResumeActions {
  data: ResumeData
  updateData: (updater: (current: ResumeData) => ResumeData) => void
  reset: () => void
}

const addPersonalWebsiteToSavedResume = (resume: ResumeData): ResumeData => {
  if (
    resume.personal.email !== defaultResumeData.personal.email ||
    resume.personal.website.trim()
  ) {
    return resume
  }

  return {
    ...resume,
    personal: {
      ...resume.personal,
      website: defaultResumeData.personal.website,
    },
  }
}

export const useResume = (): ResumeActions => {
  const [data, setData] = useState<ResumeData>(() => {
    const savedResume = readResume()
    return savedResume && !isLegacyFictionalStarter(savedResume)
      ? addPersonalWebsiteToSavedResume(savedResume)
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
