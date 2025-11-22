import { useTranslation } from 'react-i18next';
import { getConfig } from '../config';
import { useUserActions } from './useUserActions';

interface MenuItem {
  id: string;
  path: string;
  label: string;
  order?: number;
  visible: boolean;
}

export const useMenuItems = () => {
  const { routes } = getConfig();

  const { t } = useTranslation(['common']);
  const { ...actions } = useUserActions();

  const mainMenu: MenuItem[] = [
    {
      id: '100',
      path: `/${routes.dashboard.path}`,
      label: t('routes.dashboard'),
      visible: true,
    },
    {
      id: '101',
      path: `/${routes.settings.path}`,
      label: t('routes.settings'),
      visible: actions.settings.view,
    },
    {
      id: '102',
      path: `/${routes.users.path}`,
      label: t('routes.users'),
      visible: actions.users.view,
    },
    {
      id: '103',
      path: `/${routes.members.path}`,
      label: t('routes.members'),
      visible: actions.members.view,
    },
    {
      id: '104',
      path: `/${routes.pages.path}`,
      label: t('routes.pages'),
      visible: actions.pages.view,
    },
    {
      id: '105',
      path: `/${routes.articles.path}`,
      label: t('routes.articles'),
      visible: actions.articles.view,
    },
    {
      id: '106',
      path: `/${routes.categories.path}`,
      label: t('routes.categories'),
      visible: actions.categories.view,
    },
    {
      id: '107',
      path: `/${routes.tags.path}`,
      label: t('routes.tags'),
      visible: actions.tags.view,
    },
    {
      id: '108',
      path: `/${routes.attachments.path}`,
      label: t('routes.attachments'),
      visible: actions.attachments.view,
    },
    {
      id: '109',
      path: `/${routes.menu.path}`,
      label: t('routes.menu'),
      visible: actions.menu.view,
    },
    {
      id: '110',
      path: `/${routes.translations.path}`,
      label: t('routes.translations'),
      visible: actions.translations.view,
    },
    {
      id: '111',
      path: `/${routes.messages.path}`,
      label: t('routes.messages'),
      visible: actions.messages.view,
    },
  ];

  return {
    mainMenu,
  };
};
