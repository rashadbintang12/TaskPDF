import { MARGINS, PAPER } from '../lib/pdf'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  )
}

const selectClass =
  'w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 disabled:opacity-60'

function Select({ value, onChange, options, disabled }) {
  return (
    <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  )
}

export default function PdfSettings({ settings, onChange, fileName, onFileName, disabled }) {
  const set = (key) => (value) => onChange({ ...settings, [key]: value })

  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold">Pengaturan dokumen</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Nama file PDF">
          <div className="flex">
            <input
              type="text"
              value={fileName}
              onChange={(e) => onFileName(e.target.value)}
              disabled={disabled}
              maxLength={80}
              placeholder="tugas-matematika"
              className={`${selectClass} rounded-r-none`}
            />
            <span className="grid place-items-center rounded-r-lg border border-l-0 border-line bg-page px-3 text-sm text-muted">
              .pdf
            </span>
          </div>
        </Field>

        <Field label="Ukuran kertas">
          <Select
            value={settings.paper}
            onChange={set('paper')}
            disabled={disabled}
            options={Object.entries(PAPER).map(([k, v]) => [
              k,
              k === 'f4' ? 'F4 / Folio (215 x 330 mm)' : v.label,
            ])}
          />
        </Field>

        <Field label="Orientasi">
          <Select
            value={settings.orientation}
            onChange={set('orientation')}
            disabled={disabled}
            options={[
              ['auto', 'Otomatis (ikuti foto)'],
              ['portrait', 'Portrait'],
              ['landscape', 'Landscape'],
            ]}
          />
        </Field>

        <Field label="Margin halaman">
          <Select
            value={settings.margin}
            onChange={set('margin')}
            disabled={disabled}
            options={Object.entries(MARGINS).map(([k, v]) => [k, v.label])}
          />
        </Field>

        <Field label="Kualitas">
          <Select
            value={settings.quality}
            onChange={set('quality')}
            disabled={disabled}
            options={[
              ['standard', 'Standar (file lebih kecil)'],
              ['high', 'Tinggi (tulisan lebih tajam)'],
            ]}
          />
        </Field>

        <Field label="Warna dokumen">
          <Select
            value={settings.color}
            onChange={set('color')}
            disabled={disabled}
            options={[
              ['color', 'Berwarna'],
              ['grayscale', 'Grayscale'],
            ]}
          />
        </Field>

        <Field label="Penyesuaian gambar">
          <Select
            value={settings.fit}
            onChange={set('fit')}
            disabled={disabled}
            options={[
              ['fit', 'Sesuaikan ke halaman'],
              ['original', 'Pertahankan proporsi asli'],
            ]}
          />
        </Field>
      </div>
      <p className="mt-3 text-xs text-muted">
        "Sesuaikan ke halaman" memperbesar foto sampai memenuhi area halaman. "Pertahankan proporsi asli" tidak
        memperbesar foto melebihi ukuran aslinya. Keduanya tidak memotong atau meregangkan gambar.
      </p>
    </div>
  )
}
