import { Menu, MenuDetail, MenuItem } from '@common';

export const useMenuHelpers = () => {
  const isAttributeUnique = (menu: Menu, key: keyof MenuItem, object: MenuDetail) => {
    return !menu.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
