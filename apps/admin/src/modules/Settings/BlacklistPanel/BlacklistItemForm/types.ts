import z from 'zod';
import { BlacklistItemFormSchema } from './schema';

export type IBlacklistItemForm = z.infer<typeof BlacklistItemFormSchema>;
