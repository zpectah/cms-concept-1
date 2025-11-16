import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const MenuView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { menu } = useUserActions();

  if (!menu.view) return;

  return (
    <ViewLayout
      id="menu-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.menu.path}/${newItemKey}`}>
          {t('button.new.menu')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default MenuView;
