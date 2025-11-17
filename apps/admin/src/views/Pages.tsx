import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const PagesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { pages } = useUserActions();

  if (!pages.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="pages-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.pages.path}/${newItemKey}`}
          disabled={!pages.create}
        >
          {t('button.new.pages')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default PagesView;
