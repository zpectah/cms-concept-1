import { Categories, CategoriesDetail, CategoriesItem } from '@common';

export const useCategoriesHelpers = () => {
  const isAttributeUnique = (categories: Categories, key: keyof CategoriesItem, object: CategoriesDetail) => {
    return !categories.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
