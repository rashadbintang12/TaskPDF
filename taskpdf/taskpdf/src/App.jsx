import { useCallback, useEffect, useRef, useState } from 'react'
import { FileText, Loader2 } from 'lucide-react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ImageUploader from './components/ImageUploader'
import ImageList from './components/ImageList'
import PdfSettings from './components/PdfSettings'
import DownloadSection from './components/DownloadSection'
import ClassroomSection from './components/ClassroomSection'
import HowItWorks from './components/HowItWorks'
import FeaturesSection from './components/FeaturesSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import Toast from './components/Toast'
import { buildPdf, DEFAULT_SETTINGS } from './lib/pdf'
import { cleanFileName, validateFiles } from './lib/files'

export default function App() {
  const [items, setItems] = useState([])
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [fileName, setFileName] = useState('tugas')
  const [busy, setBusy] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState([])
  const [toast, setToast] = useState(null)

  const toastTimer = useRef(null)
  const itemsRef = useRef(items)
  const resultRef = useRef(result)
  itemsRef.current = items
  resultRef.current = result

  const notify = useCallback((type, message) => {
    setToast({ type, message })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 5000)
  }, [])

  // Bersihkan object URL saat halaman ditutup.
  useEffect(
    () => () => {
      itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url))
      if (resultRef.current) URL.revokeObjectURL(resultRef.current.url)
    },
    [],
  )

  const discardResult = () => {
    if (result) URL.revokeObjectURL(result.url)
    setResult(null)
  }

  const handleFiles = (fileList) => {
    const { items: added, errors: errs } = validateFiles(fileList, items.length)
    setErrors(errs)
    if (added.length) {
      discardResult() // daftar berubah, hasil lama tidak berlaku lagi
      setItems((prev) => [...prev, ...added])
    }
    if (errs.length && !added.length) notify('error', errs[0])
  }

  const handleRemove = (id) => {
    const target = items.find((i) => i.id === id)
    if (target) URL.revokeObjectURL(target.url)
    discardResult()
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleClear = () => {
    items.forEach((i) => URL.revokeObjectURL(i.url))
    discardResult()
    setErrors([])
    setItems([])
  }

  const handleReorder = (next) => {
    discardResult()
    setItems(next)
  }

  const handleSettings = (next) => {
    discardResult()
    setSettings(next)
  }

  const handleConvert = async () => {
    if (!items.length) {
      notify('error', 'Unggah foto tugas terlebih dahulu.')
      return
    }
    setBusy(true)
    setErrors([])
    discardResult()
    setProgress({ done: 0, total: items.length })
    try {
      const out = await buildPdf(items, settings, (done, total) => setProgress({ done, total }))
      const name = cleanFileName(fileName)
      setResult({ url: URL.createObjectURL(out.blob), name, pages: out.pages, size: out.size })
      notify('success', 'PDF berhasil dibuat.')
      setTimeout(() => document.getElementById('hasil')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
    } catch (err) {
      notify('error', err?.message || 'Gagal membuat PDF. Coba lagi dengan foto yang lebih sedikit.')
    } finally {
      setBusy(false)
    }
  }

  const handleReset = () => {
    handleClear()
    setFileName('tugas')
    document.getElementById('konverter')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        <section id="konverter" className="mx-auto max-w-4xl px-5 pb-16 md:pb-24">
          <div className="card p-5 sm:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Konversi Foto ke PDF</h2>
            <p className="mt-1.5 text-sm text-muted">
              Unggah foto tugasmu, atur halaman, lalu buat PDF siap dikumpulkan.
            </p>

            <div className="mt-6">
              <ImageUploader onFiles={handleFiles} disabled={busy} />
            </div>

            {errors.length > 0 && (
              <ul role="alert" className="mt-4 space-y-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            )}

            {items.length > 0 && (
              <div className="mt-8 space-y-8">
                <ImageList
                  items={items}
                  onReorder={handleReorder}
                  onRemove={handleRemove}
                  onClear={handleClear}
                  disabled={busy}
                />
                <PdfSettings
                  settings={settings}
                  onChange={handleSettings}
                  fileName={fileName}
                  onFileName={setFileName}
                  disabled={busy}
                />
              </div>
            )}

            <div className="mt-8 border-t border-line pt-6">
              <button
                type="button"
                onClick={handleConvert}
                disabled={busy || items.length === 0}
                className="btn-primary w-full px-6 py-3.5 text-base sm:w-auto"
              >
                {busy ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                {busy ? `Memproses ${progress.done}/${progress.total}...` : 'Konversi ke PDF'}
              </button>
              {items.length === 0 && (
                <p className="mt-2 text-sm text-muted">Unggah minimal satu foto untuk mulai.</p>
              )}
              {busy && (
                <div
                  className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-brand-light"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={progress.total}
                  aria-valuenow={progress.done}
                >
                  <div
                    className="h-full bg-brand transition-all"
                    style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
                  />
                </div>
              )}
            </div>

            {result && (
              <div id="hasil" className="mt-8 space-y-5">
                <DownloadSection result={result} onReset={handleReset} />
                <ClassroomSection onNotify={notify} />
              </div>
            )}
          </div>
        </section>

        <HowItWorks />
        <FeaturesSection />
        <AboutSection />
      </main>
      <Footer />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  )
}
