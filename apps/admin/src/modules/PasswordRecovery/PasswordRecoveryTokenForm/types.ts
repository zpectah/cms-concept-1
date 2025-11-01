import z from 'zod';
import { PasswordRecoveryTokenFormSchema } from './schema';

export type IPasswordRecoveryTokenForm = z.infer<typeof PasswordRecoveryTokenFormSchema>;
