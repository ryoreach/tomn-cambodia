import { Link } from 'react-router-dom'
import { Bookmark, CheckSquare, ArrowRight, Clock } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'
import { services } from '@/data/mockData'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'

export default function DashboardPage() {
  const { t, lang } = useI18n()
  const user = useAppStore(s => s.user)
  const saved = useAppStore(s => s.savedServices)
  const checklists = useAppStore(s => s.checklists)
  const savedList = services.filter(s => saved.includes(s.id))
  const recent = [
    { text: lang==='km'?'បានចូលគណនី':'Logged in', time: 'Today' },
    ...checklists.slice(0,2).map(c => ({ text: `${lang==='km'?'បានធ្វើបច្ចុប្បន្នភាព':'Updated'}: ${c.title}`, time: new Date(c.updatedAt).toLocaleDateString() })),
  ].slice(0,4)
  return (
    <div>
      <PageHeader title={`${t('dashboard.welcome')}, ${user?.name || ''}`} subtitle={t('dashboard.title')} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="bg-white border border-soft rounded-lg p-5"><div className="flex items-center justify-between"><span className="text-muted text-sm">{t('dashboard.saved')}</span><Bookmark className="text-teal" size={18}/></div><div className="text-2xl font-semibold text-charcoal mt-2">{savedList.length}</div></div>
        <div className="bg-white border border-soft rounded-lg p-5"><div className="flex items-center justify-between"><span className="text-muted text-sm">{t('dashboard.checklists')}</span><CheckSquare className="text-teal" size={18}/></div><div className="text-2xl font-semibold text-charcoal mt-2">{checklists.length}</div></div>
        <div className="bg-white border border-soft rounded-lg p-5"><div className="text-muted text-sm">{t('dashboard.profile')}</div><div className="font-medium text-charcoal mt-2">{user?.email}</div><div className="text-sm text-muted capitalize">{user?.role}</div></div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="bg-white border border-soft rounded-lg p-5">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold text-charcoal">{t('dashboard.saved')}</h2><Link to="/dashboard/saved-services" className="text-sm text-teal inline-flex items-center gap-1">{t('common.viewAll')} <ArrowRight size={14}/></Link></div>
          {savedList.length===0 ? <p className="text-sm text-muted">{t('services.empty')}</p> : (
            <ul className="space-y-2">{savedList.slice(0,4).map(s => <li key={s.id} className="flex items-center justify-between gap-2 p-2 rounded hover:bg-pale"><Link to={`/services/${s.id}`} className="text-sm font-medium text-charcoal hover:text-teal">{tl(lang,s.title)}</Link></li>)}</ul>
          )}
        </section>
        <section className="bg-white border border-soft rounded-lg p-5">
          <div className="flex items-center justify-between mb-3"><h2 className="font-semibold text-charcoal">{t('dashboard.checklists')}</h2><Link to="/dashboard/checklists" className="text-sm text-teal inline-flex items-center gap-1">{t('common.viewAll')} <ArrowRight size={14}/></Link></div>
          {checklists.length===0 ? <p className="text-sm text-muted">{t('checklist.empty')}</p> : (
            <ul className="space-y-3">{checklists.slice(0,4).map(c => { const done=c.items.filter(i=>i.done).length; const pct=c.items.length?Math.round(done/c.items.length*100):0; return (
              <li key={c.id}><div className="flex justify-between text-sm mb-1"><span className="font-medium text-charcoal">{c.title}</span><span className="text-muted">{pct}%</span></div><div className="h-2 bg-soft rounded-full overflow-hidden"><div className="h-full bg-teal" style={{width:`${pct}%`}}/></div></li>
            )})}</ul>
          )}
        </section>
        <section className="bg-white border border-soft rounded-lg p-5 lg:col-span-2">
          <h2 className="font-semibold text-charcoal mb-3 flex items-center gap-2"><Clock size={16} className="text-teal"/> {t('dashboard.activity')}</h2>
          <ul className="grid sm:grid-cols-2 gap-2">{recent.map((r,i)=>(<li key={i} className="text-sm p-3 rounded bg-ivory border border-soft flex justify-between"><span>{r.text}</span><span className="text-muted">{r.time}</span></li>))}</ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/services" className="px-3 py-2 rounded-md bg-teal text-white text-sm font-medium">{t('nav.services')}</Link>
            <Link to="/dashboard/checklists" className="px-3 py-2 rounded-md border border-soft text-sm font-medium hover:bg-pale">{t('checklist.create')}</Link>
            <Link to="/assistant" className="px-3 py-2 rounded-md border border-soft text-sm font-medium hover:bg-pale">{t('nav.assistant')}</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
