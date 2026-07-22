import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { createCustomerSchema, CreateCustomerInput } from '../schemas/customer'
import { Customer } from '../types/customer'
import Button from './Button'

interface CustomerFormProps {
  onSubmit: (data: CreateCustomerInput) => Promise<void>
  onClose: () => void
  isLoading?: boolean
  initialData?: Customer
}

const CustomerForm = ({
  onSubmit,
  onClose,
  isLoading = false,
  initialData,
}: CustomerFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: initialData
      ? {
          firstName: initialData.firstName,
          lastName: initialData.lastName,
          email: initialData.email,
          phone: initialData.phone,
          businessName: initialData.businessName || '',
          taxId: initialData.taxId || '',
          address: initialData.address,
          city: initialData.city,
          country: initialData.country,
          type: initialData.type,
          status: initialData.status,
          notes: initialData.notes || '',
        }
      : undefined,
  })

  const customerType = watch('type')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="h-full max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Type de client *
            </label>
            <select
              {...register('type')}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="individual">Particulier</option>
              <option value="business">Entreprise</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Personal Information */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">
              Informations personnelles
            </h3>

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

            {/* Email & Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="jean@exemple.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
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
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information (if business type) */}
          {customerType === 'business' && (
            <div className="space-y-4 rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">
                Informations entreprise
              </h3>

              {/* Business Name & Tax ID */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    {...register('businessName')}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="SARL Exemple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Numéro SIRET/SIREN
                  </label>
                  <input
                    type="text"
                    {...register('taxId')}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    placeholder="123 456 789 123 45"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Address Information */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Adresse</h3>

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
          </div>

          {/* Status & Notes */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Autres informations</h3>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Statut *
              </label>
              <select
                {...register('status')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="suspended">Suspendu</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Ajouter des notes supplémentaires..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 border-t border-gray-200 pt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomerForm
