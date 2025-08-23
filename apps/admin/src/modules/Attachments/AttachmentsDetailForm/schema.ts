import z from 'zod';
import { attachmentsTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const AttachmentsDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(attachmentsTypeKeysArray),
  name: formFieldsSchemas.required_string,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
  file_name: formFieldsSchemas.string.optional(),
  file_type: formFieldsSchemas.string.optional(),
  file_ext: formFieldsSchemas.string.optional(),
  file_size: formFieldsSchemas.number.optional(),
});
