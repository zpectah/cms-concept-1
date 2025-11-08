import { translationsTypeDefault, TranslationsDetail } from '@common';
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

export const getTranslationsDetailFormMapper = (data: TranslationsDetail): ITranslationsDetailForm => {
  return {
    ...data,
  };
};

export const getTranslationsDetailFormMapperToMaster = (data: ITranslationsDetailForm): ITranslationsDetailForm => {
  return Object.assign({
    ...data,
  });
};
