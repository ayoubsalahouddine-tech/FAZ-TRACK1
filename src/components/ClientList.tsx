import { useMemo } from 'react'
import { Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react'
import { Client } from '../types/client'

interface ClientListProps {
  clients: Client[]
  search: string
  isLoading?: boolean
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

const ClientList = ({
  clients,
  search,
  isLoading = false,
  onEdit,
  onDelete,
}: ClientListProps) => {
  const filteredClients = useMemo(() => {
    if (!search) return clients
    const lowerSearch = search.toLowerCase()
    return clients.filter(
      (client) =>
        client.firstName.toLowerCase().includes(lowerSearch) ||
        client.lastName.toLowerCase().includes(lowerSearch) ||
        client.phone.toLowerCase().includes(lowerSearch) ||
        (client.email && client.email.toLowerCase().includes(lowerSearch))
    )
  }, [clients, search])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sender':
        return 'Expéditeur'
      case 'recipient':
        return 'Destinataire'
      case 'both':
        return 'Les deux'
      default:
        return type
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'sender':
        return 'bg-blue-100 text-blue-800'
      case 'recipient':
        return 'bg-green-100 text-green-800'
      case 'both':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-gray-200 p-6">
            <div className="h-6 w-1/3 rounded bg-gray-300" />
          </div>
        ))}
      </div>
    )
  }

  if (filteredClients.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center">
        <p className="text-gray-600">
          {search
            ? 'Aucun client trouvé correspondant à votre recherche'
            : 'Aucun client pour le moment'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredClients.map((client) => (
        <div
          key={client.id}
          className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            {/* Client Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {client.firstName} {client.lastName}
                </h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    getTypeBadgeColor(client.type)
                  }`}
                >
                  {getTypeLabel(client.type)}
                </span>
              </div>

              {/* Contact Info */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-500" />
                  <span>{client.phone}</span>
                </div>
                {client.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} className="text-gray-500" />
                    <span>{client.email}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-500" />
                  <span>
                    {client.address}, {client.city}, {client.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => onEdit(client)}
                className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                title="Modifier"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(client.id)}
                className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                title="Supprimer"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ClientList
