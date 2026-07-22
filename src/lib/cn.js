function toVal(mix) {
    if (typeof mix === 'string' || typeof mix === 'number')
        return String(mix);
    if (Array.isArray(mix))
        return mix.map(toVal).filter(Boolean).join(' ');
    return '';
}
/**
 * Utility function to merge CSS class names.
 * Filters out falsy values and joins with a space.
 */
export function cn(...inputs) {
    return inputs.map(toVal).filter(Boolean).join(' ');
}
