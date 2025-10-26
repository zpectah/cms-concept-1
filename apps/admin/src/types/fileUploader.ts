import { AttachmentsType } from '@common';

export interface FileUploaderQueueItem {
  type: AttachmentsType;
  content: string;
  mime: string;
  size: number;
  name: string;
  filename: string; // TODO: delete
  extension: string;
  uid: string;
}

export type FileUploaderQueue = FileUploaderQueueItem[];

export type FileUploaderTransportQueueItem = FileUploaderQueueItem & {
  content?: string;
};

export type FileUploaderTransportQueue = {
  queue: FileUploaderTransportQueueItem[];
  options: {
    path: string;
  };
};
