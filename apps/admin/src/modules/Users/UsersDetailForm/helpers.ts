import { usersTypeDefault, getFormattedString, getRandomString, UsersDetail } from '@common';
import { IUsersDetailForm } from './types';

export const getUsersDetailFormDefaultValues = (): IUsersDetailForm => {
  return {
    id: 0,
    name: getRandomString(16),
    type: usersTypeDefault,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    access_rights: 0,
    avatar_image: '',
    avatar_hash: '',
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

export const getUsersDetailFormMapperToMaster = (data: IUsersDetailForm): IUsersDetailForm => {
  return Object.assign({
    ...data,
    name: getFormattedString(data.name),
    avatar_hash: getRandomString(8),
  });
};
