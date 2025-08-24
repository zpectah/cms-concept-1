import { pagesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type PagesType = keyof typeof pagesTypeKeys;

export interface PagesItem extends ItemBase {
  type: PagesType;
}

export type Pages = PagesItem[];

interface PagesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface PagesDetail extends PagesItem, ItemLocaleBase<PagesDetailLocale> {}
