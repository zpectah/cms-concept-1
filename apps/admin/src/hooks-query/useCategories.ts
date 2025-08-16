import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Categories, CategoriesDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.categories;

export const useCategoriesQuery = (id?: string) => {
  const categoriesQuery = useQuery<unknown, unknown, Categories>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.categories).then((response) => response.data),
  });

  const categoriesDetailQuery = useQuery<unknown, unknown, CategoriesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.categories}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const categoriesCreateQuery = {
    /* TODO */
  };

  const categoriesPatchQuery = {
    /* TODO */
  };

  return {
    categoriesQuery,
    categoriesDetailQuery,
    categoriesCreateQuery,
    categoriesPatchQuery,
  };
};
