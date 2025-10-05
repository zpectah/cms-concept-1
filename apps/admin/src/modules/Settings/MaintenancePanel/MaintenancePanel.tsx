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
        <br /> - Nejdříve se spustí analýza ... a na základě výsledků z analýzy se udělá nabídka na promazání ...
      </Section>
    </Content>
  );
};

export default MaintenancePanel;
