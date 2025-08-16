import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const LoginFormSchema = z.object({
  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.required_string,
});
