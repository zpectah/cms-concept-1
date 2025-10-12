import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Requests, RequestsItem } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.requests;

export const useRequestsQuery = (id?: string) => {
  const requestsQuery = useQuery<unknown, unknown, Requests>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.requests).then((response) => response.data),
  });

  const requestsDetailQuery = useQuery<unknown, unknown, RequestsItem>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.requests}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const requestsCreateQuery = useMutation<unknown, unknown, RequestsItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.requests}/create`, data).then((response) => response.data),
  });

  const requestsPatchQuery = useMutation<unknown, unknown, RequestsItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.requests}/patch`, data).then((response) => response.data),
  });

  return {
    requestsQuery,
    requestsDetailQuery,
    requestsCreateQuery,
    requestsPatchQuery,
  };
};
