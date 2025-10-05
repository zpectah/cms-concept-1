import { Content, Section } from '../../../components';
import BlacklistTable from './BlacklistTable';
import { useTranslation } from 'react-i18next';

const BlacklistPanel = () => {
  const { t } = useTranslation(['modules']);

  return (
    <Content>
      <Section title={t('modules:settings.tabs.blacklist.section.title')} cardContent>
        <BlacklistTable />
      </Section>
    </Content>
  );
};

export default BlacklistPanel;
