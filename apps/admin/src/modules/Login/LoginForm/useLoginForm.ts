import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConfig } from '../../../utils';
import { useUserQuery } from '../../../hooks-query';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { LoginFormSchema } from './schema';
import { ILoginForm } from './types';
import { LoginFormDefaults } from './constants';
import { useAppStore } from '../../../store';
import { useTranslation } from 'react-i18next';

export const useLoginForm = () => {
  const {
    admin: { routes },
  } = getConfig();

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
                  addToast('Message: success', 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
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
          // TODO
          console.warn('Password wont match');
        }
      },
      onError: (err) => {
        console.warn(err);
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    user,
  };
};
