import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const PasswordRecoveryFormSchema = z.object({
  email: formFieldsSchemas.required_email,
});
