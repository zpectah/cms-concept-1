import { articlesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type ArticlesType = keyof typeof articlesTypeKeys;

export interface ArticlesItem extends ItemBase {
  type: ArticlesType;
  categories: number[];
  tags: number[];
  attachments: number[];
}

export type Articles = ArticlesItem[];

interface ArticlesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface ArticlesDetail extends ArticlesItem, ItemLocaleBase<ArticlesDetailLocale> {
  startDate?: string;
  endDate?: string;
  location?: string;
}
