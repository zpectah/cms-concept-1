import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ViewLayout } from '../components';
import { ProfilePanelNavigation } from '../modules/Profile';

const ProfileView = () => {
  const { t } = useTranslation(['modules']);

  return (
    <ViewLayout
      id="profile-view"
      type="tabs"
      title={t('modules:profile.pageTitle')}
      tabsNavigation={<ProfilePanelNavigation />}
      children={<Outlet />}
    />
  );
};

export default ProfileView;
