export default function AboutSection() {
  return (
    <section id="tentang" className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:py-20">
        <h2 className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
          Dibuat untuk Mempermudah Pengumpulan Tugas Siswa SMAN 2 Padang
        </h2>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted">
          <p>
            Smandu PDF Converter adalah alat bantu untuk siswa SMAN 2 Padang yang ingin mengubah foto tugas menjadi
            dokumen PDF secara praktis. Dengan tampilan sederhana dan proses yang mudah, siswa dapat menyiapkan
            dokumen tugas sebelum mengumpulkannya melalui Classroom.
          </p>
          <p className="rounded-lg border border-line bg-page p-4 text-sm">
            Website ini adalah alat bantu konversi dokumen, bukan pengganti Classroom, dan tidak otomatis
            mengirimkan tugas ke sekolah. Website ini juga bukan website resmi SMAN 2 Padang.
          </p>
        </div>
      </div>
    </section>
  )
}
