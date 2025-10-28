import { useUserQuery } from '../hooks-query';

export const useUserAccount = () => {
  const { userQuery } = useUserQuery();

  const { data } = userQuery;

  const user = data?.user ?? {
    id: 0,
    email: '',
    name: '',
    first_name: '',
    last_name: '',
    access_rights: 0,
  };

  const actions = {
    canApprove: true,
    canSelfApprove: true,
    canSeeSettings: true,
    canSeeMaintenance: true,
    // TODO
  };

  return {
    user,
    actions,
  };
};
