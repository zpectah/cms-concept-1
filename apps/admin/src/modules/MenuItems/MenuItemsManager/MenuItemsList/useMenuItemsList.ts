import { useTranslation } from 'react-i18next';
import { newItemKey, MenuItemTreeItem } from '@common';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { useUserActions } from '../../../../hooks';
import { useAppStore } from '../../../../store';
import { useMenuItemsManagerContext } from '../MenuItemsManager.context';
import { useMenuItemsQuery } from '../../../../hooks-query';
import { useCallback } from 'react';

interface useMenuItemsListProps {
  menuId?: string;
}

export const useMenuItemsList = ({ menuId }: useMenuItemsListProps) => {
  const { t } = useTranslation(['common']);
  const { menuItems: modelActions } = useUserActions();
  const { addToast } = useAppStore();
  const { setDetailId } = useMenuItemsManagerContext();
  const { menuMenuItemsQuery, menuItemsToggleMutation, menuItemsDeleteMutation } = useMenuItemsQuery({ menuId });

  const { data: items, refetch } = menuMenuItemsQuery;
  const { mutate: onToggle } = menuItemsToggleMutation;
  const { mutate: onDelete } = menuItemsDeleteMutation;

  const getItemsList = useCallback(() => {
    const map = new Map<number, MenuItemTreeItem>();
    const tree: MenuItemTreeItem[] = [];

    if (!items) return [];

    const copiedItems: MenuItemTreeItem[] = items?.map((item) => ({
      ...item,
      children: [],
    }));

    for (const item of copiedItems) {
      map.set(item.id, item);

      const isRoot = item.parent_id === null || item.parent_id === 0;

      if (isRoot) {
        tree.push(item);
      }
    }

    for (const item of copiedItems) {
      const parentId = item.parent_id;

      if (parentId !== null && parentId !== 0) {
        const parent = map.get(parentId);

        if (parent) {
          parent.children.push(item);
        }
      }
    }

    return tree;
  }, [items]);

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!modelActions.delete) return;
    if (!ids || ids.length === 0) return;

    onDelete(ids, {
      onSuccess: (res) => {
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        refetch();
      },
      onError,
    });
  };

  const disableSelectedHandler = (ids: number[]) => {
    if (!modelActions.modify) return;
    if (!ids || ids.length === 0) return;

    onToggle(ids, {
      onSuccess: (res) => {
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        refetch();
      },
      onError,
    });
  };

  return {
    items: getItemsList(),
    onDetailOpen: (id: number | typeof newItemKey) => setDetailId(id),
    onDeleteSelected: deleteSelectedHandler,
    onDisableSelected: disableSelectedHandler,
  };
};
