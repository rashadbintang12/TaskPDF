import { ACCEPTED_TYPES, MAX_FILE_MB, MAX_FILES } from '../config'

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

let counter = 0
const newId = () => `img-${Date.now()}-${counter++}`

// Memeriksa daftar file dan mengembalikan { items, errors }.
export function validateFiles(fileList, currentCount) {
  const items = []
  const errors = []
  const maxBytes = MAX_FILE_MB * 1024 * 1024

  for (const file of Array.from(fileList)) {
    if (currentCount + items.length >= MAX_FILES) {
      errors.push(`Maksimal ${MAX_FILES} foto. Sisanya tidak ditambahkan.`)
      break
    }
    const okType =
      ACCEPTED_TYPES.includes(file.type) || /\.(jpe?g|png)$/i.test(file.name)
    if (!okType) {
      errors.push(`"${file.name}" bukan JPG, JPEG, atau PNG.`)
      continue
    }
    if (file.size === 0) {
      errors.push(`"${file.name}" kosong.`)
      continue
    }
    if (file.size > maxBytes) {
      errors.push(`"${file.name}" lebih dari ${MAX_FILE_MB} MB (${formatBytes(file.size)}).`)
      continue
    }
    items.push({
      id: newId(),
      file,
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
    })
  }
  return { items, errors }
}

export function cleanFileName(name) {
  const base = (name || '').trim().replace(/\.pdf$/i, '')
  const safe = base.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim()
  return `${safe || 'tugas'}.pdf`
}
