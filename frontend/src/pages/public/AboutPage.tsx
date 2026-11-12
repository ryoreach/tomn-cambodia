import { useI18n } from '@/contexts/I18nContext'
export default function AboutPage() {
  const { lang } = useI18n()
  return (
    <div className="container-page py-12 max-w-3xl">
      <h1 className="text-3xl font-semibold text-charcoal mb-4">{lang==='km'?'អំពីតំណ (TOMN)':'About TOMN'}</h1>
      <p className="text-muted mb-4">{lang==='km'?'តំណ (TOMN) គឺជាវេទិកាព័ត៌មានសាធារណៈឯករាជ្យ ដែលជួយប្រជាពលរដ្ឋកម្ពុជាស្វែងរកព័ត៌មានសេវា យល់ដឹងនីតិវិធី និងរៀបចំឯកសារ។':'TOMN is an independent public information and service navigation platform helping Cambodian citizens discover services, understand procedures, and prepare documents.'}</p>
      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 text-sm text-charcoal">
        {lang==='km'?'តំណមិនមែនជាអាជ្ញាធររដ្ឋាភិបាលទេ ហើយមិនជំនួសសេវាផ្លូវការរដ្ឋាភិបាលឡើយ។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានសំខាន់ៗជាមួយស្ថាប័នពាក់ព័ន្ធ។':'TOMN is not a government authority and does not replace official government services. Please verify important information with the relevant authority.'}
      </div>
    </div>
  )
}
