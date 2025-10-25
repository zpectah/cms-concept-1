import z from 'zod';
import i18next from 'i18next';
import dayjs from 'dayjs';
import { articlesTypeKeys, articlesTypeKeysArray } from '@common';
import { AddressSchema, formFieldsSchemas, GpsLocationSchema } from '../../../schema';
import { registeredFormFields } from '../../../enums';

const LocaleSchema = z.record(
  z.string(),
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
    event_start: formFieldsSchemas.date.nullable().optional(),
    event_end: formFieldsSchemas.date.nullable().optional(),

    event_address: AddressSchema.optional(),
    event_location: GpsLocationSchema.optional(),
  })
  .superRefine((model, context) => {
    const isEvent = model.type === articlesTypeKeys.event;

    if (isEvent) {
      if (!model.event_start) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.event_start],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (!model.event_end) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.event_end],
          message: i18next.t('form:message.error.required'),
        });
      }

      if (
        dayjs.isDayjs(model.event_start) &&
        dayjs.isDayjs(model.event_end) &&
        model.event_end.isBefore(model.event_start)
      ) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.event_end],
          message: i18next.t('form:message.error.endDateBeforeStartDate'),
        });
      }
    }
  });
