import { FileUploaderQueue } from '../../../types';
import { IAttachmentsCreateForm } from './types';
import { getFormattedString } from '@common';

export const getAttachmentsCreateFormDefaultValues = (): IAttachmentsCreateForm => {
  return {
    queue: [],
    options: {
      path: '',
    },
  };
};

export const sanitizeQueueFileNames = (queue: FileUploaderQueue): FileUploaderQueue =>
  queue.map((item) => ({
    ...item,
    name: getFormattedString(item.name),
  }));
