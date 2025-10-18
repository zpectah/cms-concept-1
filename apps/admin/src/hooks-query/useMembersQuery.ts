import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Members, MembersDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.members;

export const useMembersQuery = ({ id }: { id?: string }) => {
  const membersQuery = useQuery<unknown, unknown, Members>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.members).then((response) => response.data),
  });

  const membersDetailQuery = useQuery<unknown, unknown, MembersDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.members}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const membersCreateQuery = useMutation<unknown, unknown, MembersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.members}/create`, data).then((response) => response.data),
  });

  const membersPatchQuery = useMutation<unknown, unknown, MembersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.members}/patch`, data).then((response) => response.data),
  });

  const membersToggleQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.post(`${API_URL.members}/toggle`, data).then((response) => response.data),
  });

  const membersDeleteQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.post(`${API_URL.members}/delete`, data).then((response) => response.data),
  });

  return {
    membersQuery,
    membersDetailQuery,
    membersCreateQuery,
    membersPatchQuery,
    membersToggleQuery,
    membersDeleteQuery,
  };
};
