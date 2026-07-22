import { z } from 'zod'

export const clientTypeEnum = z.enum(['sender', 'recipient', 'both'])

export type ClientType = z.infer<typeof clientTypeEnum>

export interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  address: string
  city: string
  country: string
  type: ClientType
  createdAt: Date
  updatedAt: Date
}

export interface ClientResponse {
  id: string
  first_name: string
  last_name: string
  phone: string
  email?: string
  address: string
  city: string
  country: string
  type: ClientType
  created_at: string
  updated_at: string
}
