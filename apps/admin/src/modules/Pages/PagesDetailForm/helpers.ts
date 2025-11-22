import { pagesTypeDefault, getFormattedString, PagesDetail, PagesDetailLocale } from '@common';
import { getModelLocales } from '../../../helpers';
import { IPagesDetailForm } from './types';

export const getPagesDetailFormDefaultValues = (locales: string[]): IPagesDetailForm => {
  return {
    id: 0,
    name: '',
    type: pagesTypeDefault,
    locale: getModelLocales<PagesDetailLocale>(locales, {
      title: '',
      description: '',
      content: '',
    }),
    active: true,
    deleted: false,
  };
};

export const getPagesDetailFormMapper = (data: PagesDetail): IPagesDetailForm => {
  return {
    ...data,
  };
};

export const getPagesDetailFormMapperToMaster = (data: IPagesDetailForm): IPagesDetailForm => {
  return Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });
};
