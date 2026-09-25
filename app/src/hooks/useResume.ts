import { useCallback, useEffect, useMemo, useState } from 'react'
import { cloneDefaultResume } from '../data/defaultResume'
import { isLegacyFictionalStarter, readResume, saveResume } from '../utils/storage'
import type { ResumeData } from '../types/resume'

export interface ResumeActions {
  data: ResumeData
  updateData: (updater: (current: ResumeData) => ResumeData) => void
  reset: () => void
}

export const useResume = (): ResumeActions => {
  const [data, setData] = useState<ResumeData>(() => {
    const savedResume = readResume()
    return savedResume && !isLegacyFictionalStarter(savedResume)
      ? savedResume
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
