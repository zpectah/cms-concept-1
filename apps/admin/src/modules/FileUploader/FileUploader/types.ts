import { ReactNode } from 'react';
import { BoxProps } from '@mui/material';
import { FileUploaderQueue } from '../../../types';

export interface FileUploaderProps {
  onQueueUpdate?: (queue: FileUploaderQueue) => void;
  renderQueue?: (queue: FileUploaderQueue) => ReactNode;
  multiple?: boolean;
  boxProps?: Partial<BoxProps>;
}
