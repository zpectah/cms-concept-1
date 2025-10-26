import z from 'zod';
import { membersTypeKeysArray } from '@common';
import { formFieldsSchemas, AddressSchema } from '../../../schema';

export const MembersDetailFormSchema = z
  .object({
    id: formFieldsSchemas.number,
    type: z.enum(membersTypeKeysArray),
    name: formFieldsSchemas.required_string,
    email: formFieldsSchemas.required_email,
    password: formFieldsSchemas.string.optional(),
    first_name: formFieldsSchemas.string,
    last_name: formFieldsSchemas.string,
    address: AddressSchema.optional(),
    flat_no: formFieldsSchemas.string.optional(),
    description: formFieldsSchemas.string.optional(),
    active: formFieldsSchemas.boolean.optional(),
    deleted: formFieldsSchemas.boolean.optional(),
    created: formFieldsSchemas.string.optional(),
    updated: formFieldsSchemas.string.optional(),
  })
  .superRefine((model, context) => {});
