import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter } from 'lucide-react'
import { services, categories, authorities } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import EmptyState from '@/components/common/EmptyState'

export default function ServiceDirectoryPage() {
  const { t, lang } = useI18n()
  const [sp, setSp] = useSearchParams()
  const [q, setQ] = useState(sp.get('q') || '')
  const [cat, setCat] = useState(sp.get('category') || 'all')
  const [auth, setAuth] = useState('all')
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)
  const pageSize = 6

  const filtered = useMemo(() => {
    let list = services.filter(s => s.status === 'published' || s.status === 'in_review' || s.status === 'draft')
    // show all in directory but label status; emphasize published
    list = services.slice()
    const term = q.trim().toLowerCase()
    if (term) list = list.filter(s => tl(lang,s.title).toLowerCase().includes(term) || tl(lang,s.summary).toLowerCase().includes(term))
    if (cat !== 'all') list = list.filter(s => s.categoryId === cat)
    if (auth !== 'all') list = list.filter(s => s.authorityId === auth)
    if (sort === 'name') list = [...list].sort((a,b)=>tl(lang,a.title).localeCompare(tl(lang,b.title)))
    if (sort === 'status') list = [...list].sort((a,b)=>a.status.localeCompare(b.status))
    return list
  }, [q, cat, auth, sort, lang])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize)

  const apply = (e: React.FormEvent) => { e.preventDefault(); setPage(1); const next: any = {}; if (q) next.q=q; if (cat!=='all') next.category=cat; setSp(next) }

  return (
    <div className="container-page py-8">
      <PageHeader title={t('services.title')} subtitle={t('home.heroDesc')} />
      <form onSubmit={apply} className="bg-white border border-soft rounded-lg p-4 mb-6 grid gap-3 md:grid-cols-[1fr_180px_220px_160px_auto] items-end">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1" htmlFor="q">{t('services.search')}</label>
          <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input id="q" value={q} onChange={e=>setQ(e.target.value)} className="w-full rounded-md border border-soft pl-9 pr-3 py-2" placeholder={t('services.search')} /></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1" htmlFor="cat">{t('services.category')}</label>
          <select id="cat" value={cat} onChange={e=>{setCat(e.target.value);setPage(1)}} className="w-full rounded-md border border-soft px-3 py-2 bg-white">
            <option value="all">{t('services.all')}</option>
            {categories.map(c => <option key={c.id} value={c.id}>{tl(lang,c.name)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1" htmlFor="auth">{t('services.authority')}</label>
          <select id="auth" value={auth} onChange={e=>{setAuth(e.target.value);setPage(1)}} className="w-full rounded-md border border-soft px-3 py-2 bg-white">
            <option value="all">{t('services.all')}</option>
            {authorities.map(a => <option key={a.id} value={a.id}>{tl(lang,a.name)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal mb-1" htmlFor="sort">{t('services.sort')}</label>
          <select id="sort" value={sort} onChange={e=>setSort(e.target.value)} className="w-full rounded-md border border-soft px-3 py-2 bg-white">
            <option value="name">Name</option>
            <option value="status">Status</option>
          </select>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-md bg-teal text-white px-4 py-2 font-medium hover:bg-teal/90"><Filter size={16}/> {t('common.save').replace('Save','Apply') || 'Apply'}</button>
      </form>

      {pageItems.length === 0 ? <EmptyState title={t('services.empty')} description={t('common.retry')} /> : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pageItems.map(s => (
            <article key={s.id} className="bg-white border border-soft rounded-lg p-5 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs text-muted">{tl(lang, categories.find(c=>c.id===s.categoryId)?.name)}</span>
                <div className="flex gap-1"><StatusBadge status={s.status} /><StatusBadge status={s.verification} /></div>
              </div>
              <h3 className="font-semibold text-charcoal mb-1">{tl(lang,s.title)}</h3>
              <p className="text-sm text-muted flex-1 line-clamp-3">{tl(lang,s.summary)}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted">{tl(lang, authorities.find(a=>a.id===s.authorityId)?.name)}</span>
                <Link to={`/services/${s.id}`} className="text-teal text-sm font-medium hover:underline">{t('services.view')}</Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1.5 rounded border border-soft bg-white disabled:opacity-50">{t('common.back')}</button>
          <span className="text-sm text-muted">{page} / {totalPages}</span>
          <button disabled={page===totalPages} onClick={()=>setPage(p=>p+1)} className="px-3 py-1.5 rounded border border-soft bg-white disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  )
}
