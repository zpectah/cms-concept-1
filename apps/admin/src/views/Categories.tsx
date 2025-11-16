import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const CategoriesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { categories } = useUserActions();

  if (!categories.view) return;

  return (
    <ViewLayout
      id="categories-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.categories.path}/${newItemKey}`}>
          {t('button.new.categories')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default CategoriesView;
