import { useParams, Link, useNavigate } from 'react-router-dom'
import { Printer, Bookmark, CheckSquare, ExternalLink, MapPin } from 'lucide-react'
import { services, categories, authorities, offices } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import StatusBadge from '@/components/common/StatusBadge'
import { useAppStore } from '@/store/useAppStore'

export default function ServiceDetailsPage() {
  const { id } = useParams()
  const { t, lang } = useI18n()
  const nav = useNavigate()
  const service = services.find(s => s.id === id)
  const saved = useAppStore(s => s.savedServices)
  const toggleSave = useAppStore(s => s.toggleSavedService)
  const upsertChecklist = useAppStore(s => s.upsertChecklist)
  const pushToast = useAppStore(s => s.pushToast)
  const user = useAppStore(s => s.user)
  if (!service) return <div className="container-page py-12"><p>{t('services.empty')}</p><Link to="/services" className="text-teal">{t('common.back')}</Link></div>
  const cat = categories.find(c=>c.id===service.categoryId)
  const auth = authorities.find(a=>a.id===service.authorityId)
  const relatedOffices = offices.filter(o => service.officeIds.includes(o.id))
  const isSaved = saved.includes(service.id)

  const createChecklist = () => {
    if (!user) { pushToast({ type:'info', message: lang==='km'?'សូមចូលគណនីដើម្បីបង្កើតបញ្ជី':'Please login to create a checklist' }); nav('/login'); return }
    const idc = `chk-${service.id}-${Date.now()}`
    upsertChecklist({
      id: idc, serviceId: service.id, title: tl(lang, service.title),
      items: service.documents.map(d => ({ id: d.id, label: tl(lang,d.name), done: false })),
      updatedAt: new Date().toISOString()
    })
    pushToast({ type:'success', message: lang==='km'?'បានបង្កើតបញ្ជីឯកសារ':'Checklist created' })
    nav('/dashboard/checklists')
  }

  return (
    <div className="container-page py-8">
      <div className="mb-4 text-sm text-muted"><Link to="/services" className="hover:text-teal">{t('services.title')}</Link> / <span>{tl(lang,service.title)}</span></div>
      <div className="bg-white border border-soft rounded-lg p-6 mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-2"><StatusBadge status={service.status} /><StatusBadge status={service.verification} />{cat && <span className="text-xs px-2 py-0.5 rounded-full bg-pale text-charcoal">{tl(lang,cat.name)}</span>}</div>
            <h1 className="text-2xl font-semibold text-charcoal">{tl(lang,service.title)}</h1>
            <p className="mt-1 text-muted max-w-3xl">{tl(lang,service.description)}</p>
          </div>
          <div className="flex flex-wrap gap-2 no-print">
            <button onClick={() => { toggleSave(service.id); pushToast({type:'success', message: isSaved ? (lang==='km'?'បានដកចេញ':'Removed') : t('services.saved')}) }} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border ${isSaved?'border-teal text-teal bg-pale':'border-soft hover:bg-pale'}`}><Bookmark size={16}/> {isSaved?t('services.saved'):t('services.save')}</button>
            <button onClick={createChecklist} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal text-white hover:bg-teal/90"><CheckSquare size={16}/> {t('service.createChecklist')}</button>
            <button onClick={()=>window.print()} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-soft hover:bg-pale"><Printer size={16}/> {t('service.print')}</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="bg-white border border-soft rounded-lg p-5">
            <h2 className="font-semibold text-charcoal mb-2">{t('service.eligibility')}</h2>
            <p className="text-muted">{tl(lang,service.eligibility)}</p>
          </section>
          <section className="bg-white border border-soft rounded-lg p-5">
            <h2 className="font-semibold text-charcoal mb-3">{t('service.procedures')}</h2>
            <ol className="space-y-3">
              {service.procedures.map(step => (
                <li key={step.order} className="flex gap-3">
                  <span className="h-7 w-7 rounded-full bg-teal text-white flex items-center justify-center text-sm shrink-0">{step.order}</span>
                  <div><div className="font-medium text-charcoal">{tl(lang,step.title)}</div><p className="text-sm text-muted">{tl(lang,step.description)}</p></div>
                </li>
              ))}
            </ol>
          </section>
          <section className="bg-white border border-soft rounded-lg p-5">
            <h2 className="font-semibold text-charcoal mb-3">{t('service.documents')}</h2>
            <ul className="space-y-2">
              {service.documents.map(d => <li key={d.id} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-green shrink-0"/> <span className="text-charcoal">{tl(lang,d.name)}</span></li>)}
            </ul>
          </section>
          <section className="bg-white border border-soft rounded-lg p-5">
            <h2 className="font-semibold text-charcoal mb-3">{t('service.offices')}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedOffices.map(o => (
                <div key={o.id} className="border border-soft rounded-md p-3">
                  <div className="font-medium text-charcoal flex items-center gap-2"><MapPin size={16} className="text-teal"/> {tl(lang,o.name)}</div>
                  <div className="text-sm text-muted mt-1">{tl(lang,o.address)}</div>
                  <div className="text-sm text-muted">{tl(lang,o.province)}, {tl(lang,o.district)}</div>
                  {o.phone && <div className="text-sm text-muted">{o.phone}</div>}
                </div>
              ))}
              {relatedOffices.length===0 && <p className="text-muted text-sm">{t('offices.empty')}</p>}
            </div>
          </section>
        </div>
        <aside className="space-y-4">
          <div className="bg-white border border-soft rounded-lg p-5">
            <h3 className="font-semibold text-charcoal mb-3">{t('service.details')}</h3>
            <dl className="space-y-3 text-sm">
              <div><dt className="text-muted">{t('service.authority')}</dt><dd className="font-medium text-charcoal">{auth?tl(lang,auth.name):'-'}</dd></div>
              <div><dt className="text-muted">{t('service.fees')}</dt><dd className="text-charcoal">{service.fees ? tl(lang,service.fees.amount) : t('service.noFee')}</dd></div>
              <div><dt className="text-muted">{t('service.processingTime')}</dt><dd className="text-charcoal">{service.processingTime ? tl(lang,service.processingTime) : t('service.noTime')}</dd></div>
              <div><dt className="text-muted">{t('service.lastVerified')}</dt><dd className="text-charcoal">{service.lastVerified || '-'}</dd></div>
            </dl>
          </div>
          <div className="bg-white border border-soft rounded-lg p-5">
            <h3 className="font-semibold text-charcoal mb-3">{t('service.sources')}</h3>
            <ul className="space-y-2 text-sm">
              {service.sources.map((src,i)=>(<li key={i} className="flex items-start gap-2"><ExternalLink size={14} className="mt-0.5 text-teal"/>{src.url ? <a href={src.url} target="_blank" rel="noreferrer" className="text-teal hover:underline">{tl(lang,src.label)}</a> : <span>{tl(lang,src.label)}</span>}</li>))}
            </ul>
          </div>
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 text-sm text-charcoal">{t('service.disclaimer')}</div>
        </aside>
      </div>
    </div>
  )
}
