import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';

const MessagesView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();

  return (
    <ViewLayout
      id="messages-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.messages.path}/${newItemKey}`}>
          {t('button.new.messages')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default MessagesView;
