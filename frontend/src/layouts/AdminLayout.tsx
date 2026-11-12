import { NavLink, Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, FileText, ClipboardCheck, Users, ScrollText, ArrowLeft } from 'lucide-react'
import Toasts from '@/components/common/Toasts'
import { useAppStore } from '@/store/useAppStore'
import { useI18n } from '@/contexts/I18nContext'
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher'

export default function AdminLayout() {
  const user = useAppStore(s => s.user)
  const logout = useAppStore(s => s.logout)
  const { t } = useI18n()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'citizen') return <Navigate to="/dashboard" replace />
  const items = [
    { to: '/admin', icon: LayoutDashboard, label: t('admin.dashboard'), end: true },
    { to: '/admin/services', icon: FileText, label: t('admin.services') },
    { to: '/admin/reviews', icon: ClipboardCheck, label: t('admin.reviews') },
    { to: '/admin/users', icon: Users, label: t('admin.users') },
    { to: '/admin/audit-logs', icon: ScrollText, label: t('admin.audit') },
  ]
  return (
    <div className="min-h-screen bg-ivory flex">
      <aside className="w-64 bg-white border-r border-soft p-4 hidden md:flex flex-col">
        <div className="flex items-center gap-2 font-semibold text-teal mb-6"><span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal text-white text-sm">ត</span> TOMN Admin</div>
        <nav className="flex-1 space-y-1" aria-label="Admin">
          {items.map(i => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${isActive?'bg-pale text-teal':'text-charcoal hover:bg-pale'}`}>
              <i.icon size={16}/> {i.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/" className="flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-charcoal"><ArrowLeft size={16}/> {t('nav.home')}</NavLink>
        <button onClick={logout} className="mt-1 px-3 py-2 text-sm text-left text-charcoal hover:bg-pale rounded-md">{t('nav.logout')}</button>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-soft flex items-center justify-between px-4 md:px-6">
          <div className="md:hidden font-semibold text-teal">TOMN Admin</div>
          <div className="ml-auto flex items-center gap-3"><LanguageSwitcher /><span className="text-sm text-muted hidden sm:inline">{user.name}</span></div>
        </header>
        <nav className="md:hidden bg-white border-b border-soft px-2 py-2 flex gap-1 overflow-x-auto">
          {items.map(i => <NavLink key={i.to} to={i.to} end={i.end} className={({isActive})=>`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${isActive?'bg-pale text-teal':'text-charcoal'}`}>{i.label}</NavLink>)}
        </nav>
        <main className="flex-1 p-4 md:p-6"><Outlet /></main>
      </div>
      <Toasts />
    </div>
  )
}
