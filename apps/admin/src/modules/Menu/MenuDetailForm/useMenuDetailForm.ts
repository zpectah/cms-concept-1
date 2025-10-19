import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, MenuDetail } from '@common';
import { getConfig } from '../../../utils';
import { useMenuHelpers, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMenuQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { MenuDetailFormSchema } from './schema';
import { IMenuDetailForm } from './types';
import { getMenuDetailFormDefaultValues, getMenuDetailFormMapper } from './helpers';
import { registeredFormFields } from '../../../enums';

export const useMenuDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { menuQuery, menuDetailQuery, menuPatchMutation, menuCreateMutation } = useMenuQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.menu);
  const form = useForm<IMenuDetailForm>({
    resolver: zodResolver(MenuDetailFormSchema),
    defaultValues: getMenuDetailFormDefaultValues(),
  });
  const { isAttributeUnique } = useMenuHelpers();

  const { data: menu, refetch } = menuQuery;
  const { data: detailData, ...detailQuery } = menuDetailQuery;
  const { mutate: onCreate } = menuCreateMutation;
  const { mutate: onPatch } = menuPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IMenuDetailForm) =>
    onCreate(master as MenuDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.menu.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: IMenuDetailForm) =>
    onPatch(master as MenuDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.menu.path}`);
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

  const submitHandler: SubmitHandler<IMenuDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    if (!isAttributeUnique(menu ?? [], registeredFormFields.name, data as MenuDetail)) {
      form.setError(registeredFormFields.name, {
        message: t('form:message.error.duplicityName'),
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
        setTitle(t('button.new.menu'));
        form.reset(getMenuDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getMenuDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.menu),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
  };
};
