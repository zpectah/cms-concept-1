import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { newItemKey, Translations, TranslationsDetail } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.translations;

export const useTranslationsQuery = (id?: string) => {
  const translationsQuery = useQuery<unknown, unknown, Translations>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.translations).then((response) => response.data),
  });

  const translationsDetailQuery = useQuery<unknown, unknown, TranslationsDetail>({
    queryKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-${id}`],
    queryFn: () => axios.get(`${API_URL.translations}/id/${id}`).then((response) => response.data),
    enabled: !!id && id !== newItemKey,
  });

  const translationsCreateQuery = useMutation<unknown, unknown, TranslationsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-create`],
    mutationFn: (data) => axios.post(`${API_URL.translations}/create`, data).then((response) => response.data),
  });

  const translationsPatchQuery = useMutation<unknown, unknown, TranslationsDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) => axios.patch(`${API_URL.translations}/patch`, data).then((response) => response.data),
  });

  return {
    translationsQuery,
    translationsDetailQuery,
    translationsCreateQuery,
    translationsPatchQuery,
  };
};
