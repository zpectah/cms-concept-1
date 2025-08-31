import { useBlacklistPanel } from './useBlacklistPanel';
import { Content, Section } from '../../../components';

const BlacklistPanel = () => {
  const {} = useBlacklistPanel();

  // TODO

  return (
    <Content>
      <Section title="Blokování přístupu">- tabulka s IP adresama nebo emailem [IP Address, e-mail]</Section>
    </Content>
  );
};

export default BlacklistPanel;
