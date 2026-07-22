import { z } from 'zod'

export const customerTypeEnum = z.enum(['individual', 'business'])
export const customerStatusEnum = z.enum(['active', 'inactive', 'suspended'])

export const createCustomerSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Le téléphone doit contenir au moins 10 chiffres'),
  businessName: z.string().optional().or(z.literal('')),
  taxId: z.string().optional().or(z.literal('')),
  address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  country: z.string().min(2, 'Le pays doit contenir au moins 2 caractères'),
  type: customerTypeEnum,
  status: customerStatusEnum.default('active'),
  notes: z.string().optional().or(z.literal('')),
})

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>

export const updateCustomerSchema = createCustomerSchema

export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
