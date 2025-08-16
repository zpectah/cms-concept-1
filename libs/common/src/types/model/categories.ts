import { categoriesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type CategoriesType = keyof typeof categoriesTypeKeys;

export interface CategoriesItem extends ItemBase {
  type: CategoriesType;
  parent: number;
}

export type Categories = CategoriesItem[];

interface CategoriesDetailLocale {
  title: string;
  description?: string;
}

export interface CategoriesDetail extends CategoriesItem, ItemLocaleBase<CategoriesDetailLocale> {
  /* TODO */
}
