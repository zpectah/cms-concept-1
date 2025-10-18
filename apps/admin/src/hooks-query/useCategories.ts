import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Categories, CategoriesDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.categories;

export const useCategoriesQuery = ({ id }: { id?: string }) => {
  const categoriesQuery = useQuery<unknown, unknown, Categories>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.categories).then((response) => response.data),
  });

  const categoriesDetailQuery = useQuery<unknown, unknown, CategoriesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.categories}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const categoriesCreateMutation = useMutation<unknown, unknown, CategoriesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.categories}/create`, data).then((response) => response.data),
  });

  const categoriesPatchMutation = useMutation<unknown, unknown, CategoriesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.categories}/patch`, data).then((response) => response.data),
  });

  const categoriesToggleMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.categories}/toggle`, data).then((response) => response.data),
  });

  const categoriesDeleteMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.patch(`${API_URL.categories}/delete`, data).then((response) => response.data),
  });

  return {
    categoriesQuery,
    categoriesDetailQuery,
    categoriesCreateMutation,
    categoriesPatchMutation,
    categoriesToggleMutation,
    categoriesDeleteMutation,
  };
};
