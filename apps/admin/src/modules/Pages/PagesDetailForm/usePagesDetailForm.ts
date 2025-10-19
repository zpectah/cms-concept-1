import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, PagesDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, usePagesHelpers, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { usePagesQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { PagesDetailFormSchema } from './schema';
import { IPagesDetailForm } from './types';
import { getPagesDetailFormDefaultValues, getPagesDetailFormMapper } from './helpers';
import { registeredFormFields } from '../../../enums';

export const usePagesDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { pagesQuery, pagesDetailQuery, pagesPatchMutation, pagesCreateMutation } = usePagesQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.pages);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<IPagesDetailForm>({
    resolver: zodResolver(PagesDetailFormSchema),
    defaultValues: getPagesDetailFormDefaultValues(locales),
  });
  const { isAttributeUnique } = usePagesHelpers();

  const { data: pages, refetch } = pagesQuery;
  const { data: detailData, ...detailQuery } = pagesDetailQuery;
  const { mutate: onCreate } = pagesCreateMutation;
  const { mutate: onPatch } = pagesPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IPagesDetailForm) =>
    onCreate(master as PagesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.pages.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: IPagesDetailForm) =>
    onPatch(master as PagesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.pages.path}`);
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

    if (!isAttributeUnique(pages ?? [], registeredFormFields.name, data as PagesDetail)) {
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
    isSubmitting: false,
  };
};
