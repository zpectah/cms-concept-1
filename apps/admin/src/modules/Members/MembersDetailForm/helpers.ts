import { membersTypeDefault, MembersDetail } from '@common';
import { addressFormDefaults } from '../../../constants';
import { IMembersDetailForm } from './types';

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

    type: membersTypeDefault,
    active: true,
    deleted: false,
  };
};

export const getMembersDetailFormMapper = (data: MembersDetail): IMembersDetailForm => {
  return {
    ...data,

    firstName: data.firstName ?? '',
    lastName: data.lastName ?? '',
  };
};
