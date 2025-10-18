import { pagesTypeDefault, PagesDetail } from '@common';
import { getModelLocales } from '../../../utils';
import { IPagesDetailForm } from './types';

export const getPagesDetailFormDefaultValues = (locales: string[]): IPagesDetailForm => {
  return {
    id: 0,
    name: '',
    type: pagesTypeDefault,
    locale: getModelLocales<{ title: string; description: string | undefined; content: string }>(locales, {
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
