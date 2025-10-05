import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Blacklist } from '@common';
import { useViewLayoutContext } from '../../../components';

export const useBlacklist = () => {
  const [query, setQuery] = useState('');

  const { t } = useTranslation(['common']);
  const { openConfirmDialog } = useViewLayoutContext();

  // TODO
  const blacklistItems: Blacklist = [
    {
      id: 1,
      ipaddress: '123.456.789.1',
      email: '',
      created: '2025-10-03T11:26:13+00:00',
      active: true,
    },
    {
      id: 2,
      ipaddress: '',
      email: 'blocked.email@email.com',
      created: '2025-10-04T11:26:13+00:00',
      active: true,
    },
  ];

  const results = useMemo(() => {
    let match: Blacklist = [];

    if (query.length > 3) {
      const normalizedQuery = query.toLowerCase().trim();

      match = blacklistItems.filter(
        (item) =>
          String(item.email).toLowerCase().includes(normalizedQuery) ||
          String(item.ipaddress).toLowerCase().includes(normalizedQuery)
      );
    } else {
      match = [...blacklistItems];
    }

    return match;
  }, [query]);

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
    rawRows: blacklistItems,
    rows: results,
    onRowDelete: rowDeleteHandler,
    onRowToggle: rowToggleHandler,
    query,
    setQuery,
  };
};
