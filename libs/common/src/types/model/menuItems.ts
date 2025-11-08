import { menuItemsTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { EnumKeyValues } from '../common';

export type MenuItemsType = EnumKeyValues<typeof menuItemsTypeKeys>;

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
