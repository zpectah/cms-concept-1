import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Pages, PagesDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.pages;

export const usePagesQuery = (id?: string) => {
  const pagesQuery = useQuery<unknown, unknown, Pages>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.pages).then((response) => response.data),
  });

  const pagesDetailQuery = useQuery<unknown, unknown, PagesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.pages}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const pagesCreateQuery = useMutation<unknown, unknown, PagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.pages}/create`, data).then((response) => response.data),
  });

  const pagesPatchQuery = useMutation<unknown, unknown, PagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.pages}/patch`, data).then((response) => response.data),
  });

  return {
    pagesQuery,
    pagesDetailQuery,
    pagesCreateQuery,
    pagesPatchQuery,
  };
};
