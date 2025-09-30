import { ReactNode } from 'react';
import { BoxProps } from '@mui/material';
import { FileUploaderQueue } from '../../types';

interface FileUploaderBase {
  multiple?: boolean;
  initialQueue?: FileUploaderQueue;
  onQueueUpdate?: (queue: FileUploaderQueue) => void;
  onLoad?: () => void;
  onLoadEnd?: () => void;
  onError?: (error: DOMException | null) => void;
}

export interface FileUploaderProps extends FileUploaderBase {
  renderQueue?: (queue: FileUploaderQueue) => ReactNode;
  renderInput?: (onInputChange: (files: FileList) => void) => ReactNode;
  boxProps?: Partial<BoxProps>;
}

export type useFileUploaderProps = FileUploaderBase & {};
