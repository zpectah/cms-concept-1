import { IProfileAccountForm } from './types';

export const getDataToFormMapper = (): IProfileAccountForm => {
  // TODO

  return {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };
};
