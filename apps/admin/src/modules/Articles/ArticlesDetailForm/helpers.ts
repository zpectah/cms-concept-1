import { articlesTypeDefault } from '@common';
import { getModelLocales } from '../../../utils';
import { IArticlesDetailForm } from './types';

export const getArticlesDetailFormDefaultValues = (locales: string[]): IArticlesDetailForm => {
  return {
    id: 0,
    name: '',
    type: articlesTypeDefault,
    locale: getModelLocales<{ title: string; description: string | undefined; content: string }>(locales, {
      title: '',
      description: '',
      content: '',
    }),
    categories: [],
    tags: [],
    attachments: [],
    active: true,
    deleted: false,
    startDate: null,
    endDate: null,
    location: '',
  };
};
