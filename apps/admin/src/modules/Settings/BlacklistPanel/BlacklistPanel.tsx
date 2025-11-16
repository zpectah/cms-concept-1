import { useTranslation } from 'react-i18next';
import { Content, Section } from '../../../components';
import { useUserActions } from '../../../hooks';
import BlacklistTable from './BlacklistTable';
import BlacklistNewItemDialog from './BlacklistNewItemDialog';

const BlacklistPanel = () => {
  const { t } = useTranslation(['modules']);
  const { settings } = useUserActions();

  if (!settings.blacklist.view) return;

  return (
    <Content>
      <Section
        title={t('modules:settings.tabs.blacklist.section.title')}
        subtitle={t('modules:settings.tabs.blacklist.section.subtitle')}
        cardContent
        titleSlot={<BlacklistNewItemDialog />}
      >
        <BlacklistTable />
      </Section>
    </Content>
  );
};

export default BlacklistPanel;
