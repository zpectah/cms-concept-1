import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useCategoriesQuery } from '../../../hooks-query';

export const useCategoriesList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { categoriesQuery } = useCategoriesQuery({});

  const { data: items, isLoading, refetch } = categoriesQuery;

  const deleteSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('deleteSelectedHandler', ids);

    const toastMsg = ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected');

    addToast(toastMsg, 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);

    // addToast(t('message.error.common'), 'error');

    refetch();
  };

  const disableSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('disableSelectedHandler', ids);

    const toastMsg = ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected');

    addToast(toastMsg, 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);

    // addToast(t('message.error.common'), 'error');

    refetch();
  };

  useEffect(() => {
    setTitle(t('modules:categories.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories: items ?? [],
    isLoading,

    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
