import { translationsTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';

export type TranslationsType = keyof typeof translationsTypeKeys;

export interface TranslationsItem extends ItemBase {
  type: TranslationsType;
}

export type Translations = TranslationsItem[];

interface TranslationsDetailLocale {
  value: string;
}

export interface TranslationsDetail extends TranslationsItem, ItemLocaleBase<TranslationsDetailLocale> {
  /* TODO */
}
