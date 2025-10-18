import { usersTypeDefault, UsersDetail } from '@common';
import { IUsersDetailForm } from './types';

export const getUsersDetailFormDefaultValues = (): IUsersDetailForm => {
  return {
    id: 0,
    name: '',
    type: usersTypeDefault,

    email: '',
    password: '',

    firstName: '',
    lastName: '',

    accessLevel: 0,

    active: true,
    deleted: false,
  };
};

export const getUsersDetailFormMapper = (data: UsersDetail): IUsersDetailForm => {
  return {
    ...data,

    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
  };
};
