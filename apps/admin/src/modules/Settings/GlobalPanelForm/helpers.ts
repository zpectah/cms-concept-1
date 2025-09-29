import { SettingsGlobal } from '@common';
import { addressFormDefaults } from '../../../constants';
import { ISettingsGlobalPanelForm } from './types';

export const getDataToFormMapper = (data?: SettingsGlobal): ISettingsGlobalPanelForm => {
  return {
    project: {
      name: data?.project.name ?? '',
      description: data?.project.description ?? '',
    },
    company: {
      name: data?.company.name ?? '',
      description: data?.company.description ?? '',
      id: data?.company.id,
      email: data?.company.email ?? [],
      phone: data?.company.phone ?? [],
      address: data?.company.address ?? addressFormDefaults,
      location: data?.company.location ?? [0, 0],
      bank: data?.company.bank ?? '',
    },
  };
};
