import { pdf } from '@react-pdf/renderer'
import { PDFResumeDocument } from '../components/pdf/PDFResumeDocument'
import type { ResumeData } from '../types/resume'

const PDF_FILENAME = 'Chris Earl Amar - Resume.pdf'

/** Creates an A4 PDF with embedded text and vector layout - never a page screenshot. */
export const downloadResumePdf = async (data: ResumeData): Promise<void> => {
  const blob = await pdf(<PDFResumeDocument data={data} />).toBlob()
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = PDF_FILENAME
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
}
