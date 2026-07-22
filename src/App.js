import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Packages from './pages/Packages';
import Trips from './pages/Trips';
import Trucks from './pages/Trucks';
import Drivers from './pages/Drivers';
import Cashbox from './pages/Cashbox';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/clients", element: _jsx(Clients, {}) }), _jsx(Route, { path: "/packages", element: _jsx(Packages, {}) }), _jsx(Route, { path: "/trips", element: _jsx(Trips, {}) }), _jsx(Route, { path: "/trucks", element: _jsx(Trucks, {}) }), _jsx(Route, { path: "/drivers", element: _jsx(Drivers, {}) }), _jsx(Route, { path: "/cashbox", element: _jsx(Cashbox, {}) }), _jsx(Route, { path: "/reports", element: _jsx(Reports, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard" }) })] }) }) }));
}
export default App;
