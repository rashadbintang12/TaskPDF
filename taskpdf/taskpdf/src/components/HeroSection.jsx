import { Check } from 'lucide-react'

function HeroIllustration() {
  return (
    <svg viewBox="0 0 420 300" className="h-auto w-full" role="img" aria-label="Foto lembar tugas berubah menjadi dokumen PDF">
      <circle cx="320" cy="70" r="110" fill="#16A34A" opacity="0.07" />

      {/* foto tugas */}
      <g transform="rotate(-6 100 160)">
        <rect x="30" y="60" width="140" height="180" rx="6" fill="#fff" stroke="#E1EAE3" strokeWidth="1.5" />
        <rect x="42" y="72" width="116" height="104" rx="3" fill="#DCFCE7" />
        <path d="M42 160l32-36 24 26 16-14 44 36v4H42z" fill="#16A34A" opacity="0.35" />
        <circle cx="128" cy="96" r="9" fill="#16A34A" opacity="0.45" />
        <rect x="42" y="190" width="90" height="5" rx="2.5" fill="#E1EAE3" />
        <rect x="42" y="203" width="64" height="5" rx="2.5" fill="#E1EAE3" />
      </g>

      {/* panah */}
      <g stroke="#16A34A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M188 150h40" />
        <path d="M220 141l9 9-9 9" />
      </g>

      {/* dokumen pdf */}
      <g>
        <path d="M254 50h80l36 36v156a6 6 0 0 1-6 6H254a6 6 0 0 1-6-6V56a6 6 0 0 1 6-6z" fill="#fff" stroke="#E1EAE3" strokeWidth="1.5" />
        <path d="M334 50v30a6 6 0 0 0 6 6h30" fill="#DCFCE7" stroke="#E1EAE3" strokeWidth="1.5" />
        <rect x="262" y="104" width="44" height="22" rx="4" fill="#16A34A" />
        <text x="284" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Inter, sans-serif">
          PDF
        </text>
        <rect x="262" y="146" width="96" height="5" rx="2.5" fill="#E1EAE3" />
        <rect x="262" y="160" width="80" height="5" rx="2.5" fill="#E1EAE3" />
        <rect x="262" y="174" width="90" height="5" rx="2.5" fill="#E1EAE3" />
        <rect x="262" y="188" width="56" height="5" rx="2.5" fill="#E1EAE3" />
      </g>
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-20">
        <div>
          <p className="mb-4 inline-block rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark">
            Ubah Foto Tugas Mu Menjadi File PDF
          </p>
          <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-5xl">
            Ubah Foto Tugas Menjadi PDF dengan Mudah.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            Gabungkan foto tugas JPG dan PNG menjadi PDF yang rapi dalam hitungan detik. Unduh hasilnya, lalu
            kumpulkan tugasmu melalui Classroom SMAN 2 Padang.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#konverter" className="btn-primary px-5 py-3">
              Mulai Buat PDF
            </a>
            <a href="#cara" className="btn-secondary px-5 py-3">
              Cara Penggunaan
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {['Gratis digunakan', 'Tanpa perlu membuat akun', 'Pemrosesan langsung di browser'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check size={16} className="text-brand" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-full max-w-md md:max-w-none">
          <HeroIllustration />
        </div>
      </div>
    </section>
  )
}
