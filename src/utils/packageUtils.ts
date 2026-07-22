/**
 * Utility functions for package/tracking management
 */

/**
 * Generate a unique tracking number in format: FAZ-YYYYMMDD-000001
 */
export const generateTrackingNumber = async (): Promise<string> => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const date = `${year}${month}${day}`

  // In a real app, this would be fetched from DB to ensure uniqueness
  const sequence = String(Math.floor(Math.random() * 1000000)).padStart(6, '0')

  return `FAZ-${date}-${sequence}`
}

/**
 * Generate QR code data URL from tracking number.
 * Returns a placeholder data URL until a QR library is configured.
 */
export const generateQRCode = async (trackingNumber: string): Promise<string> => {
  // Placeholder: return an SVG-based QR stub
  const encoded = encodeURIComponent(trackingNumber)
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' fill='white'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='12' fill='black'>${encoded}</text></svg>`
}

/**
 * Format tracking number for display
 */
export const formatTrackingNumber = (trackingNumber: string): string => {
  return trackingNumber.toUpperCase()
}

/**
 * Get status label in French
 */
export const getStatusLabel = (status: string): string => {
  const labels: { [key: string]: string } = {
    registered: 'Enregistré',
    pending: 'En attente',
    loading: 'En chargement',
    transit: 'En transit',
    arrived: 'Arrivé',
    delivered: 'Livré',
    cancelled: 'Annulé',
  }
  return labels[status] || status
}

/**
 * Get status badge color
 */
export const getStatusBadgeColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    registered: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    loading: 'bg-orange-100 text-orange-800',
    transit: 'bg-purple-100 text-purple-800',
    arrived: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
