import { jsPDF } from 'jspdf'

// Ukuran kertas dalam milimeter (portrait).
export const PAPER = {
  a4: { label: 'A4', w: 210, h: 297 },
  letter: { label: 'Letter', w: 215.9, h: 279.4 },
  f4: { label: 'F4 / Folio', w: 215, h: 330 },
}

export const MARGINS = {
  none: { label: 'Tanpa margin', mm: 0 },
  small: { label: 'Kecil', mm: 10 },
  normal: { label: 'Normal', mm: 20 },
}

export const DEFAULT_SETTINGS = {
  paper: 'a4',
  orientation: 'auto', // auto | portrait | landscape
  margin: 'small',
  quality: 'high', // standard | high
  color: 'color', // color | grayscale
  fit: 'fit', // fit | original
}

const QUALITY = {
  standard: { maxSide: 1600, jpeg: 0.72 },
  high: { maxSide: 2480, jpeg: 0.9 },
}

async function loadBitmap(file) {
  // 'from-image' menghormati orientasi EXIF dari kamera HP.
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' })
    } catch {
      // lanjut ke fallback
    }
  }
  const url = URL.createObjectURL(file)
  try {
    const img = new Image()
    img.src = url
    await img.decode()
    return img
  } finally {
    URL.revokeObjectURL(url)
  }
}

// Menggambar ulang gambar ke canvas: skala turun, latar putih (untuk PNG transparan),
// dan grayscale bila diminta. Hasilnya JPEG data URL.
async function prepareImage(file, settings) {
  const bmp = await loadBitmap(file)
  const srcW = bmp.width
  const srcH = bmp.height
  const { maxSide, jpeg } = QUALITY[settings.quality]
  const scale = Math.min(1, maxSide / Math.max(srcW, srcH))
  const w = Math.max(1, Math.round(srcW * scale))
  const h = Math.max(1, Math.round(srcH * scale))

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, w, h)
  ctx.imageSmoothingQuality = 'high'
  if (settings.color === 'grayscale') ctx.filter = 'grayscale(1)'
  ctx.drawImage(bmp, 0, 0, w, h)
  if (typeof bmp.close === 'function') bmp.close()

  const dataUrl = canvas.toDataURL('image/jpeg', jpeg)
  canvas.width = 0
  canvas.height = 0
  return { dataUrl, w, h, srcW, srcH }
}

function pageFor(settings, imgW, imgH) {
  const p = PAPER[settings.paper]
  let landscape
  if (settings.orientation === 'auto') landscape = imgW > imgH
  else landscape = settings.orientation === 'landscape'
  return landscape ? { w: p.h, h: p.w, landscape } : { w: p.w, h: p.h, landscape }
}

/**
 * Membuat PDF dari daftar item gambar sesuai urutannya.
 * onProgress(done, total) dipanggil setelah tiap halaman selesai.
 * Mengembalikan { blob, pages, size }.
 */
export async function buildPdf(items, settings, onProgress) {
  if (!items.length) throw new Error('Belum ada foto yang dipilih.')
  const margin = MARGINS[settings.margin].mm
  let doc = null

  for (let i = 0; i < items.length; i++) {
    let img
    try {
      img = await prepareImage(items[i].file, settings)
    } catch {
      throw new Error(`Foto "${items[i].name}" tidak bisa dibaca. Coba hapus atau ganti foto tersebut.`)
    }

    const page = pageFor(settings, img.srcW, img.srcH)
    if (!doc) {
      doc = new jsPDF({
        orientation: page.landscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [Math.min(page.w, page.h), Math.max(page.w, page.h)],
        compress: true,
      })
    } else {
      doc.addPage([Math.min(page.w, page.h), Math.max(page.w, page.h)], page.landscape ? 'landscape' : 'portrait')
    }

    const areaW = page.w - margin * 2
    const areaH = page.h - margin * 2
    const ratio = img.srcW / img.srcH

    let drawW
    let drawH
    if (settings.fit === 'original') {
      // Ukuran asli pada 150 dpi, tidak diperbesar melebihi area, tidak dipotong.
      const natW = (img.srcW / 150) * 25.4
      const natH = (img.srcH / 150) * 25.4
      const k = Math.min(1, areaW / natW, areaH / natH)
      drawW = natW * k
      drawH = natH * k
    } else {
      drawW = areaW
      drawH = drawW / ratio
      if (drawH > areaH) {
        drawH = areaH
        drawW = drawH * ratio
      }
    }
    const x = (page.w - drawW) / 2
    const y = (page.h - drawH) / 2
    doc.addImage(img.dataUrl, 'JPEG', x, y, drawW, drawH, undefined, 'FAST')

    onProgress?.(i + 1, items.length)
    // beri kesempatan browser menggambar ulang indikator proses
    await new Promise((r) => setTimeout(r, 0))
  }

  const blob = doc.output('blob')
  return { blob, pages: items.length, size: blob.size }
}
