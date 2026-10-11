# TaskPDF

Ubah foto tugas (JPG, JPEG, PNG) menjadi satu file PDF langsung di browser, lalu buka Classroom SMAN 2 Padang untuk mengumpulkan tugas. Tidak ada backend, foto tidak dikirim ke server mana pun.

Dev: rashad bintang alfatir

## Menjalankan

Butuh Node.js 18 atau lebih baru.

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # hasil produksi ada di folder dist/
npm run preview  # coba hasil build
```

Hasil `dist/` bisa di-hosting di mana saja yang menyajikan file statis (Netlify, Vercel, GitHub Pages, hosting sekolah).

## Mengganti URL Classroom

Buka `src/config.js`:

```js
export const CLASSROOM_URL = 'https://www.classroom.sman2-padang.sch.id/login.php'
```

Ganti nilainya dengan URL yang diinginkan. Jika diisi `'CLASSROOM_URL'` atau string kosong, tombol hanya menampilkan pesan bahwa tautan belum dikonfigurasi dan tidak membuka apa pun.

Batas file (`MAX_FILES`, `MAX_FILE_MB`) dan nama aplikasi juga ada di file yang sama.

## Struktur folder

```
taskpdf/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  public/
    favicon.svg
  src/
    main.jsx            titik masuk
    index.css           Tailwind + gaya tombol/kartu
    config.js           CLASSROOM_URL, batas file, nama
    App.jsx             state utama dan alur konversi
    lib/
      pdf.js            pembuatan PDF (jsPDF + canvas)
      files.js          validasi file, format ukuran, nama file
    components/
      Navbar.jsx
      HeroSection.jsx
      ImageUploader.jsx   pilih foto + drag and drop
      ImageList.jsx       thumbnail, urutan (dnd-kit), hapus
      PdfSettings.jsx
      PdfPreview.jsx
      DownloadSection.jsx
      ClassroomSection.jsx
      HowItWorks.jsx
      FeaturesSection.jsx
      AboutSection.jsx
      Footer.jsx
      Toast.jsx
```

## Cara kerja konversi

Tiap foto digambar ulang ke canvas (diperkecil bila terlalu besar, latar putih untuk PNG transparan, grayscale bila dipilih), dijadikan JPEG, lalu ditempatkan di tengah satu halaman PDF tanpa dipotong dan tanpa diregangkan. Orientasi EXIF dari kamera HP diperhatikan.

## Catatan

- Tampilan pratinjau PDF di dalam halaman hanya muncul di layar lebar. Di HP gunakan tombol "Lihat PDF".
- Website ini bukan website resmi SMAN 2 Padang dan tidak mengirim tugas otomatis.
