import { AlertCircle, CheckCircle2, X } from 'lucide-react'

export default function Toast({ toast, onClose }) {
  if (!toast) return null
  const ok = toast.type === 'success'
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div
        role={ok ? 'status' : 'alert'}
        className={`pointer-events-auto flex max-w-md items-start gap-3 rounded-xl border bg-white px-4 py-3 text-sm shadow-lg ${
          ok ? 'border-brand/30' : 'border-red-200'
        }`}
      >
        {ok ? (
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand" />
        ) : (
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
        )}
        <p className="flex-1">{toast.message}</p>
        <button type="button" onClick={onClose} aria-label="Tutup pesan" className="text-muted hover:text-ink">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
