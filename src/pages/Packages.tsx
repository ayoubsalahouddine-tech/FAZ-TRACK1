import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Search, Plus } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import PackageList from '../components/PackageList'
import PackageForm from '../components/PackageForm'
import { packageService } from '../services/packageService'
import { CreatePackageInput } from '../schemas/package'
import { queryClient } from '../lib/queryClient'
import { customerService } from '../services/customerService'
import { Package } from '../types/package'

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)

  // Fetch packages with filters
  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages', searchTerm, filterStatus],
    queryFn: () =>
      packageService.getPackages(
        searchTerm || undefined,
        filterStatus || undefined
      ),
    staleTime: 1000 * 60 * 5,
  })

  // Create package mutation
  const createMutation = useMutation({
    mutationFn: async (data: CreatePackageInput) => {
      // Get customer names
      const sender = await customerService.getCustomerById(data.senderId)
      const recipient = await customerService.getCustomerById(data.recipientId)

      if (!sender || !recipient) {
        throw new Error('Client introuvable')
      }

      return packageService.createPackage(
        data,
        `${sender.firstName} ${sender.lastName}`,
        `${recipient.firstName} ${recipient.lastName}`
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
      setIsFormOpen(false)
      setEditingPackage(null)
    },
  })

  // Update package mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreatePackageInput }) =>
      packageService.updatePackage(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
      setIsFormOpen(false)
      setEditingPackage(null)
    },
  })

  // Delete package mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => packageService.deletePackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] })
    },
  })

  const handleSubmit = async (data: CreatePackageInput) => {
    if (editingPackage) {
      await updateMutation.mutateAsync({
        id: editingPackage.id,
        data,
      })
    } else {
      await createMutation.mutateAsync(data)
    }
  }

  const handleEdit = (packageItem: Package) => {
    setEditingPackage(packageItem)
    setIsFormOpen(true)
  }

  const handleViewDetails = (_packageItem: Package) => {}

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingPackage(null)
  }

  const handleOpenForm = () => {
    setEditingPackage(null)
    setIsFormOpen(true)
  }

  const stats = {
    total: packages.length,
    registered: packages.filter((p) => p.status === 'registered').length,
    transit: packages.filter(
      (p) => p.status === 'loading' || p.status === 'transit'
    ).length,
    delivered: packages.filter((p) => p.status === 'delivered').length,
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Colis</h1>
            <p className="mt-1 text-gray-600">
              Enregistrez et suivez vos colis
            </p>
          </div>
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
          >
            <Plus size={20} />
            Nouveau colis
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher par numéro de suivi, expéditeur, destinataire, ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">Tous les statuts</option>
            <option value="registered">Enregistré</option>
            <option value="pending">En attente</option>
            <option value="loading">En chargement</option>
            <option value="transit">En transit</option>
            <option value="arrived">Arrivé</option>
            <option value="delivered">Livré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Total colis</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Enregistrés</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {stats.registered}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">En transit</p>
            <p className="mt-1 text-2xl font-bold text-orange-600">
              {stats.transit}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Livrés</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {stats.delivered}
            </p>
          </div>
        </div>

        {/* Package List */}
        <PackageList
          packages={packages}
          search={searchTerm}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
          onViewDetails={handleViewDetails}
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <PackageForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={createMutation.isPending || updateMutation.isPending}
          initialData={editingPackage ?? undefined}
        />
      )}
    </MainLayout>
  )
}

export default Packages
