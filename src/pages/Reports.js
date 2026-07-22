import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from '../layouts/MainLayout';
const Reports = () => {
    return (_jsx(MainLayout, { children: _jsxs("div", { children: [_jsx("h1", { className: "mb-8 text-3xl font-bold text-gray-900", children: "Rapports" }), _jsx("div", { className: "grid gap-6 md:grid-cols-2", children: [
                        {
                            title: 'Rapport de Livraison',
                            description: 'Suivi complet des colis livrés',
                        },
                        {
                            title: 'Rapport Financier',
                            description: 'Vue d\'ensemble des revenus et dépenses',
                        },
                        {
                            title: 'Rapport de Performance',
                            description: 'Analyse de performance des chauffeurs',
                        },
                        {
                            title: 'Rapport de Parc',
                            description: 'État du parc automobile',
                        },
                    ].map((report) => (_jsxs("div", { className: "cursor-pointer rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-lg", children: [_jsx("h3", { className: "font-bold text-gray-900", children: report.title }), _jsx("p", { className: "mt-2 text-sm text-gray-600", children: report.description }), _jsx("button", { className: "mt-4 text-sm font-medium text-primary-700 hover:text-primary-800", children: "Voir Rapport \u2192" })] }, report.title))) })] }) }));
};
export default Reports;
