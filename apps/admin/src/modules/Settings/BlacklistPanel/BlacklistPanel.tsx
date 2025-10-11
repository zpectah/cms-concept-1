import { useTranslation } from 'react-i18next';
import { Content, Section } from '../../../components';
import BlacklistTable from './BlacklistTable';
import BlacklistNewItemDialog from './BlacklistNewItemDialog';

const BlacklistPanel = () => {
  const { t } = useTranslation(['modules']);

  return (
    <Content>
      <Section
        title={t('modules:settings.tabs.blacklist.section.title')}
        cardContent
        titleSlot={<BlacklistNewItemDialog />}
      >
        <BlacklistTable />
      </Section>
    </Content>
  );
};

export default BlacklistPanel;
