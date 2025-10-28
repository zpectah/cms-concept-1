import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConfig } from '../../../utils';
import { useUserQuery } from '../../../hooks-query';
import { TOAST_ERROR_TIMEOUT_DEFAULT } from '../../../constants';
import { LoginFormSchema } from './schema';
import { ILoginForm } from './types';
import { LoginFormDefaults } from './constants';
import { useAppStore } from '../../../store';
import { useEffect } from 'react';

export const useLoginForm = () => {
  const {
    admin: { routes },
  } = getConfig();

  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { userQuery, userCheckPasswordMutation, userLoginMutation } = useUserQuery();
  const form = useForm<ILoginForm>({
    defaultValues: LoginFormDefaults,
    resolver: zodResolver(LoginFormSchema),
  });

  const { data: user } = userQuery;
  const { mutate: onCheckPassword } = userCheckPasswordMutation;
  const { mutate: onLogin } = userLoginMutation;

  const paramReason = searchParams.get('reason');

  const submitHandler: SubmitHandler<ILoginForm> = (data) => {
    const master = Object.assign({ ...data });

    onCheckPassword(master, {
      onSuccess: ({ match, id }) => {
        if (match) {
          onLogin(
            {
              email: master.email,
              id,
            },
            {
              onSuccess: ({ open, session }) => {
                if (open) {
                  setTimeout(() => (document.location = `/${routes.dashboard.path}?login=success`), 1500);
                } else {
                  addToast(t('message.error.common'), 'error');
                }
              },
              onError: (err) => {
                addToast(t('message.error.common'), 'error');
                console.warn(err);
              },
            }
          );
        } else {
          addToast(t('message.error.incorrectPassword'), 'error', TOAST_ERROR_TIMEOUT_DEFAULT);
        }
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });
  };

  const afterLogoutHandler = () => {
    // TODO: Fix - triggers twice
    // addToast(t('message.success.logoutSuccess'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
    setSearchParams((state) => {
      state.delete('reason');

      return state;
    });
  };

  const expiredSessionHandler = () => {
    // TODO: Fix - triggers twice
    // addToast(t('message.info.expiredSession'), 'info');
    setSearchParams((state) => {
      state.delete('reason');

      return state;
    });
  };

  useEffect(() => {
    if (paramReason === 'user') afterLogoutHandler();
    if (paramReason === 'expired-session') expiredSessionHandler();
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    user,
  };
};
