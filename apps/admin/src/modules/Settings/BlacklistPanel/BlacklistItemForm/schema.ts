import z from 'zod';
import i18next from 'i18next';
import { blacklistTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../../schema';
import { registeredFormFields } from '../../../../enums';
import { VALID_EMAIL_REGEX } from '../../../../constants';

export const BlacklistItemFormSchema = z
  .object({
    id: formFieldsSchemas.number,
    type: z.enum(blacklistTypeKeysArray),
    ipaddress: formFieldsSchemas.string.optional(),
    email: formFieldsSchemas.string.optional(),
  })
  .superRefine((model, context) => {
    if (!model.email && !model.ipaddress) {
      context.addIssue({
        code: 'custom',
        path: [registeredFormFields.email],
        message: i18next.t('form:message.error.requiredAtLeastOne'),
      });
      context.addIssue({
        code: 'custom',
        path: [registeredFormFields.ipaddress],
        message: i18next.t('form:message.error.requiredAtLeastOne'),
      });
    }

    if (model.email && !VALID_EMAIL_REGEX.test(model.email)) {
      context.addIssue({
        code: 'custom',
        path: [registeredFormFields.email],
        message: i18next.t('form:message.error.emailFormat'),
      });
    }
  });
