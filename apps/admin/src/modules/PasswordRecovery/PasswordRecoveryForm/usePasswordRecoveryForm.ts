import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { PasswordRecoveryFormSchema } from './schema';
import { IPasswordRecoveryForm } from './types';

export const usePasswordRecoveryForm = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { userPasswordRecoveryRequestMutation } = useUserQuery();
  const form = useForm<IPasswordRecoveryForm>({
    defaultValues: { email: '' },
    resolver: zodResolver(PasswordRecoveryFormSchema),
  });

  const { mutate: onRequest } = userPasswordRecoveryRequestMutation;

  const submitHandler: SubmitHandler<IPasswordRecoveryForm> = (data) => {
    const master = Object.assign({
      ...data,
      type: 'password-recovery',
      path: window.location.href,
    });

    onRequest(master, {
      onSuccess: (res) => {
        if (res.emailCreated && res.emailSend && res.requestCreated && res.tokenCreated) {
          addToast('Request was successfully created. Check your email schránku', 'success');
        } else {
          addToast(t('message.error.common'), 'error');
        }
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
