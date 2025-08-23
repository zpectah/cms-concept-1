import { getConfig } from '../utils';

interface MenuItem {
  id: string;
  path: string;
  label: string;
  order?: number;
}

export const useMenuItems = () => {
  const {
    admin: { routes },
  } = getConfig();

  const mainMenu: MenuItem[] = [
    {
      id: '0',
      path: '/demo',
      label: 'Demo *',
    },
    {
      id: '1',
      path: `/${routes.login.path}`,
      label: 'Login *',
    },
    {
      id: '2',
      path: `/${routes.passwordRecovery.path}`,
      label: 'Password recovery *',
    },
    {
      id: '3',
      path: `/${routes.dashboard.path}`,
      label: 'Dashboard',
    },

    {
      id: '4',
      path: `/${routes.articles.path}`,
      label: 'Articles',
    },
    {
      id: '5',
      path: `/${routes.categories.path}`,
      label: 'Categories',
    },
    {
      id: '6',
      path: `/${routes.tags.path}`,
      label: 'Tags',
    },
    {
      id: '7',
      path: `/${routes.attachments.path}`,
      label: 'Attachments',
    },

    {
      id: '8',
      path: `/${routes.members.path}`,
      label: 'Members',
    },
    {
      id: '9',
      path: `/${routes.menu.path}`,
      label: 'Menu',
    },
    {
      id: '10',
      path: `/${routes.messages.path}`,
      label: 'Messages',
    },
    {
      id: '11',
      path: `/${routes.pages.path}`,
      label: 'Pages',
    },

    {
      id: '12',
      path: `/${routes.translations.path}`,
      label: 'Translations',
    },
    {
      id: '13',
      path: `/${routes.users.path}`,
      label: 'Users',
    },
    {
      id: '14',
      path: `/${routes.profile.path}`,
      label: 'Profile',
    },
    {
      id: '15',
      path: `/${routes.settings.path}`,
      label: 'Settings',
    },
  ];

  return {
    mainMenu,
  };
};
