import { z } from 'zod'

export const packageStatusEnum = z.enum([
  'registered',
  'pending',
  'loading',
  'transit',
  'arrived',
  'delivered',
  'cancelled',
])

export type PackageStatus = z.infer<typeof packageStatusEnum>

export interface Package {
  id: string
  trackingNumber: string
  senderId: string
  senderName: string
  recipientId: string
  recipientName: string
  packageNature: string
  description: string
  weight: number
  quantity: number
  declaredValue: number
  transportPrice: number
  insurance: boolean
  departureCity: string
  arrivalCity: string
  observations?: string
  status: PackageStatus
  createdAt: Date
  updatedAt: Date
}

export interface PackageResponse {
  id: string
  tracking_number: string
  sender_id: string
  sender_name: string
  recipient_id: string
  recipient_name: string
  package_nature: string
  description: string
  weight: number
  quantity: number
  declared_value: number
  transport_price: number
  insurance: boolean
  departure_city: string
  arrival_city: string
  observations?: string
  status: PackageStatus
  created_at: string
  updated_at: string
}
