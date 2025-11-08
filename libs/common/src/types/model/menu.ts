import { menuTypeKeys } from '../../enums';
import { ItemBase } from '../item';
import { EnumKeyValues } from '../common';

export type MenuType = EnumKeyValues<typeof menuTypeKeys>;

export interface MenuItem extends ItemBase {
  type: MenuType;
}

export type Menu = MenuItem[];

export type MenuDetail = MenuItem & {};
