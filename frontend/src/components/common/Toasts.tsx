import { useAppStore } from '@/store/useAppStore'
export default function Toasts() {
  const toasts = useAppStore(s => s.toasts)
  const remove = useAppStore(s => s.removeToast)
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} role="status" className={`min-w-64 rounded-md border px-4 py-3 shadow-sm text-sm bg-white ${t.type==='success'?'border-success/30 text-success':t.type==='error'?'border-error/30 text-error':'border-info/30 text-info'}`}>
          <div className="flex items-start justify-between gap-3">
            <span>{t.message}</span>
            <button onClick={() => remove(t.id)} className="text-muted hover:text-charcoal" aria-label="Dismiss">×</button>
          </div>
        </div>
      ))}
    </div>
  )
}
