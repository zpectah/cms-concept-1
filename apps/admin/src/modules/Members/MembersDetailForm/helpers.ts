import { membersTypeDefault, MembersDetail } from '@common';
import { addressFormDefaults } from '../../../constants';
import { IMembersDetailForm } from './types';

export const getMembersDetailFormDefaultValues = (): IMembersDetailForm => {
  return {
    id: 0,
    name: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    address: addressFormDefaults,
    flat_no: '',
    type: membersTypeDefault,
    active: true,
    deleted: false,
  };
};

export const getMembersDetailFormMapper = (data: MembersDetail): IMembersDetailForm => {
  return {
    ...data,
    first_name: data.first_name ?? '',
    last_name: data.last_name ?? '',
    address: {
      ...data.address,
      zip: String(data.address?.zip ?? ''),
    },
    flat_no: String(data.flat_no ?? ''),
  };
};
