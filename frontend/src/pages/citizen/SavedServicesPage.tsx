import { Link } from 'react-router-dom'
import { BookmarkX } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { services } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import { t as tl } from '@/utils/i18n'
import PageHeader from '@/components/common/PageHeader'
import EmptyState from '@/components/common/EmptyState'

export default function SavedServicesPage() {
  const { t, lang } = useI18n()
  const saved = useAppStore(s => s.savedServices)
  const toggle = useAppStore(s => s.toggleSavedService)
  const list = services.filter(s => saved.includes(s.id))
  return (
    <div>
      <PageHeader title={t('dashboard.saved')} />
      {list.length===0 ? <EmptyState title={t('services.empty')} description={t('services.save')} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {list.map(s => (
            <div key={s.id} className="bg-white border border-soft rounded-lg p-4 flex items-start justify-between gap-3">
              <div>
                <Link to={`/services/${s.id}`} className="font-semibold text-charcoal hover:text-teal">{tl(lang,s.title)}</Link>
                <p className="text-sm text-muted mt-1 line-clamp-2">{tl(lang,s.summary)}</p>
              </div>
              <button onClick={()=>toggle(s.id)} className="text-muted hover:text-error p-2" aria-label="Remove"><BookmarkX size={18}/></button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
