import { attachmentsTypeDefault } from '@common';
import { IAttachmentsDetailForm } from './types';

export const getAttachmentsDetailFormDefaultValues = (): IAttachmentsDetailForm => {
  return {
    id: 0,
    name: '',
    type: attachmentsTypeDefault,
    active: true,
    deleted: false,
    file_name: '',
    file_type: '',
    file_ext: '',
    file_size: 0,
  };
};
