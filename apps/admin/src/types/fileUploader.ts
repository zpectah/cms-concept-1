import { AttachmentsType, EnumKeyValues } from '@common';
import { fileUploaderQueueItemContextKeys } from '../enums';

export type FileUploaderQueueItemContext = EnumKeyValues<typeof fileUploaderQueueItemContextKeys>;

export interface FileUploaderQueueItem {
  type: AttachmentsType;
  content: string;
  mime: string;
  size: number;
  name: string;
  extension: string;
  uid: string;
  context: FileUploaderQueueItemContext;
}

export type FileUploaderQueue = FileUploaderQueueItem[];

export type FileUploaderTransportQueueItem = FileUploaderQueueItem & {
  content?: string;
};

export type FileUploaderTransportQueue = {
  queue: FileUploaderTransportQueueItem[];
  options: {
    path: string;
    context: FileUploaderQueueItemContext;
  };
};
