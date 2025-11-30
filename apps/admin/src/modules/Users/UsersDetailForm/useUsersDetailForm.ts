import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { MenuItemProps } from '@mui/material';
import {
  getFormattedString,
  modelKeys,
  newItemKey,
  usersAccessKeys,
  UsersAccessRightsKeys,
  UsersDetail,
} from '@common';
import { getConfig } from '../../../config';
import { getOptionValue, useSelectOptions, useUsersHelpers } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useUsersQuery } from '../../../hooks-query';
import { useModelFavorites, useUser, useUserActions } from '../../../hooks';
import { registeredFormFields } from '../../../enums';
import { UsersDetailFormSchema } from './schema';
import { IUsersDetailForm } from './types';
import { getUsersDetailFormDefaultValues, getUsersDetailFormMapper, getUsersDetailFormMapperToMaster } from './helpers';

export const useUsersDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { users: modelActions } = useUserActions();
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

  const { data: users, refetch, isLoading } = usersQuery;
  const { data: detailData, ...detailQuery } = usersDetailQuery;
  const { mutate: onCreate } = usersCreateMutation;
  const { mutate: onPatch } = usersPatchMutation;

  const firstNameValue = form.watch(registeredFormFields.first_name);
  const lastNameValue = form.watch(registeredFormFields.last_name);

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IUsersDetailForm) => {
    if (!modelActions.create) return;

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
  };

  const patchHandler = (master: IUsersDetailForm) => {
    if (!modelActions.modify) return;

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
  };

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
      if (!modelActions.delete) return;

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

    if (!isAttributeUnique(users ?? [], registeredFormFields.name, data as UsersDetail)) {
      form.setError(registeredFormFields.name, {
        message: t('form:message.error.duplicityName'),
      });

      return;
    }

    const master = getUsersDetailFormMapperToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const getAccessRightsFieldOptions = () => {
    const keys = Object.keys(usersAccessKeys) as UsersAccessRightsKeys[];
    const tmpItems: MenuItemProps[] = [];

    keys.forEach((item) => {
      const value = usersAccessKeys[item];
      tmpItems.push({
        value,
        children: getOptionValue(String(item), 'accessRights'),
        disabled: value > user.access_rights,
      });
    });

    return tmpItems;
  };

  const resetHandler = useCallback(() => {
    if (id === newItemKey) {
      setTitle(t('button.new.users'));
      form.reset(getUsersDetailFormDefaultValues());
    } else if (detailData) {
      setTitle(detailData.name);
      form.reset(getUsersDetailFormMapper(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData]);

  useEffect(() => {
    if (id === newItemKey && (firstNameValue || lastNameValue)) {
      form.setValue('name', getFormattedString(firstNameValue ?? '', lastNameValue ?? ''));
    }
  }, [id, firstNameValue, lastNameValue]);

  useEffect(() => {
    if (id) {
      // if (id === newItemKey) {
      //   setTitle(t('button.new.users'));
      //   form.reset(getUsersDetailFormDefaultValues());
      // } else if (detailData) {
      //   if (form.formState.isDirty) return;
      //
      //   setTitle(detailData.name);
      //   form.reset(getUsersDetailFormMapper(detailData));
      // }

      if (form.formState.isDirty) {
        return;
      } else {
        resetHandler();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.users),
      accessRights: getAccessRightsFieldOptions(),
    },
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
    isLoading,
  };
};
