import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Search, Plus } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { clientService } from '../services/clientService';
import { queryClient } from '../lib/queryClient';
const Clients = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(undefined);
    // Fetch clients
    const { data: clients = [], isLoading } = useQuery({
        queryKey: ['clients', searchTerm],
        queryFn: () => clientService.getClients(searchTerm || undefined),
        staleTime: 1000 * 60 * 5,
    });
    // Create client mutation
    const createMutation = useMutation({
        mutationFn: (data) => clientService.createClient(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            setIsFormOpen(false);
            setEditingClient(undefined);
        },
    });
    // Update client mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => clientService.updateClient(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
            setIsFormOpen(false);
            setEditingClient(undefined);
        },
    });
    // Delete client mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => clientService.deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] });
        },
    });
    const handleSubmit = async (data) => {
        if (editingClient) {
            await updateMutation.mutateAsync({
                id: editingClient.id,
                data,
            });
        }
        else {
            await createMutation.mutateAsync(data);
        }
    };
    const handleEdit = (client) => {
        setEditingClient(client);
        setIsFormOpen(true);
    };
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingClient(undefined);
    };
    const handleOpenForm = () => {
        setEditingClient(undefined);
        setIsFormOpen(true);
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Clients" }), _jsx("p", { className: "mt-1 text-gray-600", children: "G\u00E9rez vos clients exp\u00E9diteurs et destinataires" })] }), _jsxs("button", { onClick: handleOpenForm, className: "flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800", children: [_jsx(Plus, { size: 20 }), "Nouveau client"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 20, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Rechercher un client (nom, pr\u00E9nom, t\u00E9l\u00E9phone, email)...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20" })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [_jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total clients" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-gray-900", children: clients.length })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Exp\u00E9diteurs" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-blue-600", children: clients.filter((c) => c.type === 'sender' || c.type === 'both')
                                            .length })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Destinataires" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-green-600", children: clients.filter((c) => c.type === 'recipient' || c.type === 'both').length })] })] }), _jsx(ClientList, { clients: clients, search: searchTerm, isLoading: isLoading, onEdit: handleEdit, onDelete: (id) => deleteMutation.mutate(id) })] }), isFormOpen && (_jsx(ClientForm, { onSubmit: handleSubmit, onClose: handleCloseForm, isLoading: createMutation.isPending || updateMutation.isPending, initialData: editingClient }))] }));
};
export default Clients;
