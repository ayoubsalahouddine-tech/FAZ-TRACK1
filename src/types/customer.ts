import { z } from 'zod'

export const customerTypeEnum = z.enum(['individual', 'business'])
export const customerStatusEnum = z.enum(['active', 'inactive', 'suspended'])

export type CustomerType = z.infer<typeof customerTypeEnum>
export type CustomerStatus = z.infer<typeof customerStatusEnum>

export interface Customer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName?: string
  taxId?: string
  address: string
  city: string
  country: string
  type: CustomerType
  status: CustomerStatus
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface CustomerResponse {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  business_name?: string
  tax_id?: string
  address: string
  city: string
  country: string
  type: CustomerType
  status: CustomerStatus
  notes?: string
  created_at: string
  updated_at: string
}
