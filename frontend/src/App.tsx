import { useEffect } from 'react'
import AppRoutes from '@/routes/AppRoutes'
import { I18nProvider } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'

export default function App() {
  const lang = useAppStore(s => s.lang)
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return (
    <I18nProvider>
      <AppRoutes />
    </I18nProvider>
  )
}
