import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SettingsGlobalPanelForm } from './types';
import { SettingsGlobalPanelFormSchema } from './schema';
import { getDataToFormMapper } from './helpers';

export const useGlobalPanelForm = () => {
  const form = useForm<SettingsGlobalPanelForm>({
    defaultValues: getDataToFormMapper(),
    resolver: zodResolver(SettingsGlobalPanelFormSchema),
  });

  return {
    form,
  };
};
