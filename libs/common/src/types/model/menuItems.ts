import { menuItemsTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type MenuItemsType = keyof typeof menuItemsTypeKeys;

export interface MenuItemsItem extends ItemBase {
  type: MenuItemsType;
}

export type MenuItems = MenuItemsItem[];

interface MenuItemsDetailLocale {
  label: string;
}

export interface MenuItemsDetail extends MenuItemsItem, ItemLocaleBase<MenuItemsDetailLocale> {
  /* TODO */
}
