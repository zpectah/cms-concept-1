import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const PasswordRecoveryTokenFormSchema = z.object({
  token: formFieldsSchemas.required_string,
  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.required_string,
  passwordConfirm: formFieldsSchemas.required_string,
});
