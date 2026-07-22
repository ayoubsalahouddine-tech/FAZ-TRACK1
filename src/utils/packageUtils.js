/**
 * Utility functions for package/tracking management
 */
import QRCode from 'qrcode';
/**
 * Generate a unique tracking number in format: FAZ-YYYYMMDD-000001
 */
export const generateTrackingNumber = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const date = `${year}${month}${day}`;
    // In a real app, this would be fetched from DB to ensure uniqueness
    // For now, using a random sequence
    const sequence = String(Math.floor(Math.random() * 1000000))
        .padStart(6, '0');
    return `FAZ-${date}-${sequence}`;
};
/**
 * Generate QR code data URL from tracking number
 */
export const generateQRCode = async (trackingNumber) => {
    try {
        const qrCode = await QRCode.toDataURL(trackingNumber, {
            width: 200,
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF',
            },
        });
        return qrCode;
    }
    catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};
/**
 * Format tracking number for display
 */
export const formatTrackingNumber = (trackingNumber) => {
    return trackingNumber.toUpperCase();
};
/**
 * Get status label in French
 */
export const getStatusLabel = (status) => {
    const labels = {
        registered: 'Enregistré',
        pending: 'En attente',
        loading: 'En chargement',
        transit: 'En transit',
        arrived: 'Arrivé',
        delivered: 'Livré',
        cancelled: 'Annulé',
    };
    return labels[status] || status;
};
/**
 * Get status badge color
 */
export const getStatusBadgeColor = (status) => {
    const colors = {
        registered: 'bg-blue-100 text-blue-800',
        pending: 'bg-yellow-100 text-yellow-800',
        loading: 'bg-orange-100 text-orange-800',
        transit: 'bg-purple-100 text-purple-800',
        arrived: 'bg-indigo-100 text-indigo-800',
        delivered: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};
