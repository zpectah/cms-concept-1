import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { usePagesQuery } from '../../../hooks-query';
import { useUserActions } from '../../../hooks';

export const usePagesList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { pages: modelActions } = useUserActions();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { pagesQuery, pagesDeleteMutation, pagesToggleMutation } = usePagesQuery({});

  const { data: items, isLoading, refetch } = pagesQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!modelActions.delete) return;
    if (!ids || ids.length === 0) return;

    pagesDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.pages, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!modelActions.modify) return;
    if (!ids || ids.length === 0) return;

    pagesToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.pages, []);
        refetch();
      },
      onError,
    });
  };

  useEffect(() => {
    setTitle(t('modules:pages.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    pages: items ?? [],
    isLoading,
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
