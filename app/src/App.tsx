import { RotateCcw, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { EditorModeSwitch } from './components/editor/EditorModeSwitch'
import type { EditorMode } from './components/editor/EditorModeSwitch'
import { JsonResumeEditor } from './components/editor/JsonResumeEditor'
import { ResumeEditor } from './components/editor/ResumeEditor'
import { ResumeTemplate } from './components/resume/ResumeTemplate'
import { TemplateTabs } from './components/resume/TemplateTabs'
import { Button } from './components/ui/Button'
import { DownloadMenu } from './components/ui/DownloadMenu'
import { Modal } from './components/ui/Modal'
import { getResumeTemplateOption } from './data/resumeTemplates'
import { useResume } from './hooks/useResume'
import type { ResumeTemplateId } from './types/resume'

const App = () => {
  const { data, updateData, reset } = useResume()
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const [editorMode, setEditorMode] = useState<EditorMode>('form')
  const [template, setTemplate] = useState<ResumeTemplateId>('axis')
  const activeTemplate = getResumeTemplateOption(template)

  const handleDownload = async (downloadTemplate: ResumeTemplateId) => {
    if (isGeneratingPdf) return
    setIsGeneratingPdf(true)
    setPdfError(null)
    try {
      const { downloadResumePdf } = await import('./utils/downloadPdf')
      await downloadResumePdf(data, downloadTemplate)
    } catch {
      setPdfError('The PDF could not be created. Please try again.')
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  const handleReset = () => {
    reset()
    setIsResetModalOpen(false)
  }

  return (
    <>
      <div className="app-shell">
        <header className="app-topbar">
          <a className="brand" href="#top" aria-label="Resume Studio home">
            <span className="brand__mark" aria-hidden="true">R</span>
            <span>
              <strong>Resume Studio</strong>
              <small>Print-ready, by design</small>
            </span>
          </a>
          <div className="app-topbar__actions">
            <Button variant="ghost" size="small" onClick={() => setIsResetModalOpen(true)}>
              <RotateCcw size={15} aria-hidden="true" /> Reset
            </Button>
            <DownloadMenu activeTemplate={template} isGenerating={isGeneratingPdf} onDownload={handleDownload} />
          </div>
          {pdfError ? <p className="pdf-error" role="alert">{pdfError}</p> : null}
        </header>

        <main className="workspace" id="top">
          <aside className="editor-pane" aria-label="Resume editor">
            <div className="editor-pane__intro">
              <p className="eyebrow"><Sparkles size={13} aria-hidden="true" /> Live editor</p>
              <h1>Make it unmistakably yours.</h1>
              <p>Every change is saved locally and appears in the A4 preview immediately.</p>
              <EditorModeSwitch mode={editorMode} onChange={setEditorMode} />
            </div>
            <div hidden={editorMode !== 'form'}>
              <ResumeEditor data={data} onChange={updateData} />
            </div>
            <div hidden={editorMode !== 'json'}>
              <JsonResumeEditor data={data} onChange={updateData} />
            </div>
          </aside>

          <section className="preview-pane" aria-label="Live resume preview">
            <div className="preview-toolbar">
              <div className="preview-toolbar__title">
                <p className="eyebrow">Live preview</p>
                <h2>{activeTemplate.label} <span>— A4</span></h2>
                <TemplateTabs value={template} onChange={setTemplate} />
              </div>
              <p className="preview-toolbar__hint">Downloads use selectable text and vector layout.</p>
            </div>
            <div className="preview-scroll">
              <div className="preview-stage">
                <div className="preview-paper-holder" id="resume-preview" role="tabpanel" aria-labelledby={`template-tab-${template}`}>
                  <ResumeTemplate data={data} template={template} />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Modal
          title="Reset your resume?"
          description="This restores the starter details based on your supplied resume and replaces every change currently saved in this browser."
          confirmLabel="Reset resume"
          isOpen={isResetModalOpen}
          onClose={() => setIsResetModalOpen(false)}
          onConfirm={handleReset}
        />
      </div>
    </>
  )
}

export default App
