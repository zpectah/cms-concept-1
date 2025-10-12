import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Menu, MenuDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.menu;

export const useMenuQuery = (id?: string) => {
  const menuQuery = useQuery<unknown, unknown, Menu>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.menu).then((response) => response.data),
  });

  const menuDetailQuery = useQuery<unknown, unknown, MenuDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.menu}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const menuCreateQuery = useMutation<unknown, unknown, MenuDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.menu}/create`, data).then((response) => response.data),
  });

  const menuPatchQuery = useMutation<unknown, unknown, MenuDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.menu}/patch`, data).then((response) => response.data),
  });

  return {
    menuQuery,
    menuDetailQuery,
    menuCreateQuery,
    menuPatchQuery,
  };
};
