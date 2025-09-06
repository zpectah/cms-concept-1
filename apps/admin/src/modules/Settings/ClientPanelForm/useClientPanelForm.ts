import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItemProps } from '@mui/material';
import { META_ROBOTS_OPTIONS } from '../../../constants';
import { getOptionValue } from '../../../helpers';
import { ISettingsClientPanelForm } from './types';
import { SettingsClientPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useClientPanelForm = () => {
  const form = useForm<ISettingsClientPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsClientPanelFormSchema),
  });

  const fieldOptions = useMemo(() => {
    const metaRobots: MenuItemProps[] = [];

    META_ROBOTS_OPTIONS.forEach((item) => {
      metaRobots.push({
        value: item,
        children: getOptionValue(`robots.${item}`),
      });
    });

    return {
      metaRobots,
    };
  }, []);

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
    fieldOptions,
  };
};
