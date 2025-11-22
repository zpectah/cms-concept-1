import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { getConfig } from '../../../config';
import { PasswordRecoveryTokenFormSchema } from './schema';
import { IPasswordRecoveryTokenForm } from './types';

export const usePasswordRecoveryTokenForm = () => {
  const [tokenError, setTokenError] = useState(false);

  const { routes } = getConfig();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { userPasswordRecoveryRequestCheckMutation, userPasswordRecoveryTokenMutation } = useUserQuery();
  const form = useForm<IPasswordRecoveryTokenForm>({
    defaultValues: { token: '', email: '', password: '', passwordConfirm: '' },
    resolver: zodResolver(PasswordRecoveryTokenFormSchema),
  });

  const paramToken = searchParams.get('token');

  const { mutate: onCheck } = userPasswordRecoveryRequestCheckMutation;
  const { mutate: onRequestToken } = userPasswordRecoveryTokenMutation;

  const submitHandler: SubmitHandler<IPasswordRecoveryTokenForm> = (data) => {
    if (tokenError) return;

    if (data.password !== data.passwordConfirm) {
      form.setError('passwordConfirm', { message: 'Passwords do not match' }); // TODO

      return;
    }

    const master = Object.assign({
      token: data.token,
      email: data.email,
      password: data.password,
    });

    onRequestToken(master, {
      onSuccess: (res) => {
        if (res.requestActive && res.userActive && res.requestUpdated && res.userUpdated) {
          form.reset({ token: '', email: '', password: '', passwordConfirm: '' });
          navigate(`/${routes.login.path}`);
        } else {
          // TODO: specify error
          addToast(t('message.error.common'), 'error');
        }
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });
  };

  useEffect(() => {
    if (paramToken) form.setValue('token', paramToken);
  }, [paramToken]);

  useEffect(() => {
    setTokenError(false);
    onCheck(
      { token: paramToken ?? '' },
      {
        onSuccess: (res) => {
          if (res.email) {
            form.setValue('email', res.email);
          } else {
            setTokenError(true);
          }
        },
        onError: (err) => {
          addToast(t('message.error.common'), 'error');
          console.warn(err);
        },
      }
    );
  }, []);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    paramToken,
    tokenError,
  };
};
