import { Tags, TagsDetail, TagsItem } from '@common';

export const useTagsHelpers = () => {
  const isAttributeUnique = (tags: Tags, key: keyof TagsItem, object: TagsDetail) => {
    return !tags.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
