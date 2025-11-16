import dayjs from 'dayjs';
import { articlesTypeDefault, getFormattedString, ArticlesDetail, ArticlesDetailLocale } from '@common';
import { getModelLocales } from '../../../utils';
import { addressFormDefaults } from '../../../constants';
import { IArticlesDetailForm } from './types';

export const getArticlesDetailFormDefaultValues = (locales: string[]): IArticlesDetailForm => {
  return {
    id: 0,
    name: '',
    type: articlesTypeDefault,
    locale: getModelLocales<ArticlesDetailLocale>(locales, {
      title: '',
      description: '',
      content: '',
    }),
    categories: [],
    tags: [],
    attachments: [],
    approved: false,
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

export const getCloneArticlesDetailFormMapper = (data: ArticlesDetail): IArticlesDetailForm => {
  const localData = getArticlesDetailFormMapper(data);

  return {
    ...localData,
    id: 0,
    name: `clone-${localData.name}`,
  };
};

export const getArticlesDetailFormMapperToMaster = (data: IArticlesDetailForm): IArticlesDetailForm => {
  return Object.assign({
    ...data,
    name: getFormattedString(data.name),
  });
};
