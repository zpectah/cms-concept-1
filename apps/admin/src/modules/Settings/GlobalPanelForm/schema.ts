import z from 'zod';
import { formFieldsSchemas } from '../../../schema';

export const SettingsGlobalPanelFormSchema = z.object({
  projectName: formFieldsSchemas.required_string,
  projectDescription: formFieldsSchemas.string.optional(),
  companyName: formFieldsSchemas.string.optional(),
  companyDescription: formFieldsSchemas.string.optional(),
  companyId: formFieldsSchemas.string.optional(),
  companyEmail: formFieldsSchemas.stringArray.optional(),
  companyPhone: formFieldsSchemas.stringArray.optional(),

  companyAddress: formFieldsSchemas.string.optional(),
  companyStreet: formFieldsSchemas.string.optional(),
  companyStreetNo: formFieldsSchemas.string.optional(),
  companyCity: formFieldsSchemas.string.optional(),
  companyCountry: formFieldsSchemas.string.optional(),
  companyZip: formFieldsSchemas.string.optional(),

  companyLocation: formFieldsSchemas.numberArray.optional(),
  companyBank: formFieldsSchemas.string.optional(),
});
