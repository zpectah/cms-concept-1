import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const ProfileAccountPanelFormSchema = z.object({
  firstName: formFieldsSchemas.required_string,
  lastName: formFieldsSchemas.required_string,
  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.string.optional(),
  passwordConfirm: formFieldsSchemas.string.optional(),
});
