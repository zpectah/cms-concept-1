import { IProfileAccountForm } from './types';

export const getDataToFormMapper = (): IProfileAccountForm => {
  // TODO

  return {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
};
