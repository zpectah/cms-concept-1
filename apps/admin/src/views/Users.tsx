import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const UsersView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { users } = useUserActions();

  if (!users.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="users-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.users.path}/${newItemKey}`}
          disabled={!users.create}
        >
          {t('button.new.users')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default UsersView;
