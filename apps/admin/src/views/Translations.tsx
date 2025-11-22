import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newItemKey } from '@common';
import { getConfig } from '../config';
import { ViewLayout, LinkButton } from '../components';
import { useUserActions } from '../hooks';
import Error from './Error';

const TranslationsView = () => {
  const { routes } = getConfig();

  const { t } = useTranslation();
  const { translations } = useUserActions();

  if (!translations.view) return <Error code={403} disableFooter />;

  return (
    <ViewLayout
      id="translations-view"
      type="list"
      titleAction={
        <LinkButton
          variant="contained"
          color="success"
          size="large"
          to={`/${routes.translations.path}/${newItemKey}`}
          disabled={!translations.create}
        >
          {t('button.new.translations')}
        </LinkButton>
      }
      children={<Outlet />}
    />
  );
};

export default TranslationsView;
