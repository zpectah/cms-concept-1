import z from 'zod';
import { attachmentsTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

export const AttachmentsQueueItemSchema = z.object({
  type: z.enum(attachmentsTypeKeysArray),
  content: formFieldsSchemas.required_string,
  mime: formFieldsSchemas.required_string,
  size: formFieldsSchemas.number,
  name: formFieldsSchemas.required_string,
  extension: formFieldsSchemas.required_string,
  uid: formFieldsSchemas.required_string,
});

const AttachmentsQueueSchema = z.array(AttachmentsQueueItemSchema);

export const AttachmentsCreateFormSchema = z.object({
  queue: AttachmentsQueueSchema,
  options: z.object({
    path: formFieldsSchemas.string.optional(),
    context: formFieldsSchemas.string.optional(),
  }),
});
