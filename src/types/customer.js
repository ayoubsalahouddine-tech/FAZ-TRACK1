import { z } from 'zod';
export const customerTypeEnum = z.enum(['individual', 'business']);
export const customerStatusEnum = z.enum(['active', 'inactive', 'suspended']);
