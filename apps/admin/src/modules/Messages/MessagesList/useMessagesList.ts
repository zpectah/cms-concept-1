import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { useViewLayoutContext } from '../../../components';
import { useMessagesQuery } from '../../../hooks-query';

export const useMessagesList = () => {
  const { t } = useTranslation(['modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { messagesQuery } = useMessagesQuery();

  const { data: items, isLoading, refetch } = messagesQuery;

  const deleteSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('deleteSelectedHandler', ids);

    const toastMsg = ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected');

    addToast(toastMsg, 'success', 2500);

    // addToast(t('message.error.common'), 'error');

    refetch();
  };

  const disableSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('disableSelectedHandler', ids);

    const toastMsg = ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected');

    addToast(toastMsg, 'success', 2500);

    // addToast(t('message.error.common'), 'error');

    refetch();
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
  };
};
