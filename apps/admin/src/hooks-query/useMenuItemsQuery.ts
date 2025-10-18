import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, MenuItems, MenuItemsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.menuItems;

interface useMenuItemsQueryProps {
  id?: string;
  menuId?: string;
}

export const useMenuItemsQuery = ({ id, menuId }: useMenuItemsQueryProps) => {
  const menuItemsPath = menuId ? `${API_URL.menuItems}/menu/${menuId}` : API_URL.menuItems;

  const menuItemsQuery = useQuery<unknown, unknown, MenuItems>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(menuItemsPath).then((response) => response.data),
  });

  const menuItemsDetailQuery = useQuery<unknown, unknown, MenuItemsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.menuItems}/id/${id}`).then((response) => response.data),
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

  const menuItemsToggleQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.post(`${API_URL.menuItems}/toggle`, data).then((response) => response.data),
  });

  const menuItemsDeleteQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.post(`${API_URL.menuItems}/delete`, data).then((response) => response.data),
  });

  return {
    menuItemsQuery,
    menuItemsDetailQuery,
    menuItemsCreateQuery,
    menuItemsPatchQuery,
    menuItemsToggleQuery,
    menuItemsDeleteQuery,
  };
};
