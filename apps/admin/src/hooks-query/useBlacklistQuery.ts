import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Blacklist, BlacklistItem } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.blacklist;

export const useBlacklistQuery = (id?: string) => {
  const blacklistQuery = useQuery<unknown, unknown, Blacklist>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.blacklist).then((response) => response.data),
  });

  const blacklistDetailQuery = useQuery<unknown, unknown, BlacklistItem>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.blacklist}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const blacklistCreateQuery = useMutation<unknown, unknown, BlacklistItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.blacklist}/create`, data).then((response) => response.data),
  });

  const blacklistPatchQuery = useMutation<unknown, unknown, BlacklistItem>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.blacklist}/patch`, data).then((response) => response.data),
  });

  return {
    blacklistQuery,
    blacklistDetailQuery,
    blacklistCreateQuery,
    blacklistPatchQuery,
  };
};
