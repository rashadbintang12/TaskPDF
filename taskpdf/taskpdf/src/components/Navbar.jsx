import { useState } from 'react'
import { FileText, Menu, X } from 'lucide-react'
import { APP_NAME } from '../config'

const links = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#cara', label: 'Cara Penggunaan' },
  { href: '#tentang', label: 'Tentang' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-page/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#beranda" className="flex items-center gap-2.5" aria-label={`${APP_NAME}, ke beranda`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">
            <FileText size={18} strokeWidth={2} />
          </span>
          <span className="leading-none">
            <span className="block text-[15px] font-semibold tracking-tight">{APP_NAME}</span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
              SMAN 2 Padang
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a href="#konverter" className="btn-primary ml-2">
            Mulai Konversi
          </a>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-5 py-3 md:hidden" aria-label="Navigasi seluler">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-ink"
              >
                {l.label}
              </a>
            ))}
            <a href="#konverter" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Mulai Konversi
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
