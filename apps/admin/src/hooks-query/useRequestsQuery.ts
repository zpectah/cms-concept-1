import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Requests, RequestsItem } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.requests;

export const useRequestsQuery = ({ id, token }: { id?: string; token?: string }) => {
  const requestsQuery = useQuery<unknown, unknown, Requests>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.requests).then((response) => response.data),
  });

  const requestsDetailQuery = useQuery<unknown, unknown, RequestsItem>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.requests}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const requestsDetailByTokenQuery = useQuery<unknown, unknown, RequestsItem>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.requests}/token/${token}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const requestsCreateMutation = useMutation<unknown, unknown, RequestsItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.requests}/create`, data).then((response) => response.data),
  });

  const requestsPatchMutation = useMutation<unknown, unknown, RequestsItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.requests}/patch`, data).then((response) => response.data),
  });

  const requestsToggleMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.requests}/toggle`, data).then((response) => response.data),
  });

  const requestsDeleteMutation = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.patch(`${API_URL.requests}/delete`, data).then((response) => response.data),
  });

  return {
    requestsQuery,
    requestsDetailQuery,
    requestsDetailByTokenQuery,
    requestsCreateMutation,
    requestsPatchMutation,
    requestsToggleMutation,
    requestsDeleteMutation,
  };
};
