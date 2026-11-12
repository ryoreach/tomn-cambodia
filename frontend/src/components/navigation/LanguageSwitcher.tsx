import { useI18n } from '@/contexts/I18nContext'
export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="inline-flex rounded-md border border-soft overflow-hidden" role="group" aria-label="Language">
      {(['km','en'] as const).map(l => (
        <button key={l} onClick={() => setLang(l)} className={`px-2.5 py-1 text-sm font-medium ${lang===l?'bg-teal text-white':'bg-white text-charcoal hover:bg-pale'}`} aria-pressed={lang===l}>
          {l === 'km' ? 'ខ្មែរ' : 'EN'}
        </button>
      ))}
    </div>
  )
}
