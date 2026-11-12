import { createContext, useContext, useMemo } from 'react'
import km from '@/locales/km.json'
import en from '@/locales/en.json'
import { useAppStore } from '@/store/useAppStore'
import type { Lang } from '@/types'

type Dict = typeof km
const dicts: Record<Lang, Dict> = { km, en }

function get(obj: any, path: string): string {
  return path.split('.').reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), obj) ?? path
}

const Ctx = createContext<{ lang: Lang; t: (key: string) => string; setLang: (l: Lang) => void } | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const lang = useAppStore(s => s.lang)
  const setLang = useAppStore(s => s.setLang)
  const value = useMemo(() => ({ lang, setLang, t: (key: string) => get(dicts[lang], key) }), [lang, setLang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
