import z from 'zod';
import i18next from 'i18next';
import dayjs from 'dayjs';

export const formFieldsSchemas = {
  required_string: z
    .string({ error: () => i18next.t('form:message.error.required') })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      error: () => i18next.t('form:message.error.required'),
    }),

  required_email: z
    .string({ error: () => i18next.t('form:message.error.required') })
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, {
      error: () => i18next.t('form:message.error.required'),
    })
    .pipe(
      z.email({
        error: () => i18next.t('form:message.error.emailFormat'),
      })
    ),

  email: z.email({
    error: () => i18next.t('form:message.error.emailFormat'),
  }),
  boolean: z.boolean({
    error: () => i18next.t('form:message.error.invalidBoolean'),
  }),

  string: z.string({
    error: () => i18next.t('form:message.error.invalidString'),
  }),

  number: z.number({
    error: () => i18next.t('form:message.error.invalidNumber'),
  }),

  stringOrNumber: z.union([
    z.string({ error: () => i18next.t('form:message.error.invalidString') }),
    z.number({ error: () => i18next.t('form:message.error.invalidNumber') }),
  ]),

  date: z.custom<dayjs.Dayjs>((val) => dayjs.isDayjs(val), {
    error: () => i18next.t('form:message.error.invalidDate'),
  }),

  numberArray: z.array(z.number({ error: () => i18next.t('form:message.error.invalidNumber') }), {
    error: () => i18next.t('form:message.error.invalidArray'),
  }),

  stringArray: z.array(z.string({ error: () => i18next.t('form:message.error.invalidString') }), {
    error: () => i18next.t('form:message.error.invalidArray'),
  }),

  stringOrNumberArray: z.array(
    z.union([
      z.string({ error: () => i18next.t('form:message.error.invalidString') }),
      z.number({ error: () => i18next.t('form:message.error.invalidNumber') }),
    ]),
    { error: () => i18next.t('form:message.error.invalidArray') }
  ),
};
