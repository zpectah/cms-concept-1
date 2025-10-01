import { IAttachmentsCreateForm } from './types';

export const getAttachmentsCreateFormDefaultValues = (): IAttachmentsCreateForm => {
  return {
    queue: [],
    options: {
      path: '',
    },
  };
};
