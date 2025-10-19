import z from 'zod';
import { ProfileAccountFormSchema } from './schema';

export type IProfileAccountForm = z.infer<typeof ProfileAccountFormSchema>;
