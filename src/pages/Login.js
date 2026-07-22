import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../components/Button';
const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});
const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit = (data) => {
        console.log('Login data:', data);
    };
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900", children: _jsxs("div", { className: "w-full max-w-md rounded-lg bg-white p-8 shadow-2xl", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-primary-700", children: "FAZ TRACK" }), _jsx("p", { className: "mt-2 text-gray-600", children: "Gestion de Transport" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900", children: "Email" }), _jsx("input", { type: "email", ...register('email'), className: "mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20", placeholder: "votre@email.com" }), errors.email && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.email.message }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900", children: "Mot de passe" }), _jsx("input", { type: "password", ...register('password'), className: "mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && (_jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password.message }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", className: "rounded border-gray-300" }), _jsx("span", { className: "ml-2 text-sm text-gray-600", children: "Se souvenir de moi" })] }), _jsx("a", { href: "#", className: "text-sm text-primary-700 hover:underline", children: "Mot de passe oubli\u00E9?" })] }), _jsx(Button, { type: "submit", size: "lg", className: "w-full", children: "Se connecter" })] })] }) }));
};
export default Login;
