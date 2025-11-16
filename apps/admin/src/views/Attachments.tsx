import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../utils';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';

const AttachmentsView = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation();
  const { attachments } = useUserActions();

  if (!attachments.view) return;

  return (
    <ViewLayout
      id="attachments-view"
      type="list"
      titleAction={
        <LinkButton variant="contained" color="success" size="large" to={`/${routes.attachments.path}/${newItemKey}`}>
          {t('button.new.attachments')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default AttachmentsView;
