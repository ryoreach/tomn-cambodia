import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FileText, CheckCircle2, Clock, Inbox } from 'lucide-react'
import { services, auditLogs, stats } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import PageHeader from '@/components/common/PageHeader'

export default function AdminDashboardPage() {
  const { t } = useI18n()
  const data = [
    { name: 'Published', value: stats.published },
    { name: 'Draft', value: stats.draft },
    { name: 'In Review', value: services.filter(s=>s.status==='in_review').length },
    { name: 'Pending Reviews', value: stats.pending },
  ]
  const cards = [
    { label: 'Total services', value: stats.total, icon: FileText },
    { label: 'Published', value: stats.published, icon: CheckCircle2 },
    { label: 'Draft', value: stats.draft, icon: Inbox },
    { label: 'Pending reviews', value: stats.pending, icon: Clock },
  ]
  return (
    <div>
      <PageHeader title={t('admin.dashboard')} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {cards.map(c => (<div key={c.label} className="bg-white border border-soft rounded-lg p-4 flex items-center justify-between"><div><div className="text-sm text-muted">{c.label}</div><div className="text-2xl font-semibold text-charcoal mt-1">{c.value}</div></div><c.icon className="text-teal" size={22}/></div>))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <div className="bg-white border border-soft rounded-lg p-5">
          <h2 className="font-semibold text-charcoal mb-4">Content status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="#E7E8E1" /><XAxis dataKey="name" tick={{fontSize:12}} /><YAxis allowDecimals={false} /><Tooltip /><Bar dataKey="value" fill="#174C45" radius={[4,4,0,0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white border border-soft rounded-lg p-5">
          <h2 className="font-semibold text-charcoal mb-4">Quick actions</h2>
          <div className="grid gap-2">
            <Link to="/admin/services/create" className="px-4 py-3 rounded-md bg-teal text-white font-medium text-sm">{t('admin.create')}</Link>
            <Link to="/admin/services" className="px-4 py-3 rounded-md border border-soft hover:bg-pale text-sm font-medium">{t('admin.services')}</Link>
            <Link to="/admin/reviews" className="px-4 py-3 rounded-md border border-soft hover:bg-pale text-sm font-medium">{t('admin.reviews')} ({stats.pending})</Link>
            <Link to="/admin/audit-logs" className="px-4 py-3 rounded-md border border-soft hover:bg-pale text-sm font-medium">{t('admin.audit')}</Link>
          </div>
        </div>
      </div>
      <div className="bg-white border border-soft rounded-lg p-5">
        <h2 className="font-semibold text-charcoal mb-3">Recent activity</h2>
        <ul className="divide-y divide-soft">{auditLogs.slice(0,5).map(a => (<li key={a.id} className="py-2 text-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"><span><span className="font-medium">{a.user}</span> — {a.action} <span className="text-muted">({a.target})</span></span><span className="text-muted">{new Date(a.timestamp).toLocaleString()}</span></li>))}</ul>
      </div>
    </div>
  )
}
