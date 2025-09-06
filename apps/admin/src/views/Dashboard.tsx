import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ViewLayout } from '../components';

const DashboardView = () => {
  const { t } = useTranslation(['modules']);

  return <ViewLayout id="dashboard-view" title={t('modules:dashboard.pageTitle')} children={<Outlet />} />;
};

export default DashboardView;
