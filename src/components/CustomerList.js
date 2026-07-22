import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Edit2, Trash2, Mail, Phone, MapPin, Building2 } from 'lucide-react';
const CustomerList = ({ customers, search, isLoading = false, onEdit, onDelete, }) => {
    const filteredCustomers = useMemo(() => {
        if (!search)
            return customers;
        const lowerSearch = search.toLowerCase();
        return customers.filter((customer) => customer.firstName.toLowerCase().includes(lowerSearch) ||
            customer.lastName.toLowerCase().includes(lowerSearch) ||
            customer.email.toLowerCase().includes(lowerSearch) ||
            customer.phone.toLowerCase().includes(lowerSearch) ||
            (customer.businessName &&
                customer.businessName.toLowerCase().includes(lowerSearch)));
    }, [customers, search]);
    const getTypeLabel = (type) => {
        switch (type) {
            case 'individual':
                return 'Particulier';
            case 'business':
                return 'Entreprise';
            default:
                return type;
        }
    };
    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'individual':
                return 'bg-blue-100 text-blue-800';
            case 'business':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'suspended':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'active':
                return 'Actif';
            case 'inactive':
                return 'Inactif';
            case 'suspended':
                return 'Suspendu';
            default:
                return status;
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "animate-pulse rounded-lg bg-gray-200 p-6", children: _jsx("div", { className: "h-6 w-1/3 rounded bg-gray-300" }) }, i))) }));
    }
    if (filteredCustomers.length === 0) {
        return (_jsx("div", { className: "rounded-lg bg-white p-12 text-center", children: _jsx("p", { className: "text-gray-600", children: search
                    ? 'Aucun client trouvé correspondant à votre recherche'
                    : 'Aucun client pour le moment' }) }));
    }
    return (_jsx("div", { className: "space-y-3", children: filteredCustomers.map((customer) => (_jsx("div", { className: "rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsxs("h3", { className: "font-semibold text-gray-900", children: [customer.firstName, " ", customer.lastName] }), _jsx("span", { className: `rounded px-2 py-1 text-xs font-medium ${getTypeBadgeColor(customer.type)}`, children: getTypeLabel(customer.type) }), _jsx("span", { className: `rounded px-2 py-1 text-xs font-medium ${getStatusBadgeColor(customer.status)}`, children: getStatusLabel(customer.status) })] }), customer.businessName && (_jsxs("div", { className: "mt-2 flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Building2, { size: 16, className: "text-gray-500" }), _jsx("span", { children: customer.businessName })] })), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Mail, { size: 16, className: "text-gray-500" }), _jsx("span", { children: customer.email })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Phone, { size: 16, className: "text-gray-500" }), _jsx("span", { children: customer.phone })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(MapPin, { size: 16, className: "text-gray-500" }), _jsxs("span", { children: [customer.address, ", ", customer.city, ", ", customer.country] })] })] }), customer.notes && (_jsxs("div", { className: "mt-2 text-xs italic text-gray-500", children: ["Notes: ", customer.notes] }))] }), _jsxs("div", { className: "ml-4 flex gap-2", children: [_jsx("button", { onClick: () => onEdit(customer), className: "rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200", title: "Modifier", children: _jsx(Edit2, { size: 18 }) }), _jsx("button", { onClick: () => onDelete(customer.id), className: "rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200", title: "Supprimer", children: _jsx(Trash2, { size: 18 }) })] })] }) }, customer.id))) }));
};
export default CustomerList;
