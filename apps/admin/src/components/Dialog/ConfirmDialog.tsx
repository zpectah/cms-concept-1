import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CONFIRM_DIALOG_Z_INDEX } from '../../constants';
import { ActionBar } from '../Content';
import { ConfirmDialogProps } from './types';
import { CONFIRM_DIALOG_TIMEOUT_DEFAULT } from './constants';
import { confirmDialogContextKeys } from './enums';
import DialogBase from './DialogBase';

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
      dialogProps={{ keepMounted: true, maxWidth: 'xs', fullWidth: true, sx: { zIndex: CONFIRM_DIALOG_Z_INDEX } }}
      contentProps={{ dividers: true, sx: { pt: 4, pb: 4, px: 2, textAlign: 'center' } }}
    >
      <ActionBar stackProps={{ width: '100%', justifyContent: 'center', alignItems: 'center', sx: { py: 2 } }}>
        <Button size="large" onClick={onClose} variant="outlined" color="inherit">
          {t('button.cancel')}
        </Button>
        <Button size="large" onClick={confirmHandler} variant="contained" color="success">
          {t('button.confirm')}
        </Button>
      </ActionBar>
    </DialogBase>
  );
};

export default ConfirmDialog;
