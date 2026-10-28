import { FileDown, LoaderCircle, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { EditorModeSwitch } from './components/editor/EditorModeSwitch'
import type { EditorMode } from './components/editor/EditorModeSwitch'
import { JsonResumeEditor } from './components/editor/JsonResumeEditor'
import { ResumeEditor } from './components/editor/ResumeEditor'
import { ResumeTemplate } from './components/resume/ResumeTemplate'
import { Button } from './components/ui/Button'
import { Modal } from './components/ui/Modal'
import { useResume } from './hooks/useResume'

const App = () => {
  const { data, updateData, reset } = useResume()
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [pdfError, setPdfError] = useState<string | null>(null)
  const [editorMode, setEditorMode] = useState<EditorMode>('form')

  const handleDownload = async () => {
    if (isGeneratingPdf) return
    setIsGeneratingPdf(true)
    setPdfError(null)
    try {
      const { downloadResumePdf } = await import('./utils/downloadPdf')
      await downloadResumePdf(data)
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
              <small>ATS-friendly, editable on the fly</small>
            </span>
          </a>
          <div className="app-topbar__actions">
            <Button variant="ghost" size="small" onClick={() => setIsResetModalOpen(true)}>
              <RotateCcw size={15} aria-hidden="true" /> Reset
            </Button>
            <Button variant="primary" size="small" disabled={isGeneratingPdf} onClick={handleDownload}>
              {isGeneratingPdf ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <FileDown size={16} aria-hidden="true" />}
              {isGeneratingPdf ? 'Preparing PDF…' : 'Download ATS-friendly PDF'}
            </Button>
          </div>
          {pdfError ? <p className="pdf-error" role="alert">{pdfError}</p> : null}
        </header>

        <main className="workspace" id="top">
          <aside className="editor-pane" aria-label="Resume editor">
            <div className="editor-pane__intro">
              <p className="eyebrow"><Sparkles size={13} aria-hidden="true" /> Live editor</p>
              <h1>Keep the content yours. Keep the format readable.</h1>
              <p>Every change is saved locally and appears in the fixed ATS-friendly A4 preview immediately.</p>
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
                <p className="eyebrow"><ShieldCheck size={13} aria-hidden="true" /> ATS-friendly preview</p>
                <h2>Standard resume <span>— A4</span></h2>
              </div>
              <p className="preview-toolbar__hint">One text-based layout, built for clear reading by people and application systems.</p>
            </div>
            <div className="preview-scroll">
              <div className="preview-stage">
                <div className="preview-paper-holder" id="resume-preview">
                  <ResumeTemplate data={data} />
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
