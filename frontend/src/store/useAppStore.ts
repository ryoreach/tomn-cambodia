import { create } from 'zustand'
import type { Lang, User, Checklist } from '@/types'
import { load, save, remove } from '@/utils/storage'

interface AppState {
  lang: Lang
  setLang: (l: Lang) => void
  user: User | null
  login: (u: User) => void
  logout: () => void
  savedServices: string[]
  toggleSavedService: (id: string) => void
  checklists: Checklist[]
  upsertChecklist: (c: Checklist) => void
  deleteChecklist: (id: string) => void
  toasts: { id: string; type: 'success' | 'error' | 'info'; message: string }[]
  pushToast: (t: { type: 'success' | 'error' | 'info'; message: string }) => void
  removeToast: (id: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  lang: load<Lang>('tomn_lang', 'km'),
  setLang: (l) => { save('tomn_lang', l); document.documentElement.lang = l; set({ lang: l }) },
  user: load<User | null>('tomn_user', null),
  login: (u) => { save('tomn_user', u); set({ user: u }) },
  logout: () => { remove('tomn_user'); set({ user: null }) },
  savedServices: load<string[]>('tomn_saved', []),
  toggleSavedService: (id) => {
    const cur = get().savedServices
    const next = cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]
    save('tomn_saved', next); set({ savedServices: next })
  },
  checklists: load<Checklist[]>('tomn_checklists', []),
  upsertChecklist: (c) => {
    const cur = get().checklists
    const idx = cur.findIndex(x => x.id === c.id)
    const next = idx >= 0 ? cur.map(x => x.id === c.id ? c : x) : [c, ...cur]
    save('tomn_checklists', next); set({ checklists: next })
  },
  deleteChecklist: (id) => {
    const next = get().checklists.filter(c => c.id !== id)
    save('tomn_checklists', next); set({ checklists: next })
  },
  toasts: [],
  pushToast: (t) => {
    const id = Math.random().toString(36).slice(2)
    set(s => ({ toasts: [...s.toasts, { id, ...t }] }))
    setTimeout(() => get().removeToast(id), 3500)
  },
  removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}))
