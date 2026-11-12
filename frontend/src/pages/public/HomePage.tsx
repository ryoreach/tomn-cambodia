import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, ShieldCheck, FileText, Languages, ListChecks, Newspaper } from 'lucide-react'
import * as Lucide from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import { categories, services } from '@/data/mockData'
import StatusBadge from '@/components/common/StatusBadge'

export default function HomePage() {
  const { t, lang } = useI18n()
  const [q, setQ] = useState('')
  const nav = useNavigate()
  const featured = services.filter(s => s.popular && s.status === 'published').slice(0, 3)
  const onSearch = (e: React.FormEvent) => { e.preventDefault(); nav(`/services?q=${encodeURIComponent(q)}`) }
  return (
    <div>
      <section className="bg-teal text-white">
        <div className="container-page py-16 lg:py-24 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">{t('home.heroTitle')}</h1>
            <p className="mt-4 text-white/90 text-lg max-w-xl">{t('home.heroDesc')}</p>
            <form onSubmit={onSearch} className="mt-8 flex flex-col sm:flex-row gap-2 max-w-xl" role="search">
              <label className="sr-only" htmlFor="hero-search">{t('home.searchPlaceholder')}</label>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input id="hero-search" value={q} onChange={e=>setQ(e.target.value)} className="w-full rounded-md border border-white/20 bg-white pl-10 pr-3 py-3 text-charcoal placeholder:text-muted" placeholder={t('home.searchPlaceholder')} />
              </div>
              <button className="rounded-md bg-white text-teal font-medium px-5 py-3 hover:bg-pale">{t('home.searchBtn')}</button>
            </form>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20">
            <div className="flex items-center gap-2 text-sm font-medium mb-3"><ShieldCheck size={18}/> {t('home.trustTitle')}</div>
            <p className="text-white/90 text-sm leading-relaxed">{t('home.trustDesc')}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              <li>• {t('service.sources')}</li>
              <li>• {t('service.lastVerified')}</li>
              <li>• {t('app.disclaimer')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold text-charcoal">{t('home.popularCategories')}</h2>
          <Link to="/services" className="text-teal text-sm font-medium inline-flex items-center gap-1">{t('common.viewAll')} <ArrowRight size={14}/></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(c => { const Icon = (Lucide as any)[c.icon] || FileText; return (
            <Link key={c.id} to={`/services?category=${c.id}`} className="bg-white border border-soft rounded-lg p-4 hover:border-teal/40 hover:shadow-sm transition">
              <Icon className="text-teal mb-2" size={22} />
              <div className="font-medium text-sm text-charcoal">{tl(lang,c.name)}</div>
            </Link>
          )})}
        </div>
      </section>

      <section className="bg-white border-y border-soft">
        <div className="container-page py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold text-charcoal">{t('home.featuredServices')}</h2>
            <Link to="/services" className="text-teal text-sm font-medium inline-flex items-center gap-1">{t('common.viewAll')} <ArrowRight size={14}/></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map(s => (
              <div key={s.id} className="border border-soft rounded-lg p-5 bg-ivory/40">
                <div className="flex items-center justify-between gap-2 mb-2"><span className="text-xs text-muted">{tl(lang, categories.find(c=>c.id===s.categoryId)?.name)}</span><StatusBadge status={s.verification} /></div>
                <h3 className="font-semibold text-charcoal mb-1">{tl(lang,s.title)}</h3>
                <p className="text-sm text-muted line-clamp-3">{tl(lang,s.summary)}</p>
                <Link to={`/services/${s.id}`} className="mt-4 inline-flex items-center text-teal text-sm font-medium">{t('services.view')} <ArrowRight size={14} className="ml-1"/></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-charcoal mb-6">{t('home.howItWorks')}</h2>
          <div className="space-y-4">
            {[{i:Search,t:t('how.s1t'),d:t('how.s1d')},{i:FileText,t:t('how.s2t'),d:t('how.s2d')},{i:ListChecks,t:t('how.s3t'),d:t('how.s3d')}].map((s,idx)=>(
              <div key={idx} className="flex gap-4 p-4 bg-white border border-soft rounded-lg">
                <div className="h-10 w-10 rounded-md bg-pale text-teal flex items-center justify-center shrink-0"><s.i size={18}/></div>
                <div><div className="font-medium text-charcoal">{idx+1}. {s.t}</div><p className="text-sm text-muted">{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-charcoal mb-6">{t('home.whyUse')}</h2>
          <div className="grid gap-4">
            {[{i:Languages,t:t('why.w1t'),d:t('why.w1d')},{i:FileText,t:t('why.w2t'),d:t('why.w2d')},{i:ShieldCheck,t:t('why.w3t'),d:t('why.w3d')}].map((w,idx)=>(
              <div key={idx} className="p-4 bg-white border border-soft rounded-lg flex gap-4"><w.i className="text-teal shrink-0" size={20}/><div><div className="font-medium text-charcoal">{w.t}</div><p className="text-sm text-muted">{w.d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pale/60 border-y border-soft">
        <div className="container-page py-12">
          <h2 className="text-2xl font-semibold text-charcoal mb-4 flex items-center gap-2"><Newspaper size={22} className="text-teal"/> {t('home.latest')}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[{t: lang==='km'?'ព័ត៌មានបង្ហាញ៖ ការធ្វើបច្ចុប្បន្នភាពមាតិកាសេវា':'Demo update: Service content refresh', d: lang==='km'?'មាតិកាគំរូត្រូវបានរៀបចំឡើងវិញដើម្បីភាពច្បាស់លាស់។':'Sample content reorganized for clarity.', date:'2026-11-10'},
              {t: lang==='km'?'ការណែនាំ៖ ពិនិត្យប្រភពជានិច្ច':'Reminder: Check sources', d: lang==='km'?'សូមផ្ទៀងផ្ទាត់ព័ត៌មានជាមួយស្ថាប័នពាក់ព័ន្ធ។':'Always verify details with the relevant authority.', date:'2026-11-05'},
              {t: lang==='km'?'មុខងារ៖ បញ្ជីឯកសារផ្ទាល់ខ្លួន':'Feature: Personal checklists', d: lang==='km'?'អ្នកអាចតាមដានឯកសារដែលត្រូវរៀបចំបាន។':'Track documents you need to prepare.', date:'2026-11-01'}].map((n,i)=>(
              <div key={i} className="bg-white border border-soft rounded-lg p-4"><div className="text-xs text-muted mb-1">{n.date}</div><div className="font-medium text-charcoal mb-1">{n.t}</div><p className="text-sm text-muted">{n.d}</p></div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-white border border-warning/30 rounded-lg text-sm text-charcoal"><strong className="text-warning">{t('home.trustTitle')}:</strong> {t('app.disclaimer')}</div>
        </div>
      </section>
    </div>
  )
}
