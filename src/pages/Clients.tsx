import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Search, Plus } from 'lucide-react'
import MainLayout from '../layouts/MainLayout'
import ClientList from '../components/ClientList'
import ClientForm from '../components/ClientForm'
import { clientService } from '../services/clientService'
import { CreateClientInput } from '../schemas/client'
import { queryClient } from '../lib/queryClient'
import { Client } from '../types/client'

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  // Fetch clients
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: () => clientService.getClients(searchTerm || undefined),
    staleTime: 1000 * 60 * 5,
  })

  // Create client mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateClientInput) => clientService.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setIsFormOpen(false)
      setEditingClient(null)
    },
  })

  // Update client mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateClientInput }) =>
      clientService.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
      setIsFormOpen(false)
      setEditingClient(null)
    },
  })

  // Delete client mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => clientService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })

  const handleSubmit = async (data: CreateClientInput) => {
    if (editingClient) {
      await updateMutation.mutateAsync({
        id: editingClient.id,
        data,
      })
    } else {
      await createMutation.mutateAsync(data)
    }
  }

  const handleEdit = (client: Client) => {
    setEditingClient(client)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingClient(null)
  }

  const handleOpenForm = () => {
    setEditingClient(null)
    setIsFormOpen(true)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="mt-1 text-gray-600">
              Gérez vos clients expéditeurs et destinataires
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
            placeholder="Rechercher un client (nom, prénom, téléphone, email)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Total clients</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {clients.length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Expéditeurs</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">
              {clients.filter((c) => c.type === 'sender' || c.type === 'both')
                .length}
            </p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-gray-600">Destinataires</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {clients.filter(
                (c) => c.type === 'recipient' || c.type === 'both'
              ).length}
            </p>
          </div>
        </div>

        {/* Client List */}
        <ClientList
          clients={clients}
          search={searchTerm}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <ClientForm
          onSubmit={handleSubmit}
          onClose={handleCloseForm}
          isLoading={createMutation.isPending || updateMutation.isPending}
          initialData={editingClient ?? undefined}
        />
      )}
    </MainLayout>
  )
}

export default Clients
