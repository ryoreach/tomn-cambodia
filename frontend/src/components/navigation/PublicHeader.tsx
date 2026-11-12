import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'

export default function PublicHeader() {
  const { t } = useI18n()
  const user = useAppStore(s => s.user)
  const logout = useAppStore(s => s.logout)
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const linkClass = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-teal bg-pale' : 'text-charcoal hover:text-teal'}`
  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/offices', label: t('nav.offices') },
    { to: '/assistant', label: t('nav.assistant') },
  ]
  return (
    <header className="sticky top-0 z-30 border-b border-soft bg-white/95 backdrop-blur no-print">
      <div className="container-page h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-teal">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal text-white text-sm">ត</span>
          <span className="text-lg">TOMN</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {links.map(l => <NavLink key={l.to} to={l.to} className={linkClass} end={l.to==='/'}>{l.label}</NavLink>)}
          <NavLink to="/about" className={linkClass}>{t('nav.about') || 'About'}</NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link to={user.role === 'citizen' ? '/dashboard' : '/admin'} className="px-3 py-2 text-sm font-medium text-teal hover:bg-pale rounded-md">{user.role==='citizen'?t('nav.dashboard'):t('nav.admin')}</Link>
              <button onClick={() => { logout(); nav('/') }} className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-pale rounded-md">{t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-pale rounded-md">{t('nav.login')}</Link>
              <Link to="/register" className="px-3 py-2 text-sm font-medium rounded-md bg-teal text-white hover:bg-teal/90">{t('nav.register')}</Link>
            </>
          )}
        </div>
        <button className="md:hidden p-2 rounded-md hover:bg-pale" onClick={() => setOpen(o=>!o)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-soft bg-white">
          <div className="container-page py-3 flex flex-col gap-1">
            {links.map(l => <NavLink key={l.to} to={l.to} onClick={()=>setOpen(false)} className={linkClass} end={l.to==='/'}>{l.label}</NavLink>)}
            <NavLink to="/about" onClick={()=>setOpen(false)} className={linkClass}>{t('nav.about') || 'About'}</NavLink>
            <div className="pt-2 flex items-center gap-2"><LanguageSwitcher /></div>
            <div className="pt-2 flex gap-2">
              {user ? (
                <>
                  <Link to={user.role==='citizen'?'/dashboard':'/admin'} onClick={()=>setOpen(false)} className="flex-1 text-center px-3 py-2 rounded-md border border-soft">{user.role==='citizen'?t('nav.dashboard'):t('nav.admin')}</Link>
                  <button onClick={()=>{logout();setOpen(false);nav('/')}} className="flex-1 px-3 py-2 rounded-md bg-teal text-white">{t('nav.logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={()=>setOpen(false)} className="flex-1 text-center px-3 py-2 rounded-md border border-soft">{t('nav.login')}</Link>
                  <Link to="/register" onClick={()=>setOpen(false)} className="flex-1 text-center px-3 py-2 rounded-md bg-teal text-white">{t('nav.register')}</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
