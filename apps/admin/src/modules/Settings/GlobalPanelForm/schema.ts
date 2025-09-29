import z from 'zod';
import { formFieldsSchemas, AddressSchema, GpsLocationSchema } from '../../../schema';

export const SettingsGlobalPanelFormSchema = z.object({
  project: z.object({
    name: formFieldsSchemas.required_string,
    description: formFieldsSchemas.string.optional(),
  }),
  company: z.object({
    name: formFieldsSchemas.string.optional(),
    description: formFieldsSchemas.string.optional(),
    id: formFieldsSchemas.string.optional(),
    email: formFieldsSchemas.stringArray.optional(),
    phone: formFieldsSchemas.stringOrNumberArray.optional(),
    address: AddressSchema.optional(),
    location: GpsLocationSchema.optional(),
    bank: formFieldsSchemas.string.optional(),
  }),
});
