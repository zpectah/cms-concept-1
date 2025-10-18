import z from 'zod';
import { translationsTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    value: formFieldsSchemas.required_string,
  })
);

export const TranslationsDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(translationsTypeKeysArray),
  name: formFieldsSchemas.required_string,
  locale: LocaleSchema,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
});
