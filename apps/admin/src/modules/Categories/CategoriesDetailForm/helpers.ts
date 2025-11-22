import { categoriesTypeDefault, getFormattedString, CategoriesDetail, CategoriesDetailLocale } from '@common';
import { getModelLocales } from '../../../helpers';
import { ICategoriesDetailForm } from './types';

export const getCategoriesDetailFormDefaultValues = (locales: string[]): ICategoriesDetailForm => {
  return {
    id: 0,
    name: '',
    type: categoriesTypeDefault,
    locale: getModelLocales<CategoriesDetailLocale>(locales, {
      title: '',
      description: '',
    }),
    parent: 0,
    active: true,
    deleted: false,
  };
};

export const getCategoriesDetailFormMapper = (data: CategoriesDetail): ICategoriesDetailForm => {
  return {
    ...data,
  };
};

export const getCategoriesDetailFormMapperToMaster = (data: ICategoriesDetailForm): ICategoriesDetailForm => {
  return Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });
};
