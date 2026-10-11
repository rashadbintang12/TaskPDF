import { ExternalLink, GraduationCap } from 'lucide-react'
import { CLASSROOM_URL } from '../config'

const isConfigured = () => {
  const url = (CLASSROOM_URL || '').trim()
  return url !== '' && url !== 'CLASSROOM_URL' && /^https?:\/\//i.test(url)
}

export default function ClassroomSection({ onNotify }) {
  const open = () => {
    if (!isConfigured()) {
      onNotify('error', 'Tautan Classroom belum dikonfigurasi. Isi CLASSROOM_URL di src/config.js.')
      return
    }
    window.open(CLASSROOM_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="rounded-xl border border-brand/25 bg-brand-light/40 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <GraduationCap className="mt-0.5 shrink-0 text-brand" size={22} />
        <div>
          <h3 className="text-lg font-semibold">Satu Langkah Lagi!</h3>
          <p className="mt-1 text-sm text-muted">
            PDF tugasmu sudah siap. Unduh dokumennya, kemudian buka Classroom SMAN 2 Padang untuk mengumpulkan
            tugas.
          </p>
        </div>
      </div>

      <button type="button" className="btn-primary mt-5" onClick={open}>
        <ExternalLink size={16} />
        Kumpulkan Tugas di Classroom
      </button>

      <p className="mt-3 text-xs text-muted">
        Tugas belum terkirim otomatis. Di Classroom, kamu tetap perlu mengunggah file PDF dan menekan tombol
        penyerahan tugas sendiri.
      </p>
    </div>
  )
}
