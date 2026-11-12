export default function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-soft bg-white p-8 text-center">
      <p className="font-medium text-charcoal">{title}</p>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
    </div>
  )
}
