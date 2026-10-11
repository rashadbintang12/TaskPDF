// Pratinjau PDF hasil konversi. Browser seluler sering tidak bisa menampilkan PDF
// di dalam halaman, jadi iframe hanya tampil di layar lebar dan tombol "Lihat PDF"
// membuka PDF di tab baru.
export default function PdfPreview({ url, title }) {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-line bg-page md:block">
      <iframe src={url} title={`Pratinjau ${title}`} className="h-[520px] w-full" />
    </div>
  )
}
