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
} from '../views';

const ArticlesList = lazy(() => import('../modules/Articles/ArticlesList/ArticlesList'));
const ArticlesDetailForm = lazy(() => import('../modules/Articles/ArticlesDetailForm/ArticlesDetailForm'));
const CategoriesList = lazy(() => import('../modules/Categories/CategoriesList/CategoriesList'));
const CategoriesDetailForm = lazy(() => import('../modules/Categories/CategoriesDetailForm/CategoriesDetailForm'));
const TagsList = lazy(() => import('../modules/Tags/TagsList/TagsList'));
const TagsDetailForm = lazy(() => import('../modules/Tags/TagsDetailForm/TagsDetailForm'));
const AttachmentsList = lazy(() => import('../modules/Attachments/AttachmentsList/AttachmentsList'));
const AttachmentsDetailForm = lazy(() => import('../modules/Attachments/AttachmentsDetailForm/AttachmentsDetailForm'));

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
        },

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

            // Users

            // Members

            // Menu

            // Messages

            // Translations
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
