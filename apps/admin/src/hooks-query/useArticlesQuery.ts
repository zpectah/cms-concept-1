import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Articles, ArticlesDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.articles;

export const useArticlesQuery = ({ id }: { id?: string }) => {
  const articlesQuery = useQuery<unknown, unknown, Articles>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.articles).then((response) => response.data),
  });

  const articlesDetailQuery = useQuery<unknown, unknown, ArticlesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.articles}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const articlesCreateMutation = useMutation<unknown, unknown, ArticlesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.articles}/create`, data).then((response) => response.data),
  });

  const articlesPatchMutation = useMutation<unknown, unknown, ArticlesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.articles}/patch`, data).then((response) => response.data),
  });

  const articlesToggleMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.articles}/toggle`, data).then((response) => response.data),
  });

  const articlesDeleteMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.patch(`${API_URL.articles}/delete`, data).then((response) => response.data),
  });

  return {
    articlesQuery,
    articlesDetailQuery,
    articlesCreateMutation,
    articlesPatchMutation,
    articlesToggleMutation,
    articlesDeleteMutation,
  };
};
