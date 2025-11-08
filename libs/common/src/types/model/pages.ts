import { pagesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { EnumKeyValues } from '../common';

export type PagesType = EnumKeyValues<typeof pagesTypeKeys>;

export interface PagesItem extends ItemBase {
  type: PagesType;
}

export type Pages = PagesItem[];

export interface PagesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface PagesDetail extends PagesItem, ItemLocaleBase<PagesDetailLocale> {}
