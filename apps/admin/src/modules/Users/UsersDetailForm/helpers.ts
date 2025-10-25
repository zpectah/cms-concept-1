import { usersTypeDefault, UsersDetail } from '@common';
import { IUsersDetailForm } from './types';

export const getUsersDetailFormDefaultValues = (): IUsersDetailForm => {
  return {
    id: 0,
    name: '',
    type: usersTypeDefault,

    email: '',
    password: '',

    first_name: '',
    last_name: '',

    access_rights: 0,

    active: true,
    deleted: false,
  };
};

export const getUsersDetailFormMapper = (data: UsersDetail): IUsersDetailForm => {
  return {
    ...data,

    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
  };
};
