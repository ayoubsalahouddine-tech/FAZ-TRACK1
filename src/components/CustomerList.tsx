import { useMemo } from 'react'
import { Edit2, Trash2, Mail, Phone, MapPin, Building2 } from 'lucide-react'
import { Customer } from '../types/customer'

interface CustomerListProps {
  customers: Customer[]
  search: string
  isLoading?: boolean
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
}

const CustomerList = ({
  customers,
  search,
  isLoading = false,
  onEdit,
  onDelete,
}: CustomerListProps) => {
  const filteredCustomers = useMemo(() => {
    if (!search) return customers
    const lowerSearch = search.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.firstName.toLowerCase().includes(lowerSearch) ||
        customer.lastName.toLowerCase().includes(lowerSearch) ||
        customer.email.toLowerCase().includes(lowerSearch) ||
        customer.phone.toLowerCase().includes(lowerSearch) ||
        (customer.businessName &&
          customer.businessName.toLowerCase().includes(lowerSearch))
    )
  }, [customers, search])

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'individual':
        return 'Particulier'
      case 'business':
        return 'Entreprise'
      default:
        return type
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'bg-blue-100 text-blue-800'
      case 'business':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif'
      case 'inactive':
        return 'Inactif'
      case 'suspended':
        return 'Suspendu'
      default:
        return status
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

  if (filteredCustomers.length === 0) {
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
      {filteredCustomers.map((customer) => (
        <div
          key={customer.id}
          className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            {/* Customer Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-gray-900">
                  {customer.firstName} {customer.lastName}
                </h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    getTypeBadgeColor(customer.type)
                  }`}
                >
                  {getTypeLabel(customer.type)}
                </span>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    getStatusBadgeColor(customer.status)
                  }`}
                >
                  {getStatusLabel(customer.status)}
                </span>
              </div>

              {/* Business Name if applicable */}
              {customer.businessName && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <Building2 size={16} className="text-gray-500" />
                  <span>{customer.businessName}</span>
                </div>
              )}

              {/* Contact Info */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-500" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-gray-500" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="text-gray-500" />
                  <span>
                    {customer.address}, {customer.city}, {customer.country}
                  </span>
                </div>
              </div>

              {/* Notes if exists */}
              {customer.notes && (
                <div className="mt-2 text-xs italic text-gray-500">
                  Notes: {customer.notes}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="ml-4 flex gap-2">
              <button
                onClick={() => onEdit(customer)}
                className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                title="Modifier"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(customer.id)}
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

export default CustomerList
