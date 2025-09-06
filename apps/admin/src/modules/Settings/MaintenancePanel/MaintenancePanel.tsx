import { useMaintenancePanel } from './useMaintenancePanel';
import { Content, Section } from '../../../components';

const MaintenancePanel = () => {
  const {} = useMaintenancePanel();

  // TODO

  return (
    <Content>
      <Section title="Údržba" cardContent>
        - Definitivně smazat všechny smazané položky
        <br />- Definitivně smazat všechny smazané přílohy
      </Section>
    </Content>
  );
};

export default MaintenancePanel;
