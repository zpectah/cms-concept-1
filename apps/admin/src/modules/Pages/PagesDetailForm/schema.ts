import z from 'zod';
import { pagesTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

const LocaleSchema = z.record(
  z.object({
    title: formFieldsSchemas.required_string,
    description: formFieldsSchemas.string.optional(),
    content: formFieldsSchemas.required_string,
  })
);

export const PagesDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(pagesTypeKeysArray),
  name: formFieldsSchemas.required_string,
  locale: LocaleSchema,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
