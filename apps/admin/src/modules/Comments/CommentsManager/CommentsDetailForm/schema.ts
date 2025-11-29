import z from 'zod';
import { commentsTypeKeysArray, modelKeysArray } from '@common';
import { formFieldsSchemas } from '../../../../schema';

export const CommentsItemDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  name: formFieldsSchemas.required_string,
  type: z.enum(commentsTypeKeysArray),
  sender: formFieldsSchemas.required_string,
  content_type: z.enum(modelKeysArray),
  content_id: formFieldsSchemas.number,
  parent: formFieldsSchemas.number,
  subject: formFieldsSchemas.required_string,
  content: formFieldsSchemas.string.optional(),
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
