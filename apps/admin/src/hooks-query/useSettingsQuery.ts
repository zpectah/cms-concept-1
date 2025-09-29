import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Settings } from '@common';
import { API_URL, API_KEYS } from '../constants';

const QUERY_KEY_BASE = API_KEYS.settings;

export const useSettingsQuery = () => {
  const settingsQuery = useQuery<unknown, unknown, Settings>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () => axios.get(API_URL.settings).then((response) => response.data),
  });

  return {
    settingsQuery,
  };
};
