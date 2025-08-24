import { getConfig, getModelLocales } from '../../../utils';
import { IPagesDetailForm } from './types';

export const getPagesTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.pages.default;
};

export const getPagesDetailFormDefaultValues = (locales: string[]): IPagesDetailForm => {
  return {
    id: 0,
    name: '',
    type: getPagesTypeDefaultValue(),
    locale: getModelLocales<{ title: string; description: string | undefined; content: string }>(locales, {
      title: '',
      description: '',
      content: '',
    }),
    active: true,
    deleted: false,
  };
};
