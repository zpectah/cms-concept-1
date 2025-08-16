import { ReactNode } from 'react';
import {
  DialogProps,
  DialogTitleProps,
  DialogContentProps,
  DialogContentTextProps,
  DialogActionsProps,
} from '@mui/material';
import { WithChildren } from '@common';
import { confirmDialogContextKeys } from './enums';

export type ConfirmDialogContext = keyof typeof confirmDialogContextKeys;

export interface DialogBaseProps extends Partial<WithChildren> {
  id?: string;
  open: boolean;
  onClose: () => void;
  dialogProps?: Partial<Omit<DialogProps, 'open' | 'onClose'>>;
  title?: ReactNode;
  titleProps?: Partial<DialogTitleProps>;
  content?: ReactNode;
  contentText?: ReactNode;
  contentProps?: Partial<DialogContentProps>;
  contentTextProps?: Partial<DialogContentTextProps>;
  actions?: ReactNode;
  actionsProps?: Partial<DialogActionsProps>;
}

export interface ConfirmDialogBaseProps {
  title?: string;
  content?: ReactNode;
  onConfirm: () => void;
  context?: ConfirmDialogContext;
}

export interface ConfirmDialogProps extends ConfirmDialogBaseProps {
  open: boolean;
  onClose: () => void;
  timeout?: number;
}
