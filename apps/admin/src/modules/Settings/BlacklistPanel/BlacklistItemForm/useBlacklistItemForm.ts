import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { useAppStore } from '../../../../store';
import { useBlacklistQuery } from '../../../../hooks-query';
import { getDataToFormMapper } from './helpers';
import { BlacklistItemFormSchema } from './schema';
import { IBlacklistItemForm, useBlacklistItemFormProps } from './types';

export const useBlacklistItemForm = ({ afterSubmit }: useBlacklistItemFormProps) => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { blacklistQuery, blacklistCreateMutation } = useBlacklistQuery({});
  const form = useForm<IBlacklistItemForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(BlacklistItemFormSchema),
  });

  const { refetch } = blacklistQuery;
  const { mutate: onCreate } = blacklistCreateMutation;

  const submitHandler: SubmitHandler<IBlacklistItemForm> = (data, event) => {
    const master = Object.assign({
      ...data,
    });

    onCreate(master, {
      onSuccess: (res) => {
        console.log('res', res);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        form.reset(getDataToFormMapper());
        afterSubmit?.();
        refetch();
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
