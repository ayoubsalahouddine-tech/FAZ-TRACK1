import { z } from 'zod';
export const clientTypeEnum = z.enum(['sender', 'recipient', 'both']);
