import { useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { MAX_FILE_MB, MAX_FILES } from '../config'

export default function ImageUploader({ onFiles, disabled }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    if (disabled) return
    if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files)
  }

  const handleChange = (e) => {
    if (e.target.files?.length) onFiles(e.target.files)
    e.target.value = '' // izinkan memilih file yang sama lagi
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`rounded-xl border-2 border-dashed px-5 py-9 text-center transition-colors ${
        dragging ? 'border-brand bg-brand-light/60' : 'border-brand/30 bg-brand-light/20'
      }`}
    >
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brand-light text-brand">
        <ImagePlus size={22} />
      </span>
      <p className="mt-4 text-base font-medium">Tarik dan letakkan foto di sini</p>
      <p className="mt-1 text-sm text-muted">atau pilih file dari perangkatmu</p>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        multiple
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
        aria-label="Pilih foto tugas"
      />
      <button
        type="button"
        className="btn-primary mt-5"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
      >
        Pilih Foto
      </button>
      <p className="mt-4 text-xs text-muted">
        JPG, JPEG, PNG. Maksimal {MAX_FILE_MB} MB per foto, sampai {MAX_FILES} foto.
      </p>
    </div>
  )
}
