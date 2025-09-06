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
    companyAddress: '',
    companyStreet: '',
    companyStreetNo: '',
    companyCity: '',
    companyCountry: '',
    companyZip: '',
    companyLocation: [],
    companyBank: '',
  };
};
