import { DrawerProps as MuiDrawerProps } from '@mui/material';
import { ReactNode } from 'react';

export interface DrawerProps extends Omit<MuiDrawerProps, 'onClose' | 'content'> {
  header?: ReactNode;
  footer?: ReactNode;
  content?: ReactNode;
  disableCloseButton?: boolean;
  onClose: () => void;
}
