import { translationsTypeKeys } from '../../enums';
import { ItemBase, ItemLocaleBase } from '../item';
import { EnumKeyValues } from '../common';

export type TranslationsType = EnumKeyValues<typeof translationsTypeKeys>;

export interface TranslationsItem extends ItemBase {
  type: TranslationsType;
}

export type Translations = TranslationsItem[];

interface TranslationsDetailLocale {
  value: string;
}

export interface TranslationsDetail extends TranslationsItem, ItemLocaleBase<TranslationsDetailLocale> {}
