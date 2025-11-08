import { categoriesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { EnumKeyValues } from '../common';

export type CategoriesType = EnumKeyValues<typeof categoriesTypeKeys>;

export interface CategoriesItem extends ItemBase {
  type: CategoriesType;
  parent: number;
}

export type Categories = CategoriesItem[];

export interface CategoriesDetailLocale {
  title: string;
  description?: string;
}

export interface CategoriesDetail extends CategoriesItem, ItemLocaleBase<CategoriesDetailLocale> {}
