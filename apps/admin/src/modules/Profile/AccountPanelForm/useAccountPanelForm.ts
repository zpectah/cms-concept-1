import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IProfileAccountPanelForm } from './types';
import { ProfileAccountPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useAccountPanelForm = () => {
  const form = useForm<IProfileAccountPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(ProfileAccountPanelFormSchema),
  });

  const submitHandler: SubmitHandler<IProfileAccountPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    console.log('AccountPanelForm onSubmit', master);
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
