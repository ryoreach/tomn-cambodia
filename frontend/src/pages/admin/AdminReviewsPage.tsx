import { useMemo, useState } from 'react'
import { reviews as seedReviews, services as seedServices } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import Modal from '@/components/common/Modal'
import { load, save } from '@/utils/storage'
import type { ReviewItem, Service } from '@/types'

export default function AdminReviewsPage() {
  const { t, lang } = useI18n()
  const [reviews, setReviews] = useState<ReviewItem[]>(() => load('tomn_reviews', seedReviews))
  const [services] = useState<Service[]>(() => load('tomn_admin_services', seedServices))
  const [selected, setSelected] = useState<ReviewItem | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [rejecting, setRejecting] = useState(false)

  const pending = useMemo(() => reviews.filter(r => r.status === 'pending'), [reviews])
  const history = useMemo(() => reviews.filter(r => r.status !== 'pending'), [reviews])
  const svc = (id: string) => services.find(s => s.id === id)

  const act = (r: ReviewItem, status: 'approved'|'rejected', reason?: string) => {
    const next = reviews.map(x => x.id===r.id ? { ...x, status, reason } : x)
    setReviews(next); save('tomn_reviews', next); setSelected(null); setRejecting(false); setRejectReason('')
  }

  return (
    <div>
      <PageHeader title={t('admin.reviews')} subtitle="Review submitted service content (demo workflow)" />
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="bg-white border border-soft rounded-lg p-5">
          <h2 className="font-semibold text-charcoal mb-3">Pending content</h2>
          {pending.length===0 ? <p className="text-sm text-muted">No pending reviews.</p> : (
            <ul className="space-y-2">{pending.map(r => { const s = svc(r.serviceId); return (
              <li key={r.id}><button onClick={()=>setSelected(r)} className={`w-full text-left p-3 rounded-md border ${selected?.id===r.id?'border-teal bg-pale':'border-soft hover:bg-pale/50'}`}>
                <div className="flex items-center justify-between"><span className="font-medium text-charcoal">{s?tl(lang,s.title):r.serviceId}</span><StatusBadge status={r.status}/></div>
                <div className="text-xs text-muted mt-1">By {r.submittedBy} · {new Date(r.submittedAt).toLocaleString()}</div>
              </button></li>
            )})}</ul>
          )}
          <h3 className="font-semibold text-charcoal mt-6 mb-2">Review history</h3>
          <ul className="space-y-2">{history.map(r => { const s=svc(r.serviceId); return (
            <li key={r.id} className="p-3 rounded-md border border-soft flex items-center justify-between text-sm"><span>{s?tl(lang,s.title):r.serviceId}</span><StatusBadge status={r.status}/></li>
          )})}{history.length===0 && <li className="text-sm text-muted">No history.</li>}</ul>
        </section>
        <section className="bg-white border border-soft rounded-lg p-5">
          <h2 className="font-semibold text-charcoal mb-3">Review details</h2>
          {!selected ? <p className="text-sm text-muted">Select a pending item to review.</p> : (() => { const s = svc(selected.serviceId); if(!s) return null; return (
            <div className="space-y-4 text-sm">
              <div><div className="text-muted">Service</div><div className="font-medium text-charcoal">{tl(lang,s.title)}</div></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-ivory rounded border border-soft"><div className="text-xs text-muted mb-1">Khmer</div><div className="font-medium">{s.title.km}</div><p className="text-muted mt-1 line-clamp-4">{s.description.km}</p></div>
                <div className="p-3 bg-ivory rounded border border-soft"><div className="text-xs text-muted mb-1">English</div><div className="font-medium">{s.title.en}</div><p className="text-muted mt-1 line-clamp-4">{s.description.en}</p></div>
              </div>
              <div><div className="text-muted mb-1">Source verification</div><ul className="list-disc pl-5">{s.sources.map((src,i)=><li key={i}>{tl(lang,src.label)} {src.url && <span className="text-muted">({src.url})</span>}</li>)}</ul></div>
              <div className="flex gap-2 pt-2">
                <button onClick={()=>act(selected,'approved')} className="px-3 py-2 rounded-md bg-success text-white font-medium">{t('admin.approve')}</button>
                <button onClick={()=>setRejecting(true)} className="px-3 py-2 rounded-md bg-error text-white font-medium">{t('admin.reject')}</button>
              </div>
            </div>
          )})()}
        </section>
      </div>
      <Modal open={rejecting} title={t('admin.reject')} onClose={()=>setRejecting(false)}>
        <label className="block text-sm font-medium mb-1">Reason</label>
        <textarea value={rejectReason} onChange={e=>setRejectReason(e.target.value)} className="w-full rounded-md border border-soft px-3 py-2 min-h-[100px]" />
        <div className="flex justify-end gap-2 mt-4"><button onClick={()=>setRejecting(false)} className="px-3 py-2 border border-soft rounded-md">{t('common.cancel')}</button><button onClick={()=>selected && act(selected,'rejected',rejectReason||'Needs revision')} className="px-3 py-2 bg-error text-white rounded-md">{t('common.confirm')}</button></div>
      </Modal>
    </div>
  )
}
