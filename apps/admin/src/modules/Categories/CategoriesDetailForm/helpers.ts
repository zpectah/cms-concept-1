import { getConfig, getModelLocales } from '../../../utils';
import { ICategoriesDetailForm } from './types';

export const getCategoriesTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.categories.default;
};

export const getCategoriesDetailFormDefaultValues = (locales: string[]): ICategoriesDetailForm => {
  return {
    id: 0,
    name: '',
    type: getCategoriesTypeDefaultValue(),
    locale: getModelLocales<{ title: string; description: string | undefined }>(locales, {
      title: '',
      description: '',
    }),
    parent: 0,
    active: true,
    deleted: false,
  };
};
