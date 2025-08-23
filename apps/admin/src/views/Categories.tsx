import { Skeleton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';

const CategoriesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();

  return (
    <ViewLayout
      id="categories-view"
      type="list"
      title={<Skeleton variant="rectangular" width={210} height={30} />}
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
