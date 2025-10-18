import { tagsColorDefault, tagsTypeDefault, TagsDetail } from '@common';
import { ITagsDetailForm } from './types';

export const getTagsDetailFormDefaultValues = (): ITagsDetailForm => {
  return {
    id: 0,
    name: '',
    type: tagsTypeDefault,
    color: tagsColorDefault,
    active: true,
    deleted: false,
  };
};

export const getTagsDetailFormMapper = (data: TagsDetail): ITagsDetailForm => {
  return {
    ...data,
  };
};
