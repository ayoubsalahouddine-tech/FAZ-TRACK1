import { z } from 'zod';
export const packageStatusEnum = z.enum([
    'registered',
    'pending',
    'loading',
    'transit',
    'arrived',
    'delivered',
    'cancelled',
]);
