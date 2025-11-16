import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const ArticlesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { articles } = useUserActions();

  if (!articles.view) return;

  return (
    <ViewLayout
      id="articles-view"
      type="list"
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
