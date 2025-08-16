import { IArticlesDetailForm } from './types';
import { getConfig, getModelLocales } from '../../../utils';

export const getArticlesTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.articles.default;
};

export const getArticlesDetailFormDefaultValues = (locales: string[]): IArticlesDetailForm => {
  return {
    id: 0,
    name: '',
    type: getArticlesTypeDefaultValue(),
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
