import z from 'zod';
import { messagesTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const MessagesDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(messagesTypeKeysArray),
  name: formFieldsSchemas.required_string,
  sender: formFieldsSchemas.required_email,
  subject: formFieldsSchemas.required_string,
  content: formFieldsSchemas.required_string,
  read: formFieldsSchemas.boolean.optional(),
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
