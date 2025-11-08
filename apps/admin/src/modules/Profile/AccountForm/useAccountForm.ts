import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploaderQueueItem } from '../../../types';
import { getEnvironmentVariables } from '../../../helpers';
import { fileUploaderQueueItemContextKeys } from '../../../enums';
import { useUserQuery } from '../../../hooks-query';
import { getAccountFormDefaultValues, getDataToFormMapper, getDataToFormMasterMapper } from './helpers';
import { ProfileAccountFormSchema } from './schema';
import { IProfileAccountForm } from './types';

export const useAccountForm = () => {
  const [avatar, setAvatar] = useState<FileUploaderQueueItem | null>(null);

  const { userQuery, userPatchMutation, userAvatarCreateMutation } = useUserQuery();
  const form = useForm<IProfileAccountForm>({
    defaultValues: getAccountFormDefaultValues(),
    resolver: zodResolver(ProfileAccountFormSchema),
  });
  const { uploadsPath } = getEnvironmentVariables();

  const { data: userData, refetch } = userQuery;
  const { mutate: onPatch } = userPatchMutation;
  const { mutate: onUpload } = userAvatarCreateMutation;

  const submitHandler: SubmitHandler<IProfileAccountForm> = (data, event) => {
    if (!data) return;

    if (data.password) {
      if (data.password !== data.passwordConfirm) {
        // TODO: compare both passwords if there are any ...
        // TODO: message
        return;
      }
    }

    // TODO: check avatar
    const master = getDataToFormMasterMapper({
      ...userData?.user,
      ...data,
    });

    // TODO: if avatar is set
    if (avatar) {
      // TODO - rename as user name...
      console.log('call mutation for create file - avatar');
      avatar['name'] = userData?.user?.name as string;

      onUpload(
        {
          queue: [avatar],
          options: {
            path: uploadsPath,
            context: fileUploaderQueueItemContextKeys['avatar-user'],
          },
        },
        {
          onSuccess: (res) => {
            // TODO
            console.log('res', res);

            master['avatar_image'] = avatar.name + '.' + avatar.extension;

            onPatch(master, {
              onSuccess: (res) => {
                // TODO
                console.log('res', res);

                setAvatar(null);
                refetch();
              },
              onError: (err) => {
                // TODO
                console.warn(err);
              },
            });
          },
          onError: (err) => {
            // TODO
            console.warn(err);
          },
        }
      );
    } else {
      console.log('call without avatar change ...');
      onPatch(master, {
        onSuccess: (res) => {
          // TODO
          console.log('res', res);
        },
        onError: (err) => {
          // TODO
          console.warn(err);
        },
      });
    }
  };

  useEffect(() => {
    if (userData?.user) {
      form.reset(getDataToFormMapper(userData?.user));
    }
  }, [userData]);

  return {
    userData,
    form,
    onSubmit: form.handleSubmit(submitHandler),

    avatar,
    setAvatar,
  };
};
