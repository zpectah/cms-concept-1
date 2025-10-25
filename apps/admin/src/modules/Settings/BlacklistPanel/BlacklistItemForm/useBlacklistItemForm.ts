import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { useAppStore } from '../../../../store';
import { getDataToFormMapper } from './helpers';
import { BlacklistItemFormSchema } from './schema';
import { IBlacklistItemForm, useBlacklistItemFormProps } from './types';

export const useBlacklistItemForm = ({ afterSubmit }: useBlacklistItemFormProps) => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const form = useForm<IBlacklistItemForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(BlacklistItemFormSchema),
  });

  const submitHandler: SubmitHandler<IBlacklistItemForm> = (data, event) => {
    const master = Object.assign({
      ...data,
    });

    // TODO
    console.log('on submit', master);

    addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);

    form.reset(getDataToFormMapper());
    afterSubmit?.();
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
