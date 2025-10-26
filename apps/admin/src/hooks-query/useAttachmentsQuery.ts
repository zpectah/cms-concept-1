import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Attachments, AttachmentsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';
import { FileUploaderTransportQueue, FileUploaderTransportQueueItem } from '../types';

const QUERY_KEY_BASE = API_KEYS.attachments;

export const useAttachmentsQuery = ({ id }: { id?: string }) => {
  const attachmentsQuery = useQuery<unknown, unknown, Attachments>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.attachments).then((response) => response.data),
  });

  const attachmentsDetailQuery = useQuery<unknown, unknown, AttachmentsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.attachments}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const attachmentsFileCreateMutation = useMutation<number[], unknown, FileUploaderTransportQueue>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-file-create`],
    mutationFn: (data) =>
      axios
        .post(`${API_URL.attachments}/file-create`, data, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .then((response) => response.data),
  });

  const attachmentsCreateMutation = useMutation<{ id: number[] }, unknown, FileUploaderTransportQueueItem[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.attachments}/create`, data).then((response) => response.data),
  });

  const attachmentsPatchMutation = useMutation<{ rows: number }, unknown, AttachmentsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.attachments}/patch`, data).then((response) => response.data),
  });

  const attachmentsToggleMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.attachments}/toggle`, data).then((response) => response.data),
  });

  const attachmentsDeleteMutation = useMutation<{ rows: number }, unknown, number[]>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-delete`],
    mutationFn: (data) => axios.patch(`${API_URL.attachments}/delete`, data).then((response) => response.data),
  });

  return {
    attachmentsQuery,
    attachmentsDetailQuery,
    attachmentsFileCreateMutation,
    attachmentsCreateMutation,
    attachmentsPatchMutation,
    attachmentsToggleMutation,
    attachmentsDeleteMutation,
  };
};
