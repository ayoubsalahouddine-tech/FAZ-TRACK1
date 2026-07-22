import { useState } from 'react'
import { Edit2, Trash2, Copy } from 'lucide-react'
import { Package } from '../types/package'
import {
  getStatusLabel,
  getStatusBadgeColor,
  formatTrackingNumber,
} from '../utils/packageUtils'

interface PackageListProps {
  packages: Package[]
  search: string
  isLoading?: boolean
  onEdit: (packageItem: Package) => void
  onDelete: (id: string) => void
}

const PackageList = ({
  packages,
  search,
  isLoading = false,
  onEdit,
  onDelete,
}: PackageListProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      pkg.senderName.toLowerCase().includes(search.toLowerCase()) ||
      pkg.recipientName.toLowerCase().includes(search.toLowerCase()) ||
      pkg.departureCity.toLowerCase().includes(search.toLowerCase()) ||
      pkg.arrivalCity.toLowerCase().includes(search.toLowerCase())
  )

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
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

  if (filteredPackages.length === 0) {
    return (
      <div className="rounded-lg bg-white p-12 text-center">
        <p className="text-gray-600">
          {search
            ? 'Aucun colis trouvé correspondant à votre recherche'
            : 'Aucun colis pour le moment'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {filteredPackages.map((packageItem) => (
        <div
          key={packageItem.id}
          className="rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Left: Main Info */}
            <div className="flex-1">
              {/* Tracking Number & Status */}
              <div className="flex flex-wrap items-center gap-2">
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm font-semibold text-gray-900">
                  {formatTrackingNumber(packageItem.trackingNumber)}
                </code>
                <button
                  onClick={() =>
                    copyToClipboard(packageItem.trackingNumber, packageItem.id)
                  }
                  className="rounded p-1 hover:bg-gray-100"
                  title="Copier le numéro de suivi"
                >
                  <Copy
                    size={16}
                    className={copiedId === packageItem.id ? 'text-green-600' : 'text-gray-400'}
                  />
                </button>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    getStatusBadgeColor(packageItem.status)
                  }`}
                >
                  {getStatusLabel(packageItem.status)}
                </span>
              </div>

              {/* Sender & Recipient */}
              <div className="mt-3 space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">De:</span> {packageItem.senderName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Vers:</span> {packageItem.recipientName}
                </p>
              </div>

              {/* Cities & Details */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="font-medium">{packageItem.departureCity}</span>
                <span>→</span>
                <span className="font-medium">{packageItem.arrivalCity}</span>
                <span className="mx-2 h-1 w-1 rounded-full bg-gray-300"></span>
                <span>{packageItem.quantity} colis</span>
                <span>•</span>
                <span>{packageItem.weight} kg</span>
              </div>

              {/* Package Nature */}
              <p className="mt-2 text-xs text-gray-600">
                <span className="font-medium">Nature:</span> {packageItem.packageNature}
              </p>

              {/* Price Info */}
              <div className="mt-2 flex gap-4 text-xs text-gray-600">
                <span>
                  <span className="font-medium">Transport:</span> {packageItem.transportPrice} DA
                </span>
                {packageItem.insurance && (
                  <span className="rounded bg-blue-50 px-2 py-1 text-blue-700">
                    Assurance incluse
                  </span>
                )}
              </div>

              {/* Creation Date */}
              <p className="mt-2 text-xs text-gray-500">
                Créé le {new Date(packageItem.createdAt).toLocaleDateString('fr-FR')}
              </p>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(packageItem)}
                className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                title="Modifier"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(packageItem.id)}
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

export default PackageList
