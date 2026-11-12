import { Link } from 'react-router-dom'
import { useI18n } from '@/contexts/I18nContext'
export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-soft bg-white mt-12 no-print">
      <div className="container-page py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2 font-semibold text-teal mb-2"><span className="inline-flex h-7 w-7 items-center justify-center rounded bg-teal text-white text-xs">ត</span> TOMN</div>
          <p className="text-muted">{t('app.tagline')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-charcoal mb-2">TOMN</h4>
          <ul className="space-y-1 text-muted">
            <li><Link to="/services" className="hover:text-teal">{t('nav.services')}</Link></li>
            <li><Link to="/offices" className="hover:text-teal">{t('nav.offices')}</Link></li>
            <li><Link to="/assistant" className="hover:text-teal">{t('nav.assistant')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-charcoal mb-2">{t('footer.contact')}</h4>
          <ul className="space-y-1 text-muted">
            <li>info@tomn.example (demo)</li>
            <li>Phnom Penh, Cambodia</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-charcoal mb-2">{t('footer.about')}</h4>
          <ul className="space-y-1 text-muted">
            <li><a className="hover:text-teal" href="#">{t('footer.privacy')}</a></li>
            <li><a className="hover:text-teal" href="#">{t('footer.terms')}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-soft">
        <div className="container-page py-4 text-xs text-muted flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t('app.disclaimer')}</p>
          <p>© 2026 TOMN</p>
        </div>
      </div>
    </footer>
  )
}
