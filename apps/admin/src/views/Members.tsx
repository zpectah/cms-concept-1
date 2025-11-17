import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const MembersView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { members } = useUserActions();

  if (!members.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="members-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.members.path}/${newItemKey}`}
          disabled={!members.create}
        >
          {t('button.new.members')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default MembersView;
