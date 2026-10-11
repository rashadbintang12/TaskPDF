import { CheckCircle2, Download, Eye, RotateCcw } from 'lucide-react'
import { formatBytes } from '../lib/files'
import PdfPreview from './PdfPreview'

export default function DownloadSection({ result, onReset }) {
  const download = () => {
    const a = document.createElement('a')
    a.href = result.url
    a.download = result.name
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const view = () => window.open(result.url, '_blank', 'noopener')

  return (
    <div className="rounded-xl border border-brand/25 bg-brand-light/40 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 shrink-0 text-brand" size={22} />
        <div>
          <h3 className="text-lg font-semibold">PDF Berhasil Dibuat!</h3>
          <p className="mt-1 text-sm text-muted">Dokumenmu sudah siap. Periksa hasilnya sebelum mengunduh.</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 rounded-lg border border-line bg-white p-4 text-sm">
        <div className="col-span-3 sm:col-span-1">
          <dt className="text-xs text-muted">Nama file</dt>
          <dd className="mt-0.5 break-all font-medium">{result.name}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Halaman</dt>
          <dd className="mt-0.5 font-medium">{result.pages}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">Ukuran</dt>
          <dd className="mt-0.5 font-medium">{formatBytes(result.size)}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <PdfPreview url={result.url} title={result.name} />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={download}>
          <Download size={16} />
          Unduh PDF
        </button>
        <button type="button" className="btn-secondary" onClick={view}>
          <Eye size={16} />
          Lihat PDF
        </button>
        <button type="button" className="btn-secondary" onClick={onReset}>
          <RotateCcw size={16} />
          Buat PDF Baru
        </button>
      </div>
    </div>
  )
}
