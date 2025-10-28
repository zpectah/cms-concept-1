import { UsersItem } from '@common';
import { IProfileAccountForm } from './types';

export const getAccountFormDefaultValues = () => {
  return {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
  };
};

export const getDataToFormMapper = (data: UsersItem): IProfileAccountForm => {
  return {
    password: '',
    passwordConfirm: '',
    ...data,
  };
};

export const getDataToFormMasterMapper = (data: IProfileAccountForm) => {
  return Object.assign({
    ...data,
  });
};
