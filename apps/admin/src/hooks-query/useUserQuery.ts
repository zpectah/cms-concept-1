import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UsersDetail } from '@common';
import { API_KEYS, API_URL } from '../constants';

const QUERY_KEY_BASE = API_KEYS.user;

export const useUserQuery = () => {
  const userQuery = useQuery<unknown, unknown, { active: boolean; user: UsersDetail | null }>({
    queryKey: [QUERY_KEY_BASE],
    queryFn: () =>
      axios
        .get(API_URL.user, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userPatchMutation = useMutation<{ rows: number }, unknown, UsersDetail>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-patch`],
    mutationFn: (data) =>
      axios
        .patch(`${API_URL.user}/patch`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userCheckEmailMutation = useMutation<{ match: boolean }, unknown, { email: string }>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-check-email`],
    mutationFn: (data) => axios.post(`${API_URL.user}/check-email`, data).then((response) => response.data),
  });

  const userCheckPasswordMutation = useMutation<
    { match: boolean; id: number },
    unknown,
    { email: string; password: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-check-password`],
    mutationFn: (data) => axios.post(`${API_URL.user}/check-password`, data).then((response) => response.data),
  });

  const userLoginMutation = useMutation<
    { open: boolean; session: { id: number; email: string } },
    unknown,
    { email: string; id: number }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-login`],
    mutationFn: (data) =>
      axios
        .post(`${API_URL.user}/login`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userLogoutMutation = useMutation<{ open: boolean; session: unknown }, unknown, unknown>({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-logout`],
    mutationFn: (data) =>
      axios
        .post(`${API_URL.user}/logout`, data, {
          withCredentials: true,
        })
        .then((response) => response.data),
  });

  const userPasswordRecoveryRequestMutation = useMutation<
    { tokenCreated: boolean; requestCreated: boolean; emailCreated: boolean; emailSend: boolean },
    unknown,
    { email: string; type: string; path: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-password-recovery-request`],
    mutationFn: (data) =>
      axios.post(`${API_URL.user}/password-recovery-request`, data).then((response) => response.data),
  });

  const userPasswordRecoveryRequestCheckMutation = useMutation<
    { id?: number; email: string | null },
    unknown,
    { token: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-password-recovery-request-check`],
    mutationFn: (data) =>
      axios.post(`${API_URL.user}/password-recovery-request-check`, data).then((response) => response.data),
  });

  const userPasswordRecoveryTokenMutation = useMutation<
    { requestActive: boolean; userActive: boolean; userUpdated: boolean; requestUpdated: boolean },
    unknown,
    { token: string; email: string; password: string }
  >({
    mutationKey: [QUERY_KEY_BASE, `${QUERY_KEY_BASE}-password-recovery-token`],
    mutationFn: (data) => axios.post(`${API_URL.user}/password-recovery-token`, data).then((response) => response.data),
  });

  return {
    userQuery,
    userPatchMutation,
    userCheckEmailMutation,
    userCheckPasswordMutation,
    userLoginMutation,
    userLogoutMutation,
    userPasswordRecoveryRequestMutation,
    userPasswordRecoveryRequestCheckMutation,
    userPasswordRecoveryTokenMutation,
  };
};
