export default function Modal({ open, title, children, onClose }: { open: boolean; title: string; children: React.ReactNode; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-charcoal/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg border border-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-charcoal">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
