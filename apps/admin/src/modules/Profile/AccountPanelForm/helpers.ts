import { IProfileAccountPanelForm } from './types';

export const getDataToFormMapper = (): IProfileAccountPanelForm => {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
};
