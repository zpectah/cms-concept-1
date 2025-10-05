import { Blacklist, BlacklistItem } from '@common';

export const useBlacklistPanel = () => {
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

  return {
    form: {},
    blacklistItems,

    onDelete: (id: number) => {
      console.log('on delete', id);
    },
    onToggle: (id: number) => {
      console.log('on toggle', id);
    },
    onCreate: (item: BlacklistItem) => {
      console.log('on create new', item);
    },
  };
};
