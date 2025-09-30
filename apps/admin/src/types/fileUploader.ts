import { fileUploaderStateKeys } from '../enums';

export type FileUploaderState = keyof typeof fileUploaderStateKeys;

export interface FileUploaderQueueItem {
  content: string;
  mime: string;
  size: number;
  name: string;
  filename: string;
  extension: string;
}

export type FileUploaderQueue = FileUploaderQueueItem[];
