import type { Lang, LocalizedString } from '@/types'
export const t = (lang: Lang, obj: LocalizedString | string | undefined): string => {
  if (!obj) return ''
  if (typeof obj === 'string') return obj
  return obj[lang] || obj.en || obj.km || ''
}
