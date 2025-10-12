import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Messages, MessagesDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.messages;

export const useMessagesQuery = (id?: string) => {
  const messagesQuery = useQuery<unknown, unknown, Messages>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.messages).then((response) => response.data),
  });

  const messagesDetailQuery = useQuery<unknown, unknown, MessagesDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.messages}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const messagesCreateQuery = useMutation<unknown, unknown, MessagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.messages}/create`, data).then((response) => response.data),
  });

  const messagesPatchQuery = useMutation<unknown, unknown, MessagesDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.messages}/patch`, data).then((response) => response.data),
  });

  return {
    messagesQuery,
    messagesDetailQuery,
    messagesCreateQuery,
    messagesPatchQuery,
  };
};
