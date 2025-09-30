import { FileUploaderQueue } from '../../../types';

export interface IAttachmentsCreateForm {
  // TODO #schema
  files: FileUploaderQueue;
  options: {
    path: '';
  };
}
