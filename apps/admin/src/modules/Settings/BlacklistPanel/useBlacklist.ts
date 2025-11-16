import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Blacklist } from '@common';
import { useBlacklistQuery } from '../../../hooks-query';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useUserActions } from '../../../hooks';

export const useBlacklist = () => {
  const [query, setQuery] = useState('');

  const { t } = useTranslation(['common']);
  const { settings } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();
  const { blacklistQuery, blacklistToggleMutation, blacklistDeleteMutation } = useBlacklistQuery({});

  const { data: blacklistItems, refetch } = blacklistQuery;
  const { mutate: onToggle } = blacklistToggleMutation;
  const { mutate: onDelete } = blacklistDeleteMutation;

  const results = useMemo(() => {
    let match: Blacklist = [];

    if (!blacklistItems) return [];

    if (query.length > 3) {
      const normalizedQuery = query.toLowerCase().trim();

      match = blacklistItems?.filter(
        (item) =>
          String(item.email).toLowerCase().includes(normalizedQuery) ||
          String(item.ipaddress).toLowerCase().includes(normalizedQuery)
      );
    } else {
      match = [...blacklistItems];
    }

    return match.reverse();
  }, [query, blacklistItems]);

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const rowDeleteConfirmHandler = (id: number) => {
    if (!settings.blacklist.modify) return;

    onDelete([id], {
      onSuccess: (res) => {
        addToast(t('message.success.deleteDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });
  };

  const rowDeleteHandler = (id: number) => {
    openConfirmDialog({
      title: t('message.confirm.deleteDetail.title'),
      content: t('message.confirm.deleteDetail.content'),
      onConfirm: () => rowDeleteConfirmHandler(id),
    });
  };

  const rowToggleHandler = (id: number) => {
    onToggle([id], {
      onSuccess: (res) => {
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });
  };

  return {
    rawRows: blacklistItems ?? [],
    rows: results,
    onRowDelete: rowDeleteHandler,
    onRowToggle: rowToggleHandler,
    query,
    setQuery,
  };
};
