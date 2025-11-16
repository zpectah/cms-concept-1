import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys } from '@common';
import { useAppStore, useModelListStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMembersQuery } from '../../../hooks-query';
import { useUserActions } from '../../../hooks';

export const useMembersList = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { setTitle } = useViewLayoutContext();
  const { members: modelActions } = useUserActions();
  const { addToast } = useAppStore();
  const { setSelected } = useModelListStore();
  const { membersQuery, membersDeleteMutation, membersToggleMutation } = useMembersQuery({});

  const { data: items, isLoading, refetch } = membersQuery;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!modelActions.delete) return;
    if (!ids || ids.length === 0) return;

    membersDeleteMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.members, []);
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!modelActions.modify) return;
    if (!ids || ids.length === 0) return;

    membersToggleMutation.mutate(ids, {
      onSuccess: (res) => {
        // TODO: results
        console.log('res', res);
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        setSelected(modelKeys.members, []);
        refetch();
      },
      onError,
    });
  };

  useEffect(() => {
    setTitle(t('modules:members.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    members: items ?? [],
    isLoading,
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
