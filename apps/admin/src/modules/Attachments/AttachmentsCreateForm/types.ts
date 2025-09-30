import { FileUploaderQueue } from '../../../types';

export interface IAttachmentsCreateForm {
  // TODO #schema
  queue: FileUploaderQueue;
  options: {
    path: '';
  };
}

export interface AttachmentsQueueProps {
  queue: FileUploaderQueue;
}
