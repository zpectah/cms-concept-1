import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';

const UsersView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();

  return (
    <ViewLayout
      id="users-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.users.path}/${newItemKey}`}>
          {t('button.new.users')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default UsersView;
