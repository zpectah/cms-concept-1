import z from 'zod';
import i18next from 'i18next';
import { menuItemsTypeKeys, menuItemsTypeKeysArray } from '@common';
import { formFieldsSchemas } from '../../../../schema';
import { registeredFormFields } from '../../../../enums';

const LocaleSchema = z.record(
  z.string(),
  z.object({
    label: formFieldsSchemas.required_string,
  })
);

export const MenuItemsDetailFormSchema = z
  .object({
    id: formFieldsSchemas.number,
    type: z.enum(menuItemsTypeKeysArray),
    name: formFieldsSchemas.required_string,
    locale: LocaleSchema,
    active: formFieldsSchemas.boolean.optional(),
    deleted: formFieldsSchemas.boolean.optional(),
    created: formFieldsSchemas.string.optional(),
    updated: formFieldsSchemas.string.optional(),
    parent_id: formFieldsSchemas.number.nullable().optional(),
    menu_id: formFieldsSchemas.number,
    link_page: formFieldsSchemas.number.nullable().optional(),
    link_url: formFieldsSchemas.string.optional(),
    item_order: formFieldsSchemas.number,
  })
  .superRefine((model, context) => {
    const isExternal = model.type === menuItemsTypeKeys.external;

    if (isExternal) {
      if (!model.link_url || model.link_url === '') {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.link_url],
          message: i18next.t('form:message.error.required'),
        });
      }
    } else {
      if (model.link_page === 0) {
        context.addIssue({
          code: 'custom',
          path: [registeredFormFields.link_page],
          message: i18next.t('form:message.error.required'),
        });
      }
    }
  });
