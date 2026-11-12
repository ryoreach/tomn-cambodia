import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, Bookmark, CheckSquare, User, LogOut } from 'lucide-react'
import PublicHeader from '@/components/navigation/PublicHeader'
import Footer from '@/components/navigation/Footer'
import Toasts from '@/components/common/Toasts'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/contexts/I18nContext'

export default function CitizenLayout() {
  const user = useAppStore(s => s.user)
  const logout = useAppStore(s => s.logout)
  const { t } = useI18n()
  if (!user) return <Navigate to="/login" replace />
  const items = [
    { to: '/dashboard', icon: LayoutDashboard, label: t('dashboard.title'), end: true },
    { to: '/dashboard/saved-services', icon: Bookmark, label: t('dashboard.saved') },
    { to: '/dashboard/checklists', icon: CheckSquare, label: t('dashboard.checklists') },
    { to: '/dashboard/profile', icon: User, label: t('dashboard.profile') },
  ]
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <PublicHeader />
      <div className="container-page flex-1 py-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="bg-white border border-soft rounded-lg p-3 h-fit">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto" aria-label="Dashboard">
            {items.map(i => (
              <NavLink key={i.to} to={i.to} end={i.end} className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap ${isActive?'bg-pale text-teal':'text-charcoal hover:bg-pale'}`}>
                <i.icon size={16} /> {i.label}
              </NavLink>
            ))}
            <button onClick={logout} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-charcoal hover:bg-pale"><LogOut size={16}/> {t('nav.logout')}</button>
          </nav>
        </aside>
        <main><Outlet /></main>
      </div>
      <Footer />
      <Toasts />
    </div>
  )
}
