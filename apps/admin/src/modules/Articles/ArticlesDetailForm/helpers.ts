import { articlesTypeDefault } from '@common';
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
