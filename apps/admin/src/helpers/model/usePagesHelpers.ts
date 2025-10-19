import { Pages, PagesDetail, PagesItem } from '@common';

export const usePagesHelpers = () => {
  const isAttributeUnique = (pages: Pages, key: keyof PagesItem, object: PagesDetail) => {
    return !pages.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
