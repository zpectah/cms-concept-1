import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, TranslationsDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useTranslationsQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { TranslationsDetailFormSchema } from './schema';
import { ITranslationsDetailForm } from './types';
import { getTranslationsDetailFormDefaultValues, getTranslationsDetailFormMapper } from './helpers';

export const useTranslationsDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { translationsDetailQuery, translationsPatchQuery } = useTranslationsQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.translations);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<ITranslationsDetailForm>({
    resolver: zodResolver(TranslationsDetailFormSchema),
    defaultValues: getTranslationsDetailFormDefaultValues(locales),
  });

  const { data: detailData, ...detailQuery } = translationsDetailQuery;
  const { mutate: patchMutate } = translationsPatchQuery;

  const createHandler = (master: ITranslationsDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: ITranslationsDetailForm) => {
    patchMutate(master as TranslationsDetail, {
      onSuccess: () => {
        navigate(`/${routes.translations.path}`);
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

  const submitHandler: SubmitHandler<ITranslationsDetailForm> = (data) => {
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
        setTitle(t('button.new.translations'));
        form.reset(getTranslationsDetailFormDefaultValues(locales));
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getTranslationsDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form, locales]);

  return {
    form,
    fieldOptions: {
      type: getTypeFieldOptions(modelKeys.translations),
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
