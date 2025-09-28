import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, UsersDetail } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useUsersQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { UsersDetailFormSchema } from './schema';
import { IUsersDetailForm } from './types';
import { getUsersDetailFormDefaultValues } from './helpers';

export const useUsersDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { usersDetailQuery, usersPatchQuery } = useUsersQuery(id);
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.users);
  const form = useForm<IUsersDetailForm>({
    resolver: zodResolver(UsersDetailFormSchema),
    defaultValues: getUsersDetailFormDefaultValues(),
  });

  const { data: detailData, ...detailQuery } = usersDetailQuery;
  const { mutate: patchMutate } = usersPatchQuery;

  const createHandler = (master: IUsersDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: IUsersDetailForm) => {
    patchMutate(master as UsersDetail, {
      onSuccess: () => {
        navigate(`/${routes.users.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        console.info('onSuccess', master);
      },
      onError: () => {
        addToast(t('message.error.common'), 'error');
        console.info('onError', master);
      },
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
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
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
        form.reset(detailData);
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
  };
};
