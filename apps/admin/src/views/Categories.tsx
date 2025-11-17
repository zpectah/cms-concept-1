import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const CategoriesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { categories } = useUserActions();

  if (!categories.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="categories-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.categories.path}/${newItemKey}`}
          disabled={!categories.create}
        >
          {t('button.new.categories')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default CategoriesView;
