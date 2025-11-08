import { getRandomString, UsersItem } from '@common';
import { IProfileAccountForm } from './types';

export const getAccountFormDefaultValues = () => {
  return {
    id: 0,
    name: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
    avatar_image: '',
    avatar_hash: '',
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
    avatar_hash: getRandomString(8),
  });
};
