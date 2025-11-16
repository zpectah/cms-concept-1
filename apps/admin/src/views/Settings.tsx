import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ViewLayout } from '../components';
import { SettingsPanelNavigation } from '../modules';
import { useUserActions } from '../hooks';

const SettingsView = () => {
  const { t } = useTranslation(['modules']);
  const { settings } = useUserActions();

  if (!settings.view) return;

  return (
    <ViewLayout
      id="settings-view"
      type="tabs"
      title={t('modules:settings.pageTitle')}
      tabsNavigation={<SettingsPanelNavigation />}
      children={<Outlet />}
    />
  );
};

export default SettingsView;
