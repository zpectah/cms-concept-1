import z from 'zod';
import { PasswordRecoveryFormSchema } from './schema';

export type IPasswordRecoveryForm = z.infer<typeof PasswordRecoveryFormSchema>;
