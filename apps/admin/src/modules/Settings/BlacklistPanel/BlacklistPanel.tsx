import { Content, Section } from '../../../components';
import { useBlacklistPanel } from './useBlacklistPanel';
import BlacklistTable from './BlacklistTable';

const BlacklistPanel = () => {
  const { blacklistItems, onDelete, onToggle, onCreate } = useBlacklistPanel();

  return (
    <Content>
      <Section title="Blokování přístupu" cardContent>
        <BlacklistTable blacklistItems={blacklistItems} onDelete={onDelete} onToggle={onToggle} onCreate={onCreate} />
      </Section>
    </Content>
  );
};

export default BlacklistPanel;
