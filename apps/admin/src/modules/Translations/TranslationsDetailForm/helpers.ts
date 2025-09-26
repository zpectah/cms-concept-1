import { translationsTypeDefault } from '@common';
import { getModelLocales } from '../../../utils';
import { ITranslationsDetailForm } from './types';

export const getTranslationsDetailFormDefaultValues = (locales: string[]): ITranslationsDetailForm => {
  return {
    id: 0,
    name: '',
    type: translationsTypeDefault,
    locale: getModelLocales<{ value: string }>(locales, {
      value: '',
    }),
    active: true,
    deleted: false,
  };
};
