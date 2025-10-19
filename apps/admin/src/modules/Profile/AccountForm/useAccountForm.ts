import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDataToFormMapper } from './helpers';
import { ProfileAccountFormSchema } from './schema';
import { IProfileAccountForm } from './types';

export const useAccountForm = () => {
  const form = useForm<IProfileAccountForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(ProfileAccountFormSchema),
  });

  const submitHandler: SubmitHandler<IProfileAccountForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    // TODO: compare both passwords if there are any ...

    console.log('AccountForm onSubmit', master);
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
