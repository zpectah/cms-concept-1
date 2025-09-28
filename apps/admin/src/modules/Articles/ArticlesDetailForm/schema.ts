import z from 'zod';
import i18next from 'i18next';
import dayjs from 'dayjs';
import { articlesTypeKeys, articlesTypeKeysArray } from '@common';
import { AddressSchema, formFieldsSchemas, GpsLocationSchema } from '../../../schema';
import { registeredFormFields } from '../../../enums';

const LocaleSchema = z.record(
  z.object({
    title: formFieldsSchemas.required_string,
    description: formFieldsSchemas.string.optional(),
    content: formFieldsSchemas.required_string,
  })
);

export const ArticlesDetailFormSchema = z
  .object({
    id: formFieldsSchemas.number,
    type: z.enum(articlesTypeKeysArray),
    name: formFieldsSchemas.required_string,
    locale: LocaleSchema,
    active: formFieldsSchemas.boolean.optional(),
    deleted: formFieldsSchemas.boolean.optional(),
    created: formFieldsSchemas.string.optional(),
    updated: formFieldsSchemas.string.optional(),
    categories: formFieldsSchemas.numberArray.optional(),
    tags: formFieldsSchemas.numberArray.optional(),
    attachments: formFieldsSchemas.numberArray.optional(),

    // Event
    startDate: formFieldsSchemas.date.nullable().optional(),
    endDate: formFieldsSchemas.date.nullable().optional(),
    eventAddress: AddressSchema.optional(),
    gpsLocation: GpsLocationSchema.optional(),
  })
  .superRefine((model, context) => {
    const isEvent = model.type === articlesTypeKeys.event;

    if (isEvent) {
      if (!model.startDate) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.startDate],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (!model.endDate) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.endDate],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (dayjs.isDayjs(model.startDate) && dayjs.isDayjs(model.endDate) && model.endDate.isBefore(model.startDate)) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.endDate],
          message: i18next.t('form:message.error.endDateBeforeStartDate'),
        });
      }
    }
  });
