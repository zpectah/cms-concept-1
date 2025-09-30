import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ToastList, AnnouncementsList } from '../modules';
import { AuthLayout, AppLayout } from '../components';
import {
  ArticlesView,
  AttachmentsView,
  CategoriesView,
  DashboardView,
  DemoView,
  ErrorView,
  ErrorBoundary,
  LoginView,
  PasswordRecoveryView,
  ProfileView,
  SettingsView,
  TagsView,
  MembersView,
  MenuView,
  MessagesView,
  PagesView,
  TranslationsView,
  UsersView,
} from '../views';

const ArticlesList = lazy(() => import('../modules/Articles/ArticlesList/ArticlesList'));
const ArticlesDetailForm = lazy(() => import('../modules/Articles/ArticlesDetailForm/ArticlesDetailForm'));
const CategoriesList = lazy(() => import('../modules/Categories/CategoriesList/CategoriesList'));
const CategoriesDetailForm = lazy(() => import('../modules/Categories/CategoriesDetailForm/CategoriesDetailForm'));
const Dashboard = lazy(() => import('../modules/Dashboard/Dashboard'));
const TagsList = lazy(() => import('../modules/Tags/TagsList/TagsList'));
const TagsDetailForm = lazy(() => import('../modules/Tags/TagsDetailForm/TagsDetailForm'));
const AttachmentsList = lazy(() => import('../modules/Attachments/AttachmentsList/AttachmentsList'));
const AttachmentsDetailForm = lazy(() => import('../modules/Attachments/AttachmentsDetailForm/AttachmentsDetailForm'));
const AttachmentsCreateForm = lazy(() => import('../modules/Attachments/AttachmentsCreateForm/AttachmentsCreateForm'));
const MembersList = lazy(() => import('../modules/Members/MembersList/MembersList'));
const MembersDetailForm = lazy(() => import('../modules/Members/MembersDetailForm/MembersDetailForm'));
const MenuList = lazy(() => import('../modules/Menu/MenuList/MenuList'));
const MenuDetailForm = lazy(() => import('../modules/Menu/MenuDetailForm/MenuDetailForm'));
const MessagesList = lazy(() => import('../modules/Messages/MessagesList/MessagesList'));
const MessagesDetailForm = lazy(() => import('../modules/Messages/MessagesDetailForm/MessagesDetailForm'));
const PagesList = lazy(() => import('../modules/Pages/PagesList/PagesList'));
const PagesDetailForm = lazy(() => import('../modules/Pages/PagesDetailForm/PagesDetailForm'));
const ProfileAccountPanel = lazy(() => import('../modules/Profile/AccountPanelForm/AccountPanelForm'));
const SettingsClientPanel = lazy(() => import('../modules/Settings/ClientPanelForm/ClientPanelForm'));
const SettingsGlobalPanel = lazy(() => import('../modules/Settings/GlobalPanelForm/GlobalPanelForm'));
const SettingsLanguagesPanel = lazy(() => import('../modules/Settings/LanguagesPanel/LanguagesPanel'));
const SettingsMaintenancePanel = lazy(() => import('../modules/Settings/MaintenancePanel/MaintenancePanel'));
const SettingsBlacklistPanel = lazy(() => import('../modules/Settings/BlacklistPanel/BlacklistPanel'));
const TranslationsList = lazy(() => import('../modules/Translations/TranslationsList/TranslationsList'));
const TranslationsDetailForm = lazy(
  () => import('../modules/Translations/TranslationsDetailForm/TranslationsDetailForm')
);
const UsersList = lazy(() => import('../modules/Users/UsersList/UsersList'));
const UsersDetailForm = lazy(() => import('../modules/Users/UsersDetailForm/UsersDetailForm'));

const AppRouter = () => {
  const {
    admin: { routes },
  } = getConfig();

  const router = createBrowserRouter([
    {
      element: <AppLayout variant="minimal" toastsSlot={<ToastList />} announcementsSlot={<AnnouncementsList />} />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '*',
          element: <ErrorView code={404} />,
        },

        // Login
        {
          path: `/${routes.login.path}`,
          element: <LoginView />,
        },

        // Password recovery
        {
          path: `/${routes.passwordRecovery.path}`,
          element: <PasswordRecoveryView />,
          children: [
            {
              path: `/${routes.passwordRecovery.path}/:token`,
              element: <PasswordRecoveryView />,
            },
          ],
        },

        // TODO: Redirect to login if not session found, otherwise redirect to dashboard
        {
          path: '/',
          element: <Navigate replace to={`/${routes.login.path}`} />,
        },
      ],
    },

    {
      element: <AuthLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          element: <AppLayout toastsSlot={<ToastList />} announcementsSlot={<AnnouncementsList />} />,
          children: [
            // Demo
            {
              path: `/${routes.demo.path}`,
              element: <DemoView />,
            },

            // Dashboard
            {
              path: `/${routes.dashboard.path}`,
              element: <DashboardView />,
              children: [
                {
                  path: `/${routes.dashboard.path}`,
                  element: <Dashboard />,
                },
              ],
            },

            // Profile
            {
              path: `/${routes.profile.path}`,
              element: <ProfileView />,
              children: [
                {
                  path: `/${routes.profile.path}`,
                  element: <Navigate replace to={`/${routes.profile.path}/${routes.profile.panels.account}`} />,
                },
                {
                  path: `/${routes.profile.path}/${routes.profile.panels.account}`,
                  element: <ProfileAccountPanel />,
                },
              ],
            },

            // Settings
            {
              path: `/${routes.settings.path}`,
              element: <SettingsView />,
              children: [
                {
                  path: `/${routes.settings.path}`,
                  element: <Navigate replace to={`/${routes.settings.path}/${routes.settings.panels.global}`} />,
                },
                {
                  path: `/${routes.settings.path}/${routes.settings.panels.global}`,
                  element: <SettingsGlobalPanel />,
                },
                {
                  path: `/${routes.settings.path}/${routes.settings.panels.client}`,
                  element: <SettingsClientPanel />,
                },
                {
                  path: `/${routes.settings.path}/${routes.settings.panels.languages}`,
                  element: <SettingsLanguagesPanel />,
                },
                {
                  path: `/${routes.settings.path}/${routes.settings.panels.maintenance}`,
                  element: <SettingsMaintenancePanel />,
                },
                {
                  path: `/${routes.settings.path}/${routes.settings.panels.blacklist}`,
                  element: <SettingsBlacklistPanel />,
                },
              ],
            },

            // Articles
            {
              path: `/${routes.articles.path}`,
              element: <ArticlesView />,
              children: [
                {
                  path: `/${routes.articles.path}`,
                  element: <ArticlesList />,
                },
                {
                  path: `/${routes.articles.path}/:id`,
                  element: <ArticlesDetailForm />,
                },
              ],
            },

            // Categories
            {
              path: `/${routes.categories.path}`,
              element: <CategoriesView />,
              children: [
                {
                  path: `/${routes.categories.path}`,
                  element: <CategoriesList />,
                },
                {
                  path: `/${routes.categories.path}/:id`,
                  element: <CategoriesDetailForm />,
                },
              ],
            },

            // Tags
            {
              path: `/${routes.tags.path}`,
              element: <TagsView />,
              children: [
                {
                  path: `/${routes.tags.path}`,
                  element: <TagsList />,
                },
                {
                  path: `/${routes.tags.path}/:id`,
                  element: <TagsDetailForm />,
                },
              ],
            },

            // Attachments
            {
              path: `/${routes.attachments.path}`,
              element: <AttachmentsView />,
              children: [
                {
                  path: `/${routes.attachments.path}`,
                  element: <AttachmentsList />,
                },
                {
                  path: `/${routes.attachments.path}/${newItemKey}`,
                  element: <AttachmentsCreateForm />,
                },
                {
                  path: `/${routes.attachments.path}/:id`,
                  element: <AttachmentsDetailForm />,
                },
              ],
            },

            // Pages
            {
              path: `/${routes.pages.path}`,
              element: <PagesView />,
              children: [
                {
                  path: `/${routes.pages.path}`,
                  element: <PagesList />,
                },
                {
                  path: `/${routes.pages.path}/:id`,
                  element: <PagesDetailForm />,
                },
              ],
            },

            // Users
            {
              path: `/${routes.users.path}`,
              element: <UsersView />,
              children: [
                {
                  path: `/${routes.users.path}`,
                  element: <UsersList />,
                },
                {
                  path: `/${routes.users.path}/:id`,
                  element: <UsersDetailForm />,
                },
              ],
            },

            // Members
            {
              path: `/${routes.members.path}`,
              element: <MembersView />,
              children: [
                {
                  path: `/${routes.members.path}`,
                  element: <MembersList />,
                },
                {
                  path: `/${routes.members.path}/:id`,
                  element: <MembersDetailForm />,
                },
              ],
            },

            // Menu
            {
              path: `/${routes.menu.path}`,
              element: <MenuView />,
              children: [
                {
                  path: `/${routes.menu.path}`,
                  element: <MenuList />,
                },
                {
                  path: `/${routes.menu.path}/:id`,
                  element: <MenuDetailForm />,
                },
              ],
            },

            // Messages
            {
              path: `/${routes.messages.path}`,
              element: <MessagesView />,
              children: [
                {
                  path: `/${routes.messages.path}`,
                  element: <MessagesList />,
                },
                {
                  path: `/${routes.messages.path}/:id`,
                  element: <MessagesDetailForm />,
                },
              ],
            },

            // Translations
            {
              path: `/${routes.translations.path}`,
              element: <TranslationsView />,
              children: [
                {
                  path: `/${routes.translations.path}`,
                  element: <TranslationsList />,
                },
                {
                  path: `/${routes.translations.path}/:id`,
                  element: <TranslationsDetailForm />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
