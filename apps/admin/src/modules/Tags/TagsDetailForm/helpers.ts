import { getConfig } from '../../../utils';
import { ITagsDetailForm } from './types';

export const getTagsTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.articles.default;
};

export const getTagsDetailFormDefaultValues = (): ITagsDetailForm => {
  return {
    id: 0,
    name: '',
    type: getTagsTypeDefaultValue(),
    active: true,
    deleted: false,
  };
};
