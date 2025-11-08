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
    event_location: [0, 0],
    event_address: addressFormDefaults,
    event_start: null,
    event_end: null,
  };
};

export const getArticlesDetailFormMapper = (data: ArticlesDetail): IArticlesDetailForm => {
  return {
    ...data,

    event_start: data.event_start ? dayjs(data.event_start) : null,
    event_end: data.event_end ? dayjs(data.event_end) : null,
    event_address: {
      ...data.event_address,
      zip: String(data.event_address?.zip ?? ''),
    },
  };
};

export const getArticlesDetailFormMapperToMaster = (data: IArticlesDetailForm): IArticlesDetailForm => {
  return Object.assign({
    ...data,
  });
};
