import { Copy, Gift, Lock, MonitorSmartphone, MousePointerClick, ScanText } from 'lucide-react'

const features = [
  { icon: MousePointerClick, title: 'Mudah Digunakan', text: 'Proses sederhana tanpa langkah yang membingungkan.' },
  { icon: Copy, title: 'Banyak Foto Sekaligus', text: 'Gabungkan beberapa halaman dalam satu PDF.' },
  { icon: ScanText, title: 'Kualitas Tetap Terjaga', text: 'Pertahankan proporsi gambar dan keterbacaan tulisan.' },
  { icon: Lock, title: 'Privasi Lebih Baik', text: 'File diproses langsung di browser dan tidak diunggah ke server.' },
  { icon: Gift, title: 'Gratis', text: 'Tanpa biaya penggunaan.' },
  { icon: MonitorSmartphone, title: 'Responsif', text: 'Nyaman digunakan melalui HP, tablet, dan komputer.' },
]

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Kenapa Menggunakan Smandu PDF?</h2>
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-white text-brand">
              <Icon size={18} />
            </span>
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
