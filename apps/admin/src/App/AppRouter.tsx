import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { getConfig } from '../utils';
import { ToastList } from '../modules';
import { AuthLayout, AppLayout } from '../components';
import {
  ArticlesView,
  AttachmentsView,
  CategoriesView,
  DashboardView,
  DemoView,
  ErrorView,
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
const TagsList = lazy(() => import('../modules/Tags/TagsList/TagsList'));
const TagsDetailForm = lazy(() => import('../modules/Tags/TagsDetailForm/TagsDetailForm'));
const AttachmentsList = lazy(() => import('../modules/Attachments/AttachmentsList/AttachmentsList'));
const AttachmentsDetailForm = lazy(() => import('../modules/Attachments/AttachmentsDetailForm/AttachmentsDetailForm'));
const MembersList = lazy(() => import('../modules/Members/MembersList/MembersList'));
const MembersDetailForm = lazy(() => import('../modules/Members/MembersDetailForm/MembersDetailForm'));
const MenuList = lazy(() => import('../modules/Menu/MenuList/MenuList'));
const MenuDetailForm = lazy(() => import('../modules/Menu/MenuDetailForm/MenuDetailForm'));
const MessagesList = lazy(() => import('../modules/Messages/MessagesList/MessagesList'));
const MessagesDetailForm = lazy(() => import('../modules/Messages/MessagesDetailForm/MessagesDetailForm'));
const PagesList = lazy(() => import('../modules/Pages/PagesList/PagesList'));
const PagesDetailForm = lazy(() => import('../modules/Pages/PagesDetailForm/PagesDetailForm'));
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
      element: <AppLayout variant="minimal" />,
      children: [
        {
          path: '*',
          element: <ErrorView code={404} />,
        },

        {
          path: `/${routes.login.path}`,
          element: <LoginView />,
        },
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
      children: [
        {
          element: <AppLayout slot={<ToastList />} />,
          children: [
            {
              path: `/${routes.demo.path}`,
              element: <DemoView />,
            },

            {
              path: `/${routes.dashboard.path}`,
              element: <DashboardView />,
            },

            {
              path: `/${routes.settings.path}`,
              element: <SettingsView />,
            },

            {
              path: `/${routes.profile.path}`,
              element: <ProfileView />,
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
