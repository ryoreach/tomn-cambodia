export type Lang = 'km' | 'en'
export type LocalizedString = { km: string; en: string }
export type ServiceStatus = 'draft' | 'in_review' | 'published' | 'rejected' | 'archived'
export type VerificationStatus = 'verified' | 'partially_verified' | 'unverified'

export interface SourceRef { label: LocalizedString; url?: string }
export interface ProcedureStep { order: number; title: LocalizedString; description: LocalizedString }
export interface DocumentItem { id: string; name: LocalizedString; note?: LocalizedString }
export interface FeeInfo { amount: LocalizedString; note?: LocalizedString }
export interface Service {
  id: string
  title: LocalizedString
  summary: LocalizedString
  description: LocalizedString
  categoryId: string
  authorityId: string
  eligibility: LocalizedString
  procedures: ProcedureStep[]
  documents: DocumentItem[]
  fees?: FeeInfo
  processingTime?: LocalizedString
  officeIds: string[]
  sources: SourceRef[]
  lastVerified?: string
  status: ServiceStatus
  verification: VerificationStatus
  popular?: boolean
}
export interface Category { id: string; name: LocalizedString; icon: string; description: LocalizedString }
export interface Authority { id: string; name: LocalizedString }
export interface Office {
  id: string
  name: LocalizedString
  authorityId: string
  province: LocalizedString
  district: LocalizedString
  address: LocalizedString
  phone?: string
  hours?: LocalizedString
  mapUrl?: string
  lat?: number
  lng?: number
}
export interface User {
  id: string
  name: string
  email: string
  role: 'citizen' | 'editor' | 'reviewer' | 'admin'
  status: 'active' | 'inactive'
}
export interface ReviewItem {
  id: string
  serviceId: string
  submittedBy: string
  submittedAt: string
  status: 'pending' | 'approved' | 'rejected'
  reason?: string
}
export interface AuditLog {
  id: string
  user: string
  action: string
  target: string
  timestamp: string
}
export interface ChecklistItem { id: string; label: string; done: boolean }
export interface Checklist {
  id: string
  serviceId?: string
  title: string
  items: ChecklistItem[]
  updatedAt: string
}
