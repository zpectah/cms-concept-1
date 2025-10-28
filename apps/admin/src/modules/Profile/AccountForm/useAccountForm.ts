import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserQuery } from '../../../hooks-query';
import { getAccountFormDefaultValues, getDataToFormMapper, getDataToFormMasterMapper } from './helpers';
import { ProfileAccountFormSchema } from './schema';
import { IProfileAccountForm } from './types';

export const useAccountForm = () => {
  const { userQuery, userPatchMutation } = useUserQuery();
  const form = useForm<IProfileAccountForm>({
    defaultValues: getAccountFormDefaultValues(),
    resolver: zodResolver(ProfileAccountFormSchema),
  });

  const { data: userData } = userQuery;
  const { mutate: onPatch } = userPatchMutation;

  const submitHandler: SubmitHandler<IProfileAccountForm> = (data, event) => {
    if (!data) return;

    if (data.password) {
      if (data.password !== data.passwordConfirm) {
        // TODO: compare both passwords if there are any ...
        // TODO: message
        return;
      }
    }

    const master = getDataToFormMasterMapper({
      ...userData?.user,
      ...data,
    });

    onPatch(master, {
      onSuccess: (res) => {
        // TODO
        console.log('res', res);
      },
      onError: (err) => {
        // TODO
        console.warn(err);
      },
    });
  };

  useEffect(() => {
    if (userData?.user) {
      form.reset(getDataToFormMapper(userData?.user));
    }
  }, [userData]);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
