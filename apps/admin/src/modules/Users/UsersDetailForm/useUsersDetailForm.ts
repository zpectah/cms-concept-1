import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, UsersDetail } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions, useUsersHelpers } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useUsersQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { registeredFormFields } from '../../../enums';
import { UsersDetailFormSchema } from './schema';
import { IUsersDetailForm } from './types';
import { getUsersDetailFormDefaultValues, getUsersDetailFormMapper } from './helpers';

export const useUsersDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast, openConfirmDialog } = useAppStore();
  const { setTitle } = useViewLayoutContext();
  const { usersQuery, usersDetailQuery, usersPatchMutation, usersCreateMutation } = useUsersQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.users);
  const form = useForm<IUsersDetailForm>({
    resolver: zodResolver(UsersDetailFormSchema),
    defaultValues: getUsersDetailFormDefaultValues(),
  });
  const { isAttributeUnique } = useUsersHelpers();

  const { data: users, refetch } = usersQuery;
  const { data: detailData, ...detailQuery } = usersDetailQuery;
  const { mutate: onCreate } = usersCreateMutation;
  const { mutate: onPatch } = usersPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IUsersDetailForm) =>
    onCreate(master as UsersDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.users.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: IUsersDetailForm) =>
    onPatch(master as UsersDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.users.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const deleteConfirmHandler = () => {
    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    removeItemFromFavorites(master.id);
    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IUsersDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    if (!isAttributeUnique(users ?? [], registeredFormFields.email, data as UsersDetail)) {
      form.setError(registeredFormFields.email, {
        message: t('form:message.error.duplicityEmail'),
      });

      return;
    }

    const master = Object.assign({
      ...data,
    });

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.users'));
        form.reset(getUsersDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getUsersDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.users),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
  };
};
