import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, TranslationsDetail } from '@common';
import { getConfig } from '../../../utils';
import { useFormDetailControl, useSelectOptions, useTranslationsHelpers } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useTranslationsQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { TranslationsDetailFormSchema } from './schema';
import { ITranslationsDetailForm } from './types';
import { getTranslationsDetailFormDefaultValues, getTranslationsDetailFormMapper } from './helpers';
import { registeredFormFields } from '../../../enums';

export const useTranslationsDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { translationsQuery, translationsDetailQuery, translationsPatchMutation, translationsCreateMutation } =
    useTranslationsQuery({ id });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.translations);
  const { locales, locale, onLocaleChange } = useFormDetailControl();
  const form = useForm<ITranslationsDetailForm>({
    resolver: zodResolver(TranslationsDetailFormSchema),
    defaultValues: getTranslationsDetailFormDefaultValues(locales),
  });
  const { isAttributeUnique } = useTranslationsHelpers();

  const { data: translations, refetch } = translationsQuery;
  const { data: detailData, ...detailQuery } = translationsDetailQuery;
  const { mutate: onCreate } = translationsCreateMutation;
  const { mutate: onPatch } = translationsPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: ITranslationsDetailForm) =>
    onCreate(master as TranslationsDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.translations.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: ITranslationsDetailForm) =>
    onPatch(master as TranslationsDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.translations.path}`);
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

    if (!isAttributeUnique(translations ?? [], registeredFormFields.name, data as TranslationsDetail)) {
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
    isSubmitting: false,
  };
};
