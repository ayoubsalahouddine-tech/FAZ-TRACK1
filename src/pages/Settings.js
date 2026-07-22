import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from '../layouts/MainLayout';
const Settings = () => {
    return (_jsx(MainLayout, { children: _jsxs("div", { children: [_jsx("h1", { className: "mb-8 text-3xl font-bold text-gray-900", children: "Param\u00E8tres" }), _jsx("div", { className: "space-y-6", children: [
                        {
                            title: 'Profil',
                            description: 'Gérer vos informations personnelles',
                        },
                        {
                            title: 'Sécurité',
                            description: 'Gérer les accès et les permissions',
                        },
                        {
                            title: 'Notifications',
                            description: 'Configurer vos préférences de notifications',
                        },
                        {
                            title: 'Intégrations',
                            description: 'Gérer les intégrations externes',
                        },
                    ].map((setting) => (_jsxs("div", { className: "flex items-center justify-between rounded-lg bg-white p-6 shadow", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-bold text-gray-900", children: setting.title }), _jsx("p", { className: "mt-1 text-sm text-gray-600", children: setting.description })] }), _jsx("button", { className: "rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800", children: "Configurer" })] }, setting.title))) })] }) }));
};
export default Settings;
