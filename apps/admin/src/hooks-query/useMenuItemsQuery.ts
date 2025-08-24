import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, MenuItems, MenuItemsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.menuItems;

export const useMenuItemsQuery = (id?: string) => {
  const menuItemsQuery = useQuery<unknown, unknown, MenuItems>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.menuItems).then((response) => response.data),
  });

  const menuItemsDetailQuery = useQuery<unknown, unknown, MenuItemsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.menuItems}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const menuItemsCreateQuery = useMutation<unknown, unknown, MenuItemsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.menuItems}/create`, data).then((response) => response.data),
  });

  const menuItemsPatchQuery = useMutation<unknown, unknown, MenuItemsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.menuItems}/patch`, data).then((response) => response.data),
  });

  return {
    menuItemsQuery,
    menuItemsDetailQuery,
    menuItemsCreateQuery,
    menuItemsPatchQuery,
  };
};
