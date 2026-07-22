import { z } from 'zod'

export const clientTypeEnum = z.enum(['sender', 'recipient', 'both'])

export const createClientSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  phone: z.string().min(10, 'Le téléphone doit contenir au moins 10 chiffres'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
  city: z.string().min(2, 'La ville doit contenir au moins 2 caractères'),
  country: z.string().min(2, 'Le pays doit contenir au moins 2 caractères'),
  type: clientTypeEnum,
})

export type CreateClientInput = z.infer<typeof createClientSchema>

export const updateClientSchema = createClientSchema

export type UpdateClientInput = z.infer<typeof updateClientSchema>
