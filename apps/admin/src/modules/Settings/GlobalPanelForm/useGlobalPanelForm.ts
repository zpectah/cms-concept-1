import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSettingsQuery } from '../../../hooks-query';
import { ISettingsGlobalPanelForm } from './types';
import { SettingsGlobalPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useGlobalPanelForm = () => {
  const { settingsQuery } = useSettingsQuery();
  const form = useForm<ISettingsGlobalPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsGlobalPanelFormSchema),
  });

  const { data: settingsData } = settingsQuery;

  const submitHandler: SubmitHandler<ISettingsGlobalPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    console.log('GlobalPanelForm onSubmit', master);
  };

  useEffect(() => {
    if (settingsData) {
      if (form.formState.isDirty) return;

      form.reset({ ...getDataToFormMapper(settingsData) });
    }
  }, [settingsData]);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
  };
};
