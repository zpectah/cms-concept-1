import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../config';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const ArticlesView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { articles } = useUserActions();

  if (!articles.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="articles-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.articles.path}/${newItemKey}`}
          disabled={!articles.create}
        >
          {t('button.new.articles')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default ArticlesView;
