import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, MenuDetail } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMenuQuery } from '../../../hooks-query';
import { MenuDetailFormSchema } from './schema';
import { IMenuDetailForm } from './types';
import { getMenuDetailFormDefaultValues } from './helpers';

export const useMenuDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { menuDetailQuery, menuPatchQuery } = useMenuQuery(id);
  const { getTypeFieldOptions } = useSelectOptions();
  const form = useForm<IMenuDetailForm>({
    resolver: zodResolver(MenuDetailFormSchema),
    defaultValues: getMenuDetailFormDefaultValues(),
  });

  const { data: detailData, ...detailQuery } = menuDetailQuery;
  const { mutate: patchMutate } = menuPatchQuery;

  const createHandler = (master: IMenuDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: IMenuDetailForm) => {
    patchMutate(master as MenuDetail, {
      onSuccess: () => {
        navigate(`/${routes.menu.path}`);
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
        form.reset(detailData);
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
  };
};
