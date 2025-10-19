import { useTranslation } from 'react-i18next';
import { getConfig } from '../utils';

interface MenuItem {
  id: string;
  path: string;
  label: string;
  order?: number;
  hidden: boolean;
}

export const useMenuItems = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['common']);

  const mainMenu: MenuItem[] = [
    {
      id: '10',
      path: '/demo',
      label: 'Demo *',
      hidden: false,
    },
    {
      id: '11',
      path: `/${routes.login.path}`,
      label: 'Login *',
      hidden: false,
    },
    {
      id: '12',
      path: `/${routes.passwordRecovery.path}`,
      label: 'Password recovery *',
      hidden: false,
    },

    {
      id: '100',
      path: `/${routes.dashboard.path}`,
      label: t('routes.dashboard'),
      hidden: false,
    },
    {
      id: '101',
      path: `/${routes.settings.path}`,
      label: t('routes.settings'),
      hidden: false,
    },
    {
      id: '102',
      path: `/${routes.users.path}`,
      label: t('routes.users'),
      hidden: false,
    },
    {
      id: '103',
      path: `/${routes.members.path}`,
      label: t('routes.members'),
      hidden: false,
    },
    {
      id: '104',
      path: `/${routes.pages.path}`,
      label: t('routes.pages'),
      hidden: false,
    },
    {
      id: '105',
      path: `/${routes.articles.path}`,
      label: t('routes.articles'),
      hidden: false,
    },
    {
      id: '106',
      path: `/${routes.categories.path}`,
      label: t('routes.categories'),
      hidden: false,
    },
    {
      id: '107',
      path: `/${routes.tags.path}`,
      label: t('routes.tags'),
      hidden: false,
    },
    {
      id: '108',
      path: `/${routes.attachments.path}`,
      label: t('routes.attachments'),
      hidden: false,
    },
    {
      id: '109',
      path: `/${routes.menu.path}`,
      label: t('routes.menu'),
      hidden: false,
    },
    {
      id: '110',
      path: `/${routes.translations.path}`,
      label: t('routes.translations'),
      hidden: false,
    },
    {
      id: '111',
      path: `/${routes.messages.path}`,
      label: t('routes.messages'),
      hidden: false,
    },
  ];

  return {
    mainMenu,
  };
};
