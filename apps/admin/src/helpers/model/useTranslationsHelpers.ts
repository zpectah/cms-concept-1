import { Translations, TranslationsDetail, TranslationsItem } from '@common';

export const useTranslationsHelpers = () => {
  const isAttributeUnique = (translations: Translations, key: keyof TranslationsItem, object: TranslationsDetail) => {
    return !translations.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
