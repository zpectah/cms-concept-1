import z from 'zod';
import { membersTypeKeysArray } from '@common';
import { formFieldsSchemas, AddressSchema } from '../../../schema';

export const MembersDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(membersTypeKeysArray),
  name: formFieldsSchemas.required_string,

  email: formFieldsSchemas.required_email,
  password: formFieldsSchemas.string.optional(),

  firstName: formFieldsSchemas.string,
  lastName: formFieldsSchemas.string,

  address: AddressSchema.optional(),

  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
