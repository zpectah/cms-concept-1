import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { META_ROBOTS_OPTIONS, TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useSettingsQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { useSelectOptions } from '../../../helpers';
import { ISettingsClientPanelForm } from './types';
import { SettingsClientPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useClientPanelForm = () => {
  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { settingsQuery, settingsUpdateMutation } = useSettingsQuery();
  const { getTranslatedOptionsFromList } = useSelectOptions();
  const form = useForm<ISettingsClientPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsClientPanelFormSchema),
  });

  const { data: settingsData } = settingsQuery;
  const { mutate: onUpdate } = settingsUpdateMutation;

  const submitHandler: SubmitHandler<ISettingsClientPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    onUpdate(master, {
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
    fieldOptions: {
      metaRobots: getTranslatedOptionsFromList(META_ROBOTS_OPTIONS, 'robots'),
    },
  };
};
