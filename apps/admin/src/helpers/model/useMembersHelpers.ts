import { Members, MembersDetail, MembersItem } from '@common';

export const useMembersHelpers = () => {
  const isAttributeUnique = (members: Members, key: keyof MembersItem, object: MembersDetail) => {
    return !members.some((item) => item.id !== object.id && String(item[key]) === String(object[key]));
  };

  return {
    isAttributeUnique,
  };
};
