import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const SettingsClientPanelFormSchema = z.object({
  meta: z.object({
    title: formFieldsSchemas.required_string,
    description: formFieldsSchemas.string.optional(),
    keywords: formFieldsSchemas.stringArray.optional(),
    robots: formFieldsSchemas.required_string,
  }),
  state: z.object({
    debug: formFieldsSchemas.boolean,
    maintenance: formFieldsSchemas.boolean,
  }),
  messages: z.object({
    active: formFieldsSchemas.boolean,
  }),
  comments: z.object({
    active: formFieldsSchemas.boolean,
  }),
  members: z.object({
    active: formFieldsSchemas.boolean,
  }),
  email: z.object({
    smtp: z.object({
      port: formFieldsSchemas.number,
      host: formFieldsSchemas.string,
      username: formFieldsSchemas.string,
      password: formFieldsSchemas.string.optional(),
    }),
  }),
});
