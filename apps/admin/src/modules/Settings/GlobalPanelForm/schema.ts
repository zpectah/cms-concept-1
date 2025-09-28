import z from 'zod';
import { formFieldsSchemas, AddressSchema, GpsLocationSchema } from '../../../schema';

export const SettingsGlobalPanelFormSchema = z.object({
  projectName: formFieldsSchemas.required_string,
  projectDescription: formFieldsSchemas.string.optional(),
  companyName: formFieldsSchemas.string.optional(),
  companyDescription: formFieldsSchemas.string.optional(),
  companyId: formFieldsSchemas.string.optional(),
  companyEmail: formFieldsSchemas.stringArray.optional(),
  companyPhone: formFieldsSchemas.stringArray.optional(),
  companyAddress: AddressSchema.optional(),
  companyLocation: GpsLocationSchema.optional(),
  companyBank: formFieldsSchemas.string.optional(),
});
