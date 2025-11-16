import { useTranslation } from 'react-i18next';
import { Content, Section } from '../../../components';
import { useUserActions } from '../../../hooks';
import { useLanguagesPanel } from './useLanguagesPanel';
import LocalesTable from './LocalesTable';

const LanguagesPanel = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { settings } = useUserActions();
  const { isLoading, ...useLanguagesPanelProps } = useLanguagesPanel();

  if (!settings.languages.view) return;

  if (isLoading) {
    return <div>{t('label.loading')}</div>;
  }

  return (
    <Content>
      <Section title={t('modules:settings.tabs.language.section.title')} cardContent>
        <LocalesTable {...useLanguagesPanelProps} />
      </Section>
    </Content>
  );
};

export default LanguagesPanel;
