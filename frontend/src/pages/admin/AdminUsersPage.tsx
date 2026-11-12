import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { users } from '@/data/mockData'
import { useI18n } from '@/contexts/I18nContext'
import PageHeader from '@/components/common/PageHeader'
import StatusBadge from '@/components/common/StatusBadge'
import Modal from '@/components/common/Modal'
import type { User } from '@/types'

export default function AdminUsersPage() {
  const { t } = useI18n()
  const [q, setQ] = useState('')
  const [role, setRole] = useState('all')
  const [selected, setSelected] = useState<User | null>(null)
  const filtered = useMemo(() => users.filter(u => {
    if (q && !(`${u.name} ${u.email}`).toLowerCase().includes(q.toLowerCase())) return false
    if (role !== 'all' && u.role !== role) return false
    return true
  }), [q, role])
  return (
    <div>
      <PageHeader title={t('admin.users')} subtitle="Mock user listing — roles displayed for demo; enforce authorization server-side." />
      <div className="bg-white border border-soft rounded-lg p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users" className="w-full rounded-md border border-soft pl-9 pr-3 py-2" /></div>
        <select value={role} onChange={e=>setRole(e.target.value)} className="rounded-md border border-soft px-3 py-2 bg-white"><option value="all">All roles</option>{['citizen','editor','reviewer','admin'].map(r=><option key={r} value={r}>{r}</option>)}</select>
      </div>
      <div className="bg-white border border-soft rounded-lg overflow-x-auto">
        <table className="w-full text-sm"><thead className="bg-pale/50 text-left"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Action</th></tr></thead>
        <tbody className="divide-y divide-soft">{filtered.map(u => (
          <tr key={u.id} className="hover:bg-ivory/50"><td className="px-4 py-3 font-medium text-charcoal">{u.name}</td><td className="px-4 py-3 text-muted">{u.email}</td><td className="px-4 py-3 capitalize">{u.role}</td><td className="px-4 py-3"><StatusBadge status={u.status}/></td><td className="px-4 py-3 text-right"><button onClick={()=>setSelected(u)} className="text-teal font-medium hover:underline">View</button></td></tr>
        ))}{filtered.length===0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">No users found.</td></tr>}</tbody></table>
      </div>
      <Modal open={!!selected} title="User details" onClose={()=>setSelected(null)}>
        {selected && <dl className="space-y-2 text-sm"><div><dt className="text-muted">Name</dt><dd className="font-medium">{selected.name}</dd></div><div><dt className="text-muted">Email</dt><dd>{selected.email}</dd></div><div><dt className="text-muted">Role</dt><dd className="capitalize">{selected.role}</dd></div><div><dt className="text-muted">Status</dt><dd className="capitalize">{selected.status}</dd></div><p className="text-xs text-muted pt-2">Demo only. Client-side role display is not a security control.</p></dl>}
      </Modal>
    </div>
  )
}
