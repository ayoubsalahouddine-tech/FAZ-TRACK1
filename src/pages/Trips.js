import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from '../layouts/MainLayout';
const Trips = () => {
    return (_jsx(MainLayout, { children: _jsxs("div", { children: [_jsxs("div", { className: "mb-8 flex items-center justify-between", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Voyages" }), _jsx("button", { className: "rounded-lg bg-primary-700 px-4 py-2 text-white hover:bg-primary-800", children: "+ Cr\u00E9er Voyage" })] }), _jsx("div", { className: "rounded-lg bg-white p-6 shadow", children: _jsx("p", { className: "text-gray-600", children: "Aucun voyage pour le moment" }) })] }) }));
};
export default Trips;
