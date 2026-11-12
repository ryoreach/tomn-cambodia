import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { auditLogs } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import PageHeader from '@/components/common/PageHeader'

export default function AdminAuditLogsPage() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const [action, setAction] = useState('all')
  const actions = Array.from(new Set(auditLogs.map(a => a.action)))
  const filtered = useMemo(() => auditLogs.filter(a => {
    const term = q.toLowerCase()
    if (term && !(`${a.user} ${a.action} ${a.target}`).toLowerCase().includes(term)) return false
    if (action !== 'all' && a.action !== action) return false
    return true
  }), [q, action])
  return (
    <div>
      <PageHeader title={t('admin.audit')} />
      <div className="bg-white border border-soft rounded-lg p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search logs" className="w-full rounded-md border border-soft pl-9 pr-3 py-2" /></div>
        <select value={action} onChange={e=>setAction(e.target.value)} className="rounded-md border border-soft px-3 py-2 bg-white"><option value="all">All actions</option>{actions.map(a=><option key={a} value={a}>{a}</option>)}</select>
      </div>
      <div className="bg-white border border-soft rounded-lg overflow-x-auto">
        <table className="w-full text-sm"><thead className="bg-pale/50 text-left"><tr><th className="px-4 py-3">Timestamp</th><th className="px-4 py-3">User</th><th className="px-4 py-3">Action</th><th className="px-4 py-3">Target</th></tr></thead>
        <tbody className="divide-y divide-soft">{filtered.map(a => (
          <tr key={a.id} className="hover:bg-ivory/50"><td className="px-4 py-3 text-muted whitespace-nowrap">{new Date(a.timestamp).toLocaleString()}</td><td className="px-4 py-3 font-medium text-charcoal">{a.user}</td><td className="px-4 py-3">{a.action}</td><td className="px-4 py-3 text-muted">{a.target}</td></tr>
        ))}{filtered.length===0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-muted">No logs found.</td></tr>}</tbody></table>
      </div>
    </div>
  )
}
