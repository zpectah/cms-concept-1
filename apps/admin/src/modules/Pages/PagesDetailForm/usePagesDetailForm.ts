import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, PagesDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { usePagesQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { PagesDetailFormSchema } from './schema';
import { IPagesDetailForm } from './types';
import { getPagesDetailFormDefaultValues, getPagesDetailFormMapper } from './helpers';

export const usePagesDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { pagesDetailQuery, pagesPatchQuery } = usePagesQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.pages);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<IPagesDetailForm>({
    resolver: zodResolver(PagesDetailFormSchema),
    defaultValues: getPagesDetailFormDefaultValues(locales),
  });

  const { data: detailData, ...detailQuery } = pagesDetailQuery;
  const { mutate: patchMutate } = pagesPatchQuery;

  const createHandler = (master: IPagesDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: IPagesDetailForm) => {
    patchMutate(master as PagesDetail, {
      onSuccess: () => {
        navigate(`/${routes.pages.path}`);
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

  const submitHandler: SubmitHandler<IPagesDetailForm> = (data) => {
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
        setTitle(t('button.new.pages'));
        form.reset(getPagesDetailFormDefaultValues(locales));
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getPagesDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form, locales]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.pages),
    },
    onSubmit: form.handleSubmit(submitHandler),
    detailData,
    detailQuery,
    detailId: id,
    locales,
    locale,
    onLocaleChange,
  };
};
