import { useLanguagesPanel } from './useLanguagesPanel';
import { Content, Section } from '../../../components';

const LanguagesPanel = () => {
  const {} = useLanguagesPanel();

  // TODO

  return (
    <Content>
      <Section title="Správa jazyků">- seznam nainstalovaných jazyků [klíč, aktivní, výchozí]</Section>
      <Section title="Instalace nového jazyka">- výběr a instalace nového jazyka</Section>
    </Content>
  );
};

export default LanguagesPanel;
