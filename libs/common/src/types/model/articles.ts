import { articlesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { Address, GpsLocation } from '../form';
import { EnumKeyValues } from '../common';

export type ArticlesType = EnumKeyValues<typeof articlesTypeKeys>;

export interface ArticlesItem extends ItemBase {
  type: ArticlesType;
  categories: number[];
  tags: number[];
  attachments: number[];

  // Event
  event_address?: Address;
  event_location?: GpsLocation;
  event_start?: string;
  event_end?: string;
}

export type Articles = ArticlesItem[];

export interface ArticlesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface ArticlesDetail extends ArticlesItem, ItemLocaleBase<ArticlesDetailLocale> {}
