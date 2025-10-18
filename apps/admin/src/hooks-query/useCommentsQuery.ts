import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Comments, CommentsDetail, Model } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.comments;

interface useCommentsQueryProps {
  id?: string;
  contentType?: Model;
  contentId?: number;
}

export const useCommentsQuery = ({ id, contentType, contentId }: useCommentsQueryProps) => {
  const commentsPath = contentType && contentId ? `${API_URL.comments}/${contentType}/${contentId}` : API_URL.comments;

  const commentsQuery = useQuery<unknown, unknown, Comments>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(commentsPath).then((response) => response.data),
  });

  const commentsDetailQuery = useQuery<unknown, unknown, CommentsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.comments}/id/${id}`).then((response) => response.data),
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

  const commentsToggleQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.post(`${API_URL.comments}/toggle`, data).then((response) => response.data),
  });

  const commentsDeleteQuery = useMutation<unknown, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.post(`${API_URL.comments}/delete`, data).then((response) => response.data),
  });

  return {
    commentsQuery,
    commentsDetailQuery,
    commentsCreateQuery,
    commentsPatchQuery,
    commentsToggleQuery,
    commentsDeleteQuery,
  };
};
