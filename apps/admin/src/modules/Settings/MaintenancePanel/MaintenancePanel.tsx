import { Content } from '../../../components';
import { MaintenanceForm } from './MaintenanceForm';
import { useUserActions } from '../../../hooks';

const MaintenancePanel = () => {
  const { settings } = useUserActions();

  if (!settings.maintenance.view) return;

  return (
    <Content>
      <MaintenanceForm />
    </Content>
  );
};

export default MaintenancePanel;
