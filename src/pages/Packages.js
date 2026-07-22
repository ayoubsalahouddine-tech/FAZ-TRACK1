import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Search, Plus } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import PackageList from '../components/PackageList';
import PackageForm from '../components/PackageForm';
import { packageService } from '../services/packageService';
import { queryClient } from '../lib/queryClient';
import { customerService } from '../services/customerService';
const Packages = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState(null);
    // Fetch packages with filters
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages', searchTerm, filterStatus],
        queryFn: () => packageService.getPackages(searchTerm || undefined, filterStatus || undefined),
        staleTime: 1000 * 60 * 5,
    });
    // Create package mutation
    const createMutation = useMutation({
        mutationFn: async (data) => {
            // Get customer names
            const sender = await customerService.getCustomerById(data.senderId);
            const recipient = await customerService.getCustomerById(data.recipientId);
            if (!sender || !recipient) {
                throw new Error('Client introuvable');
            }
            return packageService.createPackage(data, `${sender.firstName} ${sender.lastName}`, `${recipient.firstName} ${recipient.lastName}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packages'] });
            setIsFormOpen(false);
            setEditingPackage(null);
        },
    });
    // Update package mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => packageService.updatePackage(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packages'] });
            setIsFormOpen(false);
            setEditingPackage(null);
        },
    });
    // Delete package mutation
    const deleteMutation = useMutation({
        mutationFn: (id) => packageService.deletePackage(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['packages'] });
        },
    });
    const handleSubmit = async (data) => {
        if (editingPackage) {
            await updateMutation.mutateAsync({
                id: editingPackage.id,
                data,
            });
        }
        else {
            await createMutation.mutateAsync(data);
        }
    };
    const handleEdit = (packageItem) => {
        setEditingPackage(packageItem);
        setIsFormOpen(true);
    };
    const handleViewDetails = (_packageItem) => { };
    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingPackage(null);
    };
    const handleOpenForm = () => {
        setEditingPackage(null);
        setIsFormOpen(true);
    };
    const stats = {
        total: packages.length,
        registered: packages.filter((p) => p.status === 'registered').length,
        transit: packages.filter((p) => p.status === 'loading' || p.status === 'transit').length,
        delivered: packages.filter((p) => p.status === 'delivered').length,
    };
    return (_jsxs(MainLayout, { children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Colis" }), _jsx("p", { className: "mt-1 text-gray-600", children: "Enregistrez et suivez vos colis" })] }), _jsxs("button", { onClick: handleOpenForm, className: "flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800", children: [_jsx(Plus, { size: 20 }), "Nouveau colis"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { size: 20, className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Rechercher par num\u00E9ro de suivi, exp\u00E9diteur, destinataire, ville...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20" })] }), _jsx("div", { className: "flex gap-3", children: _jsxs("select", { value: filterStatus, onChange: (e) => setFilterStatus(e.target.value), className: "rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20", children: [_jsx("option", { value: "", children: "Tous les statuts" }), _jsx("option", { value: "registered", children: "Enregistr\u00E9" }), _jsx("option", { value: "pending", children: "En attente" }), _jsx("option", { value: "loading", children: "En chargement" }), _jsx("option", { value: "transit", children: "En transit" }), _jsx("option", { value: "arrived", children: "Arriv\u00E9" }), _jsx("option", { value: "delivered", children: "Livr\u00E9" }), _jsx("option", { value: "cancelled", children: "Annul\u00E9" })] }) }), _jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [_jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Total colis" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-gray-900", children: stats.total })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Enregistr\u00E9s" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-blue-600", children: stats.registered })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "En transit" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-orange-600", children: stats.transit })] }), _jsxs("div", { className: "rounded-lg bg-white p-4 shadow", children: [_jsx("p", { className: "text-sm text-gray-600", children: "Livr\u00E9s" }), _jsx("p", { className: "mt-1 text-2xl font-bold text-green-600", children: stats.delivered })] })] }), _jsx(PackageList, { packages: packages, search: searchTerm, isLoading: isLoading, onEdit: handleEdit, onDelete: (id) => deleteMutation.mutate(id), onViewDetails: handleViewDetails })] }), isFormOpen && (_jsx(PackageForm, { onSubmit: handleSubmit, onClose: handleCloseForm, isLoading: createMutation.isPending || updateMutation.isPending, initialData: editingPackage ?? undefined }))] }));
};
export default Packages;
