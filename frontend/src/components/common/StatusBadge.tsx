import Badge from './Badge'
export default function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; tone: any }> = {
    published: { label: 'Published', tone: 'success' }, draft: { label: 'Draft', tone: 'neutral' }, in_review: { label: 'In Review', tone: 'warning' }, rejected: { label: 'Rejected', tone: 'error' }, archived: { label: 'Archived', tone: 'neutral' },
    verified: { label: 'Verified', tone: 'success' }, partially_verified: { label: 'Partially verified', tone: 'warning' }, unverified: { label: 'Unverified', tone: 'neutral' },
    pending: { label: 'Pending', tone: 'warning' }, approved: { label: 'Approved', tone: 'success' }, active: { label: 'Active', tone: 'success' }, inactive: { label: 'Inactive', tone: 'neutral' },
  }
  const v = map[status] || { label: status, tone: 'neutral' }
  return <Badge tone={v.tone}>{v.label}</Badge>
}
