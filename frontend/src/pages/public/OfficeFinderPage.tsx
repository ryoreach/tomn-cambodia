import { useMemo, useState } from 'react'
import { Search, MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { offices } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'
import EmptyState from '@/components/common/EmptyState'

export default function OfficeFinderPage() {
  const { t, lang } = useI18n()
  const [q, setQ] = useState('')
  const [province, setProvince] = useState('all')
  const [district, setDistrict] = useState('all')
  const provinces = Array.from(new Set(offices.map(o => o.province.en)))
  const districts = Array.from(new Set(offices.filter(o => province==='all' || o.province.en===province).map(o => o.district.en)))

  const filtered = useMemo(() => offices.filter(o => {
    const term = q.toLowerCase()
    if (term && !tl(lang,o.name).toLowerCase().includes(term) && !tl(lang,o.address).toLowerCase().includes(term)) return false
    if (province!=='all' && o.province.en !== province) return false
    if (district!=='all' && o.district.en !== district) return false
    return true
  }), [q, province, district, lang])

  return (
    <div className="container-page py-8">
      <PageHeader title={t('offices.title')} subtitle={t('offices.demoNotice')} />
      <div className="bg-info/10 border border-info/30 text-info rounded-lg p-3 mb-6 text-sm">{t('offices.demoNotice')}</div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div>
          <div className="bg-white border border-soft rounded-lg p-4 space-y-3 mb-4">
            <div>
              <label htmlFor="oq" className="block text-sm font-medium mb-1">{t('offices.search')}</label>
              <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input id="oq" value={q} onChange={e=>setQ(e.target.value)} className="w-full rounded-md border border-soft pl-9 pr-3 py-2" placeholder={t('offices.search')} /></div>
            </div>
            <div>
              <label htmlFor="prov" className="block text-sm font-medium mb-1">{t('offices.province')}</label>
              <select id="prov" value={province} onChange={e=>{setProvince(e.target.value); setDistrict('all')}} className="w-full rounded-md border border-soft px-3 py-2 bg-white">
                <option value="all">{t('services.all')}</option>
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="dist" className="block text-sm font-medium mb-1">{t('offices.district')}</label>
              <select id="dist" value={district} onChange={e=>setDistrict(e.target.value)} className="w-full rounded-md border border-soft px-3 py-2 bg-white">
                <option value="all">{t('services.all')}</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-3">
            {filtered.length===0 && <EmptyState title={t('offices.empty')} />}
            {filtered.map(o => (
              <article key={o.id} className="bg-white border border-soft rounded-lg p-4">
                <h3 className="font-semibold text-charcoal flex items-center gap-2"><MapPin size={16} className="text-teal"/> {tl(lang,o.name)}</h3>
                <p className="text-sm text-muted mt-1">{tl(lang,o.address)}</p>
                <p className="text-sm text-muted">{tl(lang,o.province)}, {tl(lang,o.district)}</p>
                {o.phone && <p className="text-sm text-muted mt-1 flex items-center gap-1"><Phone size={14}/> {o.phone}</p>}
                {o.hours && <p className="text-sm text-muted flex items-center gap-1"><Clock size={14}/> {tl(lang,o.hours)}</p>}
                {o.mapUrl && <a href={o.mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-2 text-sm text-teal font-medium hover:underline"><ExternalLink size={14}/> {t('offices.directions')}</a>}
              </article>
            ))}
          </div>
        </div>
        <div className="bg-white border border-soft rounded-lg p-4 min-h-[420px]">
          <h2 className="font-medium text-charcoal mb-2">Map (OpenStreetMap-ready)</h2>
          <div className="h-[360px] rounded-md bg-pale border border-soft flex items-center justify-center text-muted text-sm p-4 text-center">
            <div>
              <p>Map placeholder — integrate OpenStreetMap/Leaflet with office coordinates.</p>
              <p className="mt-2 text-xs">Demo coordinates available for listed offices. {t('offices.demoNotice')}</p>
            </div>
          </div>
          <ul className="mt-3 text-xs text-muted grid sm:grid-cols-2 gap-1">
            {filtered.map(o => <li key={o.id}>{tl(lang,o.name)}: {o.lat}, {o.lng}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
