import z from 'zod';
import { LoginFormSchema } from './schema';

export type ILoginForm = z.infer<typeof LoginFormSchema>;
