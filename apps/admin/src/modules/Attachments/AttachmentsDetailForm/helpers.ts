import { getConfig } from '../../../utils';
import { IAttachmentsDetailForm } from './types';

export const getAttachmentsTypeDefaultValue = () => {
  const { model } = getConfig();

  return model.attachments.default;
};

export const getAttachmentsDetailFormDefaultValues = (): IAttachmentsDetailForm => {
  return {
    id: 0,
    name: '',
    type: getAttachmentsTypeDefaultValue(),
    active: true,
    deleted: false,
    file_name: '',
    file_type: '',
    file_ext: '',
    file_size: 0,
  };
};
