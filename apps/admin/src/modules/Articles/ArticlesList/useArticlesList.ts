import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useArticlesQuery, useCategoriesQuery, useTagsQuery } from '../../../hooks-query';

export const useArticlesList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { articlesQuery } = useArticlesQuery({});
  const { categoriesQuery } = useCategoriesQuery();
  const { tagsQuery } = useTagsQuery();

  const { data: items, isLoading, refetch } = articlesQuery;
  const { data: categories } = categoriesQuery;
  const { data: tags } = tagsQuery;

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
    setTitle(t('modules:articles.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    articles: items ?? [],
    isLoading,
    categories,
    tags,

    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
