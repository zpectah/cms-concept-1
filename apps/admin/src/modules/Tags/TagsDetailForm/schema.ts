import z from 'zod';
import { tagsTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const TagsDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(tagsTypeKeysArray),
  name: formFieldsSchemas.required_string,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
