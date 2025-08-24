import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Comments, CommentsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.comments;

export const useCommentsQuery = (id?: string) => {
  const commentsQuery = useQuery<unknown, unknown, Comments>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.comments).then((response) => response.data),
  });

  const commentsDetailQuery = useQuery<unknown, unknown, CommentsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.comments}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const commentsCreateQuery = useMutation<unknown, unknown, CommentsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.comments}/create`, data).then((response) => response.data),
  });

  const commentsPatchQuery = useMutation<unknown, unknown, CommentsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.comments}/patch`, data).then((response) => response.data),
  });

  return {
    commentsQuery,
    commentsDetailQuery,
    commentsCreateQuery,
    commentsPatchQuery,
  };
};
