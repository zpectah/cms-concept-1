import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Settings } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.settings;

export const useSettingsQuery = () => {
  const settingsQuery = useQuery<unknown, unknown, Settings>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.settings).then((response) => response.data),
  });

  const settingsPatchMutation = useMutation<unknown, unknown, Partial<Settings>>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-update`],
    mutationFn: (data) => axios.patch(`${API_URL.settings}/patch`, data).then((response) => response.data),
  });

  const settingsLocaleInstallMutation = useMutation<unknown, unknown, { locale: string }>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-install`],
    mutationFn: (data) => axios.patch(`${API_URL.settings}/locale-install`, data).then((response) => response.data),
  });

  const settingsLocaleDefaultMutation = useMutation<unknown, unknown, { locale: string }>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-default`],
    mutationFn: (data) => axios.patch(`${API_URL.settings}/locale-default`, data).then((response) => response.data),
  });

  const settingsLocaleToggleMutation = useMutation<unknown, unknown, { locale: string }>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-locale-toggle`],
    mutationFn: (data) => axios.patch(`${API_URL.settings}/locale-toggle`, data).then((response) => response.data),
  });

  return {
    settingsQuery,
    settingsPatchMutation,
    settingsLocaleInstallMutation,
    settingsLocaleDefaultMutation,
    settingsLocaleToggleMutation,
  };
};
