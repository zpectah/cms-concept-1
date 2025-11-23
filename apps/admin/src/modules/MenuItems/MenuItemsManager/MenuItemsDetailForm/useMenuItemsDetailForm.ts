import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { modelKeys, newItemKey, MenuItemsDetail } from '@common';
import { useUserActions } from '../../../../hooks';
import { useMenuItemsQuery } from '../../../../hooks-query';
import { useFormDetailControl, useSelectOptions } from '../../../../helpers';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { useAppStore } from '../../../../store';
import { IMenuItemsDetailForm } from './types';
import { MenuItemsDetailFormSchema } from './schema';
import {
  getMenuItemsDefaultValues,
  getMenuItemsDetailFormMapper,
  getMenuItemsDetailFormMapperToMaster,
} from './helpers';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';

interface useMenuItemsDetailFormProps {
  menuId?: string;
  id?: number | 'new' | null;
}

export const useMenuItemsDetailForm = ({ menuId, id }: useMenuItemsDetailFormProps) => {
  const { t } = useTranslation(['common']);
  const { menuItemsDetailQuery, menuItemsCreateMutation, menuItemsPatchMutation, menuMenuItemsQuery } =
    useMenuItemsQuery({ id: typeof id === 'number' ? String(id) : undefined, menuId });
  const { menuItems: modelActions } = useUserActions();
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const { addToast, openConfirmDialog } = useAppStore();
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IMenuItemsDetailForm>({
    resolver: zodResolver(MenuItemsDetailFormSchema),
    defaultValues: getMenuItemsDefaultValues(locales, menuId),
  });
  const { setDetailId } = useMenuItemsManagerContext();

  const { refetch } = menuMenuItemsQuery;
  const { data: detailData, isLoading } = menuItemsDetailQuery;
  const { mutate: onCreate } = menuItemsCreateMutation;
  const { mutate: onPatch } = menuItemsPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IMenuItemsDetailForm) => {
    if (!modelActions.create) return;

    onCreate(master as MenuItemsDetail, {
      onSuccess: (res) => {
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        setDetailId(null);
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: IMenuItemsDetailForm) => {
    if (!modelActions.modify) return;

    onPatch(master as MenuItemsDetail, {
      onSuccess: (res) => {
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        setDetailId(null);
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

    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IMenuItemsDetailForm> = (data) => {
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

    const master = getMenuItemsDetailFormMapperToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const resetHandler = useCallback(() => {
    if (id === newItemKey) {
      form.reset(getMenuItemsDefaultValues(locales, menuId));
    } else if (detailData) {
      form.reset(getMenuItemsDetailFormMapper(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, menuId]);

  useEffect(() => {
    if (id && !isLoading) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoading]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.menuItems),
    },
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    detailData,
    locales,
    locale,
    onLocaleChange,
    isSubmitting: false,
    isLoading,
  };
};
