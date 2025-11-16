import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useTranslationsQuery } from '../../../hooks-query';
import { useUserActions } from '../../../hooks';

export const useTranslationsList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { translations: modelActions } = useUserActions();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { translationsQuery, translationsDeleteMutation, translationsToggleMutation } = useTranslationsQuery({});

  const { data: items, isLoading, refetch } = translationsQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!modelActions.delete) return;
    if (!ids || ids.length === 0) return;

    translationsDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.translations, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!modelActions.modify) return;
    if (!ids || ids.length === 0) return;

    translationsToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.translations, []);
        refetch();
      },
      onError,
    });
  };

  useEffect(() => {
    setTitle(t('modules:translations.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    translations: items ?? [],
    isLoading,
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
