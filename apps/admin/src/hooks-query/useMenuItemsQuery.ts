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
  // const menuItemsQuery = useQuery<unknown, unknown, MenuItems>({
  //   queryKey: [QUERY_KEY_BASE],
  //   queryFn: () => axios.get(API_URL.menuItems).then((response) => response.data),
  // });

  const menuMenuItemsQuery = useQuery<unknown, unknown, MenuItems>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-menu-${menuId}`],
    queryFn: () => axios.get(`${API_URL.menuItems}/menu/${menuId}`).then((response) => response.data),
    enabled: !!menuId && menuId !== newItemKey,
  });

  const menuItemsDetailQuery = useQuery<unknown, unknown, MenuItemsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.menuItems}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const menuItemsCreateMutation = useMutation<{ id: number; locales: string[] }, unknown, MenuItemsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.menuItems}/create`, data).then((response) => response.data),
  });

  const menuItemsPatchMutation = useMutation<{ rows: number; locales: string[] }, unknown, MenuItemsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.menuItems}/patch`, data).then((response) => response.data),
  });

  const menuItemsToggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.menuItems}/toggle`, data).then((response) => response.data),
  });

  const menuItemsDeleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.patch(`${API_URL.menuItems}/delete`, data).then((response) => response.data),
  });

  return {
    // menuItemsQuery,
    menuMenuItemsQuery,
    menuItemsDetailQuery,
    menuItemsCreateMutation,
    menuItemsPatchMutation,
    menuItemsToggleMutation,
    menuItemsDeleteMutation,
  };
};
