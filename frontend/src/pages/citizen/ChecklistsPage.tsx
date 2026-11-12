import { useState } from 'react'
import { Plus, Trash2, CheckSquare } from 'lucide-react'
import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'
import PageHeader from '@/components/common/PageHeader'
import EmptyState from '@/components/common/EmptyState'
import Modal from '@/components/common/Modal'
import type { Checklist } from '@/types'

export default function ChecklistsPage() {
  const { t, lang } = useI18n()
  const checklists = useAppStore(s => s.checklists)
  const upsert = useAppStore(s => s.upsertChecklist)
  const del = useAppStore(s => s.deleteChecklist)
  const pushToast = useAppStore(s => s.pushToast)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const [newTitle, setNewTitle] = useState('')
  const [newItem, setNewItem] = useState<Record<string,string>>({})

  const create = () => {
    const title = newTitle.trim() || (lang==='km'?'បញ្ជីឯកសារថ្មី':'New checklist')
    const c: Checklist = { id: `chk-${Date.now()}`, title, items: [], updatedAt: new Date().toISOString() }
    upsert(c); setNewTitle(''); pushToast({type:'success', message: t('common.success')})
  }
  const toggleItem = (c: Checklist, itemId: string) => {
    upsert({ ...c, updatedAt: new Date().toISOString(), items: c.items.map(i => i.id===itemId?{...i, done: !i.done}:i) })
  }
  const addItem = (c: Checklist) => {
    const label = (newItem[c.id]||'').trim()
    if (!label) return
    upsert({ ...c, updatedAt: new Date().toISOString(), items: [...c.items, { id: `i-${Date.now()}`, label, done: false }] })
    setNewItem(p => ({ ...p, [c.id]: '' }))
  }
  const removeItem = (c: Checklist, itemId: string) => {
    upsert({ ...c, updatedAt: new Date().toISOString(), items: c.items.filter(i => i.id !== itemId) })
  }

  return (
    <div>
      <PageHeader title={t('checklist.title')} actions={<div className="flex gap-2"><input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder={lang==='km'?'ចំណងជើងបញ្ជី':'Checklist title'} className="rounded-md border border-soft px-3 py-2 text-sm" /><button onClick={create} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-teal text-white text-sm font-medium"><Plus size={16}/> {t('checklist.create')}</button></div>} />
      {checklists.length===0 ? <EmptyState title={t('checklist.empty')} /> : (
        <div className="grid gap-4 lg:grid-cols-2">
          {checklists.map(c => {
            const done = c.items.filter(i=>i.done).length
            const pct = c.items.length ? Math.round(done/c.items.length*100) : 0
            return (
              <section key={c.id} className="bg-white border border-soft rounded-lg p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal flex items-center gap-2"><CheckSquare size={16} className="text-teal"/> {c.title}</h3>
                    <p className="text-xs text-muted mt-1">{t('checklist.progress')}: {done}/{c.items.length} ({pct}%)</p>
                  </div>
                  <button onClick={()=>setConfirmId(c.id)} className="text-muted hover:text-error p-1" aria-label={t('checklist.delete')}><Trash2 size={16}/></button>
                </div>
                <div className="h-2 bg-soft rounded-full overflow-hidden mb-4"><div className="h-full bg-teal transition-all" style={{width:`${pct}%`}}/></div>
                <ul className="space-y-2 mb-4">
                  {c.items.map(i => (
                    <li key={i.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={i.done} onChange={()=>toggleItem(c,i.id)} className="h-4 w-4 accent-teal" />
                      <span className={`flex-1 ${i.done?'line-through text-muted':'text-charcoal'}`}>{i.label}</span>
                      <button onClick={()=>removeItem(c,i.id)} className="text-muted hover:text-error" aria-label="Remove">×</button>
                    </li>
                  ))}
                  {c.items.length===0 && <li className="text-sm text-muted">{t('services.empty')}</li>}
                </ul>
                <div className="flex gap-2">
                  <input value={newItem[c.id]||''} onChange={e=>setNewItem(p=>({...p,[c.id]:e.target.value}))} onKeyDown={e=>{if(e.key==='Enter') addItem(c)}} placeholder={t('checklist.addItem')} className="flex-1 rounded-md border border-soft px-3 py-2 text-sm" />
                  <button onClick={()=>addItem(c)} className="px-3 py-2 rounded-md border border-soft text-sm hover:bg-pale">{t('checklist.addItem')}</button>
                </div>
              </section>
            )
          })}
        </div>
      )}
      <Modal open={!!confirmId} title={t('checklist.delete')} onClose={()=>setConfirmId(null)}>
        <p className="text-sm text-muted mb-4">{t('checklist.confirmDelete')}</p>
        <div className="flex justify-end gap-2">
          <button onClick={()=>setConfirmId(null)} className="px-3 py-2 rounded-md border border-soft">{t('common.cancel')}</button>
          <button onClick={()=>{ if(confirmId){del(confirmId); pushToast({type:'success',message:t('common.success')});} setConfirmId(null)}} className="px-3 py-2 rounded-md bg-error text-white">{t('common.confirm')}</button>
        </div>
      </Modal>
    </div>
  )
}
