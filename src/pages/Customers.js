import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Search, Plus, Filter } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import { customerService } from '../services/customerService';
import { queryClient } from '../lib/queryClient';
const Customers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    // Fetch customers with filters
    const { data: customers = [], isLoading } = useQuery({
        queryKey: ['customers', searchTerm, filterStatus, filterType],
        queryFn: () => customerService.getCustomers(searchTerm || undefined, filterStatus || undefined, filterType || undefined),
        staleTime: 1000 * 60 * 5,
    });
    // Create customer mutation
    const createMutation = useMutation({
        mutationFn: (data) => customerService.createCustomer(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            setIsFormOpen(false);
            setEditingCustomer(null);
        },
    });
    // Update customer mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => customerService.updateCustomer(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
            setIsFormOpen(false);
            setEditingCustomer(null);
        },
    });
    // Delete customer mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => customerService.deleteCustomer(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customers'] });
        },
    });
    const handleSubmit = async (data) => {
        if (editingCustomer) {
            await updateMutation.mutateAsync({
                id: editingCustomer.id,
                data,
            });
        }
        else {
            await createMutation.mutateAsync(data);
        }
    };
    const handleEdit = (customer) => {
        setEditingCustomer(customer);
        setIsFormOpen(true);
    };
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingCustomer(null);
    };
    const handleOpenForm = () => {
        setEditingCustomer(null);
        setIsFormOpen(true);
    };
    const stats = {
        total: customers.length,
        individual: customers.filter((c) => c.type === 'individual').length,
        business: customers.filter((c) => c.type === 'business').length,
        active: customers.filter((c) => c.status === 'active').length,
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Clients" }), _jsx("p", { className: "mt-1 text-gray-600", children: "G\u00E9rez vos clients et leurs informations" })] }), _jsxs("button", { onClick: handleOpenForm, className: "flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800", children: [_jsx(Plus, { size: 20 }), "Nouveau client"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 20, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Rechercher un client (nom, email, t\u00E9l\u00E9phone, entreprise)...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20" })] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { size: 18, className: "text-gray-600" }), _jsx("span", { className: "text-sm font-medium text-gray-700", children: "Filtres:" })] }), _jsxs("select", { value: filterType, onChange: (e) => setFilterType(e.target.value), className: "rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20", children: [_jsx("option", { value: "", children: "Tous les types" }), _jsx("option", { value: "individual", children: "Particulier" }), _jsx("option", { value: "business", children: "Entreprise" })] }), _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20", children: [_jsx("option", { value: "", children: "Tous les statuts" }), _jsx("option", { value: "active", children: "Actif" }), _jsx("option", { value: "inactive", children: "Inactif" }), _jsx("option", { value: "suspended", children: "Suspendu" })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [_jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total clients" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-gray-900", children: stats.total })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Particuliers" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-blue-600", children: stats.individual })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Entreprises" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-purple-600", children: stats.business })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Actifs" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-green-600", children: stats.active })] })] }), _jsx(CustomerList, { customers: customers, search: searchTerm, isLoading: isLoading, onEdit: handleEdit, onDelete: (id) => deleteMutation.mutate(id) })] }), isFormOpen && (_jsx(CustomerForm, { onSubmit: handleSubmit, onClose: handleCloseForm, isLoading: createMutation.isPending || updateMutation.isPending, initialData: editingCustomer ?? undefined }))] }));
};
export default Customers;
