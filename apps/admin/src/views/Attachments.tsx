import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../config';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const AttachmentsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { attachments } = useUserActions();

  if (!attachments.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="attachments-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.attachments.path}/${newItemKey}`}
          disabled={!attachments.create}
        >
          {t('button.new.attachments')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default AttachmentsView;
