import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Search, Plus, Filter } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import CustomerList from '../components/CustomerList'
import CustomerForm from '../components/CustomerForm'
import { customerService } from '../services/customerService'
import { CreateCustomerInput } from '../schemas/customer'
import { queryClient } from '../lib/queryClient'
import { Customer } from '../types/customer'

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterType, setFilterType] = useState<string>('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  // Fetch customers with filters
  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers', searchTerm, filterStatus, filterType],
    queryFn: () =>
      customerService.getCustomers(
        searchTerm || undefined,
        filterStatus || undefined,
        filterType || undefined
      ),
    staleTime: 1000 * 60 * 5,
  })

  // Create customer mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateCustomerInput) =>
      customerService.createCustomer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      setIsFormOpen(false)
      setEditingCustomer(null)
    },
  })

  // Update customer mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCustomerInput }) =>
      customerService.updateCustomer(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      setIsFormOpen(false)
      setEditingCustomer(null)
    },
  })

  // Delete customer mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => customerService.deleteCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  const handleSubmit = async (data: CreateCustomerInput) => {
    if (editingCustomer) {
      await updateMutation.mutateAsync({
        id: editingCustomer.id,
        data,
      })
    } else {
      await createMutation.mutateAsync(data)
    }
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCustomer(null)
  }

  const handleOpenForm = () => {
    setEditingCustomer(null)
    setIsFormOpen(true)
  }

  const stats = {
    total: customers.length,
    individual: customers.filter((c) => c.type === 'individual').length,
    business: customers.filter((c) => c.type === 'business').length,
    active: customers.filter((c) => c.status === 'active').length,
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="mt-1 text-gray-600">
              Gérez vos clients et leurs informations
            </p>
          </div>
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
          >
            <Plus size={20} />
            Nouveau client
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
            placeholder="Rechercher un client (nom, email, téléphone, entreprise)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filtres:</span>
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">Tous les types</option>
            <option value="individual">Particulier</option>
            <option value="business">Entreprise</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="suspended">Suspendu</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Total clients</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stats.total}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Particuliers</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {stats.individual}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Entreprises</p>
            <p className="mt-1 text-2xl font-bold text-purple-600">
              {stats.business}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Actifs</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {stats.active}
            </p>
          </div>
        </div>

        {/* Customer List */}
        <CustomerList
          customers={customers}
          search={searchTerm}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <CustomerForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={createMutation.isPending || updateMutation.isPending}
          initialData={editingCustomer ?? undefined}
        />
      )}
    </MainLayout>
  )
}

export default Customers
