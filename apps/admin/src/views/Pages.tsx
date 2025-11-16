import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const PagesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { pages } = useUserActions();

  if (!pages.view) return;

  return (
    <ViewLayout
      id="pages-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.pages.path}/${newItemKey}`}>
          {t('button.new.pages')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default PagesView;
