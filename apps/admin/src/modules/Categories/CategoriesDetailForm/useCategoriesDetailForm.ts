import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, CategoriesDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useCategoriesQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { CategoriesDetailFormSchema } from './schema';
import { ICategoriesDetailForm } from './types';
import { getCategoriesDetailFormDefaultValues } from './helpers';

export const useCategoriesDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { categoriesDetailQuery, categoriesPatchQuery } = useCategoriesQuery(id);
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.categories);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<ICategoriesDetailForm>({
    resolver: zodResolver(CategoriesDetailFormSchema),
    defaultValues: getCategoriesDetailFormDefaultValues(locales),
  });

  const { data: detailData, ...detailQuery } = categoriesDetailQuery;
  const { mutate: patchMutate } = categoriesPatchQuery;

  const createHandler = (master: ICategoriesDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: ICategoriesDetailForm) => {
    patchMutate(master as CategoriesDetail, {
      onSuccess: () => {
        navigate(`/${routes.categories.path}`);
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

  const submitHandler: SubmitHandler<ICategoriesDetailForm> = (data) => {
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
        setTitle(t('button.new.categories'));
        form.reset(getCategoriesDetailFormDefaultValues(locales));
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(detailData);
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
  };
};
