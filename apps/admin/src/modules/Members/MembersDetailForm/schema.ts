import z from 'zod';
import i18next from 'i18next';
import { membersTypeKeysArray } from '@common';
import { formFieldsSchemas, AddressSchema } from '../../../schema';
import { registeredFormFields } from '../../../enums';

export const MembersDetailFormSchema = z
  .object({
    id: formFieldsSchemas.number,
    type: z.enum(membersTypeKeysArray),
    name: formFieldsSchemas.required_string,

    email: formFieldsSchemas.required_email,
    password: formFieldsSchemas.string.optional(),

    firstName: formFieldsSchemas.string,
    lastName: formFieldsSchemas.string,

    address: AddressSchema.optional(),
    flatNo: formFieldsSchemas.string.optional(),

    active: formFieldsSchemas.boolean.optional(),
    deleted: formFieldsSchemas.boolean.optional(),
    created: formFieldsSchemas.string.optional(),
    updated: formFieldsSchemas.string.optional(),
  })
  .superRefine((model, context) => {
    const isNew = model.id === 0;

    if (isNew) {
      if (!model.password) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.password],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (model.password && model.password?.length <= 5) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.password],
          message: i18next.t('form:message.error.insufficientChars'),
        });
      }
    }
  });
