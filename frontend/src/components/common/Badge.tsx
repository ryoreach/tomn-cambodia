export default function Badge({ children, tone='neutral' }: { children: React.ReactNode; tone?: 'neutral'|'success'|'warning'|'error'|'info' }) {
  const map = { neutral: 'bg-pale text-charcoal', success: 'bg-success/10 text-success', warning: 'bg-warning/10 text-warning', error: 'bg-error/10 text-error', info: 'bg-info/10 text-info' } as const
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[tone]}`}>{children}</span>
}
