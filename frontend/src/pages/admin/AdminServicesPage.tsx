import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Search, Eye, Pencil, Trash2 } from 'lucide-react'
import { services as seedServices } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import Modal from '@/components/common/Modal'
import { load, save } from '@/utils/storage'
import type { Service } from '@/types'

export default function AdminServicesPage() {
  const { t, lang } = useI18n()
  const nav = useNavigate()
  const [list, setList] = useState<Service[]>(() => load<Service[]>('tomn_admin_services', seedServices))
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const filtered = useMemo(() => list.filter(s => {
    if (q && !tl(lang,s.title).toLowerCase().includes(q.toLowerCase())) return false
    if (status !== 'all' && s.status !== status) return false
    return true
  }), [list, q, status, lang])

  const remove = (id: string) => {
    const next = list.filter(s => s.id !== id)
    setList(next); save('tomn_admin_services', next); setConfirmId(null)
  }

  return (
    <div>
      <PageHeader title={t('admin.services')} actions={<Link to="/admin/services/create" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal text-white text-sm font-medium"><Plus size={16}/> {t('admin.create')}</Link>} />
      <div className="bg-white border border-soft rounded-lg p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('services.search')} className="w-full rounded-md border border-soft pl-9 pr-3 py-2" /></div>
        <select value={status} onChange={e=>setStatus(e.target.value)} className="rounded-md border border-soft px-3 py-2 bg-white">
          <option value="all">All statuses</option>
          {['draft','in_review','published','rejected','archived'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="bg-white border border-soft rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-pale/50 text-left text-charcoal"><tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Verification</th><th className="px-4 py-3 font-medium">Last verified</th><th className="px-4 py-3 font-medium text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-soft">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-ivory/50">
                <td className="px-4 py-3 font-medium text-charcoal">{tl(lang,s.title)}</td>
                <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3"><StatusBadge status={s.verification} /></td>
                <td className="px-4 py-3 text-muted">{s.lastVerified || '-'}</td>
                <td className="px-4 py-3"><div className="flex justify-end gap-1">
                  <button onClick={()=>nav(`/services/${s.id}`)} className="p-2 hover:bg-pale rounded" title="View"><Eye size={16}/></button>
                  <Link to={`/admin/services/${s.id}/edit`} className="p-2 hover:bg-pale rounded" title="Edit"><Pencil size={16}/></Link>
                  <button onClick={()=>setConfirmId(s.id)} className="p-2 hover:bg-pale rounded text-error" title="Delete"><Trash2 size={16}/></button>
                </div></td>
              </tr>
            ))}
            {filtered.length===0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">{t('services.empty')}</td></tr>}
          </tbody>
        </table>
      </div>
      <Modal open={!!confirmId} title={t('admin.delete')} onClose={()=>setConfirmId(null)}>
        <p className="text-sm text-muted mb-4">Delete this service? This demo action updates local data.</p>
        <div className="flex justify-end gap-2"><button onClick={()=>setConfirmId(null)} className="px-3 py-2 border border-soft rounded-md">{t('common.cancel')}</button><button onClick={()=>confirmId && remove(confirmId)} className="px-3 py-2 bg-error text-white rounded-md">{t('common.confirm')}</button></div>
      </Modal>
    </div>
  )
}
