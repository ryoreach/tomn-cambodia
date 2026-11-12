import { useState } from 'react'
import { Send, Trash2, Bot, User, Sparkles } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { services } from '@/data/mockData'
import { t as tl } from '@/utils/i18n'

type Msg = { role: 'user' | 'assistant'; text: string; sources?: { label: string; url?: string }[] }

function mockAnswer(q: string, lang: 'km'|'en') {
  const term = q.toLowerCase()
  const hit = services.find(s => [s.title.en, s.title.km, s.summary.en, s.summary.km, s.id].some(v => term.includes(v.toLowerCase().split(' ')[0] || '___')))
  if (!hit) return { text: lang==='km'?'ព័ត៌មាននេះមិនមាននៅក្នុងប្រភពដែលបានអនុម័តទេ។ សូមទាក់ទងស្ថាប័នពាក់ព័ន្ធ។':'This information is not available in approved sources. Please contact the relevant authority.', sources: [] as any[] }
  const title = tl(lang, hit.title)
  const steps = hit.procedures.map(p => `${p.order}. ${tl(lang,p.title)}`).join(lang==='km' ? '។ ' : '; ')
  const docs = hit.documents.map(d => tl(lang,d.name)).join(', ')
  const text = lang==='km'
    ? `ផ្អែកលើព័ត៌មានដែលបានបោះពុម្ព៖ ${title}. នីតិវិធីទូទៅ៖ ${steps}។ ឯកសារដែលជាធម្មតាត្រូវរៀបចំ៖ ${docs}។ សូមផ្ទៀងផ្ទាត់ព័ត៌មានលម្អិតជាមួយស្ថាប័នពាក់ព័ន្ធ។`
    : `Based on approved published information: ${title}. General steps: ${steps}. Commonly required documents: ${docs}. Please verify details with the relevant authority.`
  return { text, sources: hit.sources.map(s => ({ label: tl(lang,s.label), url: s.url })) }
}

export default function AssistantPage() {
  const { t, lang } = useI18n()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', text: lang==='km'?'សួស្តី! ខ្ញុំអាចជួយអ្នកស្វែងរកព័ត៌មានសេវាសាធារណៈដែលបានបោះពុម្ព។':'Hello! I can help you navigate approved public service information.', sources: [] }
  ])
  const suggestions = lang==='km'
    ? ['តើត្រូវការឯកសារអ្វីខ្លះសម្រាប់សំបុត្រកំណើត?', 'នីតិវិធីសុំអាជ្ញាប័ណ្ណបើកបរមានអ្វីខ្លះ?', 'ខ្ញុំអាចរកការិយាល័យនៅភ្នំពេញបានឯណា?']
    : ['What documents are needed for a birth certificate?', 'What are the steps to apply for a driver license?', 'Where can I find an office in Phnom Penh?']

  const send = async (text: string) => {
    const q = text.trim()
    if (!q) return
    setMsgs(m => [...m, { role: 'user', text: q }])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const ans = mockAnswer(q, lang)
    setMsgs(m => [...m, { role: 'assistant', text: ans.text, sources: ans.sources }])
    setLoading(false)
  }

  return (
    <div className="container-page py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal flex items-center gap-2"><Sparkles className="text-teal"/> {t('assistant.title')}</h1>
        <p className="text-muted mt-1">{t('assistant.subtitle')}</p>
        <p className="text-xs text-warning mt-2">{t('assistant.disclaimer')}</p>
      </div>
      <div className="bg-white border border-soft rounded-lg overflow-hidden">
        <div className="p-4 border-b border-soft bg-pale/40">
          <div className="text-sm font-medium text-charcoal mb-2">{t('assistant.suggested')}</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s,i)=>(<button key={i} onClick={()=>send(s)} className="text-sm px-3 py-1.5 rounded-full border border-soft bg-white hover:border-teal/40">{s}</button>))}
          </div>
        </div>
        <div className="h-[420px] overflow-y-auto p-4 space-y-4" aria-live="polite">
          {msgs.map((m,i)=>(
            <div key={i} className={`flex gap-3 ${m.role==='user'?'justify-end':''}`}>
              {m.role==='assistant' && <div className="h-8 w-8 rounded-full bg-teal text-white flex items-center justify-center shrink-0"><Bot size={16}/></div>}
              <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${m.role==='user'?'bg-teal text-white':'bg-ivory border border-soft text-charcoal'}`}>
                <div className="whitespace-pre-wrap">{m.text}</div>
                {m.role==='assistant' && (
                  <div className="mt-2 pt-2 border-t border-soft/70 text-xs text-muted">
                    <div className="font-medium text-charcoal mb-1">{t('assistant.aiLabel')}</div>
                    {m.sources && m.sources.length > 0 && (
                      <div>
                        <span className="font-medium">{t('assistant.sources')}:</span>{' '}
                        {m.sources.map((s, idx) => (
                          <span key={idx}>
                            {idx > 0 ? ', ' : null}
                            {s.url ? <a className="text-teal hover:underline" href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {m.role==='user' && <div className="h-8 w-8 rounded-full bg-soft text-charcoal flex items-center justify-center shrink-0"><User size={16}/></div>}
            </div>
          ))}
          {loading && <div className="text-sm text-muted">{t('common.loading')}</div>}
        </div>
        <div className="p-3 border-t border-soft flex gap-2">
          <label htmlFor="chat" className="sr-only">{t('assistant.placeholder')}</label>
          <input id="chat" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter') send(input)}} className="flex-1 rounded-md border border-soft px-3 py-2" placeholder={t('assistant.placeholder')} />
          <button onClick={()=>send(input)} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal text-white font-medium hover:bg-teal/90 disabled:opacity-50"><Send size={16}/> {t('assistant.send')}</button>
          <button onClick={()=>setMsgs([])} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-soft hover:bg-pale" title={t('assistant.clear')}><Trash2 size={16}/></button>
        </div>
      </div>
    </div>
  )
}
