import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, Edit2, Trash2, Copy } from 'lucide-react';
import { getStatusLabel, getStatusBadgeColor, formatTrackingNumber, } from '../utils/packageUtils';
const PackageList = ({ packages, search, isLoading = false, onEdit, onDelete, onViewDetails, }) => {
    const [copiedId, setCopiedId] = useState(null);
    const filteredPackages = packages.filter((pkg) => pkg.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        pkg.senderName.toLowerCase().includes(search.toLowerCase()) ||
        pkg.recipientName.toLowerCase().includes(search.toLowerCase()) ||
        pkg.departureCity.toLowerCase().includes(search.toLowerCase()) ||
        pkg.arrivalCity.toLowerCase().includes(search.toLowerCase()));
    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "animate-pulse rounded-lg bg-gray-200 p-6", children: _jsx("div", { className: "h-6 w-1/3 rounded bg-gray-300" }) }, i))) }));
    }
    if (filteredPackages.length === 0) {
        return (_jsx("div", { className: "rounded-lg bg-white p-12 text-center", children: _jsx("p", { className: "text-gray-600", children: search
                    ? 'Aucun colis trouvé correspondant à votre recherche'
                    : 'Aucun colis pour le moment' }) }));
    }
    return (_jsx("div", { className: "space-y-3", children: filteredPackages.map((packageItem) => (_jsx("div", { className: "rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md", children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-start md:justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx("code", { className: "rounded bg-gray-100 px-2 py-1 font-mono text-sm font-semibold text-gray-900", children: formatTrackingNumber(packageItem.trackingNumber) }), _jsx("button", { onClick: () => copyToClipboard(packageItem.trackingNumber, packageItem.id), className: "rounded p-1 hover:bg-gray-100", title: "Copier le num\u00E9ro de suivi", children: _jsx(Copy, { size: 16, className: copiedId === packageItem.id ? 'text-green-600' : 'text-gray-400' }) }), _jsx("span", { className: `rounded px-2 py-1 text-xs font-medium ${getStatusBadgeColor(packageItem.status)}`, children: getStatusLabel(packageItem.status) })] }), _jsxs("div", { className: "mt-3 space-y-1", children: [_jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "De:" }), " ", packageItem.senderName] }), _jsxs("p", { className: "text-sm text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Vers:" }), " ", packageItem.recipientName] })] }), _jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-600", children: [_jsx("span", { className: "font-medium", children: packageItem.departureCity }), _jsx("span", { children: "\u2192" }), _jsx("span", { className: "font-medium", children: packageItem.arrivalCity }), _jsx("span", { className: "mx-2 h-1 w-1 rounded-full bg-gray-300" }), _jsxs("span", { children: [packageItem.quantity, " colis"] }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [packageItem.weight, " kg"] })] }), _jsxs("p", { className: "mt-2 text-xs text-gray-600", children: [_jsx("span", { className: "font-medium", children: "Nature:" }), " ", packageItem.packageNature] }), _jsxs("div", { className: "mt-2 flex gap-4 text-xs text-gray-600", children: [_jsxs("span", { children: [_jsx("span", { className: "font-medium", children: "Transport:" }), " ", packageItem.transportPrice, " DA"] }), packageItem.insurance && (_jsx("span", { className: "rounded bg-blue-50 px-2 py-1 text-blue-700", children: "Assurance incluse" }))] }), _jsxs("p", { className: "mt-2 text-xs text-gray-500", children: ["Cr\u00E9\u00E9 le ", new Date(packageItem.createdAt).toLocaleDateString('fr-FR')] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => onViewDetails(packageItem), className: "rounded-lg bg-green-100 p-2 text-green-700 hover:bg-green-200", title: "Voir les d\u00E9tails", children: _jsx(Eye, { size: 18 }) }), _jsx("button", { onClick: () => onEdit(packageItem), className: "rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200", title: "Modifier", children: _jsx(Edit2, { size: 18 }) }), _jsx("button", { onClick: () => onDelete(packageItem.id), className: "rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200", title: "Supprimer", children: _jsx(Trash2, { size: 18 }) })] })] }) }, packageItem.id))) }));
};
export default PackageList;
