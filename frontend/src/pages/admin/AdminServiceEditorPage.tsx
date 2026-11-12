import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { categories, authorities, offices, services as seedServices } from '@/data/mockData'
import { load, save } from '@/utils/storage'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import { useAppStore } from '@/store/useAppStore'
import type { Service } from '@/types'
import PageHeader from '@/components/common/PageHeader'

const schema = z.object({
  title_km: z.string().min(1), title_en: z.string().min(1),
  summary_km: z.string().min(1), summary_en: z.string().min(1),
  description_km: z.string().min(1), description_en: z.string().min(1),
  categoryId: z.string().min(1), authorityId: z.string().min(1),
  eligibility_km: z.string().min(1), eligibility_en: z.string().min(1),
  procedures_km: z.string().min(1), procedures_en: z.string().min(1),
  documents_km: z.string().min(1), documents_en: z.string().min(1),
  fees_km: z.string().optional(), fees_en: z.string().optional(),
  time_km: z.string().optional(), time_en: z.string().optional(),
  officeId: z.string().optional(),
  sourceLabel_km: z.string().min(1), sourceLabel_en: z.string().min(1), sourceUrl: z.string().optional(),
})
type Form = z.infer<typeof schema>

function linesToProcedures(km: string, en: string) {
  const k = km.split('\n').map(s=>s.trim()).filter(Boolean)
  const e = en.split('\n').map(s=>s.trim()).filter(Boolean)
  const n = Math.max(k.length,e.length)
  return Array.from({length:n}, (_,i)=>({ order:i+1, title:{km:k[i]||e[i]||'', en:e[i]||k[i]||''}, description:{km:k[i]||'', en:e[i]||''} }))
}
function linesToDocs(km: string, en: string) {
  const k = km.split('\n').map(s=>s.trim()).filter(Boolean)
  const e = en.split('\n').map(s=>s.trim()).filter(Boolean)
  const n = Math.max(k.length,e.length)
  return Array.from({length:n}, (_,i)=>({ id:`d${i+1}`, name:{km:k[i]||e[i]||'', en:e[i]||k[i]||''} }))
}

export default function AdminServiceEditorPage() {
  const { id } = useParams()
  const isEdit = !!id
  const nav = useNavigate()
  const { t, lang } = useI18n()
  const pushToast = useAppStore(s => s.pushToast)
  const list = () => load<Service[]>('tomn_admin_services', seedServices)
  const existing = isEdit ? list().find(s=>s.id===id) : undefined
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (existing) {
      reset({
        title_km: existing.title.km, title_en: existing.title.en,
        summary_km: existing.summary.km, summary_en: existing.summary.en,
        description_km: existing.description.km, description_en: existing.description.en,
        categoryId: existing.categoryId, authorityId: existing.authorityId,
        eligibility_km: existing.eligibility.km, eligibility_en: existing.eligibility.en,
        procedures_km: existing.procedures.map(p=>p.title.km).join('\n'), procedures_en: existing.procedures.map(p=>p.title.en).join('\n'),
        documents_km: existing.documents.map(d=>d.name.km).join('\n'), documents_en: existing.documents.map(d=>d.name.en).join('\n'),
        fees_km: existing.fees?.amount.km || '', fees_en: existing.fees?.amount.en || '',
        time_km: existing.processingTime?.km || '', time_en: existing.processingTime?.en || '',
        officeId: existing.officeIds[0] || '',
        sourceLabel_km: existing.sources[0]?.label.km || '', sourceLabel_en: existing.sources[0]?.label.en || '', sourceUrl: existing.sources[0]?.url || '',
      })
    }
  }, [id])

  const saveService = (data: Form, status: Service['status']) => {
    const cur = list()
    const svc: Service = {
      id: existing?.id || `svc-${Date.now()}`,
      title: { km: data.title_km, en: data.title_en },
      summary: { km: data.summary_km, en: data.summary_en },
      description: { km: data.description_km, en: data.description_en },
      categoryId: data.categoryId, authorityId: data.authorityId,
      eligibility: { km: data.eligibility_km, en: data.eligibility_en },
      procedures: linesToProcedures(data.procedures_km, data.procedures_en),
      documents: linesToDocs(data.documents_km, data.documents_en),
      fees: data.fees_km || data.fees_en ? { amount: { km: data.fees_km||'', en: data.fees_en||'' } } : undefined,
      processingTime: data.time_km || data.time_en ? { km: data.time_km||'', en: data.time_en||'' } : undefined,
      officeIds: data.officeId ? [data.officeId] : [],
      sources: [{ label: { km: data.sourceLabel_km, en: data.sourceLabel_en }, url: data.sourceUrl || undefined }],
      lastVerified: existing?.lastVerified,
      status, verification: existing?.verification || 'unverified', popular: existing?.popular,
    }
    const next = existing ? cur.map(s => s.id===svc.id ? svc : s) : [svc, ...cur]
    save('tomn_admin_services', next)
    pushToast({ type:'success', message: t('common.success') })
    nav('/admin/services')
  }

  const Field = ({label, err, children}:{label:string;err?:string;children:any}) => (<div><label className="block text-sm font-medium mb-1 text-charcoal">{label}</label>{children}{err && <p className="text-xs text-error mt-1">{err}</p>}</div>)
  const input = "w-full rounded-md border border-soft px-3 py-2 text-sm"
  const ta = input + " min-h-[90px]"

  return (
    <div>
      <PageHeader title={isEdit ? t('admin.edit') : t('admin.create')} />
      <form className="space-y-6 max-w-4xl" onSubmit={e=>e.preventDefault()}>
        <section className="bg-white border border-soft rounded-lg p-5 grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 font-semibold">Title & description</h2>
          <Field label="Title (KM)" err={errors.title_km?.message}><input {...register('title_km')} className={input}/></Field>
          <Field label="Title (EN)" err={errors.title_en?.message}><input {...register('title_en')} className={input}/></Field>
          <Field label="Summary (KM)" err={errors.summary_km?.message}><textarea {...register('summary_km')} className={ta}/></Field>
          <Field label="Summary (EN)" err={errors.summary_en?.message}><textarea {...register('summary_en')} className={ta}/></Field>
          <Field label="Description (KM)" err={errors.description_km?.message}><textarea {...register('description_km')} className={ta}/></Field>
          <Field label="Description (EN)" err={errors.description_en?.message}><textarea {...register('description_en')} className={ta}/></Field>
        </section>
        <section className="bg-white border border-soft rounded-lg p-5 grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 font-semibold">Classification</h2>
          <Field label="Category" err={errors.categoryId?.message}><select {...register('categoryId')} className={input}><option value="">Select</option>{categories.map(c=><option key={c.id} value={c.id}>{tl(lang,c.name)}</option>)}</select></Field>
          <Field label="Authority" err={errors.authorityId?.message}><select {...register('authorityId')} className={input}><option value="">Select</option>{authorities.map(a=><option key={a.id} value={a.id}>{tl(lang,a.name)}</option>)}</select></Field>
          <Field label="Related office"><select {...register('officeId')} className={input}><option value="">None</option>{offices.map(o=><option key={o.id} value={o.id}>{tl(lang,o.name)}</option>)}</select></Field>
        </section>
        <section className="bg-white border border-soft rounded-lg p-5 grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 font-semibold">Eligibility, procedures, documents (one per line)</h2>
          <Field label="Eligibility (KM)" err={errors.eligibility_km?.message}><textarea {...register('eligibility_km')} className={ta}/></Field>
          <Field label="Eligibility (EN)" err={errors.eligibility_en?.message}><textarea {...register('eligibility_en')} className={ta}/></Field>
          <Field label="Procedures (KM)" err={errors.procedures_km?.message}><textarea {...register('procedures_km')} className={ta}/></Field>
          <Field label="Procedures (EN)" err={errors.procedures_en?.message}><textarea {...register('procedures_en')} className={ta}/></Field>
          <Field label="Required documents (KM)" err={errors.documents_km?.message}><textarea {...register('documents_km')} className={ta}/></Field>
          <Field label="Required documents (EN)" err={errors.documents_en?.message}><textarea {...register('documents_en')} className={ta}/></Field>
        </section>
        <section className="bg-white border border-soft rounded-lg p-5 grid gap-4 md:grid-cols-2">
          <h2 className="md:col-span-2 font-semibold">Fees, processing time, sources (only if verified)</h2>
          <Field label="Fees (KM)"><input {...register('fees_km')} className={input}/></Field>
          <Field label="Fees (EN)"><input {...register('fees_en')} className={input}/></Field>
          <Field label="Processing time (KM)"><input {...register('time_km')} className={input}/></Field>
          <Field label="Processing time (EN)"><input {...register('time_en')} className={input}/></Field>
          <Field label="Source label (KM)" err={errors.sourceLabel_km?.message}><input {...register('sourceLabel_km')} className={input}/></Field>
          <Field label="Source label (EN)" err={errors.sourceLabel_en?.message}><input {...register('sourceLabel_en')} className={input}/></Field>
          <Field label="Source URL"><input {...register('sourceUrl')} className={input}/></Field>
        </section>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSubmit(d=>saveService(d,'draft'))} className="px-4 py-2 rounded-md border border-soft bg-white hover:bg-pale font-medium">{t('admin.saveDraft')}</button>
          <button onClick={handleSubmit(d=>saveService(d,'in_review'))} className="px-4 py-2 rounded-md bg-teal text-white hover:bg-teal/90 font-medium">{t('admin.submitReview')}</button>
          <Link to="/admin/services" className="px-4 py-2 rounded-md border border-soft hover:bg-pale">{t('common.cancel')}</Link>
        </div>
      </form>
    </div>
  )
}
