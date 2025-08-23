import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Tags, TagsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.tags;

export const useTagsQuery = (id?: string) => {
  const tagsQuery = useQuery<unknown, unknown, Tags>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.tags).then((response) => response.data),
  });

  const tagsDetailQuery = useQuery<unknown, unknown, TagsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.tags}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const tagsCreateQuery = useMutation<unknown, unknown, TagsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.tags}/create`, data).then((response) => response.data),
  });

  const tagsPatchQuery = useMutation<unknown, unknown, TagsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.tags}/patch`, data).then((response) => response.data),
  });

  return {
    tagsQuery,
    tagsDetailQuery,
    tagsCreateQuery,
    tagsPatchQuery,
  };
};
