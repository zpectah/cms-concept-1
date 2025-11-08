import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const ProfileAccountFormSchema = z.object({
  id: formFieldsSchemas.number,
  name: formFieldsSchemas.string,
  first_name: formFieldsSchemas.string.optional(),
  last_name: formFieldsSchemas.string.optional(),
  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.string.optional(),
  passwordConfirm: formFieldsSchemas.string.optional(),
  avatar_image: formFieldsSchemas.string.optional(),
  avatar_hash: formFieldsSchemas.string.optional(),
});

// TODO: handle for situation when new password is set ...
