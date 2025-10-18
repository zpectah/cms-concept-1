import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Users, UsersDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.users;

export const useUsersQuery = ({ id }: { id?: string }) => {
  const usersQuery = useQuery<unknown, unknown, Users>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.users).then((response) => response.data),
  });

  const usersDetailQuery = useQuery<unknown, unknown, UsersDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.users}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const usersCreateQuery = useMutation<unknown, unknown, UsersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.users}/create`, data).then((response) => response.data),
  });

  const usersPatchQuery = useMutation<unknown, unknown, UsersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.users}/patch`, data).then((response) => response.data),
  });

  const usersToggleQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.post(`${API_URL.users}/toggle`, data).then((response) => response.data),
  });

  const usersDeleteQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.post(`${API_URL.users}/delete`, data).then((response) => response.data),
  });

  return {
    usersQuery,
    usersDetailQuery,
    usersCreateQuery,
    usersPatchQuery,
    usersToggleQuery,
    usersDeleteQuery,
  };
};
