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
  item_order: number;
}

export type MenuItems = MenuItemsItem[];

export interface MenuItemsDetailLocale {
  label: string;
}

export interface MenuItemsDetail extends MenuItemsItem, ItemLocaleBase<MenuItemsDetailLocale> {}

export interface MenuItemTreeItem extends MenuItemsItem {
  children: MenuItemTreeItem[];
}
