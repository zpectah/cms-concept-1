import { blacklistTypeKeys } from '@common';

export const getDataToFormMapper = () => {
  return {
    id: 0,
    type: blacklistTypeKeys.default,
    ipaddress: '',
    email: '',
  };
};
