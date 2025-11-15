import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploaderQueueItem } from '../../../types';
import { getEnvironmentVariables } from '../../../helpers';
import { fileUploaderQueueItemContextKeys, registeredFormFields } from '../../../enums';
import { useUserQuery, useAttachmentsQuery } from '../../../hooks-query';
import { FEEDBACK_COMMON_TIMEOUT_DEFAULT, TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useAppStore } from '../../../store';
import { getAccountFormDefaultValues, getDataToFormMapper, getDataToFormMasterMapper } from './helpers';
import { ProfileAccountFormSchema } from './schema';
import { IProfileAccountForm } from './types';

export const useAccountForm = () => {
  const [avatar, setAvatar] = useState<FileUploaderQueueItem | null>(null);
  const [locked, setLocked] = useState(true);

  const { t } = useTranslation(['common']);
  const { addToast } = useAppStore();
  const { userQuery, userPatchMutation } = useUserQuery();
  const { attachmentsFileCreateMutation } = useAttachmentsQuery({});
  const form = useForm<IProfileAccountForm>({
    defaultValues: getAccountFormDefaultValues(),
    resolver: zodResolver(ProfileAccountFormSchema),
  });
  const { uploadsPath } = getEnvironmentVariables();

  const { data: userData, refetch } = userQuery;
  const { mutate: onPatch } = userPatchMutation;
  const { mutate: onUpload } = attachmentsFileCreateMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const submitHandler: SubmitHandler<IProfileAccountForm> = (data, event) => {
    if (!data) return;

    if (data.password) {
      if (data.password !== data.passwordConfirm) {
        form.setError(registeredFormFields.passwordConfirm, {
          message: t('form:message.error.passwordNotMatch'),
        });

        return;
      }
    }

    const master = getDataToFormMasterMapper({
      ...userData?.user,
      ...data,
    });

    if (avatar) {
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
            master['avatar_image'] = avatar.name + '.' + avatar.extension;

            onPatch(master, {
              onSuccess: (res) => {
                if (res.rows === 1) {
                  addToast(t('message.success.updateData'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
                } else {
                  addToast(t('message.info.nothingUpdated'), 'success', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
                }
                setAvatar(null);
                setLocked(true);
                refetch();
              },
              onError,
            });
          },
          onError,
        }
      );
    } else {
      onPatch(master, {
        onSuccess: (res) => {
          if (res.rows === 1) {
            addToast(t('message.success.updateData'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
            refetch();
          } else {
            addToast(t('message.info.nothingUpdated'), 'success', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
          }
          setLocked(true);
        },
        onError,
      });
    }
  };

  useEffect(() => {
    if (userData?.user) {
      form.reset(getDataToFormMapper(userData?.user));
    }
  }, [userData, form]);

  return {
    userData,
    form,
    onSubmit: form.handleSubmit(submitHandler),
    avatar,
    setAvatar,
    locked,
    setLocked,
  };
};
