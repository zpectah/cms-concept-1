import dayjs from 'dayjs';
import { articlesTypeDefault, ArticlesDetail } from '@common';
import { getModelLocales } from '../../../utils';
import { addressFormDefaults } from '../../../constants';
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

    // Event
    gpsLocation: [0, 0],
    eventAddress: addressFormDefaults,
    startDate: null,
    endDate: null,
  };
};

export const getArticlesDetailFormMapper = (data: ArticlesDetail): IArticlesDetailForm => {
  return {
    ...data,

    startDate: data.startDate ? dayjs(data.startDate) : null,
    endDate: data.endDate ? dayjs(data.endDate) : null,
  };
};
