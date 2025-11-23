import { menuItemsTypeDefault, MenuItemsDetail, MenuItemsDetailLocale, getFormattedString } from '@common';
import { getModelLocales } from '../../../../helpers';
import { IMenuItemsDetailForm } from './types';

export const getMenuItemsDefaultValues = (locales: string[], menuId?: string): IMenuItemsDetailForm => {
  return {
    id: 0,
    name: '',
    type: menuItemsTypeDefault,
    locale: getModelLocales<MenuItemsDetailLocale>(locales, {
      label: '',
    }),
    menu_id: menuId ? Number(menuId) : 0,
    parent_id: 0,
    link_page: 0,
    link_url: '',
    item_order: 0,
    active: true,
    deleted: false,
  };
};

export const getMenuItemsDetailFormMapper = (data: MenuItemsDetail): IMenuItemsDetailForm => {
  return {
    ...data,
  };
};

export const getMenuItemsDetailFormMapperToMaster = (data: IMenuItemsDetailForm): IMenuItemsDetailForm => {
  return Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });
};
