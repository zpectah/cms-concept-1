import { addressFormDefaults } from '../../../constants';
import { ISettingsGlobalPanelForm } from './types';

export const getDataToFormMapper = (): ISettingsGlobalPanelForm => {
  return {
    projectName: '',
    projectDescription: '',
    companyName: '',
    companyDescription: '',
    companyId: '',
    companyEmail: [],
    companyPhone: [],
    companyAddress: addressFormDefaults,
    companyLocation: [],
    companyBank: '',
  };
};
