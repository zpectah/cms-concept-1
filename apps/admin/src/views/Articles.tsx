import { Skeleton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';

const ArticlesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();

  return (
    <ViewLayout
      id="articles-view"
      type="list"
      title={<Skeleton variant="rectangular" width={210} height={30} />}
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.articles.path}/${newItemKey}`}>
          {t('button.new.articles')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default ArticlesView;
