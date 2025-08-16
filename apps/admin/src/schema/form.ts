import z from 'zod';
import i18next from 'i18next';
import dayjs from 'dayjs';

export const formFieldsSchemas = {
  required_string: z
    .string({
      required_error: i18next.t('form:message.error.required'),
    })
    .min(1, { message: i18next.t('form:message.error.required') })
    .nonempty({ message: i18next.t('form:message.error.required') }),
  required_email: z
    .string({
      required_error: i18next.t('form:message.error.required'),
    })
    .min(1, { message: i18next.t('form:message.error.required') })
    .nonempty({ message: i18next.t('form:message.error.required') })
    .email({ message: i18next.t('form:message.error.emailFormat') }),

  boolean: z.boolean(),
  string: z.string(),
  number: z.number(),
  date: z.custom<dayjs.Dayjs>(),
  numberArray: z.array(z.number()),
  stringArray: z.array(z.string()),
};
