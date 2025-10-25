import z from 'zod';
import { formFieldsSchemas } from './form';

export const AddressSchema = z.object({
  street: formFieldsSchemas.string.optional(),
  street_no: formFieldsSchemas.string.optional(),
  district: formFieldsSchemas.string.optional(),
  city: formFieldsSchemas.string.optional(),
  country: formFieldsSchemas.string.optional(),
  zip: z.number().nullable().optional(),
});
