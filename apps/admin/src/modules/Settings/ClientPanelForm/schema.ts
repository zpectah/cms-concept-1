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
    recipients: formFieldsSchemas.stringArray.optional(),
  }),
  comments: z.object({
    active: formFieldsSchemas.boolean,
    anonymous: formFieldsSchemas.boolean,
  }),
  members: z.object({
    active: formFieldsSchemas.boolean,
  }),
});
