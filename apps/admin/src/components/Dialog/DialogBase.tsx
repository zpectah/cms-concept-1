import { forwardRef, ReactElement, Ref } from 'react';
import { Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { DialogBaseProps } from './types';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBase = ({
  id,
  open,
  onClose,
  children,
  dialogProps,
  title,
  titleProps,
  content,
  contentText,
  contentProps,
  contentTextProps,
  actions,
  actionsProps,
}: DialogBaseProps) => {
  return (
    <Dialog
      open={open}
      slots={{
        transition: Transition,
      }}
      onClose={onClose}
      aria-describedby={id}
      {...dialogProps}
    >
      {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
      {(content || contentText) && (
        <DialogContent {...contentProps}>
          {contentText && (
            <DialogContentText id={id} {...contentTextProps}>
              {contentText}
            </DialogContentText>
          )}
          {content}
        </DialogContent>
      )}
      {children}
      {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DialogBase;
