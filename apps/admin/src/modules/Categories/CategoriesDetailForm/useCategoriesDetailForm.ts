import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, CategoriesDetail } from '@common';
import { getConfig } from '../../../config';
import { useCategoriesHelpers, useFormDetailControl, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useCategoriesQuery } from '../../../hooks-query';
import { useModelFavorites, useUserActions } from '../../../hooks';
import { registeredFormFields } from '../../../enums';
import { CategoriesDetailFormSchema } from './schema';
import { ICategoriesDetailForm } from './types';
import {
  getCategoriesDetailFormDefaultValues,
  getCategoriesDetailFormMapper,
  getCategoriesDetailFormMapperToMaster,
} from './helpers';

export const useCategoriesDetailForm = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories: modelActions } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();
  const { setTitle } = useViewLayoutContext();
  const { categoriesQuery, categoriesDetailQuery, categoriesPatchMutation, categoriesCreateMutation } =
    useCategoriesQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.categories);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<ICategoriesDetailForm>({
    resolver: zodResolver(CategoriesDetailFormSchema),
    defaultValues: getCategoriesDetailFormDefaultValues(locales),
  });
  const { isAttributeUnique } = useCategoriesHelpers();

  const { data: categories, refetch } = categoriesQuery;
  const { data: detailData, ...detailQuery } = categoriesDetailQuery;
  const { mutate: onCreate } = categoriesCreateMutation;
  const { mutate: onPatch } = categoriesPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: ICategoriesDetailForm) => {
    if (!modelActions.create) return;

    onCreate(master as CategoriesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.categories.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: ICategoriesDetailForm) => {
    if (!modelActions.modify) return;

    onPatch(master as CategoriesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.categories.path}`);
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

  const submitHandler: SubmitHandler<ICategoriesDetailForm> = (data) => {
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

    if (!isAttributeUnique(categories ?? [], registeredFormFields.name, data as CategoriesDetail)) {
      form.setError(registeredFormFields.name, {
        message: t('form:message.error.duplicityName'),
      });

      return;
    }

    const master = getCategoriesDetailFormMapperToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.categories'));
        form.reset(getCategoriesDetailFormDefaultValues(locales));
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getCategoriesDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form, locales]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.categories),
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
