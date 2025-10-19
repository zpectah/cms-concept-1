import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { API_URL, API_KEYS } from '../constants';
import { MaintenanceAnalyzeResults } from '../types';

const QUERY_KEY_BASE = API_KEYS.maintenance;

export const useMaintenanceQuery = () => {
  const analyzeModelItemsMutation = useMutation<MaintenanceAnalyzeResults, unknown, object>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-analyze-model-items`],
    mutationFn: (data) =>
      axios.patch(`${API_URL.maintenance}/analyze-model-items`, data).then((response) => response.data),
  });

  const deletePermanentModelItemsMutation = useMutation<unknown, unknown, MaintenanceAnalyzeResults>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-permanent-delete-model-items`],
    mutationFn: (data) =>
      axios.patch(`${API_URL.maintenance}/permanent-delete-model-items`, data).then((response) => response.data),
  });

  return {
    analyzeModelItemsMutation,
    deletePermanentModelItemsMutation,
  };
};
