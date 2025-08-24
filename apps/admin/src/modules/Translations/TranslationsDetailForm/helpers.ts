import { getConfig, getModelLocales } from '../../../utils';
import { ITranslationsDetailForm } from './types';

export const getTranslationsTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.translations.default;
};

export const getTranslationsDetailFormDefaultValues = (locales: string[]): ITranslationsDetailForm => {
  return {
    id: 0,
    name: '',
    type: getTranslationsTypeDefaultValue(),
    locale: getModelLocales<{ value: string }>(locales, {
      value: '',
    }),
    active: true,
    deleted: false,
  };
};
