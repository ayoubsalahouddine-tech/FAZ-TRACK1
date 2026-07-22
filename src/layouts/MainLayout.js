import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
const MainLayout = ({ children }) => {
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "ml-0 flex-1 overflow-auto lg:ml-sidebar", children: [_jsx(Header, {}), _jsx("main", { className: "p-8", children: children })] })] }));
};
export default MainLayout;
