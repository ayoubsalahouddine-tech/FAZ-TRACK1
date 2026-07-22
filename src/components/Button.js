import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
    const baseStyles = 'font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variants = {
        primary: 'bg-primary-700 text-white hover:bg-primary-800 focus:ring-primary-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };
    const sizes = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    return (_jsx("button", { className: `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`, ...props, children: children }));
};
export default Button;
