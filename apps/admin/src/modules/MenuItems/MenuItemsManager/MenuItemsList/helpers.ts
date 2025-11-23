import { MenuItemTreeItem } from '@common';

export const sortMenuItems = (items: MenuItemTreeItem[]): MenuItemTreeItem[] => {
  return [...items].sort((a, b) => {
    return a.item_order - b.item_order;
  });
};
