import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSettingsQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { ISettingsGlobalPanelForm } from './types';
import { SettingsGlobalPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useGlobalPanelForm = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { settingsQuery, settingsPatchMutation } = useSettingsQuery();
  const form = useForm<ISettingsGlobalPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsGlobalPanelFormSchema),
  });

  const { data: settingsData } = settingsQuery;
  const { mutate: onPatch } = settingsPatchMutation;

  const submitHandler: SubmitHandler<ISettingsGlobalPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    onPatch(master, {
      onSuccess: (res) => {
        // TODO: results
        console.log('res', res);
        addToast(t('message.success.dataSaved'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });
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
