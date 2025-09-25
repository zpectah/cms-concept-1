import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ActionBar } from '../Content';
import DialogBase from './DialogBase';
import { ConfirmDialogProps } from './types';
import { CONFIRM_DIALOG_TIMEOUT_DEFAULT } from './constants';
import { confirmDialogContextKeys } from './enums';

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  context = confirmDialogContextKeys.default,
  timeout = CONFIRM_DIALOG_TIMEOUT_DEFAULT,
}: ConfirmDialogProps) => {
  const { t } = useTranslation();

  const confirmHandler = () => {
    onClose();
    setTimeout(onConfirm, timeout);
  };

  return (
    <DialogBase
      id={`confirm-dialog-${context}`}
      open={open}
      onClose={onClose}
      title={title}
      contentText={content}
      actions={
        <ActionBar stackProps={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button size="large" onClick={onClose} variant="outlined" color="inherit">
            {t('button.cancel')}
          </Button>
          <Button size="large" onClick={confirmHandler} variant="contained" color="primary">
            {t('button.confirm')}
          </Button>
        </ActionBar>
      }
      dialogProps={{ keepMounted: true }}
    />
  );
};

export default ConfirmDialog;
