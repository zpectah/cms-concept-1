import z from 'zod';
import { categoriesTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../schema';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    title: formFieldsSchemas.required_string,
    description: formFieldsSchemas.string.optional(),
  })
);

export const CategoriesDetailFormSchema = z.object({
  id: formFieldsSchemas.number,
  type: z.enum(categoriesTypeKeysArray),
  name: formFieldsSchemas.required_string,
  locale: LocaleSchema,
  active: formFieldsSchemas.boolean.optional(),
  deleted: formFieldsSchemas.boolean.optional(),
  created: formFieldsSchemas.string.optional(),
  updated: formFieldsSchemas.string.optional(),
  parent: formFieldsSchemas.number.nullable(),
});
