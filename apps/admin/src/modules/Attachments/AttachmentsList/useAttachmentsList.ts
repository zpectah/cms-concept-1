import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useAttachmentsQuery } from '../../../hooks-query';

export const useAttachmentsList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { attachmentsQuery, attachmentsDeleteMutation, attachmentsToggleMutation } = useAttachmentsQuery({});

  const { data: items, isLoading, refetch } = attachmentsQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    attachmentsDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('attachmentsDeleteMutation res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.attachments, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    attachmentsToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('attachmentsToggleMutation res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.attachments, []);
        refetch();
      },
      onError,
    });
  };

  useEffect(() => {
    setTitle(t('modules:attachments.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    attachments: items ?? [],
    isLoading,
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
