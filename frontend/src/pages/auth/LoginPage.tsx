import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'
import { users } from '@/data/mockData'

const schema = z.object({ email: z.string().email(), password: z.string().min(4), remember: z.boolean().optional() })

type Form = z.infer<typeof schema>

export default function LoginPage() {
  const { t } = useI18n()
  const login = useAppStore(s => s.login)
  const pushToast = useAppStore(s => s.pushToast)
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: Form) => {
    await new Promise(r=>setTimeout(r,400))
    const found = users.find(u => u.email.toLowerCase() === data.email.toLowerCase()) || users[0]
    const u = { ...found, email: data.email }
    login(u)
    pushToast({ type:'success', message: t('auth.loginSuccess') })
    nav(u.role === 'citizen' ? '/dashboard' : '/admin')
  }
  return (
    <div className="container-page py-12 max-w-md">
      <div className="bg-white border border-soft rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-charcoal mb-1">{t('auth.login')}</h1>
        <p className="text-sm text-muted mb-6">Demo authentication (no real backend). Try admin@tomn.local for admin view.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">{t('auth.email')}</label>
            <input id="email" type="email" {...register('email')} className="w-full rounded-md border border-soft px-3 py-2" />
            {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">{t('auth.password')}</label>
            <input id="password" type="password" {...register('password')} className="w-full rounded-md border border-soft px-3 py-2" />
            {errors.password && <p className="text-sm text-error mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" {...register('remember')} /> {t('auth.remember')}</label>
            <a href="#" className="text-teal hover:underline">{t('auth.forgot')}</a>
          </div>
          <button disabled={isSubmitting} className="w-full rounded-md bg-teal text-white py-2.5 font-medium hover:bg-teal/90 disabled:opacity-50">{t('auth.login')}</button>
        </form>
        <p className="text-sm text-muted mt-4">{t('auth.noAccount')} <Link to="/register" className="text-teal font-medium hover:underline">{t('auth.register')}</Link></p>
      </div>
    </div>
  )
}
