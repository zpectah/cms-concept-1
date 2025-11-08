import { ReactNode } from 'react';
import { BoxProps } from '@mui/material';
import { FileUploaderQueue, FileUploaderQueueItem } from '../../types';

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
  renderInput?: (onInputChange: (files: FileList) => void, onQueueClear: () => void) => ReactNode;
  boxProps?: Partial<BoxProps>;
  buttonLabel?: string;
}

export type useFileUploaderProps = FileUploaderBase & {};

export interface AvatarUploaderProps {
  name: string;
  hash?: string;
  current?: string;
  onLoad?: () => void;
  onLoadEnd?: (results: FileUploaderQueueItem | null) => void;
  onError?: (error: DOMException | null) => void;
  onFinish?: (result: FileUploaderQueueItem | null) => void;
  onRemove?: () => void;
  size?: string;
}

export type UseAvatarUploaderProps = Omit<AvatarUploaderProps, 'current' | 'name' | 'hash' | 'onRemove' | 'size'>;
