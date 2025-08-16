import { lazy } from 'react';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { getConfig } from '../utils';
import { ToastList } from '../modules';
import { AuthLayout, AppLayout } from '../components';
import {
  ArticlesView,
  DashboardView,
  DemoView,
  ErrorView,
  LoginView,
  PasswordRecoveryView,
  ProfileView,
  SettingsView,
} from '../views';

const ArticlesList = lazy(() => import('../modules/Articles/ArticlesList/ArticlesList'));
const ArticlesDetailForm = lazy(() => import('../modules/Articles/ArticlesDetailForm/ArticlesDetailForm'));

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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
