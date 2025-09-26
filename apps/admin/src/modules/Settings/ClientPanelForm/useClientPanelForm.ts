import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { META_ROBOTS_OPTIONS } from '../../../constants';
import { useSelectOptions } from '../../../helpers';
import { ISettingsClientPanelForm } from './types';
import { SettingsClientPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useClientPanelForm = () => {
  const { getTranslatedOptionsFromList } = useSelectOptions();
  const form = useForm<ISettingsClientPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsClientPanelFormSchema),
  });

  const submitHandler: SubmitHandler<ISettingsClientPanelForm> = (data, event) => {
    if (!data) return;

    const master = Object.assign({
      ...data,
    });

    console.log('ClientPanelForm onSubmit', master);
  };

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    fieldOptions: {
      metaRobots: getTranslatedOptionsFromList(META_ROBOTS_OPTIONS, 'robots'),
    },
  };
};
