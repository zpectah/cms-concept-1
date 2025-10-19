import { Articles, ArticlesDetail, ArticlesItem } from '@common';

export const useArticlesHelpers = () => {
  const isAttributeUnique = (articles: Articles, key: keyof ArticlesItem, object: ArticlesDetail) => {
    return !articles.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
