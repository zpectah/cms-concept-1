import { AttachmentsType } from '@common';
import { fileUploaderStateKeys } from '../enums';

export type FileUploaderState = keyof typeof fileUploaderStateKeys;

export interface FileUploaderQueueItem {
  type: AttachmentsType;
  content: string;
  mime: string;
  size: number;
  name: string;
  filename: string;
  extension: string;
  uid: string;
}

export type FileUploaderQueue = FileUploaderQueueItem[];
