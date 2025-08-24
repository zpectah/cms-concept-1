import z from 'zod';
import { usersTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const UsersDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(usersTypeKeysArray),
  name: formFieldsSchemas.required_string,

  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.string.optional(),

  firstName: formFieldsSchemas.string,
  lastName: formFieldsSchemas.string,

  accessLevel: formFieldsSchemas.number,

  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
