import { articlesTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { Address, GpsLocation } from '../form';

export type ArticlesType = keyof typeof articlesTypeKeys;

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

interface ArticlesDetailLocale {
  title: string;
  description?: string;
  content: string;
}

export interface ArticlesDetail extends ArticlesItem, ItemLocaleBase<ArticlesDetailLocale> {}
