import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '@/contexts/I18nContext'
import { useAppStore } from '@/store/useAppStore'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirm: z.string().min(6),
  terms: z.literal(true, { message: 'Required' }),
}).refine(d => d.password === d.confirm, { path: ['confirm'], message: 'Passwords do not match' })

type Form = z.infer<typeof schema>

export default function RegisterPage() {
  const { t } = useI18n()
  const login = useAppStore(s => s.login)
  const pushToast = useAppStore(s => s.pushToast)
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })
  const onSubmit = async (data: Form) => {
    await new Promise(r=>setTimeout(r,400))
    login({ id: `u-${Date.now()}`, name: data.name, email: data.email, role: 'citizen', status: 'active' })
    pushToast({ type:'success', message: t('auth.registerSuccess') })
    nav('/dashboard')
  }
  return (
    <div className="container-page py-12 max-w-md">
      <div className="bg-white border border-soft rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-charcoal mb-1">{t('auth.register')}</h1>
        <p className="text-sm text-muted mb-6">Demo registration (local only).</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">{t('auth.fullName')}</label>
            <input id="name" {...register('name')} className="w-full rounded-md border border-soft px-3 py-2" />
            {errors.name && <p className="text-sm text-error mt-1">{errors.name.message}</p>}
          </div>
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
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1">{t('auth.confirmPassword')}</label>
            <input id="confirm" type="password" {...register('confirm')} className="w-full rounded-md border border-soft px-3 py-2" />
            {errors.confirm && <p className="text-sm text-error mt-1">{errors.confirm.message}</p>}
          </div>
          <label className="flex items-start gap-2 text-sm"><input type="checkbox" {...register('terms')} className="mt-1" /> <span>{t('auth.terms')}</span></label>
          {errors.terms && <p className="text-sm text-error">{errors.terms.message as string}</p>}
          <button disabled={isSubmitting} className="w-full rounded-md bg-teal text-white py-2.5 font-medium hover:bg-teal/90 disabled:opacity-50">{t('auth.register')}</button>
        </form>
        <p className="text-sm text-muted mt-4">{t('auth.haveAccount')} <Link to="/login" className="text-teal font-medium hover:underline">{t('auth.login')}</Link></p>
      </div>
    </div>
  )
}
