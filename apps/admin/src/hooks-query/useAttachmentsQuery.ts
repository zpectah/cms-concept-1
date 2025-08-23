import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Attachments, AttachmentsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.attachments;

export const useAttachmentsQuery = (id?: string) => {
  const attachmentsQuery = useQuery<unknown, unknown, Attachments>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.attachments).then((response) => response.data),
  });

  const attachmentsDetailQuery = useQuery<unknown, unknown, AttachmentsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.attachments}/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const attachmentsCreateQuery = useMutation<unknown, unknown, AttachmentsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.attachments}/create`, data).then((response) => response.data),
  });

  const attachmentsPatchQuery = useMutation<unknown, unknown, AttachmentsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.attachments}/patch`, data).then((response) => response.data),
  });

  return {
    attachmentsQuery,
    attachmentsDetailQuery,
    attachmentsCreateQuery,
    attachmentsPatchQuery,
  };
};
