import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { createClientSchema, CreateClientInput } from '../schemas/client'
import { Client } from '../types/client'
import Button from './Button'

interface ClientFormProps {
  onSubmit: (data: CreateClientInput) => Promise<void>
  onClose: () => void
  isLoading?: boolean
  initialData?: Client
}

const ClientForm = ({
  onSubmit,
  onClose,
  isLoading = false,
  initialData,
}: ClientFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          phone: initialData.phone,
          email: initialData.email || '',
          address: initialData.address,
          city: initialData.city,
          country: initialData.country,
          type: initialData.type,
        }
      : undefined,
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Modifier le client' : 'Nouveau client'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-gray-100"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Prénom *
              </label>
              <input
                type="text"
                {...register('firstName')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Jean"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Nom *
              </label>
              <input
                type="text"
                {...register('lastName')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Dupont"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Téléphone *
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="+213 123 456 789"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email (optionnel)
            </label>
            <input
              type="email"
              {...register('email')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="jean@exemple.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Adresse *
            </label>
            <input
              type="text"
              {...register('address')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              placeholder="123 Rue de la Paix"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Ville *
              </label>
              <input
                type="text"
                {...register('city')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Alger"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Pays *
              </label>
              <input
                type="text"
                {...register('country')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Algérie"
              />
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Type *
            </label>
            <select
              {...register('type')}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="sender">Expéditeur</option>
              <option value="recipient">Destinataire</option>
              <option value="both">Les deux</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientForm
