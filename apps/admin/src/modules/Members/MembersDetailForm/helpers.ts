import { getConfig } from '../../../utils';
import { IMembersDetailForm } from './types';

export const getMembersTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.members.default;
};

export const getMembersDetailFormDefaultValues = (): IMembersDetailForm => {
  return {
    id: 0,
    name: '',

    email: '',
    password: '',

    firstName: '',
    lastName: '',

    address: {
      street: '',
      streetNo: '',
      district: '',
      city: '',
      country: '',
      zip: null,
    },

    flatNo: '',

    type: getMembersTypeDefaultValue(),
    active: true,
    deleted: false,
  };
};
