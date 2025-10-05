import { useTranslation } from 'react-i18next';
import { Content, Section } from '../../../components';
import { useLanguagesPanel } from './useLanguagesPanel';
import LocalesTable from './LocalesTable';

const LanguagesPanel = () => {
  const { t } = useTranslation(['common', 'modules']);
  const {
    isLoading,
    isLocaleInstalled,
    isLocaleActive,
    isLocaleDefault,
    onLocaleInstall,
    onLocaleToggle,
    onLocaleDefault,
    isInstalling,
    isUpdating,
  } = useLanguagesPanel();

  if (isLoading) {
    return <div>{t('label.loading')}</div>;
  }

  return (
    <Content>
      <Section title={t('modules:settings.tabs.language.section.title')} cardContent>
        <LocalesTable
          isLocaleInstalled={isLocaleInstalled}
          isLocaleActive={isLocaleActive}
          isLocaleDefault={isLocaleDefault}
          onLocaleInstall={onLocaleInstall}
          onLocaleToggle={onLocaleToggle}
          onLocaleDefault={onLocaleDefault}
          isInstalling={isInstalling}
          isUpdating={isUpdating}
        />
      </Section>
    </Content>
  );
};

export default LanguagesPanel;
