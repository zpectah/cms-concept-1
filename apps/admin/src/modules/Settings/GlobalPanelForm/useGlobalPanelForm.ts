import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISettingsGlobalPanelForm } from './types';
import { SettingsGlobalPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useGlobalPanelForm = () => {
  const form = useForm<ISettingsGlobalPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsGlobalPanelFormSchema),
  });

  const submitHandler: SubmitHandler<ISettingsGlobalPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    console.log('GlobalPanelForm onSubmit', master);
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
