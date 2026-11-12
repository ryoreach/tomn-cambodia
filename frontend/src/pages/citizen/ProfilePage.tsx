import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'
import PageHeader from '@/components/common/PageHeader'

export default function ProfilePage() {
  const { t, lang } = useI18n()
  const user = useAppStore(s => s.user)
  return (
    <div>
      <PageHeader title={t('dashboard.profile')} />
      <div className="bg-white border border-soft rounded-lg p-6 max-w-xl">
        <dl className="space-y-4 text-sm">
          <div><dt className="text-muted">{t('auth.fullName')}</dt><dd className="font-medium text-charcoal text-base">{user?.name}</dd></div>
          <div><dt className="text-muted">{t('auth.email')}</dt><dd className="font-medium text-charcoal">{user?.email}</dd></div>
          <div><dt className="text-muted">Role</dt><dd className="font-medium text-charcoal capitalize">{user?.role}</dd></div>
          <div><dt className="text-muted">Status</dt><dd className="font-medium text-charcoal capitalize">{user?.status}</dd></div>
        </dl>
        <p className="mt-6 text-xs text-muted">{lang==='km'?'នេះជាការបង្ហាញគណនីក្នុងเครื่อง (demo)។ ការគ្រប់គ្រងសុវត្ថិភាពពិតប្រាកដនឹងធ្វើនៅម៉ាស៊ីនមេ។':'This is a local demo profile. Real security and authorization will be enforced server-side.'}</p>
      </div>
    </div>
  )
}
