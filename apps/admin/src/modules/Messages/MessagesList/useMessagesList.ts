import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMessagesQuery } from '../../../hooks-query';

export const useMessagesList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { messagesQuery, messagesDeleteMutation, messagesToggleMutation, messagesReadMutation } = useMessagesQuery({});

  const { data: items, isLoading, refetch } = messagesQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    messagesDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.messages, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    messagesToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.messages, []);
        refetch();
      },
      onError,
    });
  };

  const markReadSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    messagesReadMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.messages, []);
        refetch();
      },
      onError,
    });
  };

  useEffect(() => {
    setTitle(t('modules:messages.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    messages: items ?? [],
    isLoading,
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
    onMarkSelected: markReadSelectedHandler,
  };
};
