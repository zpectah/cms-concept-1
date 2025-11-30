import { UsersItem } from '@common';
import { useUserQuery } from '../hooks-query';
import { getEnvironmentVariables } from '../config';
import { fileUploaderQueueItemContextKeys } from '../enums';

export const useUser = (): { user: UsersItem; avatar: { main: string | undefined; thumb: string | undefined } } => {
  const { uploads } = getEnvironmentVariables();

  const { userQuery } = useUserQuery();

  const { data } = userQuery;

  const user = data?.user;
  const avatar = user?.avatar_image;
  const hash = user?.avatar_hash;

  const imagePrefix = `${uploads.source}${fileUploaderQueueItemContextKeys['avatar-user']}`;
  const avatarMain = `${avatar}?${hash}`;
  const avatarThumb = `thumbnail/${avatarMain}`;

  return {
    user: {
      id: 0,
      type: 'default',
      name: '',
      email: '',
      first_name: '',
      last_name: '',
      active: false,
      access_rights: 0,
      ...user,
    },
    avatar: {
      main: avatar ? `${imagePrefix}/${avatarMain}` : undefined,
      thumb: avatar ? `${imagePrefix}/${avatarThumb}` : undefined,
    },
  };
};
