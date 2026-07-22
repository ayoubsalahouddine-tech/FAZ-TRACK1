import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { createPackageSchema, CreatePackageInput } from '../schemas/package'
import { Package } from '../types/package'
import { customerService } from '../services/customerService'
import Button from './Button'

interface PackageFormProps {
  onSubmit: (data: CreatePackageInput) => Promise<void>
  onClose: () => void
  isLoading?: boolean
  initialData?: Package
}

const PackageForm = ({
  onSubmit,
  onClose,
  isLoading = false,
  initialData,
}: PackageFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<CreatePackageInput>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: initialData
      ? {
          senderId: initialData.senderId,
          recipientId: initialData.recipientId,
          packageNature: initialData.packageNature,
          description: initialData.description,
          weight: initialData.weight,
          quantity: initialData.quantity,
          declaredValue: initialData.declaredValue,
          transportPrice: initialData.transportPrice,
          insurance: initialData.insurance,
          departureCity: initialData.departureCity,
          arrivalCity: initialData.arrivalCity,
          observations: initialData.observations || '',
          status: initialData.status,
        }
      : undefined,
  })

  // Fetch customers for selection
  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: () => customerService.getCustomers(),
    staleTime: 1000 * 60 * 5,
  })

  const insurance = watch('insurance')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="h-full max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {initialData ? 'Modifier le colis' : 'Enregistrer un nouveau colis'}
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
          {/* Sender & Recipient */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Parties impliquées</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Expéditeur *
                </label>
                <select
                  {...register('senderId')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">Sélectionner un expéditeur</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  ))}
                </select>
                {errors.senderId && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.senderId.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Destinataire *
                </label>
                <select
                  {...register('recipientId')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  <option value="">Sélectionner un destinataire</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  ))}
                </select>
                {errors.recipientId && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.recipientId.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Détails du colis</h3>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Nature du colis *
              </label>
              <input
                type="text"
                {...register('packageNature')}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="ex: Vêtements, Électronique, etc."
              />
              {errors.packageNature && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.packageNature.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Description détaillée du contenu"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Poids (kg) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('weight', { valueAsNumber: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="0.00"
                />
                {errors.weight && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Nombre de colis *
                </label>
                <input
                  type="number"
                  {...register('quantity', { valueAsNumber: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="1"
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Valeur déclarée (DA) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('declaredValue', { valueAsNumber: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="0.00"
                />
                {errors.declaredValue && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.declaredValue.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Insurance */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Tarification</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Prix du transport (DA) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('transportPrice', { valueAsNumber: true })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="0.00"
                />
                {errors.transportPrice && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.transportPrice.message}
                  </p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-2 pt-7">
                  <input
                    type="checkbox"
                    {...register('insurance')}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Assurance incluse
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Cities */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Trajet</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Ville de départ *
                </label>
                <input
                  type="text"
                  {...register('departureCity')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="ex: Alger"
                />
                {errors.departureCity && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.departureCity.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Ville d'arrivée *
                </label>
                <input
                  type="text"
                  {...register('arrivalCity')}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  placeholder="ex: Oran"
                />
                {errors.arrivalCity && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.arrivalCity.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Observations */}
          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900">Observations</h3>

            <div>
              <label className="block text-sm font-medium text-gray-900">
                Notes supplémentaires
              </label>
              <textarea
                {...register('observations')}
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                placeholder="Ajouter des observations supplémentaires..."
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
              {isLoading ? 'Enregistrement...' : 'Enregistrer le colis'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PackageForm
