import z from 'zod';
import { menuTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const MenuDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(menuTypeKeysArray),
  name: formFieldsSchemas.required_string,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
