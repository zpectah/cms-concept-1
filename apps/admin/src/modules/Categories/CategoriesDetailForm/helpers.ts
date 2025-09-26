import { categoriesTypeDefault } from '@common';
import { getModelLocales } from '../../../utils';
import { ICategoriesDetailForm } from './types';

export const getCategoriesDetailFormDefaultValues = (locales: string[]): ICategoriesDetailForm => {
  return {
    id: 0,
    name: '',
    type: categoriesTypeDefault,
    locale: getModelLocales<{ title: string; description: string | undefined }>(locales, {
      title: '',
      description: '',
    }),
    parent: 0,
    active: true,
    deleted: false,
  };
};
