import { Users, UsersDetail, UsersItem } from '@common';

export const useUsersHelpers = () => {
  const isAttributeUnique = (users: Users, key: keyof UsersItem, object: UsersDetail) => {
    return !users.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
