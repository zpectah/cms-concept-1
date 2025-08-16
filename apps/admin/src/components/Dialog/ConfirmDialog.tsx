import { Button } from '@mui/material';
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
        <>
          <Button onClick={onClose}>cancel</Button>
          <Button onClick={confirmHandler}>confirm</Button>
        </>
      }
      dialogProps={{ keepMounted: true }}
    />
  );
};

export default ConfirmDialog;
