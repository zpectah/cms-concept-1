import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ViewLayout } from '../components';
import { SettingsPanelNavigation } from '../modules';

const SettingsView = () => {
  const { t } = useTranslation(['modules']);

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
