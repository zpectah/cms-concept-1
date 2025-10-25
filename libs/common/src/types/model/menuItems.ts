import { menuItemsTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type MenuItemsType = keyof typeof menuItemsTypeKeys;

export interface MenuItemsItem extends ItemBase {
  type: MenuItemsType;
  parent_id: number;
  menu_id: number;
  link_page?: number;
  link_url?: string;
}

export type MenuItems = MenuItemsItem[];

interface MenuItemsDetailLocale {
  label: string;
}

export interface MenuItemsDetail extends MenuItemsItem, ItemLocaleBase<MenuItemsDetailLocale> {}
