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

export const createPackageSchema = z.object({
  senderId: z.string().uuid('Veuillez sélectionner un expéditeur'),
  recipientId: z.string().uuid('Veuillez sélectionner un destinataire'),
  packageNature: z.string().min(3, 'La nature du colis doit contenir au moins 3 caractères'),
  description: z.string().min(5, 'La description doit contenir au moins 5 caractères'),
  weight: z.number().positive('Le poids doit être positif'),
  quantity: z.number().int().positive('La quantité doit être un nombre entier positif'),
  declaredValue: z.number().nonnegative('La valeur déclarée doit être positive'),
  transportPrice: z.number().positive('Le prix du transport doit être positif'),
  insurance: z.boolean(),
  departureCity: z.string().min(2, 'La ville de départ doit contenir au moins 2 caractères'),
  arrivalCity: z.string().min(2, 'La ville d\'arrivée doit contenir au moins 2 caractères'),
  observations: z.string().optional().or(z.literal('')),
  status: packageStatusEnum.default('registered'),
})

export type CreatePackageInput = z.infer<typeof createPackageSchema>

export const updatePackageSchema = createPackageSchema

export type UpdatePackageInput = z.infer<typeof updatePackageSchema>
