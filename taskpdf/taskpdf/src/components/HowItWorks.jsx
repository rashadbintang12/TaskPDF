import { FileDown, Images, ListOrdered, Send } from 'lucide-react'

const steps = [
  { n: '01', icon: Images, title: 'Pilih Foto', text: 'Unggah satu atau beberapa foto tugas dari HP atau komputer.' },
  { n: '02', icon: ListOrdered, title: 'Atur Halaman', text: 'Susun urutan foto dan sesuaikan pengaturan PDF.' },
  {
    n: '03',
    icon: FileDown,
    title: 'Buat dan Unduh',
    text: 'Konversi semua foto menjadi satu file PDF dan simpan ke perangkat.',
  },
  {
    n: '04',
    icon: Send,
    title: 'Kumpulkan Tugas',
    text: 'Buka Classroom SMAN 2 Padang dan unggah PDF ke tugas yang sesuai.',
  },
]

export default function HowItWorks() {
  return (
    <section id="cara" className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
          Empat Langkah, Tugas Siap Dikumpulkan
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, icon: Icon, title, text }) => (
            <li key={n}>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-light text-brand-dark">
                  <Icon size={19} />
                </span>
                <span className="text-sm font-medium text-muted">{n}</span>
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
