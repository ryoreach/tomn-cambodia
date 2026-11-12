const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1'

export type ApiOptions = RequestInit & { token?: string }

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json', ...(options.headers as any) }
  if (options.token) headers.Authorization = `Bearer ${options.token}`
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (!res.ok) throw new Error(await res.text().catch(() => res.statusText))
  return res.json() as Promise<T>
}

export const endpoints = {
  services: '/services',
  offices: '/offices',
  authLogin: '/auth/login',
  authRegister: '/auth/register',
}
