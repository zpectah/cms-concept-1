import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useArticlesQuery, useCategoriesQuery, useTagsQuery } from '../../../hooks-query';

export const useArticlesList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { articlesQuery, articlesDeleteMutation, articlesToggleMutation } = useArticlesQuery({});
  const { categoriesQuery } = useCategoriesQuery({});
  const { tagsQuery } = useTagsQuery({});

  const { data: items, isLoading, refetch } = articlesQuery;
  const { data: categories } = categoriesQuery;
  const { data: tags } = tagsQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    articlesDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('articlesDeleteMutation res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.articles, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!ids || ids.length === 0) return;

    articlesToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('articlesToggleMutation res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.articles, []);
        refetch();
      },
      onError,
    });
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
