import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../config';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const TagsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { tags } = useUserActions();

  if (!tags.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="tags-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.tags.path}/${newItemKey}`}
          disabled={!tags.create}
        >
          {t('button.new.tags')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default TagsView;
