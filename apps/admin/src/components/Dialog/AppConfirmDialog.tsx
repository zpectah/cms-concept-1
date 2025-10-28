import ConfirmDialog from './ConfirmDialog';
import { useAppStore } from '../../store';

const AppConfirmDialog = () => {
  const { confirmDialog, openConfirmDialog } = useAppStore();

  return (
    <ConfirmDialog
      open={!!confirmDialog}
      onClose={() => openConfirmDialog(null)}
      title={confirmDialog?.title}
      content={confirmDialog?.content}
      onConfirm={() => confirmDialog?.onConfirm()}
    />
  );
};

export default AppConfirmDialog;
