import { attachmentsTypeDefault, AttachmentsDetail } from '@common';
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

export const getAttachmentsDetailFormMapper = (data: AttachmentsDetail): IAttachmentsDetailForm => {
  return {
    ...data,
  };
};

export const getAttachmentsDetailFormMapperToMaster = (data: IAttachmentsDetailForm): IAttachmentsDetailForm => {
  return Object.assign({
    ...data,
  });
};
