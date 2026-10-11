import { FileText } from 'lucide-react'
import { APP_NAME, DEV_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
                <FileText size={16} />
              </span>
              <span className="font-semibold">{APP_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Alat bantu mengubah foto tugas menjadi satu file PDF, langsung di browser.
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="flex gap-6 text-sm text-white/80">
            <a href="#beranda" className="hover:text-white">
              Beranda
            </a>
            <a href="#cara" className="hover:text-white">
              Cara Penggunaan
            </a>
            <a href="#tentang" className="hover:text-white">
              Tentang
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-white/15 pt-5 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>Dibuat untuk membantu siswa SMAN 2 Padang</p>
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME} &middot; dev : {DEV_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
