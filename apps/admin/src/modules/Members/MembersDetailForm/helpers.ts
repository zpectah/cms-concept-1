import { getConfig } from '../../../utils';
import { addressFormDefaults } from '../../../constants';
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

    address: addressFormDefaults,

    flatNo: '',

    type: getMembersTypeDefaultValue(),
    active: true,
    deleted: false,
  };
};
