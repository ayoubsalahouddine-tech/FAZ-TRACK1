import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Edit2, Trash2, Phone, Mail, MapPin } from 'lucide-react';
const ClientList = ({ clients, search, isLoading = false, onEdit, onDelete, }) => {
    const filteredClients = useMemo(() => {
        if (!search)
            return clients;
        const lowerSearch = search.toLowerCase();
        return clients.filter((client) => client.firstName.toLowerCase().includes(lowerSearch) ||
            client.lastName.toLowerCase().includes(lowerSearch) ||
            client.phone.toLowerCase().includes(lowerSearch) ||
            (client.email && client.email.toLowerCase().includes(lowerSearch)));
    }, [clients, search]);
    const getTypeLabel = (type) => {
        switch (type) {
            case 'sender':
                return 'Expéditeur';
            case 'recipient':
                return 'Destinataire';
            case 'both':
                return 'Les deux';
            default:
                return type;
        }
    };
    const getTypeBadgeColor = (type) => {
        switch (type) {
            case 'sender':
                return 'bg-blue-100 text-blue-800';
            case 'recipient':
                return 'bg-green-100 text-green-800';
            case 'both':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "animate-pulse rounded-lg bg-gray-200 p-6", children: _jsx("div", { className: "h-6 w-1/3 rounded bg-gray-300" }) }, i))) }));
    }
    if (filteredClients.length === 0) {
        return (_jsx("div", { className: "rounded-lg bg-white p-12 text-center", children: _jsx("p", { className: "text-gray-600", children: search
                    ? 'Aucun client trouvé correspondant à votre recherche'
                    : 'Aucun client pour le moment' }) }));
    }
    return (_jsx("div", { className: "space-y-3", children: filteredClients.map((client) => (_jsx("div", { className: "rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-md", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("h3", { className: "font-semibold text-gray-900", children: [client.firstName, " ", client.lastName] }), _jsx("span", { className: `rounded px-2 py-1 text-xs font-medium ${getTypeBadgeColor(client.type)}`, children: getTypeLabel(client.type) })] }), _jsxs("div", { className: "mt-2 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Phone, { size: 16, className: "text-gray-500" }), _jsx("span", { children: client.phone })] }), client.email && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(Mail, { size: 16, className: "text-gray-500" }), _jsx("span", { children: client.email })] })), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-600", children: [_jsx(MapPin, { size: 16, className: "text-gray-500" }), _jsxs("span", { children: [client.address, ", ", client.city, ", ", client.country] })] })] })] }), _jsxs("div", { className: "ml-4 flex gap-2", children: [_jsx("button", { onClick: () => onEdit(client), className: "rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200", title: "Modifier", children: _jsx(Edit2, { size: 18 }) }), _jsx("button", { onClick: () => onDelete(client.id), className: "rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200", title: "Supprimer", children: _jsx(Trash2, { size: 18 }) })] })] }) }, client.id))) }));
};
export default ClientList;
