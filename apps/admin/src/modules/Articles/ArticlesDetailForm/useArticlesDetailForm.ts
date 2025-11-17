import { useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, ArticlesDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, useSelectOptions, useArticlesHelpers } from '../../../helpers';
import { useAppStore } from '../../../store';
import { CLONE_PATH_ATTRIBUTE_NAME, TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useArticlesQuery } from '../../../hooks-query';
import { useModelFavorites, useUserActions } from '../../../hooks';
import { registeredFormFields } from '../../../enums';
import { ArticlesDetailFormSchema } from './schema';
import { IArticlesDetailForm } from './types';
import {
  getArticlesDetailFormDefaultValues,
  getArticlesDetailFormMapper,
  getArticlesDetailFormMapperToMaster,
  getCloneArticlesDetailFormMapper,
} from './helpers';

export const useArticlesDetailForm = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { articles: modelActions } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();
  const { setTitle } = useViewLayoutContext();

  const cloneId = searchParams.get(CLONE_PATH_ATTRIBUTE_NAME);

  const {
    articlesQuery,
    articlesDetailQuery,
    articlesCloneDetailQuery,
    articlesPatchMutation,
    articlesCreateMutation,
  } = useArticlesQuery({
    id,
    cloneId,
  });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.articles);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<IArticlesDetailForm>({
    resolver: zodResolver(ArticlesDetailFormSchema),
    defaultValues: getArticlesDetailFormDefaultValues(locales),
  });
  const { isAttributeUnique } = useArticlesHelpers();

  const { data: articles, refetch } = articlesQuery;
  const { data: detailData, ...detailQuery } = articlesDetailQuery;
  const { data: cloneDetailData } = articlesCloneDetailQuery;
  const { mutate: onCreate } = articlesCreateMutation;
  const { mutate: onPatch } = articlesPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IArticlesDetailForm) => {
    if (!modelActions.create) return;

    onCreate(master as ArticlesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.articles.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: IArticlesDetailForm) => {
    if (!modelActions.modify) return;

    onPatch(master as ArticlesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.articles.path}`);
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

  const submitHandler: SubmitHandler<IArticlesDetailForm> = (data) => {
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

    if (!isAttributeUnique(articles ?? [], registeredFormFields.name, data as ArticlesDetail)) {
      form.setError(registeredFormFields.name, {
        message: t('form:message.error.duplicityName'),
      });

      return;
    }

    const master = getArticlesDetailFormMapperToMaster(data, modelActions);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        if (cloneId && cloneDetailData) {
          const cloneDetail = getCloneArticlesDetailFormMapper(cloneDetailData);

          setTitle(cloneDetail.name);
          form.reset(cloneDetail);
        } else {
          setTitle(t('button.new.articles'));
          form.reset(getArticlesDetailFormDefaultValues(locales));
        }
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getArticlesDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, cloneId, detailData, cloneDetailData, form, locales]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.articles),
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
