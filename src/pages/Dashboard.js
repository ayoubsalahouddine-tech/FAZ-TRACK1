import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from '../layouts/MainLayout';
const Dashboard = () => {
    return (_jsx(MainLayout, { children: _jsxs("div", { children: [_jsx("h1", { className: "mb-8 text-3xl font-bold text-gray-900", children: "Tableau de Bord" }), _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
                        { title: 'Total Colis', value: '1,234', change: '+12%' },
                        { title: 'Voyages Actifs', value: '45', change: '+5%' },
                        { title: 'Camions Disponibles', value: '28', change: '+2%' },
                        { title: 'Chauffeurs', value: '52', change: '+8%' },
                    ].map((stat) => (_jsxs("div", { className: "rounded-lg bg-white p-6 shadow", children: [_jsx("h3", { className: "text-sm font-medium text-gray-600", children: stat.title }), _jsx("p", { className: "mt-2 text-3xl font-bold text-gray-900", children: stat.value }), _jsxs("p", { className: "mt-1 text-sm text-green-600", children: [stat.change, " ce mois"] })] }, stat.title))) }), _jsxs("div", { className: "mt-8 grid gap-6 lg:grid-cols-3", children: [_jsxs("div", { className: "lg:col-span-2 rounded-lg bg-white p-6 shadow", children: [_jsx("h2", { className: "mb-4 text-lg font-bold text-gray-900", children: "Activit\u00E9 R\u00E9cente" }), _jsx("p", { className: "text-gray-600", children: "Aucune activit\u00E9 r\u00E9cente" })] }), _jsxs("div", { className: "rounded-lg bg-white p-6 shadow", children: [_jsx("h2", { className: "mb-4 text-lg font-bold text-gray-900", children: "Actions Rapides" }), _jsxs("div", { className: "space-y-2", children: [_jsx("button", { className: "w-full rounded-lg bg-primary-700 py-2 text-white hover:bg-primary-800", children: "Nouveau Colis" }), _jsx("button", { className: "w-full rounded-lg bg-gray-200 py-2 text-gray-900 hover:bg-gray-300", children: "Nouveau Voyage" }), _jsx("button", { className: "w-full rounded-lg bg-gray-200 py-2 text-gray-900 hover:bg-gray-300", children: "Ajouter Client" })] })] })] })] }) }));
};
export default Dashboard;
