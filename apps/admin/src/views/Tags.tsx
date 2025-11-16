import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const TagsView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { tags } = useUserActions();

  if (!tags.view) return;

  return (
    <ViewLayout
      id="tags-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.tags.path}/${newItemKey}`}>
          {t('button.new.tags')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default TagsView;
