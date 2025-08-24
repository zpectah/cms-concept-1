import { getConfig } from '../../../utils';
import { IUsersDetailForm } from './types';

export const getUsersTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.users.default;
};

export const getUsersDetailFormDefaultValues = (): IUsersDetailForm => {
  return {
    id: 0,
    name: '',
    type: getUsersTypeDefaultValue(),

    email: '',
    password: '',

    firstName: '',
    lastName: '',

    accessLevel: 0,

    active: true,
    deleted: false,
  };
};
