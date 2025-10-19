import { MenuItems, MenuItemsDetail, MenuItemsItem } from '@common';

export const useMenuItemsHelpers = () => {
  const isAttributeUnique = (menuItems: MenuItems, key: keyof MenuItemsItem, object: MenuItemsDetail) => {
    return !menuItems.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
