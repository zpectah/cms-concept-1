import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Blacklist } from '@common';
import { useViewLayoutContext } from '../../../components';
import { useBlacklistQuery } from '../../../hooks-query';

export const useBlacklist = () => {
  const [query, setQuery] = useState('');

  const { t } = useTranslation(['common']);
  const { openConfirmDialog } = useViewLayoutContext();
  const { blacklistQuery } = useBlacklistQuery({});

  const { data: blacklistItems } = blacklistQuery;

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

    return match;
  }, [query, blacklistItems]);

  const rowDeleteConfirmHandler = (id: number) => {
    // TODO
    console.log('on delete ... confirmed', id);
  };

  const rowDeleteHandler = (id: number) => {
    openConfirmDialog({
      title: t('message.confirm.deleteDetail.title'),
      content: t('message.confirm.deleteDetail.content'),
      onConfirm: () => rowDeleteConfirmHandler(id),
    });
  };

  const rowToggleHandler = (id: number) => {
    // TODO
    console.log('on toggle', id);
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
