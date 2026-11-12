// Prepared for Laravel REST API integration. Currently returns mock data.
import { services, categories, offices } from '@/data/mockData'
import type { Service, Category, Office } from '@/types'

export async function fetchServices(): Promise<Service[]> { return Promise.resolve(services) }
export async function fetchService(id: string): Promise<Service | undefined> { return Promise.resolve(services.find(s => s.id === id)) }
export async function fetchCategories(): Promise<Category[]> { return Promise.resolve(categories) }
export async function fetchOffices(): Promise<Office[]> { return Promise.resolve(offices) }
