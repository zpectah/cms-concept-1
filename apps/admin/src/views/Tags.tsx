import { Skeleton } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';

const TagsView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();

  return (
    <ViewLayout
      id="tags-view"
      type="list"
      title={<Skeleton variant="rectangular" width={210} height={30} />}
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
