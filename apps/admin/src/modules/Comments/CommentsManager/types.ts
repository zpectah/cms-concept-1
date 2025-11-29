import { Comments, CommentsItem } from '@common';

export type CommentsListItemProps = CommentsItem & {
  onReply: (parent: number) => void;
  onDetail: (id: number) => void;
  children?: CommentsListItemProps[];
};

export interface CommentsListProps {
  comments: Comments;
  onReply: (parent: number) => void;
  onDetail: (id: number) => void;
}
