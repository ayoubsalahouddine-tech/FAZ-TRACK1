import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard, Users, Package, Truck, Navigation, DollarSign, BarChart3, Settings, LogOut, } from 'lucide-react';
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const menuItems = [
        { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/dashboard' },
        { icon: Users, label: 'Clients', path: '/clients' },
        { icon: Package, label: 'Colis', path: '/packages' },
        { icon: Navigation, label: 'Voyages', path: '/trips' },
        { icon: Truck, label: 'Camions', path: '/trucks' },
        { icon: Users, label: 'Chauffeurs', path: '/drivers' },
        { icon: DollarSign, label: 'Caisse', path: '/cashbox' },
        { icon: BarChart3, label: 'Rapports', path: '/reports' },
        { icon: Settings, label: 'Paramètres', path: '/settings' },
    ];
    const isActive = (path) => location.pathname === path;
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: "fixed left-4 top-4 z-50 rounded-lg bg-primary-700 p-2 text-white lg:hidden", children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsxs("aside", { className: `fixed left-0 top-0 h-screen w-sidebar transform bg-gradient-to-b from-primary-700 to-primary-800 text-white transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`, children: [_jsxs("div", { className: "border-b border-primary-600 px-6 py-8", children: [_jsx("h1", { className: "text-2xl font-bold", children: "FAZ TRACK" }), _jsx("p", { className: "mt-1 text-sm text-primary-200", children: "Gestion Transport" })] }), _jsx("nav", { className: "flex-1 overflow-y-auto px-4 py-6", children: _jsx("ul", { className: "space-y-2", children: menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (_jsx("li", { children: _jsxs(Link, { to: item.path, onClick: () => setIsOpen(false), className: `flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${active
                                            ? 'bg-white text-primary-700'
                                            : 'text-primary-100 hover:bg-primary-600'}`, children: [_jsx(Icon, { size: 20 }), _jsx("span", { className: "text-sm font-medium", children: item.label })] }) }, item.path));
                            }) }) }), _jsx("div", { className: "border-t border-primary-600 p-4", children: _jsxs("button", { className: "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-primary-100 transition-all hover:bg-primary-600", children: [_jsx(LogOut, { size: 20 }), _jsx("span", { className: "text-sm font-medium", children: "D\u00E9connexion" })] }) })] }), isOpen && (_jsx("div", { onClick: () => setIsOpen(false), className: "fixed inset-0 z-40 bg-black/50 lg:hidden" }))] }));
};
export default Sidebar;
