import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../config';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const MenuView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { menu } = useUserActions();

  if (!menu.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="menu-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.menu.path}/${newItemKey}`}
          disabled={!menu.create}
        >
          {t('button.new.menu')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default MenuView;
