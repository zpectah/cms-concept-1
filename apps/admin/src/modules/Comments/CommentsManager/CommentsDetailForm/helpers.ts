import { commentsTypeDefault, getRandomString, CommentsDetail, CommentsItem } from '@common';
import { ICommentsItemDetailForm } from './types';

type GetCommentsDefaultValuesProps = Pick<CommentsItem, 'sender' | 'content_type' | 'content_id' | 'parent'>;
export const getCommentsDefaultValues = ({
  sender,
  content_id,
  content_type,
  parent,
}: GetCommentsDefaultValuesProps): ICommentsItemDetailForm => {
  return {
    id: 0,
    name: getRandomString(16),
    type: commentsTypeDefault,
    sender: sender ?? '',
    content_type: content_type ?? '',
    content_id: content_id ?? 0,
    parent: parent ?? 0,
    subject: '',
    content: '',
    active: true,
    deleted: false,
  };
};

export const getCommentsDetailFormMapper = (data: CommentsDetail): ICommentsItemDetailForm => {
  return { ...data };
};

export const getCommentsDetailFormMapperToMaster = (data: ICommentsItemDetailForm): ICommentsItemDetailForm => {
  return Object.assign({ ...data });
};
